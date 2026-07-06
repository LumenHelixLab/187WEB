# 187WEBdesign — Pre-Ship Audit

Run this before calling any page "done." Map issues back to the scoring lens:
Design (40%) · Usability (30%) · Creativity (20%) · Content (10%).

## First impression (the 5-second test)
- [ ] What/who/why is clear within 5 seconds of the hero loading.
- [ ] Exactly one primary CTA above the fold, visually unmistakable.
- [ ] Hero leads with something characteristic of the subject (not generic stock).
- [ ] There is one obvious focal point per viewport (squint test passes).

## Visual design & hierarchy
- [ ] Type scale is a consistent ratio; no arbitrary font sizes.
- [ ] ≤2 type families, 2–3 weights; display used with restraint.
- [ ] Body line length 50–75 chars; line-height 1.4–1.6; body ≥16px.
- [ ] Color follows ~60-30-10; accent reserved for actions/emphasis.
- [ ] Spacing follows an 8px scale; consistent rhythm between sections.
- [ ] Everything aligns to a grid; optical alignment corrected where needed.
- [ ] Corner radii, shadows, borders are consistent across components.
- [ ] One clear signature element; surrounding UI is quiet and disciplined.
- [ ] Does NOT default to a templated/AI look unless the brief asks for it.

## Content & copy
- [ ] Real content throughout — zero lorem ipsum shipped.
- [ ] Headlines lead with benefit; copy is specific, not clever-for-its-own-sake.
- [ ] CTAs use plain active verbs and keep the same verb through the flow.
- [ ] Empty states, errors, and success messages give direction, not mood.
- [ ] Microcopy labels things by what the user does, not how the system works.

## Conversion
- [ ] One primary action per section; secondary actions visually subordinate.
- [ ] Social proof (logos/testimonials/real numbers) near decision points.
- [ ] Forms are as short as possible; no surprise gates or friction.
- [ ] Scroll narrative flows hook → value → proof → objections → CTA.

## Usability & navigation
- [ ] Nav is obvious; current location is clear; ≤3 clicks to anything key.
- [ ] Interactive elements have hover, focus, active, and disabled states.
- [ ] Links/buttons look clickable; clickable things actually are.
- [ ] 404 and other edge pages are designed, not default.

## Responsive
- [ ] Designed mobile-first; verified at 360 / 768 / 1280 / ultra-wide.
- [ ] Layout reflows (not just shrinks); no horizontal scroll on mobile.
- [ ] Tap targets ≥44px with adequate spacing.
- [ ] Fluid type/spacing via clamp(); images scale correctly.

## Motion
- [ ] Motion serves attention/state; nothing animates just to animate.
- [ ] Durations ≈150–300ms, eased; transitions feel snappy.
- [ ] `prefers-reduced-motion` honored (animations reduced/removed).
- [ ] No scroll-jacking; parallax doesn't jank on mobile.

## Accessibility (WCAG 2.2 AA)
- [ ] Semantic HTML and landmarks; logical heading order (one h1).
- [ ] Text contrast ≥4.5:1; large text / UI / icons ≥3:1.
- [ ] Fully keyboard operable; visible focus indicator everywhere.
- [ ] Images have meaningful alt text; decorative images are empty-alt.
- [ ] Inputs have associated labels; errors announced, not color-only.
- [ ] Color is never the only way information is conveyed.

## Performance (Core Web Vitals)
- [ ] LCP < 2.5s (hero image/font optimized, critical assets preloaded).
- [ ] INP < 200ms (defer non-critical JS; main thread kept free).
- [ ] CLS < 0.1 (explicit width/height or aspect-ratio on media).
- [ ] Images in AVIF/WebP with responsive srcset/sizes; below-fold lazy-loaded.
- [ ] Fonts subset with font-display: swap; render-blocking minimized.
- [ ] Tested on a throttled mobile connection, not just desktop fiber.

## Final pass
- [ ] Removed one element/effect that wasn't earning its place.
- [ ] Cross-browser checked (Chromium, Firefox, Safari/WebKit).
- [ ] Favicon, social/OG preview image, and page titles/meta set.
- [ ] Compared against best-in-class references — does it clear the bar?
