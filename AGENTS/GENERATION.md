# 🏗️ Component Generation Guidelines for Agents

<!-- @agents:paths:start -->
### 📍 Canonical paths
- Components root: `packages/core/src/components/<ComponentName>/`
- Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
> Source: AGENTS/META.yml (version: 1)
<!-- @agents:paths:end -->

This document defines how AI agents should generate new components from blueprints in this repo.
It complements:
- 🔍 `AGENTS/CODE_REVIEW.md`
- 🔐 `AGENTS/PERMISSIONS.md`
- 🧾 `AGENTS/PR_PROTOCOL.md`
- 🧩 `AGENTS/STACK.md`

> **Radix Primitive Policy:** Components must wrap **Radix Primitives only** as their `base`.
> Radix Themes are **disallowed** as a `base`. All visual styling comes from our **styleMap** token classes.

---

## 📂 Inputs
See **Canonical paths** above for contract and styleMap locations.

---

## 📦 Outputs
Generated components must include all of the following:
- `/<ComponentName>.tsx` — React component implementing the contract + styleMap. Do not export prop type aliases; export only the named `<ComponentName>Props` interface from this file. This file **must export a named interface for props** (e.g., `<ComponentName>Props`), defined within the same file, matching the contract's prop definitions.
- `/<ComponentName>.stories.tsx` — Storybook stories covering all public props/variants
- `/<ComponentName>.test.tsx` (or `__tests__/`) — Jest + RTL tests for render, slots, variants, baseline a11y

All outputs belong under:
`/packages/core/src/components/<ComponentName>/`

---

## 🔄 Workflow
1. **Read contract + styleMap** to understand props, slots, variants, and Radix base.
2. **Generate component**:
   - Must wrap the **Radix Primitive** declared in the contract. **Radix Themes as a base are disallowed.**
   - Must support `asChild` if contract specifies.
   - Props and types must exactly match contract.
   - Class composition must use `composeClasses` with styleMap variants (`packages/core/src/utilities/composeClasses/composeClasses.ts`).
   > Note: This repo does not use `clsx`/`cx`. Always use the local `composeClasses.ts` utility to keep class composition within our type structure.
   - Prefer template literals (`` `...` ``) for static or inline className definitions. Avoid string concatenation (`+`) and arrays of strings joined into a className.
   - Accessibility: decorative icons → `aria-hidden="true"`, all interactive elements → accessible names.
   - For native elements (e.g., `<a>`, `<button>`, `<input>`), do not add custom event suppression or override native props (`tabIndex`, `rel`, etc.) unless the blueprint explicitly requires it.
3. **Generate stories**:
   - Default export: `title: 'Components/<ComponentName>'`
   - Include stories for all styleMap variants.
   - Use Storybook controls for all public props.
4. **Generate tests**:
   - Use Jest + RTL.
   - Cover: render, slot presence, variant switching, baseline a11y.
   - Prefer role/text queries, not snapshots.
   - **Unit test policy:** Use exactly one `expect()` per `it()` block. Organize cases with `describe()`; table-driven tests are permitted when they reduce duplication (one `expect()` per case).
5. **Validate**:
   - Ensure outputs live in correct folder.
   - Ensure imports are relative, no absolute paths.
   - Ensure no extra props, variants, or classes beyond contract/styleMap.

---

## ⚠️ Overwrite Rules
- Agents may overwrite generated component, story, and test files **only if** regenerating from updated contract/styleMap.
- If unsure, append new files and flag with a PR comment.

---

## ✅ Acceptance Criteria
- Component strictly matches contract + styleMap
- Radix usage correct; `asChild` supported when declared
- Stories cover all variants + props
- Tests cover render/slots/variants/a11y minima
- No unrelated changes in PR
- PR title prefixed with `🤖` and checklist from `AGENTS/PR_PROTOCOL.md` present
- Base uses a **Radix Primitive** (no Themes); visuals driven by token classes from the styleMap.
- Tests follow the unit test policy: one `expect()` per `it()`, organized with `describe()`, table-driven tests allowed when they reduce duplication (one `expect()` per case).
- ClassNames follow the convention: `composeClasses` plus template literals preferred over concatenation or arrays of strings.
- Props export rule followed: only `<ComponentName>Props` is exported; no prop type aliases are exported.
