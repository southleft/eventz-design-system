# 🤖 AGENTS.md – @eventz-ui/core

This file defines how AI agents interact with the `@eventz-ui/core` package, which houses the core component library and Tailwind configuration used by the MCP server.

---

## 📦 Package Purpose

`@eventz-ui/core` contains:

- Primitives and foundational UI components (e.g., Button, Dialog)
- Tailwind configuration and token mappings
- Generated components created from blueprints in `@eventz-ui/blueprints`

---

## 🤖 Agent Responsibilities

Agents working in this package must:

- Generate components **only** via the MCP pipeline (`generate_component('Dialog')`)
- Read contracts and style maps from `@eventz-ui/blueprints`
- Write generated code to `src/components/`
- Avoid overwriting existing hand-written components
- Use local relative imports when referencing other core components (e.g., `../Button`)

---

## 🛠️ Generation Rules

- Generated components must include a header comment indicating AI origin
- Components must use classnames from the styleMap provided
- Tailwind classes must resolve to design tokens where available
- Props, slots, and patterns must match the associated contract

---

## 🎨 Theming & Tokens

- Dark mode is the default
- Light mode is applied via overrides
- Do not generate theme switchers — they live in the host app
- Tailwind tokens are defined via CSS variables in the global scope (`:root`)
- Tokens are mapped in `tailwind.config.ts → theme.extend`

---

## ✅ Pull Request Protocol

When submitting a PR with generated components:

1. **Title must include `✨ Generate:` prefix**
   Example: `✨ Generate: Add Dialog component from blueprint`

2. **PR description must confirm:**
   ```md
   - [ ] Generated using up-to-date contract + styleMap
   - [ ] Tailwind classes match blueprint mapping
   - [ ] Component tested and renders correctly
   ```

3. **Assign to a human reviewer and label with `needs-human-review`**

---

## 🧠 Notes for Human Reviewers

- Confirm code structure matches MCP output guidelines
- Check that classnames align with token mappings
- Verify that contracts haven’t drifted since last generation
- Consider locking versions if importing externally from this package
