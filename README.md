# Eventz Design System

A demo design system for **event-based applications**, built by [Southleft](https://southleft.com) and used for design-system workshops.

Eventz is a React component library with a token-driven theming layer, Storybook documentation, and an MCP-friendly "blueprints" package for AI-assisted component generation. It is intentionally production-shaped so it can be used as a realistic teaching example.

> **Note:** Eventz is a workshop/demo design system. It is derived from a real client design system and re-skinned with a neutral "Eventz" brand. It is not affiliated with any production product.

---

## Packages

This is a [pnpm](https://pnpm.io/) workspace monorepo.

| Package | Description |
| --- | --- |
| [`@eventz-ui/core`](./packages/core) | The component library: React + Radix UI primitives, Tailwind CSS, and design tokens. Ships Storybook docs. |
| [`@eventz-ui/blueprints`](./packages/blueprints) | Component contracts and style maps used for MCP-based component generation. |

---

## Tech stack

- **[React](https://react.dev/)** (18+) with server/client component split
- **[Radix UI](https://www.radix-ui.com/)** primitives
- **[Tailwind CSS](https://tailwindcss.com/)** (v4) for utilities
- **[Style Dictionary](https://styledictionary.com/)** for design tokens (`styles/tokens/*.json` → CSS custom properties)
- **[Storybook](https://storybook.js.org/)** (v9) for documentation and visual review
- **[Geist](https://vercel.com/font)** as the primary typeface

---

## Design tokens

Tokens are the source of truth for the visual language and are authored as JSON under
`packages/core/styles/tokens/`:

- `core/Default.json` — primitive values (color ramps, spacing, radii, shadows, typography)
- `theme/Light.json` / `theme/Dark.json` — semantic, theme-aware aliases

Running the token build regenerates the CSS custom properties consumed by components:

```bash
pnpm build:tokens
```

The Eventz brand is a **teal** ramp (`--dt-color-brand-500: #3d7a95`); typography uses **Geist**.
Spacing, border radii, shadows, and the neutral/utility palettes follow standard design-system scales.

---

## Getting started

```bash
# install (requires Node >= 20 and pnpm)
pnpm install

# run Storybook (component docs + playground)
pnpm sb

# build the library
pnpm build

# type-check / lint / test
pnpm type-check
pnpm lint
pnpm test
```

Storybook runs on [http://localhost:6006](http://localhost:6006) by default.

---

## Documentation MCP

Eventz ships a **Company Docs MCP** server so AI tools can query the design-system documentation.
Component docs are authored in [`docs/`](./docs) and published to a Supabase vector store; the tooling
is vendored in [`docs-mcp/`](./docs-mcp). The live endpoint is wired up in [`.mcp.json`](./.mcp.json):

```
https://eventz-docs-mcp.southleft-llc.workers.dev/mcp
```

See [`docs/README.md`](./docs/README.md) for the authoring + publishing workflow.

## License

MIT © Southleft
