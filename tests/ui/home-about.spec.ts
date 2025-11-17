import { test, expect } from '@playwright/test';

// Utility: scroll a locator into view and wait for potential lazy-load
async function ensureVisible(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  // Give IntersectionObserver a moment to fire and fetch reviews
  await page.waitForTimeout(600);
}

test.describe('Home page – Google Reviews section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders Google Reviews section and initial cards', async ({ page }) => {
    const section = page.locator('[aria-label="Google Reviews"]');
    await ensureVisible(page, section);
    await expect(section).toBeVisible();

    // Heading within the section
    await expect(section.getByRole('heading', { name: 'What People Are Saying' })).toBeVisible();

    // Wait for reviews to load: cards with tabindex=0 appear when not loading
    const cards = section.locator('.group[tabindex="0"]');
    await expect(cards.first()).toBeVisible();
    const initialCount = await cards.count();
    expect(initialCount).toBeGreaterThan(0);

    // Link to Google exists
    await expect(section.getByRole('link', { name: 'Read all reviews on Google' })).toBeVisible();
  });

  test('Load more reviews increases visible count', async ({ page }) => {
    const section = page.locator('[aria-label="Google Reviews"]');
    await ensureVisible(page, section);
    const cards = section.locator('.group[tabindex="0"]');
    await expect(cards.first()).toBeVisible();
    const before = await cards.count();

    const loadMore = section.getByRole('button', { name: 'Load more reviews' });
    if (await loadMore.isVisible()) {
      await loadMore.click();
      await expect(cards.nth(before)).toBeVisible();
      const after = await cards.count();
      expect(after).toBeGreaterThan(before);
    } else {
      // If no more reviews are available, at least confirm button is hidden appropriately
      await expect(loadMore).toBeHidden();
    }
  });

  test('visual snapshots of Google Reviews section at breakpoints', async ({ page }) => {
    const section = page.locator('[aria-label="Google Reviews"]');

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await ensureVisible(page, section);
    await expect(section).toHaveScreenshot('home-google-reviews-desktop.png');

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await ensureVisible(page, section);
    await expect(section).toHaveScreenshot('home-google-reviews-tablet.png');

    // Mobile
    await page.setViewportSize({ width: 375, height: 800 });
    await ensureVisible(page, section);
    await expect(section).toHaveScreenshot('home-google-reviews-mobile.png');
  });
});

test.describe('About page – Values and Leadership', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('renders Values section with 4 cards', async ({ page }) => {
    // Badge text "Our Values" precedes the Values grid
    await expect(page.getByText('Our Values')).toBeVisible();
    const valuesGrid = page.locator('section:has-text("Our Values")').locator('.grid').first();
    await expect(valuesGrid).toBeVisible();
    await expect(valuesGrid.locator('h3')).toHaveCount(4);
  });

  test('renders Leadership section with avatars and roles', async ({ page }) => {
    await expect(page.getByText('Leadership')).toBeVisible();
    const leadershipSection = page.locator('section').filter({ hasText: 'Leadership Team' });
    await expect(leadershipSection).toBeVisible();
    const leaderCards = leadershipSection.locator('.group');
    await expect(leaderCards.first()).toBeVisible();
    await expect(leaderCards).toHaveCount(3);
    // Validate one known member text exists
    await expect(leadershipSection.getByRole('heading', { name: 'Sarah Chen' })).toBeVisible();
  });

  test('visual snapshots of Leadership section at breakpoints', async ({ page }) => {
    const leadership = page.locator('section').filter({ hasText: 'Leadership Team' });

    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(leadership).toHaveScreenshot('about-leadership-desktop.png');

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(leadership).toHaveScreenshot('about-leadership-tablet.png');

    // Mobile
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(leadership).toHaveScreenshot('about-leadership-mobile.png');
  });
});

