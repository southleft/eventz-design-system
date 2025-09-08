# 🔄 Workflow Guidelines for Agents

<!-- @agents:paths:start -->
### 📍 Canonical paths
- Components root: `packages/core/src/components/<ComponentName>/`
- Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
> Source: AGENTS/META.yml (version: 1)
<!-- @agents:paths:end -->

This document defines repo-wide working rules for AI agents and contributors.
It complements task-specific documents like `AGENTS/CODE_REVIEW.md`, `AGENTS/GENERATION.md`, and `AGENTS/PR_PROTOCOL.md`.

---

## 🌱 Branching
- Always branch from `development`.
- Allowed branch prefixes:
  - `feature/*` — new components or features
  - `fix/*` — bug fixes
  - `chore/*` — tooling, lint, CI, or non-feature changes
  - `review/*` — agent review or experimental changes
- Never commit directly to `main` or release branches.

---

## 🍒 Commits
- Use **Conventional Commits** style.
- Write commit messages in present tense (e.g., "add icon slot" not "added icon slot").
- Scope commits by package or component when relevant:
  - Example: `feat(ui-badge): add icon slot`
  - Example: `fix(core): align Button variant classes`
- Keep commits small and focused.

---

## 🧾 Pull Requests
- PR titles for agent work must start with `🤖`.
- PR bodies must include the checklist from `AGENTS/PR_PROTOCOL.md`.
- Required labels:
  - `needs-human-review`
- Optional labels:
  - `agent`, `a11y`, `contracts`, `styleMap`, `docs`
- Do not auto-merge. Human review is required.

---

## ⚙️ CI & Testing
- CI is the **source of truth** for lint, tests, build, and packaging.
- Agents and reviewers must **not** run toolchains locally.
- All PRs must pass CI before merge.

---

## 📦 Versioning
- Public API or contract changes require:
  - Human approval
  - A changeset entry or version bump (as defined in the repo’s release process)

---

## 👥 Ownership & Escalation
- Respect CODEOWNERS for package/component ownership (if defined).
- When contract or styleMap diverges from implementation:
  - Open a PR or issue flagging the discrepancy
  - Do not silently modify contracts or styleMaps without review

---

## 📘 References
- Review rules: `AGENTS/CODE_REVIEW.md`
- Generation rules: `AGENTS/GENERATION.md`
- Permissions: `AGENTS/PERMISSIONS.md`
- PR rules: `AGENTS/PR_PROTOCOL.md`
