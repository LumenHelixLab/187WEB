# Design: 187web Repo Evaluation System + 187FREE + 187RESEARCH

## Goal

Create a reusable way to evaluate third-party repositories for adoption into the 187web AI-tool suite, and add two new first-class skills:

- **187FREE** — no-cost / open-source / local-first solution scouting.
- **187RESEARCH** — research-grade source routing, evidence discipline, and reproducible labs.

## Target locations

| Deliverable | Location | Form |
|---|---|---|
| Repo evaluation skill | `.claude/skills/187repo-eval/` (mirrored to `.grok/`, `.gemini/`, `.kimi/`, `.ollama/`, `.herme/`) | Concise skill + rubric + report template |
| 187FREE skill | `.claude/skills/187free/` | Skill + references + templates |
| 187RESEARCH skill | `.claude/skills/187research/` | Skill + references + templates |
| Full vault pack | `docs/187suite-vault/` | Portable Obsidian-style `_system/`, `_templates/`, dashboards |

## Approach

**Self-contained project skills + full vault mirror.**

Each `.claude/skills/` folder contains its own `SKILL.md`, `references/`, and `templates/` so it works standalone in any coding agent. The same content is expanded into the full vault layout under `docs/187suite-vault/` for Obsidian/Claudian users.

This matches the existing 187webdesign convention: `.claude/skills/` are first-class agent instructions and are mirrored across model adapters.

## Components

### 1. 187repo-eval skill

**Purpose:** Evaluate a repository for integration into the 187web suite.

**Rubric categories (0–5 each):**
1. Purpose fit — does it solve a real 187web / client / product need?
2. License / legal — OSI-approved? compatible with commercial use? patent concerns?
3. Maintenance health — recent commits, responsive maintainers, issue/PR velocity.
4. Security posture — audits, CVE history, dependency hygiene, secret scanning.
5. Accessibility — a11y baked in or pluggable?
6. Performance / footprint — bundle size, runtime cost, cold-start behavior.
7. Dependency / supply chain — transitive risk, pinning, reproducible installs.
8. Documentation / API stability — getting-started friction, breaking-change policy.
9. Integration cost — API surface, data migration, lock-in reversibility.
10. Privacy / telemetry — data collection, retention, consent model.
11. 187web brand fit — warm-blueprint / Killer Web vibe, Charlotte tone compatibility.

**Output:** per-repo Markdown scorecard with category scores, evidence, and one of:
- `adopt`
- `adopt-with-guardrails`
- `watch`
- `reject`

**Trigger phrases:** `187repo eval`, `evaluate repo`, `integration scorecard`, `should we adopt`, `repo review`.

### 2. 187FREE skill

**Purpose:** Find practical free, free-tier, open-source, local-first, public-API, and low-cost bootstrap solutions.

**Scoring model:**
- 25% setup speed
- 20% free-tier usefulness
- 15% reliability / maintenance
- 15% privacy / security
- 10% upgrade path
- 10% simplicity / accessibility
- 5% lock-in reversibility

**Required output format:**
1. Need
2. Best Free Pick
3. Two Backup Options
4. Complete Free Stack Recipe, if relevant
5. Why This Works
6. Gotchas
7. Privacy / Sensitivity Review
8. Upgrade Path
9. Recommendation: use now / test first / avoid / paid upgrade likely later

**Reference docs:**
- `references/187FREE-Tool-Index.md`
- `references/187FREE-Decision-Matrix.md`
- `references/187FREE-Free-Stack-Recipes.md`
- `references/187FREE-Skill-Ideas.md` (≥ 20 skill concepts)
- `references/187FREE-Source-Policy.md`
- `references/187FREE-Gotcha-Ledger.md`
- `references/187FREE-Privacy-Checklist.md`

**Templates:**
- `templates/187free-stack-recipe.md`
- `templates/187free-tool-review.md`
- `templates/187free-service-comparison.md`
- `templates/187free-public-api-note.md`
- `templates/187free-gotcha-report.md`
- `templates/187free-launch-checklist.md`

### 3. 187RESEARCH skill

**Purpose:** Route research questions through scholarly, biomedical, mathematical, software, and open-data sources; build reproducible lab artifacts.

**Required output format:**
1. Research Need
2. Domain Classification
3. Best Source Routes
4. Database / API Query Plan
5. Evidence Ladder
6. Lab Artifact Plan
7. Reproducibility Checklist
8. Citation / Source Lineage Plan
9. Public-Claim Risk
10. 187FREE Tooling / Hosting Options
11. Next Actions

**Evidence ladder:** proved, measured, modeled, inherited, interpreted, speculative, poetic / metaphorical, unsupported.

**Reference docs:**
- `references/187RESEARCH-Source-Index.md`
- `references/187RESEARCH-Lab-Architecture.md`
- `references/187RESEARCH-Database-Router.md`
- `references/187RESEARCH-Evidence-Ladder.md`
- `references/187RESEARCH-Reproducibility-Standard.md`
- `references/187RESEARCH-Citation-Standard.md`
- `references/187RESEARCH-Public-Claim-Standard.md`
- `references/187RESEARCH-Lab-Feature-Backlog.md`
- `references/187RESEARCH-Integration-Map.md`

**Templates:**
- `templates/187research-question.md`
- `templates/187research-source-note.md`
- `templates/187research-literature-review.md`
- `templates/187research-database-query.md`
- `templates/187research-computational-lab.md`
- `templates/187research-dataset-card.md`
- `templates/187research-method-card.md`
- `templates/187research-claim-audit.md`
- `templates/187research-reproducibility-report.md`
- `templates/187research-publication-brief.md`
- `templates/187research-lab-demo-spec.md`
- `templates/187research-citation-map.md`

### 4. Integration glue

- `docs/187suite-vault/_system/187SKILLS Integration Map.md`
- `docs/187suite-vault/_system/187SKILLS Routing Rules.md`
- Routing tests from the source prompt included as sample prompts in the vault pack.

### 5. Model adapter mirroring

After creating the `.claude/skills/` folders, run:

```bash
python scripts/generate-model-adapters.py
```

This mirrors the new skills into `.grok/`, `.gemini/`, `.kimi/`, `.ollama/`, and `.herme/` using the existing adapter conventions.

## Out of scope

- Runtime implementation of Charlotte skills (still prompt-engineering assets).
- Automated GitHub API repo fetching for 187repo-eval (manual evidence capture only).
- Actual lab notebook execution; 187RESEARCH specifies artifacts, not a runtime engine.

## Success criteria

- `npm run lint`, `npm run typecheck`, `npm run build` still pass.
- New `.claude/skills/` entries load without errors.
- Adapter generation script completes without errors.
- Vault pack is portable and can be copied into any Obsidian vault.

## Files to create

### Project skills

```
.claude/skills/187repo-eval/SKILL.md
.claude/skills/187repo-eval/references/RUBRIC.md
.claude/skills/187repo-eval/templates/scorecard.md

.claude/skills/187free/SKILL.md
.claude/skills/187free/references/187FREE-Tool-Index.md
.claude/skills/187free/references/187FREE-Decision-Matrix.md
.claude/skills/187free/references/187FREE-Free-Stack-Recipes.md
.claude/skills/187free/references/187FREE-Skill-Ideas.md
.claude/skills/187free/references/187FREE-Source-Policy.md
.claude/skills/187free/references/187FREE-Gotcha-Ledger.md
.claude/skills/187free/references/187FREE-Privacy-Checklist.md
.claude/skills/187free/templates/187free-stack-recipe.md
.claude/skills/187free/templates/187free-tool-review.md
.claude/skills/187free/templates/187free-service-comparison.md
.claude/skills/187free/templates/187free-public-api-note.md
.claude/skills/187free/templates/187free-gotcha-report.md
.claude/skills/187free/templates/187free-launch-checklist.md

.claude/skills/187research/SKILL.md
.claude/skills/187research/references/187RESEARCH-Source-Index.md
.claude/skills/187research/references/187RESEARCH-Lab-Architecture.md
.claude/skills/187research/references/187RESEARCH-Database-Router.md
.claude/skills/187research/references/187RESEARCH-Evidence-Ladder.md
.claude/skills/187research/references/187RESEARCH-Reproducibility-Standard.md
.claude/skills/187research/references/187RESEARCH-Citation-Standard.md
.claude/skills/187research/references/187RESEARCH-Public-Claim-Standard.md
.claude/skills/187research/references/187RESEARCH-Lab-Feature-Backlog.md
.claude/skills/187research/references/187RESEARCH-Integration-Map.md
.claude/skills/187research/templates/187research-question.md
.claude/skills/187research/templates/187research-source-note.md
.claude/skills/187research/templates/187research-literature-review.md
.claude/skills/187research/templates/187research-database-query.md
.claude/skills/187research/templates/187research-computational-lab.md
.claude/skills/187research/templates/187research-dataset-card.md
.claude/skills/187research/templates/187research-method-card.md
.claude/skills/187research/templates/187research-claim-audit.md
.claude/skills/187research/templates/187research-reproducibility-report.md
.claude/skills/187research/templates/187research-publication-brief.md
.claude/skills/187research/templates/187research-lab-demo-spec.md
.claude/skills/187research/templates/187research-citation-map.md
```

### Vault pack

```
docs/187suite-vault/_system/187FREE.md
docs/187suite-vault/_system/187FREE Tool Index.md
docs/187suite-vault/_system/187FREE Decision Matrix.md
docs/187suite-vault/_system/187FREE Free Stack Recipes.md
docs/187suite-vault/_system/187FREE Skill Ideas.md
docs/187suite-vault/_system/187FREE Source Policy.md
docs/187suite-vault/_system/187FREE Gotcha Ledger.md
docs/187suite-vault/_system/187FREE Privacy Checklist.md
docs/187suite-vault/_system/187FREE Dashboard.md

docs/187suite-vault/_system/187RESEARCH.md
docs/187suite-vault/_system/187RESEARCH Source Index.md
docs/187suite-vault/_system/187RESEARCH Lab Architecture.md
docs/187suite-vault/_system/187RESEARCH Database Router.md
docs/187suite-vault/_system/187RESEARCH Evidence Ladder.md
docs/187suite-vault/_system/187RESEARCH Reproducibility Standard.md
docs/187suite-vault/_system/187RESEARCH Citation Standard.md
docs/187suite-vault/_system/187RESEARCH Public Claim Standard.md
docs/187suite-vault/_system/187RESEARCH Lab Feature Backlog.md
docs/187suite-vault/_system/187RESEARCH Integration Map.md
docs/187suite-vault/_system/187RESEARCH Dashboard.md
docs/187suite-vault/_system/187RESEARCH Literature Dashboard.md
docs/187suite-vault/_system/187RESEARCH Database Dashboard.md
docs/187suite-vault/_system/187RESEARCH Lab Dashboard.md
docs/187suite-vault/_system/187RESEARCH Claims Dashboard.md
docs/187suite-vault/_system/187RESEARCH Reproducibility Dashboard.md
docs/187suite-vault/_system/187RESEARCH Publication Queue.md

docs/187suite-vault/_system/187SKILLS Integration Map.md
docs/187suite-vault/_system/187SKILLS Routing Rules.md

docs/187suite-vault/_templates/187free-stack-recipe.md
... (all 187free and 187research templates)
```
