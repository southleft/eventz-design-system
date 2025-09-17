# 🤖 Agent PR Review Prompt

## Config
- DRY_RUN: {{DRY_RUN}}   # true = output findings here only; false = attempt to post approval comment if clean
- PR_NUMBER: {{PR_NUMBER}}

## Goal
Perform a scoped review of this PR. Review **only** the files listed in the PR’s “Files changed” panel. Use the PR description to infer scope and intent. Compare changes against the `AGENTS/` guidelines to detect violations or missing policies.

If **no required fixes** are found and `DRY_RUN=false`, post a single top-level PR comment:

🤖 Approved by AI
Reviewed against AGENTS/{CODE_REVIEW,PR_PROTOCOL,GENERATION,PERMISSIONS,STACK,ROOT}.md. No required fixes found in “Files changed”.

Otherwise, do not post. Instead, output findings here.

---

## Scope / Guardrails
- ✅ Only review files under **PR → Files changed**
- ✅ Use `AGENTS/{CODE_REVIEW,PR_PROTOCOL,GENERATION,PERMISSIONS,STACK,ROOT}.md` as rubric
- ❌ Do NOT search the entire workspace
- ❌ Do NOT open files not in Files changed
- ❌ Do NOT edit files, commit, or merge the PR
- ❌ Post at most one top-level PR comment (if passing & DRY_RUN=false)
- ❌ If a top-level comment with body exactly `🤖 Approved by AI` already exists, do not post another

---

## Review Steps
1. **Collect CHANGED**: Enumerate the PR’s Files changed list.
2. **Filter TARGET**: Files in CHANGED that are relevant (`AGENTS/*` or other policy-sensitive files).
   - If CHANGED contains files outside expected scope, note them in `OUT_OF_SCOPE` but do not review them.
3. **Review TARGET** against rubric:
   - **File references:** `CONTRACTS.md` → `BLUEPRINTS.md`; `AGENTS/ROOT.md` includes `BLUEPRINTS.md` correctly ordered
   - **Radix policy:** Base must be Radix Primitives only; Themes disallowed
   - **Unit tests:** one `expect()` per `it()`, `describe()` for grouping, table-driven allowed (one `expect()` per case)
   - **ClassName composition:** must use `composeClasses` (`packages/core/src/utilities/composeClasses/composeClasses.ts`), prefer template literals, avoid concatenation and array joins, no `clsx`/`cx`
   - **PR protocol checklist:** design-spec link, unit-test item with backticked names, className item with composeClasses + template literals
   - **Comment templates:** present in CODE_REVIEW.md (`🧵 className composition`, `🧩 Class composition utility misuse`, `🧱 Invented props detected`)
   - **Props export rule:** only `<ComponentName>Props` exported; no prop type aliases
4. **Infer PR scope/intent**: From the PR description, check that the diffs align with the stated intent. If diffs include unrelated changes, flag them.
5. **Aggregate violations**: For each, prepare the matching comment template text (but only output here unless posting approval).

---

## Decision
- If DRY_RUN = true → never post, output findings here
- If Required Fixes exist → do not post, output findings here
- If no Required Fixes and DRY_RUN = false:
  - Attempt to post the approval comment above
  - If posting fails (e.g., conversation UI unavailable), copy comment to clipboard and print it in Output for manual pasting
  - Log posting attempt and result in Summary

---

## Output Format
- FILES_CHANGED: list of reviewed files
- OUT_OF_SCOPE: list of files changed but not reviewed
- Violations: comment template text blocks for each issue, prefixed with file path + hunk/line if available
- Summary:
  - Findings: 3–6 bullets
  - Required fixes: 0 if passing, else list with file names
  - Nice-to-have: optional
  - Posting:
    - attempted_to_post: <true|false>
    - post_result: <success|failure|skipped>
    - post_error (if any): "<message>"
    - reason_if_skipped: "<existing approval found|dry_run|has_required_fixes|environment cannot access PR conversation|other>"
  - If fallback required, include:
  === APPROVAL COMMENT (copy-paste) ===
  🤖 Approved by AI
  Reviewed against AGENTS/{CODE_REVIEW,PR_PROTOCOL,GENERATION,PERMISSIONS,STACK,ROOT}.md. No required fixes found in “Files changed”.
  ================================

## Failure Conditions
- If Files changed cannot be enumerated → `ERROR: Unable to enumerate Files changed for this PR.`
- If workspace-wide search attempted → `ERROR: Workspace search blocked by scope policy.`
