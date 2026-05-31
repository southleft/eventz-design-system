# Text
*Type: server* |
*Base: span (polymorphic)* |
*Last updated: 2025-11-09*

## Overview
Text is a polymorphic typography primitive that maps semantic props (`size`, `weight`, `color`, etc.) to design-system token classes while letting you choose the rendered element via `as`. Unlike Heading, it has no presets—every visual axis is explicit and defaults to neutral values. Use it for inline copy, helper text, captions, and any content that needs consistent tokens without custom CSS.

---

## Import

### Component
```ts
import { Text } from '@eventz-ui/core/server/Text';
```

### Types

```ts
import type { TextProps } from '@eventz-ui/core/server/Text';
```

---

## Usage

```tsx
<Text { ...props }>{children}</Text>
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop        | Type                                                                                                                            | Default  | Required | Notes                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- | :------: | --------------------------------------------------------------------------------------------- |
| `align`     | `'left' \| 'center' \| 'right' \| 'justify' \| 'inherit'`                                                                        | `'inherit'` |          | Applies text alignment utilities; `inherit` leaves alignment untouched.                       |
| `as`        | `'span' \| 'p' \| 'div' \| 'label' \| 'strong' \| 'em' \| 'small' \| 'code' \| 'kbd' \| 'mark'`                                   | `'span'` |          | Semantic element to render.                                                                   |
| `className` | `string`                                                                                                                        |          |          | Additional utility classes appended to the composed typography tokens.                        |
| `color`     | `'default' \| 'brand' \| 'weak' \| 'inverse' \| 'subtle' \| 'danger-strong' \| 'danger-subtle' \| 'warning-strong' \| 'warning-subtle' \| 'success-strong' \| 'success-subtle' \| 'info-strong' \| 'info-subtle' \| 'inherit'` | `'default'` |          | Applies text color roles; `inherit` emits no class.                                           |
| `italic`    | `boolean`                                                                                                                       | `false`  |          | Adds the `italic` utility when true.                                                          |
| `size`      | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl' \| '8xl' \| 'inherit'`             | `'base'` |          | Typography scale; `inherit` emits no class.                                                   |
| `transform` | `'normal' \| 'uppercase' \| 'lowercase' \| 'capitalize' \| 'inherit'`                                                            | `'inherit'` |          | Text transform utility; `inherit` emits no class.                                             |
| `truncate`  | `boolean`                                                                                                                       | `false`  |          | Enables single-line truncation.                                                               |
| `weight`    | `'thin' \| 'extra-light' \| 'light' \| 'normal' \| 'medium' \| 'semi-bold' \| 'bold' \| 'extra-bold' \| 'black' \| 'inherit'`   | `'normal'` |          | Font weight utility; `inherit` emits no class.                                                |

* **Extends:** Polymorphic—accepts attributes for the provided `as` element via `React.ComponentPropsWithoutRef<T>`
* **Forwards:** All standard attributes for the rendered element (e.g., `href` when `as="a"`).

---

## Structure

* **container** — The chosen element (`as` prop) that receives the composed classes and children.

> DOM structure sketch:

```jsx
const Comp = as ?? 'span';
<Comp className="text-sm text-color-content-weak italic truncate">
  {children}
</Comp>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | Text relies solely on prop-driven classes; it does not expose `data-*` states. |

---

## Classes

| Data slot | Classes / Tokens                                                                                                                                                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`    | Size tokens (`text-xs` … `text-8xl`), weight tokens (`font-thin` … `font-black`), alignment tokens (`text-left`, `text-center`, `text-right`, `text-justify`), color tokens (`text-color-content-*`, `text-color-content-utility-*`), transform tokens (`normal-case`, `uppercase`, `lowercase`, `capitalize`), plus optional `italic` and `truncate`. |

---

## Accessibility

* **Name:** Text renders inline content; use semantic `as` values (`p`, `strong`, etc.) to convey structure.
* **Keyboard:** Non-interactive by default; when using interactive elements via `as`, ensure you pass the necessary attributes (e.g., `href` for anchors).
* **Roles/States:** Avoid using Text to fake headings; use Heading when you need actual heading semantics.
* **Announcements:** When using status colors (danger/warning/etc.), accompany color changes with text to satisfy color-contrast requirements.
* **Icon-only pattern:** Not intended for icons; combine with `VisuallyHidden` or other components to provide accessible labels.

---

## Patterns & Examples

### Muted helper text

```tsx
<Text as="p" size="sm" color="weak">
  You can update this later in settings.
</Text>
```
- Combine `size="sm"` with `color="weak"` for secondary helper copy.
- Keep helper text concise so it reads well next to form controls.

### Inline code snippet

```tsx
<Text as="code" size="sm" color="inverse">
  npm install @eventz-ui/core
</Text>
```
- Switch the `as` prop to semantic elements like `code` when you need inline formatting.
- Pair inverse colors with dark backgrounds to maintain contrast.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `a3871ad8f7d640127ade7806af559ec24af7fbc3e316d56c48eb15f2a430f405`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
