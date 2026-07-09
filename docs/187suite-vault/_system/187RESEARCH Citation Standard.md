---
title: 187RESEARCH Citation Standard
description: Citation and source lineage rules for 187RESEARCH artifacts.
tags: ["187research", "citation", "standard", "reference"]
skill: 187research
---

# 187RESEARCH Citation Standard

## Required citation fields

Every source in a 187RESEARCH artifact should record:

- **Author(s)** or organization
- **Title**
- **Year**
- **Source route** (database, API, publisher, repository)
- **Identifier** (DOI, PMID, arXiv ID, URL, accession, etc.)
- **Date accessed**
- **Claim(s) supported**
- **Evidence ladder rung** for each supported claim

## Identifier preference

Use persistent identifiers in this order of preference:

1. DOI
2. PMID / PMCID
3. arXiv ID
4. OpenAlex ID / Semantic Scholar ID
5. Official accession numbers (UniProt, PDB, OEIS A-number, etc.)
6. Stable URL
7. Retrieved query and date (last resort)

## Citation formats

- Use a consistent citation style within each artifact.
- For academic papers, prefer APA, MLA, Chicago, or the target venue's style.
- For technical reports and specs, use numbered references linked to a bibliography.
- For dashboards and notes, use compact citation cards with identifier badges.

## Source lineage

For every claim, document:

1. Original source of the fact/measurement/proof.
2. Any intermediate sources that repeated or interpreted it.
3. Whether the claim is direct, inherited, or interpreted.
4. Any retraction, errata, correction, or conflicting source.

## Retraction and errata checks

- Check Crossref, PubMed, Retraction Watch, or publisher notices when available.
- Flag preprints as preprints until peer-reviewed.
- Flag sources with known conflicts of interest or funding bias when relevant.

## API and dataset citations

When citing data retrieved from an API:

- Cite the API endpoint or route.
- Record the exact query or parameters.
- Record the date and time of access.
- Record the number and identifiers of returned records.
- Note any filter, pagination, or transformation applied.

## Avoid

- Citing only a URL with no author, title, or date.
- Citing inaccessible or ephemeral sources for core claims.
- Citing Wikipedia, random blogs, or unverified social media for scientific claims.
- Presenting inherited claims as measured or proved.
