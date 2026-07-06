# Trends & standards — 2026 edition

A living scan of what's *current, trending, and required* in web design and
front-end engineering, so the rubric stays honest. Treat **trends** as optional
spice and **standards** as non-negotiable. When they conflict, standards win.

> Researched June 2026. Re-verify the hard numbers (Core Web Vitals, WCAG) before
> citing them in client work — thresholds move.

## Design & UX trends (use with intent, never by default)

- **Two poles in tension: "dopamine" vs. "calm."** Bold, saturated palettes,
  oversized + custom/variable type, kinetic text and expressive motion on one
  side; calmer, content-first, low-chrome interfaces on the other. Pick the pole
  that fits the brief — don't blend them into mush. (Figma, Tubik, Envato)
- **Immersive depth, used sparingly.** 3D/WebGL, scroll-triggered scenes, subtle
  AR previews — reserved as the *one* signature moment, never the whole page.
- **Motion that guides, not flashes.** Orchestrated reveals, state transitions,
  and micro-interactions that explain change. Scattered animation is the tell of
  a templated/AI page.
- **Brutalist / "anti-design" accents & invisible logic.** Raw type, visible
  grids, intentional asymmetry — paired with genuinely smart defaults.
- **AI as a copilot, not an autopilot.** Optional, transparent, interruptible
  assistance — not a forced chatbot. Show provenance; let users opt out.
- **Personalization & adaptation** by segment/behavior, and **sustainability**
  (lean code, optimized media, low-carbon hosting) as a first-class concern.

## UI/UX standards (the bar, not the trend)

- **Clarity & hierarchy first** — one focal point per view; the 60-30-10 color
  discipline; an 8px spacing rhythm; 50–75ch line length.
- **Mobile-first & fluid** — `clamp()` type/space, reflow over shrink, **≥24×24px
  (ideally ≥44px) tap targets** (WCAG 2.2 SC 2.5.8).
- **Forms** — labels always visible, inline + summarized errors, `autocomplete`,
  correct `inputmode`/`type`, no destructive surprises, **Redundant Entry** and
  **Accessible Authentication** (no memory/cognitive-only gates).
- **Honest states** — every surface designs its loading, empty, error, and
  offline state, not just the happy path (see `RESILIENCE.md`).

## Performance standards — Core Web Vitals 2026

Google's March 2026 core update **tightened LCP**. Pass = all three at **p75** of
real users:

| Metric | Good | Needs work | Notes |
|--------|------|-----------|-------|
| **LCP** | **< 2.0s** | 2.0–2.5s | Tightened from 2.5s in 2026 |
| **INP** | **< 200ms** | 200–500ms | Most-failed vital (~43% of sites) |
| **CLS** | **< 0.1** | 0.1–0.25 | Reserve space; set dimensions |

Alert at **80% of budget** (LCP 2.0s, INP 160ms, CLS 0.08). INP is now the hard
one: **break long tasks, `yield` to the main thread, defer non-critical JS, shrink
DOM, and keep client islands small.** (digitalapplied, web.dev)

## Architecture standards — server-first React

- **Server Components by default; client islands only for interactivity.** Pure
  server components ship **0 KB** JS; app/ over pages/ typically cuts bundle
  ~40%. Isolate `"use client"` to the smallest leaf.
- **Explicit caching** with TTL + invalidation; avoid N+1; measure on realistic
  data. RSC is an architecture, not a free speed-up.
- **Static-first where possible** (this repo's GitHub Pages demo is a full static
  export); progressive enhancement so core content works before/without JS.

## Accessibility standards — WCAG 2.2 AA

Current W3C standard (Oct 2023): **86 criteria, 56 at AA**, structured by **POUR**
(Perceivable, Operable, Understandable, Robust). Referenced by the ADA, the
European Accessibility Act, and Section 508. The **9 new** criteria most relevant
to marketing/product sites:

- **2.4.11 Focus Not Obscured (AA)** — focused elements stay at least partly
  visible (mind sticky headers).
- **2.5.7 Dragging Movements (AA)** — provide a non-drag alternative.
- **2.5.8 Target Size (Minimum) (AA)** — interactive targets **≥ 24×24 CSS px**.
- **3.3.7 Redundant Entry / 3.3.8 Accessible Authentication (AA)** — don't force
  re-entry or memory/puzzle-only logins.

Baseline always: semantic landmarks, logical heading order, visible focus, full
keyboard operability, alt text, labeled inputs, prefers-reduced-motion, and color
that is never the only signal.

## How this repo applies the above

- **Static export, server-first**, text/SVG/canvas visuals (no raster LCP),
  `next/font` swap → CWV-friendly by construction.
- **Client islands only** for the animated bits; everything honors
  `prefers-reduced-motion`; canvases pause when offscreen (see `CODE-REVIEW.md`).
- **WCAG 2.2 touches**: skip link, focus-visible tokens, ≥24px targets, labeled
  controls, aria-hidden on decorative motion, reduced-motion fallbacks.
- **Resilience built in** (`RESILIENCE.md`) and a **template gallery**
  (`TEMPLATES.md`) that demonstrates the trend/standard range across industries.

## Sources

- [Figma — Web design trends](https://www.figma.com/resource-library/web-design-trends/) ·
  [Tubik — UI trends 2026](https://tubikstudio.com/blog/ui-design-trends-2026/) ·
  [Envato — UX/UI trends](https://elements.envato.com/learn/ux-ui-design-trends) ·
  [Fireart — brutalist UX](https://fireart.studio/blog/the-best-web-design-trends/)
- [Core Web Vitals 2026 guide](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide) ·
  [web.dev — Vitals](https://web.dev/vitals/)
- [React 19 RSC production patterns](https://www.growin.com/blog/react-server-components/) ·
  [react.dev — React 19](https://react.dev/blog/2024/12/05/react-19)
- [WCAG 2.2 checklist](https://www.levelaccess.com/blog/wcag-2-2-aa-summary-and-checklist-for-website-owners/) ·
  [W3C WAI — WCAG 2](https://www.w3.org/WAI/standards-guidelines/wcag/)
