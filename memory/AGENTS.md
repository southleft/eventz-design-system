# 🧠 Memory Layer Guide for Agents

## Purpose
The `memory/` directory supplements the AGENTS specs with reusable prompt baselines and illustrative skills. It helps both humans and AI agents understand how to compose task prompts that stay within repo guardrails, and hints at future automation paths.

## Canonical Prompt Templates (`memory/prompts/`)
- These markdown files are the **source of truth** for reusable agent prompts.
- Task-specific prompts (e.g., a generator job, a targeted PR review) should reference the relevant canonical template and only specify deltas such as the component name, PR number, or DRY_RUN flag.
- Each template encodes the same guardrails you see in `AGENTS/`: scoped file access, Radix primitive requirements, composeClasses usage, unit-test discipline, and “no edits outside intent.”

### Notable templates
- `generate-component.md` – baseline instructions for generating components from contracts + styleMaps, enforcing Radix primitive bases, composeClasses, and the single-export rule (`<ComponentName>Props`).
- `pr-review.md` – scoped PR review workflow including DRY_RUN handling, policy rubric references, approval posting logic, and fallback copy-to-clipboard instructions.
- `post-changes-requested.md` – comment workflow for Required Fixes, mirroring the review rubric and providing dry-run/clipboard fallbacks.

### When to add or update a template
Add or revise a canonical template when:
1. A new repeated workflow appears (e.g., publishing docs, running a release checklist).
2. Guardrails change (new policies in `AGENTS/` or new posting procedures).
3. We want to encode successful manual patterns for future automation.

Keep templates concise, explicit, and consistent. Each one should:
- Link to the relevant AGENTS docs.
- Spell out scoping, posting, and fallback behavior.
- Use indented code blocks for approval/comment bodies to avoid accidental markdown formatting.

## Example Skills (`memory/skills/`)
- Skills are **illustrative only**; the agent framework does **not** call them yet.
- They show possible micro-tasks (write a unit test, summarize a changelog) with structured inputs/outputs.
- Treat them as inspiration for future automation or documentation, not canonical instructions. If a skill becomes critical, promote its guidance into a canonical template or the AGENTS specs.

## Policy Highlights (as captured in templates)
- **Radix base:** Contracts and components must wrap Radix **Primitives only**; Themes are disallowed as `base`. Styling derives from token-backed styleMaps.
- **Class composition:** Use `composeClasses` (`packages/core/src/utilities/composeClasses/composeClasses.ts`). Prefer template literals for static strings; avoid concatenation (`+`) and array joins.
- **Unit tests:** Exactly one `expect()` per `it()`; group related cases with `describe()`; table-driven tests allowed only when each case keeps the single `expect()` rule.
- **Props export:** Components export a single `<ComponentName>Props` interface; do not scatter prop types or aliases.

## Maintaining the Memory Layer
- Update canonical templates whenever AGENTS specs evolve or workflows need clarification.
- Keep skill examples aligned with current repo patterns to avoid confusion.
- Document any new automation assumptions here so future agents and humans understand the rationale.

Use this file as a map: `memory/prompts/` tells agents **how** to drive repeatable workflows; `memory/skills/` hints at potential building blocks. Together, they keep AI assistance predictable, reviewable, and policy-compliant.

## Referencing Templates & Examples (No Copying)

**Task prompts reference canonical templates _and_ examples as guidance, not as copy sources.** When a task cites a template (e.g., `memory/prompts/generate-component.md`) or an example (e.g., “use Button as a pattern”), the agent must treat those references as **read-only guidance**.

> **Do not copy** code, props, classes, or file contents from examples.  
> **Do not clone** example files.  
> **Do not import** example implementations.  
> **Do not open** example files for bulk duplication.

**How to reference correctly (pattern, not copy):**
- Use the canonical template to define the **rules and guardrails**.
- Apply only the **task’s deltas** (component name, paths, contract/styleMap specifics, etc.).
- Derive structure from the contract + styleMap and the template rules; **do not lift** code from examples.
- If an example is mentioned (e.g., Button), interpret it as a **shape/pattern cue** (slots, story coverage, test surface), not a source to duplicate.

**Safety checklist for agents**
- I am using the canonical template as the source of truth.  
- I am applying only the task deltas.  
- I have **not** copied or cloned example code/files.  
- Output files and content are derived from the contract + styleMap + template rules only.
