# 187SEO Technical SEO Standard

## Crawlability and indexing

- Ensure robots.txt does not accidentally block important content or entire site sections.
- Use canonical tags to consolidate duplicate or near-duplicate URLs.
- Implement pagination, faceted navigation, and parameter handling carefully.
- Monitor index coverage in Search Console and fix errors, soft 404s, and exclusions.
- Use log file analysis or crawler tools to identify orphan pages and crawl traps.

## Performance / Core Web Vitals

- Target LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Optimize images (modern formats, responsive sizing, lazy loading).
- Minimize render-blocking resources and JavaScript execution time.
- Use a CDN and efficient caching policies.
- Measure real-user data from CrUX, not just lab scores.

## Mobile and usability

- Responsive design that works across device sizes.
- Tap targets appropriately sized and spaced.
- No intrusive interstitials that block main content.
- Pass Google's Mobile-Friendly Test and PageSpeed Insights usability checks.

## Security

- HTTPS everywhere; no mixed content warnings.
- Keep platforms, plugins, and dependencies updated.
- Use security headers (HSTS, CSP, X-Content-Type-Options).

## URL and localization

- Clean, descriptive, consistent URL structure.
- hreflang tags implemented correctly for multilingual/multiregional sites.
- Country targeting configured in Search Console when applicable.

## Sitemap and robots.txt

- XML sitemap submitted to Search Console and kept up to date.
- Sitemap index used for large sites.
- robots.txt references sitemap location and disallows only non-public URLs.

## Structured data validation

- Validate all schema with the Rich Results Test and Schema Markup Validator.
- Keep markup consistent with visible page content.
- Monitor Search Console enhancements reports for errors.
