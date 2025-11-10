# Scroller
*Type: client* | *Base: div* | *Last updated: 2025-11-08*

## Overview
Scroller provides a horizontally scrollable rail with hidden scrollbars, optional stacked rows, and optional arrow controls powered by the `Control` component. It exposes scroll metrics via `onScrollChange`, tracks whether the viewport is at the start/end, and lets you page by viewport size or a fixed number of pixels.

---

## Import

### Component
```ts
import { Scroller } from '@doxyz-ui/core/client/Scroller';
```

### Types

```ts
import type { ScrollerProps } from '@doxyz-ui/core/client/Scroller';
```

---

## Usage

```tsx
<Scroller { ...props }>{children}</Scroller>
```

---

## Props (Declared + Inherited)

| Prop             | Type                                              | Default | Required | Notes |
| ---------------- | ------------------------------------------------- | ------: | :------: | ----- |
| `children`       | `React.ReactNode`                                 |         |   Yes    | Items rendered inside the scrollable rail.
| `className`      | `string`                                          |         |          | Appends utility classes to the outer wrapper.
| `onScroll`       | `(event: React.UIEvent<HTMLDivElement>) => void`  |         |          | Receives raw scroll events from the viewport.
| `onWheel`        | `(event: React.WheelEvent<HTMLDivElement>) => void` |       |          | Receives wheel events before built-in handling.
| `onScrollChange` | `(metrics: { left; width; viewport; atStart; atEnd }) => void` | |       | Emits debounced metrics when scroll position changes.
| `pageBy`         | `'viewport' \| 'fixed'`                           | `'viewport'` |      | Determines how far the arrow controls scroll.
| `pageSize`       | `number`                                          |      320 |          | Pixel distance per click when `pageBy="fixed"`.
| `showControls`   | `boolean`                                         |   `true` |          | Toggles the arrow controls row.
| `stackRows`      | `boolean`                                         |  `false` |          | Stacks children vertically instead of a single horizontal row.

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus labeling props (role/aria-label/aria-labelledby) to avoid conflicting with scroll semantics.
* **Forwards:** Additional props spread onto the base container.

---

## Structure

* **base** — Root `<div>` that tracks scrolling state via CSS vars (`--scroller-*`).
* **_viewport** — Scrollable container with hidden scrollbars.
* **_rail** — Flex row (or column when `stackRows`) containing the children.
* **_controls** — Optional row with `_prev` and `_next` wrappers containing `Control` buttons.

> DOM structure sketch:

```jsx
<div data-slot="base">
  <div data-slot="_viewport" onScroll={handleScroll}>
    <div data-slot="_rail" data-stack-rows={stackRows}
      {children}
    </div>
  </div>
  {showControls && (
    <div data-slot="_controls">
      <Control ariaLabel="Scroll left" onClick={() => applyScroll(-1)} />
      <Control ariaLabel="Scroll right" onClick={() => applyScroll(1)} />
    </div>
  )}
</div>
```

---

## Data Attributes & States

| State flag / CSS var           | Effect |
| ------------------------------ | ------ |
| `--scroller-scrolling`         | Set while scrolling is active (used for visual cues like shadows).
| `--scroller-edge-start` / `--scroller-edge-end` | Toggle when the viewport is at the start or end; arrow buttons disable themselves accordingly.
| `--has-controls`               | Indicates that arrow controls are rendered; useful for spacing adjustments.

---

## Classes

| Data slot   | Classes |
| ----------- | ------- |
| `base`      | `relative block w-full` plus conditional state classes (`[--scroller-scrolling:1]`, etc.). |
| `_viewport` | `overflow-x-auto overscroll-x-contain touch-pan-x [scrollbar-gutter:stable] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden` |
| `_rail`     | `flex items-stretch min-w-0 w-max data-[stack-rows=true]:flex-col` |
| `_controls` | `mt-3 flex gap-2 justify-end` |
| `_prev`/`_next` | `shrink-0` |

---

## Accessibility

* **Name:** Provide external headings/labels if the scroller represents a list (“Featured artists”). The component itself remains a neutral `<div>`.
* **Keyboard:** Users can use native horizontal scroll (Shift+Scroll, trackpad, etc.); the optional arrow buttons provide discrete paging via keyboard as well.
* **Roles/States:** The arrow `Control`s include `ariaLabel` (“Scroll left/right”); disable them when the viewport is at the respective edge.
* **Announcements:** Use `onScrollChange` to update other UI (e.g., progress indicators) as the user scrolls.
* **Icon-only pattern:** Scroll buttons rely on accessible labels; ensure they remain descriptive.

---

## Patterns & Examples

### Carousel-like scroller

```tsx
<Scroller showControls onScrollChange={metrics => setDisabled(metrics.atEnd)}>
  {cards.map(card => (
    <Card key={card.id} className="w-64 mr-4" />
  ))}
</Scroller>
```

- Cards should have fixed widths to create predictable paging.

### Stacked rows

```tsx
<Scroller stackRows showControls={false}>
  <div className="grid grid-cols-2 gap-4 min-w-[480px]">{children}</div>
</Scroller>
```

- `stackRows` lets you use the same component for vertical collections while preserving hidden scrollbars.

### Fixed paging

```tsx
<Scroller pageBy="fixed" pageSize={200}>
  {thumbnails}
</Scroller>
```

- Each arrow click scrolls exactly 200px regardless of viewport width.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `6daa0c13b2191b933a3ec3a9c365e2bb4ac0a8d7f04c86dafed90dd65045066a`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
