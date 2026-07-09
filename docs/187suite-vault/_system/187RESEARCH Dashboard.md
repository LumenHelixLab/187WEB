---
title: 187RESEARCH Dashboard
description: Master map-of-content dashboard for the 187RESEARCH skill.
tags: ["187research", "dashboard", "moc"]
skill: 187research
---

# 187RESEARCH Dashboard

Master map of content and daily entry point for 187RESEARCH.

## Core system files

- [[187RESEARCH]]
- [[187RESEARCH Source Index]]
- [[187RESEARCH Lab Architecture]]
- [[187RESEARCH Database Router]]
- [[187RESEARCH Evidence Ladder]]
- [[187RESEARCH Reproducibility Standard]]
- [[187RESEARCH Citation Standard]]
- [[187RESEARCH Public Claim Standard]]
- [[187RESEARCH Lab Feature Backlog]]
- [[187RESEARCH Integration Map]]

## Specialized dashboards

- [[187RESEARCH Literature Dashboard]]
- [[187RESEARCH Database Dashboard]]
- [[187RESEARCH Lab Dashboard]]
- [[187RESEARCH Claims Dashboard]]
- [[187RESEARCH Reproducibility Dashboard]]
- [[187RESEARCH Publication Queue]]

## 187RESEARCH templates

```dataview
TABLE file.mtime as Updated, description as Description
FROM "_templates"
WHERE skill = "187research"
SORT file.name ASC
```

> If Dataview is not installed, use the MOC links below.

- [[187research-question]]
- [[187research-source-note]]
- [[187research-literature-review]]
- [[187research-database-query]]
- [[187research-computational-lab]]
- [[187research-dataset-card]]
- [[187research-method-card]]
- [[187research-claim-audit]]
- [[187research-reproducibility-report]]
- [[187research-publication-brief]]
- [[187research-lab-demo-spec]]
- [[187research-citation-map]]

## Active research notes

```dataview
TABLE file.mtime as Updated, tags
FROM ""
WHERE skill = "187research" AND file.folder != "_system" AND file.folder != "_templates"
SORT file.mtime DESC
LIMIT 25
```

> Replace the query above with a Bases view if you use the Bases plugin.

## Quick actions

- [ ] New research question
- [ ] New source note
- [ ] New literature review
- [ ] New database query
- [ ] New lab demo spec
- [ ] New claim audit
- [ ] New reproducibility report
- [ ] New publication brief
