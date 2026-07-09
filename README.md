<div align="center">

<br>

<img src="public/images/187suite-hero.jpg" alt="187SUITE — Killer Web Design Solutions" width="92%" />

<h1>187SUITE</h1>
<p><strong>KILLER WEB DESIGN SOLUTIONS</strong></p>
<p>Powered by <a href="https://github.com/lumenhelixsolutions/187webDESIGN">187webDESIGN</a> // <a href="https://lumenhelixsolutions.github.io">lumenhelixsolutions</a></p>

<br>

<p>
  <a href="https://lumenhelixsolutions.github.io/187webDESIGN/"><img src="https://img.shields.io/badge/▶_View_Live_Demo-39FF14?style=for-the-badge&labelColor=11131A" alt="View Live Demo" /></a>
  &nbsp;
  <a href="#-quick-start"><img src="https://img.shields.io/badge/⚡_Quick_Start-11131A?style=for-the-badge&color=39FF14" alt="Quick Start" /></a>
  &nbsp;
  <a href="./docs"><img src="https://img.shields.io/badge/📖_Docs-11131A?style=for-the-badge&color=FF2D2D" alt="Docs" /></a>
</p>

<p>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/lumenhelixsolutions/187webDESIGN?style=flat-square&labelColor=11131A&color=39FF14&label=License" alt="License" /></a>
  <a href="https://github.com/lumenhelixsolutions/187webDESIGN/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/lumenhelixsolutions/187webDESIGN/ci.yml?branch=main&style=flat-square&labelColor=11131A&color=39FF14&logo=githubactions&logoColor=white&label=CI" alt="CI" /></a>
  <a href="https://github.com/lumenhelixsolutions/187webDESIGN/actions/workflows/pages.yml"><img src="https://img.shields.io/github/actions/workflow/status/lumenhelixsolutions/187webDESIGN/pages.yml?branch=main&style=flat-square&labelColor=11131A&color=39FF14&logo=githubpages&logoColor=white&label=Pages" alt="Pages" /></a>
</p>

<br>

</div>

> **"187" is the attitude:** every element earns its place or it gets cut. **187SUITE** is the short-name command surface for the mature 187web ecosystem — four layers that turn a raw idea into a shipped, polished product.

<br>

## ◆ The four layers

<table width="100%">
<tr>
<td width="50%" valign="top">

### 187REPO — Orchestrate

- Systematized codebase structure
- Git-flow workflow
- Component versioning
- Repository archetypes: `--cli`, `--agent`, `--kv`, `--edge`, `--ui`, `--full`, `--web`

</td>
<td width="50%" valign="top">

### 187CRAFT — Design

- Atomic design system
- Pixel-perfect components
- Scalable grid modules
- Accessibility-first, token-driven UI

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 187VIBE — Delight

- UX flow mapping v2.0
- Interaction state library
- User behavior data
- Micro-interactions that serve, never decorate

</td>
<td width="50%" valign="top">

### 187LAUNCH — Ship

- CI/CD build pipelines
- Multi-environment deployment engines
- Instant rollbacks
- Go-to-market intelligence and launch playbooks

</td>
</tr>
</table>

<br>

## ◆ What this repo is

This repository is **two things in one**:

1. **A reusable skill library** — [`.claude/skills/187webdesign/`](./.claude/skills/187webdesign/SKILL.md) is a portable, award-caliber web-design playbook for Claude Code, plus the new short-name orchestration skills (`187repo`, `187craft`, `187vibe`, `187launch`).
2. **A live demo that proves it** — a real Next.js + Prisma app whose marketing pages are built to pass the same 50-point pre-ship checklist: fast, accessible, responsive, and conversion-minded.

The live showcase is deployed from this repo via GitHub Pages:  
**[lumenhelixsolutions.github.io/187webDESIGN](https://lumenhelixsolutions.github.io/187webDESIGN/)**

<br>

## ◆ Short-name suite

After install, the short-name entry points are on your PATH:

| Command                        | Skill       | Purpose                                                    |
| ------------------------------ | ----------- | ---------------------------------------------------------- |
| `187repo.sh` / `187repo.ps1`   | `187repo`   | Orchestration, manifest compiler, GitHub deploy            |
| `187craft`                     | `187craft`  | Design + frontend (loads `187webdesign` / 187webdev suite) |
| `187vibe`                      | `187vibe`   | Delight + community + research                             |
| `187launch`                    | `187launch` | Go-to-market intelligence                                  |
| `187power.sh` / `187power.ps1` | `187repo`   | Create repo, push scaffold, enable Pages                   |
| `187init.sh` / `187init.ps1`   | `187repo`   | Generate a local archetype scaffold                        |

Full install guide: [`docs/INSTALL.md`](./docs/INSTALL.md)

<br>

## ◆ Scoring lens

How "award-winning" is actually judged — design to the **weights**, not just to taste:

```text
DESIGN       ████████████████████████████████   40%   craft · type · color · detail
USABILITY    ████████████████████████           30%   nav · speed · a11y · responsive
CREATIVITY   ████████████████                   20%   one fresh, memorable idea
CONTENT      ████████                           10%   copy that earns the click
```

> A beautiful site that's hard to use still loses. The gap between _fine_ and
> _award_ is **craft details + one bold idea + fast, accessible execution** —
> not more effects.

<br>

## ◆ Tech stack

| Layer          | Choice                               | Why                                       |
| :------------- | :----------------------------------- | :---------------------------------------- |
| **Framework**  | Next.js 15 (App Router)              | Full-stack React: UI + API in one deploy  |
| **Language**   | TypeScript (strict)                  | Catch mistakes before users do            |
| **Styling**    | Tailwind CSS 3 + CSS-variable tokens | Utility speed with a real token system    |
| **Database**   | PostgreSQL via Prisma 6              | Typed schema, easy local ↔ prod parity    |
| **Validation** | Zod                                  | One schema shared by API and client       |
| **Fonts**      | Space Grotesk + Inter                | Two families, self-hosted via `next/font` |
| **Tooling**    | ESLint · Prettier · GitHub Actions   | Lint + typecheck + build on every push    |

<br>

## ◆ Quick start

**Prerequisites:** Node.js ≥ 18.18, npm. (Docker optional, only for the local database.)

```bash
git clone https://github.com/lumenhelixsolutions/187webDESIGN.git
cd 187webDESIGN
npm install
npm run dev          # → http://localhost:3000
```

The showcase runs immediately in **preview mode** — no database required. Wire a DB when you want to persist leads:

```bash
cp .env.example .env
docker compose up -d        # provisions Postgres matching .env
npm run db:push             # create tables from prisma/schema.prisma
npm run db:seed             # (optional) a few sample leads
```

<br>

## ◆ Project structure

```text
187webDESIGN/
├─ .claude/skills/              # portable skills (187webdesign, 187repo, 187craft, 187vibe, 187launch)
├─ app/                         # Next.js App Router
│  ├─ page.tsx                  # 187SUITE showcase
│  ├─ 187repo/page.tsx          # slash-command reference
│  ├─ install/page.tsx          # cross-platform installer page
│  ├─ 187ai-eye/page.tsx        # Local Brain command UI
│  ├─ templates/                # 14 industry templates
│  └─ api/                      # lead + health route handlers
├─ components/                  # design-system primitives + sections
├─ lib/                         # content, db, validation
├─ prisma/                      # schema + seed
├─ docs/                        # getting-started · architecture · design-system · deployment
├─ scripts/                     # 187repo, 187power, 187init installers
├─ .github/workflows/           # ci.yml · pages.yml
├─ docker-compose.yml
└─ Dockerfile
```

<br>

## ◆ Scripts & API

<table>
<tr><td valign="top" width="50%">

| Script      | Does                                 |
| :---------- | :----------------------------------- |
| `dev`       | Start the dev server                 |
| `build`     | `prisma generate` + production build |
| `start`     | Run the production build             |
| `lint`      | ESLint (core-web-vitals)             |
| `typecheck` | `tsc --noEmit`                       |
| `db:push`   | Sync schema → database               |
| `db:seed`   | Seed sample leads                    |

</td><td valign="top" width="50%">

| Route         | Method | Behavior                          |
| :------------ | :----- | :-------------------------------- |
| `/api/lead`   | `POST` | Validate + persist a lead (Zod)   |
| `/api/health` | `GET`  | `{ status, database, timestamp }` |

</td></tr>
</table>

<br>

## ◆ Deployment

- **GitHub Pages (the live demo).** Pushes to `main` build a fully static export and publish it via [`.github/workflows/pages.yml`](./.github/workflows/pages.yml). One-time setup: **Settings → Pages → Source: GitHub Actions**.
- **Vercel.** Import the repo, set `DATABASE_URL` (+ `NEXT_PUBLIC_SITE_URL`), deploy. Run `prisma migrate deploy` against your database.
- **Docker.** `docker build -t 187webdesign . && docker run -p 3000:3000 -e DATABASE_URL=… 187webdesign`.

Full guide: [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).

<br>

## ◆ Docs

[Getting started](./docs/GETTING-STARTED.md) · [Architecture](./docs/ARCHITECTURE.md) · [Design system](./docs/DESIGN-SYSTEM.md) · [Deployment](./docs/DEPLOYMENT.md) · [Install](./docs/INSTALL.md)

<br>

## ◆ Contributing

PRs welcome. The one house rule: **run the [pre-ship checklist](./.claude/skills/187webdesign/references/CHECKLIST.md) before you call a UI change done.** See [CONTRIBUTING.md](./CONTRIBUTING.md).

<br>

<div align="center">

<strong>187SUITE</strong> — <a href="LICENSE">MIT</a> © 2026 Lumen Helix Solutions

</div>
