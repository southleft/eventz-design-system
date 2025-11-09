# Button
*Type: client* | *Base: Slot.Root* | *Last updated: 2025-11-08*

## Overview
Button triggers high-signal actions with four visual variants plus optional start/end icon slots. It disables itself while loading, forwards ARIA state (`aria-busy`, `aria-disabled`), and can render through another component via `asChild` when you need to inherit routing or layout semantics. Use it for primary CTAs, quiet inline actions, or knockout buttons on dark surfaces.

---

## Import

### Component
```ts
import { Button } from '@doxyz-ui/core/client/Button';
```

### Types

```ts
import type { ButtonProps } from '@doxyz-ui/core/client/Button';
```

---

## Usage

```tsx
<Button { ...props }>{children}</Button>
```

---

## Props (Declared + Inherited)

| Prop        | Type                                                        |       Default | Required | Notes |
| ----------- | ----------------------------------------------------------- | ------------: | :------: | ----- |
| `asChild`   | `boolean`                                                   |         `false` |          | Render the button through another component using Radix Slot semantics. |
| `children`  | `React.ReactNode`                                           |               |   Yes    | Visible label/content; also used as the accessible name. |
| `className` | `string`                                                    |               |          | Appends utility classes to the root button or composed child. |
| `disabled`  | `boolean`                                                   |         `false` |          | Forces the control into the disabled state without showing loading visuals. |
| `endIcon`   | `React.ReactNode`                                           |               |          | Optional trailing icon rendered in a dedicated slot with `aria-hidden="true"`. |
| `loading`   | `boolean`                                                   |         `false` |          | Marks the button busy; also disables click handling and toggles `aria-busy`. |
| `startIcon` | `React.ReactNode`                                           |               |          | Optional leading icon rendered before the label. |
| `type`      | `'button' \| 'submit' \| 'reset'`                          |    `'button'` |          | Forwarded to the underlying `<button>` for form behavior (ignored when `asChild`). |
| `variant`   | `'primary' \| 'secondary' \| 'bare' \| 'knockout'`        |    `'primary'` |          | Picks the token set controlling fill, text, and outline styling. |

* **Extends:** `React.ButtonHTMLAttributes<HTMLButtonElement>` minus: `children`, `color`
* **Forwards:** All standard HTML attributes for `<button>` (or the `asChild` root) to the container element.

---

## Structure

* **container** — `<button>` or custom root when `asChild`; receives disabled/loading state classes and forwarded props.
* **startIcon** — Optional span wrapping `startIcon`; hidden from assistive tech.
* **label** — `Slot.Slottable` children that produce the visible/accessible label.
* **endIcon** — Optional span wrapping `endIcon`; hidden from assistive tech.

> DOM structure sketch:

```jsx
<Slot.Root asChild?>
  <button data-variant="...">
    {startIcon && <span data-slot="startIcon" aria-hidden="true">…</span>}
    <span data-slot="label">{children}</span>
    {endIcon && <span data-slot="endIcon" aria-hidden="true">…</span>}
  </button>
</Slot.Root>
```

---

## Data Attributes & States

| State flag             | Effect |
| ---------------------- | ------ |
| `disabled` attribute   | Prevents pointer/keyboard interaction and applies opacity/pointer-events utility classes. |
| `aria-disabled="true"`| Announces the disabled state for assistive tech when `asChild` renders a non-button element. |
| `aria-busy="true"`    | Set while `loading` is true to announce progress; also blocks submission. |

---

## Classes

| Data slot   | Classes |
| ----------- | ------- |
| `container` | `inline-flex select-none items-center justify-center font-medium text-sm transition-colors border-1 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default outline-none h-24 px-4 gap-2 rounded-md` + variant token set (`primary`, `secondary`, `bare`, `knockout`). |
| `startIcon` | `shrink-0 -ml-0.5 pt-1` |
| `endIcon`   | `shrink-0 -mr-0.5 pt-1` |

---

## Accessibility

* **Name:** Comes from `children`; ensure it remains visible. Provide `aria-label` only when rendering icon-only content through `asChild`.
* **Keyboard:** Standard button semantics—Tab focuses, Space/Enter activates. When `asChild`, the wrapped element must support the same keyboard contract.
* **Roles/States:** Native `<button>` handles `role="button"`, `aria-pressed` if added externally, and `type`. `aria-busy` toggles during loading; `aria-disabled` mirrors `disabled` when the host is not a `<button>`.
* **Announcements:** `aria-busy` informs assistive tech that the action is running; keep loading intervals short so the button returns to normal quickly.
* **Icon-only pattern:** Supply a descriptive `aria-label`; mark decorative icons with `aria-hidden="true"` (already applied to slots).

---

## Patterns & Examples

### Primary CTA

```tsx
<Button variant="primary">Publish changes</Button>
```

- Pair with the highest-impact action on a surface.
- Keep the label action-oriented (verb + object).

### With icons

```tsx
<Button variant="secondary" startIcon={<DownloadIcon />} endIcon={<ChevronRightIcon />}>
  Export report
</Button>
```

- Icons are optional; they align vertically via slot utility classes.
- Prefer start icons for verbs and end icons for motion cues.

### As child link

```tsx
<Button asChild variant="bare">
  <a href="/docs/usage" aria-label="Learn more about usage">Learn more</a>
</Button>
```

- `asChild` lets you reuse button spacing on anchors or router links.
- Provide the accessible name on the child element when using `asChild`.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `34bb698f853db8a2626cd4690a4964dcb4a00158e96ac241be3d2e860558dbfa`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
