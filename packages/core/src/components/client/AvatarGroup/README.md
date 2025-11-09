# AvatarGroup
*Type: client* | *Base: div* | *Last updated: 2025-11-08*

## Overview
AvatarGroup stacks user faces with overlapping Radix Avatars and an optional trailing message like “+12 others interested.” It abbreviates large counts (k/m/b), trims empty user data, and exposes slots for each avatar piece so tokens stay in sync with the blueprint. Use it anywhere you need to preview a cohort of participants next to a short caption.

---

## Import

### Component
```ts
import { AvatarGroup } from '@doxyz-ui/core/client/AvatarGroup';
```

### Types

```ts
import type { AvatarGroupProps } from '@doxyz-ui/core/client/AvatarGroup';
```

---

## Usage

```tsx
<AvatarGroup users={users} count={42} />
```

- Provide `users` as `{ name: string; imageUrl: string }[]`; the component trims whitespace before rendering.
- Omit `count` to report `users.length`, or override it when the backend tracks more members than you display.

---

## Props (Declared + Inherited)

| Prop               | Type                                             |       Default | Required | Notes |
| ------------------ | ------------------------------------------------ | ------------: | :------: | ----- |
| `avatarsToDisplay` | `number`                                         |            `4` |          | Max number of avatars rendered before the “+N” indicator kicks in. |
| `className`        | `string`                                         |               |          | Appends utility classes to the root container. |
| `count`            | `number`                                         |               |          | Total participants. When absent, the component derives the count from `users`. |
| `indicator`        | `string`                                         |          `'+'` |          | Prefix shown ahead of the abbreviated count (e.g., `+` or `~`). |
| `message`          | `string`                                         | `'others interested'` |          | Text that trails the indicator/count (trimmed before render). |
| `showMessage`      | `boolean`                                        |          `true` |          | Hides the indicator/count/message when set to `false`. |
| `users`            | `ReadonlyArray<{ name: string; imageUrl: string }>` |               |   Yes    | Dataset powering the faces; empty entries are skipped after slicing to `avatarsToDisplay`. |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`
* **Forwards:** All standard HTML attributes for `<div>` to the root container.

---

## Structure

* **container** — Flex row that wraps avatar stack plus optional message.
* **avatars** — Reverse flex row used to overlap faces from right-to-left.
* **avatar** — Radix `Avatar.Root`; contains `avatarImage` and `avatarFallback` slots.
* **avatarImage** — `<img>` showing the provided `imageUrl`.
* **avatarFallback** — Initial rendered while the image loads or fails.
* **message** — Inline flex wrapper for indicator/count/message text.
* **indicator** — Prefix glyph or short text preceding the count.
* **count** — Abbreviated remainder after subtracting rendered avatars.
* **messageText** — Free-form caption (defaults to “others interested”).

> DOM structure sketch:

```jsx
<div data-slot="container">
  <div data-slot="avatars">
    <Avatar.Root data-slot="avatar">
      <Avatar.Image data-slot="avatarImage" src={url} alt={name} />
      <Avatar.Fallback data-slot="avatarFallback">{initial}</Avatar.Fallback>
    </Avatar.Root>
    {/* ...more avatars reversed */}
  </div>
  {showMessage && (
    <div data-slot="message">
      <span data-slot="indicator">{indicator}</span>
      <span data-slot="count">{displayCount}</span>
      <span data-slot="messageText">{message}</span>
    </div>
  )}
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| —          | No custom `data-*` states are exposed; styling relies on static classes only. |

---

## Classes

| Data slot        | Classes |
| ---------------- | ------- |
| `container`      | `flex gap-8 items-center` |
| `avatars`        | `flex items-center flex-row-reverse` |
| `avatar`         | `inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle w-24 lg:w-32 -mr-12 lg:-mr-18 border-color-border-inverse border` |
| `avatarImage`    | `size-full rounded-[inherit] object-cover` |
| `avatarFallback` | `flex items-center justify-center overflow-hidden rounded-full bg-background-none text-base font-medium w-24 h-24 lg:w-32 lg:h-32 -mr-12 lg:-mr-18` |
| `message`        | `inline-flex gap-[4px] text-color-content-subtle text-sm ml-12 lg:ml-18` |
| `indicator`      | *(no additional classes)* |
| `count`          | *(no additional classes)* |
| `messageText`    | *(no additional classes)* |

---

## Accessibility

* **Name:** Each `Avatar.Image` uses the user’s trimmed `name` for its `alt`; truncated initials ensure a fallback label.
* **Keyboard:** The group is presentational; there is no interactive affordance. Focus stays on surrounding controls.
* **Roles/States:** No explicit ARIA roles are added. The stack is announced as static inline content.
* **Announcements:** The message text conveys the aggregate count; keep it short so screen readers do not repeat redundant prose.
* **Icon-only pattern:** Not applicable—the avatars always render visible imagery or initials.

---

## Patterns & Examples

### Default stack

```tsx
<AvatarGroup users={teamMembers} />
```

- `count` falls back to `users.length`; keep the dataset trimmed to meaningful faces.
- Provide absolute URLs for `imageUrl` so Storybook and production both resolve them.

### Custom caption

```tsx
<AvatarGroup
  users={teamMembers}
  indicator="~"
  message="active collaborators"
  count={128}
/>
```

- Override `count` when you only have a subset of faces locally.
- Short indicator strings keep the caption compact in tight toolbars.

### Without message

```tsx
<AvatarGroup users={attendees} showMessage={false} avatarsToDisplay={5} />
```

- Toggling `showMessage` is helpful when the component lives beside another label.
- Increase `avatarsToDisplay` for dense lists; overflow will still abbreviate the remainder.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `23c8cdf86007ac4cfb7961e5dca9a935ed1783cbc8b1e5afe587f7fb37390d20`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
