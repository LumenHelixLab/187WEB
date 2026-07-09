---
title: 187SKILLS Routing Rules
description: Routing rules between 187FREE and 187RESEARCH.
tags: ["187skills", "routing", "187free", "187research"]
skill: 187skills
---

# 187SKILLS Routing Rules

Rules for deciding when to invoke 187FREE, 187RESEARCH, or both.

## Use 187FREE when the user need is:

- What free tool/service can do this?
- How do we host/deploy/build this for free?
- What no-cost stack should we use?
- What open-source alternative exists?
- What is the cheapest viable path?
- What free public API/data/tool can support this?

## Use 187RESEARCH when the user need is:

- What sources support this?
- What papers/databases should we search?
- What is the evidence level?
- What lab/demo/notebook should we build?
- What scholarly/biomedical/math/code databases apply?
- How do we make this reproducible?
- How do we separate proof from pattern?
- How do we make this publication or classroom quality?

## Use both when:

- Building a research lab with free hosting
- Turning research into an MVP
- Finding datasets and deploying a public demo
- Building accessibility/assistive tech from open-source tools
- Creating civic/legal evidence dashboards with no-cost hosting
- Making public Lumen Helix/OIQ research pages
- Building KNOTstore/RCLP/NUMO/promptPACK demos

## Order when both apply

1. 187RESEARCH defines the research/lab requirements.
2. 187FREE finds the lowest-cost/free implementation path.
3. Claim audit and privacy review run before publishing.
4. Git baseline commit before creating or modifying many files.

## Routing Tests

After setup, test with these prompts and report whether routing is correct.

### Test 1

**Prompt:** 187FREE this: I need a free stack for a static research demo with custom domain-like URL, analytics, and contact form.

**Expected:** 187FREE only.

### Test 2

**Prompt:** 187RESEARCH this: build a reproducible lab plan for a Golay/Leech lattice visualization with citations, claim discipline, and interactive parameters.

**Expected:** 187RESEARCH plus 187FREE deployment suggestion.

### Test 3

**Prompt:** Find papers, datasets, and a free hosting stack for an ADHD/AuDHD consent-first support tool.

**Expected:** 187RESEARCH for sources and evidence. 187FREE for stack/tools. Consent-check required.

### Test 4

**Prompt:** Research whether this mathematical pattern is proof, computation, analogy, or poetic framing.

**Expected:** 187RESEARCH and proof-vs-pattern.

### Test 5

**Prompt:** Find me the cheapest way to deploy promptPACK with auth, database, storage, email, and monitoring.

**Expected:** 187FREE.

## Related files

- [[187FREE]]
- [[187RESEARCH]]
- [[187SKILLS Integration Map]]
