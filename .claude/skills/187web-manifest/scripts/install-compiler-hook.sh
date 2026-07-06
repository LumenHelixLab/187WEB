#!/usr/bin/env bash
# install-compiler-hook.sh — install the 187web compiler hook into ~/.bashrc or ~/.zshrc
# The hook recompiles the active manifest prompt whenever the working directory changes.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPILER="${SCRIPT_DIR}/187web-compiler.sh"
MARKER="# 187web compiler hook"

usage() {
  echo "Usage: install-compiler-hook.sh [--uninstall]"
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
    echo "Removed 187web compiler hook from $RC"
  else
    echo "No 187web compiler hook in $RC"
  fi
  exit 0
fi

if [[ -f "$RC" ]] && grep -q "$MARKER" "$RC"; then
  echo "187web compiler hook already installed in $RC"
  exit 0
fi

chmod +x "$COMPILER"

cat >>"$RC" <<EOF

$MARKER
_187web_compiler_hook() {
  command -v "$COMPILER" >/dev/null 2>&1 || return 0
  "$COMPILER" --quiet --write --emit >/dev/null 2>&1 &
}
if [[ -n "\${ZSH_VERSION:-}" ]]; then
  chpwd_functions+=(_187web_compiler_hook)
else
  PROMPT_COMMAND="_187web_compiler_hook;\${PROMPT_COMMAND:-:}"
fi
EOF

echo "Installed 187web compiler hook → $RC"
echo "Reload: source $RC"
