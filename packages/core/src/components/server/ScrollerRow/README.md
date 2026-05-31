# ScrollerRow
*Type: server* |
*Base: div* |
*Last updated: 2025-11-09*

## Overview
ScrollerRow is a lightweight flex container that evenly spaces items across horizontal carousels or promo rails. It simply merges its spacing tokens with any `className` you pass and forwards the rest of the `<div>` props. Use it to align headline + actions above or below scrollers without repeating flex utilities.

---

## Import

### Component
```ts
import { ScrollerRow } from '@eventz-ui/core/server/ScrollerRow';
```

### Types

```ts
import type { ScrollerRowProps } from '@eventz-ui/core/server/ScrollerRow';
```

---

## Usage

```tsx
<ScrollerRow { ...props }>{children}</ScrollerRow>
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

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
- Wrap headings and CTA links to keep scroller titles and jump links aligned on the same baseline.
- Add vertical padding via `className` so the row spacing matches the adjacent carousel.

### Filter row

```tsx
<ScrollerRow className="gap-6">
  <FilterTabs />
  <Button variant="bare">Manage filters</Button>
</ScrollerRow>
```
- Increase the `gap` when combining compact filters with secondary actions.
- Use bare buttons to introduce tertiary actions without overpowering the filter controls.

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
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
