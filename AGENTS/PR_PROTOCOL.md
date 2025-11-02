# 🧾 PR Protocol for Agents

<!-- @agents:paths:start -->
### 📍 Canonical paths
- Components root: `packages/core/src/components/(server|client)/<ComponentName>/`
- Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
> Source: AGENTS/META.yml (version: 1)
<!-- @agents:paths:end -->

This document defines how AI agents and humans should open, label, and review pull requests in this repo. It complements:
	•	🔍 AGENTS/CODE_REVIEW.md
	•	🏗️ AGENTS/GENERATION.md
	•	🔐 AGENTS/PERMISSIONS.md
	•	🧩 AGENTS/STACK.md

## 🏷️ PR Title Rule

Prefix all agent-originated PR titles with 🤖.
Examples:
	•	🤖 Generate Dialog component
	•	🤖 Fix: align Badge variant classes to styleMap

This helps humans scan PR lists quickly.

## 📝 Required PR Body Checklist

Copy/paste this block into the PR description:

### 🤖 Agent PR Checklist
- [ ] Generated or edited according to `AGENTS/GENERATION.md` or review guardrails in `AGENTS/PERMISSIONS.md`
- [ ] Linked the design spec (image or URL) used to generate/modify this component
- [ ] Diff strictly matches contract + styleMap (no prop/class drift)
- [ ] Tests follow the unit test policy: one `expect()` per `it()`, organized with `describe()`; table-driven tests allowed (one `expect()` per case)
- [ ] ClassNames use `composeClasses`; avoid concatenation (`+`) or array joins; prefer template literals for static strings
- [ ] Tests and stories present at baseline coverage
- [ ] No unrelated changes in this PR
- [ ] Ran `pnpm agents:sync` and `pnpm agents:verify`
- [ ] Base branch is development (or the PR’s configured base)
- [ ] Variants-only exception banner included (if applicable)
- [ ] Stories rely on inferred controls (no manual argTypes)

## 👥 Assignment & Merge
	•	Assign to a relevant human maintainer (if known).
	•	Do not auto-merge. Human approval is required.

## 🔎 Scope & Content Expectations
	•	Component PRs must include:
	•	/<ComponentName>.tsx
	•	/<ComponentName>.stories.tsx
	•	/<ComponentName>.test.tsx (or __tests__/)
	•	Files belong under: packages/core/src/components/(server|client)/<ComponentName>/
	•	No edits to blueprints unless explicitly requested.
	•	Controls are inferred from the component’s TypeScript interface. Do not add manual argTypes.

## 🔍 Review Procedure
- Base branch: Always review against the PR’s base branch (default: development). Treat PR → Files changed as authoritative; do not diff against main.

### Exception Banner (when applicable)
- Variants-only policy is waived for this PR.
  → Do not flag non-variant stories as violations.

## ✅ Acceptance Criteria for Approval
	•	Contract conformance: props, slots/layout, events
	•	styleMap conformance: variants, compound variants, exact classes
	•	ClassNames must use `composeClasses`; avoid concatenation (`+`) or array joins; prefer template literals for static strings.
	•	Radix usage correct; asChild when declared
	•	Stories cover public props/variants; tests cover render/slots/variant/a11y minima
	•	CI green (lint, tests, build, pack). Reviewers do not run toolchains locally.
	•	Follow the unit test policy: one `expect()` per `it()`, organize with `describe()`, table-driven tests permitted (one `expect()` per case).

> **Policy:** `base` must be a **Radix Primitive**. Radix Themes are disallowed as `base`; styling comes from token classes in the styleMap.

## 💬 Review Comment Templates

### 🔗 Contract mismatch

The prop set in the component differs from the contract: `<propName>`. Align with `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts` and update tests/stories accordingly.

### 🎨 styleMap drift

Variant `<variantName>` classes do not match the styleMap. Expected: `<expectedClasses>`. Found: `<actualClasses>`. Sync to `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`.

### ⚙️ Radix base missing

Contract declares base: `<Primitive>`, but the component doesn’t wrap that Radix primitive. Refactor and support `asChild` if specified.

### ♿ A11y: decorative icon

Icon appears decorative; set `aria-hidden="true"` and ensure a text label is present.

### 📚 Story coverage

Not all styleMap variants appear in stories. Please add: <missingVariants>.

### 🧪 Test coverage

Add assertions for variant class switching and/or slot presence using Testing Library queries.

## 🍒 Commit Style

Use Conventional Commits where possible (e.g., feat(ui-badge): add icon+label slot, fix(ui-badge): align variant class names).

⸻

For how to review a diff, see AGENTS/CODE_REVIEW.md. For what you’re allowed to edit, see AGENTS/PERMISSIONS.md.
