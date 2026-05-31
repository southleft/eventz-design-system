# NavigationDropdown
*Type: client* | *Base: RadixPopover.Root* | *Last updated: 2025-11-11*

## Overview
NavigationDropdown toggles a full-screen popover menu using an `IconButton` trigger and renders a list of link items via `MenuItem`. It’s ideal for compact headers that expand into a full navigation panel on small screens.

---

## Import

### Component
```ts
import { NavigationDropdown } from '@eventz-ui/core/client/NavigationDropdown';
```

### Types

```ts
import type { NavigationDropdownProps } from '@eventz-ui/core/client/NavigationDropdown';
```

---

## Usage

```tsx
<NavigationDropdown { ...props } />
```

---

## Props (Declared + Inherited)

| Prop             | Type                                      | Default | Required | Notes |
| ---------------- | ----------------------------------------- | ------: | :------: | ----- |
| `ariaLabel`      | `string`                                  |         |          | When provided, the item list is wrapped in `<nav aria-label=...>`.
| `closeIcon`      | `React.ReactNode`                         | `<CloseIcon />` | | Icon displayed while the popover is open.
| `items`          | `Array<{ label: string; href: string; ariaLabel?: string }>` | |   Yes    | Menu entries rendered as `MenuItem` links.
| `openIcon`       | `React.ReactNode`                         | `<NotesIcon />` | | Icon displayed when the popover is closed.
| `triggerAriaLabel`| `string`                                | `'Menu'` |          | Accessible name for the trigger IconButton.

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` (applied to the root wrapper).

---

## Structure

* **base** — Wrapper `<div>` that toggles `data-is-open="true"` while the popover is open.
* **trigger** — `<Popover.Trigger asChild>` rendering an `IconButton`.
* **panel** — `<Popover.Content>` covering the viewport (full height/width, scrollable).
* **item** — Row wrapper around each `MenuItem` link.

> DOM structure sketch:

```jsx
<div data-slot="base" data-is-open={isOpen ? 'true' : undefined}>
  <Popover.Root>
    <Popover.Trigger asChild>
      <IconButton ariaLabel={triggerAriaLabel ?? 'Menu'} icon={isOpen ? closeIcon : openIcon} />
    </Popover.Trigger>
    <Popover.Content className="panel">
      <nav aria-label={ariaLabel}>
        {items.map(item => (
          <div key={item.href} className="item">
            <MenuItem href={item.href} option={item.label} ariaLabel={item.ariaLabel ?? item.label} />
          </div>
        ))}
      </nav>
    </Popover.Content>
  </Popover.Root>
</div>
```

---

## Data Attributes & States

| State flag             | Effect |
| ---------------------- | ------ |
| `data-is-open="true"` | Applied to the base wrapper while the popover is open; use it for header styling (e.g., dimming the trigger background).

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `trigger` | — |
| `panel` | `z-50` `py-4` `bg-background-none` `w-screen` `h-screen` `top-[var(--nav-offset)]` `overflow-y-auto` |
| `list` | — |
| `item` | `mx-4` |

---

## Accessibility

* **Name:** Always supply `triggerAriaLabel` (or accept “Menu”) so the IconButton is descriptive. Use `ariaLabel` for the nav landmark when appropriate.
* **Keyboard:** The popover trap keeps focus within the panel; Esc closes it and returns focus to the trigger.
* **Roles/States:** Items render as `<a>` elements via `MenuItem`; ensure each `href` is valid.
* **Announcements:** When `ariaLabel` isn’t provided, the list isn’t wrapped in a landmark; consider adding heading text inside the panel.
* **Icon-only pattern:** Both open/close icons are decorative; accessible labeling is handled via the icon button’s aria label.

---

## Patterns & Examples

### Custom icons

```tsx
<NavigationDropdown
  openIcon={<HamburgerIcon />}
  closeIcon={<CloseHeavyIcon />}
  items={navItems}
/>
```

- Icons can be any React nodes; keep them visually balanced (square, centered).

### Sectioned nav

```tsx
<NavigationDropdown ariaLabel="Products menu" items={productLinks}>
  {/* Items array already partitions sections; wrap them externally if needed. */}
</NavigationDropdown>
```

- The component renders a simple list; add headings or separators by customizing the `items` list upstream.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `49c24e9feaa7c2430095ddb2063cdc891c6044fb905729f6aa506fb473072793`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
