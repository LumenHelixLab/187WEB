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

Use [`references/database-router.md`](references/database-router.md) for source selection, [`references/evidence-ladder.md`](references/evidence-ladder.md) for claim classification, and [`references/reproducibility-standard.md`](references/reproducibility-standard.md) for reproducibility checks.

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
- Cross-check claim classification against [`references/evidence-ladder.md`](references/evidence-ladder.md) and reproducibility against [`references/reproducibility-standard.md`](references/reproducibility-standard.md).
- Keep API keys out of notes.
- Prefer official APIs; do not scrape when an API exists.
- Cite source route, query, date accessed, and returned identifiers.

## Integration points

- **Obsidian/Claudian:** outputs use `templates/research-question.md`, `templates/literature-review.md`, `templates/computational-lab.md`, `templates/dataset-card.md`, `templates/claim-audit.md`.
- **Claude Code:** load `.claude/skills/187research/SKILL.md`.
- **CLI:** future `187repo.sh research` / `187research.sh`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/research-question.md`](templates/research-question.md) | Scoping a new research question and source route. |
| [`templates/literature-review.md`](templates/literature-review.md) | Synthesizing multiple sources into a review. |
| [`templates/computational-lab.md`](templates/computational-lab.md) | Building a reproducible lab notebook or experiment. |
| [`templates/dataset-card.md`](templates/dataset-card.md) | Documenting a dataset with FAIR metadata. |
| [`templates/claim-audit.md`](templates/claim-audit.md) | Auditing claims against the evidence ladder. |

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
