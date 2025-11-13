# Input
*Type: client* | *Base: FormElement* | *Last updated: 2025-11-11*

## Overview
Input renders the control row that lives inside `FormElement`: start icon → native `<input>` → end icon. All labeling, hint/error/info messaging, and focus treatment come from `FormElement`, while the control row handles adornments and native attributes. Use it whenever you need a single-line text field that matches the system’s tokens.

---

## Import

### Component
```ts
import { Input } from '@doxyz-ui/core/client/Input';
```

### Types

```ts
import type { InputProps } from '@doxyz-ui/core/client/Input';
```

---

## Usage

```tsx
<Input { ...props } />
```

---

## Props (Declared + Inherited)

| Prop          | Type              | Default | Required | Notes |
| ------------- | ----------------- | ------: | :------: | ----- |
| `ariaLabel`   | `string`          |         |          | Accessible name used when `label` is omitted (handled by FormElement). |
| `className`   | `string`          |         |          | Appends utility classes to the control row container. |
| `defaultValue`| `string`          |         |          | Initial value for uncontrolled usage. |
| `disabled`    | `boolean`         |   `false` |          | Disables FormElement and the native input. |
| `endIcon`     | `React.ReactNode` |         |          | Trailing adornment rendered to the right of the value. |
| `error`       | `string`          |         |          | Error text rendered by FormElement; overrides `hint`. |
| `hint`        | `string`          |         |          | Helper text rendered by FormElement under the control. |
| `info`        | `string`          |         |          | InfoPopover content shown next to the label. |
| `label`       | `string`          |         |          | Visible label text; required unless `ariaLabel` is provided. |
| `name`        | `string`          |         |          | Native input name; useful when submitting forms. |
| `placeholder` | `string`          |         |          | Native placeholder text; fades when focused. |
| `readOnly`    | `boolean`         |         |          | Marks the input read-only while keeping it focusable. |
| `required`    | `boolean`         |         |          | Adds the required indicator to FormElement and applies `required` on the native input. |
| `startIcon`   | `React.ReactNode` |         |          | Leading adornment rendered inside the control row. |
| `type`        | `string`          |   `'text'` |          | Native input type (e.g., `email`, `number`). |
| `value`       | `string`          |         |          | Controlled value for managed forms; pair with `onChange`. |

* **Extends:** `FormElementProps` minus: `children`, `asChild`, `className`, `id`; `React.InputHTMLAttributes<HTMLInputElement>` minus: `children`, `id`
* **Forwards:** All other native input attributes (e.g., `onChange`, `autoComplete`, `pattern`) to the internal `<input>` via `InputField`.

---

## Structure

* **FormElement** — Wraps the control row to provide label, messaging, and focus ring.
* **input row** — `<div data-slot="input">` holding icon slots and the native input.
* **startIcon / endIcon** — Optional `<span>` wrappers marked `aria-hidden="true"`.
* **input** — Native `<input>` receiving merged ids, aria labels, described-by references, and forwarded props.

> DOM structure sketch:

```jsx
<FormElement {...formProps} asChild>
  <div data-slot="input" data-invalid data-disabled>
    {startIcon && <span data-slot="startIcon" aria-hidden="true">{startIcon}</span>}
    <input {...nativeInputProps} />
    {endIcon && <span data-slot="endIcon" aria-hidden="true">{endIcon}</span>}
  </div>
</FormElement>
```

---

## Data Attributes & States

| State flag             | Effect |
| ---------------------- | ------ |
| `data-invalid="true"` | Tints the FormElement control row border with the utility danger token. |
| `data-disabled="true"`| Applied by FormElement when `disabled` is true, dimming the entire fieldset. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `field` | `inline-flex` `items-center` `gap-0.5` `py-0.5` `px-3` |
| `startIcon` | `inline-flex` `items-center` `gap-0.5` `shrink-0` `size-5` `text-color-content-default` |
| `input` | `grow` `bg-transparent` `outline-none` `text-color-content-default` `placeholder-color-content-weak` `border-none` `py-1.5` `focus:placeholder:opacity-0` |
| `endIcon` | `shrink-0` `size-5` `inline-flex` `text-color-content-default` |
| `field (state: invalid)` | `data-[invalid=true]:[&_[data-slot=input]]:border-comp-form-color-border-utility-danger` |

---

## Accessibility

* **Name:** Provided by FormElement via `label`/`ariaLabel`; the native `<input>` inherits the generated id and `aria-labelledby` wiring.
* **Keyboard:** Standard text field interactions—Tab focuses, characters insert text, Shift+Tab moves focus backwards.
* **Roles/States:** Native `<input>` exposes `role="textbox"`; `aria-invalid`, `aria-describedby`, and `required` flow through from FormElement.
* **Announcements:** Hints, errors, and info popover content are merged into `aria-describedby` so screen readers hear the latest context.
* **Icon-only pattern:** Icons remain decorative because the input always contains textual content; do not rely on icons to communicate meaning.

---

## Patterns & Examples

### Basic text field

```tsx
<Input label="Project" placeholder="Campaign name" />
```

- Defaults to `type="text"`; specify another type for specialized validation.
- Combine with `hint` for guidance (“Visible to workspace members”).

### Search with icon

```tsx
<Input
  ariaLabel="Search"
  startIcon={<MagnifyingGlassIcon aria-hidden="true" />}
  placeholder="Search the catalog"
/>
```

- Use `ariaLabel` when hiding the FormElement label for compact toolbar placements.
- Keep icons descriptive but mark them `aria-hidden` (handled by the component).

### Controlled field with error

```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={event => setEmail(event.target.value)}
  error={emailError}
  required
/>
```

- `required` adds the indicator and native validation.
- When `error` is non-empty, FormElement renders it below the control and highlights the border.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `679f8bfa20a3978f3315f1bb40fcc3bef7df17699903d13a2d5a64116170dcc9`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
