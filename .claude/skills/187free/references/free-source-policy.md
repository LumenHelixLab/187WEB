# 187FREE — Free Source Policy

This document defines what counts as a valid free source for 187FREE recommendations. A tool or service must satisfy at least one primary category and pass the checklist before it is suggested.

## Primary categories

| Category | Definition | Examples |
|----------|------------|----------|
| **Free tier** | A documented, indefinitely available no-cost plan with published limits. | Vercel Hobby, Supabase Free, Cloudflare Workers Free |
| **Open source** | Source code under an OSI-approved license; self-hostable or packaged. | PostgreSQL, Nginx, Penpot, Plausible (self-hosted) |
| **Public API** | An API explicitly offered at no cost with documented rate limits and terms. | OpenLibrary, OpenStreetMap, NOAA APIs |
| **Public domain** | Content or code free of copyright restrictions, clearly marked. | NASA media, US government datasets, CC0 works |
| **Local-first** | Runs primarily on the user's device; minimal or no remote dependency. | Obsidian, SQLite, llama.cpp, Immich (self-hosted) |
| **Low-cost bootstrap** | A credit-based starter plan, student/nonprofit grant, or one-time cheap option under ~$20/year that removes typical free-tier friction. | GitHub Student Pack, Namecheap promo domains |

## Hard requirements

A source must meet all of these to be recommended:

- [ ] **Documented pricing/TOS** — free terms are publicly readable.
- [ ] **No hidden payment wall** — sign-up does not require a card for the free tier unless clearly justified.
- [ ] **Published limits** — bandwidth, storage, requests, users, or compute limits are stated.
- [ ] **Documented upgrade path** — what paid plan or migration is required when limits are hit.
- [ ] **Active maintenance** — open-source projects show commits/releases within the last 12 months; services show status-page activity.

## Soft preferences

Prefer sources that also satisfy these:

- [ ] **Private-by-default** — minimal telemetry, no forced account linking.
- [ ] **Open standards** — uses exportable formats and avoids proprietary lock-in.
- [ ] **Self-hostable** — open-source or containerized option exists.
- [ ] **Accessible UX** — meets basic WCAG contrast/keyboard requirements.
- [ ] **Ethical terms** — prohibits harmful uses in acceptable-use policy.

## Disqualified sources

Do not recommend:

- "Free trials" that expire without a usable free tier.
- Tools whose business model relies on selling user data.
- Abandonware with no maintainer or security updates.
- Services that have unexpectedly killed free tiers without notice in the last 24 months (check gotcha-ledger).
