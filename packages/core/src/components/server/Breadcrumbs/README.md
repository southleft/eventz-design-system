# Breadcrumbs
*Type: server* |
*Base: nav* |
*Last updated: 2025-11-09*

## Overview
Breadcrumbs renders a semantic navigation landmark with an ordered list of intermediate TextLinks and a final, non-link label for the current page. It automatically collapses long trails (five or more items) by inserting an ellipsis between the first crumb and the current page to keep the row compact. Use it near page headers to orient visitors within nested sections without cluttering the layout.

---

## Import

### Component
```ts
import { Breadcrumbs } from '@doxyz-ui/core/server/Breadcrumbs';
```

### Types

```ts
import type { BreadcrumbsProps } from '@doxyz-ui/core/server/Breadcrumbs';
```

---

## Usage

```tsx
<Breadcrumbs { ...props } />
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop        | Type                                   |     Default | Required | Notes                                                                                                   |
| ----------- | -------------------------------------- | -----------: | :------: | ------------------------------------------------------------------------------------------------------- |
| `ariaLabel` | `string`                               | `'Breadcrumbs'` |          | Accessible label for the `<nav>` landmark.                                                              |
| `className` | `string`                               |              |          | Additional utility classes merged onto the root `<nav>`.                                                |
| `current`   | `string`                               |              |   Yes    | Current page label rendered as plain text with `aria-current="page"`.                                   |
| `items`     | `Array<{ label: string; href: string }>` |              |   Yes    | Ordered list of intermediate crumbs; when length ≥ 5 the component collapses the middle portion.        |

* **Extends:** `React.ComponentPropsWithoutRef<'nav'>` minus: `children`, `aria-label`
* **Forwards:** All standard HTML attributes for `<nav>` to the root element.

---

## Structure

* **container** — `<nav>` landmark wrapper exposing `aria-label`.
* **list** — Ordered list (`<ol>`) that manages spacing between crumbs.
* **item** — Individual `<li>` entry that wraps a subtle `TextLink`.
* **separator** — `<li>` containing the Chevron icon between items.
* **ellipsis** — `<li>` holding the `MoreHorizIcon` when the trail collapses.
* **current** — `<li>` for the current page text with `aria-current="page"`.

> DOM structure sketch:

```jsx
<nav aria-label={ariaLabel}>
  <ol>
    {visibleItems.map(item => (
      <React.Fragment key={item.href}>
        <li><TextLink {...item} variant="subtle" /></li>
        <li aria-hidden="true"><ChevronRightIcon /></li>
      </React.Fragment>
    ))}
    {shouldCollapse && (
      <>
        <li aria-hidden="true"><MoreHorizIcon /></li>
        <li aria-hidden="true"><ChevronRightIcon /></li>
      </>
    )}
    <li aria-current="page">{current}</li>
  </ol>
</nav>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | Breadcrumbs does not expose runtime `data-*` states; collapsed behavior is determined internally. |

---

## Classes

| Data slot   | Classes                                   |
| ----------- | ----------------------------------------- |
| `container` | *(none – inherits from root `<nav>`)*     |
| `list`      | `flex` `gap-2` `list-none`                |
| `item`      | *(none – styling handled by TextLink)*    |
| `separator` | `shrink-0`                                |
| `ellipsis`  | `shrink-0` `pt-0.25`                      |
| `current`   | `text-sm` `font-bold` `text-color-content-default` |

---

## Accessibility

* **Name:** Provide a descriptive `ariaLabel` (defaults to “Breadcrumbs”) so assistive tech can identify the navigation region.
* **Keyboard:** Links inside the list behave like standard anchors; the current crumb is static text marked with `aria-current="page"`.
* **Roles/States:** The `<nav>` landmark ensures screen readers treat the component as navigational context.
* **Announcements:** When the current page changes dynamically, update the `current` prop and ensure focus moves appropriately in the surrounding UI.
* **Icon-only pattern:** Separators and ellipsis icons are `aria-hidden="true"` so they do not clutter announcements.

---

## Patterns & Examples

### Short hierarchy

```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'News', href: '/news' }
  ]}
  current="Company update"
/>
```
- Keep short trails fully expanded so each link is immediately clickable.
- Supply the `current` label separately so screen readers announce the active page.

### Collapsed trail

```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Shows', href: '/shows' },
    { label: 'Design', href: '/shows/design' },
    { label: 'Interviews', href: '/shows/design/interviews' },
    { label: 'Season 3', href: '/shows/design/interviews/season-3' }
  ]}
  current="Episode 12"
/>
```
- Long trails collapse automatically; confirm the `items` array remains ordered from root to leaf.
- Ensure the truncated labels still make sense when hover tooltips expose the full text.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK** (no variants defined)
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `ce9b3c5daae50da32689abe77bdc0931ffad21d44d1a2deda446d6fc7f91b51d`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
