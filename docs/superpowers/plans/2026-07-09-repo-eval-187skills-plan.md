# Repo Evaluation System + 187FREE + 187RESEARCH Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a repo-evaluation skill and two new first-class skills (187FREE, 187RESEARCH) to the 187web suite, both as project agent skills and as a portable Obsidian vault pack.

**Architecture:** Self-contained `.claude/skills/` entries for coding agents, plus a mirrored `docs/187suite-vault/` layout for Obsidian/Claudian. Model adapters are regenerated from the canonical `.claude/skills/` sources.

**Tech Stack:** Markdown skill definitions, Python adapter generator (`scripts/generate-model-adapters.py`), Next.js 15 project for build verification.

---

## File Structure

### New project skills

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

### New vault pack

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
docs/187suite-vault/_templates/187free-tool-review.md
docs/187suite-vault/_templates/187free-service-comparison.md
docs/187suite-vault/_templates/187free-public-api-note.md
docs/187suite-vault/_templates/187free-gotcha-report.md
docs/187suite-vault/_templates/187free-launch-checklist.md
docs/187suite-vault/_templates/187research-question.md
docs/187suite-vault/_templates/187research-source-note.md
docs/187suite-vault/_templates/187research-literature-review.md
docs/187suite-vault/_templates/187research-database-query.md
docs/187suite-vault/_templates/187research-computational-lab.md
docs/187suite-vault/_templates/187research-dataset-card.md
docs/187suite-vault/_templates/187research-method-card.md
docs/187suite-vault/_templates/187research-claim-audit.md
docs/187suite-vault/_templates/187research-reproducibility-report.md
docs/187suite-vault/_templates/187research-publication-brief.md
docs/187suite-vault/_templates/187research-lab-demo-spec.md
docs/187suite-vault/_templates/187research-citation-map.md
```

### Files to modify

- `AGENTS.md` — add 187repo-eval, 187free, 187research to the active skill suite table.
- `187web Skills Architecture Plan.md` — mention the new short-name / research / free skills.
- `scripts/generate-model-adapters.py` only if it needs new skill names added to a registry; otherwise run as-is.

---

### Task 1: Create feature branch

**Files:** none (git branch)

- [ ] **Step 1: Create and switch to feature branch**

```bash
git checkout -b feat/187free-187research-repo-eval
```

Expected: branch created and checked out from current `master`.

- [ ] **Step 2: Verify clean working tree**

```bash
git status
```

Expected: on branch `feat/187free-187research-repo-eval`, working tree clean.

---

### Task 2: Create 187repo-eval skill

**Files:**
- Create: `.claude/skills/187repo-eval/SKILL.md`
- Create: `.claude/skills/187repo-eval/references/RUBRIC.md`
- Create: `.claude/skills/187repo-eval/templates/scorecard.md`

- [ ] **Step 1: Create `.claude/skills/187repo-eval/SKILL.md`**

```markdown
---
name: 187repo-eval
description: Use when evaluating a repository, package, or third-party tool for adoption into the 187web suite.
origin: portfolio
---

# 187REPO-EVAL — Repo Integration Scorecard

**Suite:** Short-name gate for bringing external repos, packages, or tools into the 187web ecosystem.

## When to use this

- User says "evaluate repo", "repo review", "integration scorecard", "should we adopt", or "187repo eval".
- A new dependency, scaffold, library, or service is being considered for a 187web project.
- You need a documented yes/no/watch decision with evidence.

## What it does

Runs an 11-category rubric over the candidate repo/tool and produces a Markdown scorecard with a final recommendation:

- `adopt`
- `adopt-with-guardrails`
- `watch`
- `reject`

## Rubric categories (0–5 each)

1. **Purpose fit** — Does it solve a real 187web / client / product need?
2. **License / legal** — OSI-approved? Commercial-use compatible? Patent / trademark concerns?
3. **Maintenance health** — Recent commits, responsive maintainers, issue/PR velocity.
4. **Security posture** — Audit history, CVEs, dependency hygiene, secret scanning, SLSA/SBOM signals.
5. **Accessibility** — a11y built-in or easily pluggable? WCAG 2.2 alignment?
6. **Performance / footprint** — Bundle size, runtime cost, cold-start, memory profile.
7. **Dependency / supply chain** — Transitive risk, reproducible installs, pinning policy.
8. **Documentation / API stability** — Getting-started friction, breaking-change policy, examples.
9. **Integration cost** — API surface, data migration, lock-in reversibility.
10. **Privacy / telemetry** — Data collection, retention, consent model, hidden trackers.
11. **187web brand fit** — Warm-blueprint / Killer Web vibe, Charlotte tone, lethal precision.

## Scoring

- **44–55:** `adopt`
- **33–43:** `adopt-with-guardrails`
- **22–32:** `watch`
- **0–21:** `reject`

## Required output format

1. Candidate (repo URL / package name / tool)
2. Eval date / evaluator
3. Category scores + evidence bullets
4. Risk summary
5. Final recommendation
6. Required guardrails (if any)
7. 187FREE alternative check (is there a free/open-source/local-first alternative?)
8. Next action

## Trigger phrases

- `187repo eval`
- `evaluate repo`
- `repo review`
- `integration scorecard`
- `should we adopt`

## Tone

Surgical, evidence-first, no hype. Every score needs a source or observation.
```

- [ ] **Step 2: Create `.claude/skills/187repo-eval/references/RUBRIC.md`**

Expand each rubric category with sub-questions and evidence sources (e.g., `LICENSE`, `package.json`, `SECURITY.md`, commit graph, issues, CVE databases, bundlephobia, npm audit, GitHub dependency graph).

- [ ] **Step 3: Create `.claude/skills/187repo-eval/templates/scorecard.md`**

Markdown template with YAML frontmatter (`repo`, `eval_date`, `score`, `recommendation`) and sections matching the required output format.

- [ ] **Step 4: Verify 187repo-eval files exist**

```bash
ls -la .claude/skills/187repo-eval/
ls -la .claude/skills/187repo-eval/references/
ls -la .claude/skills/187repo-eval/templates/
```

Expected: `SKILL.md`, `references/RUBRIC.md`, `templates/scorecard.md` all present.

---

### Task 3: Create 187free project skill

**Files:**
- Create: `.claude/skills/187free/SKILL.md`
- Create: `.claude/skills/187free/references/187FREE-Tool-Index.md`
- Create: `.claude/skills/187free/references/187FREE-Decision-Matrix.md`
- Create: `.claude/skills/187free/references/187FREE-Free-Stack-Recipes.md`
- Create: `.claude/skills/187free/references/187FREE-Skill-Ideas.md`
- Create: `.claude/skills/187free/references/187FREE-Source-Policy.md`
- Create: `.claude/skills/187free/references/187FREE-Gotcha-Ledger.md`
- Create: `.claude/skills/187free/references/187FREE-Privacy-Checklist.md`
- Create: `.claude/skills/187free/templates/187free-stack-recipe.md`
- Create: `.claude/skills/187free/templates/187free-tool-review.md`
- Create: `.claude/skills/187free/templates/187free-service-comparison.md`
- Create: `.claude/skills/187free/templates/187free-public-api-note.md`
- Create: `.claude/skills/187free/templates/187free-gotcha-report.md`
- Create: `.claude/skills/187free/templates/187free-launch-checklist.md`

- [ ] **Step 1: Create `.claude/skills/187free/SKILL.md`**

Use the source prompt's Phase B content, including:
- Core definition
- Primary source (free-for.dev)
- Scoring model
- Trigger phrases and automatic contexts
- Required output format
- Gotcha checks
- Privacy-first rules for sensitive domains

- [ ] **Step 2: Create reference docs**

Derive each reference from the source prompt's Phase B "Files" and "At least 10 free skill ideas" sections:
- `187FREE-Tool-Index.md` — categorized free tool/source families with examples
- `187FREE-Decision-Matrix.md` — decision tree / scoring weights
- `187FREE-Free-Stack-Recipes.md` — ready-made free stacks for common needs
- `187FREE-Skill-Ideas.md` — ≥ 20 skill concepts (Free Launch Architect, Free Fullstack MVP Builder, etc.)
- `187FREE-Source-Policy.md` — what counts as a valid free source
- `187FREE-Gotcha-Ledger.md` — common free-tier traps
- `187FREE-Privacy-Checklist.md` — privacy-first checks

- [ ] **Step 3: Create templates**

Create each template with YAML frontmatter and section prompts matching the required output format and skill ideas.

- [ ] **Step 4: Verify 187free skill structure**

```bash
find .claude/skills/187free -type f | sort
```

Expected: 14 files (1 SKILL.md + 7 references + 6 templates).

---

### Task 4: Create 187research project skill

**Files:**
- Create: `.claude/skills/187research/SKILL.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Source-Index.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Lab-Architecture.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Database-Router.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Evidence-Ladder.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Reproducibility-Standard.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Citation-Standard.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Public-Claim-Standard.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Lab-Feature-Backlog.md`
- Create: `.claude/skills/187research/references/187RESEARCH-Integration-Map.md`
- Create: `.claude/skills/187research/templates/187research-question.md`
- Create: `.claude/skills/187research/templates/187research-source-note.md`
- Create: `.claude/skills/187research/templates/187research-literature-review.md`
- Create: `.claude/skills/187research/templates/187research-database-query.md`
- Create: `.claude/skills/187research/templates/187research-computational-lab.md`
- Create: `.claude/skills/187research/templates/187research-dataset-card.md`
- Create: `.claude/skills/187research/templates/187research-method-card.md`
- Create: `.claude/skills/187research/templates/187research-claim-audit.md`
- Create: `.claude/skills/187research/templates/187research-reproducibility-report.md`
- Create: `.claude/skills/187research/templates/187research-publication-brief.md`
- Create: `.claude/skills/187research/templates/187research-lab-demo-spec.md`
- Create: `.claude/skills/187research/templates/187research-citation-map.md`

- [ ] **Step 1: Create `.claude/skills/187research/SKILL.md`**

Use the source prompt's Phase C content, including:
- Core definition and capabilities
- Trigger phrases and automatic contexts
- Required output format
- Claim ladder
- Research artifact ladder
- 187FREE integration note

- [ ] **Step 2: Create reference docs**

Derive each reference from the source prompt's Phase C and D:
- `187RESEARCH-Source-Index.md` — source families
- `187RESEARCH-Lab-Architecture.md` — lab shell and module architecture
- `187RESEARCH-Database-Router.md` — scholarly, biomedical, math, software, dataset routes
- `187RESEARCH-Evidence-Ladder.md` — claim classification
- `187RESEARCH-Reproducibility-Standard.md` — FAIR, versioned datasets, provenance
- `187RESEARCH-Citation-Standard.md` — DOI/PMID/arXiv/Crossref/OpenAlex lookup conventions
- `187RESEARCH-Public-Claim-Standard.md` — public-claim risk review
- `187RESEARCH-Lab-Feature-Backlog.md` — A–J lab modules
- `187RESEARCH-Integration-Map.md` — how 187RESEARCH connects to 187FREE, Obsidian, Claudian, etc.

- [ ] **Step 3: Create templates**

Create each template with YAML frontmatter and section prompts matching the research artifact ladder.

- [ ] **Step 4: Verify 187research skill structure**

```bash
find .claude/skills/187research -type f | sort
```

Expected: 22 files (1 SKILL.md + 9 references + 12 templates).

---

### Task 5: Create vault pack

**Files:** all files under `docs/187suite-vault/`

- [ ] **Step 1: Create `_system/` docs**

For each 187FREE and 187RESEARCH system doc in the design, create a vault-style markdown file under `docs/187suite-vault/_system/`. Content mirrors the project reference docs but uses Obsidian conventions: YAML frontmatter, tags, wiki-link placeholders, and dashboard Dataview/Bases-style query blocks.

- [ ] **Step 2: Create `_templates/` docs**

Copy the project skill templates into `docs/187suite-vault/_templates/` and add Obsidian-specific frontmatter (`tags`, `type`, `skill`).

- [ ] **Step 3: Create integration glue docs**

- `docs/187suite-vault/_system/187SKILLS Integration Map.md` — Phase D from source prompt
- `docs/187suite-vault/_system/187SKILLS Routing Rules.md` — Phase E from source prompt

- [ ] **Step 4: Verify vault pack structure**

```bash
find docs/187suite-vault -type f | sort
```

Expected: 40+ files across `_system/` and `_templates/`.

---

### Task 6: Update project docs

**Files:**
- Modify: `AGENTS.md`
- Modify: `187web Skills Architecture Plan.md`

- [ ] **Step 1: Add new skills to `AGENTS.md` active skill suite table**

Insert rows for:
- `187repo-eval` — repo evaluation scorecard
- `187free` — no-cost solution engine
- `187research` — research-grade lab engine

- [ ] **Step 2: Mention new skills in `187web Skills Architecture Plan.md`**

Add a short section or update the integration matrix to include 187repo-eval, 187free, and 187research.

---

### Task 7: Mirror skills to model adapters

**Files:** generated files under `.grok/`, `.gemini/`, `.kimi/`, `.ollama/`, `.herme/`

- [ ] **Step 1: Run adapter generator**

```bash
python scripts/generate-model-adapters.py
```

Expected: script exits 0 and creates corresponding skill folders for the new skills in each adapter directory.

- [ ] **Step 2: Verify mirrored skills**

```bash
ls -la .grok/skills/187repo-eval .grok/skills/187free .grok/skills/187research
ls -la .gemini/skills/187repo-eval .gemini/skills/187free .gemini/skills/187research
ls -la .kimi/skills/187repo-eval .kimi/skills/187free .kimi/skills/187research
ls -la .ollama/modelfiles/187repo-eval .ollama/modelfiles/187free .ollama/modelfiles/187research
ls -la .herme/agents/187repo-eval .herme/agents/187free .herme/agents/187research
```

Expected: each adapter directory contains the three new skills.

---

### Task 8: Verify project health

**Files:** none (verification commands)

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: exits 0 (new markdown files should not affect lint).

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

Expected: many new files staged or untracked under `.claude/skills/`, `docs/187suite-vault/`, and adapter directories.

---

### Task 9: Commit

**Files:** all new and modified files

- [ ] **Step 1: Stage new project skills and vault pack**

```bash
git add .claude/skills/187repo-eval .claude/skills/187free .claude/skills/187research
git add docs/187suite-vault
git add docs/superpowers/specs docs/superpowers/plans
git add AGENTS.md "187web Skills Architecture Plan.md"
```

- [ ] **Step 2: Stage generated adapters**

```bash
git add .grok/skills/187repo-eval .grok/skills/187free .grok/skills/187research || true
git add .gemini/skills/187repo-eval .gemini/skills/187free .gemini/skills/187research || true
git add .kimi/skills/187repo-eval .kimi/skills/187free .kimi/skills/187research || true
git add .ollama/modelfiles/187repo-eval .ollama/modelfiles/187free .ollama/modelfiles/187research || true
git add .herme/agents/187repo-eval .herme/agents/187free .herme/agents/187research || true
```

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(skills): add 187repo-eval, 187free, and 187research skills with vault pack

- Add repo evaluation scorecard skill (187repo-eval)
- Add no-cost solution engine skill (187free) with references and templates
- Add research-grade lab engine skill (187research) with database router, evidence ladder, and templates
- Add portable Obsidian vault pack under docs/187suite-vault/
- Mirror new skills to .grok, .gemini, .kimi, .ollama, and .herme adapters
- Update AGENTS.md and 187web Skills Architecture Plan.md"
```

- [ ] **Step 4: Push branch**

```bash
git push -u origin feat/187free-187research-repo-eval
```

Expected: branch pushed to origin.

---

## Spec coverage self-check

| Spec requirement | Plan task |
|---|---|
| Repo evaluation system with scorecard | Task 2 |
| 187FREE first-class skill | Task 3 |
| 187RESEARCH first-class skill | Task 4 |
| Full vault pack in Obsidian layout | Task 5 |
| Integration map and routing rules | Task 5 |
| Project docs updated | Task 6 |
| Model adapters mirrored | Task 7 |
| Build/test verification | Task 8 |

## Placeholder scan

No `TBD`, `TODO`, or "implement later" strings. Reference docs and templates are generated from the approved source prompt; implementers must copy the relevant sections rather than invent placeholders.
