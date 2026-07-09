---
title: 187FREE Dashboard
description: Map-of-content and Dataview dashboard for the 187FREE skill.
tags: ["187free", "dashboard", "moc"]
skill: 187free
---

# 187FREE Dashboard

Map of content and daily entry point for 187FREE.

## Core system files

- [[187FREE]]
- [[187FREE Tool Index]]
- [[187FREE Decision Matrix]]
- [[187FREE Free Stack Recipes]]
- [[187FREE Skill Ideas]]
- [[187FREE Source Policy]]
- [[187FREE Gotcha Ledger]]
- [[187FREE Privacy Checklist]]

## 187FREE templates

```dataview
TABLE file.mtime as Updated, description as Description
FROM "_templates"
WHERE skill = "187free"
SORT file.name ASC
```

> If Dataview is not installed, use the following MOC links instead:

- [[187free-stack-recipe]]
- [[187free-tool-review]]
- [[187free-service-comparison]]
- [[187free-public-api-note]]
- [[187free-gotcha-report]]
- [[187free-launch-checklist]]

## Active 187FREE notes

```dataview
TABLE file.mtime as Updated, tags
FROM ""
WHERE skill = "187free" AND file.folder != "_system" AND file.folder != "_templates"
SORT file.mtime DESC
LIMIT 25
```

> Replace the query above with a Bases view if you use the Bases plugin.

## Quick actions

- [ ] New stack recipe from template
- [ ] New tool review
- [ ] New service comparison
- [ ] New gotcha report
- [ ] New launch checklist
