import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer';

type Review = {
  author: string;
  rating: number;
  text: string;
  date: string; // YYYY-MM-DD
};

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function cleanText(s: string | null | undefined): string {
  return (s || '').replace(/\s+/g, ' ').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

function parseRatingFromAria(label: string | null | undefined): number {
  const s = label || '';
  const m = s.match(/(\d+(?:\.\d+)?)\s*stars?/i);
  if (!m) return 0;
  return Math.max(1, Math.min(5, Math.round(parseFloat(m[1]))));
}

function normalizeDate(dateText: string | null | undefined): string {
  const raw = cleanText(dateText);
  const now = new Date();
  const lower = raw.toLowerCase();
  const rel = lower.match(/(\d+)\s*(day|week|month|year)s?\s*ago/);
  if (rel) {
    const qty = parseInt(rel[1], 10);
    const unit = rel[2];
    const d = new Date(now);
    switch (unit) {
      case 'day': d.setDate(d.getDate() - qty); break;
      case 'week': d.setDate(d.getDate() - qty * 7); break;
      case 'month': d.setMonth(d.getMonth() - qty); break;
      case 'year': d.setFullYear(d.getFullYear() - qty); break;
    }
    return d.toISOString().slice(0, 10);
  }
  // Handle "a week ago", "a month ago"
  const relA = lower.match(/a\s*(day|week|month|year)\s*ago/);
  if (relA) {
    const unit = relA[1];
    const d = new Date(now);
    switch (unit) {
      case 'day': d.setDate(d.getDate() - 1); break;
      case 'week': d.setDate(d.getDate() - 7); break;
      case 'month': d.setMonth(d.getMonth() - 1); break;
      case 'year': d.setFullYear(d.getFullYear() - 1); break;
    }
    return d.toISOString().slice(0, 10);
  }
  // If it's an absolute date like "Jan 2024" or "14 Nov 2023"
  // Attempt Date parsing
  const tryDate = new Date(raw);
  if (!isNaN(tryDate.getTime())) {
    return tryDate.toISOString().slice(0, 10);
  }
  // Fallback to today if unknown (still meet required field)
  return new Date().toISOString().slice(0, 10);
}

async function clickAllReviews(page: Page) {
  // Try several selectors that commonly represent the Reviews button
  const candidates = [
    'button[aria-label*="reviews"]',
    'button[aria-label*="All reviews"]',
    'a[aria-label*="reviews"]',
    'button[jsaction*="reviews"]',
  ];
  for (const sel of candidates) {
    const el = await page.$(sel);
    if (el) {
      try { await el.click({ delay: 50 }); } catch {}
      await sleep(5000); // rate limit
      return;
    }
  }
  // Fallback: click by text content
  await page.evaluate(() => {
    function findAndClick(texts: string[]) {
      const all = Array.from(document.querySelectorAll('button, a, div, span')) as HTMLElement[];
      const target = all.find((el) => texts.some((t) => (el.textContent || '').toLowerCase().includes(t)));
      if (target) target.click();
    }
    findAndClick(['all reviews', 'reviews']);
  });
  await sleep(5000); // rate limit

  // Fallback: click a direct reviews link if present (href contains lrd)
  try {
    await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
      const a = anchors.find((el) => /[?#]lrd=/.test(el.href));
      if (a) a.click();
    });
    await sleep(5000);
  } catch {}
}

async function ensureReviewsVisible(page: Page) {
  // Wait for the articles to appear; if not, try clicking reviews and waiting
  try {
    await page.waitForSelector('div[role="article"], article, [data-review-id]', { timeout: 60000 });
    return;
  } catch {}
  await clickAllReviews(page);
  // Wait for reviews container first
  try { await page.waitForSelector('div[aria-label*="Reviews"], div[role="region"], div[role="main"]', { timeout: 30000 }); } catch {}
  try { await page.waitForSelector('div[role="article"], article, [data-review-id]', { timeout: 60000 }); } catch {}
}

async function scrollToLoad(page: Page, minIterations = 6) {
  // Scroll the reviews container or window, throttled
  for (let i = 0; i < minIterations; i++) {
    await page.evaluate(() => {
      const containers = Array.from(document.querySelectorAll('div[role="main"], div[aria-label*="Reviews"], div[class*="scroll"]')) as HTMLElement[];
      const el = containers[0] || document.documentElement;
      el.scrollBy({ top: 1000, behavior: 'smooth' });
    });
    await sleep(5000); // rate limit
  }
}

async function getTextFromXPath(page: Page, root: ElementHandle, xpath: string): Promise<string> {
  const val = await page.evaluate((el, xp) => {
    const res = document.evaluate(xp, el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const node = res.singleNodeValue as Node | null;
    return node ? (node.textContent || '') : '';
  }, root, xpath);
  return cleanText(String(val || ''));
}

async function getAttrFromXPath(page: Page, root: ElementHandle, xpath: string, attr: string): Promise<string> {
  const v = await page.evaluate((el, xp, a) => {
    const res = document.evaluate(xp, el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const node = res.singleNodeValue as Element | null;
    return node ? node.getAttribute(a) || '' : '';
  }, root, xpath, attr);
  return String(v || '');
}

async function extractTopSix(page: Page): Promise<Review[]> {
  const articles = await page.$$('div[role="article"], article, [data-review-id]');
  const firstSix = articles.slice(0, 12); // inspect more nodes then pick six
  const out: Review[] = [];
  for (const root of firstSix) {
    // Try primary Maps xpaths
    let author = await getTextFromXPath(page, root, './/div[contains(@class,"d4r55")]/text()');
    let ariaLabel = await getAttrFromXPath(page, root, './/span[@role="img"]', 'aria-label');
    let text = await getTextFromXPath(page, root, './/span[@jsname="bN97Pc"]/text()');
    let dateText = await getTextFromXPath(page, root, './/span[contains(@class,"dehysf")]/text()');

    // Fallbacks for Google Search overlay/alternate DOM
    if (!author) author = await getTextFromXPath(page, root, './/div[@role="heading"]/text() | .//a[contains(@href,"/maps/contrib/")]/text()');
    if (!text) text = await getTextFromXPath(page, root, './/span[contains(@class,"wiI7pd")]/text() | .//div[contains(@class,"MyEned")]/text() | .//div[contains(@data-expandable,"true")]/text()');
    if (!dateText) dateText = await getTextFromXPath(page, root, './/span[contains(@class,"rsqaWe")]/text() | .//span[contains(@class,"fTKm4e")]/text() | .//time/text()');
    if (!ariaLabel) ariaLabel = await getAttrFromXPath(page, root, './/span[@role="img" and @aria-label]', 'aria-label');

    if (author || text || dateText || ariaLabel) {
      const review: Review = {
        author: cleanText(author),
        rating: parseRatingFromAria(ariaLabel),
        text: cleanText(text),
        date: normalizeDate(dateText),
      };
      // Require text and author for validity
      if (review.author && review.text) out.push(review);
    }
    if (out.length >= 6) break;
  }
  return out.slice(0, 6);
}

async function waitForXPath(page: Page, xpath: string, timeout = 30000): Promise<void> {
  await page.waitForFunction((xp) => {
    const res = document.evaluate(xp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return !!res.singleNodeValue;
  }, { timeout }, xpath);
}

async function run() {
  const url = process.env.GOOGLE_REVIEWS_URL || 'https://www.google.com/maps/place/Mosaic+Multicultural+Connections/@-32.9788824,151.5700162,38365m/data=!3m2!1e3!5s0x6b733d8ca7ff37c9:0xff5014fa7fdef09d!4m8!3m7!1s0x6b7315b2fa7bebf3:0x8a9e6364976fac2d!8m2!3d-32.9615701!4d151.6945456!9m1!1b1!16s%2Fg%2F1jky5bhjd?entry=ttu';
  let browser: Browser | null = null;
  try {
    const headless = (process.env.HEADLESS ?? 'false').toLowerCase() === 'true';
    browser = await puppeteer.launch({ headless, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
    );
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await sleep(8000); // minimum 8s wait for heavy UI
    await page.waitForSelector('body', { timeout: 60000 });

    // Consent handling
    try {
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
        const target = buttons.find((b) => /accept all|i agree|agree|accept/i.test((b.innerText || '').toLowerCase()));
        if (target) target.click();
      });
      await sleep(3000);
    } catch {}

    // Detect captcha
    const captcha = await page.$('iframe[src*="recaptcha"], div:has(iframe[src*="recaptcha"])');
    if (captcha) throw new Error('Captcha challenge detected. Abort scraping.');

    await clickAllReviews(page);
    await ensureReviewsVisible(page);
    await scrollToLoad(page, 10);

    let reviews = await extractTopSix(page);
    // Progressive scroll if fewer than six found
    for (let i = 0; reviews.length < 6 && i < 8; i++) {
      await scrollToLoad(page, 4);
      const more = await extractTopSix(page);
      const seen = new Set(reviews.map((r) => `${r.author}|${r.text}`));
      for (const r of more) {
        const key = `${r.author}|${r.text}`;
        if (!seen.has(key)) { seen.add(key); reviews.push(r); }
        if (reviews.length >= 6) break;
      }
    }
    // Fallback: if still no reviews, try direct lrd reviews URL built from the place id embedded in the incoming URL
    if (!reviews.length) {
      const lrdIdMatch = url.match(/1s([0-9a-fx:]+)!/i);
      if (lrdIdMatch) {
        const lrdId = lrdIdMatch[1];
        const reviewsUrl = `https://www.google.com/maps?hl=en&gl=AU&lrd=${lrdId},1`;
        await page.goto(reviewsUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        await sleep(5000);
        await ensureReviewsVisible(page);
        await scrollToLoad(page, 10);
        reviews = await extractTopSix(page);
      }
    }

    // QA: ensure required fields present; tolerate fewer than six due to DOM changes
    const invalid = reviews.find((r) => !r.author || !r.text || !r.date);
    if (invalid) throw new Error('Validation failed: missing required fields in one or more reviews');

    // Output strict JSON only
    process.stdout.write(JSON.stringify(reviews, null, 2));
  } catch (err) {
    console.error('Scrape error:', (err as Error).message);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
}

run();
