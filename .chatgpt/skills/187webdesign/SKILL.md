---
name: 187webdesign
description: >-
  Use when creating, redesigning, art-directing, or critiquing a marketing site, landing page, or product UI.
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/187webdesign/SKILL.md`](../../.claude/skills/187webdesign/SKILL.md).

# 187WEBdesign — How to Make Killer Websites

**Suite:** Part of the [187WEBDEV suite](../../../../skills/187webdev/README.md). Specialized skills:
`187webdev-qa` (pre-ship) · `187webdev-trends` · `187webdev-resilience` ·
`187webdev-templates` · `187webdev-code-review` · `187webdev-design-system`

A contemporary, opinionated playbook for shipping websites that win awards *and*
convert. "187" is the attitude: every element earns its place or it gets cut.
The principles are tool-agnostic — they hold whether you build in React, plain
HTML/CSS, Framer, or Webflow.

This skill is the *system*; the companion `references/CHECKLIST.md` is the
pre-ship audit. For deep aesthetic direction (palette/type personality, taking a
real creative risk, avoiding templated AI looks), also load the **frontend-design**
skill — this one focuses on the holistic craft, performance, and conversion that
separate a good-looking page from an award-winning one.

## When to use this

Building or redesigning any public-facing web page; art-directing a hero;
auditing a site before launch; or critiquing a design. If the task is "make this
look professional / modern / high-end / award-winning," start here.

## The scoring lens (how "award-winning" is actually judged)

Top design awards (Awwwards and peers) score on four weighted axes. Use them as
your internal rubric — design to the weights, not just to taste:

- **Design — 40%.** Visual craft: composition, typography, color, imagery,
  consistency, attention to detail.
- **Usability / UX — 30%.** Navigation clarity, responsiveness, speed,
  intuitiveness, accessibility. *A beautiful site that's hard to use loses.*
- **Creativity — 20%.** A fresh idea or signature moment — something not
  templated. One memorable concept executed well.
- **Content — 10%.** Copy quality, relevance, and how tightly it's integrated
  with the design.

Honorable-mention territory starts around a jury score of ~6.5/10. The gap
between "fine" and "award" is almost always **craft details + one bold idea +
fast, accessible execution** — not more effects.

## Core principles (the kill shots)

### 1. Win the first 5 seconds — the hero is a thesis
A visitor decides in seconds. The hero must answer *what is this, who is it for,
and why care* — instantly. Lead with the most characteristic thing about the
subject (a sharp headline, a real product shot, a live demo, an interactive
moment), not a generic stock image + "Lorem-style" tagline. One primary CTA,
unmistakable. Avoid the default "big number + small label + gradient blob"
unless it's genuinely the strongest option.

### 2. Hierarchy is the message
Guide the eye on purpose with size, weight, color, contrast, and spacing. There
is exactly **one** focal point per view; everything else supports it. If
everything shouts, nothing is heard. Squint at the screen — the most important
thing should still be obvious.

### 3. Typography carries the personality
- **Type scale:** pick a ratio (1.2 minor third → 1.333 perfect fourth) and use
  a consistent modular scale. No arbitrary sizes.
- **Pairing:** a characterful display face used with restraint + a clean,
  legible body face. 2 families, 2–3 weights. Consider **variable fonts** for
  personality without the load cost.
- **Readability:** body line length **50–75 characters**; line-height **1.4–1.6**
  for body, tighter (1.0–1.2) for large display; body size **≥16px**.
- Make the type treatment itself memorable — not a neutral delivery vehicle.

### 4. Color with intent and contrast
- **60-30-10:** ~60% dominant/neutral, 30% secondary, 10% accent. The accent is
  reserved for actions and emphasis — don't dilute it.
- **Contrast is non-negotiable:** ≥**4.5:1** for body text, ≥**3:1** for large
  text and meaningful UI/icons (WCAG AA). Check it; don't eyeball it.
- Define semantic tokens (bg, surface, text, muted, accent, success, danger) —
  not one-off hex values scattered through the build.

### 5. Layout, grid & whitespace
- Work on a grid (commonly 12-col) and a spacing scale (**8px base**: 4/8/12/16/
  24/32/48/64…). Consistent rhythm reads as "crafted."
- **Whitespace is active.** Generous spacing signals quality and focus; cramped
  layouts read as cheap. Let the hero breathe.
- Align everything to something. Optical alignment beats mechanical when they
  disagree.

### 6. Motion that serves, never decorates
Use motion to direct attention and explain state: page-load reveal, scroll-
triggered entrances, hover micro-interactions, meaningful transitions. Prefer
**one orchestrated moment** over scattered effects (scattered animation is the
tell of an AI-generated page). Keep it fast (≈150–300ms, eased). **Always honor
`prefers-reduced-motion`.** Never scroll-jack; avoid heavy parallax on mobile —
it janks and tanks Core Web Vitals.

### 7. Responsive, mobile-first, real-thumb-friendly
Design the small screen first, then enhance up. Fluid type/space (`clamp()`),
flexible images, and layouts that *reflow* rather than shrink. Tap targets
**≥44px** with adequate spacing. Test at 360px, 768px, 1280px, and ultra-wide.
Most traffic is mobile — a desktop-only "wow" that breaks on a phone fails
usability (30% of the score).

### 8. Accessibility is design quality (WCAG 2.2 AA)
Treat it as craft, not a checkbox: semantic HTML/landmarks, logical heading
order, visible keyboard focus, full keyboard operability, alt text, labeled
inputs, and color that isn't the only signal. Accessible sites are usually the
clearest sites — and usability is 30% of the score.

### 9. Speed is a feature — Core Web Vitals
Fast *feels* premium and Google ranks it. Targets:
- **LCP < 2.5s** — optimize the hero image/font; preload critical assets.
- **INP < 200ms** — keep the main thread free; defer non-critical JS.
- **CLS < 0.1** — set explicit `width`/`height` (or `aspect-ratio`) on media;
  reserve space; avoid layout-shifting late content.
Ship modern image formats (**AVIF/WebP**, responsive `srcset`/`sizes`),
lazy-load below the fold, subset/`font-display: swap` fonts, and minimize
render-blocking resources.

### 10. Content & copy are design material
Words exist to make the page easier to understand and use. Write from the user's
side of the screen: name things by what people do, lead with the benefit, be
specific over clever. Active, plain CTAs ("Start free trial," not "Submit") that
keep the same verb through the flow. Treat empty/error states as direction, not
mood. Generic copy makes a design feel as templated as a generic layout.

### 11. Convert, don't just impress
Award sites that *work* respect conversion: one clear primary action per view,
**social proof** (logos, testimonials, real numbers) near decision points,
remove friction (short forms, no surprise gates), and a logical scroll
narrative: hook → value → proof → objection-handling → CTA. Beauty earns
attention; structure earns the click.

### 12. Craft details & the anti-generic rule
Awards live in the last 10%: consistent corner radii, aligned optical edges,
hover/focus/active/disabled states for every interactive element, real (not
lorem) content, pixel-tight spacing, and a cohesive system. **Avoid the current
AI/template defaults** unless the brief truly calls for them: cream background +
high-contrast serif + terracotta accent; near-black + single acid-green/vermilion
accent; or hairline "broadsheet" columns. When an axis is free, spend it on a
choice specific to *this* subject. Spend your boldness in **one** signature
element and keep everything around it quiet and disciplined.

## Workflow: research → direction → wireframe → tokens → build → critique → QA

1. **Brief & research.** Pin the subject, audience, and the page's single job.
   Gather real content. Look at 3–5 best-in-class references (the *bar*, not
   things to copy).
2. **Direction.** Choose one concept and a signature moment. Write a compact
   token plan: 4–6 named colors, 2 typefaces + scale, layout concept (ASCII
   wireframe is fine), and the one element this page is remembered by.
3. **Critique the plan against the brief** *before* building. If any part reads
   like the generic default you'd produce for any similar page, revise it and
   say why.
4. **Wireframe** structure and hierarchy in grayscale first — prove the
   hierarchy works before adding color/imagery.
5. **Build** to the tokens. Define design tokens once (CSS variables / theme).
   Mobile-first. Watch CSS specificity so section/utility selectors don't cancel
   each other's spacing.
6. **Critique as you go.** Screenshot, squint, compare to the bar. Apply
   Chanel's rule — remove one thing before you ship.
7. **QA** against `references/CHECKLIST.md` (responsive, a11y, performance,
   states, copy) before calling it done.

## What loses awards (avoid)
Slow load / poor Core Web Vitals · broken or awkward mobile · low contrast /
inaccessible · scroll-jacking and gratuitous motion · templated/AI-default look
with no point of view · cluttered hero with no clear focus or CTA · lorem
placeholder shipped as real · inconsistent spacing and missing interactive
states · style with no usability behind it.

## Related skills
- **[187web Ecosystem v2](../187web-ecosystem/SKILL.md)** — the Charlotte "Killer Web" integration stack (prompt engineering, inference tuning, specialist personas, autonomous web research, and isolated execution). Load it when a task spans multiple layers of the stack.

## Resources
- Awwwards evaluation system — the rubric above: https://www.awwwards.com/about-evaluation/
- Web.dev Core Web Vitals (LCP/INP/CLS thresholds & fixes): https://web.dev/vitals/
- WCAG 2.2 quick reference: https://www.w3.org/WAI/WCAG22/quickref/
- Companion: `references/CHECKLIST.md` (pre-launch audit) and the **frontend-design** skill (aesthetic direction).

### Further references in this skill
- `references/TRENDS-2026.md` — current trends + the hard standards (Core Web Vitals 2026, WCAG 2.2 AA, server-first React), with sources. Re-verify before quoting numbers.
- `references/RESILIENCE.md` — the unhappy-path matrix and prebuilt redundancy (skeletons, error boundaries, offline/empty/error states). Review the failure path in the same pass as the feature.
- `references/TEMPLATES.md` — a 14-industry gallery showing how to adapt the rubric per brief rather than reusing one look.
- `references/CODE-REVIEW.md` — a React/HTML5/JS review rubric (hooks cleanup, a11y, INP, static-export safety) + this repo's findings.
- `references/DESIGN-SYSTEM.md` — warm-blueprint token system (worked example); load `187webdev-design-system` when implementing UI.
- Live demos: `/` (immersive showcase), `/templates` (gallery), `/resilience` (failure-mode demos).

