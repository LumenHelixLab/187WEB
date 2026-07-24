
<!-- 187SKILLS first-class roster (release:validate) -->
<!-- 187REPO 187CRAFT 187CREATE 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187CHAIN 187GSAP 187TYPE 187MODEL 187SCROLL 187AUDIO 187VIZ 187MOTION 187HERO 187THEME 187AGENT-UI -->
# Install 187WEB

The fastest way to wire the 187WEB ecosystem into your environment.

- **Marketing page:** `/install`
- **Bash installer:** `install.sh`
- **PowerShell installer:** `install.ps1`

## Quick start

### Linux / macOS / Git Bash

```bash
git clone https://github.com/lumenhelixlab/187WEB.git
cd 187WEB
./install.sh
```

Then reload your shell and enable the `cd` hook:

```bash
source ~/.bashrc   # or ~/.zshrc
install-compiler-hook.sh
```

### Windows

```powershell
git clone https://github.com/lumenhelixlab/187WEB.git
cd 187WEB
.\install.ps1
```

Then enable the `cd` hook:

```powershell
.\install-compiler-hook.ps1
```

## Command grammar

After install, the 187WEB command grammar is:

```text
187 <alias> [target] [mode] [depth]
```

- **Workflow modes:** `solo` (default), `assist`, `flow`, `release`
- **Output depths:** `brief` (default), `report`, `deep`

Examples:

```text
187 craft landing-page assist report
187 seo audit brief
187 publish release deep
```

A named skill or alias runs **solo + brief** by default. Use `assist` only when one helper is useful, `flow` for broader multi-surface work, and `release` for version/docs/publish synchronization.

## Local repo CLI

From the repository root you can also use the standalone `187` CLI without installing to `~/.187web`:

```bash
./scripts/187.sh help
./scripts/187.sh seo landing brief
node scripts/187-complete.mjs --line "/187 se" --cursor 7 --json
```

On Windows:

```powershell
.\scripts\187.ps1 help
.\scripts\187.ps1 seo landing brief
node scripts\187-complete.mjs --line "/187 se" --cursor 7 --json
```

Shell completions live in `scripts/completions/` for bash, zsh, fish, and PowerShell.

## Short-name suite

After install, the following short-name entry points are on your PATH. Run `187repo.sh full` (or `.\187repo.ps1 full`) to print every skill back-to-back.

| Alias | Resolves to | Purpose |
|---|---|---|
| `187` / `cmd` | **187COMMAND** | Direct intent to action |
| `rpt` / `rep` | **187REPORT** | Explain, summarize, status |
| `scan` / `aud` | **187SCAN** | Inspect, audit, detect |
| `kit` / `tpl` / `demo` | **187KIT** | Equip templates and scaffolds |
| `std` / `qual` | **187STANDARD** | Judge against standards |
| `flow` / `go` | **187FLOW** | Plan, route, sequence |
| `repo` / `rp` | **187REPO** | Orchestration, manifest compiler, GitHub deploy |
| `craft` / `ui` | **187CRAFT** | Design + frontend |
| `vibe` / `vx` | **187VIBE** | Delight + community |
| `ship` / `launch` | **187LAUNCH** | Go-to-market intelligence |
| `free` / `fr` | **187FREE** | No-cost stack and free-tier optimization |
| `res` / `src` | **187RESEARCH** | Source-backed research and evidence synthesis |
| `seo` / `search` | **187SEO** | Ethical, sustainable search optimization |
| `rev` / `money` | **187REVENUE** | Ethical revenue and monetization planning |
| `docs` / `doc` | **187DOCS** | Living documentation architecture |
| `write` / `wrt` | **187WRITE** | Drafting assistant |
| `learn` / `edu` | **187LEARN** | Curriculum and knowledge capture |
| `test` / `quiz` | **187TEST** | Assessment, QA, and eval gates |
| `ax` / `a11y` | **187ACCESS+** | Accessibility and inclusive design |
| `inc` / `incl` | **187INCLUDE+** | Identity-safe, inclusive language |
| `ver` / `v` | **187VERSION** | Versioning, tagging, and release metadata |
| `pub` / `sync` | **187PUBLISH** | Release sync and distribution |
| `gsap` / `gst` | **187GSAP** | GSAP timeline + ScrollTrigger foundation |
| `type` / `typ` | **187TYPE** | Kinetic / variable 3D typography |
| `model` / `mdl` | **187MODEL** | 3D product showcase / configurator |
| `scroll` / `scr` | **187SCROLL** | Scroll-driven 3D camera narratives |
| `audio` / `aud` | **187AUDIO** | Audio-reactive 3D geometry |
| `viz` / `vz` | **187VIZ** | 3D network / node-edge data visualization |
| `motion` / `mot` | **187MOTION** | Reusable R3F/GSAP animation hooks |
| `hero` / `hr` | **187HERO** | Full-screen immersive 3D hero systems |
| `theme` / `thm` | **187THEME** | Motion theming, visual systems, and environment orchestration |

See `docs/187-NAMES.md` and `config/187-aliases.json` for the complete alias map.

## Charlotte modules

Five coordination modules live beside the core suite:

```text
THREAD  = prompt shaping, intent extraction, rewrite, refactor
TUNE    = model behavior, output profile, inference settings
CORD    = coordinated role dispatch, expert persona routing
CHAR    = Charlotte shared scout, web/source/context helper
LAB     = local action box, isolated execution/test workspace
```

Module aliases:

| Alias | Resolves to | Legacy alias |
|---|---|---|
| `thread` / `th` | **THREAD** | `widow-weaver` |
| `tune` / `tu` | **TUNE** | `neuro-toxin` |
| `cord` / `co` | **CORD** | `swarm-mind` |
| `char` / `ch` | **CHAR** | `agent-charlotte` |
| `lab` / `lb` | **LAB** | `silk-sandbox` |

See `docs/187-MODULES.md`.

## What gets installed

- `~/.187web/prompts/MANIFEST.xml` — the 27-prompt master manifest.
- `~/.187web/bin/187web-compiler.sh` / `.ps1` — the hardware-aware compiler.
- `~/.187web/bin/install-compiler-hook.sh` / `.ps1` — the optional shell hook installer.
- `~/.187web/bin/187repo.sh` / `.ps1` — short-name orchestration menu for the full 187SKILLS suite.
- `~/.187web/bin/187power.sh` / `.ps1` — GitHub surgical-strike deploy script.
- `~/.187web/bin/187init.sh` / `.ps1` — local scaffold generator.
- A PATH entry so all of the above are available everywhere.

## Environment variables

| Variable | Purpose |
|---|---|
| `E187WEB_POWER_MODE` | Force `high`, `low`, or `standard` power mode. |
| `E187WEB_CWD` | Override the directory used for folder routing. |
| `E187WEB_RELAY_URL` | Telemetry relay URL (default `http://localhost:18780`). |

## Updating

Pull the latest changes and rerun the installer:

```bash
git pull
./install.sh
```

## Uninstalling

Remove the installed files and the hook:

```bash
rm -rf ~/.187web
```

On Windows, also remove `%USERPROFILE%\.187web` from your user PATH.
