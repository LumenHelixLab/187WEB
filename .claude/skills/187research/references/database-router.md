---
name: 187research/database-router
description: Scholarly, biomedical, mathematical, software, and public-data source routes for research-grade queries.
origin: portfolio
---

# Database Router

Route every research question through the most authoritative, queryable source available. Prefer official APIs, stable identifiers, and source-route transparency. Do not scrape when an API exists.

## Scholarly / General

| Source | Best for | Query types | Notes |
|--------|----------|-------------|-------|
| **PubMed / NCBI E-utilities** | Biomedical literature, MeSH terms | PMID, author, journal, keyword, date range | Use E-utilities; respect rate limits. |
| **Europe PMC** | Open-access biomedical, preprints, grants | Search, citation, content mine | Strong for OA full-text linkage. |
| **arXiv API** | Physics, math, CS, quantitative biology | ID, author, title, abstract, category | OAI-PMH and query API available. |
| **Crossref REST API** | DOI metadata, journal articles, books | DOI, ISSN, title, funder, type | Great for citation counts and metadata. |
| **OpenAlex** | Open scholarly graph, institutions, concepts | Works, authors, sources, topics | Free, open API; good for trend analysis. |
| **Semantic Scholar** | AI/ML literature, citation intents, TLDRs | Paper search, author search, recommendations | Rate-limited API; useful for AI papers. |
| **Google Scholar** | Broad discovery | Author, keyword, citation | No official API; use only as a discovery fallback. |

### When to prefer one over another

- Biomedical claim + need peer review → PubMed/Europe PMC.
- Open access full text required → Europe PMC, PubMed Central.
- Math/CS/physics preprint → arXiv first, then Crossref for published version.
- Citation graph / interdisciplinary trends → OpenAlex.
- AI/ML paper with TLDR → Semantic Scholar.

## Biomedical / Clinical

| Source | Best for | Query types | Notes |
|--------|----------|-------------|-------|
| **PubMed / MeSH** | Clinical evidence, systematic reviews | Condition, intervention, population | Use MeSH terms for precision. |
| **PubMed Central (PMC)** | Full-text OA biomedical articles | PMCID, keyword, author | Text-mining resources available. |
| **ClinicalTrials.gov** | Trial registrations, status, results | NCT ID, condition, intervention, sponsor | Official API available. |
| **PubChem** | Chemical structures, bioactivity | CID, name, SMILES, InChI | PUG-REST API. |
| **UniProt** | Protein sequences, functions, annotations | Accession, gene, organism | SPARQL and REST APIs. |
| **RCSB PDB** | Macromolecular structures | PDB ID, ligand, organism, method | Search API and data files. |
| **AlphaFold DB** | Predicted protein structures | UniProt accession | EBI API; structure downloads. |
| **DrugBank** | Drug information, interactions | Drug name, CAS, UNII | Commercial licensing for full data. |
| **GWAS Catalog** | Genotype-phenotype associations | Trait, variant, study accession | EBI API. |

### When to prefer one over another

- Need protein structure → experiment: RCSB PDB; predicted: AlphaFold DB.
- Chemical compound ID or bioassay → PubChem.
- Clinical evidence for treatment → PubMed + ClinicalTrials.gov.
- Variant-trait association → GWAS Catalog.

## Mathematical

| Source | Best for | Query types | Notes |
|--------|----------|-------------|-------|
| **OEIS** | Integer sequences, formulas, references | Sequence, keyword, ID | Classic reference; search by terms. |
| **LMFDB** | L-functions, modular forms, number fields | Label, conductor, polynomial | JSON API and downloads. |
| **DLMF** | Special functions, asymptotics, formulas | Function name, equation | NIST Digital Library of Mathematical Functions. |
| **arXiv math** | Preprints across math subfields | Category, keyword, author | Use arXiv API. |
| **MathOverflow / StackExchange** | Discussion, references, heuristics | Tag, keyword | Not primary sources; use for pointers. |
| ** zbMATH Open** | Mathematical reviews, classifications | MSC, author, title | Open reviews and abstracts. |

### When to prefer one over another

- Exact integer sequence → OEIS.
- Object with known label/identifier → LMFDB.
- Special function formula → DLMF.
- Proof/conjecture source → arXiv math → zbMATH/published journal.

## Software / Code / Repositories

| Source | Best for | Query types | Notes |
|--------|----------|-------------|-------|
| **GitHub Search API** | Repositories, code, issues, users | Language, topic, stars, license | Rate limits apply. |
| **GitLab API** | Repositories, groups, snippets | Project path, topic | Instance-specific endpoints. |
| **PyPI JSON API** | Python package metadata | Package name, version | Simple JSON endpoints. |
| **npm Registry** | Node.js package metadata | Package name, version | Registry API. |
| **CRAN / Bioconductor** | R packages | Package name, task view | Use official repositories. |
| **Sourcegraph** | Cross-repo code search | Query language | Useful for large-scale analysis. |
| **Libraries.io** | Dependency trees, package health | Platform, name | API available. |
| **Open Source Insights (Deps.dev)** | Supply-chain/security analysis | Package, version | Google API. |

### When to prefer one over another

- Package version/metadata → language registry (PyPI/npm/CRAN).
- Security/supply chain → Deps.dev.
- Reusable implementation → GitHub search with license filter.
- Dependency health → Libraries.io + registry metadata.

## Public Data / Government / Social Science

| Source | Best for | Query types | Notes |
|--------|----------|-------------|-------|
| **Data.gov / CKAN APIs** | US government datasets | Tag, organization, format | Portal-specific endpoints. |
| **World Bank Open Data** | Global development indicators | Country, indicator, year | REST and bulk download. |
| **UN Data** | International statistics | Topic, source | Portal search. |
| **Kaggle Datasets** | ML-ready datasets, notebooks | Keyword, file type | Requires account for downloads. |
| **Hugging Face Datasets** | ML datasets, tasks | Name, task, language | `datasets` library integration. |
| **Zenodo** | Research data, software, preprints | DOI, community, keyword | Open repository with API. |
| **Figshare** | Research outputs | DOI, keyword | Academic data repository. |
| **Dryad** | Curated research data | DOI, keyword | Domain-agnostic data publishing. |

### When to prefer one over another

- Social/economic indicator → World Bank / UN Data.
- ML training data → Hugging Face Datasets.
- Research artifact with DOI → Zenodo, Figshare, or Dryad.
- Government open data → Data.gov or national CKAN portals.

## Query plan template

For each research question, produce:

1. **Primary domain** (scholarly, biomedical, math, software, public data).
2. **Top 2–4 sources** with justification.
3. **Exact query string(s)** for each source.
4. **Expected identifiers** (PMID, DOI, arXiv ID, PDB ID, sequence ID, etc.).
5. **Fallback sources** if primary sources return no results.
6. **Date accessed** and **source route** for every result cited.
