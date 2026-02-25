import { test, expect } from '@playwright/test';

test.describe('Translation Flags – pure i18n', () => {
  test('switches to RU and updates html lang without reload', async ({ page }) => {
    await page.goto('/');
    const ruButton = page.getByRole('button', { name: /ru/i });
    await ruButton.click();
    await page.waitForTimeout(50);
    const lang = await page.evaluate(() => document.documentElement.lang);
    expect(lang).toBe('ru');
  });

  test('switches to AR and sets rtl, then back to EN', async ({ page }) => {
    await page.goto('/');
    const arButton = page.getByRole('button', { name: /ar/i });
    await arButton.click();
    await page.waitForTimeout(50);
    const dirAfterAr = await page.evaluate(() => document.documentElement.dir);
    const langAfterAr = await page.evaluate(() => document.documentElement.lang);
    expect(dirAfterAr).toBe('rtl');
    expect(langAfterAr).toBe('ar');

    const enButton = page.getByRole('button', { name: /en/i });
    await enButton.click();
    await page.waitForTimeout(50);
    const dirAfterEn = await page.evaluate(() => document.documentElement.dir || '');
    const langAfterEn = await page.evaluate(() => document.documentElement.lang || '');
    expect(['', 'ltr']).toContain(dirAfterEn);
    expect(['', 'en']).toContain(langAfterEn);
  });
});
