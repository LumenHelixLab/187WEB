# 187WEB Abilities Index

**187WEB** — *Type one command. Ship the whole surface.*

This index maps high-level abilities to the slash commands, app routes, and documentation that implement them. The live site now surfaces every core skill as an ability card with triggers, outputs, routing, and templates.

## The three things 187WEB does

1. **Build public web surfaces** — landing pages, design systems, component kits, docs, and copy.
2. **Launch with standards wired in** — SEO/access/inclusion audits, revenue architecture, go-to-market plans, and a publish gate.
3. **Ship research-grade labs** — reproducible experiments, dataset cards, public API contracts, provenance, benchmarks, and Research Release Packets.

## Ability map

| Group | Skills |
|---|---|
| **Build** | `craft` · `repo` · `kit` · `docs` · `write` · `access` · `include` |
| **Research** | `research` · `free` · `seo` · `test` |
| **Launch** | `launch` · `revenue` · `vibe` · `learn` |
| **Operate** | `command` · `report` · `scan` · `standard` · `flow` · `version` · `publish` |
| **Modules** | `THREAD` · `COMPRESS` · `TENSION` · `SPARK` · `CORD` · `SCOUT` · `LAB` · `FUSE` |
| **Workflow** | `HANDOFF` (`handoff` / `ash`) |
| **Research Lab** | `sci` · `labs` · `data` · `api` · `bench` · `nb` · `colab` · `gap` · `meta` · `prov` · `crate` · `rrp` |

## Slash command surface

Canonical grammar:

```text
/187 <alias|command> [target] [mode] [depth]
```

Start at `/187` or see [187-COMMANDS.md](187-COMMANDS.md) for the full reference.

## Core skill showcase pages

Each core skill has a dedicated route and skill page:

| Skill | Route | Docs |
|---|---|---|
| 187COMMAND | `/187command` | [187-COMMANDS.md](187-COMMANDS.md), [187-COMMAND-GRAMMAR.md](187-COMMAND-GRAMMAR.md) |
| 187REPORT | `/187report` | [187SKILLS.md](187SKILLS.md) |
| 187SCAN | `/187scan` | [187SKILLS.md](187SKILLS.md) |
| 187KIT | `/187kit` | [187-MODULES.md](187-MODULES.md), [187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) |
| 187STANDARD | `/187standard` | [187SKILLS.md](187SKILLS.md) |
| 187FLOW | `/187flow` | [187SKILLS.md](187SKILLS.md) |
| 187REPO | `/187repo` | [187SKILLS.md](187SKILLS.md), repo runbooks |
| 187CRAFT | `/187craft` | [187SKILLS.md](187SKILLS.md) |
| 187VIBE | `/187vibe` | [187SKILLS.md](187SKILLS.md) |
| 187LAUNCH | `/187launch` | [187PUBLISH.md](187PUBLISH.md) |
| 187FREE | `/187free` | [187FREE.md](187FREE.md) |
| 187RESEARCH | `/187research` | [187RESEARCH.md](187RESEARCH.md) |
| 187SEO | `/187seo` | [187SEO.md](187SEO.md) |
| 187REVENUE | `/187revenue` | [187REVENUE.md](187REVENUE.md) |
| 187DOCS | `/187docs` | [187DOCS.md](187DOCS.md) |
| 187WRITE | `/187write` | [187WRITE.md](187WRITE.md) |
| 187LEARN | `/187learn` | [187LEARN.md](187LEARN.md) |
| 187TEST | `/187test` | [187TEST.md](187TEST.md) |
| 187ACCESS+ | `/187access` | [187ACCESS.md](187ACCESS.md) |
| 187INCLUDE | `/187include` | [187INCLUDE.md](187INCLUDE.md) |
| 187VERSION | `/187version` | [187VERSION.md](187VERSION.md) |
| 187PUBLISH | `/187publish` | [187PUBLISH.md](187PUBLISH.md) |

## Templates and kits

The template system is surfaced through `/187 kit` and the `/templates` route. Kits include prefab demos, design tokens, module scaffolds, and pre-ship checklists. See [187-MODULES.md](187-MODULES.md) for module kits and [187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) for pack-level template bundles.

## Resilience states

The `/resilience` route demonstrates loading, empty, error, and offline states. These states are part of the 187WEB resilience design system and are wired into `loading.tsx`, `error.tsx`, and `not-found.tsx` at the app root.

## Install flow

The install flow begins at `/install` and is driven by `/187 pre`, `/187 cap`, `/187 pack`, and `/187 install`. See [INSTALL.md](INSTALL.md) for the full installation guide and [187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) for available profiles.

## Research lab tools

The research-lab ability provides scientific claim discipline, dataset cards, benchmarks, notebook protocols, provenance, and research release packaging. It is surfaced at `/187research` and through commands such as `/187 sci`, `/187 labs`, `/187 data`, `/187 bench`, and `/187 rrp`.

## Scenario chains

Example command chains that ship real artifacts:

```text
/187 craft design landing-page
/187 seo audit brief
/187 launch plan ph
/187 publish gate

/187 research climate-models deep
/187 labs protocol
/187 crate release packet

/187 free mvp hosting
/187 repo init --web
/187 kit apply landing
```

## See also

- [187WEB Slash Command Reference](187-COMMANDS.md)
- [187WEB Command Grammar](187-COMMAND-GRAMMAR.md)
- [187WEB Autocomplete](187-AUTOCOMPLETE.md)
- [187WEB CLI Selector](187-CLI-SELECTOR.md)
- [187WEB Install Profiles](187-INSTALL-PROFILES.md)
- [187WEB Modules](187-MODULES.md)
- [187SKILLS — Operating Layer](187SKILLS.md)
