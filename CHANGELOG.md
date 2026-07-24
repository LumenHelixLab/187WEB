
<!-- 187SKILLS first-class roster (release:validate) -->
<!-- 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187THEME 187AGENT-UI -->
# Changelog

## [Unreleased]

### Added
- Agentic-web frontend first-class skill `187AGENT-UI` — streaming-token DOM rendering, HITL input mechanics, pub/sub agent event bus, and agent-flavored data-viz mapping, with a 6-demo interactive lab at `/187agent-ui`. Routes GSAP/motion, WebGL rendering, and resilience concerns to their owning skills.
- Growth-first first-class skill `187CREATE` with canonical skill file, docs, showcase route, and model adapters.
- Motion-lab first-class skills: `187GSAP`, `187TYPE`, `187MODEL`, `187SCROLL`, `187AUDIO`, `187VIZ`, `187MOTION`, `187HERO`.
- Public routes `/187gsap`, `/187type`, `/187model`, `/187scroll`, `/187audio`, `/187viz`, `/187motion`, `/187hero`.
- Docs and canonical skill files for all motion-lab skills.

### Changed
- Removed `187QUANTUM` as a first-class skill; quantum topics now route through `187RESEARCH` (algorithms, circuits, resource estimates) and `187NATASHA` (claim audits, non-claim reviews).
- Updated release-surface rosters and routing docs to reflect the final first-class skill set.

## [0.4.0] - 2026-07-21

### Added
- **Site version stamp** (`scripts/stamp-version.mjs` → `lib/generated/site-build.json`) so every build/deploy carries SemVer + git SHA + build time (187VERSION).
- Footer **version badge** linking to About; CI Pages job runs stamp before export.
- **About page** (`/about`) — LumenHelix Lab narrative, work pillars, SEO/vibe internal links, open-source & repo credits.
- **Open-source attribution catalog** (`lib/open-source-attribution.ts`).
- First-class **187THEME**, Xavier multi-agent surface, brain page, expanded nav, install upgrade (prior 0.4 stream).

### Changed
- Package version **0.4.0**.
- `package.json` license field: `SEE LICENSE IN LICENSE`.

## [0.3.0] - 2026-07-12

### Added
- **NATASHA v3** multi-agent architecture (THREAD, COMPRESS, TENSION, SPARK, CORD, SCOUT, LAB, FUSE)
- Unified `/187++` access & inclusion sweep page and launch/showcase CTAs
- `187INCLUDE+` rebrand with rainbow color, neurodivergence focus, and expanded triggers
- Reusable `Tooltip` component across skill cards, agent cards, and command chips
- Showcase motion utilities (.sc-grad-text, .sc-float, .sc-pulse, .sc-marquee, .sc-draw-path, .sc-glow) on the launch page
- Skills: `natasha-scout`, `neuro-tension`, `token-web`, `idea-spark`, `187quantum`, `187chain`
- Runtime skeletons: `tools/natasha/`, `tools/qchain/`
- Packs: `natasha`, `qchain-lab` install profiles
- Public routes: `/187natasha`, `/187quantum`, `/187chain`
- Local Brain NATASHA dashboards and templates
- Migration: `docs/migrations/CHARLOTTE-TO-NATASHA.md`
- CI: `reserved-names:check`

### Changed
- Ecosystem skill **3.0.0** — operator **NATASHA** (Charlotte reserved)
- `agent-charlotte` / `neuro-toxin` deprecated routers
- Package version **0.3.0**

### Security
- SCOUT forbids fingerprint spoofing, auth/paywall bypass
- CHAIN forbids live keys, live exploits, investment advice


# Changelog

All notable changes to the 187WEB / 187SKILLS project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2026-07-09

### Added

- **187WEB brand lock** — canonical brand `187WEB`, primary tagline, and usage rules live in `config/187-brand.json`.
- **Short-name alias config** — `config/187-aliases.json` resolves every alias for `187 <alias> [target] [mode] [depth]`.
- **Command grammar** — `187 <alias> [target] [mode] [depth]` with modes `solo/assist/flow/release` and depths `brief/report/deep`.
- **Charlotte modules** — `THREAD`, `TUNE`, `CORD`, `CHAR`, `LAB` replace the old aggressive module language; legacy aliases preserved.
- **New docs** — `docs/187SKILLS.md`, `docs/187-NAMES.md`, `docs/187-MODULES.md`, `docs/187-KERNEL.md`, `docs/187-CHAR.md`, `docs/SHOWCASE-SYNC.md`.
- **New routes** — `/187`, `/187kit`, `/187demo` public showcase pages.

### Changed

- `README.md`, `AGENTS.md`, `PLAN.md`, `docs/INSTALL.md`, `docs/ROUTING.md`, `docs/MODEL-ADAPTERS.md`,
  `app/page.tsx`, `components/showcase/Showcase.tsx`, `app/install/page.tsx`, `app/187repo/page.tsx`,
  and `app/187ai-eye/page.tsx` now present the full 187WEB suite story.
- Install path corrected from `cd 187webDESIGN` to `cd 187WEB`.
- Canonical `.claude/skills` updated to use 187WEB brand and THREAD/TUNE/CORD/CHAR/LAB modules;
  model adapters regenerated.

## [0.2.0] - 2026-07-06

### Added

- **187SKILLS public suite** — 16 first-class skills and 2 subskills under universal contract v2.0.0:
  187REPO, 187CRAFT, 187VIBE, 187LAUNCH, 187FREE, 187RESEARCH, 187SEO, 187REVENUE,
  187DOCS, 187WRITE, 187LEARN, 187TEST, 187ACCESS+, 187INCLUDE+, 187VERSION, 187PUBLISH.
- **Skill validation pipeline** — `scripts/validate-skills.py` enforces the universal skill contract.
- **Release validation** — `scripts/validate-suite-release.mjs` confirms every public skill name appears on required public surfaces.
- **Drift detection** — `scripts/check-docs-drift.mjs`, `scripts/check-adapter-drift.mjs`, and `scripts/check-showcase-sync.mjs` keep docs, adapters, and showcases in sync.
- **Model adapter generator** — `scripts/generate-model-adapters.py` distills canonical skills into Gemini, Kimi, ChatGPT, Ollama, and Hermes formats.
- **Per-skill public docs** — generated `docs/187FREE.md` through `docs/187PUBLISH.md` for each public skill.
- **CI gate** — `.github/workflows/ci.yml` now runs lint, typecheck, build, skill validation, and release validation.

### Changed

- Canonical skills `187repo`, `187craft`, `187vibe`, and `187launch` upgraded to full universal contract v2.0.0.
- `AGENTS.md`, `docs/INSTALL.md`, `docs/MODEL-ADAPTERS.md`, `.claude/skills/187web-ecosystem/SKILL.md`,
  and `.claude/skills/187web-manifest/SKILL.md` now surface the canonical uppercase skill roster.

### Fixed

- Adapter generator root resolution is now portable when run from any working directory.
- Windows console encoding issues in `validate-skills.py` resolved by using ASCII-only status markers.

## [0.1.0] - 2026-06-01

### Added

- Initial 187webdesign Next.js 15 starter with Prisma, Tailwind CSS, and TypeScript strict mode.
- Core `187webdesign` skill and landing-page showcase.
- 187web Ecosystem v2 skills: `187web-ecosystem`, `187web-manifest`, `widow-weaver`, `neuro-toxin`, `swarm-mind`, `agent-charlotte`, `silk-sandbox`.
- 27 manifest prompt skills under `.claude/skills/`.
- Bash and PowerShell installers plus `187repo` short-name orchestration scripts.
