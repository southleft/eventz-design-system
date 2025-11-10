# FormElement
*Type: client* | *Base: fieldset* | *Last updated: 2025-11-08*

## Overview
FormElement is the shared shell used by inputs, selects, and other controls. It renders a Radix `Label`, optional InfoPopover, focusable row chrome, and hint/error messaging. Pass `asChild` to have FormElement inject `id`, `aria-describedby`, `aria-label`, and `disabled` into your control via Radix Slot; otherwise it simply wraps your child in a neutral container.

---

## Import

### Component
```ts
import { FormElement } from '@doxyz-ui/core/client/FormElement';
```

### Types

```ts
import type { FormElementProps } from '@doxyz-ui/core/client/FormElement';
```

---

## Usage

```tsx
<FormElement { ...props }>{children}</FormElement>
```

---

## Props (Declared + Inherited)

| Prop        | Type               | Default | Required | Notes |
| ----------- | ------------------ | ------: | :------: | ----- |
| `ariaLabel` | `string`           |         |          | Accessible name applied to the slotted control when no visible `label` is provided.
| `asChild`   | `boolean`          |   `false` |          | Enables Radix Slot so control attributes flow into the child element.
| `children`  | `React.ReactNode`  |         |   Yes    | Control markup rendered inside the value slot.
| `className` | `string`           |         |          | Appends utility classes to the outer fieldset.
| `disabled`  | `boolean`          |   `false` |          | Disables the fieldset and (when `asChild`) the slotted control.
| `error`     | `string`           |         |          | Error copy displayed beneath the row; replaces the hint and sets `aria-invalid`.
| `hint`      | `string`           |         |          | Helper text shown under the row when no error is present.
| `info`      | `string`           |         |          | Supplemental copy shown via an inline `InfoPopover` next to the label.
| `label`     | `string`           |         |          | Visible label rendered with Radix `Label`. Provide `ariaLabel` instead when hiding it.

* **Extends:** `React.FieldsetHTMLAttributes<HTMLFieldSetElement>` minus: `children`, `disabled`
* **Forwards:** Additional fieldset attributes (`name`, `form`, `role`, etc.) via the `{...rest}` spread on `<fieldset>`.

---

## Structure

* **fieldset** — Root wrapper carrying `data-disabled`/`data-invalid` and handling focus ring states.
* **label** — Radix `Label.Root` connected to the value slot id; hides itself with `sr-only` when only `ariaLabel` exists.
* **infoTrigger/infoContent** — Inline `InfoPopover` displaying `info` content when present.
* **row** — Chrome container (rounded border, hover colors, focus ring) around the control.
* **value** — Slot for the consumer child. When `asChild`, this slot passes props to the child via Radix Slot; otherwise it’s a neutral `<div>` wrapper.
* **hint/error** — Messaging below the row; error includes the system `ErrorIcon`.

> DOM structure sketch:

```jsx
<fieldset data-disabled data-invalid>
  <Label.Root htmlFor={asChild ? controlId : undefined}>
    {label ?? ariaLabel}
    {info && <InfoPopover ariaLabel={`${label} info`}>{info}</InfoPopover>}
  </Label.Root>
  <div data-slot="row">
    <Comp data-slot="value" {...valueProps}>
      {children}
    </Comp>
  </div>
  {error ? (
    <div data-slot="error" role="alert">
      <ErrorIcon aria-hidden="true" />
      {error}
    </div>
  ) : hint ? (
    <div data-slot="hint">{hint}</div>
  ) : null}
</fieldset>
```

---

## Data Attributes & States

| State flag             | Effect |
| ---------------------- | ------ |
| `data-disabled="true"`| Dims the entire fieldset and blocks pointer events (mirrors native `disabled`).
| `data-invalid="true"` | Tints the row border with the utility danger token and adds `aria-invalid` to the slotted control.
| `aria-describedby="…"`| Merges hint/error ids plus the info popover content id (while open) to provide contextual announcements.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `fieldset` | `inline-flex border-none flex-col gap-1 disabled:opacity-50 disabled:pointer-events-none data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none data-[invalid=true]:[&_[data-slot=row]]:border-comp-form-color-border-utility-danger` |
| `label`    | `inline-flex gap-1 text-color-content-default text-xs uppercase` |
| `row`      | `inline-flex items-start gap-2 gap-y-1 rounded-lg text-color-content-default bg-comp-form-color-background-default border border-comp-form-color-border-default text-sm hover:bg-comp-form-color-background-hover hover:border-comp-form-color-hover [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-offset-4 [&:has(:focus-visible)]:ring-comp-border-focus-ring [&:has(:focus-visible)]:ring-offset-color-background-default` |
| `value`    | *(inherits layout from the row; no extra tokens applied)* |
| `hint`     | `text-color-content-subtle text-xs` |
| `error`    | `text-color-content-utility-danger-subtle text-xs mt-1 inline-flex gap-2 items-center` |

---

## Accessibility

* **Name:** Provide `label` for visible text. When the label must be visually hidden, omit it and set `ariaLabel`; FormElement still renders an `sr-only` label.
* **Keyboard:** The slotted control handles keyboard interaction. The row wrapper maintains the focus ring using `:has(:focus-visible)`.
* **Roles/States:** The child receives `aria-describedby` referencing hint/error/info ids. When `error` exists, `aria-invalid` and `role="alert"` ensure the message is announced.
* **Announcements:** InfoPopover content is added to `aria-describedby` only while it’s open, preventing repeat announcements.
* **Icon-only pattern:** Not applicable; FormElement doesn’t render icons besides the optional error glyph.

---

## Patterns & Examples

### Wrapping a custom input

```tsx
<FormElement label="API key" hint="Keep this secret" asChild>
  <input type="password" value={key} onChange={handleChange} />
</FormElement>
```

- `asChild` lets the input inherit ids/aria automatically.
- Hint text only renders when there isn’t an error.

### Without visible label

```tsx
<FormElement ariaLabel="Search" asChild>
  <input placeholder="Search" />
</FormElement>
```

- Useful for toolbar fields where the visual label would be redundant.
- The component still renders an `sr-only` label so screen readers get a name.

### Error with info popover

```tsx
<FormElement
  label="Webhook URL"
  info="We POST events to this HTTPS endpoint."
  error={error}
  asChild
>
  <input type="url" value={url} onChange={event => setUrl(event.target.value)} />
</FormElement>
```

- Error content replaces the hint and is announced via `role="alert"`.
- InfoPopover remains available even when an error is visible.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `07e15dc80c273fb8493e5339db15fdcbef49e6edcfebe08c79eea623a97a7110`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
