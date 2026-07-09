# 187FREE — Free Stack Recipes

Pre-vetted recipes for common no-cost builds. Each recipe lists the tool, why it fits, and the gotchas to watch.

## Recipe 1: Static research demo

**Need:** A public research demo with analytics and a contact form, costing nothing.

| Layer | Tool | Why it fits |
|-------|------|-------------|
| Hosting | GitHub Pages / Cloudflare Pages | Unlimited static bandwidth, custom domain support, HTTPS out of the box. |
| Framework | Astro or plain HTML | Zero client JS by default; fast and accessible. |
| Analytics | Cloudflare Web Analytics (free) or self-hosted Plausible | Privacy-first, no cookie banner; both are genuinely free. |
| Contact form | Formspree Free / Getform | 50 submissions/month, no backend needed. |
| Domain | js.org, GitHub Pages subdomain, or an existing custom domain | $0 if a free subdomain is acceptable. |

**Gotchas:**
- GitHub Pages is public repos only on the free plan.
- Cloudflare Pages has a soft 500 requests/day Workers limit on free.
- Formspree free tier brands confirmation emails.

**Privacy review:** No PII stored server-side if using static hosting + form endpoint with encryption in transit.

**Upgrade path:** Move to Vercel/Netlify Pro for serverless functions; switch to paid form endpoint for volume.

---

## Recipe 2: Full-stack MVP

**Need:** Auth, database, storage, email, and monitoring for a bootstrap MVP.

| Layer | Tool | Why it fits |
|-------|------|-------------|
| Frontend | Next.js (Vercel Hobby) or SvelteKit (Vercel/Netlify) | Modern SSR, generous free requests. |
| Auth | Clerk Free / Supabase Auth / NextAuth | Clerk: 10k MAU; Supabase: 50k MAU. |
| Database | Supabase Free (PostgreSQL) or Neon Free | 500 MB–1 GB, good enough for early users. |
| Storage | Cloudflare R2 (10 GB free) / Supabase Storage | R2 has no egress fees; Supabase has 1 GB free. |
| Email | Resend Free / SendGrid Free | 100–300 emails/day on free tiers. |
| Monitoring | Sentry Free / LogRocket Free | Sentry: 5k errors/month; LogRocket: 1k sessions/month. |
| Error tracking | Sentry covers this; add UptimeRobot for uptime checks. | 50 monitors free. |

**Gotchas:**
- Supabase pauses free projects after 7 days of inactivity; needs manual unpause or cron keep-alive.
- Vercel Hobby functions have 10 s timeout and 1 GB memory.
- Clerk free tier requires visible branding.
- SendGrid free tier often has slow sender-reputation warm-up.

**Privacy review:**
- Use Supabase Row Level Security (RLS) defaults.
- Disable analytics in dev; disclose monitoring cookies in privacy policy.
- Collect consent before email signup.

**Upgrade path:**
- Supabase Pro ($25/month) removes pause and raises DB limits.
- Vercel Pro ($20/user) raises function limits.
- Sentry Team plan for higher error volume.

---

## Recipe 3: Docs and automation site

**Need:** Public docs, internal wiki, and lightweight automation.

| Layer | Tool | Why it fits |
|-------|------|-------------|
| Docs site | VitePress / Docusaurus on GitHub Pages | Markdown-native, versioned, free hosting. |
| Internal wiki | Obsidian + Obsidian Publish trial / GitBook Free | Obsidian is local-first; GitBook free for open docs. |
| Automation | GitHub Actions (2,000 minutes/month) | CI/CD, scheduled jobs, publishing. |
| Search | Pagefind (static) / Algolia DocSearch (free for docs) | Pagefind is fully local; DocSearch is free for open-source docs. |
| Forms / feedback | GitHub Discussions + Issues | Already in repo; no extra tool. |

**Gotchas:**
- GitHub Actions free minutes are limited on macOS/Windows runners.
- Obsidian Publish is paid after trial; use GitHub Pages + a static theme for fully free docs.
- Algolia DocSearch requires public docs and application approval.

**Privacy review:** Docs are public; keep internal wiki offline or behind auth. Avoid embedding third-party trackers.

**Upgrade path:** Move to Netlify/Vercel Pro for larger teams; Cloudflare Access for private wiki auth.
