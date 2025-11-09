# ToggleGroup
*Type: client* | *Base: RadixToggleGroup.Root* | *Last updated: 2025-11-08*

## Overview
ToggleGroup renders an icon-only set of Radix toggle buttons with shared focus treatment, pressed styling, and accessibility wiring. Pass `items` with icons and values, provide a group-level `ariaLabel`, and use the underlying Radix props (`type`, `value`, `onValueChange`, etc.) to control selection. Use it for compact view toggles, formatting controls, or segmented actions.

---

## Import

### Component
```ts
import { ToggleGroup } from '@doxyz-ui/core/client/ToggleGroup';
```

### Types

```ts
import type { ToggleGroupProps } from '@doxyz-ui/core/client/ToggleGroup';
```

---

## Usage

```tsx
<ToggleGroup { ...props } />
```

---

## Props (Declared + Inherited)

| Prop           | Type                                             | Default | Required | Notes |
| -------------- | ------------------------------------------------ | ------: | :------: | ----- |
| `ariaLabel`    | `string`                                         |         |   Yes    | Accessible name for the entire toggle group; applied to the root `aria-label`.
| `className`    | `string`                                         |         |          | Appends utility classes to the `ToggleGroup.Root` wrapper.
| `defaultValue` | `string \| string[]`                             |         |          | Initial pressed value(s); string for `type="single"`, array for `type="multiple"`.
| `dir`          | `'ltr' \| 'rtl'`                                 |         |          | Text direction forwarded to Radix’s roving focus logic.
| `disabled`     | `boolean`                                        |         |          | Disables every toggle in the group.
| `items`        | `ReadonlyArray<{ value: string; icon: React.ReactNode; ariaLabel?: string; disabled?: boolean }>` |         |   Yes    | Icon-only items to render. Blank `ariaLabel` falls back to `value`.
| `loop`         | `boolean`                                        |         |          | Whether keyboard focus wraps from the last back to the first item (Radix prop).
| `onValueChange`| `(value: string \| string[]) => void`            |         |          | Called whenever selection changes; receives a string or array based on `type`.
| `orientation`  | `'horizontal' \| 'vertical'`                     | `'horizontal'` |   | Controls the layout and keyboard axis.
| `rovingFocus`  | `boolean`                                        |       `true` |          | Toggles Radix’s roving focus behavior; rarely overridden.
| `type`         | `'single' \| 'multiple'`                         | `'single'` |          | Determines whether one or many items can be pressed simultaneously.
| `value`        | `string \| string[]`                             |         |          | Controlled pressed value(s); pair with `onValueChange`.

* **Extends:** `RadixToggleGroup.Root` props minus: `children`, `asChild`, `aria-label`
* **Forwards:** Additional Radix props (`name`, `id`, `disabled`, `loop`, etc.) are passed through via `{...restProps}`.

---

## Structure

* **root** — `RadixToggleGroup.Root` with `aria-label`, orientation, and roving focus behavior.
* **item** — `RadixToggleGroup.Item` for each entry; handles pressed/hover/disabled tokens.
* **icon** — `<span aria-hidden>` that renders the provided icon.

> DOM structure sketch:

```jsx
<ToggleGroup.Root type="single" aria-label={ariaLabel}>
  {items.map(item => (
    <ToggleGroup.Item key={item.value} value={item.value} aria-label={item.ariaLabel ?? item.value}>
      <span aria-hidden="true">{item.icon}</span>
    </ToggleGroup.Item>
  ))}
</ToggleGroup.Root>
```

---

## Data Attributes & States

| State flag            | Effect |
| --------------------- | ------ |
| `data-state="on"`    | Applies the primary brand background + content colors, including hover/active tokens, for pressed items.
| `data-state="off"`   | Uses the knockout background and subtle text tokens.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `root`    | `inline-flex rounded` + custom `className` |
| `item`    | `flex h-35 w-35 items-center justify-center border-none outline-none focus:shadow-none bg-comp-button-color-background-knockout active:bg-comp-button-color-background-knockout-active active:text-comp-button-color-content-default-active text-comp-button-color-content-default first:rounded-l-sm last:rounded-r-sm hover:bg-comp-button-color-background-knockout-hover hover:text-comp-button-color-content-default-hover focus:z-10 focus:shadow-[0_0_0_2px] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default data-[state=on]:bg-comp-button-primary-color-background-default data-[state=on]:text-comp-button-primary-color-content-default data-[state=on]:hover:bg-comp-button-primary-color-background-hover data-[state=on]:hover:text-comp-button-primary-color-content-hover data-[state=on]:active:bg-comp-button-primary-color-background-active disabled:opacity-50 disabled:pointer-events-none` |

---

## Accessibility

* **Name:** `ariaLabel` is required on the group; each item also receives an `aria-label` (from `items[i].ariaLabel` or `value`).
* **Keyboard:** Arrow keys move focus based on `orientation`; Space/Enter toggles the focused item. Radix handles `rovingFocus` and `loop` behavior.
* **Roles/States:** `ToggleGroup.Root` emits `role="group"` for single groups and `aria-pressed` on each item to reflect state.
* **Announcements:** When `type="single"`, pressing a new item automatically unpresses the previous one, so screen readers announce the newly pressed control.
* **Icon-only pattern:** Icons are wrapped in `aria-hidden` spans; ensure textual labels remain meaningful.

---

## Patterns & Examples

### Formatting controls (multiple)

```tsx
<ToggleGroup
  ariaLabel="Text formatting"
  type="multiple"
  value={formats}
  onValueChange={setFormats}
  items={formatItems}
/>
```

- Pair with editor state to apply bold/italic/etc. toggles simultaneously.
- Default `rovingFocus` keeps keyboard navigation intuitive.

### Layout switcher

```tsx
<ToggleGroup
  ariaLabel="Layout"
  value={layout}
  onValueChange={setLayout}
  items={layoutItems}
/>
```

- Use descriptive `ariaLabel`s on each item to differentiate similar icons (“Grid view”, “List view”).
- Provide visual spacing around the group so the rounded corners don’t feel cramped.

### Disabled option

```tsx
<ToggleGroup
  ariaLabel="Map layers"
  type="multiple"
  items={[
    { value: 'roads', icon: <RoadIcon /> },
    { value: 'traffic', icon: <TrafficIcon />, disabled: !hasTrafficData },
    { value: 'transit', icon: <TransitIcon /> }
  ]}
/>
```

- Disabled items remain focusable but not pressable; the style map dims them automatically.
- Consider pairing with tooltips to explain why an option is disabled.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `f206e098af290174376a3fac7461c23b025d31ced81520e8e1a94121c2deedb8`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
