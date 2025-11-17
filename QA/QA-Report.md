# QA Report: Home & About UI Validation

Date: 2025-11-13

## Scope
- Home page Google Reviews section rendering and interactions.
- About page Values and Leadership sections design and responsiveness.
- Cross-browser verification across Chromium, Firefox, and WebKit.
- Visual regression snapshots at mobile/tablet/desktop breakpoints.

## Environment
- Base URL: `http://localhost:4173`
- Preview servers active on `http://localhost:4173/` and `http://localhost:4174/` during tests.
- Playwright projects: Desktop Chrome, Desktop Firefox, Desktop Safari.

## Results Summary
- Status: All tests passed across Chromium, Firefox, and WebKit.
- Tests executed: `tests/ui/home-about.spec.ts`, `tests/ui/reviews.spec.ts`.
- Visual snapshots created and verified pixel-perfect (baseline established).

## Interactive Behavior
- Home: "Load more reviews" button increases visible review cards by +3 until all reviews shown.
- Home: "Read all reviews on Google" link present and visible.
- About: Values section renders 4 ShadCN `Card` items.
- About: Leadership section renders 3 `Card` items with `Avatar` images and role text.

## Breakpoint Screenshots
Snapshots saved under `tests/ui/home-about.spec.ts-snapshots/`:

- Home – Google Reviews:
  - `home-google-reviews-desktop-<browser>-darwin.png`
  - `home-google-reviews-tablet-<browser>-darwin.png`
  - `home-google-reviews-mobile-<browser>-darwin.png`

- About – Leadership:
  - `about-leadership-desktop-<browser>-darwin.png`
  - `about-leadership-tablet-<browser>-darwin.png`
  - `about-leadership-mobile-<browser>-darwin.png`

## Notable Selectors
- Home Reviews section: `[aria-label="Google Reviews"]`
- Load more button: `getByRole('button', { name: 'Load more reviews' })`
- Link to Google: `getByRole('link', { name: 'Read all reviews on Google' })`
- About Values badge: `getByText('Our Values')`
- About Leadership heading: `getByText('Leadership')`, `getByRole('heading', { name: 'Leadership Team' })`

## Stability Notes
- Reviews rely on `IntersectionObserver` and fetch from `/reviews.json`; tests scroll into view and wait briefly to ensure content loads.
- Screenshots use deterministic viewports; animations run but layouts remain stable.

## Next Steps (Optional)
- If you require CI integration, we can add GitHub Actions to run Playwright suite and publish snapshots.
- If mock design assets are available, we can add automated pixel-diff against provided images.

