# @doxyz-ui/blueprints

This package contains contracts and style maps used by the MCP server to generate component source code.

## Contents

- `*.contract.ts` — TypeScript-based contracts describing component structure and props.
- `*.styleMap.ts` — Utility class and token mappings for component styling.
- Optional: prompt templates or metadata used by AI agents.

## Usage

Contracts and style maps are **not executed directly**. Instead, they are consumed by the `@doxyz-ui/mcp` package to generate and validate component code.

### Example

```ts
import { defineContract } from '@doxyz-ui/mcp';

export default defineContract({
  componentName: 'DialogWithHeading',
  description: 'A Dialog with a heading and body text.',
  props: {
    title: { type: 'string', required: true },
    open: { type: 'boolean', default: false },
  },
});
```

## Notes

- This package is **not published to NPM**. It serves as a local source of truth.
- Used by both developers (via scripts) and AI agents (as context).
