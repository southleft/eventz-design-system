# 🤖 AGENTS.md – AI Agent Integration Guide

This monorepo is designed to support AI-assisted workflows through a toolchain called `@doxyz/mcp`. This document outlines how agents should interact with the repository: where to read from, where to write to, and how to operate safely.

---

## 🧠 Agent Roles & Responsibilities

AI agents using `@doxyz/mcp` are expected to:

- Read component blueprints from `/packages/blueprints`
- Generate new components into `/packages/core/src/components`
- Avoid modifying existing components unless instructed
- Never write to `/packages/core` unless using `mcp` tools

---

## 📦 Package Directory Overview

| Directory              | Agent Role            | Notes                                                         |
| ---------------------- | --------------------- | ------------------------------------------------------------- |
| `/packages/blueprints` | ✅ **Read**            | Contains `*.contract.ts` and `*.styleMap.ts` definitions      |
| `/packages/mcp`        | ✅ **Use**             | Provides the CLI or programmatic tools (`generate_component`) |
| `/packages/core`       | ✅ **Write via tools** | Output for generated components; read-only otherwise          |

---

## 🛠️ Contracts & Style Maps

- **Contracts** are defined via `defineContract()` in `*.contract.ts` files
- **Style maps** are defined via `defineStyleMap()` in `*.styleMap.ts` files
- Both live in `/packages/blueprints`
- These act as the *single source of truth* for component generation

---

## ✨ Generation Workflow

When instructed to generate a component:

1. Use the blueprint from `/packages/blueprints`
2. Run `generate_component('ComponentName')` via MCP
3. Output should be written to:
   `/packages/core/src/components/ComponentName/`

Do not create or overwrite blueprints unless explicitly instructed.

---

## 🧪 Test Generation

To generate a Jest test file, agents should use:

```ts
generate_test('ComponentName')
```

This will produce:
`/packages/core/src/components/ComponentName/__tests__/ComponentName.test.tsx`

---

## ✅ Agent Pull Request Protocol

When opening a pull request, agents must:

1. **Prefix the PR title with `🤖`**
   Example: `🤖 Generate Dialog component`

2. **Include the following checklist in the PR body**:
   ```md
   ### 🤖 Agent PR Checklist

   - [ ] Component was generated using `@doxyz/mcp`
   - [ ] Diff has been reviewed against existing source (if any)
   - [ ] StyleMap and Contract files were not modified
   - [ ] PR contains no unrelated changes
   - [ ] Label: `needs-human-review`
   ```

3. **Assign to a human maintainer**
   If known, assign to a relevant maintainer for review.

4. **Avoid auto-merge**
   PRs from agents should always require human approval and manual merge.

---

## 🧭 Future Extensions

- Agents may eventually support generating **composite components** into new packages like `@doxyz/event-card`
- When doing so, follow the same blueprint-based process, but update generation paths accordingly

---

## 🙋 Need Help?

Humans can review contracts, style maps, and tooling if an agent gets stuck. Label such PRs with `needs-human-assist`.
