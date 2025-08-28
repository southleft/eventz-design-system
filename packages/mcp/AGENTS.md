# AGENTS.md – @doxyz/mcp

This guide documents how AI agents should interact with the MCP package to generate components using blueprint contracts and style maps.

## Agent Scope

Agents may invoke MCP tools, but **must not** modify any source of truth files.

### ✅ Allowed
- Call `generateComponent('ComponentName')`
- Call `generateTest('ComponentName')`
- Submit Pull Requests to `/packages/core/src/components/`
- Operate only on existing contracts in `@doxyz/blueprints`

### ❌ Not Allowed
- Modifying files in `/packages/blueprints`
- Writing or modifying contracts or style maps
- Generating components without matching contract
- Committing directly to `main`

## Pull Request Protocol

- Each component must be committed in a separate PR unless explicitly grouped
- PR titles must follow: `feat(component): Add [ComponentName]`
- Use `[skip ci]` in commits if tests are not yet meaningful
- All generated files must be committed in the appropriate locations

## Package Responsibilities

The MCP package houses the execution logic for:

- Reading blueprint definitions
- Generating component source code
- Producing Jest-compatible tests
- Writing to `@doxyz/core`

## Guidance

Agents should treat MCP as a build system:
- Contracts = input
- Components = output

All authoring must originate from human-crafted blueprint contracts.
