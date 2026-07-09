---
title: 187RESEARCH Claims Dashboard
description: Dashboard for claim audits and public-claim risk tracking.
tags: ["187research", "claims", "dashboard"]
skill: 187research
---

# 187RESEARCH Claims Dashboard

Track claim audits, public-claim risk levels, and pending reviews.

## Active claim audits

```dataview
TABLE file.mtime as Updated, claim-rung as "Proposed Rung", public-claim-risk as "Public-Claim Risk"
FROM ""
WHERE skill = "187research" AND type = "claim-audit"
SORT file.mtime DESC
```

> Replace with Bases view or manual MOC links if Dataview is unavailable.

## Claim templates

- [[187research-claim-audit]]
- [[187RESEARCH Evidence Ladder]]
- [[187RESEARCH Public Claim Standard]]

## Evidence ladder summary

```dataview
TABLE length(rows) as Count
FROM ""
WHERE skill = "187research" AND claim-rung
GROUP BY claim-rung
```

## Quick links

- [[187RESEARCH Evidence Ladder]]
- [[187RESEARCH Public Claim Standard]]
- [[187RESEARCH Citation Standard]]
