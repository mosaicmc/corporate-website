import { test, expect } from '@playwright/test';

test.describe('GoogleReviews UI', () => {
  test('renders featured reviews and allows loading more', async ({ page }) => {
    await page.goto('/');
    const section = page.getByRole('region', { name: 'Google Reviews' });
    await expect(section).toBeVisible();

    // Wait for reviews to load
    await page.waitForTimeout(2000);

    // Expect cards exist
    const cards = section.locator('div[role="img"]').first(); // star rating present
    await expect(cards).toBeVisible();

    // Load more button shows when more reviews available
    const loadMore = page.getByRole('button', { name: /Load more reviews/i });
    // Button may or may not be visible depending on dataset; check it doesn't error
    if (await loadMore.isVisible()) {
      await loadMore.click();
    }
  });
});

