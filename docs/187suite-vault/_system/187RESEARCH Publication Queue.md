---
title: 187RESEARCH Publication Queue
description: Dashboard for publication briefs, paper drafts, and public research pages.
tags: ["187research", "publication", "dashboard", "queue"]
skill: 187research
---

# 187RESEARCH Publication Queue

Track publication briefs, paper drafts, public research pages, and launch/demo pages.

## Active publications

```dataview
TABLE file.mtime as Updated, target-venue as "Target Venue", public-claim-risk as "Public-Claim Risk", status as Status
FROM ""
WHERE skill = "187research" AND (type = "publication-brief" OR type = "paper-draft" OR type = "public-research-page" OR type = "launch-demo-page")
SORT file.mtime DESC
```

> Replace with Bases view or manual MOC links if Dataview is unavailable.

## Publication templates

- [[187research-publication-brief]]
- [[187RESEARCH Public Claim Standard]]
- [[187RESEARCH Citation Standard]]

## Pre-publication gate

- [ ] Claim audit complete
- [ ] Citation review complete
- [ ] Disclosure-risk check complete
- [ ] Accessibility review complete
- [ ] 187FREE deployment plan complete
- [ ] Privacy review complete
- [ ] Domain review complete (medical/legal/civic/disability/invention)

## Quick links

- [[187RESEARCH Public Claim Standard]]
- [[187RESEARCH Citation Standard]]
- [[187FREE Free Stack Recipes]]
