---
title: 187RESEARCH Lab Dashboard
description: Dashboard for computational labs, interactive demos, and lab demo specs.
tags: ["187research", "lab", "dashboard"]
skill: 187research
---

# 187RESEARCH Lab Dashboard

Track computational labs, interactive demos, and lab demo specs.

## Active labs

```dataview
TABLE file.mtime as Updated, demo-type as "Demo Type", public-claim-risk as "Public-Claim Risk"
FROM ""
WHERE skill = "187research" AND (type = "computational-lab" OR type = "lab-demo-spec" OR type = "interactive-lab")
SORT file.mtime DESC
```

> Replace with Bases view or manual MOC links if Dataview is unavailable.

## Lab templates

- [[187research-computational-lab]]
- [[187research-lab-demo-spec]]
- [[187research-method-card]]

## Lab feature backlog

- [[187RESEARCH Lab Feature Backlog]]
- [[187RESEARCH Lab Architecture]]
- [[187RESEARCH Reproducibility Standard]]

## Quick links

- [[187RESEARCH Database Router]]
- [[187RESEARCH Citation Standard]]
- [[187RESEARCH Public Claim Standard]]
- [[187FREE Free Stack Recipes]]
