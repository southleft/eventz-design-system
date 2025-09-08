# 🏗️ Component Generation Guidelines for Agents

This document defines how AI agents should generate new components from blueprints in this repo.  
It complements:
- 🔍 `AGENTS/CODE_REVIEW.md`
- 🔐 `AGENTS/PERMISSIONS.md`
- 🧾 `AGENTS/PR_PROTOCOL.md`
- 🧩 `AGENTS/STACK.md`

---

## 📂 Inputs
Agents must use the following blueprint files as the source of truth:
- **Contract**: `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- **styleMap**: `/packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`

These files define the props, slots, Radix base, and Tailwind classes.

---

## 📦 Outputs
Generated components must include all of the following:
- `/<ComponentName>.tsx` — React component implementing the contract + styleMap
- `/<ComponentName>.stories.tsx` — Storybook stories covering all public props/variants
- `/<ComponentName>.test.tsx` (or `__tests__/`) — Jest + RTL tests for render, slots, variants, baseline a11y

All outputs belong under:  
`/packages/core/src/components/<ComponentName>/`

---

## 🔄 Workflow
1. **Read contract + styleMap** to understand props, slots, variants, and Radix base.
2. **Generate component**:
   - Must wrap the Radix base primitive declared in contract.
   - Must support `asChild` if contract specifies.
   - Props and types must exactly match contract.
   - Class composition must use `clsx`/`cx` with styleMap variants.
   - Accessibility: decorative icons → `aria-hidden="true"`, all interactive elements → accessible names.
3. **Generate stories**:
   - Default export: `title: 'Components/<ComponentName>'`
   - Include stories for all styleMap variants.
   - Use Storybook controls for all public props.
4. **Generate tests**:
   - Use Jest + RTL.
   - Cover: render, slot presence, variant switching, baseline a11y.
   - Prefer role/text queries, not snapshots.
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
