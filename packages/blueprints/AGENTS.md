# 🤖 AGENTS.md – @doxyz/blueprints

This file outlines how AI agents interact with the `@doxyz/blueprints` package, which contains component **contracts** and **style maps** used by the MCP server for component generation.

---

## 📦 Package Purpose

`@doxyz/blueprints` contains structured design intent in the form of:

- `*.contract.ts` files: describe the structure and semantics of UI components
- `*.styleMap.ts` files: map tokens to Tailwind utility classes and variants

These blueprints serve as the **source of truth** for component generation.

---

## 🤖 Agent Responsibilities

Agents working in this package must:

- Use `defineContract()` and `defineStyleMap()` to define blueprints
- Keep contracts and style maps in sync (e.g., `Dialog.contract.ts` and `Dialog.styleMap.ts`)
- Avoid writing implementation code — this package contains no UI code
- Avoid re-generating existing files unless prompted or diff-aware

---

## 🛠️ Generation Rules

- All blueprint files must be located in `src/components/ComponentName` and named `ComponentName.contract.ts` and `ComponentName.styleMap.ts`
- Blueprint definitions **must be static** — do not call code, fetch, or generate at runtime
- Contracts should express inputs, slots, and composition expectations
- Style maps should express mode/theme-aware classnames using Tailwind and token-based variables

---

## ✅ Pull Request Protocol

When submitting a PR that modifies or adds blueprints:

1. **Title must include `🧩 Blueprint:` prefix**
   Example: `🧩 Blueprint: Add Accordion.contract.ts`

2. **PR description must confirm:**
   ```md
   - [ ] Contract and styleMap are aligned
   - [ ] Follows naming and file structure conventions
   - [ ] No implementation code added
   ```

3. **Assign to a human reviewer and label with `needs-human-review`**

---

## 🧠 Notes for Human Reviewers

- Confirm blueprint structure reflects current design and token standards
- Blueprint changes may affect downstream component generation
- Suggest locking versions when bumping blueprint logic or adding constraints
