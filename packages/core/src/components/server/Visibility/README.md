# Visibility
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
Visibility is a utility wrapper that toggles its children between Tailwind breakpoints using `visible`/`invisible` utilities. Supply `from` to start showing content at a breakpoint, `to` to stop showing at a breakpoint, or both to create windows. Semantics remain unchanged—the wrapper only manipulates CSS visibility.

---

## Import

### Component
```ts
import { Visibility } from '@doxyz-ui/core/server/Visibility';
```

### Types

```ts
import type { VisibilityProps } from '@doxyz-ui/core/server/Visibility';
```

---

## Usage

```tsx
<Visibility { ...props }>{children}</Visibility>
```

> - Use `from` and `to` to control the visibility window, defaulting to `visible` when neither is provided.
> - Because it only toggles CSS visibility, ensure focusable children are also managed (e.g., via `inert` or conditional rendering) if needed.

---

## Props (Declared + Inherited)

| Prop        | Type                           | Default | Required | Notes                                                                                     |
| ----------- | ------------------------------ | ------- | :------: | ----------------------------------------------------------------------------------------- |
| `className` | `string`                       |         |          | Additional utility classes appended to the wrapper.                                       |
| `from`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` |         |          | Breakpoint where the content becomes `visible`. Start hidden when only `from` is provided. |
| `to`        | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` |         |          | Breakpoint where the content becomes `invisible`. Stay visible until this breakpoint.      |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **container** — Plain `<div>` that toggles visibility classes and renders `children`.

> DOM structure sketch:

```jsx
<div className="invisible lg:visible xl:invisible">
  {children}
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | Visibility relies on hard-coded utility classes rather than data attributes. |

---

## Classes

| Data slot | Classes / Tokens                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| `base`    | Baseline `visible`/`invisible` plus breakpoint utilities such as `sm:visible`, `md:visible`, `xl:invisible`, etc., depending on `from`/`to`. |

---

## Accessibility

* **Name:** The wrapper does not add roles or labels; semantics are inherited from the children.
* **Keyboard:** Hidden content remains in the tab order unless you wrap it with additional logic (e.g., `aria-hidden`, `inert`). Use this component only when CSS visibility is sufficient.
* **Roles/States:** To fully remove interactive content from assistive tech, combine Visibility with conditional rendering or `inert`.
* **Announcements:** If you dynamically change visibility, ensure any notifications happen elsewhere (e.g., via `aria-live`).
* **Icon-only pattern:** Not applicable; children define their own accessibility semantics.

---

## Patterns & Examples

### Desktop-only nav

```tsx
<Visibility from="lg">
  <DesktopNavigation />
</Visibility>
```

### Mobile-only helper

```tsx
<Visibility to="md">
  <Text size="sm" color="weak">Swipe to explore more content.</Text>
</Visibility>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `62b662eac7f4e0fe0dbe9d5bf2664f5fda1c696411882f2842e2be65bb206537`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
