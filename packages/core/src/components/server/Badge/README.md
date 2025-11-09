# Badge
*Type: server* |
*Base: span* |
*Last updated: 2025-11-09*

## Overview
Badge renders a small label with tightly controlled typography and gradient backgrounds to call out status, metadata, or featured categories. It wraps the Radix Badge primitive but owns the inline layout, ensuring icons and text stay vertically centered. Use it anywhere you need a lightweight status descriptor without introducing interactive behavior.

---

## Import

### Component
```ts
import { Badge } from '@doxyz-ui/core/server/Badge';
```

### Types

```ts
import type { BadgeProps } from '@doxyz-ui/core/server/Badge';
```

---

## Usage

```tsx
<Badge { ...props } />
```

> - Keep icons decorative (`aria-hidden="true"`) so the `label` string is the only announced text.
> - Drive color via `variant`; the component remains presentational and should sit inside interactive parents if needed.

---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop        | Type                                         |   Default | Required | Notes                                                                 |
| ----------- | -------------------------------------------- | --------: | :------: | --------------------------------------------------------------------- |
| `className` | `string`                                     |           |          | Additional utility classes merged after the badge’s base tokens.      |
| `icon`      | `React.ReactNode`                            |           |          | Optional leading glyph rendered before the label; aria-hidden by default. |
| `label`     | `string`                                     |           |          | Text content shown inside the badge.                                  |
| `variant`   | `'purple' \| 'blue' \| 'pink' \| 'brand' \| 'orange'` | `'purple'` |          | Chooses the gradient/color treatment defined by the style map.        |

* **Extends:** `React.HTMLAttributes<HTMLSpanElement>`
* **Forwards:** All standard HTML attributes for `<span>` to the root element.

---

## Structure

* **base** — Radix Badge root that renders a styled `<span>` wrapper.
* **icon** — Optional icon-only slot placed before the label.
* **label** — Text span that displays the provided string.

> DOM structure sketch:

```jsx
<RadixBadge>
  <span className="inline-flex ...">
    <span className="flex items-center gap-1.5">
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      {label && <span>{label}</span>}
    </span>
  </span>
</RadixBadge>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | The badge does not expose custom `data-*` flags; variants are selected via the `variant` prop. |

---

## Classes

| Data slot  | Classes                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `base`     | `inline-flex` `items-center` `rounded-sm` `px-1.5` `py-0.5` `text-caption-lg-allcaps-bold` plus the variant class (`bg-gradient-purple`, `bg-gradient-blue`, `bg-gradient-pink`, `bg-brand-500`, or `bg-gradient-orange`). |
| `content`  | `flex` `items-center` `gap-1.5`                                                                            |
| `icon`     | `shrink-0`                                                                                                |
| `label`    | *(inherits content typography)*                                                                           |

---

## Accessibility

* **Name:** Provided entirely by the `label` string or any forwarded `aria-label`.
* **Keyboard:** Non-interactive; ensure it is not focusable and leave keyboard behavior to surrounding controls.
* **Roles/States:** Falls back to `<span>` semantics; add `role` manually only when required contextually.
* **Announcements:** Because icons are `aria-hidden="true"`, screen readers will only announce the label text—keep it descriptive.
* **Icon-only pattern:** Avoid rendering icon-only badges; if required, supply `aria-label` with the text equivalent.

---

## Patterns & Examples

### Status badge

```tsx
<Badge variant="pink" label="Beta" />
```

### Badge with icon

```tsx
<Badge
  variant="blue"
  icon={<SparkleIcon />}
  label="Featured"
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Props parity: **MISMATCH** (contract specifies `asChild`, but the runtime does not expose it)
* Signature hash: `3d3e76b3927113835cd156a3f2d48e994a7dbca97a3e79ef352b0e46f8134822`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
