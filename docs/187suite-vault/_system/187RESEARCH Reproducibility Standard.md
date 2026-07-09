---
title: 187RESEARCH Reproducibility Standard
description: Minimum requirements for reproducible research artifacts.
tags: ["187research", "reproducibility", "standard", "reference"]
skill: 187research
---

# 187RESEARCH Reproducibility Standard

## Minimum reproducibility checklist

- [ ] Research question is stated in one sentence.
- [ ] Data sources are named with identifiers and access dates.
- [ ] Raw data, processed data, and code are separated.
- [ ] Code is versioned and runnable without undocumented steps.
- [ ] Environment is specified (language version, OS, key dependencies).
- [ ] Dependencies are pinned or use a lockfile.
- [ ] Random processes use a deterministic seed.
- [ ] All figures and tables can be regenerated from code.
- [ ] All claims are mapped to sources in the evidence ladder.
- [ ] Limitations and assumptions are documented.
- [ ] A provenance log records transformations and decisions.
- [ ] Outputs are exported in open formats.

## Artifact-level standards

| Artifact | Reproducibility requirement |
|---|---|
| Source note | Permalink or stable identifier; date accessed; exact quote or data snapshot. |
| Literature review | Search strategy, inclusion/exclusion criteria, PRISMA-style flow if systematic. |
| Citation graph | Query and date; node/edge data export. |
| Dataset card | FAIR metadata, license, version, provenance, data dictionary. |
| Computational notebook | All cells runnable top-to-bottom; pinned environment; seed noted. |
| Interactive lab | Permalinked states; export JSON; environment and version logged. |
| Reproducibility report | Step-by-step protocol; environment; verification log; contact/DOI if published. |
| Public research page | Static snapshot or archived version; claim audit attached. |
| Paper draft | All citations resolvable; methods detailed enough to replicate. |
| Product spec | Research findings traced to requirement IDs. |

## Environment specification

Document at least:

- Operating system and version
- Programming language and version
- Package manager and lockfile
- Key library versions
- Hardware notes if performance-sensitive
- Cloud/regional settings if relevant

## Provenance log

For each transformation, record:

- What changed
- Why it changed
- Who or what made the change
- Timestamp
- Input and output identifiers

## Sharing and archiving

- Prefer open formats: CSV, JSON, Markdown, SVG, PNG, PDF/A.
- Archive code and data with a versioned release or DOI when possible.
- Include a `README` or `index.md` with run instructions.
- Avoid proprietary-only formats for primary research outputs.
