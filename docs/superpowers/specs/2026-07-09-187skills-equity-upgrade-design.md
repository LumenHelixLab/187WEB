# Design: 187skills Equity Upgrade — Phases 0-4

## Goal

Promote every public 187web skill to the same first-class status by introducing a universal skill contract, then add the three missing public skills: `187free`, `187research`, and `187seo`. This PR covers Phases 0–4 only; routing, CLI, app surfaces, adapter generator fixes, and the validator will follow in a second PR.

## Scope

**In scope for this PR:**
- Phase 0 — branch + audit doc
- Phase 1 — universal skill contract
- Phase 2 — `187free` skill
- Phase 3 — `187research` skill
- Phase 4 — `187seo` skill

**Out of scope for this PR:**
- Refactoring existing `187repo`, `187craft`, `187vibe`, `187launch`, `187web-ecosystem`, or `187web-manifest` skills
- Updating CLI scripts, installers, app pages, README, AGENTS.md
- Fixing `scripts/generate-model-adapters.py` hardcoded root
- Regenerating model adapters
- Adding `scripts/validate-skills.mjs` and CI gate

## Approach

Keep the new skills self-contained under `.claude/skills/<name>/` so they can be loaded immediately by Claude Code / Claudian. Each skill follows the universal contract defined in `docs/SKILL-CONTRACT.md`. References and templates live inside each skill folder to match the existing 187webdesign skill convention.

## Branch

`claude/187skills-equity-upgrade`

## Phase 0 — Audit

**Deliverable:** `docs/audits/187skills-equity-audit.md`

Inventory results:
- `.claude/skills` SKILL.md count: 45
- Adapter files across `.chatgpt`, `.gemini`, `.kimi`, `.grok`, `.ollama`, `.herme`: 315
- Current public short-name skills: `187repo`, `187craft`, `187vibe`, `187launch`
- Missing first-class public skills: `187free`, `187research`, `187seo`
- Existing skills vary in frontmatter and section structure; no documented contract yet.

## Phase 1 — Universal Skill Contract

**Deliverables:**
- `docs/SKILL-CONTRACT.md`
- `.claude/skills/187web-ecosystem/references/SKILL-CONTRACT.md`

Every first-class 187web skill MUST include:

1. **name** — short identifier
2. **description** — one-line purpose
3. **manual triggers** — slash commands, trigger phrases
4. **automatic triggers** — keyword/context routing
5. **when to use** — clear use cases
6. **when not to use** — anti-patterns / misrouting
7. **input contract** — what the user must provide
8. **output contract** — required output format
9. **routing rules** — which skill owns what
10. **safety / ethics guardrails** — hard rules (privacy, spam, consent, etc.)
11. **integration points** — Obsidian, Claudian, Claude Code, MCP, etc.
12. **templates** — file paths and purposes
13. **dashboards / UI representation** — vault dashboards or app pages
14. **CLI exposure** — script commands
15. **adapter regeneration** — how to mirror to other models
16. **acceptance tests** — sample prompts and expected routing

## Phase 2 — 187FREE

**Deliverables:**
- `.claude/skills/187free/SKILL.md`
- `.claude/skills/187free/references/free-source-policy.md`
- `.claude/skills/187free/references/free-stack-recipes.md`
- `.claude/skills/187free/references/gotcha-ledger.md`
- `.claude/skills/187free/templates/free-stack-recipe.md`
- `.claude/skills/187free/templates/tool-review.md`

**Capabilities:**
- Free Launch Architect
- Free Fullstack MVP Builder
- Free Domain/Subdomain Scout
- Free API Miner
- Free Database Selector
- Free Auth Scout
- Free Monitoring Scout
- Free AI/Local Model Scout
- Free Accessibility Tool Scout
- Free Security Tool Scout
- Free Forms/Intake Builder
- Free Docs/Knowledge Base Builder
- Free Data Visualization Scout
- Free Dataset Scout
- Free Code Intelligence Scout
- Free Automation Scout
- Free Civic Tech Stack Scout
- Free Client Budget Optimizer

**Output contract:**
1. Need
2. Best Free Pick
3. Two Backup Options
4. Complete Free Stack Recipe
5. Why This Works
6. Gotchas
7. Privacy/Sensitivity Review
8. Upgrade Path
9. Recommendation

## Phase 3 — 187RESEARCH

**Deliverables:**
- `.claude/skills/187research/SKILL.md`
- `.claude/skills/187research/references/database-router.md`
- `.claude/skills/187research/references/evidence-ladder.md`
- `.claude/skills/187research/references/reproducibility-standard.md`
- `.claude/skills/187research/references/lab-feature-backlog.md`
- `.claude/skills/187research/templates/research-question.md`
- `.claude/skills/187research/templates/literature-review.md`
- `.claude/skills/187research/templates/computational-lab.md`
- `.claude/skills/187research/templates/dataset-card.md`
- `.claude/skills/187research/templates/claim-audit.md`

**Database router routes:**
- Scholarly: arXiv, Crossref, OpenAlex, Semantic Scholar, Europe PMC
- Biomedical: NCBI E-utilities (PubMed/PMC/Gene/Protein), PubChem, UniProt, RCSB PDB, AlphaFold DB, ClinicalTrials.gov
- Mathematics: OEIS, LMFDB, NIST DLMF
- Software: GitHub API, npm Registry, PyPI JSON API, Libraries.io
- Public data: Data.gov, NASA, World Bank, Wikidata, OpenStreetMap, Zenodo, Hugging Face datasets

**Claim ladder:** proved, measured, modeled, inherited, interpreted, speculative, poetic/metaphorical, unsupported.

**Lab modules:** Next.js/React shell, single-file HTML fallback, JupyterLite/Pyodide, D3/Vega-Lite/Plotly/ECharts, Three.js/WebGL/WebGPU, citation panel, reproducibility panel, dataset card, claim-to-source map, FAIR checklist, accessibility checklist, publication-readiness gate.

## Phase 4 — 187SEO

**Deliverables:**
- `.claude/skills/187seo/SKILL.md`
- `.claude/skills/187seo/references/seo-doctrine.md`
- `.claude/skills/187seo/references/spam-guardrails.md`
- `.claude/skills/187seo/references/technical-seo-standard.md`
- `.claude/skills/187seo/references/content-standard.md`
- `.claude/skills/187seo/references/structured-data-standard.md`
- `.claude/skills/187seo/references/ai-search-standard.md`
- `.claude/skills/187seo/references/analytics-standard.md`
- `.claude/skills/187seo/templates/site-audit.md`
- `.claude/skills/187seo/templates/page-audit.md`
- `.claude/skills/187seo/templates/content-brief.md`
- `.claude/skills/187seo/templates/schema-plan.md`
- `.claude/skills/187seo/templates/search-console-analysis.md`

**Modes:**
TECHNICAL_AUDIT, CONTENT_STRATEGY, PAGE_OPTIMIZATION, SITE_ARCHITECTURE, STRUCTURED_DATA, SEARCH_ANALYTICS, LOCAL_SEO, ECOMMERCE_SEO, AI_SEARCH_READINESS, TRAFFIC_DROP_DEBUG, MIGRATION_SAFETY, LAUNCH_READINESS, ACCESSIBILITY_SEO, CLIENT_REPORTING.

**Guardrails:** no cloaking, hidden text, link schemes, fake reviews, fake schema, doorway pages, scaled thin content, unauthorized SERP scraping, ranking promises, or AI-search manipulation spam.

## File list to create

```
docs/audits/187skills-equity-audit.md
docs/SKILL-CONTRACT.md
.claude/skills/187web-ecosystem/references/SKILL-CONTRACT.md

.claude/skills/187free/SKILL.md
.claude/skills/187free/references/free-source-policy.md
.claude/skills/187free/references/free-stack-recipes.md
.claude/skills/187free/references/gotcha-ledger.md
.claude/skills/187free/templates/free-stack-recipe.md
.claude/skills/187free/templates/tool-review.md

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

## Success criteria

- `npm run lint` passes
- `npm run typecheck` passes
- `npm run build` passes
- Every new SKILL.md has valid YAML frontmatter with `name` and `description`
- Every new skill follows the contract in `docs/SKILL-CONTRACT.md`
- No existing files are modified
