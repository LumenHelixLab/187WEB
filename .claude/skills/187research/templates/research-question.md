---
name: research-question
description: Template for scoping and routing a single research question.
origin: portfolio
---

# Research Question: {{title}}

## YAML frontmatter

```yaml
title: "{{title}}"
domain: [scholarly | biomedical | mathematical | software | public-data | mixed]
created: {{YYYY-MM-DD}}
author: "{{author}}"
sensitivity: [none | health | personal | proprietary | dual-use]
status: [draft | routing | in-progress | complete | archived]
```

## Question

State the research question in one sentence:

> {{question}}

## Scope

- What is included?
- What is excluded?
- Time period:
- Geographic or population bounds (if any):

## Known sources

List sources the user or prior work already identified:

- {{source 1}} — {{relevance}}
- {{source 2}} — {{relevance}}

## Source constraints

- APIs vs web search preference:
- Open access required? yes / no
- Language restrictions:
- Date restrictions:

## Sensitivity

- Does this involve health, personal, proprietary, or dual-use information?
- Required reviews before public release:

## Expected output

Which artifact(s) should this produce?

- [ ] Literature review
- [ ] Computational lab
- [ ] Dataset card
- [ ] Claim audit
- [ ] Demo / visualization
- [ ] Paper / spec

## Next actions

1.
2.
3.
