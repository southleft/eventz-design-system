# 🔍 Code Review Guidelines for Agents

This document defines how AI agents should conduct code reviews in this repo.  
The goal is to ensure generated or edited code strictly conforms to contracts, style maps, accessibility rules, and project conventions.

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
- Contract file: `/packages/blueprints/<ComponentName>.contract.ts`
- Style map file: `/packages/blueprints/<ComponentName>.styleMap.ts`
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
4. **Verify styleMap conformance**:
   - Variants and compound variants: classes exactly match
   - No unused/undefined classes introduced
   - Uses `clsx`/`cx`, no ad-hoc string concatenation
5. **Accessibility checks**:
   - Decorative icons set `aria-hidden="true"`
   - Labels/slots semantically intact
   - No color-only state communication
6. **Storybook**:
   - Default export has `title: 'Components/<ComponentName>'`
   - Stories use controls for public props
   - All variants appear in stories
7. **Tests**:
   - Jest + RTL
   - Cover: render, slot presence, variant switching, baseline a11y
   - Prefer role/text queries over snapshots
8. **Changelog discipline**:
   - PR title starts with `🤖`
   - PR body includes checklist from `AGENTS/PR_PROTOCOL.md`
   - No unrelated changes

---

## 💬 Comment Templates

### 🔗 Contract mismatch
> The prop `<propName>` in the component does not match the contract. Please align with `/packages/blueprints/<ComponentName>.contract.ts`.

### 🎨 StyleMap drift
> Variant `<variantName>` classes differ from styleMap. Expected: `<expected>`, found: `<actual>`. Update to match `/packages/blueprints/<ComponentName>.styleMap.ts`.

### ⚙️ Radix base missing
> Contract declares base `<Primitive>`, but component does not wrap it. Refactor to use the Radix primitive and support `asChild` if specified.

### ♿ Accessibility issue
> Accessibility mismatch detected. Please ensure decorative icons use `aria-hidden="true"` and text labels are present.

### 📚 Story coverage
> Not all styleMap variants are represented in stories. Please add missing variants.

### 🧪 Test coverage
> Add RTL assertions for variant classes and/or slot presence.

---

## ✅ Acceptance Criteria
- Contracts fully respected
- Style maps matched exactly
- Radix usage correct
- Accessibility verified
- Stories complete
- Tests cover render/slots/variants/a11y minima
- CI green (lint/tests/build/pack)
- Checklist from `AGENTS/PR_PROTOCOL.md` present
