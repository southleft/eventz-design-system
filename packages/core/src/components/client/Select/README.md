# Select
*Type: client* | *Base: RadixSelect.Root* | *Last updated: 2025-11-11*

## Overview
Select composes Radix Select with the system `Input` as the trigger and `MenuItem` for options. It keeps the trigger read-only, mirrors selection into the input value, and styles the popup viewport with a subtle border. Use it for lightweight dropdowns when you need more control than `<select>` but don’t require virtualization.

---

## Import

### Component
```ts
import { Select } from '@doxyz-ui/core/client/Select';
```

### Types

```ts
import type { SelectProps } from '@doxyz-ui/core/client/Select';
```

---

## Usage

```tsx
<Select { ...props } />
```

---

## Props (Declared + Inherited)

| Prop            | Type                                       | Default | Required | Notes |
| --------------- | ------------------------------------------ | ------: | :------: | ----- |
| `defaultValue`  | `string`                                   |         |          | Uncontrolled initial selection.
| `disabled`      | `boolean`                                  |   `false` |          | Disables the trigger input and the dropdown.
| `InputProps`    | `Partial<InputProps>` (minus `startIcon`)  |         |          | Passthrough props for the trigger `Input`; `endIcon` defaults to `KeyboardArrowDownIcon`.
| `name`          | `string`                                   |         |          | HTML form name; forwarded to Radix.
| `onOpenChange`  | `(open: boolean) => void`                  |         |          | Receives the new open state.
| `onValueChange` | `(value: string) => void`                  |         |          | Called whenever the user selects a new option.
| `open`          | `boolean`                                  |         |          | Controlled open flag.
| `options`       | `Array<MenuItemProps & { option: string }>`|        `[]` |        | Data used to render `MenuItem` rows inside the dropdown.
| `value`         | `string`                                   |         |          | Controlled selected value.

* **Extends:** Radix `Select.Root` props except `dir`, `required`, `disabled`, and `children`.

---

## Structure

* **trigger** — `<RadixSelect.Trigger asChild>` wrapping `Input`. The input is read-only and keeps the current stringified value.
* **viewport** — `<RadixSelect.Viewport>` styled with a border and rounded corners.
* **options** — `MenuItem` entries rendered via `<RadixSelect.Item asChild>`.

> DOM structure sketch:

```jsx
<RadixSelect.Root value={value} onValueChange={setValue} disabled={disabled}>
  <RadixSelect.Trigger asChild>
    <Input value={value ?? ''} readOnly endIcon={<KeyboardArrowDownIcon />} {...InputProps} />
  </RadixSelect.Trigger>
  <RadixSelect.Content position="popper" align="start" sideOffset={6}>
    <RadixSelect.Viewport className="viewport">
      {options.map(opt => (
        <RadixSelect.Item key={opt.option} value={opt.option} asChild>
          <MenuItem {...opt} option={opt.option} isSelected={value === opt.option} />
        </RadixSelect.Item>
      ))}
    </RadixSelect.Viewport>
  </RadixSelect.Content>
</RadixSelect.Root>
```

---

## Data Attributes & States

*No additional state hooks beyond Radix’s `data-state` and `data-disabled`. Styling is handled via trigger/viewport classes and MenuItem’s own state.*

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `viewport` | `border` `rounded-lg` `-ml-[7px]` `!overflow-x-visible` `border-color-border-subtle` `bg-color-background-default` |
| `trigger` | `[&_input]:cursor-default` |

---

## Accessibility

* **Name:** Provide labels via `InputProps.label`/`ariaLabel` or wrap the component in `FormElement` for consistent labeling.
* **Keyboard:** Inherits Radix Select keyboard behavior—typeahead search, Arrow keys to move, Space/Enter to select, Esc to close.
* **Roles/States:** The trigger acts as a combobox; Radix handles `aria-expanded`, `aria-controls`, and option semantics.
* **Announcements:** Because selected values appear in the input, screen readers get immediate feedback as the selection changes.
* **Icon-only pattern:** Not applicable; the trigger shows the selected text.

---

## Patterns & Examples

### Disabled select

```tsx
<Select
  value="published"
  disabled
  options={statusOptions}
  InputProps={{ label: 'Status' }}
/>
```

- Disabled state is mirrored to both the Radix root and the trigger input.

### Custom end icon

```tsx
<Select
  value={city}
  onValueChange={setCity}
  options={cityOptions}
  InputProps={{ endIcon: <LocationIcon aria-hidden="true" /> }}
/>
```

- Override `endIcon` to align with brand-specific glyphs.

### Uncontrolled usage

```tsx
<Select defaultValue="Option A" options={options} onValueChange={logSelection} />
```

- When `value` is omitted, the component manages its own selection but still emits changes.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `d080b5aca3e8937b472d8bd35051afe75cc9d2df0329580a18b328c28965a72e`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
