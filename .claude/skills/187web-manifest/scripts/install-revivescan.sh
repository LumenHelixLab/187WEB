#!/usr/bin/env bash
# install-revivescan.sh — Phase I zsh/bash hook: recompile on cd
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPILER="${SCRIPT_DIR}/187web-compiler.sh"
MARKER="# 187web revivescan"

usage() {
  echo "Usage: install-revivescan.sh [--uninstall]"
}

UNINSTALL=0
[[ "${1:-}" == "--uninstall" ]] && UNINSTALL=1

detect_rc() {
  if [[ -n "${ZSH_VERSION:-}" ]] || [[ "$SHELL" == *zsh* ]]; then
    echo "${HOME}/.zshrc"
  else
    echo "${HOME}/.bashrc"
  fi
}

RC="$(detect_rc)"

if [[ "$UNINSTALL" -eq 1 ]]; then
  if [[ -f "$RC" ]] && grep -q "$MARKER" "$RC"; then
    sed -i.bak "/$MARKER/,/^$/d" "$RC" 2>/dev/null || \
      sed -i '' "/$MARKER/,/^$/d" "$RC"
    echo "Removed revivescan from $RC"
  else
    echo "No revivescan hook in $RC"
  fi
  exit 0
fi

if [[ -f "$RC" ]] && grep -q "$MARKER" "$RC"; then
  echo "Revivescan already installed in $RC"
  exit 0
fi

chmod +x "$COMPILER"

cat >>"$RC" <<EOF

$MARKER
_187web_revivescan() {
  command -v "$COMPILER" >/dev/null 2>&1 || return 0
  "$COMPILER" --quiet --write --emit >/dev/null 2>&1 &
}
if [[ -n "\${ZSH_VERSION:-}" ]]; then
  chpwd_functions+=(_187web_revivescan)
else
  PROMPT_COMMAND="_187web_revivescan;\${PROMPT_COMMAND:-:}"
fi
EOF

echo "Installed revivescan → $RC"
echo "Reload: source $RC"