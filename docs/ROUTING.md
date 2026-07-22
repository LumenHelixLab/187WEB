
<!-- 187SKILLS first-class roster (release:validate) -->
<!-- 187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187THEME -->
# 187SKILLS Routing Guide

This doc is the source of truth for how requests map to skills in the 187SKILLS suite.

## Skill class model

The 187SKILLS suite is organized into three classes:

- **1st class** — Public routed skills with dedicated pages, docs, and canonical skill files. These are the primary slash-command surfaces.
- **2nd class** — Specialist subskills that support 1st-class skills but do not have their own public route (e.g., `187WRITE`, `187INCLUDE+`).
- **3rd class** — Internal primitives, utilities, templates, and runtime helpers used by 1st- and 2nd-class skills.

> **Note:** 187QUANTUM topics have been redistributed. Quantum algorithm selection, circuit design, and resource estimation now route through **187RESEARCH**; quantum-claim audits and non-claim reviews route through **187NATASHA**.

## Command grammar

```text
187 <alias> [target] [mode] [depth]
```

- **Workflow modes:** `solo` (default), `assist`, `flow`, `release`
- **Output depths:** `brief` (default), `report`, `deep`

A named skill or alias runs **solo + brief** by default. The ecosystem coordinates only when a task benefits from routing, shared context, handoff, or release sync.

## Trigger hierarchy

1. **Explicit skill name** — e.g., `187seo`, `/187free`. Route directly.
2. **Short alias** — e.g., `187 craft`, `187 rpt`. Resolve via `config/187-aliases.json`.
3. **Domain keyword** — e.g., "schema", "free tier", "affiliate". Route to the matching skill.
4. **Ambiguous `187` / `187 this`** — run `187REPORT` first; propose approval options.
5. **Public surface requirement** — any page, form, checkout, course, quiz, or docs update must include `187ACCESS+` and `187INCLUDE+` review.

## Skill ownership

| Domain | Primary skill | Common co-routes |
|---|---|---|
| Command / intent routing | `187COMMAND` | `187REPORT`, `187FLOW` |
| Explanation / summary / status | `187REPORT` | `187DOCS`, `187WRITE` |
| Inspection / audit / detection | `187SCAN` | `187STANDARD`, `187ACCESS+` |
| Templates / scaffolds / toolkits | `187KIT` | `187CRAFT`, `187REPO` |
| Standards / quality gates | `187STANDARD` | `187SCAN`, `187ACCESS+` |
| Planning / sequencing / handoff | `187FLOW` | `187COMMAND`, `187LAUNCH`, `187PUBLISH` |
| Repo generation / deploy / installer | `187REPO` | `187VERSION`, `187PUBLISH` |
| Design / frontend / UI/UX | `187CRAFT` | `187VIBE`, `187ACCESS+`, `187INCLUDE+` |
| Delight / onboarding / retention / community | `187VIBE` | `187CRAFT`, `187ACCESS+` |
| Go-to-market / launch / outreach | `187LAUNCH` | `187SEO`, `187WRITE`, `187PUBLISH` |
| Free / open-source / local-first stacks | `187FREE` | `187RESEARCH`, `187DOCS` |
| Research / sources / labs / reproducibility | `187RESEARCH` | `187FREE`, `187DOCS`, `187VERSION` |
| SEO / AEO / GEO / structured data | `187SEO` | `187CRAFT`, `187WRITE`, `187ACCESS+` |
| Revenue / pricing / payments / affiliate | `187REVENUE` | `187LAUNCH`, `187DOCS`, `187ACCESS+` |
| Documentation / README / SOP / API docs | `187DOCS` | `187WRITE`, `187PUBLISH` |
| Writing / copy / plain language | `187WRITE` | `187DOCS`, `187SEO`, `187LAUNCH` |
| Courses / learning paths / workshops | `187LEARN` | `187TEST`, `187ACCESS+`, `187INCLUDE+` |
| Quizzes / surveys / rubrics | `187TEST` | `187LEARN`, `187ACCESS+`, `187INCLUDE+` |
| Accessibility / WCAG+ / inclusion | `187ACCESS+` | `187INCLUDE+`, `187CRAFT` |
| Identity-safe language / pronouns | `187INCLUDE+` | `187ACCESS+`, `187DOCS` |
| Versioning / changelogs / releases | `187VERSION` | `187PUBLISH`, `187DOCS` |
| Release sync / showcase / adapters | `187PUBLISH` | `187VERSION`, `187DOCS`, `187SEO` |

## Charlotte modules

| Module | Role | Typical route |
|---|---|---|
| `THREAD` | Prompt shaping, rewrite, refactor | Pre-process user input before routing |
| `TUNE` | Output profile, inference settings | Adjust behavior for mode/depth |
| `CORD` | Coordinated role dispatch | Multi-surface `flow` and `release` work |
| `CHAR` | Shared scout for web/source/context | Research and context gathering |
| `LAB` | Isolated execution/test workspace | Safe local experiments |

Legacy aliases: `widow-weaver → thread`, `neuro-toxin → tune`, `swarm-mind → cord`, `agent-charlotte → char`, `silk-sandbox → lab`.

## Anti-patterns

- Do not route research questions to `187VIBE`.
- Do not route SEO strategy to `187LAUNCH`.
- Do not route revenue architecture to `187LAUNCH`.
- Do not publish any public page without `187ACCESS+` and `187INCLUDE+` review.
- Do not make WCAG, ADA, revenue, health, legal, or SEO guarantees without evidence and human review.
- Do not force every task through every module; default is **solo + brief**.
