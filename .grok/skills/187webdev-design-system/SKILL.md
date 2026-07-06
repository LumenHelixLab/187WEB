---
name: 187webdev-design-system
description: >-
  Apply the 187WEBDEV warm-blueprint design system: semantic color tokens,
  Space Grotesk + Inter typography, 8px spacing rhythm, motion rules, and
  showcase components. Use when building or extending UI in the 187webdesign
  showcase, implementing tokens in globals.css/Tailwind, or matching the
  worked example of the 187webdesign skill. Triggers: design system, design
  tokens, warm blueprint, 187webdesign components, /187webdev-design-system.
origin: portfolio
---

# 187WEBDEV — Design System (Warm Blueprint)

The showcase's token-driven system — a worked example of `../187webdesign/SKILL.md`. Read the full spec at `../187webdesign/references/DESIGN-SYSTEM.md`. Live source: `187webdesign/app/globals.css`, `187webdesign/tailwind.config.ts`, `187webdesign/components/`.

## When to use

- Adding or changing UI in the `187webdesign` showcase
- Wiring a new page to existing tokens and components
- Auditing whether a change violates house rules
- Adapting the token pattern to another project (same discipline, different palette)

## Concept (one sentence)

Warm blueprint: paper + ink + electric-blue accent + measured grid — precise craft, not AI-template defaults.

## Agent workflow

1. **Read** `references/DESIGN-SYSTEM.md` (token table, type scale, components).
2. **Tokens first** — add or change values only in `app/globals.css` `:root`, then mirror in `tailwind.config.ts` if a new semantic color/radius/shadow is needed.
3. **Compose** from existing components (`Button`, `Section`, `Container`, `Reveal`, etc.) before inventing one-offs.
4. **Enforce house rules:**
   - No raw hex in TSX/CSS modules — use `bg-bg`, `text-ink`, `text-accent`, etc.
   - No arbitrary `text-[…]` sizes — use `text-display`, `text-headline`, `text-title`, or body defaults.
   - Accent is ~10%: primary CTA and key emphasis only.
   - Interactive elements need hover, `focus-visible`, active, disabled.
   - One signature element per page; surroundings stay quiet.
5. **Motion** — one orchestrated moment + scroll reveals; honor `prefers-reduced-motion`; keep micro-interactions 150–300ms.
6. **QA** — run `../187webdev-qa/SKILL.md` before calling UI done.

## Token quick reference

| Need | Use |
|------|-----|
| Page background | `bg-bg` |
| Card / raised | `bg-surface` |
| Primary text | `text-ink` |
| Secondary text | `text-muted` |
| Hairline / rule | `border-line` |
| Primary CTA | `bg-accent text-accent-ink` |
| Tinted accent area | `bg-accent-soft` |
| Gutter | `.container-x` or `<Container>` |
| Section rhythm | `<Section>` (`py-20 sm:py-28`) |

## Pairing

- `../187webdesign/SKILL.md` — award rubric and holistic craft
- `../187webdev-templates/SKILL.md` — industry-specific palettes (templates use inline Tailwind; showcase uses this system)
- Grok **frontend-design** — when you need a new aesthetic direction beyond warm blueprint