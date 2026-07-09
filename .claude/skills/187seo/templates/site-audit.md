---
template: site-audit
skill: 187seo
---

# Site Audit — {{ site_name }}

- **URL:** {{ url }}
- **Audited:** {{ date }}
- **Platform:** {{ platform }}
- **Auditor:** {{ auditor }}
- **Mode:** {{ mode | default('technical + content + off-site audit') }}

## Executive summary

{{ summary }}

## Technical SEO

- [ ] Crawlability and robots.txt
- [ ] Index coverage and canonicalization
- [ ] Core Web Vitals (LCP, INP, CLS)
- [ ] Mobile usability
- [ ] HTTPS and security headers
- [ ] XML sitemap
- [ ] URL structure and redirects
- [ ] hreflang (if applicable)

## Content

- [ ] E-E-A-T signals
- [ ] Intent matching per page
- [ ] Duplicate or thin content
- [ ] Internal linking structure
- [ ] Content freshness plan

## Off-site and authority

- [ ] Backlink profile health
- [ ] Brand mentions
- [ ] Local citations (if applicable)

## Structured data

- [ ] Schema types present
- [ ] Validation status
- [ ] Search Console enhancements status

## Findings

| Priority | Issue | Impact | Recommendation | Owner |
|----------|-------|--------|----------------|-------|
| P0 | {{ issue }} | {{ impact }} | {{ recommendation }} | {{ owner }} |
| P1 | {{ issue }} | {{ impact }} | {{ recommendation }} | {{ owner }} |
| P2 | {{ issue }} | {{ impact }} | {{ recommendation }} | {{ owner }} |

## Next actions

1. {{ action }}
2. {{ action }}
3. {{ action }}

## Risk / spam review

{{ risk_review }}
