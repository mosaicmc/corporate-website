import { test, expect } from '@playwright/test';

const pages = [
  { route: '/volunteer/newcastle', name: 'Newcastle' },
  { route: '/volunteer/central-coast', name: 'Central Coast' },
  { route: '/volunteer/armidale', name: 'Armidale' },
  { route: '/volunteer/tamworth', name: 'Tamworth' },
];

for (const pageInfo of pages) {
  test.describe(`${pageInfo.name} volunteer dialogs`, () => {
    test(`dialog opens above cards and closes via keyboard`, async ({ page }) => {
      test.slow();
      await page.goto(pageInfo.route);

      await page.locator('h1').first().waitFor({ state: 'visible' });
      const chevron = page.locator('button[aria-haspopup="dialog"]:visible').first();
      await chevron.click();

      const dialogContent = page.locator('[role="dialog"]');
      await expect(dialogContent).toBeVisible();

      const overlay = page.locator('.backdrop-blur-sm');
      await expect(overlay.first()).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(dialogContent).toBeHidden();
    });
  });
}
