# Checkbox
*Type: client* | *Base: RadixCheckbox.Root* | *Last updated: 2025-11-11*

## Overview
Checkbox renders a Radix checkbox with a visible label, optional hint copy, and focus ring tokens that align with the rest of the system. It merges custom `aria-describedby` with hint ids, enforces a non-empty label, and forwards form props (`name`, `value`, `required`, `checked`). Use it for single Boolean selections or as part of CheckboxGroup.

---

## Import

### Component
```ts
import { Checkbox } from '@eventz-ui/core/client/Checkbox';
```

### Types

```ts
import type { CheckboxProps } from '@eventz-ui/core/client/Checkbox';
```

---

## Usage

```tsx
<Checkbox { ...props } />
```

---

## Props (Declared + Inherited)

| Prop        | Type        | Default | Required | Notes |
| ----------- | ----------- | ------: | :------: | ----- |
| `checked`   | `boolean`   |   `false` |          | Controlled flag that mirrors the Radix `checked` prop; omit to use the internal state. |
| `className` | `string`    |         |          | Appends utility classes to the outer container. |
| `disabled`  | `boolean`   |   `false` |          | Dims the entire row and disables pointer/keyboard input. |
| `hint`      | `string`    |         |          | Helper text rendered beneath the label; its id is merged into `aria-describedby`. |
| `label`     | `string`    |         |   Yes    | Visible label text linked to the control via `htmlFor`. |
| `name`      | `string`    |         |          | Form field name submitted with checked values. |
| `required`  | `boolean`   |   `false` |          | Sets the native `required` attribute and can be paired with helper copy. |
| `value`     | `string`    |         |          | Submitted form value when checked; Radix defaults to `'on'` when omitted. |

* **Extends:** Radix `Checkbox.Root` props minus: `children`, `className`, `checked`, `disabled`, `name`, `required`, `value`
* **Forwards:** Standard Radix checkbox props (`onCheckedChange`, `defaultChecked`, etc.) plus native form attributes to the underlying control.

---

## Structure

* **container** — Inline flex row housing the control and text block; applies disabled styling.
* **control** — `RadixCheckbox.Root`; receives focus ring tokens and form props.
* **indicator** — `RadixCheckbox.Indicator`; renders the `CheckIcon` when checked.
* **label** — `<label>` tied to the control id.
* **hint** — Optional helper text block placed under the label.

> DOM structure sketch:

```jsx
<div data-slot="container">
  <RadixCheckbox.Root id={controlId} data-slot="control" ...>
    <RadixCheckbox.Indicator data-slot="indicator">
      <CheckIcon aria-hidden="true" />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
  <div>
    <label data-slot="label" htmlFor={controlId}>{label}</label>
    {hint && (
      <div data-slot="hint" id={hintId}>{hint}</div>
    )}
  </div>
</div>
```

---

## Data Attributes & States

| State flag                  | Effect |
| --------------------------- | ------ |
| `aria-describedby="hint"`  | Connects the control to the hint text so assistive tech reads guidance after the label. |
| *(disabled styling)*        | When `disabled` is true the container applies `opacity-50 pointer-events-none`, visually signaling the state. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `inline-flex` `items-start` `gap-2` `select-none` |
| `control` | `size-5` `bg-background-none` `border-2` `border-color-content-weak` `rounded-xs` `inline-flex` `justify-center` `items-center` `focus-visible-brand` |
| `indicator` | `bg-color-content-brand` `border-color-content-brand` `border-[2.5px]` `h-4` `rounded-xs` `hover:bg-comp-checkbox-checked-color-background-hover` `active:bg-comp-checkbox-checked-color-background-active` `text-comp-checkbox-checked-color-icon-default` |
| `label` | `text-color-content-default` `text-sm` `leading-tight` |
| `hint` | `text-color-content-subtle` `text-xs` |
| `container (state: disabled)` | `opacity-50` `pointer-events-none` |

---

## Accessibility

* **Name:** Comes from the required `label`. The component throws if the label is empty.
* **Keyboard:** Native checkbox semantics—Space toggles, Tab navigates, Shift+Tab reverses focus.
* **Roles/States:** Radix handles `role="checkbox"` along with `aria-checked`. Required and disabled map to native attributes.
* **Announcements:** When `hint` exists its id is merged into `aria-describedby`, so readers hear “Label, checkbox, hint text.”
* **Icon-only pattern:** Not applicable; the label is always present.

---

## Patterns & Examples

### Standalone checkbox

```tsx
<Checkbox label="Remember me" />
```

- Use for single Boolean toggles (remember me, accept terms, etc.).
- Combine with `required` when the choice is mandatory.

### With hint text

```tsx
<Checkbox
  label="Enable weekly digest"
  hint="Sends a summary every Monday at 9am."
  checked={digest}
  onCheckedChange={setDigest}
/>
```

- Keep hint copy short; it appears directly under the label.
- Controlled usage keeps UI in sync with form state managers.

### Disabled state

```tsx
<Checkbox label="Admin access" disabled hint="Only owners can change this." />
```

- Disabled styling applies to the full row so it’s obvious the choice can’t be toggled.
- Provide a hint or tooltip to explain why the option is locked.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `7c21a45a181a6f797ac5b7d3295f1759e344e29090f9f2f64f686b4722efcc87`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
