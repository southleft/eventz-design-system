# Alert
*Type: client* |
*Base: div* |
*Last updated: 2025-11-11*

## Overview
Alert surfaces inline product or system status with gradient backgrounds, optional title and supporting description, and an inline remediation link. An icon that matches the selected variant plus an IconButton-based dismiss affordance make the component scannable and easy to clear. Danger alerts escalate urgency with `role="alert"` while all other variants stay polite via `role="status"`, keeping announcements aligned with severity.

---

## Import

### Component
```ts
import { Alert } from '@eventz-ui/core/client/Alert';
```

### Types

```ts
import type { AlertProps } from '@eventz-ui/core/client/Alert';
```

---

## Usage

```tsx
<Alert { ...props }>{children}</Alert>
```

---

## Props (Declared + Inherited)

The following table flattens Alert’s declared props together with the single inherited `className` field from `React.HTMLAttributes<HTMLDivElement>`; all other div attributes continue to forward to the container. Defaults shown below reflect the runtime’s initializers.

| Prop         | Type                                          |       Default | Required | Notes                                                                                                    |
| ------------ | --------------------------------------------- | ------------: | :------: | -------------------------------------------------------------------------------------------------------- |
| `children`   | `React.ReactNode`                             |               |          | Rendered as the description when no trimmed `title` is provided.                                         |
| `className`  | `string`                                      |               |          | Merges additional classes onto the root container.                                                       |
| `closeIcon`  | `React.ReactNode`                             |               |          | Replaces the default `CloseIcon` glyph; only the glyph receives the `data-slot="closeIcon"` styling.     |
| `isDismissible` | `boolean`                                  |          `true` |          | Removes the trailing IconButton when set to `false`.                                                     |
| `onCloseClick` | `(event: React.SyntheticEvent) => void`     |               |          | Fired when the dismiss IconButton is pressed.                                                            |
| `textLink`   | `TextLinkProps`                               |               |          | Pass props to an inline `TextLink` rendered below the description/title stack.                           |
| `title`      | `string`                                      |               |          | Trimmed and rendered in the dedicated `title` slot; description falls back to `children` when empty.     |
| `variant`    | `'success' \| 'info' \| 'warning' \| 'danger'`   |        `'info'` |          | Selects gradient tokens, icon, and ARIA role.                                                            |
| `withIcon`   | `boolean`                                     |          `true` |          | Hides the leading status icon when set to `false`.                                                       |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `title`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **container** — root wrapper; handles layout, gradient background, and forwarded div attributes.
* **icon** — optional leading status glyph whose color shifts per variant.
* **content** — column flex stack for title/description plus the optional text link.
* **title** — bold heading row when `title` has content.
* **description** — multiline body copy; filled with `children` when no `title`.
* **textLink** — inline remediation link, rendered via `TextLink`.
* **closeIcon** — glyph rendered inside the dismiss IconButton; only the icon is a slot, not the button itself.

> DOM structure sketch:

```jsx
<div role="status|alert" data-slot="container">
  {withIcon && <Icon data-slot="icon" />}
  <div data-slot="content">
    {title ? (
      <div data-slot="title">{title}</div>
    ) : (
      <div data-slot="description">{children}</div>
    )}
    {textLink && <TextLink data-slot="textLink" {...textLink} />}
  </div>
  {isDismissible && (
    <IconButton aria-label="Dismiss alert">
      {(closeIcon ?? <CloseIcon data-slot="closeIcon" />)}
    </IconButton>
  )}
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| _None_     | The component does not expose public `data-*` state flags beyond `data-slot` markers. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `flex` `gap-2` `items-start` `pt-3` `pb-3` `pl-3` `pr-3` `w-97.5` `rounded-md` `text-color-content-inverse` |
| `icon` | `mt-0.5` `shrink-0` |
| `content` | `flex` `flex-col` `gap-2` `flex-grow` |
| `title` | `text-base` `font-bold` |
| `description` | `text-sm` |
| `textLink` | — |
| `closeIcon` | — |
| `container (variant: success)` | `bg-gradient-utility-success` |
| `container (variant: info)` | `bg-gradient-utility-info` |
| `container (variant: warning)` | `bg-gradient-utility-warning` |
| `container (variant: danger)` | `bg-gradient-utility-danger` |

---

## Accessibility

* **Name:** Title or description text provides the visible name; the dismiss control sets `aria-label="Dismiss alert"` and should be localized when needed.
* **Keyboard:** Root is static, so focus lands on interactive elements only; the IconButton is reachable via Tab and activates with Space/Enter.
* **Roles/States:** Uses `role="alert"` for the `danger` variant (assertive) and `role="status"` for all others (polite) to align announcements with severity.
* **Announcements:** Content changes re-announce automatically because `role="alert"`/`role="status"` emit live-region behavior; fire `onCloseClick` handlers to trigger any extra messaging.
* **Icon-only pattern:** When rendering a custom `closeIcon`, keep it decorative (`aria-hidden="true"`) so the IconButton label remains authoritative.

---

## Patterns & Examples

### Inline success with description

```tsx
<Alert variant="success" title="Deployment finished">
  The primary pipeline completed; you can start QA now.
</Alert>
```

> - Use `title` for crisp headlines and `children` for supporting detail.

### Non-dismissible warning

```tsx
<Alert variant="warning" isDismissible={false}>
  We detected unusual billing activity. Monitor payments closely.
</Alert>
```

> - Disable dismissal when the notice is critical and must stay visible until resolved.

### Remediation link

```tsx
<Alert
  variant="info"
  textLink={{ href: '/status', label: 'See status log', variant: 'inverted' }}
>
  Scheduled maintenance starts tonight at 11:00 PM.
</Alert>
```

> - Pass a complete `TextLinkProps` object; the component forwards it and marks the slot for styling.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `3c04d83bede57c0035d0e29fc06e617ccd47fc71b1289b0b119b009ed70aefae`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation covering props, slots, accessibility, and blueprint parity. |
