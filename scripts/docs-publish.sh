#!/usr/bin/env bash
#
# Publish the Eventz docs (docs/) to the Company Docs MCP Supabase store.
# Runnable from the repo root via: pnpm docs:publish  (pass --dry-run to preview)
#
# Handles the two friction points so it "just works":
#   1. Resolves a Cloudflare token for Workers-AI embeddings from your wrangler login.
#   2. Polyfills global WebSocket so it runs on Node 20 (no Node 22 needed).
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MCP="$ROOT/docs-mcp"
DOCS="$ROOT/docs"

if [ ! -d "$MCP/node_modules" ]; then
  echo "✗ docs-mcp dependencies not installed. Run: npm --prefix \"$MCP\" install --legacy-peer-deps" >&2
  exit 1
fi

# 1. Cloudflare token for Workers-AI embeddings.
#    Refresh the wrangler session, then read its OAuth token (unless already set).
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  ( cd "$MCP" && npx --no-install wrangler whoami >/dev/null 2>&1 ) || true
  WCFG="$HOME/Library/Preferences/.wrangler/config/default.toml"
  [ -f "$WCFG" ] || WCFG="$HOME/.config/.wrangler/config/default.toml"
  if [ -f "$WCFG" ]; then
    CLOUDFLARE_API_TOKEN="$(grep -oE '^oauth_token = "[^"]+"' "$WCFG" 2>/dev/null | sed -E 's/.*"([^"]+)".*/\1/')"
    export CLOUDFLARE_API_TOKEN
  fi
fi
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "⚠  No Cloudflare token found. Run 'npx wrangler login' (from docs-mcp/) or set CLOUDFLARE_API_TOKEN in docs-mcp/.env." >&2
fi

cd "$MCP"

echo "→ Parsing Markdown from $DOCS"
npm run --silent ingest:markdown -- --dir="$DOCS"
npm run --silent manifest

echo "→ Embedding + publishing to Supabase"
NODE_OPTIONS="--require $MCP/scripts/ws-polyfill.cjs ${NODE_OPTIONS:-}" \
  node_modules/.bin/tsx scripts/ingest/ingest-supabase.ts "$@"

echo "✓ Publish complete"
