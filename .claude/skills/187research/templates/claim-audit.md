---
name: claim-audit
description: Template for auditing claims and assigning evidence ladder rungs.
origin: portfolio
---

# Claim Audit: {{title}}

## YAML frontmatter

```yaml
title: "{{title}}"
domain: [scholarly | biomedical | mathematical | software | public-data | mixed]
created: {{YYYY-MM-DD}}
auditor: "{{author}}"
status: [draft | in-progress | approved | flagged | rejected]
```

## Scope

- Document or artifact under audit:
- Audience for the claims:
- Intended publication channel:

## Claim ladder table

| # | Claim | Evidence rung | Source route | Date accessed | Caveats | Public-claim risk |
|---|-------|---------------|--------------|---------------|---------|-------------------|
| 1 | {{claim}} | {{0–5}} | {{source}} | {{YYYY-MM-DD}} | {{caveats}} | {{low/medium/high}} |
| 2 | | | | | | |
| 3 | | | | | | |

## Proof vs pattern classification

For each claim, indicate which category best applies:

| Claim | Proof | Computation | Analogy | Poetic framing | None |
|-------|-------|-------------|---------|----------------|------|
| {{claim}} | [ ] | [ ] | [ ] | [ ] | [ ] |

## Sensitive claims

- Medical / clinical / health claims:
- Privacy / personal data claims:
- Proprietary / commercial claims:
- Dual-use / safety claims:

## Required reviews

- [ ] Human/professional review (health claims)
- [ ] Legal / privacy review
- [ ] Subject-matter expert review
- [ ] Reproducibility validation

## Safest public framing

Summarize how each high-risk claim should be rewritten for public release:

-
-

## Final verdict

- Approved as-is:
- Approved with revisions:
- Flagged for review:
- Rejected:

## Next actions

1.
2.
3.
