---
title: 187RESEARCH Database Dashboard
description: Dashboard for database queries, dataset cards, and source routes.
tags: ["187research", "database", "dashboard"]
skill: 187research
---

# 187RESEARCH Database Dashboard

Track database queries, dataset cards, and source-route experiments.

## Active database work

```dataview
TABLE file.mtime as Updated, domain as Domain, query-status as "Query Status"
FROM ""
WHERE skill = "187research" AND (type = "database-query" OR type = "dataset-card")
SORT file.mtime DESC
```

> Replace with Bases view or manual MOC links if Dataview is unavailable.

## Database templates

- [[187research-database-query]]
- [[187research-dataset-card]]

## Route quick reference

- Scholarly: arXiv, Crossref, OpenAlex, Semantic Scholar, Europe PMC
- Biomedical: NCBI E-utilities, PubChem, UniProt, RCSB PDB, AlphaFold DB, ClinicalTrials.gov
- Mathematics: arXiv math, OEIS, LMFDB, NIST DLMF, zbMATH/Open, MathWorld
- Software: GitHub, npm, PyPI, Libraries.io, crates.io, Docker Hub, GitLab, Stack Overflow
- Public data: Data.gov, NASA, World Bank, Wikidata, OpenStreetMap, Zenodo, Figshare, Kaggle, Hugging Face, OpenAIRE/DataCite

## Quick links

- [[187RESEARCH Database Router]]
- [[187RESEARCH Source Index]]
- [[187RESEARCH Citation Standard]]
