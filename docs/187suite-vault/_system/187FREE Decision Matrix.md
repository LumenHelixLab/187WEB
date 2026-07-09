---
title: 187FREE Decision Matrix
description: Decision matrix for choosing the best free/free-tier solution by workload and constraint.
tags: ["187free", "decision-matrix", "reference"]
skill: 187free
---

# 187FREE Decision Matrix

Use this matrix to narrow options before applying the 187FREE scoring model.

## By workload type

| Need | First look | If first fails | Local-first fallback |
|---|---|---|---|
| Static landing page / docs | GitHub Pages / Cloudflare Pages | Netlify / Vercel | MkDocs / Docusaurus + local server |
| Fullstack MVP | Supabase + Vercel/Netlify | Firebase + Cloudflare Pages | Self-hosted PostgREST + static host |
| Auth | Supabase Auth | Firebase Auth | OAuth2-proxy / Keycloak local |
| Database (SQL) | Supabase / Neon | Turso / Cloudflare D1 | SQLite / Postgres local |
| Database (NoSQL) | Firebase Firestore | MongoDB Atlas | PouchDB / RxDB local |
| KV / cache | Upstash Redis | Cloudflare KV | Redis local |
| Object storage | Cloudflare R2 | Supabase Storage | MinIO local |
| Forms | Tally | Google Forms | Static form handler + self-hosted |
| Analytics | Umami self-hosted | Plausible self-hosted | Server logs |
| Uptime monitoring | UptimeRobot | Better Stack | Cron + health endpoint |
| Error tracking | Sentry free | Self-hosted GlitchTip | Log aggregation |
| Email / transactional | Provider free tier (Resend, etc.) | AWS SES free tier | Local SMTP / mailpit |
| AI inference | Ollama / llama.cpp | Hugging Face free tier | Download model, run locally |
| CI/CD | GitHub Actions | GitLab CI | Local runner |

## By constraint

| Constraint | Prefer | Avoid |
|---|---|---|
| No credit card | GitHub Pages, Cloudflare, Supabase free tier | Trials requiring cards |
| Sensitive data | Local-first, self-hosted, E2EE | Shared SaaS without privacy review |
| Rapid prototype | Vercel / Netlify / Supabase | Complex multi-service wiring |
| Long-running compute | Render / Railway persistent | Free serverless timeouts |
| High egress | Cloudflare R2 / Pages | Services charging egress |
| Vendor lock-in concern | Open-source with export API | Proprietary closed formats |
| Offline / low connectivity | Local-first tools | Cloud-required services |
| Accessibility priority | WCAG-friendly defaults, screen-reader support | Undocumented UI frameworks |
| Civic / nonprofit | Free-for-open-source tiers | Consumer tiers with data resale |

## Decision flow

1. State the need and constraints.
2. Match the workload type above.
3. Apply the 187FREE scoring model.
4. Run gotcha checks.
5. Run privacy-first rules if sensitive.
6. Produce output in required format.
