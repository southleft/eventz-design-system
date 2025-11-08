# SubscriptionCard
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
SubscriptionCard is a server-rendered summary card for billing or account pages that surfaces plan terms, cancellation affordances, and either an inactive subtitle or active billing details. Use it to show subscribers what they pay, when they renew, and how to cancel without embedding business logic. The card swaps between inactive and active layouts based on `isActive` and supports a custom cancel slot for advanced flows.

---

## Import

### Component
```ts
import { SubscriptionCard } from '@doxyz-ui/core/server/SubscriptionCard';
```

### Types

```ts
import type { SubscriptionCardProps } from '@doxyz-ui/core/server/SubscriptionCard';
```

---

## Usage

```tsx
<SubscriptionCard { ...props } />
```

> - Provide `terms` for every render; it is the only required prop and serves as the visual headline.
> - Toggle `isActive` to flip between the inactive subtitle and the active billing rows; only pass `cancelHref` or a `cancel` slot when the plan is active.

---

## Props (Declared + Inherited)

| Prop               | Type                               |        Default | Required | Notes                                                                                               |
| ------------------ | ---------------------------------- | -------------: | :------: | --------------------------------------------------------------------------------------------------- |
| `cancel`           | `React.ReactNode`                  |             — |    No    | Optional slot that replaces the default Cancel TextLink when `isActive` is true.                    |
| `cancelHref`       | `string`                           |             — |    No    | URL for the inline Cancel TextLink; ignored when inactive or when a `cancel` slot is provided.     |
| `cancelText`       | `string`                           |      `Cancel` |    No    | Label applied to the default Cancel TextLink.                                                       |
| `className`        | `string`                           |             — |    No    | Merges custom classes with the component's composed styles.                                        |
| `inactiveSubtitle` | `string`                           | `Cancel anytime.` |    No    | Copy rendered below the header only when inactive.                                                  |
| `isActive`         | `boolean`                          |        `false` |    No    | Drives container border token, cancel affordance visibility, and which body content renders.       |
| `memberSince`      | `string`                           |             — |    No    | Value text for the "Member since" detail row; displayed only when active.                          |
| `nextBillingDate`  | `string`                           |             — |    No    | Value text for the "Next billing date" detail row; displayed only when active.                     |
| `terms`            | `string`                           |             — |   Yes    | Required headline describing the plan or billing cadence.                                           |

* **Extends:** `Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>`
* **Forwards:** All standard HTML attributes for `<div>` (except `children`) to the root element.

---

## Structure

* **container** — root `<div>` that forwards HTML attributes and composes the border/background tokens.
* **header** — flex row that pairs the `terms` slot with either the Cancel slot content or default TextLink.
* **terms (`data-slot="terms"`)** — bold headline showing the required plan description.
* **cancel (`data-slot="cancel"`)** — optional slot rendered only when active; otherwise the inline TextLink appears when `cancelHref` is set.
* **subtitle (`data-slot="subtitle"`)** — inactive-only copy rendered under the header.
* **details (`data-slot="details"`)** — column wrapper for the active billing rows.
* **detailRow / detailLabel / detailValue** — label/value pairs for next billing date and member since fields.

> DOM structure sketch:

```txt
<div>
  <div data-slot="terms">{terms}</div>
  {isActive ? (
    <>
      {cancel slot | <TextLink />}
      <div data-slot="details">
        <div data-slot="detailRow">
          <span data-slot="detailLabel">Next billing date:</span>
          <span data-slot="detailValue">{nextBillingDate}</span>
        </div>
        <div data-slot="detailRow">
          <span data-slot="detailLabel">Member since:</span>
          <span data-slot="detailValue">{memberSince}</span>
        </div>
      </div>
    </>
  ) : (
    <p data-slot="subtitle">{inactiveSubtitle}</p>
  )}
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| _None_     | Component does not expose public `data-*` state flags; the active/inactive styling is handled via internal class toggles only. |

---

## Classes

| Data slot / state             | Classes                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `container (base)`            | `flex` `flex-col` `gap-2` `p-4` `rounded-md` `border` `bg-color-background-none` `transition-colors` `text-left` `w-[439px]` |
| `container (isActive)`        | `border-color-background-utility-danger`                                                      |
| `container (isActive=false)`  | `border-color-background-utility-success`                                                     |
| `header`                      | `flex` `items-start` `justify-between` `gap-4`                                                 |
| `terms`                       | `text-3xl` `font-bold` `text-color-content-default`                                           |
| `cancel`                      | `text-sm` `font-medium` `text-color-content-weak`                                             |
| `subtitle`                    | `text-sm` `text-color-content-weak`                                                           |
| `details`                     | `flex` `flex-col` `gap-1`                                                                     |
| `detailRow`                   | `flex` `items-center` `gap-2`                                                                  |
| `detailLabel`                 | `uppercase` `text-sm` `w-[135px]` `font-medium` `text-color-content-default`                  |
| `detailValue`                 | `text-sm` `text-color-content-weak`                                                           |

---

## Accessibility

* **Name:** The visible `terms` text serves as the primary label; the Cancel affordance inherits its name from `cancelText` or the interactive element you render in the `cancel` slot.
* **Keyboard:** The container is not focusable; focus lands on the inline TextLink or any tabbable controls inside the `cancel` slot.
* **Roles/States:** Root remains a semantic `<div>` and relies on native semantics for the nested TextLink; no extra ARIA roles are required.
* **Announcements:** When subscription values change dynamically (e.g., after an upgrade), announce the change via a nearby `aria-live="polite"` region.
* **Icon-only pattern:** Provide an `aria-label` on icon-only cancel actions and set decorative icons to `aria-hidden="true"`.

---

## Patterns & Examples

### Inactive Summary

```tsx
<SubscriptionCard terms="$12 per month" inactiveSubtitle="Cancel anytime." />
```

### Active Plan With Default Cancel Link

```tsx
<SubscriptionCard
  terms="$12 per month"
  isActive
  cancelHref="https://example.com/cancel"
  nextBillingDate="Nov 30, 2025"
  memberSince="Jun 2024"
/>
```

### Active Plan With Custom Cancel Slot

```tsx
<SubscriptionCard
  terms="Enterprise"
  isActive
  nextBillingDate="Nov 30, 2025"
  memberSince="Jun 2024"
  cancel={<span>Contact customer support</span>}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK** (neither file defines variants, matching the runtime implementation).
* Slots parity: **OK** (runtime renders header, terms, cancel, subtitle, details, detailRow, detailLabel, and detailValue as mapped in the styleMap).
* State flags parity: **OK** (`isActive` and `isActive=false` state tokens match the documented border classes).
