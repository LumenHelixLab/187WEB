---
name: 187webdev-code-review
description: >-
  Strict front-end code review for award-caliber React/HTML5/JS: server-first
  components, useEffect cleanup, a11y, INP, static-export safety, and rAF
  discipline. Use on PRs for marketing sites and landing pages built with the
  187WEBDEV stack. Pairs with design QA checklist. Triggers: front-end code
  review, react review, INP, static export, 187webdev review, /187webdev-code-review.
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