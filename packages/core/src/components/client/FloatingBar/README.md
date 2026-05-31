# FloatingBar
*Type: client* | *Base: div* | *Last updated: 2025-11-11*

## Overview
FloatingBar is a horizontally aligned utility bar that can display summary content plus trailing actions, with optional scroll controls on each side. When `isScrollable` is true, arrow `IconButton`s fire scroll callbacks so parents can nudge a scroll container left/right. Provide `ariaLabel` or `labelledBy` to describe the region when it acts as supplementary navigation.

---

## Import

### Component
```ts
import { FloatingBar } from '@eventz-ui/core/client/FloatingBar';
```

### Types

```ts
import type { FloatingBarProps } from '@eventz-ui/core/client/FloatingBar';
```

---

## Usage

```tsx
<FloatingBar { ...props } />
```

---

## Props (Declared + Inherited)

| Prop             | Type                                          | Default | Required | Notes |
| ---------------- | --------------------------------------------- | ------: | :------: | ----- |
| `actions`        | `React.ReactNode`                              |         |          | Elements rendered in the trailing actions slot (buttons, links, etc.).
| `ariaLabel`      | `string`                                       |         |          | Accessible name applied to the region when `labelledBy` is absent.
| `className`      | `string`                                       |         |          | Appends utility classes to the root container.
| `content`        | `React.ReactNode`                              |         |          | Primary text/content in the leading slot.
| `isScrollable`   | `boolean`                                      |   `false` |          | Shows arrow controls and enables scroll callbacks when true.
| `labelledBy`     | `string`                                       |         |          | Id of an external element that labels the bar (used instead of `ariaLabel`).
| `onLeftScroll`   | `(event?: MouseEvent | KeyboardEvent) => void` |         |          | Fired when the left arrow is pressed; also enables the control.
| `onRightScroll`  | `(event?: MouseEvent | KeyboardEvent) => void` |         |          | Fired when the right arrow is pressed; also enables the control.

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` (role, tabIndex, etc. are forwarded).

---

## Structure

* **container** — Root `<div>` (optionally `role="region"`) that holds optional arrows plus the main rail.
* **_startButton / _endButton** — Wrappers for `IconButton`s that call scroll callbacks; rendered only when `isScrollable` is true.
* **_rail** — Flex row containing `content` and `actions` slots.

> DOM structure sketch:

```jsx
<div role="region" aria-label={ariaLabel} data-scrollable={isScrollable}>
  {isScrollable && (
    <IconButton ariaLabel="Scroll left" onClick={event => onLeftScroll?.(event.nativeEvent)} />
  )}
  <div>
    <div>{content}</div>
    <div>{actions}</div>
  </div>
  {isScrollable && (
    <IconButton ariaLabel="Scroll right" onClick={event => onRightScroll?.(event.nativeEvent)} />
  )}
</div>
```

---

## Data Attributes & States

| State flag                 | Effect |
| -------------------------- | ------ |
| `data-scrollable="true"`  | Indicates that scroll controls are visible; consumers can target it for sticky/scroll styles.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `flex` `items-center` `justify-between` `gap-0.5` `px-4` `py-6` `bg-color-background-default` `outline-none` |
| `_startButton` | `_startButton` `shrink-0` |
| `_endButton` | `_endButton` `shrink-0` |
| `_rail` | `_rail` `flex` `items-center` `gap-0.5` `min-w-0` `flex-1` |
| `_content` | `_content` `min-w-0` `flex-1` `justify-start` `truncate` `text-color-content-default` `text-lg` |
| `_actions` | `_actions` `inline-flex` `gap-0.5` `shrink-0` `justify-end` |

---

## Accessibility

* **Name:** Provide either `ariaLabel` or `labelledBy` so screen readers understand what the floating bar represents.
* **Keyboard:** Arrow IconButtons expose their own keyboard interactions (Space/Enter). Make sure scroll callbacks account for keyboard-triggered events.
* **Roles/States:** The component assigns `role="region"` automatically when an accessible name is provided; otherwise it remains a neutral `<div>`.
* **Announcements:** When `isScrollable` is true but scroll callbacks are missing, the buttons are disabled to prevent confusing announcements.
* **Icon-only pattern:** Scroll arrows rely on `ariaLabel` strings (“Scroll left/right”) for accessible names.

---

## Patterns & Examples

### Non-scrollable summary bar

```tsx
<FloatingBar
  content={<span>3 items selected</span>}
  actions={<Button variant="secondary">Clear all</Button>}
/>
```

- Useful for multi-select tables, filter bars, etc.

### Scroll controls

```tsx
<FloatingBar
  isScrollable
  onLeftScroll={() => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
  onRightScroll={() => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
  content={<span>Recently viewed</span>}
  actions={<Button variant="secondary">View library</Button>}
/>
```

- Keep the callbacks idempotent—when undefined, the corresponding button is disabled.

### With labelledBy

```tsx
<h2 id="floating-bar-heading">Bulk actions</h2>
<FloatingBar labelledBy="floating-bar-heading" content="Archive selected items" actions={<Button>Archive</Button>} />
```

- Helps avoid repeating the same string in both visible and aria text.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `a2ae5d4ac0357355bd2609bf74e2ad2c6cc7e522dfbe24aac7d33a902b365134`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
