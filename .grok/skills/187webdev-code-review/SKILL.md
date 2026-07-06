---
name: 187webdev-code-review
description: Use when reviewing production front-end code for safety, performance,
  accessibility, and maintainability before merge.
origin: portfolio
---
# 187WEBDEV — Front-End Code Review

Engineering rubric for production-safe, award-caliber front-end code. Pairs with `CHECKLIST.md` (design) — this is engineering.

## Instructions

1. Read `../187webdesign/references/CODE-REVIEW.md`.
2. Review the diff against every checkbox: React/server-first, HTML5/a11y, JS/performance, SSR/static-export safety.
3. Flag with severity:
   - **Blocker** — memory leaks, missing effect cleanup, `window` at module scope on static routes, inaccessible controls, rAF loops running offscreen.
   - **Suggestion** — bundle size, derived state in effects, missing reduced-motion guard.
4. Prove the build path: type-check + lint + static-export build if applicable.
5. Review unhappy paths in the same pass — load `../187webdev-resilience/SKILL.md`.

Budget INP at **160ms** (80% of 200ms) on a throttled device, not a workstation.