---
name: agent-charlotte
description: Use when research must leave the Obsidian vault, navigate the live web,
  extract targeted DOM data, and weave it back into the local brain.
origin: portfolio
---
# agent-charlotte — Autonomous Web Crawler

**Suite:** The 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md) · Siblings:
[widow-weaver](../widow-weaver/SKILL.md) · [neuro-toxin](../neuro-toxin/SKILL.md) · [swarm-mind](../swarm-mind/SKILL.md) · [silk-sandbox](../silk-sandbox/SKILL.md)

`agent-charlotte` is Charlotte leaving the vault. She navigates the live web,
extracts exactly what matters, and threads the findings back into the Obsidian
Local Brain as linked, queryable knowledge. No manual copy-paste. No orphaned
bookmarks. Every crawl produces a node in the web.

Load this skill when a task needs external research, competitive intelligence,
reference harvesting, or live data extraction that must persist inside the
vault as structured markdown.

## When to use this

- A topic needs deep research across many pages and the output must live in
  Obsidian, not a browser tab.
- A target site is JS-heavy, behind cookie gates, or paginated and raw HTTP
  scraping fails.
- Entities extracted from the web must be auto-linked to existing vault notes.
- Competitive or reference material must be mapped against the current vault
  graph.

## Capabilities

### 1. Deep-Web Spinning

**What it does.** Follows links recursively from a seed URL, harvesting
comprehensive research and synthesizing a localized knowledge base in the
vault. Think of it as generating a focused Wikipedia for a single research
target.

> **Strict developer directive.** Implement directed graph traversal (BFS or
> DFS) with a configurable depth limit and a bounded frontier. Orchestrate
> headless browser instances via Playwright or Puppeteer with thread-pool
> concurrency; deduplicate URLs, honor cache headers, and persist structured
> page artifacts to the vault.

**Input/output guidance.**
- Input: seed URL, traversal strategy (`bfs` | `dfs`), max depth, and optional
  URL allowlist/denylist patterns.
- Output: one vault note per page, a master index note, and a graph link from
  every page note back to the seed.

---

### 2. Contextual Traversal

**What it does.** Handles modern web surfaces that defeat simple scrapers:
cookie-consent banners, lazy-loaded SPAs, infinite scroll, and dynamic content.
Extracts the rendered text the human reader actually sees.

> **Strict developer directive.** Pierce Shadow DOM and iframes, intercept
> XHR/Fetch responses for raw JSON payloads, wait for hydration events, and
> spoof Canvas/WebGL fingerprints to reduce bot-mitigation friction. Respect
> response codes and anti-bot signals; do not brute-force through
> Cloudflare/Akamai challenges.

**Input/output guidance.**
- Input: target URL(s) plus optional DOM selectors or semantic hints
  (headings, tables, code blocks).
- Output: clean markdown with source attribution, network-intercepted JSON
  stored as fenced code blocks or attached `.json` files.

---

### 3. Obsidian Auto-Weaver

**What it does.** Reads the scraped text, identifies entities, links known
entities to existing vault notes via `[[Wikilinks]]`, and generates stub pages
for unrecognized critical terms. The web becomes part of the local semantic
graph.

> **Strict developer directive.** Run local Named Entity Recognition (NER)
> against the scraped corpus and cross-reference extracted entities with the
> Obsidian SQLite/graph index. Prefer existing note matches; create new stubs
> only for high-salience unknown entities. Write bidirectional links and append
> source URLs to frontmatter.

**Input/output guidance.**
- Input: scraped markdown notes produced by Deep-Web Spinning or Contextual
  Traversal.
- Output: linked vault notes, new stub pages for unknown entities, and an
  updated graph index summary.

---

## Invocation / workflow example

Research target: a competitor's public documentation and changelog.

1. **Compile.** Load [`187web-manifest`](../187web-manifest/SKILL.md) and read `PLAN.md` for the research
   question and neuro-toxin profile.
2. **Sharpen.** Use [`widow-weaver`](../widow-weaver/SKILL.md) / `Task_Extractor` to define the exact
   entities, metrics, and date range to extract.
3. **Crawl.** Dispatch `agent-charlotte`:
   - Seed URL: competitor docs root.
   - Strategy: `bfs`, max depth `3`.
   - Scope: `/docs/**`, `/changelog/**`, deny `*/login*` and `*/account*`.
4. **Render.** Let Contextual Traversal handle JS-rendered docs and intercept
   any public API schema JSON.
5. **Weave.** Run Obsidian Auto-Weaver to link product names, APIs, and release
   versions to existing vault notes; generate stubs for new terms.
6. **Validate.** Route any executable extraction scripts through
   [`silk-sandbox`](../silk-sandbox/SKILL.md) before running them.

**Activation line format:**

```text
[agent-charlotte] seed=https://example.com/docs strategy=bfs depth=3 scope=/docs/**,/changelog/**
```

---

## Safety / ethics

Charlotte is lethal precision, not a vandal. Obey these rules on every crawl:

- **Respect `robots.txt`** and `noindex` / `nofollow` directives.
- **Rate-limit requests** so the target server does not suffer.
- **Honor terms of service**; do not crawl sites you do not have permission to
  scrape aggressively.
- **Do not bypass authentication**, paywalls, or private endpoints.
- **Cache and attribute** sources; every vault note must cite its origin.

Aggressive, unauthorized crawling violates trust and can violate law. Keep the
web intact.

---

*This skill defines crawler behavior and vault integration policy only. It
contains no runtime code or implementation scaffolding.*
