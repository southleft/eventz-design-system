# TextLink
*Type: client* | *Base: a* | *Last updated: 2025-11-11*

## Overview
TextLink renders a styled anchor that behaves like inline text rather than a button. Variants cover brand, strong, subtle, and inverted treatments, and you can prepend/append icons while keeping the label accessible. Use it inside paragraphs, card footers, or navigation summaries when you need a compact link.

---

## Import

### Component
```ts
import { TextLink } from '@doxyz-ui/core/client/TextLink';
```

### Types

```ts
import type { TextLinkProps } from '@doxyz-ui/core/client/TextLink';
```

---

## Usage

```tsx
<TextLink { ...props } />
```

---

## Props (Declared + Inherited)

| Prop        | Type                                                       |       Default | Required | Notes |
| ----------- | ---------------------------------------------------------- | ------------: | :------: | ----- |
| `className` | `string`                                                   |               |          | Appends utility classes to the anchor. |
| `disabled`  | `boolean`                                                  |         `false` |          | Adds `aria-disabled` and blocks interaction while keeping the link focusable. |
| `endIcon`   | `React.ReactNode`                                          |               |          | Optional trailing icon rendered inside a span with `aria-hidden="true"`. |
| `href`      | `string`                                                   |               |   Yes    | Navigation target; trimmed before being applied to the anchor. |
| `label`     | `string`                                                   |               |   Yes    | Visible text content for the link. |
| `startIcon` | `React.ReactNode`                                          |               |          | Optional leading icon rendered before the text. |
| `variant`   | `'brand' \| 'strong' \| 'subtle' \| 'inverted'`          |      `'brand'` |          | Chooses the typography/token treatment. |

* **Extends:** `React.AnchorHTMLAttributes<HTMLAnchorElement>` minus: `aria-disabled`, `children`, `href`
* **Forwards:** All standard HTML attributes for `<a>` to the root anchor.

---

## Structure

* **container** — `<a>` element combining base classes plus variant styling.
* **startIcon** — Optional span wrapping the leading icon; hidden from assistive tech.
* **label** — Span containing the trimmed `label` text.
* **endIcon** — Optional span wrapping the trailing icon.

> DOM structure sketch:

```jsx
<a href={href} aria-disabled={disabled ? 'true' : undefined}>
  {startIcon && <span data-slot="startIcon" aria-hidden="true">{startIcon}</span>}
  <span data-slot="label">{label}</span>
  {endIcon && <span data-slot="endIcon" aria-hidden="true">{endIcon}</span>}
</a>
```

---

## Data Attributes & States

| State flag            | Effect |
| --------------------- | ------ |
| `aria-disabled="true"` | Applies the aria-disabled Tailwind selectors, removing pointer events and dimming the text. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `inline-flex` `items-center` `select-none` `no-underline` `gap-2` `text-sm` `whitespace-nowrap` `transition-colors` `outline-none` `rounded-sm` `focus-visible-brand` `aria-disabled:opacity-50` `aria-disabled:pointer-events-none` `aria-disabled:select-none` |
| `startIcon` | `shrink-0` `-ml-0.5` `pt-2` |
| `label` | — |
| `endIcon` | `shrink-0` `-mr-0.5` `pt-2` |
| `container (variant: brand)` | `text-color-content-brand` `hover:text-color-content-brand-hover` `font-bold` |
| `container (variant: strong)` | `text-color-content-default` `hover:text-color-content-default-hover` `font-medium` |
| `container (variant: subtle)` | `text-color-content-weak` `hover:text-color-content-weak-hover` |
| `container (variant: inverted)` | `text-comp-button-primary-color-content-default` `hover:text-comp-button-primary-color-content-hover` `active:text-comp-button-primary-color-content-active` |

---

## Accessibility

* **Name:** Comes directly from the visible `label`; keep it descriptive.
* **Keyboard:** Standard anchor semantics—Tab focuses, Enter/Space activates (Space via browser default). Use `rel`/`target` as needed for external links.
* **Roles/States:** `<a>` exposes `role="link"`; `aria-disabled` communicates disabled state while allowing focus for screen readers.
* **Announcements:** Provide contextual copy around the link to explain the destination. For icon-only links, include descriptive text in `label` or via `aria-label`.
* **Icon-only pattern:** Avoid removing the `label`; icons are `aria-hidden` so the anchor would become nameless.

---

## Patterns & Examples

### Brand link

```tsx
<TextLink href="/pricing" label="View pricing" variant="brand" />
```

- Use `variant="brand"` for primary navigation links.
- Pair with inline copy (“See pricing”) to clarify intent.

### Subtle inline link

```tsx
<TextLink href="#faq" label="See FAQ" variant="subtle" />
```

- Works well inside paragraphs where the link shouldn’t overpower the surrounding text.
- Keep the label short to avoid wrapping.

### Link with icons

```tsx
<TextLink
  href="https://example.com/docs"
  label="Docs"
  startIcon={<BookOpenIcon />}
  endIcon={<ExternalLinkIcon />}
/>
```

- Icons automatically receive spacing; mark external links with an end icon for clarity.
- Add `target="_blank" rel="noreferrer"` when linking externally.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `241258768b52fdfaf330ac64a667b68191284c84f2d6bb937dae7107b1a5efc1`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
