# Architecture

A small, deliberately boring stack so the *design* can be the interesting part. This document explains how the pieces fit and the reasoning behind the choices.

## High-level

```
Browser
  │   (HTML/CSS first paint — text-based LCP, no blocking images)
  ▼
Next.js App Router (server components)
  ├─ app/layout.tsx ........ fonts, metadata, header/footer, skip link
  ├─ app/page.tsx .......... showcase; awaits safeLeadCount() (null-safe)
  └─ app/api/* ............. route handlers (the "backend")
        │
        ▼
  lib/db.ts (lazy Prisma singleton) ──► PostgreSQL
        ▲
  lib/validation.ts (Zod) — shared input contract
```

## Rendering model

- **Server components by default.** The page and sections render on the server; only the bits that need interactivity (`Reveal`, `LeadForm`) are client components (`"use client"`).
- **Static + revalidate.** `app/page.tsx` sets `export const revalidate = 300`. It calls `safeLeadCount()`, which returns `null` when no database is configured — so the page renders statically at build time *without* a database and refreshes the count periodically in production.
- **No layout shift from motion.** Scroll reveals animate `opacity`/`transform` only; bar widths animate inside a fixed-height track. Nothing reflows, protecting CLS.

## The "backend"

Route handlers in `app/api` are the server. They're intentionally tiny:

- `POST /api/lead` — parse JSON → validate with the shared Zod schema → persist via Prisma. Unknown DB ⇒ HTTP 200 "preview mode"; duplicate email ⇒ treated as success (idempotent UX); unexpected error ⇒ HTTP 500 with a friendly message.
- `GET /api/lead` — `count()` for social proof.
- `GET /api/health` — liveness for deploys/uptime checks.

### Null-safe persistence

`lib/db.ts` exposes `getPrisma()`, which returns `null` when `DATABASE_URL` is unset, and `safeLeadCount()`, which never throws. This is what makes "clone and run, no setup" possible while keeping a *real* persistence layer one env var away. It also models the skill's rule that **empty/degraded states should give direction, not break**.

## Content as data

All page copy (rubric, principles, workflow, checklist categories, site metadata) lives in `lib/content.ts` as typed exports. The showcase, the docs links, and the footer all read from it — one edit updates everything, and the content stays honestly in sync with [`CHECKLIST.md`](../.claude/skills/187webdesign/references/CHECKLIST.md).

## Styling pipeline

```
app/globals.css  ──(CSS variables: --bg, --ink, --accent, --radius, …)
      │
      ▼
tailwind.config.ts  ──(maps tokens to utilities: bg-bg, text-accent, …)
      │
      ▼
components + app  ──(utilities only; no scattered hex, no magic numbers)
```

Colors are stored as space-separated RGB channels so Tailwind's `<alpha-value>` works (`bg-accent/10`). See [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md).

## Why these choices

| Decision | Reason |
|----------|--------|
| Next.js App Router | One framework for UI **and** API; great defaults for performance. |
| Tailwind + CSS-var tokens | Utility velocity *and* a single source of visual truth. |
| Prisma + Postgres | Typed schema; trivial local/prod parity via Docker. |
| Zod | The same validation contract on server (and reusable on the client). |
| SVG/CSS visuals, no raster | Fast LCP, zero image weight, crisp at any DPI. |
| `next/font` (2 families) | Self-hosted, `display: swap`, honors the skill's "≤2 families" rule. |
| CSS + IntersectionObserver for motion | No animation library to ship; full control; reduced-motion friendly. |

## Extending it

- **New section:** add data to `lib/content.ts`, render with `<Section>` + `<Reveal>` in `app/page.tsx`.
- **New model:** edit `prisma/schema.prisma`, run `npm run db:push`, add a route handler under `app/api/`.
- **New component:** keep it token-driven (use the Tailwind color/space utilities, never raw hex).
