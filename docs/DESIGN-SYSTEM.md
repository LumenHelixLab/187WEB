# Design system

The system the showcase is built on — and a worked example of the 187WEBdesign skill. Tokens are declared once in [`app/globals.css`](../app/globals.css) and surfaced to Tailwind in [`tailwind.config.ts`](../tailwind.config.ts).

## Concept

A **warm blueprint**: paper + ink + one electric-blue accent, with a faint measured grid as the signature motif. It's deliberately *not* the templated AI defaults the skill warns about (cream + serif + terracotta; near-black + acid-green). The concept ties the visual to the subject: design as precise, measured craft.

## Color

Stored as space-separated RGB channels so `bg-accent/10` (alpha) works.

| Token         | Hex       | Tailwind        | Role |
|---------------|-----------|-----------------|------|
| `--bg`        | `#FAFAF7` | `bg-bg`         | Warm paper background — the ~60% |
| `--surface`   | `#FFFFFF` | `bg-surface`    | Cards, raised surfaces |
| `--ink`       | `#11131A` | `text-ink`      | Primary text, dark blocks |
| `--muted`     | `#5B6170` | `text-muted`    | Secondary text (≥4.5:1 on `bg`) |
| `--line`      | `#DDDBD2` | `border-line`   | Hairlines, blueprint rules |
| `--accent`    | `#2440E6` | `text-accent` / `bg-accent` | Actions & emphasis only — the ~10% |
| `--accent-ink`| `#FFFFFF` | `text-accent-ink` | Text on accent (≈8:1) |
| `--accent-soft`| `#E8ECFF`| `bg-accent-soft`| Tinted accent surfaces |
| `--success`   | `#167A54` | `text-success`  | Positive state |
| `--danger`    | `#C82638` | `text-danger`   | Errors |

**60-30-10 in practice:** paper dominates, ink carries structure, accent is reserved for the primary CTA and key emphasis. If the accent shows up everywhere, it stops meaning "do this."

**Contrast:** ink on paper is ~16:1; muted on paper clears AA body text (≥4.5:1); white on accent is ~8:1. Don't eyeball it — these are chosen to pass.

## Typography

Two families, loaded via `next/font` with `display: swap`:

- **Display — Space Grotesk** (500/600/700): headings, the wordmark, numerals. Geometric and a touch technical, suiting the blueprint concept. Variable in feel, used with restraint.
- **Body — Inter**: everything else. A legibility workhorse.

Fluid modular scale via `clamp()` (defined in `tailwind.config.ts`):

| Utility          | Clamp |
|------------------|-------|
| `text-display`   | `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)` |
| `text-headline`  | `clamp(2rem, 1.3rem + 3.4vw, 3.5rem)` |
| `text-title`     | `clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)` |

Body stays ≥16px with line-height 1.6; display tightens to ~1.0 with negative tracking. Prose width is capped (`max-w-prose`, ~68ch) to keep lines in the 50–75 character readability range.

## Spacing & layout

Spacing uses Tailwind's default scale (4/8/12/16/24/32/48/64…), which matches the skill's **8px rhythm**. The blueprint grid is `32px` (4 × 8px) so the motif and the layout share a beat.

- Page gutter: `.container-x` (max 75rem, responsive padding) — one definition, used everywhere.
- Sections: consistent `py-20 sm:py-28` rhythm via `<Section>`.

## Motion

- **One orchestrated load-in** (hero headline rises) + **scroll reveals** for sections — nothing animates just to animate.
- Durations 150–300ms (micro-interactions) up to ~850ms (entrances), all eased with `cubic-bezier(0.16, 1, 0.3, 1)`.
- **`prefers-reduced-motion: reduce`** disables reveals, the headline animation, and smooth scroll, and shows all content immediately.
- A `<noscript>` override keeps revealed content visible when JS is off.

## Radius & elevation

| Token        | Value | Use |
|--------------|-------|-----|
| `--radius-xs`| 4px   | chips, inline code |
| `--radius-sm`| 8px   | buttons, inputs |
| `--radius`   | 12px  | default |
| `--radius-lg`| 20px  | cards, panels |

Shadows are subtle and consistent: `shadow-card` (rest), `shadow-lift` (raised), `shadow-focus` (focus ring).

## Components

| Component       | Notes |
|-----------------|-------|
| `Button` / `ButtonLink` | Variants `primary`/`secondary`/`ghost`; sizes keep tap targets ≥44px; internal vs external links handled automatically. |
| `Container`     | The single page gutter. |
| `Section`       | Vertical rhythm + optional eyebrow/title/intro header. |
| `Reveal`        | Scroll-into-view animation, reduced-motion aware. |
| `Hero`          | The thesis: signature blueprint hero with kinetic headline. |
| `ScoringLens`   | The signature moment: the award rubric as proportional bars. |
| `LeadForm`      | One-field capture with honest, accessible states. |
| `SiteHeader`    | Sticky nav; JS-free `<details>` menu on mobile. |
| `SiteFooter`    | Links + the dogfood note. |
| `Logo`          | Crosshair wordmark (precision = the "187" attitude). |

## House rules

1. **No raw hex in components** — use token utilities.
2. **No arbitrary font sizes** — use the scale.
3. **Every interactive element** has hover, focus-visible, active, and disabled states.
4. **One signature element** per page; keep everything around it quiet.
5. **Run the [checklist](../.claude/skills/187webdesign/references/CHECKLIST.md)** before shipping a UI change.
