---
name: natasha-scout
description: >-
  Use for compliant web and repository research with attribution, rate limits, and no authentication or paywall bypass (NATASHA SCOUT module).
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/natasha-scout/SKILL.md`](../../.claude/skills/natasha-scout/SKILL.md).

# natasha-scout — SCOUT (Compliant Research)

**Suite:** 187WEB Ecosystem v3 — NATASHA. Parent: [`187web-ecosystem`](../187web-ecosystem/SKILL.md).  
**Module:** **SCOUT** (replaces CHAR).  
**Legacy aliases:** `agent-charlotte`, `char`, `ch`, `CHAR` (deprecated).

Gathers context from **public or authorized** sources and returns attributed findings for Local Brain / FUSE. Prefer quality over breadth.

## Manual triggers

`/187 scout`, `SCOUT`, `natasha-scout`, research crawl (authorized)

## Automatic triggers

web research, source harvest, competitive public docs, repository public README mining

## When to use

- External references required with citations  
- Multi-page public documentation synthesis  
- Vault weaving of **allowed** public content  

## When not to use

- Private systems without authorization  
- Paywall / auth / CAPTCHA bypass requests  
- Fingerprint spoofing or anti-bot evasion  
- Broad unrestricted crawls without approval  

## Capabilities (contract)

### 1. Directed research

BFS/DFS-style plan with **depth limit**, allow/deny URL patterns, and stop conditions. Persist notes with source URLs and timestamps.

### 2. Contextual extraction

Prefer accessible content and official APIs. Wait for legitimate public content; **do not** spoof Canvas/WebGL fingerprints or defeat bot challenges.

### 3. Local Brain weave

Link entities into Obsidian with `[[wikilinks]]` and frontmatter `source_url` / `retrieved_at`.  

## Input contract

Seed URL or query, max depth, allow/deny patterns, authorization statement if non-public.

## Output contract

1. Findings list with URLs and retrieve times  
2. Confidence / coverage limits  
3. Vault note outline or written notes  
4. Explicit refusals for blocked actions  

## Routing rules

- After THREAD clarifies research question  
- Before FUSE when evidence is external  
- LAB for any executable scrapers  

## Safety / ethics guardrails

- Honor robots.txt, rate limits, ToS.  
- No authentication bypass, paywall bypass, or private endpoint access.  
- No fingerprint spoofing or anti-bot bypass.  
- Attribute every claim; no fabricated sources.  
- Approval required for large multi-host crawls.  

## Integration points

- Replaces `agent-charlotte` for all new work  
- Optional observability spans (without charlotte_* flag names in new code)  
- Runtime: `tools/natasha/scout/` (Phase 3)  

## Acceptance tests

1. “Scout public docs for X” → plan with depth + attribution.  
2. “Bypass Cloudflare / spoof fingerprint” → refuse.  
3. “agent-charlotte seed=…” → deprecation + this skill.  

