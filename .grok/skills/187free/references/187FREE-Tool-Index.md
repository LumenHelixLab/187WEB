---
title: 187FREE Tool Index
description: Curated index of free, free-tier, open-source, and public resources used by the 187FREE skill.
---

# 187FREE Tool Index

A living index of reliable no-cost tools and sources. Verify details on the official site before recommending.

## Hosting & Static Sites

| Service | Free Tier | Best For | Notes |
|---|---|---|---|
| GitHub Pages | Static hosting from repos | Docs, portfolios, landing pages | Public repos only; custom domain supported |
| Cloudflare Pages | Static + JAMstack | Performance-sensitive static sites | Generous build minutes |
| Netlify | Static + serverless | MVPs, forms, previews | Bandwidth / build limits |
| Vercel | Static + serverless | Next.js, frontend demos | Hobby tier limits |
| Firebase Hosting | Static + dynamic | Google-ecosystem demos | Requires Google account |
| Render | Static + web services | Full-stack prototypes | Free tier sleeps |

## Serverless / Edge / Compute

| Service | Free Tier | Best For | Notes |
|---|---|---|---|
| Cloudflare Workers | 100k requests/day | Edge functions, cron | Free CPU limits |
| Vercel Functions | Hobby tier | Next.js API routes | Execution limits |
| Netlify Functions | 125k requests/mo | Jamstack backends | Execution limits |
| GitHub Actions | 2,000 min/mo public | CI/CD, automation | Private repos have lower limits |
| Railway / Render | Free tier credits | Persistent backends | May sleep; verify current policy |

## Databases & Storage

| Service | Type | Free Tier | Notes |
|---|---|---|---|
| Supabase | Postgres + Auth + Storage | Generous hobby tier | Row/transfer limits; can self-host |
| Neon | Serverless Postgres | Tier-limited compute/storage | Sleep after inactivity |
| Turso | SQLite at edge | Generous free DB | Good for edge apps |
| Cloudflare D1 | Serverless SQLite | Limited rows/storage | Workers integration |
| Cloudflare KV / R2 | Key-value / object storage | Generous reads; R2 no egress fees | Good for config/assets |
| MongoDB Atlas | Document DB | Shared cluster | Connection / storage limits |
| Upstash | Redis / Kafka / QStash | Generous free tier | Serverless-friendly |
| Firebase | Firestore + Storage | Spark plan limits | Google account required |

## Auth & Identity

| Service | Free Tier | Best For | Notes |
|---|---|---|---|
| Supabase Auth | Email + OAuth | Fullstack apps | Self-hostable |
| Firebase Auth | Email + social | Google-ecosystem apps | Privacy considerations |
| Clerk | Generous dev tier | React/Next.js auth | Paid upgrade common |
| Auth0 | Free tier | Quick enterprise auth | Strict limits |
| Cloudflare Access | Zero-trust access | Internal tools / demos | Good for protecting previews |

## Domains & DNS

| Service | Offering | Notes |
|---|---|---|
| GitHub Pages subdomain | `username.github.io` | Immediate, trusted |
| Vercel / Netlify / Cloudflare Pages | Project subdomains | SSL included |
| EU.org | Free subdomains | Reputation variable; verify availability |
| Freenom | Free TLDs historically | Often unreliable / scammy; avoid serious projects |

## Monitoring, Analytics, Observability

| Service | Free Tier | Best For | Notes |
|---|---|---|---|
| UptimeRobot | 50 monitors / 5 min | Uptime checks | Free status page |
| Better Stack Uptime | 10 monitors | Uptime + incident | Modern alternative |
| Sentry | Generous errors/mo | Error tracking | Privacy mode for sensitive data |
| Grafana Cloud | 10k metrics | Metrics, logs, traces | Generous for small projects |
| Plausible | Self-hosted or paid cloud | Privacy-first analytics | Cloud has paid tier |
| Umami | Self-hosted | Privacy-first analytics | Easy to self-host |

## AI / ML / Local Models

| Resource | Type | Notes |
|---|---|---|
| Ollama | Local model runner | Private, offline |
| llama.cpp | Local inference | Edge / mobile possible |
| Hugging Face | Models, datasets, spaces | Check license & usage limits |
| OpenAI / Anthropic free credits | API credits | Time-limited, rate-limited |
| Cloudflare AI Gateway | AI proxy + caching | Rate limits, observability |

## Security & Compliance

| Tool | Type | Notes |
|---|---|---|
| GitHub Dependabot | Dependency alerts | Built into repos |
| GitHub CodeQL | Static analysis | Free public repos |
| GitHub secret scanning | Secret detection | Public + private repos |
| OWASP ZAP | Web app scanner | Local or CI |
| Snyk | SCA / container / code | Free tier limits |
| Semgrep | Static analysis | Free for public + small teams |
| Trivy | Container / secret scanner | Open source |
| Mozilla Observatory | HTTP security check | Public URLs only |

## Forms & Intake

| Tool | Free Tier | Notes |
|---|---|---|
| Google Forms | Unlimited simple forms | Google account; data handling |
| Tally | Unlimited forms | Generous free plan |
| Airtable | Free base limits | Good linked-data forms |
| Notion | Free personal / small team | Form views via databases |
| Static form handlers (Formspree, etc.) | Free submissions/mo | Good for static sites |

## Docs & Knowledge Bases

| Tool | Type | Notes |
|---|---|---|
| MkDocs | Static site generator | Python, plugin ecosystem |
| Docusaurus | React docs framework | Good for API docs |
| Astro Starlight | Fast static docs | Modern, minimal |
| VitePress | Vue-based docs | Fast and clean |
| Read the Docs | Hosted docs | Free for open source |
| GitHub Pages + Jekyll | Static docs | Built into GitHub |

## Data Visualization

| Tool | Type | Notes |
|---|---|---|
| D3 | Low-level JS charts | Highly custom |
| Vega-Lite | Declarative grammar | Good for notebooks |
| Plotly | Interactive charts | Multiple languages |
| Apache ECharts | Feature-rich charts | Free, open source |
| Leaflet | Maps | Lightweight |
| MapLibre | Maps | Modern, vector tiles |
| Kepler.gl | Geospatial analysis | Large datasets |

## Media Utilities

| Tool | Type | Notes |
|---|---|---|
| FFmpeg | Audio/video processing | Swiss army knife |
| ImageMagick | Image processing | CLI-based |
| SVGOMG | SVG optimization | Web UI |
| Browser APIs (Canvas, Web Audio, MediaRecorder) | Runtime utilities | No server needed |

## Public Data & Datasets

| Source | Type | Notes |
|---|---|---|
| Data.gov | US government data | Civic / public records |
| World Bank Open Data | Global development | API available |
| NASA Open Data | Space / science | Many APIs |
| NIH / NCBI | Biomedical | APIs available |
| Kaggle Public Datasets | ML / research | Check licenses |
| Zenodo | Research outputs | DOIs, open access |
| OpenAlex | Scholarly graph | API, open data |
| Wikidata | Structured knowledge | SPARQL endpoint |
| OpenStreetMap | Map data | Overpass API |

## Package Registries & Code Intelligence

| Registry | Use | Notes |
|---|---|---|
| GitHub API | Repos, issues, metadata | Rate limits |
| npm Registry | JS packages | JSON metadata |
| PyPI JSON API | Python packages | License / maintainer info |
| Libraries.io | Package discovery | Maintenance metadata |
| crates.io | Rust packages | Registry API |

## Accessibility & Assistive Tech

| Resource | Type | Notes |
|---|---|---|
| axe-core | Accessibility testing | CI / browser |
| WAVE | Web accessibility evaluation | Browser extension |
| NVDA / Orca | Screen readers | Free, local |
| Open-source AAC tools | Communication aids | Verify project health |
| Captioning tools (whisper.cpp, etc.) | STT / captioning | Local-first options available |

---

**Policy:** Always cross-check the current free tier on the official site before recommending. Prices and limits change.
