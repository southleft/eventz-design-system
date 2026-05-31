# ExpandableContent
*Type: client* | *Base: div* | *Last updated: 2025-11-11*

## Overview
ExpandableContent reveals long-form text or descriptions behind a collapsible region with animated height transitions. It supports uncontrolled (`defaultExpanded`) and controlled (`expanded` + `onExpandedChange`) modes, clamps closed content to 75px, and rotates a chevron `IconButton` to indicate state. Use it for FAQs, truncated descriptions, or footnotes.

---

## Import

### Component
```ts
import { ExpandableContent } from '@eventz-ui/core/client/ExpandableContent';
```

### Types

```ts
import type { ExpandableContentProps } from '@eventz-ui/core/client/ExpandableContent';
```

---

## Usage

```tsx
<ExpandableContent { ...props }>{children}</ExpandableContent>
```

---

## Props (Declared + Inherited)

| Prop               | Type                     | Default | Required | Notes |
| ------------------ | ------------------------ | ------: | :------: | ----- |
| `className`        | `string`                 |         |          | Appends utility classes to the root container.
| `defaultExpanded`  | `boolean`                |   `false` |          | Sets the initial collapsed/expanded state when uncontrolled.
| `expanded`         | `boolean`                |         |          | Controls the state externally; pair with `onExpandedChange`.
| `onExpandedChange` | `(expanded: boolean) => void` |         |          | Called whenever the user toggles the chevron button.

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus `children`.
* **Forwards:** Additional div attributes (`id`, `aria-label`, etc.).

---

## Structure

* **content** — `<div>` with `data-state="open" | "closed"`; clamps height and line count when closed and animates `max-height` on toggle.
* **control** — Wrapper containing an `IconButton` (ChevronDown). The button toggles `expanded` and carries `aria-expanded`, `aria-controls` linking to the content id.

> DOM structure sketch:

```jsx
<div>
  <div id={contentId} data-state={expanded ? 'open' : 'closed'}>
    {children}
  </div>
  <div>
    <IconButton
      aria-expanded={expanded}
      aria-controls={contentId}
      ariaLabel="Toggle expanded content"
      icon={<KeyboardArrowDownIcon />}
      onClick={handleToggle}
      variant="knockout"
    />
  </div>
</div>
```

---

## Data Attributes & States

| State flag               | Effect |
| ------------------------ | ------ |
| `data-state="closed"`   | Sets `max-height: 75px`, applies `line-clamp`, and keeps the chevron pointing down.
| `data-state="open"`     | Removes clamps, animates to full height, and rotates the chevron 180°.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `content` | `peer` `overflow-hidden` `data-[state=closed]:mh-18.75` `data-[state=closed]:line-clamp-3` `transition-[max-height]` `duration-200` `ease-in-out` `text-color-content-weak` `text-sm` |
| `control` | `flex` `justify-center` `pt-4` `[&>button]:transition-transform` `peer-data-[state=open]:[&>button]:rotate-180` `peer-data-[state=closed]:[&>button]:rotate-0` |

---

## Accessibility

* **Name:** The IconButton includes `ariaLabel="Toggle expanded content"`; feel free to override via props for more context.
* **Keyboard:** The IconButton is focusable; Space/Enter toggles the content while preserving focus.
* **Roles/States:** The content region exposes `data-state` and receives `aria-controls` from the button; add `aria-live` externally if you need announcements when the content changes.
* **Announcements:** Because the text remains in the DOM even when clamped, screen readers can still read it; consider wrapping long sections in `<p>` tags for better pauses.
* **Icon-only pattern:** The chevron is decorative (`aria-hidden="true"`); ensure the button’s label remains descriptive.
