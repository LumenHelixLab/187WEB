---
title: 187RESEARCH Source Index
description: Primary and secondary source families used by 187RESEARCH.
tags: ["187research", "source-index", "reference", "databases"]
skill: 187research
---

# 187RESEARCH Source Index

## Primary scholarly sources

| Source | Use | Identifier types |
|---|---|---|
| arXiv | Open preprints in math, physics, CS, statistics, quantitative biology, quantitative finance, economics | arXiv ID |
| Crossref | DOI and publication metadata | DOI |
| OpenAlex | Works, authors, institutions, sources, topics, concepts | OpenAlex ID, DOI, PMID |
| Semantic Scholar | Papers, authors, citations, recommendations, datasets | S2 ID, DOI |
| Europe PMC | Biomedical publications and related information | PMCID, PMID |

## Primary biomedical sources

| Source | Use | Identifier types |
|---|---|---|
| NCBI E-utilities | PubMed, PMC, Gene, Nuccore, Protein, and other Entrez databases | PMID, PMCID, GI, accession |
| PubChem PUG-REST | Chemical, substance, and compound data | CID, SID, InChIKey |
| UniProt REST APIs | Protein sequence and function data | UniProt accession, entry name |
| RCSB PDB APIs | Experimental macromolecular structures and metadata | PDB ID |
| AlphaFold DB | Predicted protein structures | UniProt accession |
| ClinicalTrials.gov | Clinical trial records | NCT ID |
| FDA / WHO / CDC | Regulatory and public-health references | Varies |

## Primary mathematical sources

| Source | Use | Identifier types |
|---|---|---|
| arXiv math categories | Preprints and recent results | arXiv ID |
| OEIS JSON | Integer sequence search | A-number |
| LMFDB | L-functions, modular forms, elliptic curves, number theory | LMFDB label |
| NIST DLMF | Special functions and applied mathematical formulas | DLMF ID, equation number |
| zbMATH / Open | Bibliographic metadata for mathematics | zbMATH ID |
| MathWorld | Human-readable reference only | URL |

## Primary software and code sources

| Source | Use | Identifier types |
|---|---|---|
| GitHub REST / GraphQL | Repos, issues, PRs, code/project metadata | `owner/repo`, node ID |
| npm Registry | JavaScript package metadata | package name, version |
| PyPI JSON API | Python package metadata | package name, version |
| Libraries.io | Open-source package discovery and maintenance metadata | platform/name |
| crates.io | Rust package metadata | crate name, version |
| Docker Hub | Container image metadata | image:tag |
| GitLab | Repositories, issues, merge requests | project path |
| Stack Overflow | Q&A and implementation patterns | question ID |

## Primary public and open datasets

| Source | Use | Identifier types |
|---|---|---|
| Data.gov | U.S. government open data | dataset ID |
| NASA open data | Space, Earth science, and related datasets | dataset ID |
| World Bank API | Global development indicators | indicator code, country code |
| Wikidata SPARQL | Structured knowledge graph | QID, PID |
| OpenStreetMap / Overpass | Geographic data and queries | OSM ID |
| Zenodo | Research software and datasets | DOI, record ID |
| Figshare | Research outputs and datasets | DOI, article ID |
| Kaggle public datasets | Curated public datasets | dataset slug |
| Hugging Face datasets | ML datasets and benchmarks | dataset name |
| NIH / NCBI dataset sources | Biomedical datasets and archives | accession, project ID |
| OpenAIRE / DataCite | Research outputs and data citations | DOI, OpenAIRE ID |

## Source discipline rules

- Prefer official APIs and official docs.
- Do not scrape when an API exists.
- Respect rate limits and terms of service.
- Keep API keys out of notes and templates.
- Cite source route, query, date accessed, and returned identifiers.
- Flag paywalls, preprint status, and retractions explicitly.
