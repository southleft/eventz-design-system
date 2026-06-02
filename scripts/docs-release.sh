#!/usr/bin/env bash
#
# Release the Eventz docs to BOTH consumers from one source:
#   1. Sync Mintlify nav  — add any new docs/components/*.md to docs.json
#   2. Company Docs MCP   — embed + upsert docs into Supabase (vector search)
#   3. Mintlify site      — commit docs/ + push so the connected site rebuilds
#
# Usage (from repo root):
#   pnpm docs:release                 # default commit message
#   pnpm docs:release "your message"  # custom commit message
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MSG="${1:-docs: publish docs update}"

echo "═══════════════════════════════════════════════════════"
echo "  1/3 · Syncing Mintlify nav (docs/docs.json)"
echo "═══════════════════════════════════════════════════════"
node "$ROOT/scripts/sync-docs-nav.mjs"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  2/3 · Publishing to the Company Docs MCP (Supabase)"
echo "═══════════════════════════════════════════════════════"
bash "$ROOT/scripts/docs-publish.sh"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  3/3 · Releasing to the Mintlify site (git push)"
echo "═══════════════════════════════════════════════════════"
cd "$ROOT"
git add docs/

if git diff --cached --quiet -- docs/; then
  echo "No docs/ changes to push — the Mintlify site is already current."
else
  git commit -m "$MSG" -- docs/
  branch="$(git rev-parse --abbrev-ref HEAD)"
  if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
    git push
  else
    git push -u origin "$branch"
  fi
  echo "✓ Pushed '$branch' — Mintlify rebuilds the site from its connected branch."
fi

echo ""
echo "✓ Release complete — docs are searchable in the MCP and live on the site."
