# Design QA Rules

## Scope
- Apply these rules by default on all UI changes across themes.
- Use Tailwind tokens and existing brand colors to ensure consistency.

## Visual Hierarchy
- Primary CTAs lead visually; consistent size, weight, and placement.
- Limit simultaneous accents; one clear primary action per view.
- Use headings and spacing to create clear section structure.

## Contrast & Accessibility (WCAG AA)
- Body text contrast ≥ 4.5:1; large text/UI ≥ 3:1.
- Hover/focus states maintain contrast in both themes.
- Keep visible focus rings: `focus:ring-2` with brand `ring` and offset.

## Brand & Theme Coherence
- Use brand tokens: `ocean` (primary), `sky` (accent), `sand`, `earth`, `leaf`.
- Primary CTAs: `bg-ocean text-white` in light and dark themes.
- Avoid `text-white` on lighter tones like `sky` in dark mode; prefer `bg-ocean` or switch text to `foreground`.

## Typography
- Base text ≥ 16px; comfortable line-height for readability.
- Clear H1–H6 hierarchy; avoid low-contrast body copy.
- Use the project font stack; do not introduce new fonts.

## Spacing & Layout
- Consistent spacing rhythm (4–8–12 scale); align to the grid.
- Adequate hit areas and padding for interactive elements.
- Maintain clean negative space; avoid cramped clusters.

## Components & CTAs
- Buttons/links have clear states: default, hover, focus, active, disabled.
- Include text with icons; no icon-only CTAs for key actions.
- Keep shadows and borders subtle; avoid heavy/glassy effects in content areas.

## Dark/Light Parity
- Equal legibility in both themes; test contrast after overlays.
- Dark mode backgrounds stay dark; accents don’t reduce text contrast.
- Reassess gradients and translucency that may lower contrast.

## Motion & Interaction
- Subtle, purposeful transitions; avoid excessive movement.
- Hover/focus feedback is clear and accessible.
- No motion-dependent meaning; ensure keyboard navigability.

## Implementation Guidelines
- Prefer design tokens: `text-foreground`, `text-muted-foreground`, `bg-background`, `border-border`, `ring`.
- Use brand colors sparingly and consistently; avoid raw hex except for controlled brand tweaks.
- Verify hover/focus states and contrast in both themes before shipping.

## Quick Review Checklist
- Primary CTA is visually dominant and on brand.
- Text contrast meets AA; hover/focus preserved.
- Spacing/layout is balanced and aligned.
- Dark/light modes maintain legibility and hierarchy.
- Focus rings visible; keyboard navigation intact.
