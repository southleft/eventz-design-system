# NavigationContainer
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
NavigationContainer is a simple layout wrapper that applies consistent padding and neutral background tokens around navigation sections. Use it to give NavigationBar, footer navs, or any grouped links equal breathing room without repeating spacing utilities across pages.

---

## Import

### Component
```ts
import { NavigationContainer } from '@doxyz-ui/core/server/NavigationContainer';
```

### Types

```ts
import type { NavigationContainerProps } from '@doxyz-ui/core/server/NavigationContainer';
```

---

## Usage

```tsx
<NavigationContainer>
  <NavigationBar ariaLabel="Primary" items={items} />
</NavigationContainer>
```

> - Wrap any navigation clusters to align them with the page grid; combine with `className` when you need extra borders or background treatments.
> - The wrapper is purely structural—child content defines semantics (`nav`, `ul`, etc.).

---

## Props (Declared + Inherited)

| Prop        | Type     | Default | Required | Notes                                                                 |
| ----------- | -------- | ------- | :------: | --------------------------------------------------------------------- |
| `className` | `string` |         |          | Additional utility classes merged after the navigation padding tokens. |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **container** — Single `<div>` that forwards every prop and renders `children`.

> DOM structure sketch:

```jsx
<div className="px-16 lg:px-112 py-24 lg:py-56 bg-background-none">
  {children}
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | NavigationContainer does not expose custom `data-*` states. |

---

## Classes

| Data slot  | Classes                                       |
| ---------- | --------------------------------------------- |
| `base`     | `px-16` `lg:px-112` `py-24` `lg:py-56` `bg-background-none` |
| `container`| *(none)*                                      |

---

## Accessibility

* **Name:** The wrapper does not add roles or landmarks; provide them within the child navigation components.
* **Keyboard:** Non-interactive; focus belongs to nested navigation items.
* **Roles/States:** Add structural roles (e.g., `role="navigation"`) to child components instead of this wrapper.
* **Announcements:** Ensure any sticky/fixed nav inside also announces its boundaries, since this wrapper is invisible to screen readers.
* **Icon-only pattern:** Not applicable; icons live in child content.

---

## Patterns & Examples

### Paired with NavigationBar

```tsx
<NavigationContainer className="border-b border-color-border-subtle">
  <NavigationBar ariaLabel="Global" items={items} />
</NavigationContainer>
```

### Footer navigation

```tsx
<NavigationContainer className="bg-color-background-inverse">
  <FooterNav />
</NavigationContainer>
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
