# Footer
*Type: server* |
*Base: div* |
*Last updated: 2025-11-09*

## Overview
Footer is a minimal wrapper that applies the system footer gradient background and forwards every native `<div>` attribute to the root. It is intentionally content-agnostic so product teams can compose navigation links, metadata, or social lists without opinionated layout. Use it any time you need the standard DoXYZ footer backdrop behind custom markup.

---

## Import

### Component
```ts
import { Footer } from '@doxyz-ui/core/server/Footer';
```

### Types

```ts
import type { FooterProps } from '@doxyz-ui/core/server/Footer';
```

---

## Usage

```tsx
<Footer { ...props }>{children}</Footer>
```

> - Wrap whatever navigation or legal content you need inside the gradient shell.
> - Merge spacing/grid utilities via `className` to match the surrounding layout.

---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop        | Type     | Default | Required | Notes                                              |
| ----------- | -------- | ------- | :------: | -------------------------------------------------- |
| `className` | `string` |         |          | Additional utility classes merged with `background-footer`. |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **container** — Single `<div>` root that wraps arbitrary children; no additional slots are defined.

> DOM structure sketch:

```jsx
<div className="background-footer">
  {children}
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | Footer does not expose custom `data-*` flags. |

---

## Classes

| Data slot  | Classes              |
| ---------- | -------------------- |
| `base`     | `background-footer`  |
| `container`| *(none)*             |

---

## Accessibility

* **Name:** Footer does not set roles or labels; provide `role="contentinfo"` or `aria-labelledby` when the content requires it.
* **Keyboard:** Non-interactive wrapper; focus management belongs to child links/buttons.
* **Roles/States:** Add `role="contentinfo"` if the footer is the page-level landmark.
* **Announcements:** Ensure child content exposes its own accessible names and regions.
* **Icon-only pattern:** Not applicable; icons live inside user-provided children.

---

## Patterns & Examples

### Global footer layout

```tsx
<Footer className="py-16 border-t border-color-border-subtle">
  <Grid columns={{ sm: 2, lg: 4 }} gap="xl">
    <FooterColumn title="Product" links={productLinks} />
    <FooterColumn title="Company" links={companyLinks} />
    <FooterColumn title="Support" links={supportLinks} />
    <NewsletterSignup />
  </Grid>
</Footer>
```

### Minimal legal footer

```tsx
<Footer className="py-8 text-sm text-color-content-weak">
  <p>© {new Date().getFullYear()} DoXYZ Labs. All rights reserved.</p>
</Footer>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK** (no variants defined)
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `07eb703a8d5b89c7b87d7768a2e977fb064aaef76766cf50c2a7ddb95bb44ff4`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
