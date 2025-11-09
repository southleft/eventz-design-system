# ContentCard
*Type: server* |
*Base: div / a (link mode)* |
*Last updated: 2025-11-09*

## Overview
ContentCard displays editorial content with optional media, badge overlays, descriptive copy, and inline metadata labels. It supports three compositions—vertical, horizontal, and post—and can turn into a link when `href` is provided, adding a decorative arrow inside the title while preserving focus management. Use it for featured stories, channel promos, or any content-first tile where actions live elsewhere.

---

## Import

### Component
```ts
import { ContentCard } from '@doxyz-ui/core/server/ContentCard';
```

### Types

```ts
import type { ContentCardProps } from '@doxyz-ui/core/server/ContentCard';
```

---

## Usage

```tsx
<ContentCard { ...props } />
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop        | Type                                                        |   Default | Required | Notes                                                                                                                                      |
| ----------- | ----------------------------------------------------------- | --------: | :------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `ariaLabel` | `string`                                                    |           |          | Accessible name override used only when the card is focusable or rendered as a link.                                                       |
| `badge`     | `string`                                                    |           |          | Small badge rendered over the media when both badge text and media exist.                                                                  |
| `className` | `string`                                                    |           |          | Additional utility classes merged with the base layout tokens.                                                                            |
| `description` | `string`                                                  |           |          | Optional supporting copy below the title.                                                                                                  |
| `focusable` | `boolean`                                                  | `false`   |          | Enables keyboard focus/role on the `<div>` root when not linking.                                                                          |
| `href`      | `string`                                                    |           |          | Non-empty value turns the base into an `<a>` and shows the forward arrow inside the title.                                                 |
| `imgAlt`    | `string`                                                    |           |          | Required when `imgSrc` is provided; supply `''` for decorative imagery.                                                                    |
| `imgSrc`    | `string`                                                    |           |          | Media URL for the preview image.                                                                                                           |
| `labels`    | `ReadonlyArray<{ icon?: React.ReactNode; label: string }>`  |           |          | Meta badges rendered in the `meta` slot; omit or pass an empty array to hide the section.                                                  |
| `layout`    | `'vertical' \| 'horizontal' \| 'post'`                       | `'vertical'` |          | Chooses the layout tokens that control width, grid/flex behavior, and media sizing.                                                       |
| `subtitle`  | `string`                                                    |           |          | Optional line displayed above the title.                                                                                                   |
| `title`     | `string`                                                    |           |   Yes    | Required heading displayed in the `title` slot and used as the accessible name unless `ariaLabel` overrides it.                            |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`, `title`; plus `Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target', 'rel', 'download', 'hrefLang', 'ping', 'referrerPolicy'>`
* **Forwards:** All standard HTML attributes for `<div>` plus the listed anchor attributes (applied when `href` is set).

---

## Structure

* **base** — `<div>` or `<a>` wrapper that owns variants, focus state, and aria-label application.
* **media** — Optional container holding the `<img>` preview.
* **badge** — Absolutely positioned overlay within media.
* **subtitle** — Optional supporting text above the title.
* **title** — Heading line with optional **titleIcon** span (arrow) when linking.
* **description** — Optional paragraph-level copy.
* **meta** — Row of inline **metaItem** badges; each entry can contain a decorative **metaIcon**.

> DOM structure sketch:

```jsx
const Wrapper = href ? 'a' : 'div';
<Wrapper data-slot="base" data-is-focusable={focusable || href ? 'true' : undefined}>
  {imgSrc && (
    <div data-slot="media">
      <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
      {badge && <div data-slot="badge"><Badge variant="brand" label={badge} /></div>}
    </div>
  )}
  {subtitle && <div data-slot="subtitle">{subtitle}</div>}
  <div data-slot="title">
    <span>{title}</span>
    {href && (
      <span data-slot="titleIcon" aria-hidden="true">
        <ArrowForwardIcon />
      </span>
    )}
  </div>
  {description && <div data-slot="description">{description}</div>}
  {labels?.length ? (
    <div data-slot="meta">
      {labels.map(({ icon, label }) => (
        <span key={label} data-slot="metaItem">
          {icon && <span data-slot="metaIcon" aria-hidden="true">{icon}</span>}
          <span>{label}</span>
        </span>
      ))}
    </div>
  ) : null}
</Wrapper>
```

---

## Data Attributes & States

| State flag              | Effect                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| `data-[is-focusable=true]` | Enables the focus ring tokens so the card shows the design-system outline when it can receive keyboard focus. |

---

## Classes

| Data slot   | Classes                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`      | `outline-none` `rounded-md` `border-0` `group` `bg-background-none` `hover:bg-color-background-default` `data-[is-focusable=true]:focus-visible:ring-2` `data-[is-focusable=true]:focus-visible:ring-offset-2` `data-[is-focusable=true]:focus-visible:ring-comp-border-focus-ring` `data-[is-focusable=true]:focus-visible:ring-offset-color-background-default` plus layout variant tokens (`vertical`, `horizontal`, `post`). |
| `media`     | `relative` `overflow-hidden` `rounded-sm` `border-0` `[&>img]:object-cover` `[&>img]:group-hover:opacity-30` with layout-specific width/height utilities.                      |
| `badge`     | `absolute` `top-2` `left-2`                                                                                                                                                    |
| `subtitle`  | `text-xs` `text-color-content-subtle` `group-hover:text-color-content-subtle-hover`                                                                                           |
| `title`     | `inline-flex` `justify-between` `items-center` `w-full` `text-color-content-default` `group-hover:text-color-content-default-hover` `text-base` `sm:text-lg`                   |
| `titleIcon` | `ml-1` `shrink-0` `[&>svg]:size-[20px]` `invisible` `group-hover:visible` `group-hover:text-color-content-brand`                                                               |
| `description` | `text-color-content-weak` `group-hover:text-color-content-weak-hover` `text-sm`                                                                                            |
| `meta`      | `mt-2` `flex` `flex-wrap` `gap-2` `items-center`                                                                                                                               |
| `metaItem`  | `inline-flex` `items-center` `gap-1` `text-xs` `text-color-content-subtle` `group-hover:text-color-content-subtle-hover`                                                       |
| `metaIcon`  | `shrink-0` `[&>svg]:size-3`                                                                                                                                                    |

---

## Accessibility

* **Name:** The visible `title` doubles as the accessible name; provide `ariaLabel` only for focusable/link modes when the text cannot be spoken verbatim.
* **Keyboard:** When `href` is set, the card behaves like a standard link. Otherwise enable `focusable` so the `<div>` receives `tabIndex={0}` and `role="group"` for keyboard users.
* **Roles/States:** Link mode relies on anchor semantics; focusable div mode sets `role="group"` to announce the title/desc cluster.
* **Announcements:** Ensure `imgAlt` accurately reflects the media content; use `''` for decorative art. Metadata badges remain visible text and do not require extra aria hooks.
* **Icon-only pattern:** Decorative icons inside the title arrow and meta badges are `aria-hidden="true"` so they do not clutter announcements.

---

## Patterns & Examples

### Vertical promo card

```tsx
<ContentCard
  title="Research Drop"
  subtitle="New report"
  imgSrc="/images/report.jpg"
  imgAlt="Report cover"
  labels={[{ label: '11 min read' }]}
/>
```
- Use the default vertical layout when you want stacked media with metadata chips underneath.
- Keep `labels` concise; one or two tokens prevents crowding beneath the description.

### Linked horizontal story

```tsx
<ContentCard
  layout="horizontal"
  title="Studio Visit"
  description="A peek into DoXYZ's process."
  imgSrc="/images/studio.jpg"
  imgAlt="Studio interior"
  href="/stories/studio-visit"
  labels={[
    { icon: <GlobeIcon />, label: 'EN' },
    { icon: <ClockIcon />, label: '6 min' }
  ]}
/>
```
- Provide `href` to enable the built-in anchor styling and arrow indicator for linkable cards.
- Mix icon-backed labels to communicate locale and duration at a glance.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `535d58368c70d3fd57a9625081213f77dd18f68d7ec81df92a0ae4bafa6cf60d`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
