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

Run from [`../docs-mcp/`](../docs-mcp) (uses the local `.env` for Supabase + Cloudflare creds):

```bash
cd docs-mcp

# 1. Parse this doc root into intermediate entries
npm run ingest:markdown -- --dir=../docs

# 2. Preview what will change (no writes)
npm run ingest:preview

# 3. Embed (Cloudflare Workers AI) + push vectors to Supabase
npm run ingest:supabase
#   add `-- --clear` to wipe + re-ingest from scratch (ingest:fresh)
```

Only changed entries are re-embedded (content-hash diffing); removed docs are cleaned up.

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
