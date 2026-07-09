---
template: search-console-analysis
skill: 187seo
---

# Search Console Analysis — {{ property }}

- **Property:** {{ url }}
- **Date range:** {{ start_date }} – {{ end_date }}
- **Analyst:** {{ analyst }}
- **Mode:** {{ mode | default('Search Console + analytics review') }}

## Performance summary

- **Clicks:** {{ clicks }} ({{ change }})
- **Impressions:** {{ impressions }} ({{ change }})
- **Average CTR:** {{ ctr }} ({{ change }})
- **Average position:** {{ position }} ({{ change }})

## Top queries

| Query | Clicks | Impressions | CTR | Position | Action |
|-------|--------|-------------|-----|----------|--------|
| {{ query }} | {{ clicks }} | {{ impressions }} | {{ ctr }} | {{ position }} | {{ action }} |
| {{ query }} | {{ clicks }} | {{ impressions }} | {{ ctr }} | {{ position }} | {{ action }} |

## Top pages

| Page | Clicks | Impressions | CTR | Position | Action |
|------|--------|-------------|-----|----------|--------|
| {{ page }} | {{ clicks }} | {{ impressions }} | {{ ctr }} | {{ position }} | {{ action }} |
| {{ page }} | {{ clicks }} | {{ impressions }} | {{ ctr }} | {{ position }} | {{ action }} |

## Indexing status

- **Valid:** {{ count }}
- **Errors:** {{ count }}
- **Warnings:** {{ count }}
- **Excluded:** {{ count }}

## Issues found

| Severity | Issue | Affected pages | Recommended fix |
|----------|-------|----------------|-----------------|
| High | {{ issue }} | {{ pages }} | {{ fix }} |
| Medium | {{ issue }} | {{ pages }} | {{ fix }} |
| Low | {{ issue }} | {{ pages }} | {{ fix }} |

## Actions

1. {{ action }}
2. {{ action }}
3. {{ action }}

## Follow-up date

{{ follow_up_date }}

## Risk / spam review

- Manual actions or security issues:
- Policy flags:
- Required review:
