# Design system — warm blueprint

Worked example of the 187WEBdesign skill. Tokens: `187webdesign/app/globals.css` · Tailwind: `187webdesign/tailwind.config.ts`

## Concept

**Warm blueprint:** paper + ink + one electric-blue accent, faint measured grid as signature motif. Deliberately *not* templated AI defaults (cream + serif + terracotta; near-black + acid-green). Visual ties to subject: design as precise, measured craft.

## Color

Space-separated RGB channels in `:root` so `bg-accent/10` works.

| Token | Hex | Tailwind | Role |
|-------|-----|----------|------|
| `--bg` | `#FAFAF7` | `bg-bg` | Warm paper — ~60% |
| `--surface` | `#FFFFFF` | `bg-surface` | Cards, raised surfaces |
| `--ink` | `#11131A` | `text-ink` | Primary text, dark blocks |
| `--muted` | `#5B6170` | `text-muted` | Secondary (≥4.5:1 on `bg`) |
| `--line` | `#DDDBD2` | `border-line` | Hairlines, blueprint rules |
| `--accent` | `#2440E6` | `text-accent` / `bg-accent` | Actions & emphasis — ~10% |
| `--accent-ink` | `#FFFFFF` | `text-accent-ink` | Text on accent (≈8:1) |
| `--accent-soft` | `#E8ECFF` | `bg-accent-soft` | Tinted accent surfaces |
| `--success` | `#167A54` | `text-success` | Positive state |
| `--danger` | `#C82638` | `text-danger` | Errors |

**60-30-10:** paper dominates, ink carries structure, accent reserved for primary CTA and key emphasis.

**Contrast:** ink on paper ~16:1; muted on paper ≥4.5:1; white on accent ~8:1.

## Typography

`next/font` with `display: swap`:

- **Display — Space Grotesk** (500/600/700): headings, wordmark, numerals
- **Body — Inter**: everything else

| Utility | Clamp |
|---------|-------|
| `text-display` | `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)` |
| `text-headline` | `clamp(2rem, 1.3rem + 3.4vw, 3.5rem)` |
| `text-title` | `clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)` |

Body ≥16px, line-height 1.6; display ~1.0 with negative tracking. `max-w-prose` (~68ch).

## Spacing & layout

Tailwind default scale (8px rhythm). Blueprint grid: 32px (4 × 8px).

- `.container-x` — max 75rem, responsive padding
- `<Section>` — `py-20 sm:py-28`

## Motion

One orchestrated hero load-in + scroll reveals. Durations 150–300ms (micro) to ~850ms (entrances), `cubic-bezier(0.16, 1, 0.3, 1)`. `prefers-reduced-motion: reduce` disables animation. `<noscript>` shows revealed content.

## Radius & elevation

| Token | Value | Use |
|-------|-------|-----|
| `--radius-xs` | 4px | chips, inline code |
| `--radius-sm` | 8px | buttons, inputs |
| `--radius` | 12px | default |
| `--radius-lg` | 20px | cards, panels |

Shadows: `shadow-card`, `shadow-lift`, `shadow-focus`.

## Components

| Component | Notes |
|-----------|-------|
| `Button` / `ButtonLink` | `primary`/`secondary`/`ghost`; tap targets ≥44px |
| `Container` | Page gutter |
| `Section` | Vertical rhythm + optional header |
| `Reveal` | Scroll reveal, reduced-motion aware |
| `Hero` | Blueprint hero + kinetic headline |
| `ScoringLens` | Signature: award rubric as proportional bars |
| `LeadForm` | One-field capture, accessible states |
| `SiteHeader` | Sticky nav; `<details>` mobile menu |
| `SiteFooter` | Links + dogfood note |
| `Logo` | Crosshair wordmark |

Source: `187webdesign/components/`

## House rules

1. No raw hex in components — token utilities only
2. No arbitrary font sizes — use the scale
3. Every interactive element: hover, focus-visible, active, disabled
4. One signature element per page; keep surroundings quiet
5. Run `CHECKLIST.md` before shipping UI changes