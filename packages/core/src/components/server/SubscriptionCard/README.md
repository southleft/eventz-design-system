# SubscriptionCard
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
SubscriptionCard is a server-rendered summary card that highlights plan terms, cancellation affordances, and either an inactive subtitle or the subscriber's billing details. Use it on billing or account settings pages when you need a compact way to show what someone is paying, when they renew, and how to cancel. The card can surface either the built-in Cancel TextLink or custom slot content when the plan is active.

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

> - Toggle `isActive` to switch between the inactive subtitle and billing detail rows; provide realistic `nextBillingDate` and `memberSince` values when active.
> - Pass `cancelHref` only when `isActive` is true and you are not supplying a custom `cancel` slot—the default TextLink is hidden otherwise.

---

## Props (Declared + Inherited)

| Prop               | Type                               |        Default | Required | Notes                                                                                               |
| ------------------ | ---------------------------------- | -------------: | :------: | --------------------------------------------------------------------------------------------------- |
| `cancel`           | `React.ReactNode`                  |             — |    No    | Optional slot that replaces the default Cancel TextLink when active.                                |
| `cancelHref`       | `string`                           |             — |    No    | URL for the Cancel TextLink; ignored unless `isActive` is true and `cancel` is not provided.        |
| `cancelText`       | `string`                           |      `Cancel` |    No    | Label forwarded to the default Cancel TextLink while active.                                       |
| `inactiveSubtitle` | `string`                           | `Cancel anytime.` |    No    | Copy rendered only when inactive.                                                                   |
| `isActive`         | `boolean`                          |        `false` |    No    | Drives border tokens, cancel affordance visibility, and which body (subtitle vs. details) renders. |
| `memberSince`      | `string`                           |             — |    No    | Value-only text for the "Member since" row when active.                                            |
| `nextBillingDate`  | `string`                           |             — |    No    | Value-only text for the "Next billing date" row when active.                                       |
| `terms`            | `string`                           |             — |   Yes    | Required headline describing the plan or billing cadence.                                           |

* **Extends:** `Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>`
* **Forwards:** All standard HTML attributes for `<div>` (except `children`) to the root element.

---

## Structure

* **container** — root `<div>` that applies spacing, border, and background tokens while forwarding HTML attributes.
* **header** — flex row that pairs the `terms` slot with either the cancel slot content or default TextLink.
* **terms** — bold headline showing the required `terms` string.
* **cancel** — optional slot rendered only when `isActive` is true; otherwise the default TextLink appears when `cancelHref` is provided.
* **subtitle** — paragraph shown beneath the header only when inactive.
* **details** — column wrapper containing the active-only billing rows.
* **detailRow** — flex row for each label/value pair.
* **detailLabel** — uppercase label, e.g., "Next billing date".
* **detailValue** — muted body text that mirrors the corresponding value prop.

> DOM structure sketch:

```txt
<div>
  <div>
    <div data-slot="terms">{terms}</div>
    {isActive ? (cancel slot | TextLink) : null}
  </div>
  {isActive ? (
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
  ) : (
    <p data-slot="subtitle">{inactiveSubtitle}</p>
  )}
</div>
```

---

## Data Attributes & States

| State flag        | Effect                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `isActive=true`   | Applies `border-color-background-utility-danger`, reveals the cancel affordance, and shows details. |
| `isActive=false`  | Applies `border-color-background-utility-success` and swaps details for the inactive subtitle copy.  |

---

## Classes

| Data slot / state               | Classes                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `container (base)`             | `flex` `flex-col` `gap-2` `p-4` `rounded-md` `border` `bg-color-background-none` `transition-colors` `text-left` `w-[439px]` |
| `container (isActive)`         | `border-color-background-utility-danger`                                                      |
| `container (isActive=false)`   | `border-color-background-utility-success`                                                     |
| `header`                       | `flex` `items-start` `justify-between` `gap-4`                                                 |
| `terms`                        | `text-3xl` `font-bold` `text-color-content-default`                                           |
| `cancel`                       | `text-sm` `font-medium` `text-color-content-weak`                                             |
| `subtitle`                     | `text-sm` `text-color-content-weak`                                                           |
| `details`                      | `flex` `flex-col` `gap-1`                                                                     |
| `detailRow`                    | `flex` `items-center` `gap-2`                                                                  |
| `detailLabel`                  | `uppercase` `text-sm` `w-[135px]` `font-medium` `text-color-content-default`                  |
| `detailValue`                  | `text-sm` `text-color-content-weak`                                                           |

---

## Accessibility

* **Name:** The visible `terms` text serves as the card's accessible name; the Cancel affordance inherits its label from `cancelText` or your slot content.
* **Keyboard:** The container itself is non-focusable; focus lands on the default TextLink or any tabbable nodes passed into the `cancel` slot.
* **Roles/States:** Root remains a semantic `<div>`; the inline Cancel TextLink provides native link semantics without extra aria wiring.
* **Announcements:** If subscription data changes dynamically (e.g., after an upgrade), announce updates via a nearby `aria-live="polite"` region.
* **Icon-only pattern:** When providing an icon-only cancel slot, include an `aria-label` on the interactive element and mark decorative icons as `aria-hidden="true"`.

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

* Contract ↔ styleMap variants: **OK (no variants defined)**
* Slots parity: **OK (runtime exposes header, terms, cancel, subtitle, details, detailRow, detailLabel, and detailValue)**
* State flags parity: **OK (`isActive` / `isActive=false` map to the documented border tokens)**
