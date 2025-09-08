# 🔐 Agent Permissions & Guardrails

This document defines **what AI agents are allowed to do** when contributing to this repo.
It replaces the old restriction that banned direct IDE/MCP edits. Agents may now write to the repo **with guardrails**.

---

## 🟢 Allowed
- ✅ **Allowed:** Agents may create new branches prefixed with `chore/*`, `feature/*`, `fix/*`, or `review/*`.
- ✅ **Allowed:** Agents may edit files within changed packages only for mechanical fixes, such as lint/style corrections, type narrowings or import fixes, and test snapshot updates (but never test assertions).
- ✅ **Allowed:** Agents may generate new components, stories, and tests according to the rules defined in `AGENTS/GENERATION.md`.
- ✅ **Allowed:** Agents may attach `.patch` files to pull requests when proposing changes.
- ✅ **Allowed:** Agents may update review branches with small, mechanical changes that do not alter semantics or architecture.

---

## 🛡️ Protected
- ❌ **Protected:** Agents must never commit directly to `main` or release branches.
- ❌ **Protected:** Agents must not make architectural or public API changes without explicit human approval and a changeset.
- ❌ **Protected:** Agents must not edit secrets, infrastructure files, or CI pipeline configurations.

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
