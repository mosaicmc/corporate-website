# Role Card Dialog Interaction

## Overview
Short blurbs are shown on cards. Full blurbs appear in an accessible dialog after clicking the chevron trigger.

## Components
- Card: Shows role `title` and a shortened blurb.
- Trigger: Chevron-only button (`button[aria-haspopup="dialog"]`) with enlarged touch target.
- Dialog: Portal-based modal with title, description, PD link, Apply CTA, and X close.

## States
- Default: Card visible; chevron focusable.
- Hover: Subtle text color change on trigger; card shadow remains minimal.
- Focus: Visible ring (`focus:ring-2`, `focus:ring-ocean`, `focus:ring-offset-2`).
- Open: Dialog overlays page with transparent, blurred backdrop; underlying cards remain visually intact.
- Close: Esc key, overlay click, or X button.

## Transitions
- Dialog: 300ms transition on opacity/scale via Tailwind transitions.
- Micro-interactions: Trigger color hover; CTA hover darken.

## Accessibility
- Trigger: `aria-label="View details"`, `aria-haspopup="dialog"`.
- Dialog: `role="dialog"`, `aria-modal="true"`, `Dialog.Title`, `Dialog.Description`.
- Keyboard: Tab/Shift+Tab cycle; Esc closes; Focus trap managed by Radix.
- Contrast: Text uses `text-foreground`/`text-muted-foreground` on `bg-white/80` or `dark:bg-white/10` meeting AA.
- Touch targets: Trigger `min-w-[40px] min-h-[40px]`; CTAs meet ≥44px height.

## Layout & Stacking
- Portal: `Dialog.Portal` ensures consistent stacking across contexts.
- Overlay & Content `z-[60]` to sit above any card.
- Overlay: `backdrop-blur-sm`, no grey tint.

## Responsive
- Content `max-w-lg`, fluid width, padding scales via Tailwind.
- Works from mobile to desktop.

## Developer Specs
- Trigger classes: `inline-flex justify-center p-2 min-w-[40px] min-h-[40px] rounded focus:ring-2 ...`.
- Overlay classes: `fixed inset-0 z-[60] backdrop-blur-sm`.
- Content classes: `fixed inset-0 z-[60] flex items-center justify-center p-6` with inner container `rounded-3xl border bg-white/80 dark:bg-white/10 p-6 shadow-2xl`.
- Short blurb: `short(s)` utility trims to ~220 chars with ellipsis.
- PD link: `href={`/pd/<location>/${toSlug(title)}.pdf`}`.

## Testing
- Automated: Playwright spec `tests/ui/volunteer-dialog.spec.ts` validates layering and keyboard close.
- Manual: Verify focus ring visibility, Esc close, tab sequence, contrast in both themes.
- Cross-browser: Chromium/Firefox/WebKit via Playwright projects.

## Notes
- Avoid icon-only primary actions; chevron is secondary and labeled via `aria-label`.
- Maintain brand tokens: `ocean`, `sky`, `foreground`, `ring`.

