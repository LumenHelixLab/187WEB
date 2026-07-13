# 187WEB Slash Command Reference

Canonical grammar:

```text
/187 <alias|command> [target] [mode] [depth]
```

CLI equivalent:

```text
187 <alias|command> [target] [mode] [depth]
```

Default behavior:

```text
named alias -> solo + brief
ambiguous /187 -> menu or compact report
```

Modes:

```text
solo
assist
flow
release
```

Depth:

```text
brief
report
deep
```

## Full reference

| Command | Alias | ID | Status | Purpose |
|---|---:|---|---|---|
| `/187` | `187` | `187COMMAND` | core | Open the universal 187WEB command surface. |
| `/187 menu` | `menu` | `187MENU` | selector | Interactive tool breakdown. |
| `/187 sel` | `sel` | `187SELECT` | selector | Select skills, agents, abilities, profiles, or packs. |
| `/187 ac` | `ac` | `187AUTO` | selector | Autocomplete and command suggestions. |
| `/187 pre` | `pre` | `187PREFLIGHT` | selector | Run install/onboarding preflight. |
| `/187 cap` | `cap` | `187CAP` | selector | Detect local capability and runtime status. |
| `/187 pack <name>` | `pack` | `187PACK` | selector | Explain or install a curated pack. |
| `/187 install <alias|pack>` | `install` | `187PACK` | selector | Install one skill, agent, ability, module, profile, pack, or full suite after a plan. |
| `/187 doctor` | `doctor` | `187CAP` | selector | Check repo, docs, adapters, build, and capability health. |
| `/187 cmd` | `cmd` | `187COMMAND` | core | Route ambiguous or universal requests. |
| `/187 rpt` | `rpt` | `187REPORT` | core | Create a compact report, audit, or approval artifact. |
| `/187 scan` | `scan` | `187SCAN` | core | Inspect repo, site, docs, app, or external surface. |
| `/187 kit` | `kit` | `187KIT` | core | Use templates, prefab demos, and reusable kits. |
| `/187 std` | `std` | `187STANDARD` | core | Score against 187WEB quality standards. |
| `/187 flow` | `flow` | `187FLOW` | core | Turn a goal into a scoped workflow. |
| `/187 kern` | `kern` | `187KERNEL` | core | Show the shared lifecycle contract. |
| `/187 repo` | `repo` | `187REPO` | core | Repo structure, orchestration, installers, deployment, GitHub Pages. |
| `/187 craft` | `craft` | `187CRAFT` | core | Design, UX, frontend, components, polish. |
| `/187 vibe` | `vibe` | `187VIBE` | core | Onboarding, delight, retention, community UX. |
| `/187 ship` | `ship` | `187LAUNCH` | core | Launch strategy, campaign planning, outreach. |
| `/187 free` | `free` | `187FREE` | core | Free-tier and open-source solution planning. |
| `/187 res` | `res` | `187RESEARCH` | core | Research, source maps, evidence collection. |
| `/187 seo` | `seo` | `187SEO` | core | Search visibility, metadata, content readiness. |
| `/187 rev` | `rev` | `187REVENUE` | core | Pricing, revenue ops, offers, commerce workflows. |
| `/187 docs` | `docs` | `187DOCS` | core | README, SOP, API docs, implementation docs. |
| `/187 write` | `write` | `187WRITE` | core | Copywriting, editing, plain language, content structure. |
| `/187 learn` | `learn` | `187LEARN` | core | Courses, lessons, study paths, education flows. |
| `/187 test` | `test` | `187TEST` | core | Tests, quizzes, rubrics, QA checks. |
| `/187 ax` | `ax` | `187ACCESS+` | core | Accessibility, disability access, inclusive UX. |
| `/187 inc` | `inc` | `187INCLUDE` | core | Inclusive language, identity-safe copy, representation checks. |
| `/187 ver` | `ver` | `187VERSION` | core | SemVer, changelog, release notes, migration notes. |
| `/187 pub` | `pub` | `187PUBLISH` | core | Sync README, docs, demo, adapters, public launch surface. |
| `/187 th` | `th` | `THREAD` | module | Prompt shaping, intent extraction, rewrite/refactor. |
| `/187 tu` | `tu` | `TENSION` | module | Inference profile and model behavior tuning (legacy: TUNE). |
| `/187 co` | `co` | `CORD` | module | Expert role dispatch and specialist routing. |
| `/187 ch` | `ch` | `SCOUT` | module | Compliant research / source scout (legacy: CHAR). |
| `/187 lb` | `lb` | `LAB` | module | Local action box for commands, tests, and isolated runs. |
| `/187 handoff` | `handoff` / `ash` | `AGENTIC-HANDOFF` | workflow | Compile CORD plan into phased multi-agent coding handoff. |
| `/187 sci` | `sci` | `187SCI` | research | Scientific claim discipline and release gates. |
| `/187 labs` | `labs` | `187LABS` | research | Experiment protocols, lab templates, run logs. |
| `/187 data` | `data` | `187DATA` | research | Dataset cards, schemas, provenance, public DB workflows. |
| `/187 api` | `api` | `187API` | research | OpenAPI, public endpoints, examples, health/version routes. |
| `/187 bench` | `bench` | `187BENCH` | research | Benchmarks, evals, reproducibility tests. |
| `/187 nb` | `nb` | `187NB` | research | Notebook protocol and release checks. |
| `/187 colab` | `colab` | `187COLAB` | research | Google Colab execution profiles and notebook templates. |
| `/187 gap` | `gap` | `187GAP` | research | GAP computational algebra workflows. |
| `/187 meta` | `meta` | `187META` | research | Metadata, citation, identifiers, CodeMeta/DataCite spine. |
| `/187 prov` | `prov` | `187PROV` | research | Provenance, run lineage, source-to-result trace. |
| `/187 crate` | `crate` | `187CRATE` | research | RO-Crate and Research Release Packet packaging. |
| `/187 rrp` | `rrp` | `RRP` | research | Create a Research Release Packet. |
| `/187 vault` | `vault` | `187VAULT` | optional-pack | Open the Local Brain / Obsidian + Claudian kit. |
| `/187 vault init` | `vault init` | `187VAULT` | optional-pack | Create starter Obsidian vault structure. |
| `/187 vault sync` | `vault sync` | `187VAULT` | optional-pack | Sync templates, reports, docs, and bridge files. |

## Install rule

Preflight/onboarding supports individual install of any 187 skill, agent, module, agentic ability, research/tool profile, curated pack, or the full suite.

Do not treat `improves_with` as `requires`.
