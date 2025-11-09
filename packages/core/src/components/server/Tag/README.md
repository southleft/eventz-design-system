# Tag
*Type: server* |
*Base: span / button (interactive)* |
*Last updated: 2025-11-08*

## Overview
Tag renders pill-style labels that can be either decorative (`isInteractive=false`) or clickable (`isInteractive=true`). It supports `parent` and `child` variants plus an `isActive` flag that adjusts colors. Use it for taxonomy controls, filters, and chip-like metadata where you need server-rendered markup with flexible interactivity.

---

## Import

### Component
```ts
import { Tag } from '@doxyz-ui/core/server/Tag';
```

### Types

```ts
import type { TagProps } from '@doxyz-ui/core/server/Tag';
```

---

## Usage

```tsx
<Tag { ...props } />
```

> - Enable `isInteractive` when the tag needs to behave like a button; otherwise it renders a plain `<span>`.
> - Let the `label` text supply the accessible name unless you must disambiguate identical visuals.

---

## Props (Declared + Inherited)

| Prop           | Type                        | Default   | Required | Notes                                                                                         |
| -------------- | --------------------------- | --------- | :------: | --------------------------------------------------------------------------------------------- |
| `className`    | `string`                    |           |          | Additional utility classes appended to the pill tokens.                                       |
| `isActive`     | `boolean`                   | `false`   |          | Applies active colors and data states.                                                        |
| `isInteractive`| `boolean`                   | `false`   |          | When true, renders a `<button>` and enables pointer/focus affordances.                        |
| `label`        | `string`                    |           |   Yes    | Visible text; also supplies the accessible name.                                              |
| `variant`      | `'parent' \| 'child'`       | `'parent'`|          | Chooses the interactive color scheme; ignored when `isInteractive` is false (always parent). |

* **Extends:** `React.ButtonHTMLAttributes<HTMLButtonElement>` when `isInteractive` is true (minus `children`), otherwise `React.HTMLAttributes<HTMLSpanElement>`
* **Forwards:** All standard attributes for the rendered element (button or span).

---

## Structure

* **base** — Either `<button>` or `<span>` depending on `isInteractive`. No nested slots; `label` renders as raw text.

> DOM structure sketch:

```jsx
const Comp = isInteractive ? 'button' : 'span';
<Comp
  type={isInteractive ? 'button' : undefined}
  data-interactive={isInteractive ? 'true' : 'false'}
  data-active={isActive ? 'true' : undefined}
>
  {label.trim()}
</Comp>
```

---

## Data Attributes & States

| State flag                 | Effect                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `data-[interactive=true]`  | Enables rounded-md styling, focus rings, pointer cursor, and variant-specific hover/active colors. |
| `data-[active=true]`       | Applies active background/text tokens for the current variant.                                   |

---

## Classes

| Data slot | Classes                                                                                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `base`    | `inline-block` `text-sm` `border-none` `focus:outline-none` `text-color-content-default` `data-[interactive=false]:rounded-full` `data-[interactive=false]:bg-comp-button-color-background-default` `data-[interactive=true]:select-none` `data-[interactive=true]:rounded-md` `data-[interactive=true]:focus-visible:ring-2` `data-[interactive=true]:focus-visible:ring-comp-border-focus-ring` `data-[interactive=true]:focus-visible:ring-offset-4` `data-[interactive=true]:focus-visible:ring-offset-color-background-default` `whitespace-nowrap` `pt-2` `pb-2` `px-4` plus variant tokens for `parent`/`child` and state tokens `data-[interactive=true]:cursor-pointer`, `data-[interactive=false]:cursor-default`, `data-[interactive=false]:bg-comp-tag-parent-color-background-default`, `data-[interactive=false]:text-comp-tag-parent-color-foreground-default`, etc. |

---

## Accessibility

* **Name:** The `label` text is the accessible name; do not override with `aria-label` unless necessary.
* **Keyboard:** Interactive tags behave like buttons; ensure you pass `onClick`/`onKeyDown` handlers when they toggle state.
* **Roles/States:** `aria-pressed` is not applied automatically—set it yourself if the tag represents a toggle button.
* **Announcements:** Keep labels short to avoid repetitive announcements when tags are used in sets or filter groups.
* **Icon-only pattern:** Not supported; tags always render text content.

---

## Patterns & Examples

### Parent tag filter

```tsx
<Tag
  variant="parent"
  label="Work"
  isInteractive
  isActive={selected === 'work'}
  onClick={() => toggle('work')}
/>
```

### Static metadata tag

```tsx
<Tag label="Featured" isInteractive={false} />
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `c79280c7a796e4ecd17814f1373dc16500a03c81494051bad9d894baf66b320e`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
