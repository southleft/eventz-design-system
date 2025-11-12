# InfoPopover
*Type: client* | *Base: div* | *Last updated: 2025-11-11*

## Overview
InfoPopover renders an icon-only trigger that opens a Radix Popover for short helper text. It accepts a required `ariaLabel`, lets you pick the side/offset, and notifies parent controls when the panel opens or closes. Use it to append inline explanations to labels, table headers, or setting names without overwhelming the layout.

---

## Import

### Component
```ts
import { InfoPopover } from '@doxyz-ui/core/client/InfoPopover';
```

### Types

```ts
import type { InfoPopoverProps } from '@doxyz-ui/core/client/InfoPopover';
```

---

## Usage

```tsx
<InfoPopover { ...props }>{children}</InfoPopover>
```

---

## Props (Declared + Inherited)

| Prop            | Type                                         | Default | Required | Notes |
| --------------- | -------------------------------------------- | ------: | :------: | ----- |
| `ariaLabel`     | `string`                                     |         |   Yes    | Accessible name applied to the trigger button.
| `children`      | `React.ReactNode`                            |         |   Yes    | Body content rendered inside the popover panel.
| `className`     | `string`                                     |         |          | Appends utility classes to the outer wrapper (rarely needed).
| `contentId`     | `string`                                     |         |          | Optional id for wiring into `aria-describedby` of the hosting control.
| `onOpenChange`  | `(open: boolean) => void`                    |         |          | Fired whenever the Radix Popover toggles open state.
| `side`          | `'top' \| 'right' \| 'bottom' \| 'left'`    |   `'top'` |          | Popover placement relative to the trigger.
| `sideOffset`    | `number`                                     |        `8` |          | Pixel distance between trigger and content.

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`
* **Forwards:** Additional div attributes (e.g., `style`, `data-*`) for host-level customization.

---

## Structure

* **container** — Neutral `<div>` that anchors the Radix popover instance.
* **infoTrigger** — Icon-only `Popover.Trigger` button with focus ring tokens.
* **infoContent** — `Popover.Content` panel housing the provided children.

> DOM structure sketch:

```jsx
<div className="dxyz-info-popover">
  <Popover.Root>
    <Popover.Trigger aria-label={ariaLabel} data-slot="infoTrigger">
      <InfoIcon aria-hidden="true" />
    </Popover.Trigger>
    <Popover.Content
      id={contentId}
      side={side}
      sideOffset={sideOffset}
      data-slot="infoContent"
    >
      {children}
    </Popover.Content>
  </Popover.Root>
</div>
```

---

## Data Attributes & States

| State flag          | Effect |
| ------------------- | ------ |
| `aria-label="…"`   | Provides the accessible name for the icon-only trigger.
| (Radix `data-state`)| Radix applies `data-state="open|closed"` automatically; consumers can target it if needed for animations.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `relative` `dxyz-info-popover` |
| `infoTrigger` | `inline-flex` `items-center` `justify-center` `shrink-0` `border-none` `bg-background-none` `text-color-content-subtle` `focus-visible-brand` `rounded-full` `[&>svg]:size-16` |
| `infoContent` | `max-w-xs` `rounded-md` `background-modal` `text-color-content-default` `p-3` `text-sm` `shadow-lg` |

---

## Accessibility

* **Name:** Comes from the required `ariaLabel` prop; keep it action-oriented (e.g., “Explain priority”).
* **Keyboard:** Trigger is a standard button—Tab focuses it, Space/Enter toggles the popover, and Esc closes the content.
* **Roles/States:** Radix Popover manages `aria-expanded`, focus trapping, and dismissal for you; link `contentId` to `aria-describedby` of the host control if you need announcements.
* **Announcements:** Popover content is rendered in the DOM when open, so screen readers move focus into it automatically; keep the copy concise and avoid interactive elements.
* **Icon-only pattern:** The Info icon is decorative and marked `aria-hidden`; never omit `ariaLabel`.

---

## Patterns & Examples

### Inline form helper

```tsx
<Label.Root>
  API Key
  <InfoPopover ariaLabel="Explain API key">
    Keys authenticate API requests. Rotate them regularly.
  </InfoPopover>
</Label.Root>
```

- Append the popover directly after the label text to keep the layout tight.
- Use `contentId` and pass it to `aria-describedby` when the label wraps a field.

### Table header explanation

```tsx
<th>
  Conversion Rate
  <InfoPopover ariaLabel="Conversion rate info" side="right" sideOffset={12}>
    Percentage of visitors who completed the primary action.
  </InfoPopover>
</th>
```

- Adjust `side`/`sideOffset` to avoid clipping near table edges.
- Because the trigger is focusable, ensure it fits within your header layout.

### Controlled open state

```tsx
const [infoOpen, setInfoOpen] = useState(false);

<InfoPopover
  ariaLabel="Explain billable seats"
  onOpenChange={setInfoOpen}
>
  Seats are billed when members have edit permissions.
</InfoPopover>
```

- Monitor `onOpenChange` if you need to sync analytics or close other popovers when this one opens.
- Avoid forcing it closed externally; let users dismiss it with Esc or focus changes.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `94ae3c9e14452103d69984431707abfe30e1550bc327c918313de9103aadd22d`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
