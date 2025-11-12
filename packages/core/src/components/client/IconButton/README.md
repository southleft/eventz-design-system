# IconButton
*Type: client* | *Base: button* | *Last updated: 2025-11-11*

## Overview
IconButton renders an icon-only control with the same visual variants as the standard Button. It enforces a non-empty `ariaLabel`, supports loading/disabled states, and forwards native button props so you can reuse it inside forms or toolbars. Reach for it when an action can be represented by a glyph rather than text.

---

## Import

### Component
```ts
import { IconButton } from '@doxyz-ui/core/client/IconButton';
```

### Types

```ts
import type { IconButtonProps } from '@doxyz-ui/core/client/IconButton';
```

---

## Usage

```tsx
<IconButton { ...props } />
```

---

## Props (Declared + Inherited)

| Prop        | Type                                                                |       Default | Required | Notes |
| ----------- | ------------------------------------------------------------------- | ------------: | :------: | ----- |
| `ariaLabel` | `string`                                                            |               |   Yes    | Accessible name applied to `aria-label`; must be non-empty after trimming. |
| `className` | `string`                                                            |               |          | Appends utility classes to the button element. |
| `disabled`  | `boolean`                                                           |         `false` |          | Permanently disables the control regardless of loading state. |
| `icon`      | `React.ReactNode`                                                   |               |   Yes    | Icon or glyph rendered inside the button; marked `aria-hidden="true"`. |
| `loading`   | `boolean`                                                           |         `false` |          | Shows the waiting cursor, disables click events, and sets `aria-busy`. |
| `type`      | `'button' \| 'submit' \| 'reset'`                                  |    `'button'` |          | Forwarded to `<button>` to participate in forms. |
| `variant`   | `'primary' \| 'secondary' \| 'bare' \| 'knockout' \| 'bareKnockout'` |    `'primary'` |          | Selects the token set controlling fill, text, and outline styling. |

* **Extends:** `React.ButtonHTMLAttributes<HTMLButtonElement>` minus: `aria-label`, `children`, `color`, `disabled`, `type`
* **Forwards:** All standard HTML attributes for `<button>` to the root element.

---

## Structure

* **container** — `<button>` element that carries variant, focus ring, and loading state classes.
* **icon** — `<span>` that wraps the provided `icon` node; marked `aria-hidden` so assistive tech relies on `ariaLabel`.

> DOM structure sketch:

```jsx
<button data-variant="..." data-loading="true?" aria-label={ariaLabel}>
  <span data-slot="icon" aria-hidden="true">{icon}</span>
</button>
```

---

## Data Attributes & States

| State flag            | Effect |
| --------------------- | ------ |
| `data-loading="true"`| Adds the waiting cursor via `cursor-wait` and prevents pointer events. |
| `aria-busy="true"`   | Announces that the action is in progress when `loading` is true. |
| `aria-disabled="true"` | Mirrors the disabled state when rendered inside custom wrappers. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `inline-flex` `select-none` `items-center` `justify-center` `outline-none` `transition-colors` `focus-visible-brand` `disabled:opacity-50` `disabled:pointer-events-none` `whitespace-nowrap` `h-32` `w-32` `rounded-md` |
| `icon` | `shrink-0` `pt-1` `[&_svg]:size-20` |
| `container (variant: primary)` | `bg-comp-button-primary-color-background-default` `text-comp-button-primary-color-content-default` `border-none` `hover:bg-comp-button-primary-color-background-hover` `active:bg-comp-button-primary-color-background-active` |
| `container (variant: secondary)` | `bg-comp-button-color-background-default` `border-comp-button-color-border-default` `text-comp-button-color-content-default` `hover:bg-comp-button-color-background-hover` `active:bg-comp-button-color-background-active` `border` |
| `container (variant: bare)` | `bg-background-none` `text-comp-button-color-content-default` `border-none` `hover:bg-comp-button-color-background-hover` `active:bg-comp-button-color-background-active` |
| `container (variant: knockout)` | `bg-comp-button-color-background-knockout` `text-comp-button-color-content-default` `border-none` `hover:bg-comp-button-color-background-knockout-hover` `active:bg-comp-button-color-background-knockout-active` |
| `container (variant: bareKnockout)` | `bg-background-none` `text-comp-button-primary-color-content-default` `border-none` `hover:bg-comp-button-color-background-hover` `active:bg-comp-button-color-background-active` |
| `container (state: loading)` | `cursor-wait` |

---

## Accessibility

* **Name:** Required `ariaLabel` supplies the accessible name; keep it short but descriptive.
* **Keyboard:** Native button semantics—Tab focuses, Space/Enter activates. Ensure `type="button"` when placing inside forms to avoid accidental submissions.
* **Roles/States:** `<button>` automatically advertises `role="button"`; `aria-busy`/`aria-disabled` reflect loading/disabled states.
* **Announcements:** Screen readers announce the label immediately; when loading toggles, `aria-busy` indicates progress without changing focus.
* **Icon-only pattern:** Icons are marked `aria-hidden`, so do not rely on inline SVG titles for naming.

---

## Patterns & Examples

### Toolbar action

```tsx
<IconButton icon={<Pencil1Icon />} ariaLabel="Edit" variant="secondary" />
```

- Use the `secondary` variant for neutral, inline actions.
- Pair with a tooltip for discoverability on hover/focus.

### Destructive action

```tsx
<IconButton icon={<TrashIcon />} ariaLabel="Delete" variant="knockout" disabled={isLocked} />
```

- Knockout provides a high-contrast treatment for destructive affordances.
- Disable when the action is unavailable; the component adds the appropriate opacity and pointer handling.

### Loading submitter

```tsx
<IconButton
  type="submit"
  icon={<ArrowUpIcon />}
  ariaLabel="Upload"
  loading={isUploading}
/>
```

- Loading implies disabled and shows the waiting cursor.
- Forwarded `type="submit"` lets the icon button submit lightweight forms.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `713fb8e015a2a7893540f05cd794d1efc836884810232812fb5eb181336ea535`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
