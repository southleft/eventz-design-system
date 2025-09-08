# 🔐 Agent Permissions & Guardrails

This document defines **what AI agents are allowed to do** when contributing to this repo.
It replaces the old restriction that banned direct IDE/MCP edits. Agents may now write to the repo **with guardrails**.

---

## 🟢 Allowed
- - ✅ **Allowed:** Agents may create new branches prefixed with `chore/*`, `feature/*`, `fix/*`, or `review/*`.
- Edit files within changed packages for **mechanical fixes**:
  - Lint/style corrections
  - Type narrowings / import fixes
  - Test snapshot updates (never assertions)
- Generate new components, stories, and tests as defined in `AGENTS/GENERATION.md`
- Attach `.patch` files to PRs
- Update review branches with small, mechanical changes

---

## 🛡️ Protected
- ❌ No direct commits to `main` or release branches
- ❌ No architectural or public API changes without human approval + changeset
- ❌ No secret management, infra edits, or CI pipeline rewrites

---

## 🔁 Proposal → Apply Protocol
1. **Propose**
   - Add inline PR comments with recommended changes
   - Attach a `.patch` file if helpful
2. **Apply**
   - Apply only **mechanical fixes** directly
   - Semantic or architectural changes must wait for human “LGTM”

---

## 🧾 Audit
- Every agent write action must:
  - Leave a PR note explaining the rationale
  - Reference the related CI run or GitHub check
- All direct edits are reviewable in PR history

---

## 📘 References
- Review rules: `AGENTS/CODE_REVIEW.md`
- Generation rules: `AGENTS/GENERATION.md`
- PR rules: `AGENTS/PR_PROTOCOL.md`
- Stack primer: `AGENTS/STACK.md`
