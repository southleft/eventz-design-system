# 🧩 Stack Primer

<!-- @agents:paths:start -->
### 📍 Canonical paths
- Components root: `packages/core/src/components/<ComponentName>/`
- Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
> Source: AGENTS/META.yml (version: 1)
<!-- @agents:paths:end -->

A concise reference for agents about the technologies, conventions, and file locations in this repo.
For procedures and policies, see: `AGENTS/CODE_REVIEW.md`, `AGENTS/GENERATION.md`, `AGENTS/PERMISSIONS.md`, `AGENTS/PR_PROTOCOL.md`, `AGENTS/WORKFLOW.md`.

---

## ⚙️ Toolchain
- **Node:** 20.x • **pnpm:** 9.x • **TypeScript:** 5.x • **Jest:** 29.x • **Storybook:** 8.x
- **Monorepo:** Turborepo + pnpm workspaces
- **ESM:** `module: esnext`, `moduleResolution: bundler`
- **Paths:** `@/*` → `./src/*` (package-local)

---

## 🧱 Repo Layout (high level)
- **Core components:** packages/core/src/components/<ComponentName>/
- **Blueprints (sources of truth):**
  - Contract → packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts
  - styleMap → packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts
- **Styles/tokens:** packages/core/styles/** (maps from design tokens)

---

## 🎛️ UI Stack & Patterns
- **Radix UI** primitives as component bases; support `asChild` when declared in the contract.
- **Tailwind CSS** classes are composed with `composeClasses` (`packages/core/src/utilities/composeClasses/composeClasses.ts`); prefer template literals for static strings; avoid string concatenation (`+`) and array joins.
- **Contracts** define props/slots/layout; **styleMaps** define classes/variants/compounds.
- **Layout ownership:** parent layouts own spacing/margins; components avoid per-instance margin props.

> **Policy:** `base` must be a **Radix Primitive**. Radix Themes are disallowed as `base`; styling comes from token classes in the styleMap.

---

## 🧪 Testing & Stories
- **Tests:** Jest + React Testing Library (RTL).
  - Cover: render, slots, variant class switching, baseline a11y.
  - Prefer role/text queries over snapshots.
- **Storybook:** Stories live alongside components; cover public props and all styleMap variants.

---

## 📦 Build & Packaging
- **TS project references** per package (`composite: true`).
- CI runs: install → lint → typecheck → test → build → pack.
- Build outputs must be publishable; do not rely on app-only tooling.

---

## 🔐 Accessibility (baseline)
- Decorative icons must have `aria-hidden="true"`.
- Interactive elements must have accessible names (e.g., `aria-label`, `aria-labelledby`, or visible text).

---

## 🗂️ Naming & Exports
- Component file: `<ComponentName>.tsx` in the component folder.
- Export a named props interface **`<ComponentName>Props`** from `<ComponentName>.tsx`.
- Keep props/variants exactly as defined by the contract/styleMap.

---

## 📘 References
- How to review: `AGENTS/CODE_REVIEW.md`
- How to generate: `AGENTS/GENERATION.md`
- Permissions & guardrails: `AGENTS/PERMISSIONS.md`
- PR rules: `AGENTS/PR_PROTOCOL.md`
- Workflow: `AGENTS/WORKFLOW.md`
