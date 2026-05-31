# Countdown
*Type: client* | *Base: time* | *Last updated: 2025-11-11*

## Overview
Countdown displays the remaining time until an absolute ISO-8601 timestamp. It runs on the client, updates once per second, optionally announces a screen-reader prefix, and fires an `onComplete` callback exactly once when the timer hits zero. Use it to highlight flash-sale expirations, session timeouts, or onboarding deadlines.

---

## Import

### Component
```ts
import { Countdown } from '@eventz-ui/core/client/Countdown';
```

### Types

```ts
import type { CountdownProps } from '@eventz-ui/core/client/Countdown';
```

---

## Usage

```tsx
<Countdown { ...props } />
```

---

## Props (Declared + Inherited)

| Prop           | Type                    | Default | Required | Notes |
| -------------- | ----------------------- | ------: | :------: | ----- |
| `announceLabel`| `string`                |         |          | Screen-reader-only text read before the remaining time.
| `className`    | `string`                |         |          | Appends utility classes to the `<time>` element.
| `onComplete`   | `() => void`            |         |          | Fired once when the countdown reaches zero.
| `until`        | `string`                |         |   Yes    | ISO-8601 timestamp with timezone; determines the target moment.
| `variant`      | `'default' \| 'expiring'` | `'default'` |     | Chooses between brand and danger backgrounds.

* **Extends:** `React.ComponentPropsWithoutRef<'time'>` minus `children`. Attributes such as `dateTime`, `aria-label`, and `title` are forwarded.
* **Forwards:** All additional time element props via `{...rest}`.

---

## Structure

* **time** — Semantic `<time>` element with `role="timer"`, `aria-live="polite"`, and `aria-atomic="true"` so updates are announced.
* **sr-only label** — Optional `<span class="sr-only">` containing `announceLabel` before the visible time string.

> DOM structure sketch:

```jsx
<time role="timer" aria-live="polite" aria-atomic="true" dateTime={until}>
  {announceLabel && <span className="sr-only">{announceLabel}</span>}
  {formattedTime}
</time>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| Variant toggles (`default`, `expiring`) | Switch between brand and danger backgrounds via token classes.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `inline-flex` `items-center` `justify-center` `whitespace-nowrap` `w-full` `p-2` `text-3xl` `text-color-content-inverse` |
| `container (variant: default)` | `bg-color-background-brand` |
| `container (variant: expiring)` | `bg-color-content-utility-danger-subtle` |

---

## Accessibility

* **Name:** The timer announces itself via `role="timer"`; add `aria-label` if you need extra context beyond `announceLabel`.
* **Keyboard:** Non-interactive display—focus management is handled by surrounding components.
* **Roles/States:** `aria-live="polite"` ensures updates are read without interrupting other speech; `aria-atomic="true"` causes the entire value to be announced each tick.
* **Announcements:** Keep `announceLabel` short; the formatted time (e.g., “02:35”) follows it automatically.
* **Icon-only pattern:** Not applicable—the timer always renders text.

---

## Patterns & Examples

### Default variant

```tsx
<Countdown until="2025-12-25T08:00:00-05:00" />
```

- Shows the standard brand background.
- Useful for positive countdowns like launches.

### Expiring variant with handler

```tsx
<Countdown
  variant="expiring"
  announceLabel="Offer ends in"
  until={offerEnd}
  onComplete={handleExpiry}
/>
```

- Danger styling helps communicate urgency.
- `onComplete` can trigger UI updates or analytics events.

### Invalid timestamp fallback

```tsx
<Countdown until="invalid" onComplete={() => console.warn('never fires')} />
```

- Renders `00:00` and logs a warning in development if `until` cannot be parsed.
- Useful during testing when placeholder values are common.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `d0463a767d7bccda8d22ea43a9b8e939bd6d1c46db35de2006ebe65347177edb`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
