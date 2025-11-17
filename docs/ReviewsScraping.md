# Reviews Scraping, Selection, Verification, and Monitoring

## Overview
This system sources genuine Google reviews for Mosaic directly from Google and displays an unaltered, transparent selection of the best recent reviews. It uses two sources:

- Headless scraper (Puppeteer) to extract review content and direct review URLs from the public Google Maps reviews page.
- Google Places API to validate review text and rating against the canonical source.

## Requirements Addressed
- Authenticity: Reviews are fetched from Google Maps and verified against Google Places API. No fabricated or modified content is introduced.
- Selection: Top 6 are auto-picked using rating, recency, and content quality signals.
- Direct Links: Each review card links to the actual Google review URL when available; fallback to the place’s reviews page.
- Verification: Cross-checks confirm displayed review text and ratings match the API.
- Monitoring: CI workflow runs daily to detect and flag any discrepancies.

## Configuration
Set these environment variables:

- `GOOGLE_REVIEWS_URL`: Public URL to your Google Maps place reviews page (e.g., `https://maps.app.goo.gl/...`).
- `GOOGLE_MAPS_API_KEY`: Server-side key for Google Places API.
- `GOOGLE_PLACE_ID`: Google Places `place_id` for the organization.

## Commands
- Scrape and select: `npm run scrape:reviews`
- Verify authenticity: `npm run verify:reviews`
- UI tests and visual checks: `npx playwright test --reporter=list`

## Data Flow
1. Puppeteer loads `GOOGLE_REVIEWS_URL`, opens the Reviews panel, scrolls to load content, and extracts:
   - `id`, `authorName`, `authorProfileUrl`, `authorAvatarUrl`, `rating`, `dateText`, `text`, `reviewUrl`.
2. Places API fetch (`reviews`, `url`, `place_id`): used to match scraped items, confirm text and rating, and provide timestamp.
3. Selection: Top 6 are chosen prioritizing 5-star ratings, recent timestamps, and well-written content (longer text).
4. Output written to `public/reviews.json` with `placeUrl`, `fetchedAt`, and selected `reviews`.
5. Verification report: `QA/reviews-verification.json` summarizes matches and flags discrepancies.

## Selection Details
Score = rating weight + recency weight + content length weight.
- Rating: 5★ = 100, 4★ = 80, else `rating * 10`.
- Recency: scaled by `timestamp` when available from API.
- Content quality: proportional to `text.length`.

## Linking to Actual Reviews
- `reviewUrl` is extracted from anchors within each review card on Google Maps (e.g., URLs containing `#lrd` or review-specific parameters).
- If a direct `reviewUrl` is not available, the link falls back to the place’s reviews page (`placeUrl`).

## Verification Logic
- Matches are made by authorName or text inclusion (normalized whitespace/case).
- Rating and text must match the Places API values; mismatches are flagged.
- Report includes item-level hashes of normalized text and a count of discrepancies.

## Monitoring (CI)
- Workflow: `.github/workflows/reviews-monitor.yml`
- Runs daily via cron and on demand via `workflow_dispatch`.
- Steps: `npm ci` → `scrape:reviews` → `verify:reviews` → upload `QA/reviews-verification.json`.
- Configure repository secrets:
  - `GOOGLE_REVIEWS_URL`, `GOOGLE_MAPS_API_KEY`, `GOOGLE_PLACE_ID`.
- The job fails if verification detects discrepancies (non-zero exit), ensuring integrity.

## Transparency & Audit
- The generated `public/reviews.json` and `QA/reviews-verification.json` preserve a clear trail of what is displayed and what was verified.
- No transformations alter meaning; HTML is sanitized strictly to prevent markup artifacts while keeping text intact.

## Notes
- Google DOM is subject to change; scraper uses heuristic selectors and is resilient but may need updates.
- Places API returns up to a limited number of reviews; not all visible reviews may be available in API responses. The verification flags such cases but does not substitute content.

