# Dropdown
*Type: client* |
*Base: Radix Popover (div)* |
*Last updated: 2025-11-11*

## Overview
Dropdown composes a Radix Popover with the Eventz secondary Button to show consumer-owned panel content behind a labeled trigger. Use it for lightweight menus, filters, or preview panels where you control everything inside the surface. The component centralizes trigger labeling, icon affordances, placement controls, and focus management while leaving panel layout entirely up to the children slot.

---

## Import

### Component
```ts
import { Dropdown } from '@eventz-ui/core/client/Dropdown';
```

### Types

```ts
import type { DropdownProps } from '@eventz-ui/core/client/Dropdown';
```

---

## Usage

```tsx
<Dropdown { ...props }>{children}</Dropdown>
```

---

## Props (Declared + Inherited)

| Prop             | Type                                   | Default | Required | Notes |
| ---------------- | -------------------------------------- | ------- | :------: | ----- |
| `align`          | `'start' | 'center' | 'end'`            | `'start'` |         | Aligns Popover.Content relative to the trigger.
| `ariaHaspopup`   | `'menu' | 'listbox' | 'dialog'`         | `'menu'` |         | Passed to the trigger button for assistive tech intent.
| `children`       | `React.ReactNode`                      |         |   Yes   | Rendered inside `Popover.Content`; you own layout and roles.
| `className`      | `string`                               |         |         | Applies to the root `<div data-slot="base">`.
| `collisionPadding` | `number`                             | `8`     |         | Combined padding applied when Popover performs collision avoidance.
| `defaultOpen`    | `boolean`                              | `false` |         | Initial uncontrolled open state.
| `disabled`       | `boolean`                              | `false` |         | Disables the trigger Button and prevents opening.
| `endIcon`        | `React.ReactNode`                      |         |         | Trailing icon slot; defaults to `ArrowDropDownIcon` when omitted.
| `label`          | `string`                               |         |   Yes   | Visible trigger text and accessible name source.
| `onOpenChange`   | `(open: boolean) => void`              |         |         | Fired whenever the Popover toggles; use for analytics or controlled mode.
| `open`           | `boolean`                              |         |         | Controlled open state; pair with `onOpenChange`.
| `side`           | `'top' | 'right' | 'bottom' | 'left'`   | `'bottom'` |       | Chooses the Popover side relative to the trigger.
| `sideOffset`     | `number`                               | `8`     |         | Gap between trigger and content surface.
| `startIcon`      | `React.ReactNode`                      |         |         | Leading icon slot, passed through to the Button.
| `trapFocus`      | `boolean`                              | `false` |         | When true, Popover behaves like a modal dialog (focus stays inside).

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **base** — root `<div>` that wraps `Popover.Root`, receives forwarded HTML attributes, and exposes `data-open`.
* **container** — Button trigger rendered via `Popover.Trigger asChild`; inherits Button.secondary styling plus dropdown width token.
* **content** — `Popover.Content` wrapper that receives children and style map tokens.

> DOM structure sketch:

```jsx
<div data-slot="base" data-open="…">
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button data-slot="container">{label}</Button>
    </Popover.Trigger>
    <Popover.Content data-slot="content" data-open="…">
      {children}
    </Popover.Content>
  </Popover.Root>
</div>
```

---

## Data Attributes & States

| State flag          | Effect |
| ------------------- | ------ |
| `data-open="true"` | Applied to the base wrapper and Popover content whenever the dropdown is expanded, enabling styleMap state hooks and instrumentation.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `min-w-40` |
| `content` | `rounded-md` `border` `shadow-md` `p-0.5` `bg-color-background-default` `text-color-content-default` `border-color-border-subtle` |

---

## Accessibility

* **Name:** The trigger Button’s accessible name comes from the required `label` prop; add `aria-label` on the root only when the label is visually hidden.
* **Keyboard:** Tab focuses the trigger, Space/Enter toggles it, Esc or clicking outside closes the panel, and focus returns to the trigger.
* **Roles/States:** Radix Popover wires the appropriate `aria-haspopup`, `aria-expanded`, and focus restoration; provide menu/list semantics inside `children` as needed.
* **Announcements:** Supply `role="menu"`/`aria-live` regions inside the panel when rendering dynamic content so screen readers receive updates.
* **Icon-only pattern:** If you purposefully hide `label`, ensure you set an explicit `aria-label` on the Button; decorative start/end icons must keep `aria-hidden="true"`.

---

## Patterns & Examples

### Quick action list

```tsx
<Dropdown label="Actions">
  <div className="flex flex-col gap-2" role="menu">
    <button type="button" className="text-left" role="menuitem">Edit</button>
    <button type="button" className="text-left" role="menuitem">Duplicate</button>
    <button type="button" className="text-left" role="menuitem">Archive</button>
  </div>
</Dropdown>
```
- Provide semantic roles (`role="menu"`/`role="menuitem"`) when rendering interactive lists.
- Buttons inside the panel manage their own focus; keep spacing generous for tap targets.

### Map & search surface

```tsx
<Dropdown label="Locations" side="right" sideOffset={12} collisionPadding={16}>
  <div className="flex flex-col gap-4">
    <Search
      placeholder="Search locations..."
      results={results}
      onResultSelect={handleSelect}
      onSearchTermChange={setQuery}
    />
    <Map ariaLabel="Map" isNested>
      <MapWithMarkerChip />
    </Map>
  </div>
</Dropdown>
```
- Combine multiple components inside the panel; Popover handles focus trapping only when `trapFocus` is true.
- Increase `collisionPadding` when rendering wide, edge-to-edge content.

### Controlled disclosure

```tsx
const [open, setOpen] = React.useState(false);

<Dropdown
  label="Saved lists"
  open={open}
  onOpenChange={setOpen}
  trapFocus
>
  <div className="min-w-160">…</div>
</Dropdown>
```
- Controlled mode keeps source-of-truth in your state; pass `trapFocus` when the panel behaves like a dialog.
- Use `onOpenChange` for analytics or to sync other UI (e.g., highlight an active toolbar button).

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `d09cc65d7c336ee709dbcfa1dc6a0dd97cca99654fed728fc9706ece690a7022`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-10 | Initial documentation for Dropdown, including props, states, and parity notes. |
