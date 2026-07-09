---
template: page-audit
skill: 187seo
---

# Page Audit — {{ page_title }}

- **URL:** {{ url }}
- **Audited:** {{ date }}
- **Target keyword:** {{ target_keyword }}
- **Search intent:** {{ search_intent }}
- **Mode:** {{ mode | default('page-level SEO audit') }}

## On-page checklist

- [ ] Title tag unique, descriptive, and under 60 characters
- [ ] Meta description compelling, accurate, and under 160 characters
- [ ] H1 present and matches primary intent
- [ ] Heading hierarchy logical (H1 → H2 → H3)
- [ ] Primary keyword in title, H1, and first paragraph
- [ ] Secondary keywords used naturally
- [ ] Internal links to relevant pages
- [ ] External links to authoritative sources
- [ ] Images optimized with descriptive alt text
- [ ] Schema markup relevant and valid
- [ ] Canonical tag correct
- [ ] URL clean and descriptive
- [ ] Page indexable (not noindex/nofollow accidentally)

## Core Web Vitals

| Metric | Score | Status |
|--------|-------|--------|
| LCP | {{ lcp }} | {{ status }} |
| INP | {{ inp }} | {{ status }} |
| CLS | {{ cls }} | {{ status }} |

## Content quality

- **Word count:** {{ word_count }}
- **Original insight:** {{ notes }}
- **E-E-A-T signals:** {{ notes }}
- **Readability:** {{ notes }}

## Findings

| Priority | Issue | Recommendation |
|----------|-------|----------------|
| P0 | {{ issue }} | {{ recommendation }} |
| P1 | {{ issue }} | {{ recommendation }} |
| P2 | {{ issue }} | {{ recommendation }} |

## Next actions

1. {{ action }}
2. {{ action }}
3. {{ action }}

## Risk / spam review

- Policy flags:
- Required review:
