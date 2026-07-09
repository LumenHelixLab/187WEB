---
template: schema-plan
skill: 187seo
---

# Schema Plan — {{ site_or_page_name }}

- **URL:** {{ url }}
- **Created:** {{ date }}
- **Owner:** {{ owner }}
- **Mode:** {{ mode | default('structured-data planning') }}

## Schema types

| Page / Template | Schema Type | Purpose |
|-----------------|-------------|---------|
| {{ page }} | Organization | Brand identity and contact info |
| {{ page }} | WebSite | Site name and search action |
| {{ page }} | WebPage | Page metadata |
| {{ page }} | Article / BlogPosting | Editorial content |
| {{ page }} | FAQPage | Visible Q&A |
| {{ page }} | SoftwareApplication | App or tool details |
| {{ page }} | Dataset | Data resource |

## Properties per type

### {{ schema_type }}

- `@context`: https://schema.org
- `@type`: {{ type }}
- {{ property }}: {{ value }}
- {{ property }}: {{ value }}

## Validation plan

- [ ] Rich Results Test passed
- [ ] Schema Markup Validator passed
- [ ] Search Console Enhancements report reviewed
- [ ] No hidden or misleading markup

## Implementation notes

{{ notes }}

## Risk / spam review

- Misleading markup checks passed:
- Policy flags:
- {{ risks }}
