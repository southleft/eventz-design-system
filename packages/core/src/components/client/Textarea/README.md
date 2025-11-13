# Textarea
*Type: client* | *Base: fieldset* | *Last updated: 2025-11-11*

## Overview
Textarea wraps a native `<textarea>` in a Radix `Label`/fieldset combo so labeling, hints, and inline info popovers stay consistent with other inputs. It supports optional start/end icons, merges `aria-describedby` for hint/error/info content, and toggles invalid/disabled states via data attributes. Use it for multi-line text capture anywhere the FormElement pattern isn’t available.

---

## Import

### Component
```ts
import { Textarea } from '@doxyz-ui/core/client/Textarea';
```

### Types

```ts
import type { TextareaProps } from '@doxyz-ui/core/client/Textarea';
```

---

## Usage

```tsx
<Textarea { ...props } />
```

---

## Props (Declared + Inherited)

| Prop          | Type                  | Default | Required | Notes |
| ------------- | --------------------- | ------: | :------: | ----- |
| `ariaLabel`   | `string`              |         |          | Accessible name applied to the native `<textarea>` when no `label` is supplied. |
| `defaultValue`| `string`              |         |          | Uncontrolled initial value for the textarea element. |
| `disabled`    | `boolean`             |   `false` |          | Disables the fieldset and all nested controls, applying `data-disabled`. |
| `endIcon`     | `React.ReactNode`     |         |          | Optional adornment rendered to the right of the textarea value. |
| `error`       | `string`              |         |          | Error message displayed below the field; overrides `hint` when provided. |
| `hint`        | `string`              |         |          | Helper text shown under the field when there is no error. |
| `info`        | `string`              |         |          | Content rendered inside `InfoPopover`; toggled via the inline info trigger next to the label. |
| `label`       | `string`              |         |          | Visible label rendered with Radix `Label`. Required unless `ariaLabel` is provided. |
| `startIcon`   | `React.ReactNode`     |         |          | Optional adornment rendered before the textarea value. |
| `value`       | `string`              |         |          | Controlled value for the native textarea. Pair with `onChange`. |

* **Extends:** `React.TextareaHTMLAttributes<HTMLTextAreaElement>` minus: `children`, `className`, `id`
* **Forwards:** Native textarea attributes (`placeholder`, `rows`, `onChange`, etc.) to the internal `<textarea>` via `textareaRest`.

---

## Structure

* **container** — `<fieldset>` managing disabled/invalid states and wrapping the entire control.
* **label** — Radix `Label.Root`; hides itself visually if only `ariaLabel` is provided.
* **infoTrigger / infoContent** — `InfoPopover` instance that pairs an inline trigger with hidden descriptive content.
* **textarea** — Row wrapper that holds start icon, native textarea, and end icon.
* **startIcon / endIcon** — Optional adornments sized via tokenized SVG utilities.
* **value** — Native `<textarea>` element receiving forwarded props.
* **hint / error** — Messaging area where error supersedes hint when both exist.

> DOM structure sketch:

```jsx
<fieldset data-disabled data-invalid>
  <Label.Root htmlFor={textareaId}>
    {label ?? ariaLabel}
    {info && <InfoPopover>{info}</InfoPopover>}
  </Label.Root>
  <div data-slot="textarea">
    {startIcon && <span data-slot="startIcon" aria-hidden="true">{startIcon}</span>}
    <textarea id={textareaId} data-slot="value" {...textareaProps} />
    {endIcon && <span data-slot="endIcon" aria-hidden="true">{endIcon}</span>}
  </div>
  {error ? (
    <div data-slot="error">…</div>
  ) : hint ? (
    <div data-slot="hint">…</div>
  ) : null}
</fieldset>
```

---

## Data Attributes & States

| State flag                    | Effect |
| ----------------------------- | ------ |
| `data-disabled="true"`       | Applied to the `<fieldset>` to reduce opacity and stop pointer events at the wrapper level. |
| `data-invalid="true"`        | Tints the textarea border with the danger token and ensures the error message is announced. |
| `aria-describedby="…"`       | Merges hint/error/info ids so assistive tech hears contextual guidance in a single announcement. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `inline-flex` `border-none` `flex-col` `gap-1` `disabled:opacity-50` `disabled:pointer-events-none` |
| `label` | `inline-flex` `gap-1` `text-color-content-default` `text-xs` `uppercase` |
| `textarea` | `inline-flex` `items-center` `gap-2` `rounded-lg` `px-(--spacing-1_5)` `bg-comp-form-color-background-default` `border` `border-comp-form-color-border-default` `text-sm` `hover:bg-comp-form-color-background-hover` `hover:border-comp-form-color-hover` `[&:has(:focus-visible)]:ring-2` `[&:has(:focus-visible)]:ring-offset-4` `[&:has(:focus-visible)]:ring-comp-border-focus-ring` `[&:has(:focus-visible)]:ring-offset-color-background-default` |
| `startIcon` | `shrink-0` `[&>svg]:size-4` `py-(--spacing-1_5)` `inline-flex` `text-color-content-default` |
| `value` | `grow` `bg-transparent` `outline-none` `text-color-content-default` `placeholder-color-content-weak` `border-none` `py-(--spacing-1_5)` `focus:placeholder:opacity-0` |
| `endIcon` | `shrink-0` `[&>svg]:size-4` `py-(--spacing-1_5)` `inline-flex` `text-color-content-default` |
| `hint` | `text-color-content-subtle` `text-xs` |
| `error` | `text-color-content-utility-danger-subtle` `text-xs` `mt-1` `inline-flex` `gap-2` |
| `container (state: disabled)` | `data-[disabled=true]:opacity-50` `data-[disabled=true]:pointer-events-none` |
| `container (state: invalid)` | `data-[invalid=true]:[&_[data-slot=textarea]]:border-comp-form-color-border-utility-danger` |

---

## Accessibility

* **Name:** Supply `label` for visible text; when omitted, provide `ariaLabel` so the textarea remains announced.
* **Keyboard:** Standard textarea behavior—Tab focuses, Enter inserts newline, Shift+Tab moves focus back.
* **Roles/States:** The native `<textarea>` exposes `role="textbox"`; `aria-describedby` references hint/error/info for context, and `data-invalid` only affects styling.
* **Announcements:** When `error` is present, its id replaces the hint id in `aria-describedby`, so screen readers hear the failure message before the helper text.
* **Icon-only pattern:** Icons are purely decorative; ensure the textarea itself carries the accessible name.

---

## Patterns & Examples

### Controlled textarea

```tsx
<Textarea label="Notes" value={notes} onChange={event => setNotes(event.target.value)} />
```

- Manage `value`/`onChange` for controlled forms.
- Pair with validation logic to populate `error` when the input is invalid.

### With info popover

```tsx
<Textarea
  label="Summary"
  info="Keep this under 280 characters so it fits on the card."
  hint="Markdown supported"
/>
```

- InfoPopover opens inline; its content id joins `aria-describedby` only while open.
- Keep info strings concise so they work in small popover widths.

### Disabled field

```tsx
<Textarea label="Admin notes" value={value} disabled hint="Only admins can edit this." />
```

- Wrapper-level `disabled` locks every nested control and sets `aria-disabled` semantics automatically.
- Consider explaining why editing is disabled via `hint` or surrounding copy.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `c5da6cac2662366b29751727b588632564334f2abb89b284fd4caf389ec02e85`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
