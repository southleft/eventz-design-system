# 📜 Contracts & StyleMaps Guidelines for Agents

<!-- @agents:paths:start -->

### 📍 Canonical paths

* Components root: `packages/core/src/components/<ComponentName>/`
* Contract: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.contract.ts`
* styleMap: `packages/blueprints/src/components/<ComponentName>/<ComponentName>.styleMap.ts`

> Source: AGENTS/META.yml (version: 1)

<!-- @agents:paths:end -->

This document explains **what contracts are**, **what styleMaps are**, and **how agents must use them** to generate components that are consistent with **DoXYZ** design tokens and **Radix Themes** primitives.

---

## 🧩 What is a Contract?

A **contract** is the single source of truth for a component’s **public API** and **generation hints**. It tells the agent:

* The **Radix base** to wrap (`base`), e.g., `Button`, `Badge`, `Switch`.
* The **props** (names, types, defaults, required).
* The **slots** that determine composition (e.g., `startIcon`, `label`, `endIcon`).
* Any **rules** (validation or implications like `loading ⇒ disabled`).
* Optional **layout** hints for how slots are arranged.
* Optional **hints** that help adapters map design variants to Radix props.

> 🔑 **Blueprints do not define runtime TS prop types.** Those live in **core** when the component is generated. Blueprints only express the schema to guide the generator.

### Minimal schema (illustrative)

```ts
import { defineContract } from '../../utilities';

export const ButtonContract = defineContract({
  component: 'Button',
  description: 'Clickable action with label and optional icons.',
  base: 'Button', // Radix Themes primitive name

  props: {
    variant: {
      type: 'enum',
      options: ['primary', 'secondary', 'bare', 'knockout'],
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
    type: { type: 'enum', options: ['button','submit','reset'], default: 'button' },

    // Optional parity with Radix pattern
    asChild: { type: 'boolean', default: false }
  },

  // Slots in render order
  slots: ['startIcon','label','endIcon'],

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
    { validate: ({ label }) => typeof label === 'string' && label.trim().length > 0, message: 'label must be non-empty' },
    { when: { loading: true }, imply: { disabled: true }, hint: 'Loading forces disabled and sets aria-busy' }
  ],

  // Signals that a styleMap exists for this component
  styleMap: true,

  // Adapter hints (designer → Radix)
  hints: {
    radixAdapter: {
      variantMap: {
        primary:  { variant: 'solid',   color: 'blue'  },
        secondary:{ variant: 'soft',    color: 'gray'  },
        bare:     { variant: 'ghost',   color: 'gray'  },
        knockout: { variant: 'outline', color: 'blue'  }
      }
    }
  }
});
```

---

## 🎨 What is a StyleMap?

A **styleMap** binds the contract’s **variants/slots/layout/states** to **Tailwind classes** that are backed by **design tokens**. It is the “how it looks” counterpart to the contract’s “what it does.”

* `base`: classes applied for all cases.
* `slots`: classes applied to the root container and each slot (e.g., `startIcon`, `label`, `endIcon`).
* `layout`: boolean toggles like `fullWidth`.
* `variants`: keys that **must** match contract variants (e.g., `primary`, `secondary`, …).
* `state`: extra class hooks for data/ARIA-driven states (e.g., `loading`).

> ✅ Use **token classes**, not ad-hoc colors.
> ✅ Only use utilities where no tokens exist (layout, typography scale, border presence `border`, ring thickness).

### Minimal schema (illustrative)

```ts
import { defineStyleMap } from '../../utilities';

export const ButtonStyleMap = defineStyleMap('Button', {
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
  ],

  // Single default size per spec (no size prop). Replace with tokens if/when available.
  slots: {
    container: ['h-10','px-4','gap-2','rounded-md'],
    startIcon: ['shrink-0','-ml-0.5'],
    label: [],
    endIcon: ['shrink-0','-mr-0.5']
  },

  layout: {
    fullWidth: ['w-full']
  },

  // Variants: map directly to component tokens (plus utilities where necessary)
  variants: {
    primary: [
      'bg-comp-button-primary-color-background-default',
      'text-comp-button-primary-color-foreground-default',
      'hover:bg-comp-button-primary-color-background-hover',
      'active:bg-comp-button-primary-color-background-active'
    ],

    secondary: [
      'bg-comp-button-secondary-color-background-default',
      'text-comp-button-secondary-color-foreground-default',
      'hover:bg-comp-button-secondary-color-background-hover',
      'active:bg-comp-button-secondary-color-background-active'
    ],

    bare: [
      'bg-transparent',
      'text-comp-button-bare-color-foreground-default',
      'hover:bg-comp-button-bare-color-background-hover',
      'active:bg-comp-button-bare-color-background-active'
    ],

    knockout: [
      'bg-transparent',
      'text-comp-button-knockout-color-foreground-default',
      'border', // utility to enable borders
      'border-comp-button-knockout-color-border-default',
      'hover:bg-comp-button-knockout-color-background-hover',
      'active:bg-comp-button-knockout-color-background-active'
    ]
  },

  state: {
    loading: ['cursor-wait','data-[loading=true]:opacity-100']
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

---

## 🛠️ Agent Workflow (Contract + StyleMap → Component)

1. **Read** the Contract + StyleMap.
2. **Wrap** the Radix base specified by `base`.
3. **Props**: Implement exactly as in contract. Support `asChild` only if present.
4. **Slots**: Compose `startIcon → label → endIcon` (or as declared). Use truthiness; never invent `hasX` booleans.
5. **Classes**: Compose via `clsx/cx`:
   `base + slots.container + variants[variant] + layout.fullWidth? + state.loading?`
6. **Radix adapter**: Use `hints.radixAdapter.variantMap` to set Radix `variant`/`color` props when provided.
7. **States**:

   * `disabled={disabled || loading}`
   * `data-loading={loading || undefined}`
   * `aria-busy={loading || undefined}`
8. **Events**: Do **not** invent handler props. Bind native handlers via `{...rest}` spread on the root element.
9. **A11y**:

   * Decorative icons use `aria-hidden="true"`.
   * The visible `label` provides the accessible name (icon-only belongs to **IconButton**, not **Button**).
   * Keep focus ring visible in all variants.

---

## 📦 Outputs (agent must generate)

Write to `packages/core/src/components/<ComponentName>/`:

* `<ComponentName>.tsx` — React component implementing the contract + styleMap
  (must export `<ComponentName>Props` interface defined in the same file)
* `<ComponentName>.stories.tsx` — Storybook stories covering all public props/variants
* `<ComponentName>.test.tsx` (or `__tests__/`) — Jest + RTL tests (render, slots, variant switching, baseline a11y)

See **AGENTS/GENERATION.md** for story/test structure and acceptance criteria.

---

## 🧱 Blueprints vs Core (Types & Ownership)

* **Blueprints** (`packages/blueprints/**`)

  * Contain **contracts** and **styleMaps** only.
  * No runtime prop interfaces.
  * Use `type: 'slot'` for slottable visuals (icons, loaders).

* **Core** (`packages/core/**`)

  * Contains generated React components + **exported prop interfaces**.
  * Shared runtime primitives (e.g., `IconSpec`, `IconSlot`) live in a shared types module under core (or `packages/contracts/types` if you prefer a neutral location). Components import from there.

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
* Radix adapter mapping (primary→solid/blue, secondary→soft/gray, bare→ghost/gray, knockout→outline/blue)

**StyleMap highlights**

* Token-driven variant classes:

  * `primary`: `bg-comp-button-primary-color-background-default` + `text-…foreground-default` + `hover:bg-…-hover` + `active:bg-…-active`
  * `secondary`: `bg-comp-button-secondary-…` + `text-…`
  * `bare`: `text-comp-button-bare-…` + `hover:bg-…-hover` + `active:bg-…-active`
  * `knockout`: `text-…` + `border-…` + `hover/active bg-…`
* Focus ring via token: `focus-visible:ring-comp-button-focus-color-ring`
* Layout utilities where tokens aren’t specified (`h-10 px-4 gap-2 rounded-md`, `w-full` for `fullWidth`)

This guide is sufficient context for any agent to generate compliant **contracts**, **styleMaps**, and the corresponding **components**, **stories**, and **tests**.
