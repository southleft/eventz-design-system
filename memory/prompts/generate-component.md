# Generate Component from Contract and styleMap

You are a component generation agent for the DoXYZ design system. Follow the repository rules in:
- `AGENTS/GENERATION.md`
- `AGENTS/CODE_REVIEW.md`
- `AGENTS/PR_PROTOCOL.md`

If any conflict exists between this template and the AGENTS docs, **AGENTS docs take precedence**.

## Git Workflow
1. Always branch from `development`.
2. Create a new branch named `feature/{{componentName}}`.
3. Place generated files in `{{destination}}`.
4. Commit with message: `feat({{componentName}}): add component, test, and story`.
5. Open a pull request targeting `development` with a title prefixed by `🤖`.

## Inputs
- `componentName`: The name of the component to generate (e.g., `Badge`)

## Paths
- `contract`: `packages/blueprints/src/components/{{componentName}}/{{componentName}}.contract.ts`
- `styleMap`: `packages/blueprints/src/components/{{componentName}}/{{componentName}}.styleMap.ts`
- `destination`: `packages/core/src/components/{{componentName}}`

## Output Files
Generate all of the following inside `{{destination}}`:

1. `{{componentName}}.tsx`
   - Export a named interface for props (e.g., `BadgeProps`) inferred from the contract.
   - Use the Radix primitive if `contract.base` is defined; support `asChild` if declared.
   - Apply Tailwind classes from the styleMap using `composeClasses` (`packages/core/src/utilities/composeClasses/composeClasses.ts`); prefer template literals for static strings; avoid string concatenation (`+`) and array joins.
   - Conditionally render slots exactly as defined in the contract layout.
   - If a layout wrapper is specified (e.g., `layout: { tag: 'span', className: '...' }`), apply it inside the component.
   - Export the component as a named export (e.g., `export const Badge = …`).

2. `{{componentName}}.test.tsx`
   - Use Jest and React Testing Library.
   - Test: basic rendering, slot presence, variant class behavior (switching), baseline a11y.
   - Prefer role/text queries (`screen.getByRole`, `getByText`) over snapshots.

3. `{{componentName}}.stories.tsx`
   - Default export: `title: 'Components/{{componentName}}'`, `component: {{componentName}}`.
   - Include at least one named story (e.g., `Default`) and expose controls for all public props.
   - Use placeholders (emoji/inline SVG) for icon/slot demos.

## Rules
- Treat the contract and styleMap as the **single source of truth**; do not invent props, slots, or classes.
- Props, slots, layout, and Radix base must match the contract exactly.
- Classes and variants must match the styleMap exactly.
- Do not add props, slots, or classes not defined by these sources.
- Apply Tailwind classes using `composeClasses`; prefer template literals for static strings; avoid string concatenation (`+`) and array joins.
- Honor `layout` (including child container and slot order) exactly.
- Support Radix `asChild` using `Slot` when declared.
- Follow existing project patterns for typing, file layout, and naming.
- Do not emit unused imports or unused props.
- For native elements (e.g., `<a>`, `<button>`, `<input>`), do not add custom event suppression or override native props (`tabIndex`, `rel`, etc.) unless the blueprint explicitly requires it.

## Accessibility & Testing Guardrails
- Decorative icons must have `aria-hidden="true"`.
- Interactive elements must have accessible names (`aria-label`, `aria-labelledby`, or visible text).
- Prefer role-based queries in tests where applicable.

## Output Summary (return these keys)
- `componentPath`, `storiesPath`, `testsPath`
- `props`: list with name, type, default (from contract)
- `variants`: list (from styleMap)
- `slots`: list (from contract layout)
- `notes`: any assumptions due to missing/ambiguous data
- `compliance`: `true|false` for whether all contract/styleMap requirements were satisfied
