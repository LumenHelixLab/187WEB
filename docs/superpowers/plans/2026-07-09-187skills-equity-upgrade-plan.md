# 187skills Equity Upgrade — Phases 0-4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a universal skill contract and three new first-class skills (`187free`, `187research`, `187seo`) to the 187web suite.

**Architecture:** Self-contained `.claude/skills/<name>/` folders with SKILL.md, references/, and templates/. A central `docs/SKILL-CONTRACT.md` defines the required shape; an audit doc records the baseline. No existing skills are modified in this PR.

**Tech Stack:** Markdown skill definitions; Next.js 15 project for build verification.

---

## File Structure

### New docs

```
docs/audits/187skills-equity-audit.md
docs/SKILL-CONTRACT.md
.claude/skills/187web-ecosystem/references/SKILL-CONTRACT.md
```

### New 187free skill

```
.claude/skills/187free/SKILL.md
.claude/skills/187free/references/free-source-policy.md
.claude/skills/187free/references/free-stack-recipes.md
.claude/skills/187free/references/gotcha-ledger.md
.claude/skills/187free/templates/free-stack-recipe.md
.claude/skills/187free/templates/tool-review.md
```

### New 187research skill

```
.claude/skills/187research/SKILL.md
.claude/skills/187research/references/database-router.md
.claude/skills/187research/references/evidence-ladder.md
.claude/skills/187research/references/reproducibility-standard.md
.claude/skills/187research/references/lab-feature-backlog.md
.claude/skills/187research/templates/research-question.md
.claude/skills/187research/templates/literature-review.md
.claude/skills/187research/templates/computational-lab.md
.claude/skills/187research/templates/dataset-card.md
.claude/skills/187research/templates/claim-audit.md
```

### New 187seo skill

```
.claude/skills/187seo/SKILL.md
.claude/skills/187seo/references/seo-doctrine.md
.claude/skills/187seo/references/spam-guardrails.md
.claude/skills/187seo/references/technical-seo-standard.md
.claude/skills/187seo/references/content-standard.md
.claude/skills/187seo/references/structured-data-standard.md
.claude/skills/187seo/references/ai-search-standard.md
.claude/skills/187seo/references/analytics-standard.md
.claude/skills/187seo/templates/site-audit.md
.claude/skills/187seo/templates/page-audit.md
.claude/skills/187seo/templates/content-brief.md
.claude/skills/187seo/templates/schema-plan.md
.claude/skills/187seo/templates/search-console-analysis.md
```

---

### Task 1: Verify baseline health

**Files:** none (verification commands)

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: exits 0 with no ESLint warnings.

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Confirm branch**

```bash
git branch --show-current
```

Expected: `claude/187skills-equity-upgrade`.

---

### Task 2: Create audit doc

**Files:**
- Create: `docs/audits/187skills-equity-audit.md`

- [ ] **Step 1: Create `docs/audits/187skills-equity-audit.md`**

```markdown
# 187skills Equity Audit

## Date

2026-07-09

## Branch

`claude/187skills-equity-upgrade`

## Inventory

| Category | Count | Notes |
|---|---|---|
| `.claude/skills` SKILL.md files | 45 | Includes prompt skills, 187webdev suite, Charlotte skills, and short-name skills |
| Adapter files across `.chatgpt`, `.gemini`, `.kimi`, `.grok`, `.ollama`, `.herme` | 315 | Mirrored from `.claude/skills` by `scripts/generate-model-adapters.py` |
| Public short-name skills | 4 | `187repo`, `187craft`, `187vibe`, `187launch` |

## Existing public skills summary

| Skill | Role | Strengths | Gaps |
|---|---|---|---|
| `187repo` | Orchestration, deploy, installer | Clear short-name map, archetypes, power mode | Not yet expanded to route the full seven-skill suite |
| `187craft` | Design + frontend | Strong design-token discipline, QA hooks | None major |
| `187vibe` | Delight + community | Playful tone, Charlotte persona layer | Currently lists "research" in description; should narrow to delight/community/retention |
| `187launch` | Go-to-market | Strong launch playbook, SEO reference | Currently owns SEO as a primary category; should hand SEO ownership to new `187seo` skill |

## Missing first-class skills

| Skill | Purpose | Priority |
|---|---|---|
| `187free` | No-cost/free-tier/open-source/local-first solution scouting | High |
| `187research` | Scholarly/biomedical/math/code source routing and reproducible labs | High |
| `187seo` | Policy-aware SEO, AEO, GEO, structured data, analytics | High |

## Structural gaps

- No documented universal skill contract.
- Existing skills vary in frontmatter keys and section structure.
- New skills need to match the existing `.claude/skills/<name>/` convention with `references/` and `templates/`.

## Recommended upgrade order

1. Define universal skill contract.
2. Add `187free`, `187research`, `187seo` as first-class skills following the contract.
3. Refactor existing suite routing in a follow-up PR.
4. Fix adapter generator root and regenerate adapters.
5. Add validator + CI gate.
```

- [ ] **Step 2: Verify file exists**

```bash
ls -la docs/audits/187skills-equity-audit.md
```

Expected: file exists.

- [ ] **Step 3: Commit**

```bash
git add docs/audits/187skills-equity-audit.md
git commit -m "docs(audit): add 187skills equity audit"
```

---

### Task 3: Create universal skill contract

**Files:**
- Create: `docs/SKILL-CONTRACT.md`
- Create: `.claude/skills/187web-ecosystem/references/SKILL-CONTRACT.md`

- [ ] **Step 1: Create `docs/SKILL-CONTRACT.md`**

```markdown
---
title: 187web Skill Contract
description: Required structure for every first-class 187web skill.
---

# 187web Skill Contract

Every first-class 187web skill MUST be a self-contained folder under `.claude/skills/<name>/` with a `SKILL.md` file at the root. The skill MUST expose the following contract so that routing, adapters, and UI surfaces can consume it deterministically.

## Required frontmatter

```yaml
---
name: <skill-id>                # short, lowercase, kebab-case
description: <one-line purpose>
origin: portfolio               # or project / user
---
```

## Required sections

1. **Identity** — skill name and one-line purpose.
2. **Manual triggers** — slash commands and explicit trigger phrases a user can type.
3. **Automatic triggers** — keywords or contexts that should route to this skill.
4. **When to use** — concrete use cases.
5. **When not to use** — misrouting and anti-patterns.
6. **Input contract** — what the user must provide (prompt, file, context).
7. **Output contract** — required output format (numbered sections, tables, etc.).
8. **Routing rules** — how this skill relates to sibling skills.
9. **Safety / ethics guardrails** — hard rules (privacy, spam, consent, accessibility, etc.).
10. **Integration points** — Obsidian, Claudian, Claude Code, MCP, CLI, adapters.
11. **Templates** — list of template files and when to use them.
12. **Dashboards / UI representation** — vault dashboards or app pages.
13. **CLI exposure** — commands that invoke this skill.
14. **Adapter regeneration** — command to mirror this skill to other model adapters.
15. **Acceptance tests** — sample prompts and expected routing.

## File layout

```text
.claude/skills/<name>/
├── SKILL.md
├── references/
│   ├── <topic>.md
│   └── ...
└── templates/
    ├── <template>.md
    └── ...
```

## Adapter rule

After modifying any first-class skill, run:

```bash
python scripts/generate-model-adapters.py
```

This mirrors `.claude/skills/<name>/SKILL.md` into `.gemini/skills/<name>/`, `.kimi/skills/<name>/`, `.chatgpt/skills/<name>/`, `.ollama/modelfiles/<name>/`, and `.herme/agents/<name>/`.

## Acceptance rule

Every first-class skill must include at least three sample prompts with expected routing outcomes.
```

- [ ] **Step 2: Copy contract into ecosystem references**

```bash
cp docs/SKILL-CONTRACT.md .claude/skills/187web-ecosystem/references/SKILL-CONTRACT.md
```

- [ ] **Step 3: Verify both files**

```bash
ls -la docs/SKILL-CONTRACT.md .claude/skills/187web-ecosystem/references/SKILL-CONTRACT.md
```

Expected: both files exist.

- [ ] **Step 4: Commit**

```bash
git add docs/SKILL-CONTRACT.md .claude/skills/187web-ecosystem/references/SKILL-CONTRACT.md
git commit -m "docs(contract): add universal 187web skill contract"
```

---

### Task 4: Create 187free skill

**Files:**
- Create: `.claude/skills/187free/SKILL.md`
- Create: `.claude/skills/187free/references/free-source-policy.md`
- Create: `.claude/skills/187free/references/free-stack-recipes.md`
- Create: `.claude/skills/187free/references/gotcha-ledger.md`
- Create: `.claude/skills/187free/templates/free-stack-recipe.md`
- Create: `.claude/skills/187free/templates/tool-review.md`

- [ ] **Step 1: Create `.claude/skills/187free/SKILL.md`**

```markdown
---
name: 187free
description: Find practical free, free-tier, open-source, local-first, public-API, and low-cost bootstrap solutions.
origin: portfolio
---

# 187FREE — No-Cost Solution Engine

## Identity

187FREE is the Lumen Helix no-cost solution engine. It finds practical free, free-tier, open-source, local-first, public-domain, public-API, and low-cost bootstrap solutions for software, research, accessibility, civic tech, education, publishing, automation, data, AI, hosting, and client-budget needs.

## Manual triggers

- `/187free`
- `187FREE`
- `free stack`
- `free solution`
- `cheapest way`
- `no-cost option`
- `bootstrap this`

## Automatic triggers

Use 187FREE when the task implies: free, cheap, MVP, prototype, deploy, launch, hosting, database, auth, storage, email, domain, monitoring, analytics, docs, CI/CD, API, security scan, forms, search, CMS, image/video/audio utility, automation, public data, accessibility tool, assistive tech, student project, nonprofit/civic project, or client-budget project.

## When to use

- Choosing a no-cost stack for a landing page, MVP, demo, or client project.
- Finding open-source or local-first alternatives to paid tools.
- Scouting free public APIs, datasets, or hosting tiers.

## When not to use

- When the requirement is compliance, enterprise SLA, or regulated data — route to `187repo` + `187craft` with explicit risk review.
- When the task is pure scholarly research — route to `187research`.

## Input contract

User provides: the need, constraints (budget, privacy, scale), and any known tools to exclude.

## Output contract

1. **Need** — restated problem.
2. **Best Free Pick** — single best option with justification.
3. **Two Backup Options** — viable alternatives.
4. **Complete Free Stack Recipe** — if relevant, full wiring.
5. **Why This Works** — scoring rationale.
6. **Gotchas** — limits, quotas, expiration, telemetry.
7. **Privacy/Sensitivity Review** — data handling and consent.
8. **Upgrade Path** — what changes when free limits hit.
9. **Recommendation** — `use now` / `test first` / `avoid` / `paid upgrade likely later`.

## Routing rules

- Use alone for "what free tool can do this?"
- Use with `187research` when building a research lab or public demo with free hosting.
- Always run a privacy review for disability, medical, legal, civic, invention, or client projects.

## Safety / ethics guardrails

- Prefer local-first or private-by-default tools for sensitive data.
- Avoid hidden telemetry.
- Require explicit consent before sharing, tracking, or caregiver access.
- Do not recommend a tool only because it is free; recommend the one most likely to actually work.

## Integration points

- **Obsidian/Claudian:** outputs saved as linked notes using `templates/free-stack-recipe.md` and `templates/tool-review.md`.
- **Claude Code:** load `.claude/skills/187free/SKILL.md` directly.
- **CLI:** invoked via `187repo.sh free` after Phase 6.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

- [`templates/free-stack-recipe.md`](templates/free-stack-recipe.md)
- [`templates/tool-review.md`](templates/tool-review.md)

## Dashboards / UI representation

Future: `app/187free/page.tsx` and Obsidian `_system/187FREE Dashboard.md`.

## CLI exposure

Future: `187repo.sh free`, `187free.sh`.

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "I need a free stack for a static research demo with analytics and a contact form." → Expected: 187FREE only.
2. Prompt: "Find me the cheapest way to deploy promptPACK with auth, database, storage, email, and monitoring." → Expected: 187FREE only.
3. Prompt: "Find papers and a free hosting stack for an ADHD support tool." → Expected: 187RESEARCH for sources, 187FREE for stack.

## Core sources

- [free-for.dev](https://free-for.dev/)
- [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev)
- Official free-tier pages and API docs
- Open-source repos and public datasets
```

- [ ] **Step 2: Create references and templates**

Create each file with practical content derived from the upgrade plan:

- `references/free-source-policy.md` — what counts as a valid free source.
- `references/free-stack-recipes.md` — sample recipes for launch, MVP, docs, forms, etc.
- `references/gotcha-ledger.md` — common free-tier traps.
- `templates/free-stack-recipe.md` — YAML frontmatter + 9-section template.
- `templates/tool-review.md` — YAML frontmatter + scoring rubric template.

- [ ] **Step 3: Verify 187free structure**

```bash
find .claude/skills/187free -type f | sort
```

Expected: 6 files.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/187free
git commit -m "feat(skills): add 187free first-class skill"
```

---

### Task 5: Create 187research skill

**Files:**
- Create: `.claude/skills/187research/SKILL.md`
- Create: `.claude/skills/187research/references/database-router.md`
- Create: `.claude/skills/187research/references/evidence-ladder.md`
- Create: `.claude/skills/187research/references/reproducibility-standard.md`
- Create: `.claude/skills/187research/references/lab-feature-backlog.md`
- Create: `.claude/skills/187research/templates/research-question.md`
- Create: `.claude/skills/187research/templates/literature-review.md`
- Create: `.claude/skills/187research/templates/computational-lab.md`
- Create: `.claude/skills/187research/templates/dataset-card.md`
- Create: `.claude/skills/187research/templates/claim-audit.md`

- [ ] **Step 1: Create `.claude/skills/187research/SKILL.md`**

```markdown
---
name: 187research
description: Research-grade source routing, evidence discipline, reproducible labs, and scholarly/biomedical/math/code database routing.
origin: portfolio
---

# 187RESEARCH — Research-Grade Lab Engine

## Identity

187RESEARCH is the Lumen Helix research-grade lab engine. It routes research questions through scientific, mathematical, biomedical, software, and scholarly databases; classifies claims; builds reproducible lab artifacts; and converts findings into source-backed notes, demos, papers, specs, and product paths.

## Manual triggers

- `/187research`
- `187RESEARCH`
- `research this`
- `source this`
- `build a lab`
- `literature review`
- `citation map`
- `claim audit`
- `proof vs pattern`

## Automatic triggers

Use 187RESEARCH when the task implies: research, paper, source, citation, dataset, database, PubMed, PMC, NCBI, Europe PMC, arXiv, Crossref, OpenAlex, Semantic Scholar, PubChem, UniProt, RCSB PDB, AlphaFold, OEIS, LMFDB, DLMF, proof, theorem, conjecture, computation, simulation, reproducibility, experiment, notebook, lab, visualization, model, benchmark, evidence, peer-reviewed, clinical, biomedical, mathematical, coding research, repository analysis, or package analysis.

## When to use

- Searching scholarly, biomedical, mathematical, or software sources.
- Building a reproducible computational lab or public research page.
- Auditing claims and separating proof from pattern.

## When not to use

- When the user just wants a free tool list — route to `187free`.
- When the task is UI design or launch strategy — route to `187craft` or `187launch`.

## Input contract

User provides: the research question, domain, known sources, and sensitivity constraints.

## Output contract

1. **Research Need**
2. **Domain Classification**
3. **Best Source Routes**
4. **Database/API Query Plan**
5. **Evidence Ladder**
6. **Lab Artifact Plan**
7. **Reproducibility Checklist**
8. **Citation/Source Lineage Plan**
9. **Public-Claim Risk**
10. **187FREE Tooling/Hosting Options**
11. **Next Actions**

## Routing rules

- Use alone for pure source/literature questions.
- Use with `187free` when building a research lab that needs free hosting or tooling.
- Run claim audit and privacy review before any public release.

## Safety / ethics guardrails

- For medical/clinical/health content, provide evidence summaries only and require human/professional review.
- Keep API keys out of notes.
- Prefer official APIs; do not scrape when an API exists.
- Cite source route, query, date accessed, and returned identifiers.

## Integration points

- **Obsidian/Claudian:** outputs use `templates/research-question.md`, `literature-review.md`, `computational-lab.md`, `dataset-card.md`, `claim-audit.md`.
- **Claude Code:** load `.claude/skills/187research/SKILL.md`.
- **CLI:** future `187repo.sh research` / `187research.sh`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

- [`templates/research-question.md`](templates/research-question.md)
- [`templates/literature-review.md`](templates/literature-review.md)
- [`templates/computational-lab.md`](templates/computational-lab.md)
- [`templates/dataset-card.md`](templates/dataset-card.md)
- [`templates/claim-audit.md`](templates/claim-audit.md)

## Dashboards / UI representation

Future: `app/187research/page.tsx` and Obsidian `_system/187RESEARCH Dashboard.md`.

## CLI exposure

Future: `187repo.sh research`, `187research.sh`.

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Build a reproducible lab plan for a Golay/Leech lattice visualization with citations and claim discipline." → Expected: 187RESEARCH + 187FREE deployment suggestion.
2. Prompt: "Find papers and datasets for an ADHD/AuDHD consent-first support tool." → Expected: 187RESEARCH for sources/evidence, 187FREE for stack, consent-check required.
3. Prompt: "Is this mathematical pattern proof, computation, analogy, or poetic framing?" → Expected: 187RESEARCH + proof-vs-pattern classification.
```

- [ ] **Step 2: Create references and templates**

Create each file with practical content:

- `references/database-router.md` — scholarly, biomedical, math, software, public data routes with rules.
- `references/evidence-ladder.md` — claim ladder definitions and usage.
- `references/reproducibility-standard.md` — FAIR data, environment, seeds, provenance, sharing.
- `references/lab-feature-backlog.md` — lab shell, computation, visualization, evidence, math, bio, software, publication, standards, Lumen Helix modules.
- `templates/research-question.md` — YAML frontmatter + question/scope/sources sections.
- `templates/literature-review.md` — YAML frontmatter + synthesis table.
- `templates/computational-lab.md` — YAML frontmatter + environment/inputs/outputs.
- `templates/dataset-card.md` — YAML frontmatter + FAIR metadata.
- `templates/claim-audit.md` — YAML frontmatter + claim ladder table.

- [ ] **Step 3: Verify 187research structure**

```bash
find .claude/skills/187research -type f | sort
```

Expected: 10 files.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/187research
git commit -m "feat(skills): add 187research first-class skill"
```

---

### Task 6: Create 187seo skill

**Files:**
- Create: `.claude/skills/187seo/SKILL.md`
- Create: `.claude/skills/187seo/references/seo-doctrine.md`
- Create: `.claude/skills/187seo/references/spam-guardrails.md`
- Create: `.claude/skills/187seo/references/technical-seo-standard.md`
- Create: `.claude/skills/187seo/references/content-standard.md`
- Create: `.claude/skills/187seo/references/structured-data-standard.md`
- Create: `.claude/skills/187seo/references/ai-search-standard.md`
- Create: `.claude/skills/187seo/references/analytics-standard.md`
- Create: `.claude/skills/187seo/templates/site-audit.md`
- Create: `.claude/skills/187seo/templates/page-audit.md`
- Create: `.claude/skills/187seo/templates/content-brief.md`
- Create: `.claude/skills/187seo/templates/schema-plan.md`
- Create: `.claude/skills/187seo/templates/search-console-analysis.md`

- [ ] **Step 1: Create `.claude/skills/187seo/SKILL.md`**

```markdown
---
name: 187seo
description: Policy-aware SEO, AEO, GEO, structured data, technical audits, content strategy, and search analytics for the 187web suite.
origin: portfolio
---

# 187SEO — Policy-Aware Search Engine Optimization

## Identity

187SEO makes 187web public work discoverable. It covers traditional SEO, answer-engine optimization (AEO), generative-engine optimization (GEO), structured data, technical audits, content strategy, local/ecommerce SEO, search analytics, and launch readiness — all with Google's spam policies treated as hard guardrails, not optional suggestions.

## Manual triggers

- `/187seo`
- `187SEO`
- `seo audit`
- `technical seo`
- `content brief`
- `schema plan`
- `search console`

## Automatic triggers

Use 187SEO when the task implies: SEO, search visibility, ranking, schema, structured data, meta tags, Core Web Vitals, sitemap, robots.txt, canonical, hreflang, local SEO, ecommerce SEO, AI search readiness, traffic drop, migration safety, launch readiness, accessibility SEO, or client reporting.

## When to use

- Technical SEO audits, page audits, and site architecture reviews.
- Content briefs and keyword-driven content strategy.
- Schema/structured-data planning.
- Search Console and analytics analysis.
- Launch readiness and migration safety checks.

## When not to use

- For paid ads strategy — route to `187launch`.
- For UI design — route to `187craft`.
- For free tool scouting — route to `187free`.

## Input contract

User provides: URL or project, target market, current platform, known issues, and any compliance constraints.

## Output contract

1. **Mode** — which 187SEO mode is active.
2. **Findings** — prioritized issues/opportunities.
3. **Recommendations** — specific, actionable changes.
4. **Schema / structured-data plan** — when relevant.
5. **Content brief** — when relevant.
6. **Risk / spam review** — any policy concerns.
7. **Priority list** — quick wins vs long-term bets.
8. **Next actions** — concrete tasks.

## Routing rules

- Use alone for SEO-specific audits and content.
- Use with `187craft` when recommendations require UI/component changes.
- Use with `187launch` for launch-readiness and GTM alignment.

## Safety / ethics guardrails

Never recommend or tolerate:
- Cloaking or hidden text
- Link schemes
- Fake reviews or fake schema
- Doorway pages
- Scaled thin content
- Unauthorized SERP scraping
- Ranking promises
- AI-search manipulation spam

Always align with Google's Search Essentials and treat accessibility as an SEO input.

## Integration points

- **Obsidian/Claudian:** outputs use `templates/site-audit.md`, `page-audit.md`, `content-brief.md`, `schema-plan.md`, `search-console-analysis.md`.
- **Claude Code:** load `.claude/skills/187seo/SKILL.md`.
- **CLI:** future `187repo.sh seo` / `187seo.sh`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

- [`templates/site-audit.md`](templates/site-audit.md)
- [`templates/page-audit.md`](templates/page-audit.md)
- [`templates/content-brief.md`](templates/content-brief.md)
- [`templates/schema-plan.md`](templates/schema-plan.md)
- [`templates/search-console-analysis.md`](templates/search-console-analysis.md)

## Dashboards / UI representation

Future: `app/187seo/page.tsx` and Obsidian `_system/187SEO Dashboard.md`.

## CLI exposure

Future: `187repo.sh seo`, `187seo.sh`.

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Run a technical SEO audit for my Next.js site." → Expected: 187SEO only.
2. Prompt: "Build a content brief for a launch landing page." → Expected: 187SEO + possibly 187launch for GTM.
3. Prompt: "Can I buy backlinks to rank faster?" → Expected: 187SEO rejects the request and cites spam-policy guardrails.
```

- [ ] **Step 2: Create references and templates**

Create each file with practical content:

- `references/seo-doctrine.md` — overall philosophy and priority framework.
- `references/spam-guardrails.md` — prohibited tactics with policy references.
- `references/technical-seo-standard.md` — crawlability, performance, mobile, CWV, security.
- `references/content-standard.md` — E-E-A-T, intent, brief structure.
- `references/structured-data-standard.md` — schema types, validation, policies.
- `references/ai-search-standard.md` — AEO/GEO practices.
- `references/analytics-standard.md` — Search Console, GA4, KPI definitions.
- `templates/site-audit.md` — YAML + technical/content/off-site sections.
- `templates/page-audit.md` — YAML + on-page checklist.
- `templates/content-brief.md` — YAML + audience, intent, outline, keywords.
- `templates/schema-plan.md` — YAML + schema types, properties, validation.
- `templates/search-console-analysis.md` — YAML + queries, pages, actions.

- [ ] **Step 3: Verify 187seo structure**

```bash
find .claude/skills/187seo -type f | sort
```

Expected: 13 files.

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/187seo
git commit -m "feat(skills): add 187seo first-class skill"
```

---

### Task 7: Final verification

**Files:** none (verification commands)

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: exits 0.

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: exits 0.

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Check git status**

```bash
git status --short
```

Expected: working tree clean (all changes committed).

- [ ] **Step 5: Push branch**

```bash
git push -u origin claude/187skills-equity-upgrade
```

Expected: branch pushed.

---

## Spec coverage self-check

| Spec requirement | Plan task |
|---|---|
| Phase 0 audit doc | Task 2 |
| Phase 1 universal contract | Task 3 |
| Phase 2 187free skill | Task 4 |
| Phase 3 187research skill | Task 5 |
| Phase 4 187seo skill | Task 6 |
| Build/typecheck/lint pass | Task 7 |

## Placeholder scan

No `TBD`, `TODO`, or "implement later" strings. Reference and template content is generated from the approved upgrade plan and design doc.
