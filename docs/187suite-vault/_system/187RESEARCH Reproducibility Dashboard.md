---
title: 187RESEARCH Reproducibility Dashboard
description: Dashboard for reproducibility reports and environment tracking.
tags: ["187research", "reproducibility", "dashboard"]
skill: 187research
---

# 187RESEARCH Reproducibility Dashboard

Track reproducibility reports, environment specifications, and verification logs.

## Active reproducibility reports

```dataview
TABLE file.mtime as Updated, artifact as "Artifact Under Review", recommendation as Recommendation
FROM ""
WHERE skill = "187research" AND type = "reproducibility-report"
SORT file.mtime DESC
```

> Replace with Bases view or manual MOC links if Dataview is unavailable.

## Reproducibility templates

- [[187research-reproducibility-report]]
- [[187research-computational-lab]]
- [[187RESEARCH Reproducibility Standard]]

## Open checks

- [ ] Pending environment documentation
- [ ] Pending dependency pinning
- [ ] Pending seed setting for stochastic work
- [ ] Pending provenance logs
- [ ] Pending verification attempts

## Quick links

- [[187RESEARCH Reproducibility Standard]]
- [[187RESEARCH Lab Architecture]]
- [[187RESEARCH Citation Standard]]
