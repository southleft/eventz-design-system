# Chip
*Type: server* |
*Base: span* |
*Last updated: 2025-11-08*

## Overview
Chip renders a lightweight inline label with an optional decorative icon, making it ideal for metadata such as episode length, availability tags, or category indicators. It is purely presentational: color and emphasis inherit from the parent container, and the component never becomes interactive on its own. Use it wherever you need compact text that stays aligned with surrounding inline content.

---

## Import

### Component
```ts
import { Chip } from '@doxyz-ui/core/server/Chip';
```

### Types

```ts
import type { ChipProps } from '@doxyz-ui/core/server/Chip';
```

---

## Usage

```tsx
<Chip { ...props } />
```

> - Let the visible `label` supply the accessible name; only pass `ariaLabel` when additional context is required.
> - Treat `icon` as decorative (`aria-hidden="true"`) so the chip remains concise.

---

## Props (Declared + Inherited)

Chip does not forward arbitrary DOM props, so every prop is listed explicitly below.

| Prop        | Type               | Default | Required | Notes                                                                |
| ----------- | ------------------ | ------- | :------: | -------------------------------------------------------------------- |
| `ariaLabel` | `string`           |         |          | Overrides the accessible name when it must differ from the visible label. |
| `className` | `string`           |         |          | Additional utility classes merged with the base inline-flex layout.  |
| `icon`      | `React.ReactNode`  |         |          | Optional decorative node rendered before the text.                   |
| `label`     | `string`           |         |   Yes    | Required text content displayed in the Chip.                         |

* **Extends:** *(none)*
* **Forwards:** Only the props above are supported; additional HTML attributes are not forwarded.

---

## Structure

* **base** — `<span>` wrapper that manages inline layout and optional aria-label override.
* **_icon** — Nested `<span>` that hosts the decorative icon when provided.
* **_text** — Nested `<span>` that renders and truncates the label.

> DOM structure sketch:

```jsx
<span aria-label={ariaLabel ?? label}>
  {icon && <span aria-hidden="true">{icon}</span>}
  <span>{label}</span>
</span>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | Chip does not expose public `data-*` states; styling is static. |

---

## Classes

| Data slot | Classes                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `base`    | `inline-flex` `items-start` `gap-1` `text-color-content-weak` `bg-background-none` |
| `_icon`   | `shrink-0`                                                              |
| `_text`   | `truncate`                                                              |

---

## Accessibility

* **Name:** The `label` text supplies the accessible name; provide `ariaLabel` only when the spoken name must differ.
* **Keyboard:** Non-interactive; do not make it focusable.
* **Roles/States:** Remains a plain `<span>`; set a role only if required contextually.
* **Announcements:** Because icons are hidden from assistive tech, ensure the label fully describes the metadata.
* **Icon-only pattern:** Avoid rendering icon-only chips; supply text or `ariaLabel` if you must present an icon-only chip for visual reasons.

---

## Patterns & Examples

### Metadata chips

```tsx
<Chip icon={<ClockIcon />} label="45 min" />
<Chip icon={<GlobeIcon />} label="EN" />
```

### Neutral inline tags

```tsx
<Chip className="text-color-content-default" label="Editorial" />
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK** (no variants defined)
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `71d37b09921b9b25bbbac70a7ef789dafa5dc97565c6120fcac45cb6f6b8019b`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
