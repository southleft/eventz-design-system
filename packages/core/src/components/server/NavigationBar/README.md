# NavigationBar
*Type: server* |
*Base: nav* |
*Last updated: 2025-11-09*

## Overview
NavigationBar renders the site-wide primary navigation shell with slots for a logo, tagline, primary link list, optional mobile trigger, and right-aligned secondary actions. It supports fixed positioning and a wrapped layout for stacked content. Use it as the top-level chrome for marketing or app surfaces where the navigation landmarks must remain server-rendered.

---

## Import

### Component
```ts
import { NavigationBar } from '@doxyz-ui/core/server/NavigationBar';
```

### Types

```ts
import type { NavigationBarProps } from '@doxyz-ui/core/server/NavigationBar';
```

---

## Usage

```tsx
<NavigationBar { ...props } />
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop                 | Type                                                               | Default | Required | Notes                                                                                     |
| -------------------- | ------------------------------------------------------------------ | ------- | :------: | ----------------------------------------------------------------------------------------- |
| `ariaLabel`          | `string`                                                           |         |   Yes    | Accessible label for the navigation landmark.                                             |
| `className`          | `string`                                                           |         |          | Additional utility classes merged with the container tokens.                              |
| `fixed`              | `boolean`                                                          | `false` |          | Applies `position: fixed` styles so the bar sticks to the top of the viewport.            |
| `items`              | `ReadonlyArray<{ label: string; href: string; current?: boolean }>`|         |          | Primary nav links rendered as `TextLink variant="strong"`; `current` sets `aria-current`. |
| `logo`               | `React.ReactNode`                                                  |         |          | Optional brand mark rendered ahead of the list.                                           |
| `mobileNavigation`   | `React.ReactNode`                                                  |         |          | Optional mobile trigger shown before the logo and only visible below the `md` breakpoint. |
| `secondaryNavigation`| `React.ReactNode`                                                  |         |          | Right-aligned cluster for buttons, menus, etc.                                            |
| `tagline`            | `React.ReactNode`                                                  |         |          | Optional copy rendered between logo and primary links.                                    |
| `wrap`               | `boolean`                                                          | `false` |          | Toggles flex-wrap layout via `data-wrap="true"` for stacked navs.                         |

* **Extends:** `React.ComponentPropsWithoutRef<'nav'>` minus: `children`, `aria-label`
* **Forwards:** All standard HTML attributes for `<nav>` to the root element.

---

## Structure

* **container** — `<nav>` element adapting between single-row and wrapped layout; sets fixed positioning when requested.
* **primary** — Left cluster containing optional `mobileNavigation`, `logo`, `tagline`, and the primary link list.
* **list**/**item** — `<ul>` of `TextLink` entries with `aria-current="page"` when `current` is true.
* **secondaryNavigation** — Right cluster where consumers provide buttons, avatar menus, etc.

> DOM structure sketch:

```jsx
<nav aria-label={ariaLabel} data-wrap={wrap ? 'true' : undefined}>
  <div data-slot="primary">
    {mobileNavigation && <div data-slot="mobileNavigation">{mobileNavigation}</div>}
    {logo && <div data-slot="logo">{logo}</div>}
    {tagline && <div data-slot="tagline">{tagline}</div>}
    {items?.length ? (
      <ul data-slot="list">
        {items.map(item => (
          <li data-slot="item" key={item.href}>
            <TextLink
              variant="strong"
              href={item.href}
              label={item.label}
              aria-current={item.current ? 'page' : undefined}
            />
          </li>
        ))}
      </ul>
    ) : null}
  </div>
  <div data-slot="secondaryNavigation">{secondaryNavigation}</div>
</nav>
```

---

## Data Attributes & States

| State flag            | Effect                                                                |
| --------------------- | --------------------------------------------------------------------- |
| `data-[wrap=true]`    | Switches the nav to stacked layout (flex column) until `lg` breakpoint. |

---

## Classes

| Data slot              | Classes                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`                 | `group` `flex` `items-center` `justify-between` `data-[wrap=true]:flex-col` `data-[wrap=true]:items-baseline` `data-[wrap=true]:lg:flex-row` `data-[wrap=true]:lg:items-center` `h-17` `lg:h-22` `data-[wrap=true]:h-auto` `data-[wrap=true]:lg:h-22` `px-4` `lg:px-28` `bg-background-none` `transition-colors` |
| `primary`              | `flex` `items-center` `group-data-[wrap=true]:flex-col` `group-data-[wrap=true]:items-baseline` `group-data-[wrap=true]:lg:flex-row` `group-data-[wrap=true]:lg:items-center` `justify-start` `flex-1` `min-w-0` `gap-1` `lg:gap-2` |
| `logo`                 | `shrink-0` `max-h-20.75`                                                                                                                                                                                |
| `tagline`              | *(inherits parent styles)*                                                                                                                                                                             |
| `list`                 | `items-center` `min-w-0` `gap-1` `lg:gap-2` plus `hidden md:flex` when `mobileNavigation` exists, or `flex` otherwise.                                                                                 |
| `item`                 | `inline-flex`                                                                                                                                                                                           |
| `mobileNavigation`     | `inline-block` `shrink-0` `md:hidden`                                                                                                                                                                   |
| `secondaryNavigation`  | `min-w-0`                                                                                                                                                                                               |
| `fixed` (layout token) | `fixed` `inset-x-0` `top-0` `z-50`                                                                                                                                                                      |

---

## Accessibility

* **Name:** Always set `ariaLabel` to a human-readable description (“Primary”, “Account settings”) so screen readers locate the correct nav.
* **Keyboard:** Primary links are rendered as `TextLink` anchors; ensure `mobileNavigation` and `secondaryNavigation` slots supply their own keyboard handling.
* **Roles/States:** Links with `current: true` expose `aria-current="page"` automatically; avoid duplicating state text elsewhere.
* **Announcements:** Because the nav may be fixed, ensure the page body uses appropriate padding/margins to prevent content being hidden under it.
* **Icon-only pattern:** Provide accessible text within the `mobileNavigation` slot (e.g., `aria-label="Open menu"` on a hamburger button).

---

## Patterns & Examples

### Fixed global bar

```tsx
<NavigationBar
  ariaLabel="Global navigation"
  fixed
  logo={<Logo />}
  items={[{ label: 'Home', href: '/', current: true }, { label: 'Docs', href: '/docs' }]}
  secondaryNavigation={<Button variant="secondary">Sign in</Button>}
/>
```
- Use `fixed` when the nav should stay pinned; remember to offset body content accordingly.
- Mark the active page with `current: true` so screen readers receive `aria-current="page"`.

### Wrapped marketing nav

```tsx
<NavigationBar
  ariaLabel="Marketing navigation"
  wrap
  logo={<Logo stacked />}
  tagline={<p className="text-xs text-color-content-subtle">Stories that move teams</p>}
  mobileNavigation={<MobileMenu />}
  items={[{ label: 'Stories', href: '/stories' }, { label: 'Events', href: '/events' }]}
  secondaryNavigation={<Button variant="primary">Get started</Button>}
/>
```
- Enable `wrap` to stack tagline or supplemental CTA content beneath the primary row.
- Supply `mobileNavigation` controls to handle small-screen menus without duplicating desktop links.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `8dfd28767494a8835055285a2019553bc21a2691a497b5a232e9ccf07f48964c`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
