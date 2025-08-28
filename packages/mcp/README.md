# @doxyz/mcp

The MCP (Model–Contract–Prompt) server and CLI tools for generating UI components from contracts and style maps.

## Purpose

This package provides:

- A CLI for generating component files
- A CI-safe diffing and regeneration layer
- Utilities for testing, validating, and managing component blueprints

## Commands

```bash
# Generate a single component
pnpm mcp generate DialogWithHeading

# Generate all components
pnpm mcp generate-all

# Run test generation for a component
pnpm mcp generate-test DialogWithHeading
```

## API

- `generate_component(name: string)`
- `generate_all_components()`
- `generate_test(name: string)`
- `diff_components()`

## File Structure

- `/src/tools/` — Generation logic and file writers
- `/src/utils/` — Checksum, diff, and validation helpers
- `/src/templates/` — Code rendering templates

## Notes

- Consumes files from `@doxyz/blueprints`
- Outputs to `@doxyz/core` (or other configured targets)
