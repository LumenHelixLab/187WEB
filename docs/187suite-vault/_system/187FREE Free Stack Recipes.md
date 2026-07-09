---
title: 187FREE Free Stack Recipes
description: Ready-to-adapt free stack recipes for common project shapes.
tags: ["187free", "stack-recipes", "reference", "recipes"]
skill: 187free
---

# 187FREE Free Stack Recipes

Ready-to-adapt recipes. Adjust to the actual constraints and re-score each time.

## Recipe 1 — Static Portfolio / Docs Site

**Need:** Public portfolio, docs, or landing page with custom domain-like URL.

**Stack:**
- Host: Cloudflare Pages or GitHub Pages
- Domain: Custom domain or project subdomain
- Analytics: Umami self-hosted or Cloudflare Web Analytics
- Forms: Tally or static form handler
- CI/CD: GitHub Actions (optional)

**Why it works:** Zero cost, fast CDN, custom domain, easy rollback via git.

**Gotchas:** Bandwidth limits on free tier. Form handler submission caps.

**Upgrade path:** Cloudflare Pro, Netlify paid, or Vercel Pro for teams / analytics.

## Recipe 2 — No-Budget Fullstack MVP

**Need:** MVP with auth, DB, storage, and serverless backend.

**Stack:**
- Frontend: Next.js on Vercel / Netlify / Cloudflare Pages
- Auth: Supabase Auth
- DB: Supabase Postgres or Neon
- Storage: Supabase Storage or Cloudflare R2
- Monitoring: Sentry free + UptimeRobot

**Why it works:** Modern stack, generous free tiers, clear upgrade path, exportable Postgres.

**Gotchas:** Row limits, egress, serverless function timeouts, cold starts.

**Upgrade path:** Supabase Pro, Vercel Pro, dedicated server if scale demands.

## Recipe 3 — Local-First Sensitive Project

**Need:** Medical, legal, disability, or client-sensitive prototype with minimal third-party exposure.

**Stack:**
- Frontend: Static site or Tauri / Electron local app
- Auth: Local auth or OAuth2-proxy behind self-hosted service
- DB: SQLite or local Postgres
- Sync: None or encrypted peer-to-peer (e.g., local-first CRDTs)
- Backups: Encrypted local backups + optional self-hosted object store

**Why it works:** Data stays local by default; consent is explicit; telemetry is minimal.

**Gotchas:** Device loss, backup discipline, cross-device sync complexity.

**Upgrade path:** Add self-hosted Supabase or encrypted sync later if needed.

## Recipe 4 — Civic Tech Transparency Page

**Need:** Public records, timeline, form intake, dashboard for a civic issue.

**Stack:**
- Site: Astro / Eleventy on Cloudflare Pages
- Forms: Tally or self-hosted Formbricks
- Data viz: Observable Plot / D3 / Leaflet
- Search: Pagefind or Lunr.js static search
- Backups: Git + Zenodo for published datasets

**Why it works:** Cheap to host, archivable, version-controlled, public by design.

**Gotchas:** Avoid scraping restricted systems; verify public-records legality.

**Upgrade path:** Add CMS (Decap CMS, Strapi self-hosted) if non-technical editors need access.

## Recipe 5 — Free AI / Local Model Lab

**Need:** Prototype with local or free AI inference, embeddings, OCR, STT/TTS.

**Stack:**
- Inference: Ollama or llama.cpp
- Embeddings: Local sentence-transformers via Ollama / llama.cpp
- OCR: Tesseract / docTR
- STT/TTS: whisper.cpp / Piper TTS
- UI: Streamlit / Gradio / static HTML

**Why it works:** No API costs, data stays local, great for privacy-sensitive prototypes.

**Gotchas:** Hardware requirements, model size, quantization trade-offs, setup time.

**Upgrade path:** GPU server, Hugging Face inference endpoints, or paid API for scale.

## Recipe 6 — Free Automation & Notifications

**Need:** Scheduled jobs, webhooks, notifications, simple workflows.

**Stack:**
- CI/CD triggers: GitHub Actions cron
- Serverless functions: Cloudflare Workers cron triggers
- Workflow: n8n self-hosted or Node-RED
- Notifications: Discord/Slack webhooks, email via provider free tier

**Why it works:** Serverless cron avoids server maintenance; self-hosted workflow tools are powerful.

**Gotchas:** GitHub Actions cron precision; free tier execution limits.

**Upgrade path:** Paid cron service, managed n8n, or dedicated worker.

## Recipe 7 — Free Security Hygiene Stack

**Need:** Basic security scanning and dependency hygiene for a project.

**Stack:**
- Dependency alerts: GitHub Dependabot
- Static analysis: GitHub CodeQL, Semgrep
- Secret scanning: GitHub secret scanning
- Container scan: Trivy
- Web scan: OWASP ZAP + Mozilla Observatory

**Why it works:** Covers SCA, SAST, secrets, and basic web hardening at zero cost.

**Gotchas:** False positives; CodeQL setup complexity for some languages.

**Upgrade path:** Snyk paid, SonarQube, or managed AST.
