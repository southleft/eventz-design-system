# 📜 Contracts & StyleMaps Guidelines for Agents

<!-- @agents:paths:start -->
### 📍 Canonical paths
- Components root: `packages/core/src/components/<ComponentName>/`
- Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
- styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`
> Source: AGENTS/META.yml (version: 1)
<!-- @agents:paths:end -->

This document explains **what contracts are**, **what styleMaps are**, and **how agents must use them** to generate components that are consistent with **DoXYZ** design tokens and **Radix UI Primitives** (Primitives only; Themes are disallowed as a `base`).

---

## 🧩 What is a Contract?

A **contract** is the single source of truth for a component’s **public API** and **generation hints**. It tells the agent:

* The **Radix base** to wrap (`base`), e.g., `Button`, `Badge`, `Switch`.
* The **props** (names, types, defaults, required).
* The **slots** that determine composition (e.g., `startIcon`, `label`, `endIcon`).
* Any **rules** (validation or implications like `loading ⇒ disabled`).
* Optional **layout** hints for how slots are arranged.
* Optional **hints** that provide adapter **structural** guidance only (e.g., wrapper usage). Do **not** pass Radix Theme styling props (e.g., `variant`, `color`); all visuals come from token classes in the styleMap.

> 🔑 **Blueprints do not define runtime TS prop types.** Those live in **core** when the component is generated. Blueprints only express the schema to guide the generator.
> ℹ️ **Radix base:** `base` refers to **Radix UI Primitives only** imported through this repo’s `radix-ui` convention. **Radix Themes are disallowed as a `base`.**


### Minimal schema (illustrative)

> Contracts are type-checked against `ContractSpec`
> (`packages/blueprints/src/utilities/defineContract/types.ts`)

> **Radix Primitive Policy:** Contracts must specify a **Radix Primitive** in `base`.
> Do **not** specify Radix Themes as `base`. All variant/color semantics are applied via **styleMap** token classes, not Theme props.

```ts
import { defineContract } from '../../utilities';

export const ButtonContract = defineContract({
  component: 'Button',
  description: 'Clickable action with label and optional icons.',
  base: 'Button', // Radix UI Primitive (Primitives only; Themes disallowed as base)

  props: {
    variant: {
      type: 'enum',
      options: ['primary', 'secondary', 'bare', 'knockout'] as const,
      default: 'primary'
    },

    // Button is never icon-only. Label is required.
    label: { type: 'string', required: true },

    // Icon slots (icon, spinner, or any React node). Truthiness drives spacing.
    startIcon: { type: 'slot' },
    endIcon:   { type: 'slot' },

    // Layout & state
    fullWidth: { type: 'boolean', default: false },
    loading:   { type: 'boolean', default: false },
    disabled:  { type: 'boolean', default: false },

    // Native passthrough
    type: { type: 'enum', options: ['button','submit','reset'] as const, default: 'button' },

    // Optional parity with Radix pattern
    asChild: { type: 'boolean', default: false }
  },

  // Slots in render order (must match slot props if present)
  slots: ['startIcon','label','endIcon'] as const,

  // Optional layout hint for the generator
  layout: {
    type: 'container',
    tag: 'button',
    className: 'flex items-center justify-center gap-2',
    children: [
      { slot: 'startIcon', tag: 'span', className: 'shrink-0 -ml-0.5' },
      { slot: 'label',     tag: 'span' },
      { slot: 'endIcon',   tag: 'span', className: 'shrink-0 -mr-0.5' }
    ]
  },

  rules: [
    {
      validate: ({ label }) => typeof label === 'string' && label.trim().length > 0,
      message: 'label must be non-empty'
    },
    { when: { loading: true }, imply: { disabled: true }, hint: 'Loading forces disabled and sets aria-busy' }
  ],

  styleMap: true,

  // Designer → Radix mapping hints
  hints: {
    // Adapters may provide structural hints only; do not rely on Radix Theme props.
    radixAdapter: { uses: ['Button'] as const }
  },
  // Generators MUST NOT pass Radix size/density props unless explicitly added to the contract.
  // Dimensions and spacing come from our styleMap tokens/utilities.
});
```

---

## 🎨 What is a StyleMap?

A **styleMap** binds the contract’s **variants/slots/layout/states** to **Tailwind classes** that are backed by **design tokens**. It is the “how it looks” counterpart to the contract’s “what it does.” Radix Theme props (e.g., `variant`, `color`) are not used; all visuals come from token classes.

* `base`: classes applied for all cases.
* `slots`: classes applied to the root container and each slot (e.g., `startIcon`, `label`, `endIcon`).
* `layout`: boolean toggles like `fullWidth`.
* `variants`: keys that **must** match contract variants (e.g., `primary`, `secondary`, …).
* `state`: extra class hooks for data/ARIA-driven states (e.g., `loading`).

> ✅ Use **token classes**, not ad-hoc colors.
> ✅ Only use utilities where no tokens exist (layout, typography scale, border presence `border`, ring thickness).

---

### Minimal schema (illustrative)

> StyleMaps are type-checked against `StyleMapSpec`
> (`packages/blueprints/src/utilities/defineStyleMap/types.ts`)
> Note: `defineStyleMap` is a no-op identity helper (like `defineContract`) that enforces `StyleMapSpec` and preserves literal arrays (use `as const` when helpful).
> **State key parity:** keys in `state` should mirror contract prop names (e.g., `loading`), so generators can toggle classes from props deterministically.


```ts
import { defineStyleMap } from '../../utilities';

export const ButtonStyleMap = defineStyleMap({
  base: [
    'inline-flex select-none items-center justify-center',
    'font-medium',
    'transition-colors',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-comp-button-focus-color-ring', // token class
    'focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'whitespace-nowrap'
  ] as const,

  // Single default size per spec (no size prop). Replace with tokens if/when available.
  slots: {
    container: ['h-10','px-4','gap-2','rounded-md'] as const,
    startIcon: ['shrink-0','-ml-0.5'] as const,
    label:     [] as const,
    endIcon:   ['shrink-0','-mr-0.5'] as const
  },

  layout: {
    fullWidth: ['w-full'] as const
  },

  // Variants: map directly to component tokens (plus utilities where necessary)
  variants: {
    primary: [
      'bg-comp-button-primary-color-background-default',
      'text-comp-button-primary-color-foreground-default',
      'hover:bg-comp-button-primary-color-background-hover',
      'active:bg-comp-button-primary-color-background-active'
    ] as const,

    secondary: [
      'bg-comp-button-secondary-color-background-default',
      'text-comp-button-secondary-color-foreground-default',
      'hover:bg-comp-button-secondary-color-background-hover',
      'active:bg-comp-button-secondary-color-background-active'
    ] as const,

    bare: [
      'bg-transparent',
      'text-comp-button-bare-color-foreground-default',
      'hover:bg-comp-button-bare-color-background-hover',
      'active:bg-comp-button-bare-color-background-active'
    ] as const,

    knockout: [
      'bg-transparent',
      'text-comp-button-knockout-color-foreground-default',
      'border', // utility to enable borders
      'border-comp-button-knockout-color-border-default',
      'hover:bg-comp-button-knockout-color-background-hover',
      'active:bg-comp-button-knockout-color-background-active'
    ] as const
  },

  state: {
    loading: ['cursor-wait','data-[loading=true]:opacity-100'] as const
  }
});
```

---

## 🎛️ Token Mapping (Style Dictionary → Tailwind)

Design tokens arrive under the `--dt-*` namespace. In `packages/core/styles/css/index.css` we map them to Tailwind’s theme namespace and obtain predictable utilities.

**Mapping pattern**

```css
@theme {
  /* Focus */
  --color-comp-button-focus-color-ring: var(--dt-comp-button-focus-color-ring);

  /* Primary */
  --color-comp-button-primary-color-background-default: var(--dt-comp-button-primary-color-background-default);
  --color-comp-button-primary-color-background-hover:   var(--dt-comp-button-primary-color-background-hover);
  --color-comp-button-primary-color-background-active:  var(--dt-comp-button-primary-color-background-active);
  --color-comp-button-primary-color-foreground-default: var(--dt-comp-button-primary-color-foreground-default);

  /* Secondary */
  --color-comp-button-secondary-color-background-default: var(--dt-comp-button-secondary-color-background-default);
  --color-comp-button-secondary-color-background-hover:   var(--dt-comp-button-secondary-color-background-hover);
  --color-comp-button-secondary-color-background-active:  var(--dt-comp-button-secondary-color-background-active);
  --color-comp-button-secondary-color-foreground-default: var(--dt-comp-button-secondary-color-foreground-default);

  /* Bare */
  --color-comp-button-bare-color-foreground-default:      var(--dt-comp-button-bare-color-foreground-default);
  --color-comp-button-bare-color-background-hover:        var(--dt-comp-button-bare-color-background-hover);
  --color-comp-button-bare-color-background-active:       var(--dt-comp-button-bare-color-background-active);

  /* Knockout */
  --color-comp-button-knockout-color-foreground-default:  var(--dt-comp-button-knockout-color-foreground-default);
  --color-comp-button-knockout-color-border-default:      var(--dt-comp-button-knockout-color-border-default);
  --color-comp-button-knockout-color-background-hover:    var(--dt-comp-button-knockout-color-background-hover);
  --color-comp-button-knockout-color-background-active:   var(--dt-comp-button-knockout-color-background-active);
}
```

> Optional: If your design tokens include a focus ring *offset color*, expose it too (e.g., `--color-focus-offset`) and prefer `focus-visible:ring-offset-[token]` over a fixed value.

**Resulting utilities used in styleMaps**

* `bg-comp-button-…`
* `text-comp-button-…`
* `border-comp-button-…`
* `focus-visible:ring-comp-button-focus-color-ring`

Utilities are also acceptable for:

* **Layout**: `h-*`, `px-*`, `gap-*`, `w-full`, `rounded-*`
* **Typography**: weights/line-heights if no component tokens exist
* **Borders presence**: `border`
* **Focus ring thickness/offset**: `focus-visible:ring-2`, `focus-visible:ring-offset-2`

### 🔁 Lossless mapping table (for generators)

> Generators **never edit** `@theme`. They assume mechanical mappings exist (or will be added by humans/component-gen). Keep mappings boring and reversible.

| Source token (dt)         | Theme var (Tailwind bucket)                                                            | Class prefix used in styleMaps             |
| ------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------ |
| `--dt-…-color-…`          | `--color-… : var(--dt-…-color-…)`                                                      | `bg-`, `text-`, `border-`                  |
| `--dt-font-size-<n>`      | `--text-font-size-<n>: calc(var(--dt-font-size-<n>) / var(--dt-base-font) * 1rem)`     | *(paired via size utility or `.text-*`)*   |
| `--dt-line-height-<n>`    | `--text-line-height-<n>: calc(var(--dt-line-height-<n>) / var(--dt-base-font) * 1rem)` | *(paired via size utility or `.text-*`)*   |
| `--dt-font-weight-<name>` | `--font-weight-font-weight-<name>: var(--dt-font-weight-<name>)`                              | used by weight utilities (e.g., `.font-*`) |
| `--dt-…-focus-color-ring` | `--color-…-focus-color-ring: var(--dt-…-focus-color-ring)`                             | `focus-visible:ring-…`                     |

**Rules**
- Strip the `--dt-` prefix; **prepend the Tailwind bucket** (`--color-`, `--text-font-size-`, `--text-line-height-`, `--font-weight-font-weight-`).
- Keep the **rest of the path unchanged** (lossless; e.g., `--font-weight-font-weight-bold`).
- Prefer Tailwind-built utilities when theme vars unlock them (e.g., `bg-*`, `text-*`, `border-*`, `focus-visible:ring-*`).
- If Tailwind cannot synthesize a utility (e.g., a bespoke caption size), emit a **tiny, single-purpose utility** in CSS that reads the mapped vars (e.g., `.text-caption-lg { font-size: var(--text-font-size-12); line-height: var(--text-line-height-18); }`).

---

## 🛠️ Agent Workflow (Contract + StyleMap → Component)

> **Separation of responsibilities**
> - **Blueprint generators** output only **contracts** and **styleMaps**. They do **not** modify `@theme`.
> - **Component generation** (in `packages/core/`) is responsible for verifying that any classes referenced by the styleMap are backed by theme vars/utilities in `styles/css/index.css`. When missing, add the exact theme var mapping (token-first) or a tiny utility.

**Component-gen confirmation checklist**
- [ ] For every `bg-*/text-*/border-*` class, the corresponding `--color-*` var exists in `@theme` and points to the `--dt-*` token.
- [ ] Typography: if `.text-*` is used, ensure the backing vars exist (e.g., `--text-sm`, `--text-sm--line-height`). If not, add granular pairs `--text-font-size-<n>` + `--text-line-height-<n>` and a small utility.
- [ ] Focus ring: confirm `--color-…-focus-color-ring` exists; leave thickness/offset as utilities unless tokenized.
- [ ] No reliance on Tailwind Preflight; base/reset comes from our token-driven base layer.

1. **Read** the Contract + StyleMap.
2. **Wrap** the Radix Primitive specified by `base`.
3. **Props**: Implement exactly as in contract. Support `asChild` only if present.
4. **Slots**: Compose `startIcon → label → endIcon` (or as declared). Use truthiness; never invent `hasX` booleans.
5. **Classes**: Compose with `composeClasses` (`packages/core/src/utilities/composeClasses/composeClasses.ts`):
   `base + slots.container + variants[variant] + layout.fullWidth? + state.loading?`
6. **Radix adapter**: If present, adapters may provide **structural** hints only (e.g., wrapper usage).
   Do **not** pass Theme `variant`/`color` props. All visual styling comes from the styleMap’s token classes.
7. **States**:

   * `disabled={disabled || loading}`
   * `data-loading={loading || undefined}`
   * `aria-busy={loading || undefined}`
8. **Events**: Do **not** invent handler props. Bind native handlers via `{...rest}` on the **root**. If a consumer provides `className`, **merge** it (append after composed classes so consumer utilities can override safely).
9. **A11y**:

   * Decorative icons use `aria-hidden="true"`.
   * The visible `label` provides the accessible name (icon-only belongs to **IconButton**, not **Button**).
   * Keep focus ring visible in all variants.
   * If `asChild` renders a non-native element as the control, also reflect disabled state with `aria-disabled="true"` when `disabled` is effective.

---

## 📦 Outputs (agent must generate)

Write to `packages/core/src/components/<ComponentName>/`:

* `<ComponentName>.tsx` — React component implementing the contract + styleMap
  (must export `<ComponentName>Props` interface defined in the same file)
* `<ComponentName>.stories.tsx` — Storybook stories covering all public props/variants
* `<ComponentName>.test.tsx` (or `__tests__/`) — Jest + RTL tests (render, slots, variant switching, baseline a11y)

See **AGENTS/GENERATION.md** for story/test structure and acceptance criteria.

**Test acceptance checklist (baseline):**
- Renders without crashing in all `variant` options.
- Applies the correct token classes per `variant` (assert with `toHaveClass`).
- `loading` sets `aria-busy` and disables the control; `disabled` is respected.
- `fullWidth` adds `w-full`.
- Slot truthiness controls spacing (`startIcon`/`endIcon` present vs absent).
- Focus ring token class is present on keyboard focus (RTL `tab` simulation).

---

### Radix Primitive–Only Base (Policy)
- `base` **must** be a Radix **Primitive**.
- Radix **Themes are disallowed** as a `base`.
- Do **not** pass Theme styling props (e.g., `variant`, `color`) via adapters.
- All visuals are token-driven through the **styleMap** (`bg-*`, `text-*`, `border-*`, `focus-visible:ring-*`).

## 🧱 Blueprints vs Core (Types & Ownership)

* **Blueprints** (`packages/blueprints/**`)

  * Contain **contracts** and **styleMaps** only.
  * No runtime prop interfaces.
  * Use `type: 'slot'` for slottable visuals (icons, loaders).

* **Core** (`packages/core/**`)

  * Contains generated React components + **exported prop interfaces**.
  * Shared runtime primitives (e.g., `IconSpec`, `IconSlot`) live in a shared types module under core (or `packages/contracts/types` if you prefer a neutral location). Components import from there.

---

### Naming & Semantics Invariants

- **No invented props:** only what’s declared in the contract. Events bind via `{...rest}`.
- **Icons & loaders:** use `type: 'slot'` (not runtime union types). Truthiness sets spacing.
- **Label is the accessible name** for Button-like controls (icon-only goes to IconButton).
- **Variants:** contract `props.variant.options` must match styleMap `variants` keys 1:1.
- **States:** prefer tokens for `hover/active/focus/disabled`; use utilities only when no token exists.
- **`asChild` usage:** only support it if the contract includes an `asChild` prop.
- **Reserved vs pass-through:** `className`, `style`, `id`, `onClick`, and other native attributes are pass-through via `{...rest}`; do not redefine them as explicit props in the contract.

---

## 🧬 Blueprint Type System

Contracts are validated against `ContractSpec`. Use these prop kinds only:

- `string` — textual value (optional `default`)
- `boolean` — flags (optional `default`)
- `number` — numeric value (optional `default`)
- `enum` — **use a const tuple**: `options: ['a','b'] as const` (so `default` is checked)
- `slot` — for slottable visuals (icons, loaders, arbitrary React nodes)

StyleMaps are validated against `StyleMapSpec` and accept:
- `base`: shared class list
- `slots`: `container`, plus slot names from the contract (e.g., `startIcon`, `label`, `endIcon`)
- `layout`: boolean toggles (e.g., `fullWidth`)
- `variants`: keys **must** match `props.variant.options` in the contract
- `state`: extra hooks for `data-*`/ARIA-driven states (e.g., `loading`)

---

### Disabled & Focus Tokens

- If the design tokens include **disabled** roles (e.g., `.../color/background/disabled`), prefer those:
  `disabled:bg-…`, `disabled:text-…`, `disabled:border-…`.
- If not, fall back to utilities:
  `disabled:opacity-50 disabled:pointer-events-none`.
- Focus ring color should use a token class (e.g., `focus-visible:ring-comp-button-focus-color-ring`).
  Thickness/offset may remain utilities (`focus-visible:ring-2`, `focus-visible:ring-offset-2`) unless tokenized.

---

### Inverse/Dark Surfaces

If tokens provide inverse/on-dark roles, prefer them with a container selector or data attribute, e.g.:

```css
/* Example container */
[data-surface="inverse"] .Button {
  /* swap to inverse tokens, e.g.: */
  --color-comp-button-primary-color-background-default: var(--dt-comp-button-primary-color-background-inverse);
}
```

---

### Icon Slot Conventions

- Icons in `startIcon` / `endIcon` inherit `currentColor`.
- Size icons to ~1em (or use a component icon size token when available); fall back to ~1em if no token exists.
- Use slot truthiness to space (`gap-*`) and apply subtle optical nudges (`-ml-0.5` / `-mr-0.5`).

---

## ✅ Contract & StyleMap Checklist

- [ ] `base` is the correct Radix UI Primitive.
- [ ] Contract enum `options` use **const tuples**; `default` is one of them.
- [ ] All slot props use `type: 'slot'`; the `slots` array lists them in render order.
- [ ] No invented props; events bind via `{...rest}` on the root element.
- [ ] StyleMap `variants` keys **exactly** match the contract’s `props.variant.options`.
- [ ] Color/semantic roles use **token classes** only (no hex/rgb literals).
- [ ] Extra states use `state` with `data-*` (e.g., `data-[loading=true]`) or native pseudo-classes.
- [ ] Focus ring uses a token for color; thickness/offset utilities are acceptable.
- [ ] `state` keys in styleMap mirror prop names in the contract (e.g., `loading`).

---

## 🏷️ RFC: Composite `base` shorthand (v0.1)

<!-- @rfc:base-compose v0.1 — 2025-09-09 -->

> Status: **Draft / do-not-implement**. This is a placeholder we’ll reference when composites enter the backlog.

**Goal:** Keep today’s `base` simple and Radix-first, but allow an easy upgrade path for composites without breaking existing contracts.

### Proposal

- `base` accepts `string | string[]`.
- **Default provider is Radix**. Unprefixed names (e.g., `Button`, `Badge`) resolve to `radix-ui` entrypoints used in this repo.
- Prefixed names select other sources:
  - `radix:Button` → Radix UI Primitive named export `Button`
  - `core:Card` → `packages/core/src/components/Card/Card`
  - `local:../foo/Bar` → relative import from the generated file
  - (Optional later) `npm:@scope/pkg#Export` (named) or `npm:@scope/pkg` (default)

### Semantics

- **String** form (today’s behavior):
  `base: "Button"` → render Radix `<Button>` as root.
- **Array** form (composite shorthand):
  `base: ["Badge", "core:Card", "core:Link"]`

  Expansion (wrappers applied **left → right** *around* the root):

```tsx
  <CoreCard>
    <CoreLink>
      <RadixBadge>{/* layout/slots */}</RadixBadge>
    </CoreLink>
  </CoreCard>
```

- The first item is the root element that owns layout/slots.

- Each subsequent item is a wrapper around the previous tree.

- If a wrapper supports pass-through (e.g., Radix `asChild`), agents may use it when needed.

---

## 🧪 CI Suggestions

Type-checking already enforces Contract/StyleMap shapes. Consider adding:

1) **Variant parity check**
   Assert that `Object.keys(styleMap.variants)` equals `contract.props.variant.options`.

*(Example script concept)* Read the contract and styleMap JSON (via ts-node or AST), then:

```ts
const contractVariants = new Set(contract.props.variant.options);
const mapVariants = new Set(Object.keys(styleMap.variants ?? {}));
if (contractVariants.size !== mapVariants.size || [...contractVariants].some(v => !mapVariants.has(v))) {
  throw new Error('Variant keys in styleMap must match contract.props.variant.options');
}
```

2) **Slot parity check**
   If a slot prop exists (`type:'slot'`), ensure it appears in `slots` and (optionally) in `styleMap.slots`.

3) **Token-only color rule**
   Lint to forbid hard-coded color classes in `variants` (allow only `bg-*/text-*/border-*` that start with `comp-` or your token prefix).

These can run as a pre-commit hook or a CI step.

---

## ✅ Do / Don’t

**Do**

* Mirror the design spec exactly with token classes.
* Keep variants in contract and in styleMap 1:1.
* Prefer token classes; use utilities only when tokens don’t exist.

**Don’t**

* Don’t hard-code hex/rgb colors.
* Don’t introduce props that aren’t in the contract.
* Don’t add size/shape/density unless the spec requires them.

---

## 🔎 Worked Example: Button (summary)

**Contract highlights**

* `base: 'Button'`
* `variant: 'primary' | 'secondary' | 'bare' | 'knockout'` (default `'primary'`)
* `label` required; `startIcon`/`endIcon` are `slot`s
* `fullWidth`, `loading`, `disabled`, `type`, optional `asChild`

**StyleMap highlights**

* Token-driven variant classes:

  * `primary`: `bg-comp-button-primary-color-background-default` + `text-…foreground-default` + `hover:bg-…-hover` + `active:bg-…-active`
  * `secondary`: `bg-comp-button-secondary-…` + `text-…`
  * `bare`: `text-comp-button-bare-…` + `hover:bg-…-hover` + `active:bg-…-active`
  * `knockout`: `text-…` + `border-…` + `hover/active bg-…`
* Focus ring via token: `focus-visible:ring-comp-button-focus-color-ring`
* Layout utilities where tokens aren’t specified (`h-10 px-4 gap-2 rounded-md`, `w-full` for `fullWidth`)

This guide is sufficient context for any agent to generate compliant **contracts**, **styleMaps**, and the corresponding **components**, **stories**, and **tests**.
