import { test, expect } from '@playwright/test';

test.describe('Footer – Review Us button', () => {
  test('is visible and opens Google Reviews', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await footer.scrollIntoViewIfNeeded();
    const link = footer.locator('a').filter({ hasText: /review us/i }).first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toBe('https://share.google/G2RRRo3M2HAuMbduE');
  });
});
