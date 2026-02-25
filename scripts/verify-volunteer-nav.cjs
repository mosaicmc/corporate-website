const puppeteer = require('puppeteer');

const BASE = process.env.BASE_URL || 'http://localhost:4176';
const LOCATIONS = [
  { slug: 'newcastle', name: 'Newcastle' },
  { slug: 'central-coast', name: 'Central Coast' },
  { slug: 'armidale', name: 'Armidale' },
  { slug: 'tamworth', name: 'Tamworth' },
];

function expectedPrevNext(slug) {
  const idx = LOCATIONS.findIndex((l) => l.slug === slug);
  const prev = LOCATIONS[(idx - 1 + LOCATIONS.length) % LOCATIONS.length];
  const next = LOCATIONS[(idx + 1) % LOCATIONS.length];
  return { prev: prev.name, next: next.name };
}

async function verifyPage(page, slug) {
  const url = `${BASE}/volunteer/${slug}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

  const result = await page.evaluate(() => {
    const navs = Array.from(document.querySelectorAll('div[role="navigation"][aria-label="Volunteer locations"]'));
    const details = navs.map((nav) => {
      const prevLink = nav.querySelector('a[aria-label^="Previous location"]');
      const nextLink = nav.querySelector('a[aria-label^="Next location"]');
      const prevLabel = prevLink && prevLink.nextElementSibling ? prevLink.nextElementSibling.textContent.trim() : null;
      const nextLabel = nextLink && nextLink.previousElementSibling ? nextLink.previousElementSibling.textContent.trim() : null;
      const rect = nav.getBoundingClientRect();
      return { prevLabel, nextLabel, top: rect.top };
    });

    const tabs = Array.from(document.querySelectorAll('button')).map((b) => b.textContent.trim());
    const hasAgedCareTab = tabs.includes('Aged Care');
    const hasMarketingTab = tabs.includes('Marketing');
    return { navCount: navs.length, navs: details, hasAgedCareTab, hasMarketingTab };
  });

  const { prev, next } = expectedPrevNext(slug);
  const headerNav = result.navs.sort((a, b) => a.top - b.top)[0];
  const footerNav = result.navs.sort((a, b) => b.top - a.top)[0];

  const headerOk = headerNav && headerNav.prevLabel === prev && headerNav.nextLabel === next;
  const footerOk = footerNav && footerNav.prevLabel === prev && footerNav.nextLabel === next;

  return {
    url,
    navCount: result.navCount,
    headerOk,
    footerOk,
    header: headerNav,
    footer: footerNav,
    hasAgedCareTab: result.hasAgedCareTab,
    hasMarketingTab: result.hasMarketingTab,
    expected: { prev, next },
  };
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const outputs = [];
  for (const { slug } of LOCATIONS) {
    try {
      outputs.push(await verifyPage(page, slug));
    } catch (e) {
      outputs.push({ url: `${BASE}/volunteer/${slug}`, error: String(e) });
    }
  }
  await browser.close();
  console.log(JSON.stringify(outputs, null, 2));
})();
