# ScrollerRow

## Overview
ScrollerRow is a lightweight flex-row container that spaces and aligns scroller content with even gaps. Use it to line up media cards or calls-to-action while inheriting the responsive spacing tokens defined in the style map. It forwards all `<div>` attributes, so consumers can add regions, roles, or custom classes as needed.

---

## Import

### Component
```ts
import { ScrollerRow } from '@doxyz-ui/core/server/ScrollerRow';
```

### Types

```ts
import type { ScrollerRowProps } from '@doxyz-ui/core/server/ScrollerRow';
```

---

## Usage

```tsx
<ScrollerRow
  className="px-6"
>
  <div>Episode 12</div>
  <div>Episode 13</div>
</ScrollerRow>
```

> - Combine tokens like `px-*` or `w-*` in `className` to adjust spacing while retaining the base flex layout.
> - Forward `aria-*` attributes or `role="group"` when the row groups related interactive cards.

---

## Props (Declared + Inherited)

Only component-level props are listed below; standard `<div>` attributes (aria-*, data-*, etc.) are forwarded automatically.

| Prop        | Type     | Default | Required | Notes                                                     |
| ----------- | -------- | ------: | :------: | --------------------------------------------------------- |
| `className` | `string` |     `—` |   No     | Additional utility classes merged after the layout tokens |

**Extends:** `React.HTMLAttributes<HTMLDivElement>`
**Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Slots & Structure

* **container** — `<div>` root that owns the flex row layout and forwards HTML attributes.
* **children** — arbitrary nodes rendered inline within the flex row.

> DOM structure sketch:

```txt
<div class="flex gap-4 justify-between items-center">
  {children}
</div>
```

---

## Data Attributes & States

ScrollerRow does not expose custom `data-*` attributes or visual states. Consumers may add their own `data-*` flags, which pass through to the root `<div>` unchanged.

---

## Accessibility

* **Name:** Provided by visible child content or any forwarded `aria-label`/`aria-labelledby` on the root container.
* **Keyboard:** The container itself is not focusable; ensure its children contain the interactive focus and keyboard behavior.
* **Roles/States:** Add `role="group"` or `role="list"` when grouping related controls; the component does not set roles by default.
* **Announcements:** Announce meaningful updates (e.g., loading new scroller content) via a sibling `aria-live` region if needed.
* **Icon-only pattern:** Ensure child controls that show only icons include accessible labels; decorative icons should be `aria-hidden="true"`.

---

## Patterns & Examples

### Media rail

```tsx
<ScrollerRow className="py-4">
  <MediaCard title="Design Debrief" />
  <MediaCard title="Signals" />
  <MediaCard title="Studio Diary" />
</ScrollerRow>
```

### Row with CTA

```tsx
<ScrollerRow className="items-start">
  <div>
    <h3 className="text-lg font-semibold">Continue listening</h3>
    <p className="text-subtle">Pick up where you left off.</p>
  </div>
  <Button variant="primary">See all</Button>
</ScrollerRow>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK** (no variants defined)
* Slots parity: **OK** (no blueprint slots; runtime renders children only)
* State flags parity: **OK** (no data states in styleMap or runtime)
