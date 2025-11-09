# SelectionCard
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
SelectionCard is a focusable checkbox-style tile used in multi-select grids. It requires an icon and label, exposes `role="checkbox"` semantics, and toggles `data-selected` plus `aria-checked` when `isSelected` is true. Use it when you need lightweight selectable tiles without pulling in client interactivity—wire key handling or selection state at a higher level.

---

## Import

### Component
```ts
import { SelectionCard } from '@doxyz-ui/core/server/SelectionCard';
```

### Types

```ts
import type { SelectionCardProps } from '@doxyz-ui/core/server/SelectionCard';
```

---

## Usage

```tsx
<SelectionCard { ...props } />
```

> - The visible `label` is the accessible name; only pass `ariaLabel` for additional context.
> - Manage interaction (keyboard, selection toggles) externally while updating `isSelected`.

---

## Props (Declared + Inherited)

Only component-level props are listed; standard `<div>` attributes (other than `role`, `tabIndex`, `aria-checked`, `aria-label`) are forwarded automatically.

| Prop        | Type              | Default | Required | Notes                                                                                     |
| ----------- | ----------------- | ------- | :------: | ----------------------------------------------------------------------------------------- |
| `ariaLabel` | `string`          |         |          | Optional alternate accessible name; defaults to the visible `label`.                      |
| `className` | `string`          |         |          | Additional utility classes merged with the base tile tokens.                              |
| `icon`      | `React.ReactNode` |         |   Yes    | Required decorative node rendered in the 48×48 icon slot.                                 |
| `isSelected`| `boolean`         | `false` |          | Controls the selected visual state and sets `aria-checked`.                               |
| `label`     | `string`          |         |   Yes    | Visible text shown below the icon and used as the default accessible name.                |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`, `role`, `aria-checked`, `aria-label`, `tabIndex`
* **Forwards:** All other standard HTML attributes for `<div>` to the root element.

---

## Structure

* **icon** — Decorative wrapper containing the provided icon; marked `aria-hidden="true"`.
* **label** — Text span that truncates and inherits color changes when selected.

> DOM structure sketch:

```jsx
<div
  role="checkbox"
  tabIndex={0}
  aria-checked={isSelected}
  data-selected={isSelected ? 'true' : undefined}
>
  <div aria-hidden="true">{icon}</div>
  <div>{label}</div>
</div>
```

---

## Data Attributes & States

| State flag                | Effect                                                                 |
| ------------------------- | ---------------------------------------------------------------------- |
| `data-[selected=true]`    | Applies brand border/text color and syncs the label’s brand color.     |

---

## Classes

| Data slot | Classes                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`    | `w-[240px]` `inline-flex` `flex-col` `items-center` `justify-start` `gap-4` `py-8` `px-6` `rounded-lg` `bg-color-background-default` `py-32` `px-24` `focus-visible:ring-offset-color-background-default` `cursor-pointer` `select-none` `outline-none` `focus-visible:ring-2` `focus-visible:ring-comp-border-focus-ring` `focus-visible:ring-offset-2` `group` `text-color-content-default` `hover:text-color-content-default-hover` plus selected state tokens `border border-2 border-color-border-brand text-color-content-brand rounded-lg`. |
| `icon`    | `size-48` `shrink-0` `text-base` `[&>svg]:size-48`                                                                                                                                    |
| `label`   | `w-full` `text-center` `truncate` `group-data-[selected=true]:text-color-content-brand`                                                                                               |

---

## Accessibility

* **Name:** Defaults to the visible `label`; provide `ariaLabel` if you need a longer or more descriptive name.
* **Keyboard:** Because the root sets `role="checkbox"` and `tabIndex={0}`, keyboard interaction (`Space` toggles selection) should be managed by the parent composite; ensure you handle `onKeyDown` and `onClick` externally.
* **Roles/States:** `aria-checked` mirrors `isSelected`; reflect state in any higher-level controller as well.
* **Announcements:** Icons are `aria-hidden="true"` to avoid duplicate announcements.
* **Icon-only pattern:** Not applicable; cards always include a text label.

---

## Patterns & Examples

### Filter chooser

```tsx
<SelectionCard
  label="Audio"
  icon={<WaveIcon />}
  isSelected={filters.audio}
  onClick={() => toggleFilter('audio')}
/>
```

### Pseudo-radio grid

```tsx
<SelectionCard
  label="Monthly"
  icon={<CalendarIcon />}
  isSelected={billingCadence === 'monthly'}
  ariaLabel="Select monthly billing"
  onClick={() => setBillingCadence('monthly')}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `4769f29b61e748849b9dbed05a0d7c770f04c32bae8657bf6a5ccd12910a4ee3`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
