# Install 187web

The fastest way to wire the 187web ecosystem into your environment.

- **Marketing page:** `/install`
- **Bash installer:** `install.sh`
- **PowerShell installer:** `install.ps1`

## Quick start

### Linux / macOS / Git Bash

```bash
git clone https://github.com/lumenhelixsolutions/187webDESIGN.git
cd 187webDESIGN
./install.sh
```

Then reload your shell and enable the `cd` hook:

```bash
source ~/.bashrc   # or ~/.zshrc
install-compiler-hook.sh
```

### Windows

```powershell
git clone https://github.com/lumenhelixsolutions/187webDESIGN.git
cd 187webDESIGN
.\install.ps1
```

Then enable the `cd` hook:

```powershell
.\install-compiler-hook.ps1
```

## What gets installed

- `~/.187web/prompts/MANIFEST.xml` — the 27-prompt master manifest.
- `~/.187web/bin/187web-compiler.sh` / `.ps1` — the hardware-aware compiler.
- `~/.187web/bin/install-compiler-hook.sh` / `.ps1` — the optional shell hook installer.
- A PATH entry so `187web-compiler.sh` / `187web-compiler.ps1` are available everywhere.

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
