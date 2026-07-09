---
title: 187RESEARCH Database Router
description: Source route rules for scholarly, biomedical, mathematical, software, and public/open dataset queries.
skill: 187research
---

# 187RESEARCH Database Router

Use this router to choose the best source route for a given research question.

## Scholarly metadata and citation discovery

| Route | Best for | Example queries |
|---|---|---|
| **arXiv** | Open preprints in math, physics, CS, statistics, quantitative biology, quantitative finance, economics | `au:Witten_E AND hep-th`, `all:large language model training` |
| **Crossref** | DOI resolution and publication metadata | DOI lookup, journal ISSN queries, funder metadata |
| **OpenAlex** | Works, authors, institutions, sources, topics, concepts | `works?search=adhd assistive technology`, author disambiguation |
| **Semantic Scholar** | Paper discovery, citation graphs, recommendations, datasets | S2 ID lookup, `paper/search?query=` |
| **Europe PMC** | Biomedical publications and related information | PMID/PMCID search, grant-aware literature search |

## Biomedical and biological

| Route | Best for | Example queries |
|---|---|---|
| **NCBI E-utilities** | PubMed, PMC, Gene, Nuccore, Protein, and other Entrez databases | `esearch.fcgi?db=pubmed&term=autism+genetics` |
| **PubChem PUG-REST** | Chemical, substance, and compound data | `compound/name/aspirin/property/IsomericSMILES/JSON` |
| **UniProt REST APIs** | Protein sequence and function data | `uniprotkb/search?query=insulin` |
| **RCSB PDB APIs** | Experimental structures and metadata | `graphql` for PDB entry, ligand, assembly data |
| **AlphaFold DB** | Predicted protein structures | `api/prediction/UNIPROT_ACCESSION` |
| **ClinicalTrials.gov** | Clinical trial records | `studies?query.term=autism+intervention` |
| **FDA / WHO / CDC** | Regulatory and public-health references | Drug approvals, outbreak reports, guidelines |

## Mathematics

| Route | Best for | Example queries |
|---|---|---|
| **arXiv math** | Preprints and recent results | `math.NT`, `math.CO`, `cs.DS` |
| **OEIS JSON** | Integer sequence search | `search?fmt=json&q=1,1,2,3,5,8` |
| **LMFDB** | L-functions, modular forms, elliptic curves, number theory | `/EllipticCurve/Q/?conductor=1-99` |
| **NIST DLMF** | Special functions and applied mathematical formulas | Chapter/section lookup for Bessel, hypergeometric |
| **zbMATH / Open** | Bibliographic metadata for mathematics | Author/title/classification search |
| **MathWorld** | Human-readable reference only | Use only when copyright and robot terms allow |

## Software and code

| Route | Best for | Example queries |
|---|---|---|
| **GitHub REST / GraphQL** | Repos, issues, PRs, code/project metadata | `/search/repositories?q=topic:accessibility` |
| **npm Registry** | JavaScript package metadata | `registry.npmjs.org/package-name` |
| **PyPI JSON API** | Python package metadata | `pypi.org/pypi/package-name/json` |
| **Libraries.io** | Open-source package discovery and maintenance metadata | `/api/platforms/npm/libraries` |
| **crates.io** | Rust package metadata | `/api/v1/crates/serde` |
| **Docker Hub** | Container image metadata | `/v2/repositories/library/python/tags` |
| **GitLab** | Repositories, issues, merge requests | `/api/v4/projects?search=accessibility` |
| **Stack Overflow** | Q&A and implementation patterns | Tagged search for libraries and patterns |

## Public and open datasets

| Route | Best for | Example queries |
|---|---|---|
| **Data.gov** | U.S. government open data | CKAN package search |
| **NASA open data** | Space, Earth science, and related datasets | `/search?q=exoplanet` |
| **World Bank API** | Global development indicators | `/country/all/indicator/SP.POP.TOTL` |
| **Wikidata SPARQL** | Structured knowledge graph | Wikidata Query Service endpoint |
| **OpenStreetMap / Overpass** | Geographic data and queries | Overpass QL for features |
| **Zenodo** | Research software and datasets | `/api/records/?q=assistive+technology` |
| **Figshare** | Research outputs and datasets | `/articles?search=adhd` |
| **Kaggle public datasets** | Curated public datasets | Kaggle dataset search |
| **Hugging Face datasets** | ML datasets and benchmarks | `/datasets?search=medical+qa` |
| **NIH / NCBI dataset sources** | Biomedical datasets and archives | dbGaP, SRA, GEO queries |
| **OpenAIRE / DataCite** | Research outputs and data citations | `/search/publications` or DataCite REST |

## Routing rules

- Prefer official APIs and official docs.
- Do not scrape when an API exists.
- Respect rate limits and terms.
- Keep API keys out of notes.
- Cite source route, query, date accessed, and returned identifiers.
- For medical/clinical/health content, do not provide diagnosis or treatment guidance. Create evidence summaries and require human/professional review.
