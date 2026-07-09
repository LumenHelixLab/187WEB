# 187SEO Structured Data Standard

## Schema types relevant to 187web

| Type | Use case |
|------|----------|
| **Organization** | Brand identity, logo, contact, social profiles |
| **WebSite** | Site name, URL, search action (Sitelinks searchbox) |
| **WebPage** | Core page metadata (name, description, URL, breadcrumb) |
| **Article / BlogPosting** | Editorial content, publishing dates, author |
| **FAQPage** | Curated question/answer lists (must be visible on page) |
| **SoftwareApplication** | Apps, tools, SaaS products (ratings, offers, system requirements) |
| **Dataset** | Data resources, tables, downloadable research |

## Validation tools

- Google Rich Results Test
- Schema Markup Validator
- Search Console Enhancements reports

## Implementation policies

- Markup must accurately reflect visible page content.
- Do not markup content hidden behind tabs, logins, or widgets unless it is also visible.
- Avoid fake reviews, fake ratings, or misleading offer metadata.
- Keep schema minimal and relevant; unnecessary schema adds noise and risk.
- Test after every deploy and after major template changes.

## Deployment checklist

- [ ] Schema type matches page purpose
- [ ] Required properties included
- [ ] JSON-LD valid and placed in `<head>` or before closing `</body>`
- [ ] No conflicts with other schema blocks on the same page
- [ ] Validated in Rich Results Test
- [ ] Monitored in Search Console after go-live
