# Copy-Exact Blueprint Sync for `<ComponentName>` (two-phase; runtime is ground truth)

Authoritative runtime (read first; do not modify):
- packages/core/src/components/<ComponentName>/<ComponentName>.tsx

Blueprint sources (to edit):
- packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts
- packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts

Hard rules
- Do NOT normalize, dedupe, reorder, or rename classes. Preserve duplicates/conflicts exactly as in runtime.
- No classes in the contract (schema-only).
- If runtime and contract differ in props/slots/states/semantics, update the contract to match runtime and list the diff briefly before patching.

PHASE 1 — EXTRACT ONLY (no edits)
1) Read <ComponentName>.tsx and print four verbatim blocks (one class string per line, in the exact order used in runtime constants):
   RUNTIME_BASE:
   …
   RUNTIME_SELECTED:
   …
   RUNTIME_ICON:
   …
   RUNTIME_LABEL:
   …
   If a section does not exist in the runtime (e.g., no selected state or no icon/label slots), print the section header followed by (none).

2) Print the runtime’s semantic hooks found on the root:
   - Base element, server/client directive
   - Role, tabIndex, aria-* usage
   - data-* attributes used for state (e.g., data-selected)
   - Slot render order

PHASE 2 — PATCH BLUEPRINTS
A) styleMap (copy-exact)
   - base: replace with RUNTIME_BASE (1:1)
   - state.selected: replace with RUNTIME_SELECTED (1:1) or clear if (none)
   - slots.icon: replace with RUNTIME_ICON (1:1) or clear if (none)
   - slots.label: replace with RUNTIME_LABEL (1:1) or clear if (none)
   - Keep variants: {} unless variants exist in runtime and contract.

B) contract (only if runtime differs)
   - Ensure base, props (names/required/defaults), slots (names and order), and rules/hints match runtime semantics.
   - Do NOT add classes to the contract. Keep layout structural only (no className arrays).

POST-PATCH SELF-CHECK (required)
- For each section, print:
  EXPECTED(base)=<RUNTIME_BASE single-line join>
  FOUND(base)=<styleMap.base single-line join>
  … repeat for selected, icon, label …
- If any mismatch remains, STOP and re-apply until equal.

Constraints
- Edit only the two blueprint files.
- Do not modify the runtime, tests, or stories.
- Preserve token utility names verbatim (e.g., w-[…], text-color-…, focus-visible:ring-…, group-data-[…]).

Config placeholders to replace before running
- <ComponentName>
