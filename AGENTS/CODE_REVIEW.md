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
- Review against the PR’s base branch (default development). Use PR → Files changed as the authoritative diff; do not compare against main.

### 🧭 Blueprint Runtime Policy (review-time)
- **Blueprints (contract + styleMap) are schema-only** for generation and review.
- **Runtime must not import or compose from styleMaps.** Reviewers must verify **token parity** (base/slots/state/variants) between the component’s **literal token strings** and the styleMap arrays.
- Flag drift when tokens differ; do **not** require importing the styleMap in runtime.

---

## 📂 Where to Look
- Files changed in the PR (diff view only)
- Contract file: `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap file: `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
- Generated outputs: `/packages/core/src/components/<ComponentName>/`
- Public API barrel: `packages/core/src/components/index.ts`
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
4. **Verify styleMap conformance**:
   - Variants and compound variants: classes exactly match
   - No unused/undefined classes introduced
   - Class composition must use `composeClasses`. **Do not require styleMap imports in runtime.** Verify that literal token strings in the component match the styleMap (base, slots, state, variants). Structural utilities are allowed when tokens do not exist; flag only when the tokens drift from the styleMap.
   - ClassNames must use `composeClasses`; avoid concatenation (`+`) or array joins; **prefer template literals** for static strings.
   - **Compare base + slots + variants** classes between the **component** and the **styleMap**. Treat a match as compliant even if class lists include utilities.
   - **Utilities allowed:** per token-first policy, structural/optical utilities (e.g., `inline-flex`, `gap-*`, `pt-2`, negative margins) are allowed **when tokens don’t exist**. Do **not** flag utilities as drift if component **and** styleMap use the same ones; flag only when **tokens drift** from the styleMap.
5. **Accessibility checks**:
   - Decorative icons set `aria-hidden="true"`
   - Labels/slots semantically intact
   - No color-only state communication
   - Interactive elements must have accessible names (e.g., via aria-label, aria-labelledby, or visible text)
   - No per-component high-contrast toggles; high contrast is global.
6. **Storybook**:
   - Default export must include `title: 'Components/<ComponentName>'` and `component: <ComponentName>`
   - Stories rely on Storybook’s inferred controls from the component’s TypeScript interface. Do not manually add controls; they are auto‑generated.
- **Variants-only:** all styleMap **variants** appear as stories; **no** additional stories for non-variant props
- Exception banner: If the PR body declares a variants-only exception, do not flag non-variant stories in this review.
7. **Tests**:
   - Jest + RTL
   - Cover: render, slot presence, variant switching, baseline a11y
   - Prefer role/text queries over snapshots
   - Follow the unit test policy: one `expect()` per `it()`, organize with `describe()`, table-driven tests permitted (one `expect()` per case).
8. **Changelog discipline**:
   - PR title starts with `🤖`
   - PR body includes checklist from `AGENTS/PR_PROTOCOL.md`
   - No unrelated changes
9. **Barrel files & public API**:
   - Component-level barrel exists: `packages/core/src/components/<ComponentName>/index.ts` re-exports the component.
   - Package-level public API re-exports the component: `packages/core/src/components/index.ts` includes it (if the component is public).

---

## Storybook
- Default export includes `title: 'Components/<ComponentName>'` and `component: <ComponentName>`.
- Controls for all public props are inferred automatically by Storybook from the component’s TypeScript interface. Do not manually declare them.
- **Variants-only policy:** Stories must cover **every styleMap variant**. Do **not** add stories for non-variant props (e.g., size, boolean flags, focus states); exercise those via Canvas controls.

---

## 💬 Comment Templates

### 🔗 Contract mismatch
> The prop `<propName>` in the component does not match the contract. Please align with `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`.

### 🧱 Invented props detected
> The component defines props not present in the contract (e.g., `hasIcon`, `hasLabel`, extra booleans for layout).
> Please remove invented props and rely on the contract + slot truthiness.
> If a new prop is truly required, update the contract first and regenerate.


### 🎨 styleMap drift
> Variant `<variantName>` classes differ from styleMap. Expected: `<expected>`, found: `<actual>`. Update to match `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`.
> This check verifies **token parity** only. It does **not** require importing the styleMap in runtime.

### 🧵 className composition
> `className` composition does not follow repo conventions. Detected string concatenation (`a + ' ' + b`) or array joins (`[a, b].join(' ')`).
> Please refactor to:
> - Prefer template literals for static/inline class strings.
> - Use `composeClasses` (`packages/core/src/utilities/composeClasses/composeClasses.ts`) for conditional composition and styleMap variant/state classes.
> - Ensure classes come from the styleMap/tokens (no ad-hoc palettes).
> Note: Do **not** import styleMaps in runtime. Compose with `composeClasses` and literal token strings that **match** the styleMap.

### 🎛️ Manual Storybook controls
> Stories declare manual argTypes, but controls must be inferred from the component’s TypeScript props.  
> Please remove custom argTypes and rely on inferred controls.

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
> Not all **variants** are represented in stories. Per the variants-only policy, add missing **variant** stories.
> Non-variant props (size, booleans, focus-visible, etc.) should be exercised via Canvas controls, not separate stories.

### 🧪 Test coverage
> Add RTL assertions for variant classes and/or slot presence.

### 🧪 Unit test policy violation
> The test file violates the unit test policy: multiple `expect()` calls were detected inside a single `it()` block or tests are not grouped with `describe()`.
> Please refactor so each `it()` contains exactly **one** `expect()`. If appropriate, convert to a table-driven test (e.g., `test.each`) where each case includes one `expect()`, or split assertions into separate `it()` cases.
> Example fixes:
> - Use `describe()` to group related cases and one `expect()` per `it()`.
> - Replace a single `it()` with multiple `it()`s, each containing a single assertion.
> - When using table-driven tests, ensure each test row has one `expect()`.

### 📦 Barrel file / public API export missing
> Missing component barrel or package-level export.
>
> Please ensure:
> - `packages/core/src/components/<ComponentName>/index.ts` exists and re-exports the component, and
> - `packages/core/src/components/index.ts` re-exports `<ComponentName>` (if it should be public).
>
> This ensures the component is included in the package’s public API and import paths remain consistent.

---

## ✅ Acceptance Criteria
- Contracts fully respected
- styleMaps matched exactly
- Radix usage correct
- Accessibility verified
- Stories complete (variants-only policy): every variant represented as a story; non-variant props covered via Canvas controls inferred automatically from component TypeScript interfaces
- Tests cover render/slots/variants/a11y minima
- CI green (lint/tests/build/pack)
- Checklist from `AGENTS/PR_PROTOCOL.md` present
- Component-level barrel present and package-level public API export updated (when applicable).
