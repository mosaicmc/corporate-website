import puppeteer, { Browser, Page, ElementHandle } from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

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
  const tryDate = new Date(raw);
  if (!isNaN(tryDate.getTime())) return tryDate.toISOString().slice(0, 10);
  return new Date().toISOString().slice(0, 10);
}

async function clickAllReviews(page: Page) {
  try {
    // XPath click for common text variants
    const btn = await page.evaluate((xpList: string[]) => {
      for (const xp of xpList) {
        const res = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (res.snapshotLength > 0) {
          const node = res.snapshotItem(0) as HTMLElement;
          if (node) { node.click(); return true; }
        }
      }
      // Fallback: text matching across clickable elements
      const texts = ['all reviews', 'see all reviews', 'reviews'];
      const els = Array.from(document.querySelectorAll('button, a, div, span')) as HTMLElement[];
      const target = els.find((el) => texts.some((t) => (el.textContent || '').toLowerCase().includes(t)));
      if (target) { target.click(); return true; }
      // Fallback: direct lrd anchor
      const a = Array.from(document.querySelectorAll('a[href]'))
        .map((x) => x as HTMLAnchorElement)
        .find((x) => /[?#]lrd=/.test(x.href));
      if (a) { a.click(); return true; }
      return false;
    }, ["//button[contains(., 'All reviews') or contains(., 'See all reviews')]"]);
    await sleep(3000);
  } catch {}
}

async function scrollReviewsContainer(page: Page, iterations = 6) {
  const container = (await page.$('div[role="feed"]')) || (await page.$('div[aria-label*="Reviews"]')) || null;
  for (let i = 0; i < iterations; i++) {
    if (container) {
      await page.evaluate((el) => {
        el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
      }, container);
    } else {
      await page.evaluate(() => window.scrollBy({ top: 1200, behavior: 'auto' }));
    }
    await sleep(2500);
  }
}

async function expandAllMore(page: Page) {
  try {
    await page.evaluate(() => {
      const selectors = [
        '[jsname="fk8sZ"]',
        'button:has(span:contains("More"))',
        'span:contains("More")',
      ];
      const clicked = new Set<Element>();
      const all = Array.from(document.querySelectorAll('*')) as HTMLElement[];
      for (const el of all) {
        const text = (el.textContent || '').toLowerCase();
        if (/\bmore\b/.test(text) && typeof (el as any).click === 'function') {
          if (!clicked.has(el)) { (el as any).click(); clicked.add(el); }
        }
      }
    });
    await sleep(1500);
  } catch {}
}

async function getTextFromXPath(root: ElementHandle, xpath: string): Promise<string> {
  // Use document.evaluate for Puppeteer v22 compatibility
  const text = await root.evaluate((el, xp) => {
    const res = document.evaluate(xp, el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const node = res.singleNodeValue as Node | null;
    return node ? (node.textContent || '') : '';
  }, xpath);
  return cleanText(text);
}

async function getAttrFromXPath(root: ElementHandle, xpath: string, attr: string): Promise<string> {
  const val = await root.evaluate((el, xp, a) => {
    const res = document.evaluate(xp, el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const node = res.singleNodeValue as Element | null;
    return node ? (node.getAttribute(a) || '') : '';
  }, xpath, attr);
  return val || '';
}

async function extractReviews(page: Page, limit = 6): Promise<Review[]> {
  const articles = await page.$$('div[role="article"]');
  const reviews: Review[] = [];
  for (const article of articles.slice(0, limit)) {
    const author = await getTextFromXPath(article, './/div[contains(@class,"d4r55")]');
    const ariaLabel = await getAttrFromXPath(article, './/span[@role="img"]', 'aria-label');
    const text = await getTextFromXPath(article, './/span[@jsname="bN97Pc"]');
    const dateText = await getTextFromXPath(article, './/span[contains(@class,"dehysf")]');

    if (author && text && dateText && ariaLabel) {
      reviews.push({
        author: cleanText(author),
        rating: parseRatingFromAria(ariaLabel),
        text: cleanText(text),
        date: normalizeDate(dateText),
      });
    }
  }
  if (reviews.length > 0) return reviews;
  // Deep shadow DOM fallback
  const deep = await page.evaluate((limitEval: number) => {
    function queryAllDeep(selector: string, root: Document | ShadowRoot | Element = document): Element[] {
      const results: Element[] = [];
      const search = (node: Document | ShadowRoot | Element) => {
        const found = (node as Document | ShadowRoot).querySelectorAll?.(selector);
        if (found) results.push(...Array.from(found));
        const children = (node as Element).children || [];
        Array.from(children).forEach((child) => {
          search(child);
          const sr = (child as any).shadowRoot as ShadowRoot | null;
          if (sr) search(sr);
        });
      };
      search(root);
      return results;
    }
    const arts = queryAllDeep('div[role="article"], [data-review-id]');
    const items = [] as { author: string; ariaLabel: string; text: string; date: string }[];
    for (const a of arts.slice(0, limitEval)) {
      const author = (a.querySelector('.d4r55, a[href*="/maps/contrib/"]')?.textContent || '').trim();
      const text = (
        a.querySelector('[jsname="bN97Pc"], [data-expandable]')?.textContent ||
        a.querySelector('span[class*="wiI7pd"], div[class*="MyEned"]')?.textContent ||
        ''
      ).trim();
      const dateText = (
        a.querySelector('.dehysf, span[class*="rsqaWe"], span[class*="fTKm4e"]')?.textContent || ''
      ).trim();
      const ariaLabel = (
        a.querySelector('span[role="img"][aria-label], div[aria-label*="star"], span[aria-label*="star"]')?.getAttribute('aria-label') || ''
      );
      if (author && text && dateText && ariaLabel) {
        items.push({ author, text, date: dateText, ariaLabel });
      }
    }
    return items;
  }, limit);
  return deep.map((d) => ({
    author: cleanText(d.author),
    rating: parseRatingFromAria(d.ariaLabel),
    text: cleanText(d.text),
    date: normalizeDate(d.date),
  }));
}

export async function scrapeGoogleMapsReviews(url: string, limit = 6): Promise<Review[]> {
  const headlessEnv = (process.env.HEADLESS || '').toLowerCase();
  const headless = headlessEnv === '1' || headlessEnv === 'true';
  const browser: Browser = await puppeteer.launch({ headless, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36');

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  page.setDefaultTimeout(90000);
  await page.waitForSelector('body', { timeout: 60000 });
  await sleep(3000);

  // Accept cookies / consent
  try {
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
      const b = btns.find((x) => /accept|agree/i.test((x.innerText || '').toLowerCase()));
      if (b) b.click();
    });
    await sleep(2000);
  } catch {}

  await clickAllReviews(page);
  // Wait for any review article to appear
  try { await page.waitForSelector('div[role="article"]', { timeout: 60000 }); } catch {}
  // Try initial deep scroll to load more items
  await scrollReviewsContainer(page, 20);
  await expandAllMore(page);

  let reviews = await extractReviews(page, limit * 2);
  // Progressive scrolling until we have at least the limit or hit max cycles
  const seen = new Set<string>();
  reviews = reviews.filter((r) => {
    const key = `${r.author}|${r.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  for (let i = 0; reviews.length < limit && i < 10; i++) {
    await scrollReviewsContainer(page, 8);
    const more = await extractReviews(page, limit * 3);
    for (const r of more) {
      const key = `${r.author}|${r.text}`;
      if (!seen.has(key)) { seen.add(key); reviews.push(r); }
      if (reviews.length >= limit) break;
    }
    await expandAllMore(page);
  }
  reviews = reviews.slice(0, limit);
  // Fallback: try clicking any anchor with lrd param to open reviews pane, then re-extract
  if (reviews.length === 0) {
    try {
      await page.evaluate(() => {
        const a = Array.from(document.querySelectorAll('a[href]'))
          .map((x) => x as HTMLAnchorElement)
          .find((x) => /[?#]lrd=/.test(x.href));
        if (a) a.click();
      });
      await sleep(4000);
      try { await page.waitForSelector('div[role="article"]', { timeout: 30000 }); } catch {}
      await scrollReviewsContainer(page, 20);
      await expandAllMore(page);
      reviews = await extractReviews(page, limit * 2);
      const seen2 = new Set<string>();
      reviews = reviews.filter((r) => {
        const key = `${r.author}|${r.text}`;
        if (seen2.has(key)) return false;
        seen2.add(key);
        return true;
      });
      for (let i = 0; reviews.length < limit && i < 10; i++) {
        await scrollReviewsContainer(page, 8);
        await expandAllMore(page);
        const more = await extractReviews(page, limit * 3);
        for (const r of more) {
          const key = `${r.author}|${r.text}`;
          if (!seen2.has(key)) { seen2.add(key); reviews.push(r); }
          if (reviews.length >= limit) break;
        }
      }
      reviews = reviews.slice(0, limit);
    } catch {}
  }

  await browser.close();
  return reviews;
}

export async function scrapeGoogleReviewLinks(links: string[], limit = 6): Promise<Review[]> {
  const headlessEnv = (process.env.HEADLESS || '').toLowerCase();
  const headless = headlessEnv === '1' || headlessEnv === 'true';
  const browser: Browser = await puppeteer.launch({ headless, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36');

  const seen = new Set<string>();
  const out: Review[] = [];
  for (const link of links) {
    try {
      await page.goto(link, { waitUntil: 'networkidle2', timeout: 60000 });
      page.setDefaultTimeout(90000);
      await page.waitForSelector('body', { timeout: 60000 });
      await sleep(2500);
      // Accept cookies / consent
      try {
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
          const b = btns.find((x) => /accept|agree/i.test((x.innerText || '').toLowerCase()));
          if (b) b.click();
        });
        await sleep(1500);
      } catch {}

      // Try to expand and load content around the focused review
      try { await page.waitForSelector('div[role="article"], [data-review-id]', { timeout: 45000 }); } catch {}
      await expandAllMore(page);
      await scrollReviewsContainer(page, 8);
      const found = await extractReviews(page, limit * 2);
      for (const r of found) {
        const key = `${r.author}|${r.text}`;
        if (!seen.has(key)) { seen.add(key); out.push(r); }
        if (out.length >= limit) break;
      }
      if (out.length >= limit) break;
    } catch {}
  }
  await browser.close();
  return out.slice(0, limit);
}

// CLI entry: execute immediately when invoked
(async () => {
  const url = process.env.GOOGLE_REVIEWS_URL || 'https://www.google.com/maps/place/Mosaic+Multicultural+Connections/@-32.9788824,151.5700162,38365m/data=!3m2!1e3!5s0x6b733d8ca7ff37c9:0xff5014fa7fdef09d!4m8!3m7!1s0x6b7315b2fa7bebf3:0x8a9e6364976fac2d!8m2!3d-32.9615701!4d151.6945456!9m1!1b1!16s%2Fg%2F1jky5bhjd?entry=ttu';
  const linksEnv = process.env.GOOGLE_REVIEW_LINKS || process.env.GOOGLE_REVIEW_URLS || '';
  const linkList = linksEnv.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
  let reviews: Review[] = [];
  if (linkList.length > 0) {
    const fromLinks = await scrapeGoogleReviewLinks(linkList, 6);
    reviews = fromLinks;
    if (reviews.length < 6) {
      const fromPlace = await scrapeGoogleMapsReviews(url, 6);
      const seen = new Set<string>(reviews.map((r) => `${r.author}|${r.text}`));
      for (const r of fromPlace) {
        const key = `${r.author}|${r.text}`;
        if (!seen.has(key)) { seen.add(key); reviews.push(r); }
        if (reviews.length >= 6) break;
      }
    }
  } else {
    reviews = await scrapeGoogleMapsReviews(url, 6);
  }
  // Strict JSON array output
  process.stdout.write(JSON.stringify(reviews, null, 2));

  // Also write to public/reviews.json in site schema
  const outputPath = path.resolve('public/reviews.json');
  const normalized = {
    placeUrl: linkList.length > 0 ? (process.env.GOOGLE_REVIEWS_URL || linkList[0]) : url,
    fetchedAt: new Date().toISOString(),
    reviews: reviews.map((r, idx) => ({
      id: `gm-${idx + 1}`,
      authorName: r.author,
      rating: r.rating,
      dateText: r.date,
      text: r.text,
    })),
  };
  fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2));
})();
