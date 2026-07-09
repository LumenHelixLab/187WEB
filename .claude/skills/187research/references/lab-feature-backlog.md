---
name: 187research/lab-feature-backlog
description: Backlog of modules and capabilities for 187RESEARCH labs.
origin: portfolio
---

# Lab Feature Backlog

Track current, planned, and future capabilities for 187RESEARCH labs. Use this as a checklist when scoping a new lab.

## Lab shell

| Feature | Status | Notes |
|---------|--------|-------|
| Notebook template (Jupyter / Quarto / Observable) | planned | Standardized header, cells, and outputs. |
| Container definition (Docker / devcontainer) | planned | Reproducible environment across machines. |
| `requirements.txt` / lockfile generation | planned | Pinned dependencies per lab. |
| CLI runner (`187research run`) | future | One-command execution and validation. |
| Lab dashboard in Obsidian / web | future | Central view of active labs and status. |

## Computation

| Feature | Status | Notes |
|---------|--------|-------|
| Deterministic seed management | planned | Central seed config and reporting. |
| Parameter sweep helpers | planned | Grid and random search with logging. |
| Checkpoint and resume | future | Long-running experiment support. |
| Distributed experiment tracking | future | Integration with lightweight trackers. |

## Visualization

| Feature | Status | Notes |
|---------|--------|-------|
| Static figure pipeline (matplotlib / plotly) | planned | Publication-ready, script-generated. |
| Interactive web visualizations | future | Observable / D3 / React components. |
| 3D geometry / lattice viewers | future | Three.js / manim / specialized renderers. |
| Animation / video export | future | For demos and publications. |

## Evidence

| Feature | Status | Notes |
|---------|--------|-------|
| Evidence-ladder auto-labeling | planned | Prompt/template integration. |
| Claim audit worksheet | planned | `templates/claim-audit.md`. |
| Citation lineage tracking | planned | Source-route + date accessed. |
| Public-claim risk review | planned | Checklist before release. |

## Math

| Feature | Status | Notes |
|---------|--------|-------|
| Symbolic computation helpers (SymPy / Sage) | planned | Algebra, calculus, number theory. |
| OEIS / LMFDB lookup integration | future | Query wrappers and result cards. |
| Proof sketch formatting | future | Structured proof templates. |
| LaTeX export for papers | future | From lab notebook to arXiv-ready. |

## Biomedical

| Feature | Status | Notes |
|---------|--------|-------|
| PubMed / Europe PMC query helpers | planned | Search builder and result parser. |
| Clinical trial lookup | future | ClinicalTrials.gov integration. |
| Protein structure fetch (PDB / AlphaFold) | future | Download and basic visualization. |
| Consent-first health tooling checklist | planned | Privacy and IRB considerations. |

## Software

| Feature | Status | Notes |
|---------|--------|-------|
| Repository analysis template | planned | Stars, license, dependencies, health. |
| Package metadata fetch | future | PyPI / npm / CRAN wrappers. |
| Supply-chain risk scan | future | Deps.dev / OSV integration. |
| Code provenance tracking | future | Link results to commits and tags. |

## Publication

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown → PDF / DOCX export | planned | Pandoc-based pipeline. |
| arXiv submission prep | future | LaTeX packaging and validation. |
| Dataset DOI reservation | future | Zenodo / Figshare workflow. |
| Citation style auto-formatting | future | CSL / Zotero integration. |

## Standards and guardrails

| Feature | Status | Notes |
|---------|--------|-------|
| FAIR metadata checklist | planned | Integrated into dataset-card template. |
| Privacy / consent review | planned | Required for health and human data. |
| API key hygiene linter | future | Prevent accidental commits. |
| Open-source license recommender | future | Suggest license based on artifact type. |

## Lumen Helix modules

| Feature | Status | Notes |
|---------|--------|-------|
| 187FREE stack integration | planned | Free hosting and tooling routing. |
| 187CRAFT demo integration | future | Research output → polished UI demo. |
| 187LAUNCH release checklist | future | Research artifact → public launch. |
| Claudian / Obsidian vault sync | planned | Note templates and dashboard. |
