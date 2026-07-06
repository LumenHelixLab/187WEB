# Template gallery — range across industries

Fourteen *completely different* templates, each a distinct design language and
component set, proving the skill adapts the rubric to the brief instead of
stamping one look on everything. Live: **`/templates`** on the showcase; source
under `app/templates/<slug>/`.

| Template | Industry | Design language | Signature componentry |
|----------|----------|-----------------|-----------------------|
| **Nimbus** | SaaS / Startup | Dark, gradient, glow | Pricing tiers, feature bento, logo cloud |
| **Marketplace** | E-commerce | Light, product-forward, amber | Product grid, category filters, cart, sale bar |
| **Lattice Lab** | Scientific / Research | Serif + mono, journal | Abstract, captioned figure, authors, citation, refs |
| **STUDIO/187** | Creative agency | Brutalist, lime, oversized type | Marquee, case-study index, awards row |
| **Maya Chen** | Portfolio | Minimal, off-white, ink | Project grid, about, contact card |
| **Ember & Oak** | Restaurant | Dark, gold serif | À la carte menu w/ leaders, hours, reserve |
| **Vault** | Fintech / Banking | Deep navy, mint, trust | Stat counters, rates table, app mock, security |
| **Wellspring** | Healthcare | Calm teal, accessible | Services, appointment form, credentials |
| **Curio** | Education | Bright, indigo + yellow | Curriculum list, instructors, enroll |
| **Rootwork** | Nonprofit | Forest green, cream | Impact counters, donation tiers, field stories |
| **Frequency** | Events / Conference | Dark neon, energetic | Countdown, schedule timeline, speaker grid, tickets |
| **Maison** | Real estate | Cream serif, premium | Search bar, listing cards, agent profile |
| **Forge API** | Developer tool | Terminal dark, mono | Install command, code block, API reference |
| **The Dispatch** | News / Editorial | Broadsheet, serif, red | Masthead, lead story, multi-column, article grid |

## How they're built (and what they demonstrate)

- **Choosing**: each picks one pole from `TRENDS-2026.md` (dopamine vs. calm,
  serif-editorial vs. neon, brutalist vs. minimal) appropriate to the audience —
  *not* a single house style reused.
- **Making**: bespoke componentry per domain (pricing tables, menus with dotted
  leaders, journal figures, rates tables, schedules, listings, code blocks).
- **Integrating**: shared primitives are reused where they fit (the showcase
  `Marquee` in the agency template, `CountUp` in fintech/nonprofit, the
  `TemplateBar` chrome everywhere) — composition over duplication.
- **Standards**: all are static-export safe, server-first (minimal client JS),
  responsive, and keep WCAG 2.2 touches (labeled inputs, ≥24px targets, visible
  focus, contrast).

## Using a template as a starting point

Copy `app/templates/<slug>/page.tsx` to a new route, swap the copy/colors for the
real brand, replace gradient placeholders with real media (use
`ImageWithFallback`), then run the pre-ship `CHECKLIST.md`. The per-template
palette lives inline as Tailwind classes so each is self-contained.
