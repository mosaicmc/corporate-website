import puppeteer from 'puppeteer';

async function run() {
  const url = 'http://localhost:5173/get-involved';
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Wait for spotlight card to render
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll('h2')).some(h => /Volunteer Spotlight/i.test(h.textContent || ''));
  }, { timeout: 15000 });

  // Try to locate the Instagram tile image
  const imgLocator = 'img[alt$="Instagram tile"]';
  let found = false;
  try {
    await page.waitForSelector(imgLocator, { timeout: 3000, visible: true });
    found = true;
  } catch {}

  const result = { found };
  if (found) {
    const src = await page.$eval(imgLocator, el => el.getAttribute('src'));
    result.src = src;
    const bbox = await page.$eval(imgLocator, el => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    });
    result.bbox = bbox;
  } else {
    // Check if fallback icon is present
    const hasIcon = await page.$eval('div.w-16.h-16 svg.lucide-users', () => true).catch(() => false);
    result.fallbackIcon = hasIcon;
  }

  // Screenshot the spotlight header area for visual confirmation
  const spotlightCard = await page.$('div:has(> blockquote)');
  if (spotlightCard) {
    await spotlightCard.screenshot({ path: 'tests/ui/spotlight-current.png' });
  } else {
    await page.screenshot({ path: 'tests/ui/spotlight-page.png', fullPage: true });
  }

  console.log(JSON.stringify(result, null, 2));

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
