# ScrollerRow
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
ScrollerRow is a lightweight flex container that evenly spaces items across horizontal carousels or promo rails. It simply merges its spacing tokens with any `className` you pass and forwards the rest of the `<div>` props. Use it to align headline + actions above or below scrollers without repeating flex utilities.

---

## Import

### Component
```ts
import { ScrollerRow } from '@doxyz-ui/core/server/ScrollerRow';
```

### Types

```ts
import type { ScrollerRowProps } from '@doxyz-ui/core/server/ScrollerRow';
```

---

## Usage

```tsx
<ScrollerRow>
  <Heading as="h3">Trending shows</Heading>
  <Button variant="secondary">View all</Button>
</ScrollerRow>
```

> - Combine responsive spacing or alignment utilities through `className` while keeping the base flex layout intact.
> - The wrapper is purely structural; focus handling lives in the interactive children inside the row.

---

## Props (Declared + Inherited)

| Prop        | Type     | Default | Required | Notes                                                                |
| ----------- | -------- | ------- | :------: | -------------------------------------------------------------------- |
| `className` | `string` |         |          | Additional utility classes merged with the flex row tokens.          |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **container** — Single flex row `<div>` that renders `children`.

> DOM structure sketch:

```jsx
<div className="flex gap-4 justify-between items-center">
  {children}
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | The component exposes no `data-*` states; consumers can add their own if needed. |

---

## Classes

| Data slot | Classes                                    |
| --------- | ------------------------------------------ |
| `base`    | `flex` `gap-4` `justify-between` `items-center` |

---

## Accessibility

* **Name:** Provide labels/roles on children (e.g., headings, buttons); the container itself is silent.
* **Keyboard:** Non-interactive; ensure interactive children provide proper focus order and spacing.
* **Roles/States:** Add `role="group"` or ARIA attributes to child elements if you need grouped semantics.
* **Announcements:** Keep row content concise so screen readers encounter it naturally in document order.
* **Icon-only pattern:** Manage labels on the icon buttons you place inside; the row does not enforce policies.

---

## Patterns & Examples

### Heading with CTA

```tsx
<ScrollerRow className="py-4">
  <Heading as="h4">Recently added</Heading>
  <TextLink label="See all" href="/recent" variant="subtle" />
</ScrollerRow>
```

### Filter row

```tsx
<ScrollerRow className="gap-6">
  <FilterTabs />
  <Button variant="bare">Manage filters</Button>
</ScrollerRow>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `07eb703a8d5b89c7b87d7768a2e977fb064aaef76766cf50c2a7ddb95bb44ff4`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
