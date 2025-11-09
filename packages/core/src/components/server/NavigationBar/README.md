# NavigationBar
*Type: server* |
*Base: nav* |
*Last updated: 2025-11-08*

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

> - Always pass a descriptive `ariaLabel` so the `<nav>` landmark communicates its purpose.
> - Supply `mobileNavigation` only when needed; it hides the primary list below `md` but keeps it visible above.

---

## Props (Declared + Inherited)

Only component-level props are listed; standard `<nav>` attributes from `React.ComponentPropsWithoutRef<'nav'>` (other than `children`/`aria-label`) are forwarded automatically.

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
| `base`                 | `group` `flex` `items-center` `justify-between` `data-[wrap=true]:flex-col` `data-[wrap=true]:items-baseline` `data-[wrap=true]:lg:flex-row` `data-[wrap=true]:lg:items-center` `h-68` `lg:h-88` `data-[wrap=true]:h-auto` `data-[wrap=true]:lg:h-88` `px-16` `lg:px-112` `bg-background-none` `transition-colors` |
| `primary`              | `flex` `items-center` `group-data-[wrap=true]:flex-col` `group-data-[wrap=true]:items-baseline` `group-data-[wrap=true]:lg:flex-row` `group-data-[wrap=true]:lg:items-center` `justify-start` `flex-1` `min-w-0` `gap-4` `lg:gap-8` |
| `logo`                 | `shrink-0` `max-h-83`                                                                                                                                                                                   |
| `tagline`              | *(inherits parent styles)*                                                                                                                                                                             |
| `list`                 | `items-center` `min-w-0` `gap-4` `lg:gap-8` plus `hidden md:flex` when `mobileNavigation` exists, or `flex` otherwise.                                                                                 |
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
| 2025-11-08 | Initial documentation |
