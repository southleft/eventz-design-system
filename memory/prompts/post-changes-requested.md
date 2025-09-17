# 🤖 Agent PR “Changes Requested” Prompt

## Config
- DRY_RUN: {{DRY_RUN}}   # true = do not post; output here and copy to clipboard (default: true)
- PR_NUMBER: {{PR_NUMBER}}   # required so the agent opens the correct PR in VS Code

## Goal
When a scoped PR review identifies **Required Fixes**, post a single **top-level** PR comment summarizing those fixes with a robot header. If **no Required Fixes** exist, do nothing. Supports dry run with clipboard fallback and logging.

Top-level comment body (use exactly):

    🤖 Changes requested by AI
    Reviewed against AGENTS/{CODE_REVIEW,PR_PROTOCOL,GENERATION,PERMISSIONS,STACK,ROOT}.md. Required fixes are listed below.

    ### Required fixes
    - <file path>: <one-line fix summary>
    - <file path>: <one-line fix summary>
    - …

---

## Scope / Guardrails
- ✅ Operate only on **PR → Files changed** for PR {{PR_NUMBER}}
- ✅ Use `AGENTS/{CODE_REVIEW,PR_PROTOCOL,GENERATION,PERMISSIONS,STACK,ROOT}.md` as rubric for references
- ❌ Do NOT search the entire workspace
- ❌ Do NOT edit files, commit, or merge the PR
- ❌ Post at most **one** top-level “Changes requested by AI” comment when Required Fixes exist & DRY_RUN=false
- ❌ If a top-level comment whose first line is exactly `🤖 Changes requested by AI` already exists, do not post another

---

## Procedure
1) **Inputs**: Use the **Required Fixes** set produced by the scoped review (TARGET = PR’s “Files changed”).
2) **No Required Fixes**:
   - Do **not** post.
   - Print “No required fixes; skipping changes-requested comment.”
3) **Required Fixes exist**:
   - Compose the comment by filling the “### Required fixes” list using the exact pattern: "- <file path>: <one-line fix summary>".
   - If `DRY_RUN === true`:
     - Copy the composed body to clipboard and print it here.
     - Log: `attempted_to_post=false`, `post_result=skipped`, `reason_if_skipped="dry_run"`. Stop.
   - If `DRY_RUN === false`:
     - Open the PR **Conversation/Description** view in the VS Code GitHub PR panel.
     - Check for an existing top-level comment whose first line is exactly `🤖 Changes requested by AI`. If found:
       - Log: `attempted_to_post=false`, `post_result=skipped`, `reason_if_skipped="existing changes-requested comment"`. Stop.
     - If not found, post **one** top-level comment with the composed body.
       - On success: `attempted_to_post=true`, `post_result=success`.
       - On failure (e.g., conversation UI unavailable):
         - `attempted_to_post=true`, `post_result=failure`, `reason_if_skipped="environment cannot access PR conversation"`.
         - Copy the comment body to clipboard and print it here for manual pasting.

---

## Output (always print here)
- FILES_CHANGED (AGENTS/* only): list TARGET
- Required Fixes: list with file paths
- Posting:
  - `attempted_to_post: <true|false>`
  - `post_result: <success|failure|skipped>`
  - `post_error (if any): "<message>"`
  - `reason_if_skipped: "<existing changes-requested comment|dry_run|environment cannot access PR conversation|no_required_fixes|other>"`
- If clipboard fallback used, include:

=== CHANGES-REQUESTED COMMENT (copy-paste) ===
    🤖 Changes requested by AI
    Reviewed against AGENTS/{CODE_REVIEW,PR_PROTOCOL,GENERATION,PERMISSIONS,STACK,ROOT}.md. Required fixes are listed below.

        ### Required fixes
        - <file path>: <one-line fix summary>
        - …
================================

---

## Failure Conditions
- If Files changed cannot be enumerated → `ERROR: Unable to enumerate Files changed for this PR.`
- If workspace-wide search attempted → `ERROR: Workspace search blocked by scope policy.`
