# Control
*Type: client* | *Base: button* | *Last updated: 2025-11-11*

## Overview
Control is a compact, icon-only button used for lightweight actions (carousel arrows, floating controls, etc.). It enforces a non-empty `ariaLabel`, supports brand/dark/light visual variants, and exposes two fixed sizes. Use it when you need a circular affordance without text.

---

## Import

### Component
```ts
import { Control } from '@doxyz-ui/core/client/Control';
```

### Types

```ts
import type { ControlProps } from '@doxyz-ui/core/client/Control';
```

---

## Usage

```tsx
<Control { ...props } />
```

---

## Props (Declared + Inherited)

| Prop        | Type                                  | Default | Required | Notes |
| ----------- | ------------------------------------- | ------: | :------: | ----- |
| `ariaLabel` | `string`                              |         |   Yes    | Accessible name applied to `aria-label` on the underlying `<button>`.
| `className` | `string`                              |         |          | Appends utility classes to the button for contextual spacing.
| `icon`      | `React.ReactNode`                     |         |   Yes    | Icon or glyph rendered inside the control; marked `aria-hidden`.
| `size`      | `'lg' \| 'sm'`                        |   `'lg'` |          | Sets the button diameter (`40px` vs `32px`) and icon size.
| `variant`   | `'brand' \| 'dark' \| 'light'`        | `'brand'` |          | Selects the token set for fill/foreground styling.

* **Extends:** `React.ButtonHTMLAttributes<HTMLButtonElement>` minus: `children`, `aria-label`
* **Forwards:** All other button attributes (`type`, `onClick`, etc.) to the root `<button>`; `type` defaults to `button` unless overridden.

---

## Structure

* **button** — Circular wrapper with variant + size styling, focus ring, and forwarded button props.
* **icon** — `<span>` wrapper that sizes the provided icon via `[&>svg]` selectors and hides it from assistive tech.

> DOM structure sketch:

```jsx
<button type="button" aria-label={ariaLabel} data-variant={variant}>
  <span aria-hidden="true">{icon}</span>
</button>
```

---

## Data Attributes & States

| State flag          | Effect |
| ------------------- | ------ |
| `aria-label="…"`   | Ensures the icon-only button is announced correctly.
| Size selectors      | Runtime toggles between size tokens (`h-40 w-40` vs `h-32 w-32`) based on the `size` prop; no additional data attributes are emitted.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `button` | `inline-flex` `select-none` `items-center` `justify-center` `rounded-full` `transition-colors` `outline-none` `whitespace-nowrap` `focus-visible-brand` |
| `icon` | `shrink-0` |
| `button (variant: brand)` | `bg-comp-button-primary-color-background-default` `text-comp-button-primary-color-content-default` `border-none` `hover:bg-comp-button-primary-color-background-hover` `active:bg-comp-button-primary-color-background-active` |
| `button (variant: dark)` | `bg-comp-button-color-background-knockout-blur` `text-comp-button-color-content-default` `border-none` `hover:bg-comp-button-color-background-knockout-blur-hover` `active:bg-comp-button-color-background-knockout-blur-active` |
| `button (variant: light)` | `bg-comp-button-color-background-default-blur` `text-comp-button-color-content-default` `border-none` `hover:bg-comp-button-color-background-default-blur-hover` `active:bg-comp-button-color-background-default-blur-active` |
| `button (state: size lg)` | `h-10` `w-10` `[&>svg]:size-5` |
| `button (state: size sm)` | `h-8` `w-8` `[&>svg]:size-4` |

---

## Accessibility

* **Name:** Required `ariaLabel` supplies the accessible name; keep it short but actionable (“Play video”, “Open menu”).
* **Keyboard:** Behaves like any button—Tab focuses it, Space/Enter activate it. Set `type="button"` if embedding inside forms.
* **Roles/States:** Native `<button>` handles `role="button"`; add `aria-pressed` externally if you build toggle semantics.
* **Announcements:** Because the icon is `aria-hidden`, screen readers only announce the label; avoid repeating the icon’s meaning elsewhere.
* **Icon-only pattern:** Do not rely on tooltips for naming—tooltips complement `ariaLabel` but can’t replace it.

---

## Patterns & Examples

### Carousel controls

```tsx
<Control icon={<ChevronLeftIcon />} ariaLabel="Previous slide" size="sm" />
<Control icon={<ChevronRightIcon />} ariaLabel="Next slide" size="sm" />
```

- Pair two controls for previous/next navigation.
- Keep them adjacent to the content they modify for comprehension.

### Floating action

```tsx
<Control icon={<PlusIcon />} ariaLabel="Create" variant="brand" onClick={openModal} />
```

- Brand variant stands out against neutral backgrounds.
- Combine with transitions to emphasize entry.

### On dark surfaces

```tsx
<Control icon={<PlayIcon />} ariaLabel="Play" variant="light" />
```

- Light variant ensures sufficient contrast on dark hero images.
- Use `size="lg"` when the control is the primary affordance.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `88774c3478b044b890f492e41f499af10e3b7cfc30a86d5648f323953ed9f779`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
