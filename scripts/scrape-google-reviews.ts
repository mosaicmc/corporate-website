/*
  Puppeteer scraper for Google Reviews
  Usage:
    GOOGLE_REVIEWS_URL="https://maps.app.goo.gl/your-place" npm run scrape:reviews

  Writes JSON to public/reviews.json
*/
import fs from 'node:fs';
import path from 'node:path';
import puppeteer, { Browser, Page, Frame } from 'puppeteer';
import sanitizeHtml from 'sanitize-html';

type ScrapedReview = {
  id: string;
  authorName: string;
  authorProfileUrl?: string;
  authorAvatarUrl?: string;
  rating: number; // 1-5
  dateText: string; // e.g., "2 weeks ago" or formatted date
  text: string;
  reviewUrl?: string; // direct link to the review on Google Maps if available
  verified?: boolean; // set true if matched against Google's API
  timestamp?: number; // epoch seconds when available via API match
};

type Output = {
  placeUrl: string;
  fetchedAt: string; // ISO
  reviews: ScrapedReview[];
};

type ApiReview = {
  authorName: string;
  rating: number;
  text: string;
  timestamp?: number;
};

const GOOGLE_REVIEWS_URL = process.env.GOOGLE_REVIEWS_URL || 'https://maps.app.goo.gl/mYc8i3DawKk6PsPc9';
const MAX_REVIEWS = parseInt(process.env.MAX_REVIEWS || '30', 10);
const OUTPUT_PATH = path.resolve('public/reviews.json');
const debugScrape = (process.env.DEBUG_SCRAPER || '').toLowerCase() === 'true';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function logNonFatal(error: unknown, context: string) {
  if (!debugScrape) return;
  console.warn(`[scrape-google-reviews] ${context}`, error);
}

type FrameLike = Page | Frame;

async function getReviewsContext(page: Page): Promise<FrameLike> {
  // Some Google search links render reviews inside an iframe; prefer that frame.
  const candidates = page.frames();
  const frame = candidates.find((f) => {
    const u = f.url();
    return /[#?]lrd=/.test(u) || /\/maps\//.test(u) || /google\.com\/maps\/reviews/.test(u);
  });
  return frame || page;
}

async function ensureReviewsPanel(ctx: FrameLike) {
  // Try clicking on the Reviews tab/button if present
  const selectorsToTry = [
    'button[aria-label*="Reviews"]',
    'div[aria-label*="Reviews"]',
    'a[href*="data=reviews"]',
    'a[aria-label*="Reviews"]',
  ];
  for (const sel of selectorsToTry) {
    const handle = await ctx.$(sel);
    if (handle) {
      await handle.click({ delay: 50 });
      await delay(1500);
      break;
    }
  }
}

async function scrollReviews(ctx: FrameLike) {
  // Attempt to find a scrollable reviews container; fallback to window scroll
  const scrollContainerSelectorCandidates = [
    'div[role="main"]',
    'div[aria-label*="Reviews"]',
    'div[class*="scroll"]',
    // Search overlay containers in Google Search UI
    'div[class^="gws-localreviews__google-review"]',
    'div[jscontroller*="e6MZhf"]',
  ];
  for (const sel of scrollContainerSelectorCandidates) {
    const exists = await ctx.$(sel);
    if (exists) {
      for (let i = 0; i < 20; i++) {
        await ctx.evaluate((selector: string) => {
          const el = document.querySelector(selector);
          if (el) el.scrollBy({ top: 1000, behavior: 'smooth' });
        }, sel);
        await delay(500);
      }
      return;
    }
  }
  // Fallback: scroll window
  for (let i = 0; i < 20; i++) {
    await ctx.evaluate(() => window.scrollBy(0, 1000));
    await delay(500);
  }
}
async function extractReviews(ctx: FrameLike): Promise<ScrapedReview[]> {
  // This extraction uses heuristic selectors as Google DOM changes often.
  const reviews: ScrapedReview[] = await ctx.evaluate(() => {
    const sanitize = (s: string) => s.replace(/\s+/g, ' ').trim();
    // Helper: query across shadow DOM
    function queryAllDeep(selectorList: string[]): Element[] {
      const selectors = selectorList;
      const results: Element[] = [];
      const visit = (root: Document | ShadowRoot | Element) => {
        for (const sel of selectors) {
          const queryable = root as Document | ShadowRoot | Element;
          const matched = queryable.querySelectorAll ? Array.from(queryable.querySelectorAll(sel)) : [];
          results.push(...matched);
        }
        const treeWalker = document.createTreeWalker(root as Node, NodeFilter.SHOW_ELEMENT, null);
        let current = treeWalker.currentNode as Element | null;
        while (current) {
          const sr = (current as Element & { shadowRoot?: ShadowRoot | null }).shadowRoot || null;
          if (sr) visit(sr);
          current = treeWalker.nextNode() as Element | null;
        }
      };
      visit(document);
      return Array.from(new Set(results));
    }
    const nodes = Array.from(
      queryAllDeep([
        // Common historic selectors
        'div.section-review-content',
        // More generic fallbacks
        'div[aria-label*="review"]',
        'div[data-review-id]',
        'div[jslog*="review"]',
        // Google Search reviews overlay
        'div[class^="gws-localreviews__google-review"]',
        'div[jscontroller*="e6MZhf"] article',
      ])
    );

    const getRating = (el: Element): number => {
      // Try star elements with aria-label
      const starLabelEl = el.querySelector('[aria-label*="stars"]') as HTMLElement | null;
      if (starLabelEl && starLabelEl.getAttribute('aria-label')) {
        const m = starLabelEl.getAttribute('aria-label')!.match(/(\d\.?\d?) out of 5/);
        if (m) return Math.round(parseFloat(m[1]));
      }
      // Fallback: count filled stars
      const stars = el.querySelectorAll('svg[aria-hidden="true"], span[class*="star"]');
      if (stars && stars.length) return Math.min(5, stars.length);
      return 0;
    };

    return nodes.map((el, idx) => {
      const id = (el.getAttribute('data-review-id') || `${Date.now()}-${idx}`).toString();
      const authorAnchor = (el.querySelector('a[href*="/maps/contrib/"]') as HTMLAnchorElement | null) || null;
      const authorNameEl = (el.querySelector('[class*="author"], [data-attr*="author"], a[aria-label*="Profile"], div[role="heading"]') as HTMLElement | null) || null;
      const avatarImg = (el.querySelector('img') as HTMLImageElement | null) || null;
      const textEl = (el.querySelector('[class*="text"], [jsname*="review"], div[aria-label*="Review"] span') as HTMLElement | null) || null;
      const dateEl = (el.querySelector('[class*="date"], time, span[aria-label*="ago"], span[class*="published"]') as HTMLElement | null) || null;
      const reviewAnchor = (el.querySelector('a[href*="#lrd"], a[href*="review"], a[href*="/maps/place/"]') as HTMLAnchorElement | null) || null;

      const authorName = sanitize(authorNameEl?.textContent || '');
      const rating = getRating(el);
      const dateText = sanitize(dateEl?.textContent || '');
      const text = sanitize(textEl?.textContent || '');

      return {
        id,
        authorName,
        authorProfileUrl: authorAnchor?.href || undefined,
        authorAvatarUrl: avatarImg?.src || undefined,
        rating,
        dateText,
        text,
        reviewUrl: reviewAnchor?.href || undefined,
      };
    }).filter(r => r.text);
  });

  // Basic sanitization server-side
  return reviews.slice(0, MAX_REVIEWS).map((r) => ({
    ...r,
    text: sanitizeHtml(r.text, { allowedTags: [], allowedAttributes: {} }),
    authorName: sanitizeHtml(r.authorName, { allowedTags: [], allowedAttributes: {} }),
    dateText: sanitizeHtml(r.dateText, { allowedTags: [], allowedAttributes: {} }),
  }));
}

async function fetchApiReviews(placeId?: string, apiKey?: string): Promise<ApiReview[]> {
  if (!placeId || !apiKey) return [];
  const fields = 'reviews,url,place_id,rating,user_ratings_total';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Places API failed: ${res.status}`);
  const data = await res.json();
  const reviews = data?.result?.reviews || [];
  // Normalize minimal fields used for verification
  return reviews.map((r: { author_name: string; rating: number; text: string; time?: number }) => ({
    authorName: r.author_name,
    rating: r.rating,
    text: r.text || '',
    timestamp: r.time,
  }));
}

function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

function matchToApi(scraped: ScrapedReview[], apiReviews: ApiReview[]): ScrapedReview[] {
  return scraped.map((s) => {
    const match = apiReviews.find((ar) => normalize(ar.text).includes(normalize(s.text)) || normalize(ar.authorName) === normalize(s.authorName));
    if (match) {
      return { ...s, verified: true, timestamp: match.timestamp, rating: match.rating, text: match.text };
    }
    return { ...s, verified: false };
  });
}

function pickTopSix(items: ScrapedReview[]): ScrapedReview[] {
  const scored = items.map((r) => ({
    r,
    score:
      (r.rating === 5 ? 100 : r.rating === 4 ? 80 : r.rating * 10) +
      (r.timestamp ? r.timestamp / 100000 : 0) +
      (r.text.length / 50),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 6).map((s) => s.r);
}

async function run() {
  let browser: Browser | null = null;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
    );
    await page.goto(GOOGLE_REVIEWS_URL, { waitUntil: 'networkidle2', timeout: 60000 });
    await delay(1500);

    // Handle potential Google consent screens ("Before you continue" / "Accept all")
    async function maybeAcceptConsent(p: Page) {
      // Try on main page
      const candidates = [
        'button#L2AGLb',
        'button[aria-label*="Accept all"]',
        'button[aria-label*="I agree"]',
      ];
      for (const sel of candidates) {
        const btn = await p.$(sel);
        if (btn) {
          try {
            await btn.click({ delay: 50 });
          } catch (error) {
            logNonFatal(error, 'consent click');
          }
          await delay(1200);
          break;
        }
      }
      // Fallback: query all buttons and click by text
      try {
        await p.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
          const target = buttons.find((b) => /accept all|i agree|agree|accept/i.test((b.innerText || '').toLowerCase()));
          if (target) target.click();
        });
        await delay(1000);
      } catch (error) {
        logNonFatal(error, 'consent fallback evaluate');
      }
      // Try within frames
      for (const f of p.frames()) {
        for (const sel of candidates) {
          const btn = await f.$(sel);
          if (btn) {
            try {
              await btn.click({ delay: 50 });
            } catch (error) {
              logNonFatal(error, 'consent frame click');
            }
            await delay(1200);
            break;
          }
        }
        try {
          await f.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
            const target = buttons.find((b) => /accept all|i agree|agree|accept/i.test((b.innerText || '').toLowerCase()));
            if (target) target.click();
          });
          await delay(1000);
        } catch (error) {
          logNonFatal(error, 'consent frame fallback');
        }
      }
    }
    await maybeAcceptConsent(page);

    const ctx = await getReviewsContext(page);
    await ensureReviewsPanel(ctx);
    await scrollReviews(ctx);

    const reviews = await extractReviews(ctx);
    console.log(`Found ${reviews.length} raw reviews before selection`);

    // Optional: verify via Google Places API if env vars provided
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    let verifiedReviews = reviews;
    let apiReviews: ApiReview[] = [];
    try {
      apiReviews = await fetchApiReviews(PLACE_ID, API_KEY);
      if (apiReviews.length) {
        verifiedReviews = matchToApi(reviews, apiReviews);
      }
    } catch (e) {
      console.warn('Google Places API verification failed:', (e as Error).message);
    }

    const selected = pickTopSix(verifiedReviews);

    const output: Output = {
      placeUrl: GOOGLE_REVIEWS_URL,
      fetchedAt: new Date().toISOString(),
      reviews: selected,
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
    console.log(`Saved ${selected.length} reviews to ${OUTPUT_PATH}`);

    // Write verification artifact for audit
    const auditPath = path.resolve('QA/reviews-verification.json');
    const audit = {
      placeUrl: GOOGLE_REVIEWS_URL,
      fetchedAt: output.fetchedAt,
      apiReviewsCount: apiReviews.length,
      displayedCount: selected.length,
      discrepancies: selected.filter((r) => !r.verified).length,
      items: selected.map((r) => ({ authorName: r.authorName, rating: r.rating, verified: r.verified, textHash: Buffer.from(normalize(r.text)).toString('base64') })),
    };
    fs.mkdirSync(path.dirname(auditPath), { recursive: true });
    fs.writeFileSync(auditPath, JSON.stringify(audit, null, 2));
    console.log(`Verification report saved to ${auditPath}`);
  } catch (err) {
    console.error('Scrape failed:', err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
}

run();
