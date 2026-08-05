---
title: Radio Button Group
description: Single-select form control presenting mutually exclusive choices, each with a labeled radio and optional hint text, across default, hover, focus, checked, and disabled states.
status: stable
version: 1.0.0
category: components
level: atom
tags: [radio, radio-button, radio-group, form, selection, input]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2323-780
source: packages/core/src/components/client/RadioButtonGroup/RadioButtonGroup.tsx
package: "@eventz-ui/core"
system: Eventz
canonical: reconciled
lastUpdated: 2026-08-05
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2323-780)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/RadioButtonGroup/RadioButtonGroup.tsx)** | **[Storybook](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/RadioButtonGroup/RadioButtonGroup.stories.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

A form control that allows users to select a single option from a group of mutually exclusive choices.
Each choice pairs a circular selection indicator with a descriptive text label and optional hint text
for additional context. It supports default, hover, focus, and disabled states with clear visual
feedback, and enforces single-selection behavior within the group.

In Figma this is modeled as a single **Radio Button** atom. In code there is no standalone radio —
`RadioButtonGroup` renders the whole set from a `choices` array, wrapped in a `<fieldset>`/`<legend>`
so the group relationship is conveyed semantically.

### Selection state

- **`isChecked: true`** — displays a filled center indicator showing the selected state.
- **`isChecked: false`** — appears empty, indicating an unselected state.

### Interactive states

- **`default`** — standard display state with base styling.
- **`hover`** — visual feedback when the cursor is positioned over the radio button.
- **`focus`** — keyboard focus indicator for accessibility navigation.

### Disabled state

- **`isDisabled: true`** — non-interactive state with reduced opacity.
- **`isDisabled: false`** — standard interactive functionality enabled.

### Content configuration

- **`label`** — primary text describing the radio button option.
- **`hasHint: true`** — supporting text appears below the label providing additional context.
- **`hasHint: false`** — only the primary label is displayed.

## Component Anatomy

```
RadioButtonGroup (fieldset, vertical auto-layout)
├── legend            [data-slot="label"]        — group label (sr-only when only ariaLabel given)
│   └── InfoPopover (optional, when `info` set)
├── hint (optional)   [data-slot="hint"]         — group-level supporting text
├── RadioGroup.Root   [data-slot="radiogroup"]   — vertical stack, gap 8px
│   └── per choice (Label.Root, horizontal, gap 8px)
│       ├── control   [data-slot="control"]      — 16px circle, 1px border
│       │   └── indicator [data-slot="indicator"] — 8px filled brand dot when selected
│       └── vertical stack
│           ├── choiceLabel [data-slot="choiceLabel"]
│           └── choiceHint  [data-slot="choiceHint"] (optional)
└── error (optional)  [data-slot="error"]        — ErrorIcon + message
```

### Design structure (Figma)

```
state=default, isChecked=false, isDisabled=false (COMPONENT) — horizontal auto-layout, gap: 4px [fixed-width]
├── Icons/Radio (INSTANCE)
│   └── Icon (VECTOR)
└── vertical stack — vertical auto-layout [fixed-height, fill]
    ├── Label (TEXT)
    └── .Inline hint (INSTANCE)
        └── Supporting text (TEXT)
```

## Variants

The Figma component ships **9 variants** across three axes: `state` (default / hover / focus),
`isChecked` (false / true), and `isDisabled` (false / true).

| state | isChecked | isDisabled | Control color | Focus ring |
|---|---|---|---|---|
| default | false | false | `color/content/weak` (#5B5D5E) | — |
| hover | false | false | `color/content/weak-hover` (#2C2E30) | — |
| focus | false | false | `color/content/weak` (#5B5D5E) | `comp/border/focus-ring` (#2D6079) |
| default | false | true | `color/content/weak` (#5B5D5E) | — |
| focus | false | true | `color/content/weak` (#5B5D5E) | `comp/border/focus-ring` (#2D6079) |
| default | true | false | `color/content/brand` (#224B60) | — |
| focus | true | false | `color/content/brand` (#224B60) | `comp/border/focus-ring` (#2D6079) |
| default | true | true | `color/content/brand` (#224B60) | — |
| focus | true | true | `color/content/brand` (#224B60) | `comp/border/focus-ring` (#2D6079) |

All variants use the `s/Radio` icon instance for the control.

<Note>
Figma has no `hover` variant paired with `isChecked: true`, and no dedicated disabled-hover variant.
In code, hover and focus are CSS pseudo-classes rather than props, so those combinations are still
reachable at runtime.
</Note>

### Configurable properties (Figma)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `state` | `"default" \| "focus" \| "hover"` | `"default"` | Interaction state (design-time) |
| `isChecked` | `"true" \| "false"` | `"false"` | Selected vs unselected |
| `isDisabled` | `"false" \| "true"` | `"false"` | Non-interactive, muted styling |
| `hasHint` | `boolean` | `true` | Shows/hides the supporting text |
| `label` | `string` | `"Label"` | Choice label content |

## Token Specification

### Color

| Element | Figma Variable | Value |
|---------|---------------|-------|
| Control border (unchecked) | `color/content/weak` | #5B5D5E |
| Control border (unchecked, hover) | `color/content/weak-hover` | #2C2E30 |
| Indicator + border (checked) | `color/content/brand` | #224B60 |
| Surface | `color/background/default` | #FFFFFF |
| Label | `color/content/default` | #252729 |
| Supporting text | `color/content/subtle` | #424446 |
| Focus ring | `comp/border/focus-ring` | #2D6079 |
| Error text | `color/content/utility-danger-subtle` | — |

### Spacing

| Property | Figma Variable | Value |
|----------|---------------|-------|
| Gap (control ↔ label) | `spacing/1` | 4px in Figma · 8px in code (`gap-2`) |
| Gap (between choices) | — | 8px (`gap-2`) |
| Control size | — | 16px (`size-4`) |
| Indicator size | — | 8px (`size-2`) |
| Border width | — | 1px |

### Typography

| Element | Font | Weight | Size | Line height |
|---------|------|--------|------|-------------|
| Label | Geist | Medium (500) | 14px | 20px |
| Supporting text | Geist | Medium (500) | 12px | 18px |

## Usage Guidelines

**Primary use cases**

- Form sections requiring a single selection from multiple options
- Settings panels with exclusive configuration choices
- Survey questions with mutually exclusive answers
- Payment method or shipping option selection
- Filter controls where only one option can be active

**Implementation considerations**

- Group related radio buttons using proper form semantics — `RadioButtonGroup` handles this via `fieldset`/`legend`.
- Ensure only one option can be selected within each group.
- Provide clear, descriptive labels that explain each option.
- Use hint text to clarify complex or ambiguous choices.
- Consider a `defaultValue` for improved user experience.
- Use a Checkbox group instead when more than one option may be selected.

## Implementation

### Import

```tsx
import { RadioButtonGroup } from '@eventz-ui/core/client-components';
```

### Component API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `choices` | `ReadonlyArray<{ value: string; label?: string; disabled?: boolean; hint?: string }>` | — (required) | Radio button definitions. Each item provides a unique value and optional label, disabled, and hint text. Falls back to `value` when `label` is omitted. |
| `label` | `string` | — | Visible legend text describing the radio group. Either `label` or `ariaLabel` is required — the component throws if both are empty. |
| `ariaLabel` | `string` | — | Accessible name when no visible legend is wanted; renders the legend with `sr-only`. |
| `hint` | `string` | — | Supporting text for the whole group, wired to the fieldset via `aria-describedby`. |
| `info` | `string` | — | Content for an InfoPopover rendered beside the legend. Only renders when `label` is also present. |
| `error` | `string` | — | Error message; renders with `ErrorIcon`, sets `aria-invalid` and `data-has-error` on the fieldset. |
| `value` | `string` | — | Controlled value for the selected radio option. |
| `defaultValue` | `string` | — | Initial selected value for uncontrolled usage. |
| `onValueChange` | `(value: string) => void` | — | Called when the selected value changes; receives the next value as a string. |
| `name` | `string` | — | Applied to radio group items for form submission when provided. |
| `disabled` | `boolean` | — | Disables the entire group (Radix passthrough). Individual choices can be disabled via `choices[].disabled`. |

Built on [Radix UI RadioGroup](https://www.radix-ui.com/primitives/docs/components/radio-group)
(`RadioGroup.Root` / `Item` / `Indicator`), wrapped in a fieldset with a legend for grouped labeling.

### Sub-parts

| `data-slot` | Element | Description |
|---|---|---|
| `label` | `<legend>` | Group label; receives `sr-only` when only `ariaLabel` is supplied. |
| `hint` | `<div>` | Group-level supporting text, referenced by `aria-describedby`. |
| `radiogroup` | `<div>` | The Radix `RadioGroup.Root` wrapper. |
| `control` | `<button>` | The radio input itself (`RadioGroup.Item`) — 16px circle, 1px border, brand focus ring. |
| `indicator` | `<span>` | 8px filled brand dot shown when selected; `aria-hidden`. |
| `choiceLabel` | `<span>` | Per-choice label text, linked via `aria-labelledby`. |
| `choiceHint` | `<div>` | Per-choice supporting text, linked via `aria-describedby`. |
| `error` | `<div>` | Error message row with leading `ErrorIcon`. |

### Variant definition

```tsx
// Tailwind class groups (no CVA) — RadioButtonGroup.tsx
const controlClasses = `
  flex flex-col gap-3 items-center justify-center size-4 shrink-0 rounded-full border mt-0.5
  border-color-content-weak bg-background-none focus:outline-none disabled:opacity-50 focus-visible-brand
`;

const indicatorClasses = `
  pointer-events-none block size-2 rounded-full bg-color-content-brand
`;
```

### Usage examples

#### Basic uncontrolled group

```tsx
<RadioButtonGroup
  label="Ticket type"
  defaultValue="general"
  choices={[
    { value: 'general', label: 'General admission' },
    { value: 'vip', label: 'VIP' },
  ]}
/>
```

#### Controlled, with hint and error

```tsx
const [tier, setTier] = React.useState('');

<RadioButtonGroup
  label="Ticket type"
  hint="You can change this later."
  error={tier ? undefined : 'Select a ticket type.'}
  value={tier}
  onValueChange={setTier}
  choices={[
    { value: 'general', label: 'General admission', hint: 'Standing room' },
    { value: 'vip', label: 'VIP', hint: 'Includes lounge access' },
    { value: 'press', label: 'Press', disabled: true },
  ]}
/>
```

### Source files

| File | Role |
|------|------|
| `packages/core/src/components/client/RadioButtonGroup/RadioButtonGroup.tsx` | Component implementation |
| `packages/core/src/components/client/RadioButtonGroup/RadioButtonGroup.stories.tsx` | Storybook stories: Default, WithInfo, WithError, PerChoiceDisabled, ManyChoices |
| `packages/core/src/components/client/RadioButtonGroup/RadioButtonGroup.test.tsx` | Unit tests |
| `packages/blueprints/src/components/RadioButtonGroup/RadioButtonGroup.contract.ts` | Blueprint prop contract |
| `packages/blueprints/src/components/RadioButtonGroup/RadioButtonGroup.styleMap.ts` | Blueprint style map |

## Accessibility

- Radio buttons are grouped in a `<fieldset>` with a `<legend>` so screen readers announce the group relationship.
- Either `label` or `ariaLabel` is mandatory — the component throws rather than rendering an unlabeled group.
- Each choice label is associated with its control via `aria-labelledby`; per-choice hints via `aria-describedby`.
- Group-level `hint` and `error` are wired to the fieldset through `aria-describedby`.
- Selection changes are announced by assistive technology via the underlying Radix radio semantics.
- Focus indicators are visible for keyboard navigation (`focus-visible-brand`, ring `#2D6079`).
- When `error` is set, `aria-invalid` is applied so the invalid state is not conveyed by color alone.
- Disabled choices render at reduced opacity — verify contrast for your surface, and prefer explaining
  *why* an option is unavailable via `hint` text rather than relying on the disabled styling alone.

## Design-Code Parity

| Axis | In Figma | In Code | Status |
|---|---|---|---|
| `isChecked` | Yes | Yes (`value` / `defaultValue`) | Matched |
| `isDisabled` | Yes | Yes (`disabled`, `choices[].disabled`) | Matched |
| `state` (hover / focus) | Yes (variant) | CSS pseudo-classes, not a prop | Expected difference — design-time only |
| `hasHint` | Yes | Yes (`choices[].hint`) | Matched |
| Group wrapper (legend, hint, error, info) | Not modeled | Yes | Code-only — Figma models the single atom |
| Control ↔ label gap | 4px (`spacing/1`) | 8px (`gap-2`) | **Mismatch — needs reconciliation** |
