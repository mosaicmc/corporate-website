# Mosaic MC — i18n Migration and Decisions (Facts Only)

This document captures the current implementation, decisions made, and a phased checklist to migrate Mosaic MC to curated i18n as the primary translation source, with Google Translate as a backup. Open items are explicitly listed to avoid assumptions.

## Migration Overview
- Goal: Curated i18n for all pages; Google Translate as backup until content is frozen and curated translations are complete.
- Scope: Document current architecture, i18n state, behavior, and decisions; define a phased migration plan and open questions.

## Current Architecture (Facts)
- Framework: `React` + `Vite` + `react-router-dom` with lazy-loaded routes.
- Styling: `Tailwind CSS`.
- Theming: Custom `ThemeContext` (`src/contexts/ThemeContext.tsx`), used by `ThemeToggle`.
- App shell: `src/App.tsx` composes `MosaicNavigation` (header), main content, `QuickLinks`, and `Footer` (global).
- Prefetch: `src/lib/prefetch.ts` used by navigation to prefetch routes on hover/focus.

## i18n State (Facts)
- Initialization: `src/i18n/index.ts` uses `i18next`, `react-i18next`, and `i18next-browser-languagedetector`.
  - `fallbackLng: 'en'`, default `lng: 'en'`.
  - Detection order: `['localStorage', 'navigator', 'htmlTag']`; caches: `['localStorage']`.
- Loaded resources (JSON present and imported): `en`, `ar`, `zh`, `es`, `uk`, `ru`, `ps`, `ku`, `vi`, `hi`, `tl`, `it`.
- Coverage: i18n keys primarily cover UI labels (navigation, footer). Long-form page content is hardcoded English and not yet extracted into translation keys.
- RTL handling: `<html dir>` updated at runtime in `LanguageSwitcher` based on selected language.

## Language Switcher Behavior (Facts)
- Component: `src/components/LanguageSwitcher.tsx`.
- Offered languages in UI: `en`, `ar`, `zh`, `zh-tw`, `tl`, `hi`, `vi`, `es`, `it`, `pt`, `fa`, `th`, `sw`, `sm`, `uk`, `ku`.
  - Note: The following offered languages currently do NOT have i18n JSON resources imported: `zh-tw`, `pt`, `fa`, `th`, `sw`, `sm`.
- State & persistence:
  - Calls `i18n.changeLanguage(langCode)`.
  - Sets `<html lang>` and `<html dir>`.
  - Saves `localStorage['preferred-language']`.
  - For non-English, sets the Google Translate cookie `googtrans=/auto/<target>` and reloads to apply machine translation.
  - For English, clears the `googtrans` cookie and reloads.
- Google Translate code mapping: `zh` → `zh-CN`, `zh-tw` → `zh-TW` (cookie mapping).

## Google Translate Integration (Facts)
- Fallback mechanism: Triggered via cookie from `LanguageSwitcher` to translate full page content.
- Widget: `src/components/GoogleTranslateWidget.tsx` renders a Google Translate dropdown; used only in `Footer`.
  - Default `includedLanguages`: `ar,zh-CN,zh-TW,es,uk,ru,ps,ku,vi,hi,tl,it,pt,fa,th,sw`.
  - Reset button clears `googtrans` and reloads.

## Navigation UX Decisions (Facts)
- Canonical header: `src/components/MosaicNavigation.tsx` (global). `Header.tsx` exists but is not used in `App.tsx`.
- Desktop actions (right side): phone icon (`tel:1800813205`), `ThemeToggle`, `LanguageSwitcher`, buttons for `Get Involved` and `Donate`.
- Mobile:
  - Compact `LanguageSwitcher` (globe-only) visible in header bar.
  - Full `LanguageSwitcher` included inside mobile sheet menu.
  - Call shortcut, `Get Involved`, and `Donate` present in the mobile menu.

## Accessibility Decisions (Facts)
- Skip link: Present in `src/App.tsx` (“Skip to content”).
- RTL/LTR: `<html dir>` toggled dynamically via `LanguageSwitcher`.
- ARIA/alt: Many UI labels use `t('...')`; long-form content and all alt/ARIA strings are not comprehensively localized yet.

## SEO Considerations (Facts)
- Current: Single-route structure without language-specific URLs; no `hreflang` tags.
- `<html lang>`: Updated dynamically on language changes.
- Machine translation: Provides no SEO value for localized routes; curated i18n with language routes enables better SEO later.

## Performance and Prefetching (Facts)
- Lazy loading: Pages are lazy-loaded in `src/App.tsx`.
- Prefetch: `prefetchRoute` and `prefetchOnHover` used in navigation to reduce perceived latency.

## Theme Decisions (Facts)
- `ThemeProvider` at app root; `ThemeToggle` in desktop header actions.
- Logo switches based on theme (`/3.png` for dark, `/4.png` for light).

## Known Gaps (Facts)
- Inconsistent language lists: `LanguageSwitcher` offers languages that lack i18n resources.
- Page content not extracted: Long-form content in `src/pages/**` remains hardcoded English.
- Behavior gating not implemented: Currently, machine translation is applied for any non-English selection; no curated-only gate exists yet.
- No glossary/style guide documented for tone consistency per language.

## Open Items Needing Clarity (Questions)
- Curated languages: Which languages will be curated first? (List required.)
- Priority pages: Which pages are phase-one targets? (e.g., Home, Services overview, Contact, About, Locations, key service details.)
- Content freeze: What constitutes “frozen” copy, and who approves it?
- Translation workflow: Owners, review/approval process, SLA; vendor vs internal.
- Glossary/tone: Are language-specific terminology and tone guides required? Any compliance/legal text needing special handling?
- Accessibility scope: Should alt text, labels, and ARIA be localized across all pages? Any RTL-specific requirements?
- SEO strategy: Add `hreflang` tags and language routes (e.g., `/ar/...`)? Update sitemaps accordingly?
- Persistence policy: Confirm `localStorage['preferred-language']` as canonical; any server-side preference needed?
- Cookie policy: Is `googtrans` cookie usage acceptable per privacy policy? Do we need a disclaimer?
- Analytics: Track language selection, machine vs curated usage, and KPI targets?
- Handoff format: Preferred documentation format for future AI tool (Markdown/JSON), and location in repo.

## Phased Migration Checklist

### Phase 0 — Stabilize Current Behavior
- Verify `LanguageSwitcher` visibility and operation on desktop/mobile.
- Confirm non-English sets `googtrans` and reloads; English clears it.
- Ensure Footer widget loads and reset works.
- Validate RTL updates `<html dir>`.

### Phase 1 — Content Freeze & Setup
- Finalize curated language list and priority pages. [OPEN]
- Create `src/i18n/config.ts` with `curatedLanguages` and `fallbackLanguages` for centralized control.
- Define translation workflow, glossary, tone guide, review gates. [OPEN]
- Add dev tooling to log missing translation keys.

### Phase 2 — Curated i18n (Priority Pages)
- Extract hardcoded strings into `t('...')` keys in priority pages.
- Use `Trans` for rich text (inline links/emphasis).
- Localize alt text, ARIA labels, tooltips, and forms.
- Adjust layouts for text expansion and RTL across breakpoints.
- Completeness checks and visual QA for each curated language.

### Phase 3 — Behavior Gate & SEO
- Gate in `LanguageSwitcher`:
  - Curated languages: use `i18n` only (do NOT set `googtrans`).
  - Non-curated: set `googtrans` and reload.
- Add `hreflang` tags and consider language-specific routes with sitemap updates.
- Instrument analytics for language adoption and issues.

### Phase 4 — Expand Coverage
- Migrate remaining pages.
- Add more curated languages per priority.
- Continue QA and glossary maintenance.

## Handoff Artifacts (For Another AI System)
- Key files & paths:
  - i18n init: `src/i18n/index.ts`
  - Language switcher: `src/components/LanguageSwitcher.tsx`
  - Header navigation: `src/components/MosaicNavigation.tsx`
  - Footer & Google widget: `src/components/Footer.tsx`, `src/components/GoogleTranslateWidget.tsx`
  - Prefetch helpers: `src/lib/prefetch.ts`
  - App shell: `src/App.tsx`
- Current language resources: `src/i18n/translations/*.json` matching languages imported in `index.ts`.
- Behavior notes:
  - `localStorage['preferred-language']` persistence.
  - `googtrans` cookie for machine translation fallback.
  - `<html lang>` and `<html dir>` updates.
- Proposed config to add: `src/i18n/config.ts` with `curatedLanguages` list to drive gating logic.

## Risks and Constraints
- Accuracy risks with machine translation (nuance, legal/compliance, cultural terms).
- Layout adjustments required for expanded text and RTL.
- Limited SEO until language routes and `hreflang` exist.
- Inconsistent language offering vs i18n resources can confuse users.

## Next Steps
- Provide answers to the Open Items to lock Phase 1.
- Optionally add `src/i18n/config.ts` and prepare gated behavior behind a feature flag without changing current behavior.
- Begin extraction/migration on agreed priority pages once content is declared frozen.