# InteractiveListItem
*Type: server* |
*Base: button / anchor* |
*Last updated: 2025-11-09*

## Overview
InteractiveListItem renders a one-line row that behaves like either a button (default) or a link when `href` is provided. It supports optional avatar thumbnails, supporting and highlight text, and a removable state that swaps the trailing affordance to a cancel icon. Use it for compact lists such as saved shows, connected accounts, or device rows where each item triggers navigation or removal.

---

## Import

### Component
```ts
import { InteractiveListItem } from '@doxyz-ui/core/server/InteractiveListItem';
```

### Types

```ts
import type { InteractiveListItemProps } from '@doxyz-ui/core/server/InteractiveListItem';
```

---

## Usage

```tsx
<InteractiveListItem { ...props } />
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop            | Type       |   Default | Required | Notes                                                                                           |
| --------------- | ---------- | --------: | :------: | ----------------------------------------------------------------------------------------------- |
| `borderBottom`  | `boolean`  | `true`    |          | Adds the subtle divider beneath the row using `data-border-bottom`.                             |
| `className`     | `string`   |           |          | Additional utility classes merged after the base tokens.                                        |
| `highlightText` | `string`   |           |          | Optional emphasized line shown below `supportingText` when `isRemovable` is false.              |
| `href`          | `string`   |           |          | When provided, the component renders an `<a>` element and forwards anchor-only attributes.       |
| `imgAlt`        | `string`   |           |          | Required when `imgSrc` is set; use `''` if the avatar is purely decorative.                     |
| `imgSrc`        | `string`   |           |          | Thumbnail image displayed only when `isRemovable` is true.                                      |
| `isRemovable`   | `boolean`  | `false`   |          | Switches the layout to include the thumbnail and cancel icon.                                   |
| `supportingText`| `string`   |           |          | Optional secondary line shown when `isRemovable` is false.                                      |
| `title`         | `string`   |           |   Yes    | Primary line of text; trimmed before render.                                                    |

* **Extends:** `React.ButtonHTMLAttributes<HTMLButtonElement>` (minus `type`) and `React.AnchorHTMLAttributes<HTMLAnchorElement>` (minus `type`) via overloads
* **Forwards:** All standard button or anchor attributes plus `className`.

---

## Structure

* **base** — Button or anchor root with border/focus tokens controlled via data attributes.
* **container** — Flex row containing optional avatar image and text stack.
* **image** — Rounded thumbnail shown when `isRemovable` is true; renders `<img>` or placeholder block.
* **nonRemovableWrapper** — Column stack that houses the `title`, `supportingText`, and `highlightText` spans.
* **trailingIcon** — Chevron or cancel icon depending on `isRemovable`.

> DOM structure sketch:

```jsx
const Component = href ? 'a' : 'button';
<Component
  data-is-removable={isRemovable ? 'true' : undefined}
  data-border-bottom={borderBottom ? 'true' : undefined}
>
  <span data-slot="container">
    {isRemovable && (
      imgSrc ? <img data-slot="image" src={imgSrc} alt={imgAlt ?? ''} /> : <span data-slot="image" aria-hidden="true" />
    )}
    <span data-slot="nonRemovableWrapper">
      <span data-slot="title">{title}</span>
      {!isRemovable && supportingText && <span data-slot="supportingText">{supportingText}</span>}
      {!isRemovable && highlightText && <span data-slot="highlightText">{highlightText}</span>}
    </span>
  </span>
  <span data-slot="trailingIcon">
    {isRemovable ? <CancelIcon aria-hidden="true" /> : <ChevronRightIcon aria-hidden="true" />}
  </span>
</Component>
```

---

## Data Attributes & States

| State flag                 | Effect                                                                                      |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| `data-[is-removable=true]` | Aligns content center vertically and swaps the trailing affordance to the cancel icon.       |
| `data-[border-bottom=true]`| Adds the subtle divider using design-system border tokens.                                   |

---

## Classes

| Data slot             | Classes                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`                | `group` `flex` `justify-between` `data-[is-removable=true]:items-center` `gap-8` `w-full` `outline-none` `pb-10` `pl-8` `pt-8` `pr-8` `bg-background-none` `no-underline` `border-l-0` `border-r-0` `border-b-0` `border-t-0` `focus-visible:ring-2` `focus-visible:ring-offset-4` `focus-visible:ring-comp-border-focus-ring` `focus-visible:ring-offset-color-background-default` `data-[border-bottom=true]:border-b` `data-[border-bottom=true]:border-b-color-border-subtle` |
| `container`           | `flex` `items-center` `gap-8` `w-full`                                                                                                      |
| `image`               | `h-40` `w-40` `rounded-full` `bg-color-background-brand` `shrink-0`                                                                         |
| `nonRemovableWrapper` | `flex` `flex-col` `min-w-0` `flex-1`                                                                                                        |
| `title`               | `text-base` `lg:text-lg` `font-bold` `text-left` `truncate` `whitespace-nowrap` `text-color-content-default` `group-hover:text-color-content-default-hover` |
| `supportingText`      | `text-sm` `text-left` `truncate` `whitespace-nowrap` `text-color-content-weak`                                                              |
| `highlightText`       | `text-sm` `text-left` `truncate` `whitespace-nowrap` `text-color-content-brand`                                                             |
| `trailingIcon`        | `shrink-0` `text-color-content-default` `h-20` `w-20`                                                                                       |

---

## Accessibility

* **Name:** The `title` text supplies the accessible name; ensure supporting/highlight text provides extra context but avoid duplicating it in `aria-label`.
* **Keyboard:** Button mode respects `onClick`/`onKeyDown`; link mode relies on anchor semantics. The trailing icon stays decorative (`aria-hidden="true"`).
* **Roles/States:** Additional roles are unnecessary; rely on button/link semantics as appropriate.
* **Announcements:** Provide `imgAlt` when the removable avatar conveys meaning; use `''` if it is purely decorative.
* **Icon-only pattern:** When `isRemovable` is true, you may set `aria-label` on the button/link to clarify that removing the row requires another step.

---

## Patterns & Examples

### Navigation row

```tsx
<InteractiveListItem
  title="Notifications"
  supportingText="Push, email, SMS"
  href="/settings/notifications"
/>
```
- Provide an `href` to get anchor semantics when the item routes to a detail page.
- Use `supportingText` for short descriptions that help disambiguate similar rows.

### Removable saved show

```tsx
<InteractiveListItem
  title="Night Shift"
  imgSrc="/art/night-shift.jpg"
  imgAlt="Night Shift cover art"
  isRemovable
  onClick={() => console.log('Remove series')}
/>
```
- Toggle `isRemovable` to surface the trailing remove affordance for saved content.
- Pair `imgSrc`/`imgAlt` with the title when the row represents media or playlists.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `986d38b1007a0713a7c95b8b5a4256b4e6bb8e1cbe1309406b6090e43b17c072`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
