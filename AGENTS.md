
<!-- 187SKILLS first-class roster (release:validate) -->
<!-- 187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO -->
<!-- NATASHA v3: see docs/NATASHA-ARCHITECTURE.md and docs/migrations/CHARLOTTE-TO-NATASHA.md -->
# Agent Guide — 187webdesign / 187WEB

## Project identity

`187webdesign` is the repository name; the product brand is **187WEB**. It is a full-stack Next.js 15 starter and the living demo for the 187WEBDEV award-caliber web-design playbook. It ships with both a warm-blueprint marketing foundation and a dark "Killer Web" showcase surface.

Canonical brand:

```text
187WEB
A killer AI-powered web suite: spin sharper sites, ship smarter systems.
```

Use **187WEB** everywhere public; use `187webdesign` only for package/repo identifiers.

## Stack

- **Framework:** Next.js 15 App Router, React 19, TypeScript 5 strict
- **Styling:** Tailwind CSS 3, warm-blueprint tokens + dark showcase palette
- **Database:** Prisma 6 + PostgreSQL (preview mode works without a DB)
- **Validation:** Zod
- **Tooling:** ESLint, Prettier, GitHub Actions CI + Pages deploy

## Skill architecture

Claude Code / Grok skills live under `.claude/skills/` and `.grok/skills/` respectively. They are mirrored one-to-one.

### Active skill suite

| Skill | Path | Load when |
|---|---|---|
| 187webdesign (core) | `.claude/skills/187webdesign/SKILL.md` | Building/redesigning/art-directing any marketing site or landing page |
| 187web-ecosystem v3 | `.claude/skills/187web-ecosystem/SKILL.md` | Routing the full 187SKILLS suite or the NATASHA multi-agent stack |
| **187COMMAND** | `.claude/skills/187command/SKILL.md` | Direct user intent to the right skill or alias |
| **187REPORT** | `.claude/skills/187report/SKILL.md` | Explain, summarize, and report status |
| **187SCAN** | `.claude/skills/187scan/SKILL.md` | Inspect, audit, and detect issues |
| **187KIT** | `.claude/skills/187kit/SKILL.md` | Equip templates, scaffolds, and design tokens |
| **187STANDARD** | `.claude/skills/187standard/SKILL.md` | Judge output against standards and checklists |
| **187FLOW** | `.claude/skills/187flow/SKILL.md` | Plan, route, and sequence multi-step work |
| **agentic-sprint-handoff** | `.claude/skills/agentic-sprint-handoff/SKILL.md` | Phased, milestoned multi-agent coding handoffs for Claude Code, Kimi, Grok, Codex, and local agents |
| **187REPO** | `.claude/skills/187repo/SKILL.md` | Short-name orchestration, repo generation, GitHub deploy, installer |
| **187CRAFT** | `.claude/skills/187craft/SKILL.md` | Short-name design + frontend execution |
| **187CREATE** | `.claude/skills/187create/SKILL.md` | Growth-first creation for landing pages, ad creatives, and conversion surfaces |
| **187VIBE** | `.claude/skills/187vibe/SKILL.md` | Short-name delight, community, and execution layers |
| **187LAUNCH** | `.claude/skills/187launch/SKILL.md` | Go-to-market intelligence and early-user acquisition |
| **187FREE** | `.claude/skills/187free/SKILL.md` | No-cost / open-source / local-first stack scouting |
| **187RESEARCH** | `.claude/skills/187research/SKILL.md` | Source-backed research, reproducible labs, evidence discipline |
| **187repo-eval** | `.claude/skills/187repo-eval/SKILL.md` | Repo / package / tool integration scorecard for the 187web suite *(new)* |
| **187SEO** | `.claude/skills/187seo/SKILL.md` | Ethical SEO, AEO, GEO, structured data, search analytics |
| **187REVENUE** | `.claude/skills/187revenue/SKILL.md` | Ethical pricing, payments, affiliate, coupons, dropshipping |
| **187DOCS** | `.claude/skills/187docs/SKILL.md` | Documentation architecture, READMEs, SOPs, API docs |
| **187WRITE** | `.claude/skills/187write/SKILL.md` | Suite-wide writing, copy, plain-language polish |
| **187LEARN** | `.claude/skills/187learn/SKILL.md` | Courses, study plans, lessons, workshops |
| **187TEST** | `.claude/skills/187test/SKILL.md` | Quizzes, tests, polls, surveys, rubrics |
| **187ACCESS+** | `.claude/skills/187access-plus/SKILL.md` | Disability accessibility, neurodivergence, WCAG+, inclusion review |
| **187INCLUDE+** | `.claude/skills/187include/SKILL.md` | Inclusive language, pronouns, identity-field design, community safety |
| **187VERSION** | `.claude/skills/187version/SKILL.md` | Versioning, changelogs, releases, migration notes, adapter sync |
| **187PUBLISH** | `.claude/skills/187publish/SKILL.md` | Final release synchronization of docs, demos, showcases, public surfaces |
| **187GSAP** | `.claude/skills/187gsap/SKILL.md` | GSAP timeline + ScrollTrigger foundation |
| **187TYPE** | `.claude/skills/187type/SKILL.md` | Kinetic / variable 3D typography |
| **187MODEL** | `.claude/skills/187model/SKILL.md` | 3D product showcase / configurator |
| **187SCROLL** | `.claude/skills/187scroll/SKILL.md` | Scroll-driven 3D camera narratives |
| **187AUDIO** | `.claude/skills/187audio/SKILL.md` | Audio-reactive 3D geometry |
| **187VIZ** | `.claude/skills/187viz/SKILL.md` | 3D network / node-edge data visualization |
| **187MOTION** | `.claude/skills/187motion/SKILL.md` | Reusable R3F/GSAP animation hooks |
| **187HERO** | `.claude/skills/187hero/SKILL.md` | Full-screen immersive 3D hero systems |
| 187web-manifest | `.claude/skills/187web-manifest/SKILL.md` | Project manifest, compiler, and 27 prompt skills |

### NATASHA modules

| Module | Modern alias | Legacy alias | Purpose |
|---|---|---|---|
| **THREAD** | `thread` / `th` | `widow-weaver` | Prompt shaping, intent extraction, rewrite, refactor |
| **COMPRESS** | `compress` / `cmp` | — | Loss-bounded token and context distillation |
| **SPARK** | `spark` / `brainstorm` | — | Bounded divergent ideation and decision records |
| **TENSION** | `tension` / `tu` | `neuro-toxin` (deprecated) | Inference profile and model behavior tuning |
| **CORD** | `cord` / `co` | `swarm-mind` | Coordinated role dispatch, expert persona routing |
| **SCOUT** | `scout` / `ch` | `agent-charlotte` (deprecated) | Compliant web/source/repository research |
| **LAB** | `lab` / `lb` | `silk-sandbox` | Local action box, isolated execution/test workspace |
| **FUSE** | — | — | Evidence-weighted synthesis and conflict resolution under CORD |

See `docs/187-MODULES.md` for module templates and `docs/187-NAMES.md` for the full alias table.

### Command grammar

```text
187 <alias> [target] [mode] [depth]
```

Workflow modes: `solo` · `assist` · `flow` · `release`  
Output depths: `brief` · `report` · `deep`

Default: a named skill or alias runs **solo + brief**. Coordination only happens when it helps.

### Manifest prompt skills

All 27 prompts in [`references/MANIFEST.xml`](.claude/skills/187web-manifest/references/MANIFEST.xml) have standalone skills under `.claude/skills/<prompt-id>/` and `.grok/skills/<prompt-id>/` (e.g., `ml-systems-architect`, `a11y-linting-agent`, `xss-vulnerability-scanner`).

### Canonical config

- `config/187-aliases.json` — short-name alias map.
- `config/187-brand.json` — canonical brand, tagline, SEO description, CTA labels.
- `config/187-command-reference.json` — canonical /187 slash-command table.
- `config/187-command-grammar.json` — grammar rules, modes, depths, and examples.

### CLI installer

- **Web page:** [`/install`](app/install/page.tsx) — cross-platform marketing + documentation.
- **Docs:** [`docs/INSTALL.md`](docs/INSTALL.md), [`docs/187-COMMANDS.md`](docs/187-COMMANDS.md), [`docs/187-AUTOCOMPLETE.md`](docs/187-AUTOCOMPLETE.md).
- **Installers:** [`install.sh`](install.sh) (Linux/macOS/Git Bash) and [`install.ps1`](install.ps1) (Windows).
- **Local repo CLI:** [`scripts/187.sh`](scripts/187.sh) (bash), [`scripts/187.ps1`](scripts/187.ps1) (PowerShell), [`scripts/187-complete.mjs`](scripts/187-complete.mjs) completion helper, and [`scripts/completions/`](scripts/completions/) for bash/zsh/fish/PowerShell.

### Model adapters

The full skill library is mirrored into model-specific formats under:

- `.gemini/skills/<name>/SKILL.md` — Gemini system-instruction skills
- `.kimi/skills/<name>/SKILL.md` — Kimi skills
- `.chatgpt/skills/<name>/SKILL.md` — ChatGPT custom GPT instructions
- `.grok/skills/<name>/SKILL.md` — Grok skills generated from canonical Claude skills
- `.ollama/modelfiles/<name>/Modelfile` — Ollama model files
- `.herme/agents/<name>/system.md` + `SKILL.md` — Hermes-based local agents

Regenerate all adapters with `python scripts/generate-model-adapters.py`. See [`docs/MODEL-ADAPTERS.md`](docs/MODEL-ADAPTERS.md).

### 187WEBDEV portfolio suite

The broader portfolio suite lives in `skills/187webdev/` and is mirrored in `.grok/skills/187webdev-*`:

- 187webdev-qa
- 187webdev-trends
- 187webdev-resilience
- 187webdev-templates
- 187webdev-code-review
- 187webdev-design-system

## Coding conventions

- Server Components first; client components only when interactivity is required.
- Null-safe Prisma access via `lib/db.ts`; preview mode degrades gracefully.
- Content as data: copy lives in `lib/content.ts`.
- Use the design-system tokens in `tailwind.config.ts` and `app/globals.css`.
- Respect `prefers-reduced-motion`.
- Run the pre-ship checklist (`CONTRIBUTING.md`) before any UI PR.

## Build & test

```sh
npm install
npm run lint
npm run typecheck
npm run build
```

Local database:

```sh
docker compose up -d
npm run db:push
npm run db:seed
```

## Multi-agent surface (Xavier Phase 2+)

- **AgentKit parity:** `lib/agents/*-kit.ts` (charlotte, kali, natasha, yelena, xavier) + shared `agent-kit.ts` types. Pages under `/xavier`, `/natasha`, etc. render via `components/launch/AgentPage.tsx`.
- **Xavier control plane** (premium UI, in-session only): `XavierControlPlane` wires `XavierCouncil` → `XavierBrood` → `XavierAuditLedger`. Shared audit events live in `lib/agents/xavier-audit.ts` (brood cap default **5**, kill-all confirm, Markdown export).
- **WebHive shell:** `ProductShell` mounts SVG/R3F background + optional `WebHiveNetworkOverlay` / `WebHiveTelemetryOverlay` (both no-op under `prefers-reduced-motion`).
- **Design source:** `docs/superpowers/specs/2026-07-21-xavier-agent-remix-design.md`. Branch work: `feat/xavier-phase2`.

Golden path for operators: open `/xavier` → call council → spawn brood clones → export audit MD. Runtime dispatch of real subagents is not wired yet; UI is the control-plane contract.

## Current state

- `/` serves the dark 187WEB showcase.
- `/187` is the full 187SKILLS system overview and interactive /187 command surface (includes `CommandPalette` and `CommandReference` components).
- `/187kit` is the templates + scaffolds hub.
- `/187demo` is the demo abilities index.
- `/install` is the cross-platform CLI installer page + documentation.
- `/187repo` is the slash-command reference for the 187SKILLS suite.
- `/187ai-eye` serves **187aiEYE** — standalone Local Brain command UI (multi-agent rail + module toggles).
- `/xavier` serves **XAVIER** — final ship + council/brood/audit multi-agent control plane.
- `/knotstore` is the Vault-style KNOTstore preview page.
- `lib/knotstore/` is the pluggable agentic data layer (SQLite, KNOT point, hybrid backends).
- `/187free`, `/187research`, `/187seo`, `/187revenue`, `/187docs`, `/187learn`, `/187test`, `/187access`, `/187version`, `/187publish` are skill showcase pages.
- `/templates` lists 14 industry templates.
- `/resilience` demos unhappy-path states.
- `/api/lead` persists leads when a database is available.
- **Docs:** `docs/187SKILLS.md`, `docs/187-NAMES.md`, `docs/187-MODULES.md`, `docs/187-KERNEL.md`, `docs/187-CHAR.md`, `docs/187-COMMANDS.md`, `docs/187-COMMAND-GRAMMAR.md`, `docs/187-AUTOCOMPLETE.md`, `docs/187-CLI-SELECTOR.md`, `docs/187-INSTALL-PROFILES.md`, `docs/187-ABILITIES.md`, and `docs/SHOWCASE-SYNC.md` document the operating layer.
- **Observability extension (v4.7):** optional module — see `.claude/skills/187web-ecosystem/references/OBSERVABILITY-4.7.md`.

## Notes for agents

- The warm-blueprint components in `components/` are mostly unused by `/`; they remain for template pages and future routes.
- The `.grok/` folder is a mirror of `.claude/skills/` for Grok compatibility; keep them in sync when editing skills.
- No runtime implementation of the Charlotte skills exists yet — they are currently prompt-engineering / skill-definition assets.
