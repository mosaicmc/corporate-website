# Changelog

## 2025-11-13

### Added
- Implemented Playwright UI test suite `tests/ui/home-about.spec.ts`:
  - Validates Home Google Reviews section rendering and interactions (load more).
  - Visual snapshots for Home Google Reviews: mobile, tablet, desktop.
  - Validates About Values grid (4 cards) and Leadership grid (3 cards with Avatars).
  - Visual snapshots for About Leadership: mobile, tablet, desktop.
- Scoped Playwright config to UI specs only (`playwright.config.ts`):
  - `testDir: './tests/ui'`
  - `testMatch: /.*\\.spec\\.ts/`
  - Ensures Vitest unit tests do not run under Playwright.
- QA report added at `QA/QA-Report.md` with results and screenshot locations.

### Changed
- Confirmed Home page integrates `GoogleReviews` with accessible selectors, and About page redesigned using ShadCN `Card` and `Avatar` components for Values and Leadership.

### Notes
- Breakpoint screenshots generated under `tests/ui/home-about.spec.ts-snapshots/` for all three browsers.
- Preview servers available at `http://localhost:4173/` and `http://localhost:4174/` during validation.

