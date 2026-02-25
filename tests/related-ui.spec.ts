import { test, expect } from '@playwright/test';

const routes = [
  '/services/settlement-support',
  '/services/aged-care',
  '/services/family-support',
  '/services/community-engagement',
  '/resources/emergency-translation',
];

for (const route of routes) {
  test(`RelatedServices shows ≤3 items on ${route}`, async ({ page }) => {
    await page.goto(`http://localhost:5173${route}`);
    await expect(page.locator('text=You May Also Be Interested In')).toBeVisible();
    const cards = page.locator('a:has-text("Learn more")');
    const count = await cards.count();
    expect(count).toBeLessThanOrEqual(3);
  });
}

test('QuickLinks section is removed globally', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const quickHeading = page.locator('text=You may also be interested in…');
  await expect(quickHeading).toHaveCount(0);
});

test('Apply to Volunteer link points to Tally form', async ({ page }) => {
  await page.goto('http://localhost:5173/get-involved');
  const applyBtn = page.locator('a:has-text("Apply to Volunteer")').first();
  await expect(applyBtn).toHaveAttribute('href', 'https://tally.so/r/3qoXjg');
});

test('Footer volunteer link points to Tally form', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const footerLink = page.locator('footer a[href="https://tally.so/r/3qoXjg"]');
  await expect(footerLink).toBeVisible();
});

test('Volunteer spotlight shows attribution link', async ({ page }) => {
  await page.goto('http://localhost:5173/get-involved');
  const attribution = page.locator('a:has-text("Source: Instagram")');
  await expect(attribution).toBeVisible();
  await expect(attribution).toHaveAttribute('href', /instagram\.com/);
});
