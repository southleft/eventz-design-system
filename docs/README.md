# Eventz Documentation (Company Docs MCP)

This `docs/` folder is the **doc root** for the Eventz design system. Markdown files here are
ingested, embedded, and pushed into a Supabase vector database, then served to AI tools through a
dedicated **Company Docs MCP** endpoint.

The MCP tooling is vendored in [`../docs-mcp/`](../docs-mcp) (a configured copy of
[`southleft/company-docs-mcp`](https://github.com/southleft/company-docs-mcp)).

## How docs are authored

Component docs are generated from the **Eventz Figma library** using the Figma Console MCP
`figma_generate_component_doc` tool, then lightly curated into the house style (see
[`components/button.md`](components/button.md) as the template). Each file carries YAML frontmatter:

```markdown
---
title: Button
description: One-line summary used for search relevance.
category: components
tags: [button, action, variants]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/...?node-id=2313-42
source: packages/core/src/components/client/Button/Button.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-05-31
---
```

Frontmatter is optional but recommended — it drives category/tags and search quality.

## Publishing workflow

Run these from the **repo root** — no need to `cd` into `docs-mcp/`:

```bash
# Preview what would change (no writes)
pnpm docs:preview

# Embed (Cloudflare Workers AI) + push vectors to Supabase
pnpm docs:publish

# Just parse the doc root into intermediate entries (no publish)
pnpm docs:ingest
```

`pnpm docs:publish` parses `docs/`, regenerates the manifest, embeds, and upserts to Supabase in one
step. Only changed entries are re-embedded (content-hash diffing); removed docs are cleaned up. Pass
extra flags through after `--`, e.g. `pnpm docs:publish -- --clear` to wipe + re-ingest from scratch.

The two former gotchas are handled automatically by [`scripts/docs-publish.sh`](../scripts/docs-publish.sh):

- **Node version** — `@supabase/supabase-js` needs a `WebSocket` global (native only on Node 22+).
  The script preloads a `ws` polyfill (`docs-mcp/scripts/ws-polyfill.cjs`) so it runs on the project's
  default Node 20.
- **Cloudflare token** — embedding uses the Workers-AI REST API. The script refreshes your
  `wrangler` session and reads its OAuth token automatically. (To override, set
  `CLOUDFLARE_API_TOKEN` in `docs-mcp/.env` or the environment.)

Supabase credentials still come from `docs-mcp/.env` (gitignored).

## The MCP endpoint

The Eventz MCP server is the Cloudflare Worker `eventz-docs-mcp` (Southleft account). Once deployed,
its endpoint is:

```
https://eventz-docs-mcp.<subdomain>.workers.dev/mcp
```

Add it to an MCP client (Claude Code, Cursor, etc.) — see the root `.mcp.json`. It exposes the tools
`search_documentation`, `search_chunks`, `browse_by_category`, and `get_all_tags`.

## Adding a new component doc

1. In Figma (Eventz library connected via the Figma Console MCP), find the component's node id.
2. Generate: `figma_generate_component_doc` with `nodeId`, `systemName: "Eventz"`, and `codeInfo`
   (package, import, source path).
3. Curate into `docs/components/<name>.md` matching the template.
4. Publish with the workflow above.
