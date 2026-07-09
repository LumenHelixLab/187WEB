---
title: 187RESEARCH Literature Dashboard
description: Dashboard for literature reviews, source notes, and citation maps.
tags: ["187research", "literature", "dashboard"]
skill: 187research
---

# 187RESEARCH Literature Dashboard

Track source notes, literature reviews, citation maps, and annotated bibliographies.

## Active literature

```dataview
TABLE file.mtime as Updated, research-question as "Research Question"
FROM ""
WHERE skill = "187research" AND (type = "literature-review" OR type = "source-note" OR type = "citation-map" OR type = "annotated-bibliography")
SORT file.mtime DESC
```

> Replace with Bases view or manual MOC links if Dataview is unavailable.

## Source note MOC

- [[187research-source-note]]
- [[187research-literature-review]]
- [[187research-citation-map]]

## Citation health

- [ ] Pending source notes to classify
- [ ] Literature reviews needing synthesis
- [ ] Citation maps needing graph export
- [ ] Retraction/errata checks pending

## Quick links

- [[187RESEARCH Source Index]]
- [[187RESEARCH Citation Standard]]
- [[187RESEARCH Evidence Ladder]]
