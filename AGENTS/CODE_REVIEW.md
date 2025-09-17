# 🔍 Code Review Guidelines for Agents

<!-- @agents:paths:start -->
### 📍 Canonical paths
- Components root: `packages/core/src/components/<ComponentName>/`
- Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
> Source: AGENTS/META.yml (version: 1)
<!-- @agents:paths:end -->

See also: AGENTS/PERMISSIONS.md, AGENTS/PR_PROTOCOL.md, AGENTS/STACK.md, AGENTS/WORKFLOW.md

This document defines how AI agents should conduct code reviews in this repo.
The goal is to ensure generated or edited code strictly conforms to contracts, styleMaps, accessibility rules, and project conventions.

---

## 📝 Scope of Review
Agents must:
- **Not** run lint, test, build, or pack locally — rely on CI for those checks.
- **Do** review:
  - File paths, names, and placement
  - Contract ↔ styleMap adherence
  - Radix usage & `asChild` behavior
  - Tailwind class usage vs. styleMap
  - Accessibility patterns
  - Storybook stories & test coverage

---

## 📂 Where to Look
- Files changed in the PR (diff view only)
- Contract file: `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap file: `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
- Generated outputs: `/packages/core/src/components/<ComponentName>/`
- Styles entry: `/packages/core/styles/css/index.css` if referenced

---

## 🔎 Review Workflow
1. **Identify components** in PR title/body and confirm placement under:
   `/packages/core/src/components/<ComponentName>/`
2. **Load blueprints** (contract + styleMap).
3. **Verify contract conformance**:
   - Props: no additions beyond contract; types and defaults match
   - Slots/layout: matches `contract.layout`
   - Radix: uses `contract.base`; supports `asChild` if declared
   - Events: signatures match contract
   - Exported props interface must be named <ComponentName>Props and defined in <ComponentName>.tsx

> **Policy:** `base` must be a **Radix Primitive**. Radix Themes are disallowed as `base`; styling comes from token classes in the styleMap.
4. **Verify styleMap conformance**:
   - Variants and compound variants: classes exactly match
   - No unused/undefined classes introduced
   - Class composition must use `composeClasses` with styleMap variants (`packages/core/src/utilities/composeClasses/composeClasses.ts`)
   - ClassNames must use `composeClasses`; avoid concatenation (`+`) or array joins; **prefer template literals** for static strings.
5. **Accessibility checks**:
   - Decorative icons set `aria-hidden="true"`
   - Labels/slots semantically intact
   - No color-only state communication
   - Interactive elements must have accessible names (e.g., via aria-label, aria-labelledby, or visible text)
   - No per-component high-contrast toggles; high contrast is global.
6. **Storybook**:
   - Default export must include `title: 'Components/<ComponentName>'` and `component: <ComponentName>`
   - Stories use controls for public props
   - All variants appear in stories
7. **Tests**:
   - Jest + RTL
   - Cover: render, slot presence, variant switching, baseline a11y
   - Prefer role/text queries over snapshots
   - Follow the unit test policy: one `expect()` per `it()`, organize with `describe()`, table-driven tests permitted (one `expect()` per case).
8. **Changelog discipline**:
   - PR title starts with `🤖`
   - PR body includes checklist from `AGENTS/PR_PROTOCOL.md`
   - No unrelated changes

---

## 💬 Comment Templates

### 🔗 Contract mismatch
> The prop `<propName>` in the component does not match the contract. Please align with `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`.


### 🎨 styleMap drift
> Variant `<variantName>` classes differ from styleMap. Expected: `<expected>`, found: `<actual>`. Update to match `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`.

### 🧵 className composition
> `className` composition does not follow repo conventions. Detected string concatenation (`a + ' ' + b`) or array joins (`[a, b].join(' ')`).
> Please refactor to:
> - Prefer template literals for static/inline class strings.
> - Use `composeClasses` (`packages/core/src/utilities/composeClasses/composeClasses.ts`) for conditional composition and styleMap variant/state classes.
> - Ensure classes come from the styleMap/tokens (no ad-hoc palettes).

### 🧩 Class composition utility misuse
> Detected `clsx`/`cx` (or ad-hoc string joins) for `className` composition.  
> This repo uses the local utility **`composeClasses`** to keep class composition within our type structure.
>
> Please refactor to:
> - Replace `clsx`/`cx` (and string joins) with **`composeClasses`**.
> - Pull classes from the styleMap/token classes; avoid ad-hoc palettes.
>
> Reference: `packages/core/src/utilities/composeClasses/composeClasses.ts`

### ⚙️ Radix base missing
> Contract declares base `<Primitive>`, but component does not wrap it. Refactor to use the Radix primitive and support `asChild` if specified.

### ♿ Accessibility issue
> Accessibility mismatch detected. Please ensure decorative icons use `aria-hidden="true"` and text labels are present.

### 📚 Story coverage
> Not all styleMap variants are represented in stories. Please add missing variants.

### 🧪 Test coverage
> Add RTL assertions for variant classes and/or slot presence.

### 🧪 Unit test policy violation
> The test file violates the unit test policy: multiple `expect()` calls were detected inside a single `it()` block or tests are not grouped with `describe()`.
> Please refactor so each `it()` contains exactly **one** `expect()`. If appropriate, convert to a table-driven test (e.g., `test.each`) where each case includes one `expect()`, or split assertions into separate `it()` cases.
> Example fixes:
> - Use `describe()` to group related cases and one `expect()` per `it()`.
> - Replace a single `it()` with multiple `it()`s, each containing a single assertion.
> - When using table-driven tests, ensure each test row has one `expect()`.

---

## ✅ Acceptance Criteria
- Contracts fully respected
- styleMaps matched exactly
- Radix usage correct
- Accessibility verified
- Stories complete
- Tests cover render/slots/variants/a11y minima
- CI green (lint/tests/build/pack)
- Checklist from `AGENTS/PR_PROTOCOL.md` present
