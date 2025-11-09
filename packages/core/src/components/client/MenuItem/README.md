# MenuItem
*Type: client* | *Base: button / anchor* | *Last updated: 2025-11-08*

## Overview
MenuItem is the internal row used by dropdown menus, selects, and comboboxes. It supports a `simple` layout (icon + label) and a `complex` layout (media thumbnail + supporting text), surfaces selection state, and can render as either a `<button>` or `<a>` depending on `href`. Use it whenever you need listbox-style options that share the system’s spacing and selection tokens.

---

## Import

### Component
```ts
import { MenuItem } from '@doxyz-ui/core/client/MenuItem';
```

### Types

```ts
import type { MenuItemProps } from '@doxyz-ui/core/client/MenuItem';
```

---

## Usage

```tsx
<MenuItem
  type="complex"
  option="Growth team"
  supportingText="8 members • Active"
  imgSrc="https://picsum.photos/80"
  isSelected={value === 'growth'}
  onClick={() => setValue('growth')}
/>
```

- Pass `href` to render as an anchor while keeping the same spacing and aria attributes.
- Use `isSelected` to show the checkmark icon and highlight the option.

---

## Props (Declared + Inherited)

| Prop             | Type                           | Default | Required | Notes |
| ---------------- | ------------------------------ | ------: | :------: | ----- |
| `ariaLabel`      | `string`                       |         |          | Accessible name when the visible text (`option`) is missing or purely visual.
| `borderBottom`   | `boolean`                      |    `true` |          | Renders the subtle divider under the item when true.
| `className`      | `string`                       |         |          | Appends utility classes to the root button/anchor.
| `href`           | `string`                       |         |          | When set, MenuItem renders as `<a>` and forwards anchor attributes; `aria-disabled` is used instead of `disabled`.
| `imgAlt`         | `string`                       |         |          | Alt text for the complex image thumbnail; falls back to `option` → `ariaLabel` if omitted.
| `imgSrc`         | `string`                       |         |          | URL for the complex media thumbnail; when missing, the component renders a placeholder or `mediaIcon`.
| `isSelected`     | `boolean`                      |   `false` |          | Controls selected styling and reveals the trailing check icon.
| `mediaIcon`      | `React.ReactNode`              |         |          | Icon rendered inside the media thumbnail slot when no `imgSrc` is provided.
| `option`         | `string`                       |         |          | Visible label text; also used as the fallback accessible name.
| `startIcon`      | `React.ReactNode`              |         |          | Leading icon for `type="simple"`.
| `supportingText` | `string`                       |         |          | Secondary text line shown only for `type="complex"`.
| `type`           | `'simple' \| 'complex'`        | `'simple'` |        | Chooses between the icon + label layout and the media + supporting text layout.

* **Extends:** `React.ButtonHTMLAttributes<HTMLButtonElement>` minus `type` (when `href` is undefined); `React.AnchorHTMLAttributes<HTMLAnchorElement>` (when `href` is provided). Standard button/link attributes (`onClick`, `target`, etc.) forward automatically.
* **Forwards:** All remaining button/anchor props spread onto the rendered element.

---

## Structure

* **root** — `<button type="button">` by default, or `<a>` when `href` exists; hosts `data-is-selected` and `data-border-bottom` for styling.
* **startIcon** — Optional icon shown for simple items.
* **media/mediaIcon** — Complex thumbnail slot that renders an `<img>`, icon, or placeholder.
* **option** — Primary label text.
* **selectedIcon** — Internal `CheckIcon` that becomes visible when `isSelected` is true.
* **supportingText** — Secondary line for complex items.

> DOM structure sketch:

```jsx
<button data-is-selected={isSelected} data-border-bottom={borderBottom} aria-label={ariaLabel}>
  {type === 'simple' ? (
    <>
      {startIcon && <span data-slot="startIcon" aria-hidden="true">{startIcon}</span>}
      <span data-slot="option">{option}</span>
      <CheckIcon data-slot="selectedIcon" aria-hidden="true" />
    </>
  ) : (
    <>
      {imgSrc ? (
        <img data-slot="media" src={imgSrc} alt={imgAlt ?? option ?? ariaLabel} />
      ) : mediaIcon ? (
        <span data-slot="mediaIcon" aria-hidden="true">{mediaIcon}</span>
      ) : (
        <span data-slot="media" data-is-placeholder="true" aria-hidden="true" />
      )}
      <span data-slot="complexSelectedWrapper">
        <span data-slot="primaryRow">
          <span data-slot="option">{option}</span>
          <CheckIcon data-slot="selectedIcon" aria-hidden="true" />
        </span>
        {supportingText && <span data-slot="supportingText">{supportingText}</span>}
      </span>
    </>
  )}
</button>
```

---

## Data Attributes & States

| State flag                  | Effect |
| --------------------------- | ------ |
| `data-is-selected="true"`  | Tints the label/leading icon with brand colors and reveals the trailing check icon.
| `data-border-bottom="true"`| Draws the subtle divider under the row.

---

## Classes

| Data slot                | Classes |
| ------------------------ | ------- |
| `root`                   | `group flex flex-nowrap items-center gap-8 bg-background-none border-l-0 border-r-0 border-b-0 border-t-0 pb-10 pl-8 pt-8 pr-8 outline-none [&:focus-visible:not(:hover)]:ring-2 [&:focus-visible:not(:hover)]:ring-offset-4 [&:focus-visible:not(:hover)]:ring-comp-border-focus-ring [&:focus-visible:not(:hover)]:ring-offset-color-background-default data-[border-bottom=true]:border-b data-[border-bottom=true]:border-color-border-subtle` |
| `startIcon`              | `shrink-0 text-color-content-default group-hover:text-color-content-default-hover group-data-[is-selected=true]:text-color-content-brand h-20 w-20` |
| `option`                 | `text-sm flex-grow text-color-content-default group-hover:text-color-content-default-hover group-data-[highlighted]:text-color-content-default-hover group-data-[is-selected=true]:text-color-content-brand text-left` |
| `supportingText`         | `text-color-content-weak group-hover:text-color-content-weak-hover text-left` |
| `media`                  | `h-40 w-40 rounded-sm object-cover group-hover:opacity-75 data-[is-placeholder=true]:bg-color-background-brand` |
| `mediaIcon`              | `h-40 w-40 rounded-sm object-cover group-hover:opacity-75 text-color-content-brand group-hover:text-color-content-brand-hover bg-color-background-weak group-hover:bg-color-background-weak-hover flex items-center justify-center` |
| `complexSelectedWrapper` | `flex flex-col flex-grow gap-1` |
| `primaryRow`             | `flex items-center justify-between gap-8` |
| `selectedIcon`           | `_selectedIcon hidden shrink-0 text-color-content-brand group-data-[is-selected=true]:inline-flex` |

---

## Accessibility

* **Name:** Provide `option` for visible text; when rendering icon-only content, set `ariaLabel` so the button/anchor still has an accessible label.
* **Keyboard:** Buttons respond to Space/Enter; anchors support Enter + standard link behavior. Focus rings appear only when the user tabs onto the item.
* **Roles/States:** The component does not assign ARIA roles; parent menus/selects control active state via `aria-activedescendant` or roving focus. Use `isSelected` purely for visuals.
* **Announcements:** For anchor variants, `aria-disabled` mirrors the `disabled` prop; screen readers announce “link, unavailable.”
* **Icon-only pattern:** Keep `ariaLabel` descriptive (“Marketing team”) when the option string is blank or purely decorative.

---

## Patterns & Examples

### Simple option with icon

```tsx
<MenuItem
  startIcon={<TagIcon />}
  option="Marketing"
  isSelected={value === 'marketing'}
  onClick={() => setValue('marketing')}
/>
```

- Use simple layout for short, text-only options.
- `startIcon` is optional; omit it for plain text rows.

### Complex option with media

```tsx
<MenuItem
  type="complex"
  option="Design team"
  supportingText="6 members"
  imgSrc="https://picsum.photos/80?team=design"
/>
```

- Provide `imgAlt` if the thumbnail conveys meaning beyond the label.
- When no image is available, pass `mediaIcon` to keep the layout balanced.

### Anchor variant

```tsx
<MenuItem
  option="View details"
  href="/teams/growth"
  ariaLabel="View details for Growth team"
/>
```

- Anchor stories still support `isSelected` and the divider toggle.
- Use `aria-disabled` (set `disabled` prop) when the destination shouldn’t be clickable yet.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `e0badaa35a7c7001700986bf8ce1531c6b719e9d66827688a0e902c6f7ac06f8`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
