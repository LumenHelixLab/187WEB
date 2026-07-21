# 187THEME — palettes, fonts, semantic tokens

> **Canonical skill:** [`.claude/skills/187theme/SKILL.md`](.claude/skills/187theme/SKILL.md)

## Start here

**187THEME** owns theme list, preview, apply, create, audit, and export. It is the single place for palettes and font pairings — not a second design system.

**Motion Lab stays separate:** hero, scroll, GSAP, type, model, viz, motion, audio keep their skills. Theme only supplies color/type contracts those surfaces consume.

## Try this

```text
/187 theme list
/187 theme preview abyssal-killer
/187 theme apply warm-blueprint
/187 theme audit
/187 theme export
```

Legacy (still routes here):

```text
/187 craft palette  → 187THEME
/187 craft fonts    → 187THEME
```

## Commands

| Command | Purpose |
|---------|---------|
| `list` | Show catalog ids and names |
| `preview <name>` | Show colors + type for a theme |
| `apply <name>` | Emit CSS variables / token map for a target surface |
| `create` | Draft a new ThemeContract from a brief |
| `audit` | Contrast and token completeness check |
| `export` | JSON / CSS / Tailwind snippet |

## Contract

See `lib/themes/types.ts` and `lib/themes/catalog.ts`. Public JSON: `/themes/catalog.json`.

## Vendor note

Anthropic Theme Factory (if vendored) lives under `third_party/anthropic/theme-factory/` with its Apache-2.0 license retained. Native catalog themes are 187WEB-owned.

## Routes

- Skill page: `/187theme`
- Catalog: `lib/themes/catalog.ts`
- Craft motion routing: see 187CRAFT SKILL.md (theme ≠ hero/scroll)
