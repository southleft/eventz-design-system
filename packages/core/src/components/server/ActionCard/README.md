# ActionCard
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
ActionCard surfaces a promotional tile with an optional media preview, subtitle, description, and a required action control. Use it whenever you need a compact, center-aligned stack that highlights a single call-to-action while keeping badge and media presentation consistent. The base is focus-managed as a group so hover/focus states respond to the interactive child rather than an explicit button wrapper.

---

## Import

### Component
```ts
import { ActionCard } from '@doxyz-ui/core/server/ActionCard';
```

### Types

```ts
import type { ActionCardProps } from '@doxyz-ui/core/server/ActionCard';
```

---

## Usage

```tsx
<ActionCard
  title="Join now"
  subtitle="Get the most out of DoXYZ"
  description="Unlock premium features."
  imgSrc="https://picsum.photos/seed/action-card/640/360"
  imgAlt="Abstract gradient background"
  badge="Featured"
  action={<Button variant="primary">Follow</Button>}
/>
```

> - Pass a fully configured interactive node (Button, Link, etc.) via `action`; it drives the card’s focus-visible state.
> - Provide `ariaLabel` only when the spoken name should differ from the visible `title`.

---

## Props (Declared + Inherited)

Only component-level props are listed; standard `<div>` attributes from `React.HTMLAttributes<HTMLDivElement>` (other than `className`) are forwarded automatically. Defaults are shown exactly when defined by the runtime.

| Prop          | Type             | Default | Required | Notes                                                                                  |
| ------------- | ---------------- | ------- | :------: | -------------------------------------------------------------------------------------- |
| `action`      | `React.ReactNode`|         |   Yes    | Node rendered inside the `actions` slot; must remain focusable to drive group styling. |
| `ariaLabel`   | `string`         |         |          | Overrides the accessible name when the visible `title` should not be announced.        |
| `badge`       | `string`         |         |          | Text badge shown inside the media slot when both media and badge are provided.         |
| `className`   | `string`         |         |          | Additional utility classes merged onto the base `<div>`.                               |
| `description` | `string`         |         |          | Optional supporting copy rendered beneath the title.                                   |
| `imgAlt`      | `string`         |         |          | Required whenever `imgSrc` is set; pass `''` for decorative images.                    |
| `imgSrc`      | `string`         |         |          | Media source URL that drives the `media` slot content.                                 |
| `subtitle`    | `string`         |         |          | Secondary line between media and title; trimmed and omitted when empty.                |
| `title`       | `string`         |         |   Yes    | Visible heading that also becomes the accessible name unless `ariaLabel` overrides it. |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `title`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **base** — `<div>` root with `role="group"`; groups the stacked content and forwards HTML props.
* **media** — Optional wrapper containing the `<img>` preview.
* **badge** — Absolutely positioned container rendered inside the media slot.
* **subtitle** — Optional supporting line directly under media.
* **title** — Required heading rendered as text.
* **description** — Optional paragraph-level copy beneath the title.
* **actions** — Footer slot that renders the provided `action` node.

> DOM structure sketch:

```jsx
<div role="group" tabIndex={0}>
  {media && (
    <div>
      <img />
      {badge && <div><Badge /></div>}
    </div>
  )}
  {subtitle && <div>{subtitle}</div>}
  <div>{title}</div>
  {description && <div>{description}</div>}
  <div>{action}</div>
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | This component does not expose public `data-*` states; focus styles derive from the `action` element. |

---

## Classes

| Data slot      | Classes                                                                                                                                                                                       |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`         | `outline-none` `border-0` `rounded-md` `group` `flex` `flex-col` `gap-1` `items-center` `text-center` `p-2` `w-82` `[&:has(img)]:w-168` `[&:has(:focus-visible)]:ring-2` `[&:has(:focus-visible)]:ring-offset-2` `[&:has(:focus-visible)]:ring-comp-border-focus-ring` `[&:has(:focus-visible)]:ring-offset-color-background-default` |
| `media`        | `relative` `overflow-hidden` `rounded-sm` `border-0` `mb-8` `[&>img]:w-168` `[&>img]:h-168` `[&>img]:object-cover` `[&>img]:group-hover:opacity-30`                                             |
| `badge`        | `absolute` `top-2` `left-2`                                                                                                                                                                   |
| `subtitle`     | `text-xs` `text-color-content-subtle` `group-hover:text-color-content-subtle-hover`                                                                                                           |
| `title`        | `text-color-content-default` `group-hover:text-color-content-default-hover` `text-base` `sm:text-lg`                                                                                          |
| `description`  | `text-color-content-weak` `group-hover:text-color-content-weak-hover` `text-sm`                                                                                                               |
| `actions`      | `mt-2` `sm:mt-3`                                                                                                                                                                              |

---

## Accessibility

* **Name:** By default the visible `title` becomes the group’s accessible name; provide `ariaLabel` to override or when the text is non-descriptive.
* **Keyboard:** The base is focusable via `tabIndex={0}`, but interactive behavior lives in the `action` node—ensure it handles Enter/Space and other control-specific keys.
* **Roles/States:** Root uses `role="group"` to associate the stacked content; no additional roles are set.
* **Announcements:** Media changes rely on the image’s `alt` text; supply meaningful copy or `''` when decorative to avoid noise.
* **Icon-only pattern:** If the `action` renders an icon-only button/link, ensure it supplies an accessible label and marks decorative icons `aria-hidden="true"`.

---

## Patterns & Examples

### Basic CTA card

```tsx
<ActionCard
  title="Start a trial"
  description="Unlock premium analytics for 30 days."
  action={<Button variant="primary">Start now</Button>}
/>
```

### Media highlight with badge

```tsx
<ActionCard
  title="Design Week Live"
  subtitle="Upcoming event"
  imgSrc="https://picsum.photos/seed/design-week/320/320"
  imgAlt="Stage with colorful lighting"
  badge="Live"
  action={<Button variant="secondary">Add to calendar</Button>}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `e9e8bf40d127471fe1104a06272f533b55622ba7ae6fc0ea7831d74c8f0567f4`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
