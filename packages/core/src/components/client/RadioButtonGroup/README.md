# RadioButtonGroup
*Type: client* | *Base: fieldset/RadioGroup.Root* | *Last updated: 2025-11-11*

## Overview
RadioButtonGroup wraps Radix `RadioGroup` inside a labeled fieldset so single-select questions share the same labeling, hint/error, and info popover patterns as other inputs. It enforces a visible `label` or `ariaLabel`, renders each choice with optional sub-hint copy, and forwards Radix props such as `value`, `defaultValue`, and `orientation`.

---

## Import

### Component
```ts
import { RadioButtonGroup } from '@eventz-ui/core/client/RadioButtonGroup';
```

### Types

```ts
import type { RadioButtonGroupProps } from '@eventz-ui/core/client/RadioButtonGroup';
```

---

## Usage

```tsx
<RadioButtonGroup { ...props } />
```

---

## Props (Declared + Inherited)

| Prop             | Type                                                           | Default | Required | Notes |
| ---------------- | -------------------------------------------------------------- | ------: | :------: | ----- |
| `ariaLabel`      | `string`                                                       |         |          | Accessible name announced when `label` is omitted (legend becomes sr-only).
| `choices`        | `ReadonlyArray<{ value: string; label?: string; disabled?: boolean; hint?: string }>` |         |   Yes    | Data backing each radio item; `hint` renders under the choice label.
| `className`      | `string`                                                       |         |          | Appends utility classes to the outer fieldset.
| `defaultValue`   | `string`                                                       |         |          | Initial selection for uncontrolled usage (forwarded to `RadioGroup.Root`).
| `dir`            | `'ltr' \| 'rtl'`                                              |         |          | Direction hint forwarded to Radix for keyboard navigation.
| `disabled`       | `boolean`                                                      |         |          | Disables every radio item and dims the group.
| `error`          | `string`                                                       |         |          | Error message displayed under the group with a decorative icon; also toggles `aria-invalid`.
| `hint`           | `string`                                                       |         |          | Helper copy rendered below the legend when no error is present.
| `info`           | `string`                                                       |         |          | Supplemental context surfaced via `InfoPopover` next to the label.
| `label`          | `string`                                                       |         |          | Visible legend text; required unless `ariaLabel` is provided.
| `loop`           | `boolean`                                                      |         |          | When true, arrow key navigation wraps from last to first choice (Radix prop).
| `name`           | `string`                                                       |         |          | Form field name applied to each `RadioGroup.Item` for submission.
| `onValueChange`  | `(value: string) => void`                                     |         |          | Fired whenever the selection changes (Radix prop).
| `orientation`    | `'horizontal' \| 'vertical'`                                   | `'vertical'` |        | Switch to `horizontal` to lay choices out in a row (Radix prop).
| `required`       | `boolean`                                                      |         |          | Marks the radios as required for form validation.
| `value`          | `string`                                                       |         |          | Controlled selection value; pair with `onValueChange`.

* **Extends:** `RadioGroup.Root` props (value/defaultValue/onValueChange/name/dir/orientation/loop/required/disabled) plus `React.FieldsetHTMLAttributes<HTMLFieldSetElement>` minus `children`
* **Forwards:** Additional `RadioGroup.Root` props (e.g., `rovingFocus`, `asChild`) are forwarded through `...rootProps`; standard fieldset attributes pass through the outer wrapper.

---

## Structure

* **fieldset** — Wraps the entire control and hosts `data-has-error` when `error` is present.
* **label** — `<legend>` that displays the visible label or sr-only copy derived from `ariaLabel`; optionally appends `InfoPopover`.
* **hint** — Optional helper text below the legend.
* **radiogroup** — `RadioGroup.Root` containing all choices; receives `aria-describedby` for hint/error wiring and `aria-invalid` when `error` exists.
* **control** — `RadioGroup.Item` rendered for each choice; focus ring tokens live here.
* **indicator** — `RadioGroup.Indicator` drawing the inner dot when selected.
* **choiceLabel/choiceHint** — Text spans containing the choice label and optional sub-hint.
* **error** — Message row with icon when `error` is defined.

> DOM structure sketch:

```jsx
<fieldset data-has-error>
  <legend>
    {label ?? ariaLabel}
    {info && <InfoPopover ariaLabel={`${label} info`}>{info}</InfoPopover>}
  </legend>
  {hint && <div id={hintId}>{hint}</div>}
  <RadioGroup.Root name={name} value={value} onValueChange={onValueChange} aria-describedby={describedBy}>
    {choices.map(choice => (
      <Label.Root key={choice.value}>
        <RadioGroup.Item value={choice.value} id={controlId} aria-describedby={choiceHintId} />
        <span>{choice.label ?? choice.value}</span>
        {choice.hint && <div id={choiceHintId}>{choice.hint}</div>}
      </Label.Root>
    ))}
  </RadioGroup.Root>
  {error && (
    <div id={errorId}>
      <ErrorIcon aria-hidden="true" />
      {error}
    </div>
  )}
</fieldset>
```

---

## Data Attributes & States

| State flag                 | Effect |
| -------------------------- | ------ |
| `data-has-error="true"`   | Applies the danger border token to each control and sets `aria-invalid` on the group.
| `aria-describedby="…"`    | Combines hint/error ids so assistive tech announces contextual guidance.
| `aria-labelledby` / `aria-label` | Keeps each `RadioGroup.Item` tied to its label span while supporting sr-only legends.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `fieldset` | `inline-flex` `flex-col` `gap-0.25` `border-none` `py-2` |
| `label` | `inline-flex` `items-center` `gap-0.25` `text-color-content-default` `text-xs` `uppercase` |
| `hint` | `text-color-content-subtle` `text-xs` `-mt-2` |
| `radiogroup` | `flex` `flex-col` `gap-2` |
| `control` | `flex` `flex-col` `gap-3` `items-center` `justify-center` `size-4` `shrink-0` `rounded-full` `border` `mt-0.5` `border-color-content-weak` `bg-background-none` `focus:outline-none` `disabled:opacity-50` `focus-visible-brand` |
| `indicator` | `pointer-events-none` `block` `size-2` `rounded-full` `bg-color-content-brand` |
| `choiceLabel` | — |
| `choiceHint` | `text-color-content-subtle` `text-xs` |
| `error` | `text-color-content-utility-danger-subtle` `text-xs` `mt-1` `inline-flex` `gap-2` `items-center` |

---

## Accessibility

* **Name:** Provide `label`; if you need to hide it visually, omit `label` and pass `ariaLabel` so the legend stays screen-reader only.
* **Keyboard:** Radix handles arrow key navigation (Up/Down or Left/Right based on `orientation`), Home/End jumps, and roving focus.
* **Roles/States:** `RadioGroup.Root` exposes `role="radiogroup"`; `aria-invalid` toggles when `error` exists, and each radio uses `aria-checked`.
* **Announcements:** Per-choice hints are linked via `aria-describedby` on individual radios while group-level hint/error ids attach to the radiogroup container.
* **Icon-only pattern:** Not applicable—each radio renders textual labels; ensure `choices` always include meaningful text.

---

## Patterns & Examples

### Vertical stack with hints

```tsx
<RadioButtonGroup
  label="Billing cadence"
  hint="You can change this later from billing settings."
  choices={cadenceChoices}
  value={cadence}
  onValueChange={setCadence}
/>
```

- Use `hint` for global instructions, and `choice.hint` for per-option details.
- Keep hints short so the list remains scannable.

### Horizontal layout

```tsx
<RadioButtonGroup
  label="Layout"
  orientation="horizontal"
  choices={layoutChoices}
  value={layout}
  onValueChange={setLayout}
/>
```

- Horizontal orientation is great for 2–3 short choices.
- Ensure there’s enough horizontal space; otherwise revert to vertical.

### Error messaging

```tsx
<RadioButtonGroup
  label="Primary contact"
  error={!value ? 'Select a primary contact to continue.' : undefined}
  choices={people}
  value={value}
  onValueChange={setValue}
/>
```

- When `error` exists, the group inherits `aria-invalid` and the message is announced via `aria-describedby`.
- Keep the error text concise and actionable.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `83976c6cab20d2bd10b4fa84d5ad13726c05df3a270330bcc9511561a3aee916`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
