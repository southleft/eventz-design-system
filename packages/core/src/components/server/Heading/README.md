# Heading
*Type: server* |
*Base: h2 (configurable h1–h6)* |
*Last updated: 2025-11-09*

## Overview
Heading renders semantic `h1`–`h6` elements with opt-in typography controls (size, weight, alignment, color, transform) plus utility booleans for italics, truncation, and margin reset. By default it picks the appropriate size/weight preset for the chosen `as` level while still allowing explicit overrides. Use it whenever you need consistent heading tokens without giving up document outline control.

---

## Import

### Component
```ts
import { Heading } from '@eventz-ui/core/server/Heading';
```

### Types

```ts
import type { HeadingProps } from '@eventz-ui/core/server/Heading';
```

---

## Usage

```tsx
<Heading { ...props }>{children}</Heading>
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop        | Type                                                                                                                          | Default | Required | Notes                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- | :------: | ----------------------------------------------------------------------------------------- |
| `align`     | `'left' \| 'center' \| 'right' \| 'justify' \| 'inherit'`                                                                     | `'inherit'` |          | Applies text alignment; `inherit` leaves alignment untouched.                             |
| `as`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'`                                                                                | `'h2'`  |          | Semantic heading level to render.                                                         |
| `className` | `string`                                                                                                                      |         |          | Additional utility classes merged after the component tokens.                             |
| `color`     | `'default' \| 'brand' \| 'weak' \| 'inverse' \| 'subtle' \| 'danger-strong' \| 'danger-subtle' \| 'warning-strong' \| 'warning-subtle' \| 'success-strong' \| 'success-subtle' \| 'info-strong' \| 'info-subtle' \| 'inherit'` | `'default'` |          | Applies content or status color tokens; `inherit` keeps parent color.                     |
| `italic`    | `boolean`                                                                                                                     | `false` |          | Adds `italic` when true.                                                                  |
| `noMargin`  | `boolean`                                                                                                                     | `true`  |          | Removes default UA margins via `m-0`.                                                     |
| `size`      | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl' \| '8xl' \| 'auto' \| 'inherit'` | `'auto'` |          | Controls text size; `auto` uses the preset mapped to `as`, `inherit` emits no class.      |
| `transform` | `'normal' \| 'uppercase' \| 'lowercase' \| 'capitalize' \| 'inherit'`                                                          | `'inherit'` |          | Chooses a text-transform utility.                                                         |
| `truncate`  | `boolean`                                                                                                                     | `false` |          | Applies single-line truncation via `truncate`.                                            |
| `weight`    | `'thin' \| 'extra-light' \| 'light' \| 'normal' \| 'medium' \| 'semi-bold' \| 'bold' \| 'extra-bold' \| 'black' \| 'auto' \| 'inherit'` | `'auto'` |          | Controls font weight; `auto` uses the preset for the current `as`, `inherit` emits none. |

* **Extends:** `React.HTMLAttributes<HTMLHeadingElement>`
* **Forwards:** All standard HTML attributes for `<h1>`–`<h6>` to the rendered element.

---

## Structure

* **container/base** — Single heading element (`<h1>`–`<h6>`) that renders `children` and composes the requested typography classes.

> DOM structure sketch:

```jsx
const Tag = as ?? 'h2';
<Tag className="text-3xl font-bold text-color-content-default m-0">
  {children}
</Tag>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | Heading does not expose runtime `data-*` flags; props directly toggle classes. |

---

## Classes

| Data slot | Classes / Tokens                                                                                                                                                                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`    | Size tokens: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`, `text-8xl`. Weight tokens: `font-thin`, `font-extralight`, `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black`. Alignment tokens: `text-left`, `text-center`, `text-right`, `text-justify`. Color tokens: `text-color-content-default`, `text-color-content-brand`, `text-color-content-weak`, `text-color-content-inverse`, `text-color-content-subtle`, `text-color-content-utility-danger-strong`, `text-color-content-utility-danger-subtle`, `text-color-content-utility-warning-strong`, `text-color-content-utility-warning-subtle`, `text-color-content-utility-success-strong`, `text-color-content-utility-success-subtle`, `text-color-content-utility-info-strong`, `text-color-content-utility-info-subtle`. Transform tokens: `normal-case`, `uppercase`, `lowercase`, `capitalize`. Utility states: `italic`, `truncate`, `m-0`. Preset helpers: `text-3xl`, `text-2xl`, `text-xl`, `text-lg`, `text-base`, `font-bold`, `font-extrabold` (applied automatically for each heading level when `size`/`weight` are `auto`). |

---

## Accessibility

* **Name:** Headings inherit their text content as the accessible name; keep the text concise and descriptive.
* **Keyboard:** Non-interactive; focus remains on surrounding interactive controls.
* **Roles/States:** Always pick the correct `as` level to preserve document outline order (e.g., do not skip from `h1` to `h4`).
* **Announcements:** When truncation is enabled, ensure the surrounding UI provides a way to read the full copy (tooltip or inline expansion).
* **Icon-only pattern:** Avoid rendering icon-only headings; include visible text or provide supporting SR-only text.

---

## Patterns & Examples

### Auto presets

```tsx
<Heading as="h3">Popular episodes</Heading>
```
- Rely on semantic `as` props to keep heading levels correct for document structure.
- Use the default preset when you want typography that adapts automatically between breakpoints.

### Utility heading

```tsx
<Heading as="h5" size="sm" weight="semi-bold" color="subtle" transform="uppercase" noMargin={false}>
  Recently added
</Heading>
```
- Mix size, weight, color, and casing tokens to build utility headings for utility slots.
- Set `noMargin={false}` when the surrounding layout already manages block spacing.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `f2f9879ab6f780a0972966770e3905b640e3dcf4101737b70263be446ada0c6f`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
