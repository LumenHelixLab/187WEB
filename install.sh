#!/usr/bin/env bash
# 187web cross-platform installer for Linux, macOS, and Git Bash on Windows.
# Run from the root of the cloned 187webdesign repository.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN_DIR="${HOME}/.187web/bin"
PROMPTS_DIR="${HOME}/.187web/prompts"
PATH_MARKER="# 187web PATH"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║         187web CLI installer         ║"
echo "╚══════════════════════════════════════╝"
echo ""

mkdir -p "$BIN_DIR" "$PROMPTS_DIR"

echo "→ Installing manifest registry..."
cp "$REPO_DIR/.claude/skills/187web-manifest/references/MANIFEST.xml" "$PROMPTS_DIR/"

echo "→ Installing compiler and hook scripts..."
cp "$REPO_DIR/.claude/skills/187web-manifest/scripts/187web-compiler.sh" "$BIN_DIR/"
cp "$REPO_DIR/.claude/skills/187web-manifest/scripts/install-compiler-hook.sh" "$BIN_DIR/"
chmod +x "$BIN_DIR/187web-compiler.sh" "$BIN_DIR/install-compiler-hook.sh"

detect_rc() {
  if [[ -n "${ZSH_VERSION:-}" ]] || [[ "${SHELL:-}" == *zsh* ]]; then
    echo "${HOME}/.zshrc"
  else
    echo "${HOME}/.bashrc"
  fi
}

RC="$(detect_rc)"
if [[ ! -f "$RC" ]]; then
  touch "$RC"
fi

if ! grep -qF "$BIN_DIR" "$RC"; then
  echo "→ Adding $BIN_DIR to PATH in $RC..."
  {
    echo ""
    echo "$PATH_MARKER"
    echo "export PATH=\"$BIN_DIR:\$PATH\""
  } >> "$RC"
else
  echo "→ $BIN_DIR is already on PATH."
fi

echo ""
echo "✓ 187web installed to $BIN_DIR"
echo ""
echo "Next steps:"
echo "  1. Reload your shell:  source $RC"
echo "  2. Install the cd hook:  install-compiler-hook.sh"
echo "  3. Run the compiler:     187web-compiler.sh --list"
echo ""
