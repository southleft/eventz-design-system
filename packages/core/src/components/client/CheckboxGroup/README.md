# CheckboxGroup
*Type: client* | *Base: fieldset* | *Last updated: 2025-11-08*

## Overview
CheckboxGroup arranges related Checkbox options inside a fieldset with shared legend, hint/error messaging, and optional info popover. It manages an internal list of selected values and emits the full array through `onCheckedChange`, while also wiring `aria-describedby` so hints/errors are read to assistive tech. Use it for multi-select questions such as notification preferences or filters.

---

## Import

### Component
```ts
import { CheckboxGroup } from '@doxyz-ui/core/client/CheckboxGroup';
```

### Types

```ts
import type { CheckboxGroupProps } from '@doxyz-ui/core/client/CheckboxGroup';
```

---

## Usage

```tsx
<CheckboxGroup { ...props } />
```

---

## Props (Declared + Inherited)

| Prop             | Type                                                           | Default | Required | Notes |
| ---------------- | -------------------------------------------------------------- | ------: | :------: | ----- |
| `ariaLabel`      | `string`                                                       |         |          | Accessible name for the fieldset when no visible `label` is rendered. |
| `choices`        | `ReadonlyArray<{ label: string; value?: string; id?: string }>` |         |   Yes    | Checkbox options; each entry must include a `label`. `value` falls back to the label when omitted. |
| `className`      | `string`                                                       |         |          | Appends utility classes to the fieldset wrapper. |
| `error`          | `string`                                                       |         |          | Error copy displayed under the list with a decorative icon. |
| `hint`           | `string`                                                       |         |          | Helper text rendered below the legend (hidden when `error` exists). |
| `info`           | `string`                                                       |         |          | Inline info message surfaced via `InfoPopover` when a visible label exists. |
| `label`          | `string`                                                       |         |          | Legend text describing the group; hide it visually by omitting and supplying `ariaLabel`. |
| `name`           | `string`                                                       |         |          | Form field name applied to each Checkbox’s `name` prop for submission. |
| `onCheckedChange`| `(values: string[]) => void`                                   |         |          | Fires after any option toggles with the deduplicated array of selected values. |

* **Extends:** `React.FieldsetHTMLAttributes<HTMLFieldSetElement>` minus: `children`, `defaultValue`, `value`
* **Forwards:** Additional fieldset props (`disabled`, `role`, etc.) via `{...rest}` spread.

---

## Structure

* **fieldset** — Root wrapper tying the legend, hint/error, and checkbox list together.
* **label** — `<legend>` containing the visible label (or screen-reader text when only `ariaLabel` is provided) plus inline info trigger.
* **infoTrigger/infoContent** — `InfoPopover` shown only when `label` and `info` are set.
* **hint** — Optional helper text below the legend.
* **choices** — Vertical stack of Checkbox components; each inherits the `name` prop for form submission.
* **error** — Message row with icon, shown when `error` is non-empty.

> DOM structure sketch:

```jsx
<fieldset aria-describedby="hintId errorId">
  <legend data-slot="label">
    {label ?? ariaLabel}
    {info && <InfoPopover ariaLabel={`${label} info`}>{info}</InfoPopover>}
  </legend>
  {hint && <div data-slot="hint" id={hintId}>{hint}</div>}
  <div data-slot="choices">
    {choices.map(choice => (
      <Checkbox
        key={choice.id ?? choice.value ?? choice.label}
        label={choice.label}
        value={choice.value ?? choice.label}
        name={name}
        checked={selected.includes(value)}
        onCheckedChange={next => handleToggle(value, next === true)}
      />
    ))}
  </div>
  {error && (
    <div data-slot="error" id={errorId}>
      <ErrorIcon aria-hidden="true" />
      <span>{error}</span>
    </div>
  )}
</fieldset>
```

---

## Data Attributes & States

| State flag                  | Effect |
| --------------------------- | ------ |
| `aria-describedby="…"`     | Combines hint and error ids so screen readers announce additional guidance after the legend. |
| `aria-label="…"` (legend hidden) | Provides a name when the visual label is intentionally omitted for compact layouts. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `fieldset` | `inline-flex flex-col gap-1 border-none py-8` + any custom classes via `className`. |
| `label`    | `inline-flex gap-1 text-color-content-default text-xs uppercase` |
| `hint`     | `text-color-content-subtle text-xs -mt-8` |
| `choices`  | `flex flex-col gap-3` |
| `error`    | `text-color-content-utility-danger-subtle text-xs mt-1 inline-flex gap-2 items-center` |

---

## Accessibility

* **Name:** Supply `label` or `ariaLabel`; the component hides the legend visually when only `ariaLabel` is provided but keeps it readable by screen readers.
* **Keyboard:** Each Checkbox inside the group is focusable; Tab/Shift+Tab move through options sequentially.
* **Roles/States:** Uses native `<fieldset>` + `<legend>` semantics; `aria-describedby` references hint/error ids for richer announcements.
* **Announcements:** When `info` is open, the InfoPopover content is read separately; hint/error content stays in the `aria-describedby` chain.
* **Icon-only pattern:** Not applicable; each Checkbox still renders its own label and is tied to the parent legend context.

---

## Patterns & Examples

### Required checklist

```tsx
<CheckboxGroup
  label="Select up to three interests"
  error={selected.length === 0 ? 'Choose at least one topic.' : undefined}
  choices={topics}
  onCheckedChange={setSelected}
/>
```

- Use `error` to communicate validation results for the entire group.
- Enforce selection limits in `onCheckedChange` and update helper copy as needed.

### Legend hidden for compact UI

```tsx
<CheckboxGroup
  ariaLabel="Notification channels"
  hint="Pick all that apply"
  choices={channels}
/>
```

- When the label would duplicate surrounding text, omit it and rely on `ariaLabel` to keep the group accessible.
- Hint copy still renders visually even when the legend is screen-reader only.

### InfoPopover with extra context

```tsx
<CheckboxGroup
  label="Alert types"
  info="Alerts arrive instantly via the selected channels."
  choices={alertChoices}
/>
```

- InfoPopover only appears when a visible label exists; the trigger is appended inline.
- Keep info copy short so it reads well inside the popover.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `2d8f7a4bebaa77c9c8842afb25eb897d366b0c90143191d0d97c82efd6ade1ab`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
