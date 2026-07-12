---
name: 187repo
description: >-
  Use when generating a new repository, deploying to GitHub, creating an installer site, or routing the 187SKILLS suite.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/187repo/SKILL.md`](../../.claude/skills/187repo/SKILL.md).

# 187REPO — Short-Name Orchestrator

## Identity

187REPO is the short-name entry point for the mature 187WEB ecosystem.
It delegates to [`187web-ecosystem`](../187web-ecosystem/SKILL.md) (NATASHA v3
orchestration) and [`187web-manifest`](../187web-manifest/SKILL.md) (manifest
compiler + 27 prompts). Think of it as the fast alias: it loads the existing
skills and adds repo-generation, deployment, and installer conventions.

## Manual triggers

- `/187repo`
- `187REPO`
- `187`
- `generate repo`
- `deploy to GitHub`
- `GitHub Pages`
- `installer`
- `power mode`
- `viral repo`

## Automatic triggers

Use 187REPO when the task implies: repository, scaffold, deploy, GitHub,
GitHub Pages, installer, manifest compiler, archetype, Power Mode, or routing
any 187SKILLS short name.

## When to use

- User says "187", "187repo", "generate repo", "deploy to GitHub", "viral repo",
  "GitHub Pages", or "installer".
- You need the 7 archetype scaffolds.
- You are running Power Mode (GitHub API surgical strike).
- You need to route a request to another 187SKILLS short name.

## When not to use

- For design or frontend work — route to `187craft`.
- For delight, onboarding, or community — route to `187vibe`.
- For go-to-market strategy — route to `187launch`.
- For pure research — route to `187research`.

## Input contract

User provides: the desired archetype or action, repository name, target platform
(GitHub / local), and any known constraints (stack, auth, Pages, CI).

## Output contract

1. **Mode** — which 187REPO mode is active.
2. **Archetype / route** — selected scaffold or skill chain.
3. **Commands to run** — exact CLI or script invocation.
4. **Files created or changed** — summary of repo impact.
5. **Next actions** — follow-ups, approvals, and manual steps.

## Routing rules

| Short name | Mature skill(s) it delegates to | Role |
|---|---|---|
| `187repo` | `187web-ecosystem` + `187web-manifest` | Orchestration, compiler, deployment |
| `187craft` | `187webdesign` + 187webdev-* suite | Design, UX, frontend, QA |
| `187vibe` | SCOUT, THREAD, TENSION, CORD, LAB | Delight, community, tuning, execution |
| `187launch` | `187launch` | Go-to-market intelligence |
| `187free` | `187free` | No-cost / open-source / local-first stacks |
| `187research` | `187research` | Source-backed research and reproducible labs |
| `187seo` | `187seo` | Ethical SEO and search visibility |
| `187revenue` | `187revenue` | Ethical revenue systems |
| `187docs` | `187docs` + `187write` | Documentation architecture and writing |
| `187learn` | `187learn` + `187test` | Courses, lessons, quizzes, surveys |
| `187test` | `187test` | Knowledge checks and rubrics |
| `187access-plus` | `187access-plus` + `187include` | Accessibility and inclusion review |
| `187include` | `187include` | Identity-safe language and forms |
| `187version` | `187version` | Versioning, changelogs, releases |
| `187publish` | `187publish` | Final docs/showcase/adapter sync |

## Safety / ethics guardrails

- Do not deploy to GitHub without an explicit user-provided `GITHUB_PAT`.
- Do not delete repositories or branches without approval.
- Do not publish public Pages content without `187access-plus` and `187include` review.
- Do not make uptime, security, or performance guarantees.

## Integration points

- **Claude Code:** load `.claude/skills/187repo/SKILL.md` directly.
- **CLI:** invoked via `187repo.sh`, `187power.sh`, and `187init.sh`.
- **Obsidian/Claudian:** outputs saved as linked notes using
  `templates/repo-spec.md` and `templates/deploy-runbook.md`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/repo-spec.md`](templates/repo-spec.md) | Capture repo scaffold decisions. |
| [`templates/deploy-runbook.md`](templates/deploy-runbook.md) | Document GitHub deploy steps. |

## Dashboards / UI representation

- Showcase route: `/187repo`.
- Installer page: `/install`.

## CLI exposure

`187repo.sh [repo|craft|vibe|launch|free|research|seo|revenue|docs|write|learn|test|access|include|version|publish|full|power|init|package|help]`

## Docs route

`docs/187REPO.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Generate a Next.js award site repo and deploy it to GitHub." →
   Expected: 187REPO selects `--web` archetype, invokes `187power.sh`, and lists
   manual follow-ups (OG image, domain).
2. Prompt: "187 research this topic." → Expected: 187REPO routes to `187research`.
3. Prompt: "Show me all short-name skills." → Expected: 187REPO prints the full
   routing table.

## The 7 archetypes

| Flag | Stack | Owned by |
|---|---|---|
| `--cli` | Go single-file binary | `187repo` scaffold |
| `--agent` | Python FastAPI + RAG | `187vibe` + `187craft` |
| `--kv` | ~150-line Node.js DB engine | `187repo` scaffold |
| `--edge` | Node.js/Fastify middleware | `187repo` scaffold |
| `--ui` | Headless React primitives | `187craft` |
| `--full` | Next.js + tRPC + Prisma monorepo | `187repo` + `187craft` |
| `--web` | Next.js 15 + Tailwind award site | `187craft` + `187webdesign` |

## Power Mode (GitHub surgical strike)

1. Export `GITHUB_PAT` (fine-grained token with `repo` and `pages` scope).
2. Run `scripts/187power.sh <repo-name> [--cli|--agent|--kv|--edge|--ui|--full|--web]`.
3. The script creates the repo, pushes the scaffold, injects 20 topics, and
   enables Pages.
4. **Manually upload the Social Preview (OG image)** — the GitHub API cannot do
   this.

## Installer site

This repo already hosts an installer at [`/install`](../../../app/install/page.tsx)
and cross-platform installers at [`install.sh`](../../../install.sh) /
[`install.ps1`](../../../install.ps1).

## Slash commands

| Command | Action |
|---|---|
| `/187 help` | Show this reference |
| `/187 init` | Start scaffold generation |
| `/187 cli` / `/187 agent` / `/187 kv` / `/187 edge` / `/187 ui` / `/187 full` / `/187 web` | Generate archetype |
| `/187 power` | Deploy to GitHub (Power Mode) |
| `/187 installer` | Open/generate installer page |
| `/187 free` | No-cost stack scouting |
| `/187 research` | Source-backed research plan |
| `/187 seo` | SEO / AEO / GEO audit |
| `/187 revenue` | Ethical revenue architecture |
| `/187 docs` | Documentation system |
| `/187 learn` | Course / learning path |
| `/187 test` | Quiz / survey / rubric |
| `/187 access` | Accessibility + inclusion review |
| `/187 version` | Version bump + changelog |
| `/187 publish` | Release sync gate |

## Tone

Direct, authoritative, surgical. No filler. Ready-to-run code.

