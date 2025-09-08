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

## 🔍 Agent PR Review (Codex)

Codex (or any reviewing AI agent) should **review** PRs without running the toolchain locally. CI already runs lint, tests, build, and pack (dry‑run). The reviewer’s job is to read the diff, verify conformance to blueprints and repo conventions, and leave actionable comments.

### Scope of Review
- **Do not** run `lint`, `test`, `build`, or `pack`. Rely on GitHub CI for those checks.
- **Do** review:
  - File paths, names, and placement
  - Contract/styleMap adherence
  - Radix usage & `asChild` behavior
  - Tailwind class usage vs. styleMap
  - Accessibility patterns
  - Storybook stories & test coverage at a minimum bar

### Where to Look
- **Files changed** in the PR (diff view only)
- Blueprints in `/packages/blueprints` for the corresponding component
- Generated outputs in `/packages/core/src/components/<ComponentName>/`
- Styles entry at `/packages/core/styles/css/index.css` if typography/utilities are referenced

### Review Workflow (Steps)
1. **Identify the component(s)** in the PR title/body and confirm destination:
   - Must live in: `/packages/core/src/components/<ComponentName>/`
   - File set must include:
     - `/<ComponentName>.tsx`
     - `/<ComponentName>.stories.tsx`
     - `/<ComponentName>.test.tsx` (or in `__tests__/`)
2. **Load blueprints**:
   - Contract: `/packages/blueprints/<ComponentName>.contract.ts`
   - Style map: `/packages/blueprints/<ComponentName>.styleMap.ts`
3. **Verify contract conformance**:
   - Props: no additions beyond contract; types match; defaults honored
   - Slots/layout: matches `contract.layout` structure (e.g., content wrapper for icon+label)
   - Radix: use `contract.base` primitive; support `asChild` via `@radix-ui/react-slot` if declared
   - Events: callback signatures match contract
4. **Verify style map conformance**:
   - Variants and compound variants: classes exactly match styleMap entries
   - No unused/undefined classes introduced
   - Uses `clsx/cx` (no string concatenation) if prescribed
5. **Accessibility checks** (baseline):
   - Decorative icons `aria-hidden="true"`
   - Label/slot semantics intact (`role`, `aria-*` as needed by the contract)
   - No color‑only state communication
6. **Storybook**:
   - Default export: `title: 'Components/<ComponentName>'`, `component: <ComponentName>`
   - Stories use controls for public props
   - Example shows each variant defined in styleMap
7. **Tests**:
   - Jest + React Testing Library
   - Cover: render without crash; slot presence; variant class switch; key a11y attributes
   - Prefer role/text queries; avoid brittle snapshots
8. **Changelog discipline**:
   - PR title starts with `🤖` (agent)
   - PR body includes the Agent PR Checklist (see above)
   - No unrelated file changes

### Comment Templates (copy/paste)
- **Contract mismatch**
  > The prop set in the component differs from the contract: `<propName>`. Please align with `/packages/blueprints/<ComponentName>.contract.ts` and update tests/stories accordingly.

- **StyleMap drift**
  > The classes for variant `<variantName>` do not match the styleMap. Expected: `<expectedClasses>`. Found: `<actualClasses>`. Please sync the component with `/packages/blueprints/<ComponentName>.styleMap.ts`.

- **Radix base missing**
  > The contract declares `base: '<Primitive>'`, but the component doesn’t wrap Radix `<Primitive>`. Please refactor to use the Radix primitive and support `asChild` if specified.

- **A11y: decorative icon**
  > Icon appears decorative; please set `aria-hidden="true"` and ensure text label is present for screen readers.

- **Story coverage**
  > Not all variants from the styleMap are represented in stories. Please add stories for: `<missingVariants>`.

- **Test coverage**
  > Tests are missing assertions for variant classes and/or slot presence. Please add RTL tests covering these cases.

### Acceptance Criteria for Approval
- Component strictly matches contract/slots/layout
- Classes strictly match styleMap (including compound variants)
- Radix usage + `asChild` behavior correct
- Stories and tests present and minimal bar met
- CI is green (lint/test/build/pack), but **review does not run CI locally**


## 🧭 Future Extensions

- Agents may eventually support generating **composite components** into new packages like `@doxyz/event-card`
- When doing so, follow the same blueprint-based process, but update generation paths accordingly

---

## 🙋 Need Help?

Humans can review contracts, style maps, and tooling if an agent gets stuck. Label such PRs with `needs-human-assist`.
