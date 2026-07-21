---
name: 187theme
description: Palettes, fonts, semantic tokens, theme list/preview/apply/create/audit/export for 187WEB surfaces.
suite: 187SKILLS
skill_version: 1.0.0
contract_version: 2.0.0
last_updated: 2026-07-21
last_verified: 2026-07-21
status: active
replaces: none
deprecated: false
compatible_with:
  - 187webdesign >=0.3.0
requires:
  - docs/SKILL-CONTRACT.md
  - lib/themes/catalog.ts
---

# 187THEME — Theme & Token Skill

## Identity

187THEME is the first-class skill for **semantic themes**: colors, typography, usage notes, and export. It does **not** own 3D heroes, scroll decks, or GSAP timelines — those stay with Motion Lab skills.

## Manual triggers

- `/187theme`
- `/187 theme`
- `187THEME`
- `theme`
- `thm`
- `theme list`
- `theme preview`
- `theme apply`
- `palette`
- `font pairing`
- `/187 craft palette` (routes here)
- `/187 craft fonts` (routes here)

## Automatic triggers

theme, palette, font pairing, design tokens, CSS variables, brand colors, dark mode tokens, theme audit, theme export

## When to use

- List or preview curated themes
- Apply a theme token map to a page or app shell
- Create a custom theme from a brief
- Audit contrast / token completeness
- Export theme JSON or CSS

## When not to use

- Hero animation → `187hero`
- Scroll narrative → `187scroll`
- GSAP implementation → `187gsap`
- Kinetic type motion → `187type`
- Full UI build → `187craft` (orchestration) then theme tokens from here

## Input contract

Theme id or brief; optional target (shell, marketing, motion-lab); export format (json, css, tailwind).

## Output contract

1. Mode (list | preview | apply | create | audit | export)
2. ThemeContract (or list)
3. Token map / CSS variables
4. Contrast notes
5. Next actions (craft, access+, publish)

## Routing rules

- Default visual orchestration remains `187craft`
- Palette/fonts short-circuit to this skill
- Cinematic Launch chain: theme → hero → type → scroll → gsap → craft → access+ → launch → publish

## Safety

- Do not invent inaccessible palettes as defaults
- Flag contrast failures; do not claim WCAG pass without check
- Preserve third-party licenses when importing Theme Factory content

## Integration

- Catalog: `lib/themes/catalog.ts`
- Public JSON: `public/themes/catalog.json`
- Page: `/187theme`
- Docs: `docs/187THEME.md`
- Vendor slot: `third_party/anthropic/theme-factory/`

## Acceptance tests

1. `/187 theme list` → catalog ids  
2. `/187 craft palette` → routes to 187THEME  
3. Theme export → valid ThemeContract JSON  
