# Phase 1 — Xavier Rename, Recolor, and 187CREATE Skill

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the fifth agent from Krishna to Xavier, apply the new agent color map, add the `187CREATE` first-class skill, and rebalance Phase 1 skill assignments so the site stays green at every commit.

**Architecture:** Use existing `AgentPage`/`AgentDepartments` patterns. No new data layer yet — that comes in Phase 2. Keep changes mechanical and reviewable.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, static export for GitHub Pages.

---

## File map

| File | Responsibility |
|------|----------------|
| `app/xavier/page.tsx` | Xavier agent page (renamed from `app/krishna/page.tsx`). |
| `components/launch/XavierSkillChains.tsx` | SkillChains section on `/xavier` (renamed from `KrishnaSkillChains.tsx`). |
| `components/launch/skillchains-data.ts` | Shared chain data; remove Krishna string references. |
| `components/launch/AgentDepartments.tsx` | Landing-page agent grid; holds color/skill mapping for all five agents. |
| `app/natasha/page.tsx` | Natasha agent page; update overview only. |
| `app/charlotte/page.tsx` | Charlotte agent page; update overview only. |
| `app/kali/page.tsx` | Kali agent page; swap craft → create in overview text. |
| `app/yelena/page.tsx` | Yelena agent page; update overview only. |
| `lib/skill-showcase-data.ts` | Skill metadata; add `create` entry. |
| `lib/first-class-skills.ts` | Canonical first-class roster; add `create`. |
| `scripts/lib/suite-constants.mjs` | Release-validation roster; add `create`. |
| `app/187create/page.tsx` | Public skill page for 187CREATE. |
| `docs/187CREATE.md` | Public docs for 187CREATE. |
| `.claude/skills/187create/SKILL.md` | Canonical Claude skill file for 187CREATE. |
| `app/page.tsx`, `app/187/page.tsx`, `components/showcase/Showcase.tsx`, `docs/ROUTING.md` | Release-surface roster strings. |

---

## Task 1: Rename Krishna route and page to Xavier

**Files:**
- Rename: `app/krishna/page.tsx` → `app/xavier/page.tsx`
- Modify: `components/launch/XavierSkillChains.tsx` (created in Task 2)

### Step 1: Rename the directory

```bash
cd D:/projects/187WEB
git mv app/krishna app/xavier
```

### Step 2: Rewrite `app/xavier/page.tsx`

Replace the old Krishna content with the Xavier page:

```tsx
import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";
import { XavierSkillChains } from "@/components/launch/XavierSkillChains";

const agent: AgentConfig = {
  slug: "xavier",
  name: "XAVIER",
  tagline: "Final creation + council",
  color: "#a855f7",
  skillIds: ["docs", "version", "publish", "launch", "natasha", "test"],
  overview:
    "XAVIER owns final creation and production responsibility, cross-crew vision, and the council command. He can call huddles, interject across teams, and appeal to any 1st, 2nd, or 3rd class skill to ship the final artifact.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function XavierPage() {
  return (
    <>
      <AgentPage agent={agent} />
      <XavierSkillChains />
    </>
  );
}
```

### Step 3: Remove stale Krishna route if empty

```bash
rmdir app/krishna 2>/dev/null || true
```

### Step 4: Verify route builds

```bash
npm run typecheck
```

Expected: no errors.

### Step 5: Commit

```bash
git add -A
git commit -m "feat(agents): rename Krishna route to Xavier"
```

---

## Task 2: Rename KrishnaSkillChains to XavierSkillChains

**Files:**
- Rename: `components/launch/KrishnaSkillChains.tsx` → `components/launch/XavierSkillChains.tsx`
- Modify: `components/launch/skillchains-data.ts`

### Step 1: Rename the file

```bash
cd D:/projects/187WEB
git mv components/launch/KrishnaSkillChains.tsx components/launch/XavierSkillChains.tsx
```

### Step 2: Update the component name and strings

In `components/launch/XavierSkillChains.tsx`, replace the function name and every Krishna reference:

```tsx
export function XavierSkillChains() {
```

Update the label line:

```tsx
<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a855f7]">
  XAVIER SkillChains
</p>
```

Update the description:

```tsx
<p className="mt-4 text-white/60">
  End-to-end combinations of 1st, 2nd, and 3rd class skills that XAVIER
  can hold, run, and distribute. Each chain links to the skill pages that
  produce its artifact.
</p>
```

Replace every other `#3b82f6` color token in this file with `#a855f7` (six occurrences in borders, backgrounds, and text).

### Step 3: Update `components/launch/skillchains-data.ts`

No string literal changes are required in the data file, but ensure there are no remaining `Krishna` references. The chains stay neutral.

### Step 4: Lint and typecheck

```bash
npm run lint
npm run typecheck
```

Expected: clean.

### Step 5: Commit

```bash
git add -A
git commit -m "refactor(agents): rename KrishnaSkillChains to XavierSkillChains and recolor purple"
```

---

## Task 3: Update AgentDepartments roster, colors, and overviews

**Files:**
- Modify: `components/launch/AgentDepartments.tsx`

### Step 1: Replace the top comment block

```tsx
/**
 * Top-level 187WEB agent ecosystem.
 *
 * Agent → skill mapping:
 * - NATASHA: natasha, chain, test (external / post-launch security + applications)
 * - YELENA: natasha, test, access-plus, include (pre-launch internal security + safety gates + applications)
 * - CHARLOTTE: repo, craft, vibe, launch, write, research (application orchestration)
 * - KALI: seo, revenue, publish, create, repo, vibe (growth + create assist)
 * - XAVIER: docs, version, publish, launch, natasha, test (final creation / production + council)
 *
 * NATASHA and YELENA split security duties so CHARLOTTE and KALI stay focused
 * on application work. Any agent can jump in, assign subagents, call any 1st/2nd/3rd
 * class skill when triggered, or appeal to XAVIER for a council or SkillChain.
 */
```

### Step 2: Replace the `AGENTS` array

```tsx
const AGENTS: AgentConfig[] = [
  {
    slug: "natasha",
    name: "NATASHA",
    tagline: "External + post-launch security",
    color: "#f43f5e",
    skillIds: ["natasha", "chain", "test"],
    overview:
      "NATASHA handles external and post-launch security: threat-surface audits, contract and chain assurance, and test-driven validation after ship. She shares the security workload with YELENA and can call XAVIER for a council when a post-launch incident escalates.",
  },
  {
    slug: "yelena",
    name: "YELENA",
    tagline: "Pre-launch internal safety gates",
    color: "#facc15",
    skillIds: ["natasha", "test", "access-plus", "include"],
    overview:
      "YELENA owns pre-launch internal security and safety gates: access checks, inclusion review, test-driven CI gates, and release readiness. She frees CHARLOTTE and KALI to build applications while standing ready to jump in when a safety review is triggered.",
  },
  {
    slug: "charlotte",
    name: "CHARLOTTE",
    tagline: "Application orchestration",
    color: "#3b82f6",
    skillIds: ["repo", "craft", "vibe", "launch", "write", "research"],
    overview:
      "CHARLOTTE orchestrates application work: design systems, repo scaffolding, launch planning, plain-language copy, and research-backed recycling. Security is handled by NATASHA and YELENA, so she focuses on shipping and can appeal to XAVIER for final production decisions.",
  },
  {
    slug: "kali",
    name: "KALI",
    tagline: "Growth + create assist",
    color: "#39FF14",
    skillIds: ["seo", "revenue", "publish", "create", "repo", "vibe"],
    overview:
      "KALI drives growth and assists CHARLOTTE with direct web creation: SEO, revenue architecture, publish gate, and the new 187CREATE skill for landing pages and campaign assets. She can appeal to NATASHA/YELENA for security gates and to XAVIER for final ship calls.",
  },
  {
    slug: "xavier",
    name: "XAVIER",
    tagline: "Final creation + council",
    color: "#a855f7",
    skillIds: ["docs", "version", "publish", "launch", "natasha", "test"],
    overview:
      "XAVIER is the crew's final creation / production lead. He sees across all crews, can call a council huddle or Q&A, and owns the publish/launch/version skills that turn work into shipped artifacts.",
  },
];
```

### Step 3: Update the section heading

```tsx
<h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
  Five agents. One web hive.
</h2>
```

### Step 4: Run lint/typecheck

```bash
npm run lint
npm run typecheck
```

### Step 5: Commit

```bash
git add -A
git commit -m "feat(agents): recolor crew and rebalance Phase 1 skill assignments"
```

---

## Task 4: Update individual agent pages

**Files:**
- Modify: `app/natasha/page.tsx`, `app/charlotte/page.tsx`, `app/kali/page.tsx`, `app/yelena/page.tsx`

### Step 1: `app/natasha/page.tsx`

Replace the `agent` object:

```tsx
const agent: AgentConfig = {
  slug: "natasha",
  name: "NATASHA",
  tagline: "External + post-launch security",
  color: "#f43f5e",
  skillIds: ["natasha", "chain", "test"],
  overview:
    "NATASHA handles external and post-launch security for 187WEB: threat-surface audits, contract and chain assurance, and test-driven validation after ship. She works in tandem with YELENA and can call XAVIER for a council when an incident needs cross-crew coordination.",
};
```

### Step 2: `app/charlotte/page.tsx`

Replace the `agent` object:

```tsx
const agent: AgentConfig = {
  slug: "charlotte",
  name: "CHARLOTTE",
  tagline: "Application orchestration",
  color: "#3b82f6",
  skillIds: ["repo", "craft", "vibe", "launch", "write", "research"],
  overview:
    "CHARLOTTE threads intent into retrievable info, recycled and upcycled solutions, design-system hybrids, launch plans, and conflict-resolved public copy. With security handled by NATASHA and YELENA, she focuses on application orchestration and can appeal to XAVIER for final production decisions.",
};
```

### Step 3: `app/kali/page.tsx`

Replace the `agent` object:

```tsx
const agent: AgentConfig = {
  slug: "kali",
  name: "KALI",
  tagline: "Growth + create assist",
  color: "#39FF14",
  skillIds: ["seo", "revenue", "publish", "create", "repo", "vibe"],
  overview:
    "KALI drives growth and assists CHARLOTTE with direct web creation: SEO, revenue systems, publish gate, repo/vibe support, and 187CREATE for landing pages and campaign assets. She appeals to NATASHA/YELENA for security gates and to XAVIER for final ship calls.",
};
```

### Step 4: `app/yelena/page.tsx`

Replace the `agent` object:

```tsx
const agent: AgentConfig = {
  slug: "yelena",
  name: "YELENA",
  tagline: "Pre-launch internal safety gates",
  color: "#facc15",
  skillIds: ["natasha", "test", "access-plus", "include"],
  overview:
    "YELENA owns pre-launch internal security and safety gates for 187WEB: access checks, inclusion review, test-driven CI validation, and release readiness. She frees CHARLOTTE and KALI to focus on application work and shares the security load with NATASHA.",
};
```

### Step 5: Lint, typecheck, commit

```bash
npm run lint
npm run typecheck
git add -A
git commit -m "feat(agents): update individual agent pages for new scopes and colors"
```

---

## Task 5: Add 187CREATE to skill metadata

**Files:**
- Modify: `lib/skill-showcase-data.ts`
- Modify: `lib/first-class-skills.ts`
- Modify: `scripts/lib/suite-constants.mjs`

### Step 1: Add entry in `lib/skill-showcase-data.ts`

Find the `skillShowcases` array and insert after the `craft` entry:

```ts
  {
    id: "create",
    name: "187CREATE",
    tagline: "Growth-first creation",
    color: "#39FF14",
    description:
      "187CREATE is Kali's growth-first creation skill. It builds landing pages, ad creatives, influencer kits, and conversion-focused surfaces that plug directly into the 187WEB suite.",
    triggers: [
      "create a landing page",
      "spin up ad creative",
      "design an influencer kit",
      "optimize a conversion surface",
      "build a growth MVP",
    ],
    useCases: [
      "Rapid landing pages for campaigns and launches",
      "Ad creative variants and conversion copy",
      "Influencer / partner asset kits",
      "Growth MVPs that later hand off to 187CRAFT for systemization",
    ],
    outputs: [
      "Shipped growth page or component set",
      "Campaign brief with copy and asset checklist",
      "Conversion checklist and A/B candidate list",
      "Handoff notes for 187CRAFT / 187PUBLISH",
    ],
    related: ["craft", "vibe", "launch", "publish", "seo", "revenue"],
    routesTo: [
      { skillId: "craft", reason: "Systemize a successful MVP into a design system" },
      { skillId: "publish", reason: "Run the publish gate before going live" },
      { skillId: "seo", reason: "Optimize discoverability of the growth surface" },
    ],
    templates: [
      {
        title: "Landing page MVP",
        body:
          "Create a one-section landing page for [offer] targeting [audience]. Include headline, subhead, social proof placeholder, CTA, and accessibility checks.",
      },
      {
        title: "Ad creative brief",
        body:
          "Generate three ad-creative variants for [channel] promoting [offer]. Each variant needs headline, hook, visual direction, and CTA.",
      },
    ],
  },
```

### Step 2: Add to `lib/first-class-skills.ts`

Insert after the `craft` object:

```ts
  { id: "create", name: "187CREATE", route: "create", docs: "187CREATE" },
```

### Step 3: Add to `scripts/lib/suite-constants.mjs`

Insert after the `craft` object:

```js
  { id: "create", name: "187CREATE", route: "create", docs: "187CREATE" },
```

### Step 4: Commit

```bash
git add -A
git commit -m "feat(skills): add 187CREATE to canonical skill rosters"
```

---

## Task 6: Create 187CREATE public surface

**Files:**
- Create: `app/187create/page.tsx`
- Create: `docs/187CREATE.md`
- Create: `.claude/skills/187create/SKILL.md`

### Step 1: Create skill page

```bash
mkdir -p app/187create .claude/skills/187create
```

Write `app/187create/page.tsx`:

```tsx
import type { Metadata } from "next";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("create")!;

export const metadata: Metadata = {
  title: `${skill.name} — 187WEB Skill`,
  description: skill.description,
};

export default function CreateSkillPage() {
  return <SkillShowcase skill={skill} />;
}
```

### Step 2: Write `docs/187CREATE.md`

```markdown
# 187CREATE

**Identity:** Growth-first creation skill for landing pages, ad creatives, influencer kits, and conversion-focused surfaces.

**Class:** 1st class — public routed skill.

## Triggers

- "Create a landing page"
- "Spin up ad creative"
- "Design an influencer kit"
- "Optimize a conversion surface"
- "Build a growth MVP"

## When to use

Use 187CREATE when you need to ship a growth asset quickly without waiting for a full design-system pass. It pairs with 187CRAFT to systemize winners, 187PUBLISH for the release gate, and 187SEO/187REVENUE for traffic and monetization.

## Output contract

- Shipped growth page or component set
- Campaign brief with copy and asset checklist
- Conversion checklist and A/B candidate list
- Handoff notes for 187CRAFT / 187PUBLISH

## Templates

### Landing page MVP

Create a one-section landing page for [offer] targeting [audience]. Include headline, subhead, social proof placeholder, CTA, and accessibility checks.

### Ad creative brief

Generate three ad-creative variants for [channel] promoting [offer]. Each variant needs headline, hook, visual direction, and CTA.

## Acceptance tests

- [ ] Output renders on mobile and desktop without horizontal scroll.
- [ ] CTA is above the fold and has a clear verb.
- [ ] Color contrast meets WCAG 2.1 AA.
- [ ] Includes alt text for every image.
- [ ] Lists the next skill to call (usually 187PUBLISH or 187CRAFT).

## Routes

- Primary: `/187create`
- Systemize winner: `/187craft`
- Publish gate: `/187publish`
- SEO pass: `/187seo`
```

### Step 3: Write `.claude/skills/187create/SKILL.md`

```markdown
---
name: 187CREATE
description: Growth-first creation skill for landing pages, ad creatives, influencer kits, and conversion-focused surfaces.
origin: 187WEB skill suite
---

# 187CREATE

Build growth surfaces fast. 187CREATE is Kali's counterpart to Charlotte's 187CRAFT: it prioritizes speed and conversion over systemization.

## Responsibilities

- Landing page MVPs
- Ad creative variants and copy
- Influencer / partner asset kits
- Conversion optimization passes

## Handoffs

- Systemize a winner → 187CRAFT
- Release gate → 187PUBLISH
- Discoverability → 187SEO
- Monetization → 187REVENUE

## Templates

### Landing page MVP

Create a one-section landing page for [offer] targeting [audience]. Include headline, subhead, social proof placeholder, CTA, and accessibility checks.

### Ad creative brief

Generate three ad-creative variants for [channel] promoting [offer]. Each variant needs headline, hook, visual direction, and CTA.
```

### Step 4: Commit

```bash
git add -A
git commit -m "feat(skills): add 187CREATE page, docs, and canonical skill file"
```

---

## Task 7: Update release-surface roster strings

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/187/page.tsx`
- Modify: `components/showcase/Showcase.tsx`
- Modify: `docs/ROUTING.md`

### Step 1: `app/page.tsx`

Update the release-surface roster comment to include `187CREATE`:

```tsx
// Release-surface roster: 187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187WRITE 187INCLUDE+
```

### Step 2: `app/187/page.tsx`

Update both the `FIRST_CLASS_ROSTER` constant and the preserved comment:

```tsx
const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187WRITE 187INCLUDE+";
```

And update the preserved comment block similarly.

### Step 3: `components/showcase/Showcase.tsx`

Update the `FIRST_CLASS_ROSTER` string:

```tsx
const FIRST_CLASS_ROSTER = "187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187WRITE 187INCLUDE+";
```

### Step 4: `docs/ROUTING.md`

Update the roster comment at the top:

```markdown
<!-- 187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO -->
```

### Step 5: Commit

```bash
git add -A
git commit -m "chore(rosters): add 187CREATE to release-surface rosters"
```

---

## Task 8: Regenerate model adapters

**Files:**
- Generated: `.claude/`, `.kimi/`, `.gemini/`, `.grok/`, `.chatgpt/`, `.herme/` adapter trees

### Step 1: Generate

```bash
npm run adapters:generate
```

Expected output lists adapters for all platforms.

### Step 2: Verify drift

```bash
npm run adapters:drift
```

Expected: ✅ Adapter drift check passed.

### Step 3: Commit

```bash
git add -A
git commit -m "chore(adapters): regenerate model adapters for 187CREATE"
```

---

## Task 9: Full validation and deploy

### Step 1: Run the full validation suite

```bash
npm run lint
npm run typecheck
npm test
npm run docs:drift
npm run showcase:sync
npm run release:validate
npm run adapters:drift
```

Expected: all pass.

### Step 2: Build locally

```bash
npm run build
```

Expected: static export succeeds.

### Step 3: Push to main and deploy

```bash
git push origin main
```

Wait for CI and Pages deploy to complete.

### Step 4: Smoke-test live URLs

- https://lumenhelixlab.github.io/187WEB/
- https://lumenhelixlab.github.io/187WEB/xavier/
- https://lumenhelixlab.github.io/187WEB/187create/

Expected: 200 OK and new colors/name visible.

---

## Spec coverage check

| Spec section | Implementing task |
|--------------|-------------------|
| Rename Krishna → Xavier | Task 1, Task 2 |
| Color remap | Task 3 |
| Add 187CREATE skill | Task 5, Task 6 |
| Kali swaps craft → create | Task 3, Task 4 |
| Natasha/Yelena split security duties | Task 3, Task 4 |
| Xavier final creation/council role | Task 1, Task 3, Task 4 |
| Release-surface roster sync | Task 7 |
| CI-green at each phase | Task 9 |
