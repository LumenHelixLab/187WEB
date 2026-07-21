# Skill parity — equal depth, accessible 187++

**Mode:** 187WRITE + 187DOCS  
**Audience:** skill authors, agents, and operators  
**Voice:** plain, direct, claim-safe (187++)

## Why this exists

Skills should feel equally ready to use. Thin trigger lists and dense docs make some skills hard to find and others hard to read. **Parity** means every public skill has the same *depth* of prompting and triggers; **187++** means that depth is written in plain language.

## Equal depth targets (showcase + routing)

Every entry in `lib/skill-showcase-data.ts` should meet:

| Field | Target | Notes |
|-------|--------|--------|
| **triggers** | **8–12** | Always include `/187{id}` and `187NAME`. Mix slash, short name, and intent phrases. |
| **useCases** | **4–5** | Concrete jobs, one line each. Start with a verb. |
| **outputs** | **5–6** | What the user walks away with. No jargon-only labels. |
| **description** | **1–2 sentences** | What it does + who it helps. Plain language. Max ~220 characters preferred. |
| **tagline** | **3–6 words** | Benefit, not buzzwords. |

### Trigger recipe (copy this)

1. Canonical slash: `/187{skill}` (or documented alias)  
2. Display name: `187SKILL`  
3. Short name: `skill`  
4. Three **intent** phrases a new user might say  
5. Two **domain** keywords  
6. Optional: one “when things go wrong” phrase  

### Do not

- Pad with near-duplicates (“seo”, “SEO”, “Seo”)  
- Rely only on expert jargon  
- Leave a skill at 3–4 triggers while others have 20  

Access and inclusion skills may list more triggers (people search many ways). Prefer **12 max on the public card**, with deeper lists in `SKILL.md`.

## Accessible documentation (187++)

Public docs (`docs/187*.md`) should be readable by:

- A first-time operator  
- Someone using a screen reader  
- Someone skimming on mobile  

### Structure (every skill doc)

1. **Start here** — one paragraph: what it is, when to use it  
2. **Try this** — 3 example prompts  
3. **Triggers** — manual + automatic (short lists)  
4. **What you get** — outputs as a checklist  
5. **Hand off** — sibling skills (table)  
6. **Details** — optional; fold long material under clear headings  

### Plain-language rules

- Prefer short sentences.  
- Define jargon once, then use the short word.  
- Use active voice.  
- Label claims: *proved / measured / intended / planned*.  
- No revenue, health, legal, or SEO guarantees.  
- Link out to deep references instead of pasting entire runbooks.

### Excessive docs → accessible docs

| Too much | Do this instead |
|----------|-----------------|
| 15 nested headings before value | “Start here” + 3 prompts |
| Repeated contract boilerplate | Link `docs/SKILL-CONTRACT.md` once |
| Long legal-ish lists mid-page | “Safety” short list + link |
| Broken markdown tables | Fix or replace with bullets |

## Agent kits (prompts / tasks / triggers)

Each agent kit (`lib/agents/*-kit.ts`) should ship:

| Field | Count |
|-------|--------|
| prompts | 4 |
| tasks | 4 |
| triggers | 4 |
| commands | 4–5 |
| skillChains | 3–4 (when used) |

Same shape for every crew agent so the UI never feels “empty” on one page and “dense” on another.

## Check

```bash
npx tsx scripts/check-skill-parity.ts
```

Fails when a showcase skill falls below minimum depth.

## Claim note

Parity targets are **process standards** for this repo, not product performance claims.
