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

const GOOGLE_REVIEWS_URL = process.env.GOOGLE_REVIEWS_URL || 'https://maps.app.goo.gl/mYc8i3DawKk6PsPc9';
const MAX_REVIEWS = parseInt(process.env.MAX_REVIEWS || '30', 10);
const OUTPUT_PATH = path.resolve('public/reviews.json');

async function getReviewsContext(page: Page): Promise<Page | Frame> {
  // Some Google search links render reviews inside an iframe; prefer that frame.
  const candidates = page.frames();
  const frame = candidates.find((f) => {
    const u = f.url();
    return /[#?]lrd=/.test(u) || /\/maps\//.test(u) || /google\.com\/maps\/reviews/.test(u);
  });
  return frame || page;
}

async function ensureReviewsPanel(ctx: Page | Frame) {
  // Try clicking on the Reviews tab/button if present
  const selectorsToTry = [
    'button[aria-label*="Reviews"]',
    'div[aria-label*="Reviews"]',
    'a[href*="data=reviews"]',
    'a[aria-label*="Reviews"]',
  ];
  for (const sel of selectorsToTry) {
    const handle = await (ctx as any).$(sel);
    if (handle) {
      await handle.click({ delay: 50 });
      await new Promise((res) => setTimeout(res, 1500));
      break;
    }
  }
}

async function scrollReviews(ctx: Page | Frame) {
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
    const exists = await (ctx as any).$(sel);
    if (exists) {
      for (let i = 0; i < 20; i++) {
        await (ctx as any).evaluate((selector: string) => {
          const el = document.querySelector(selector);
          if (el) el.scrollBy({ top: 1000, behavior: 'smooth' });
        }, sel);
        await new Promise((res) => setTimeout(res, 500));
      }
      return;
    }
  }
  // Fallback: scroll window
  for (let i = 0; i < 20; i++) {
    await (ctx as any).evaluate(() => window.scrollBy(0, 1000));
    await new Promise((res) => setTimeout(res, 500));
  }
}

async function extractReviews(ctx: Page | Frame): Promise<ScrapedReview[]> {
  // This extraction uses heuristic selectors as Google DOM changes often.
  const reviews: ScrapedReview[] = await (ctx as any).evaluate(() => {
    const sanitize = (s: string) => s.replace(/\s+/g, ' ').trim();
    // Helper: query across shadow DOM
    function queryAllDeep(selectorList: string[]): Element[] {
      const selectors = selectorList;
      const results: Element[] = [];
      const visit = (root: Document | ShadowRoot | Element) => {
        for (const sel of selectors) {
          results.push(...Array.from((root as any).querySelectorAll?.(sel) || []));
        }
        const treeWalker = document.createTreeWalker(root as any, NodeFilter.SHOW_ELEMENT, null);
        let current = treeWalker.currentNode as Element | null;
        while (current) {
          const sr = (current as any).shadowRoot as ShadowRoot | null;
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

async function fetchApiReviews(placeId?: string, apiKey?: string): Promise<any[]> {
  if (!placeId || !apiKey) return [];
  const fields = 'reviews,url,place_id,rating,user_ratings_total';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Places API failed: ${res.status}`);
  const data = await res.json();
  const reviews = data?.result?.reviews || [];
  // Normalize minimal fields used for verification
  return reviews.map((r: any) => ({
    authorName: r.author_name,
    rating: r.rating,
    text: r.text || '',
    timestamp: r.time, // epoch seconds
  }));
}

function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim().toLowerCase();
}

function matchToApi(scraped: ScrapedReview[], apiReviews: any[]): ScrapedReview[] {
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
    await new Promise((res) => setTimeout(res, 1500));

    // Handle potential Google consent screens ("Before you continue" / "Accept all")
    async function maybeAcceptConsent(p: Page) {
      // Try on main page
      const candidates = [
        'button#L2AGLb',
        'button[aria-label*="Accept all"]',
        'button[aria-label*="I agree"]',
      ];
      for (const sel of candidates) {
        const btn = await p.$(sel as any);
        if (btn) {
          try { await btn.click({ delay: 50 }); } catch {}
          await new Promise((res) => setTimeout(res, 1200));
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
        await new Promise((res) => setTimeout(res, 1000));
      } catch {}
      // Try within frames
      for (const f of p.frames()) {
        for (const sel of candidates) {
          const btn = await f.$(sel as any);
          if (btn) {
            try { await btn.click({ delay: 50 }); } catch {}
            await new Promise((res) => setTimeout(res, 1200));
            break;
          }
        }
        try {
          await f.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
            const target = buttons.find((b) => /accept all|i agree|agree|accept/i.test((b.innerText || '').toLowerCase()));
            if (target) target.click();
          });
          await new Promise((res) => setTimeout(res, 1000));
        } catch {}
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
    let apiReviews: any[] = [];
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
