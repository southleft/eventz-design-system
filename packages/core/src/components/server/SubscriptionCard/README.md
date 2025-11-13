# SubscriptionCard
*Type: server* |
*Base: div* |
*Last updated: 2025-11-09*

## Overview
SubscriptionCard displays plan terms with either an active state (billing details + cancel affordance) or an inactive state (call-to-action subtitle). It optionally renders a TextLink cancel action or a custom `cancel` slot when the account is active. Use it wherever you need to summarize a user’s subscription status without wiring client handlers directly inside the card.

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


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop             | Type                         | Default            | Required | Notes                                                                                                 |
| ---------------- | ---------------------------- | ------------------ | :------: | ----------------------------------------------------------------------------------------------------- |
| `cancel`         | `React.ReactNode`            |                    |          | Custom node rendered in the header when `isActive` is true; overrides the default cancel TextLink.    |
| `cancelHref`     | `string`                     |                    |          | URL for the default cancel TextLink (active state only).                                              |
| `cancelText`     | `string`                     | `'Cancel'`         |          | Label used by the default cancel TextLink when `cancelHref` is provided.                              |
| `className`      | `string`                     |                    |          | Additional utility classes merged with the card container.                                            |
| `inactiveSubtitle` | `string`                   | `'Cancel anytime.'`|          | Subtitle displayed only when `isActive` is false.                                                      |
| `isActive`       | `boolean`                    | `false`            |          | Switches between billing-detail view (active) and subtitle-only view (inactive).                      |
| `memberSince`    | `string`                     |                    |          | Value for the “Member since” detail row (active state).                                                |
| `nextBillingDate`| `string`                     |                    |          | Value for the “Next billing date” detail row (active state).                                           |
| `terms`          | `string`                     |                    |   Yes    | Required heading describing the plan cost/terms.                                                       |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **header** — Flex row containing the `terms` label and either the default cancel TextLink or custom `cancel` slot when active.
* **details** — Two-row grid listing billing info (rendered only when `isActive` is true).
* **subtitle** — Paragraph shown when inactive to encourage reactivation.

> DOM structure sketch:

```jsx
<div className={isActive ? '...danger border...' : '...success border...'}>
  <div data-slot="header">
    <div data-slot="terms">{terms}</div>
    {isActive && (cancel ? <div data-slot="cancel">{cancel}</div> : cancelHref && <TextLink variant="subtle" href={cancelHref} label={cancelText} />)}
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

| State flag | Effect |
| ---------- | ------ |
| None       | Visual states are controlled directly through the `isActive` prop, not `data-*` attributes. |

---

## Classes

| Data slot        | Classes                                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`           | `flex` `flex-col` `gap-0.5` `p-1` `rounded-md` `border` `bg-color-background-none` `transition-colors` `text-left` `w-123.25` plus conditional border tokens (`border-color-background-utility-danger` when active, `border-color-background-utility-success` otherwise). |
| `header`         | `flex` `items-start` `justify-between` `gap-1`                                                                                                              |
| `terms`          | `text-3xl` `font-bold` `text-color-content-default`                                                                                                        |
| `cancel`         | `text-sm` `font-medium` `text-color-content-weak` (applied only when a custom slot is rendered)                                                             |
| `subtitle`       | `text-sm` `text-color-content-weak`                                                                                                                         |
| `details`        | `flex` `flex-col` `gap-0.25`                                                                                                                                |
| `detailRow`      | `flex` `items-center` `gap-0.5`                                                                                                                             |
| `detailLabel`    | `uppercase` `text-sm` `w-33.75` `font-medium` `text-color-content-default`                                                                                  |
| `detailValue`    | `text-sm` `text-color-content-weak`                                                                                                                         |

---

## Accessibility

* **Name:** The card itself is presentational; headings, detail rows, and the cancel action provide the textual information.
* **Keyboard:** The default cancel action is a `TextLink` (anchor). If you supply a custom `cancel` slot, ensure it handles focus and keyboard input appropriately.
* **Roles/States:** No landmark roles are added; set `aria-live` or status roles externally if plan changes need announcement.
* **Announcements:** Keep `nextBillingDate`/`memberSince` strings user-friendly (e.g., “Nov 30, 2025”) so screen readers read them naturally.
* **Icon-only pattern:** Avoid icon-only content inside detail rows; provide text or `aria-label` for any supplemental icons you insert.

---

## Patterns & Examples

### Active subscription

```tsx
<SubscriptionCard
  terms="$24 / year"
  isActive
  nextBillingDate="Jan 18, 2026"
  memberSince="May 2023"
  cancelHref="/billing/cancel"
/>
```
- Set `isActive` alongside billing metadata to highlight ongoing plans with renewal info.
- Provide `cancelHref` so the inline action routes members to the correct management flow.

### Inactive offer

```tsx
<SubscriptionCard
  terms="Upgrade to Plus"
  inactiveSubtitle="Unlock unlimited projects and live support."
/>
```
- Omit `memberSince` and `nextBillingDate` for inactive offers so the layout focuses on upgrade copy.
- Customize `inactiveSubtitle` with a concise value prop to prompt conversions.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `d0a80b0650c928ecc3b67569de66d174fe6e225b589d7cab0721344abdb573e7`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
