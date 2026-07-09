---
title: 187RESEARCH Integration Map
description: How 187RESEARCH connects to the Lumen Helix tool ecosystem.
skill: 187research
---

# 187RESEARCH Integration Map

## 1. 187FREE

**Role:** No-cost stack/tool/source scouting.

**Integration:** 187RESEARCH calls 187FREE whenever a lab, demo, notebook, publication page, or research-to-product workflow needs free hosting, free tooling, free datasets, or free deployment paths.

**Workflow order:**

1. 187RESEARCH defines research/lab requirements.
2. 187FREE finds the lowest-cost/free implementation path.
3. Claim audit and privacy review run before publishing.
4. Git baseline commit before creating or modifying many files.

## 2. Obsidian

**Role:** Knowledge base, linked notes, dashboards, claim/evidence archive.

**Integration:** 187RESEARCH artifacts use YAML frontmatter, tags, wiki links, Bases/Dataview dashboards, and templates. Source notes, literature reviews, citation maps, and lab demo specs live in the vault and link to related projects, inventions, and skills.

## 3. Claudian

**Role:** In-vault agent interface.

**Integration:** 187RESEARCH is triggered through manual slash commands, selected-note actions, plan mode, and file-safe edits. Claudian reads 187RESEARCH templates and references from `.claude/skills/187research/`.

## 4. Claude Code

**Role:** Local code/research engineer.

**Integration:** Claude Code loads `.claude/skills/187research/SKILL.md`, generates repo/lab code, and performs shell operations only with approval. It uses the research artifact ladder to decide which files to create.

## 5. MCPVault

**Role:** Safe vault bridge.

**Integration:** MCPVault exposes vault contents to allowed MCP clients with frontmatter and file-safety discipline. 187RESEARCH artifacts are read and updated through MCPVault-aware tools.

## 6. Obsidian Git

**Role:** Rollback and audit.

**Integration:** Commit a baseline before large 187RESEARCH operations, branch for experimental labs, and never perform destructive git actions. Every public-claim release should have a tagged commit.

## 7. Smart Connections

**Role:** Semantic retrieval over notes.

**Integration:** Smart Connections finds related research, sources, projects, inventions, accessibility patterns, and prior lab demos. Use it to discover reusable evidence and avoid duplicate research.

## 8. Lumen Helix / OIQ

**Role:** Applied research/product pipeline.

**Integration:** Research → evidence → lab/demo → spec → repo → launch → public claim review. 187RESEARCH feeds source-backed requirements into Lumen Helix/OIQ product workflows.

## 9. Public outputs

**Role:** Public pages, demos, papers, posts, specs.

**Integration:** No public release without disclosure-risk check, claim audit, citation review, accessibility review, and 187FREE deployment plan. Public outputs include versioned snapshots and dated correction notes.
