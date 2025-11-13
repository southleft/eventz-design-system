# SelectionCard
*Type: server* |
*Base: div* |
*Last updated: 2025-11-09*

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


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

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
| `base`    | `w-60` `inline-flex` `flex-col` `items-center` `justify-start` `gap-1` `py-2` `px-1.5` `rounded-lg` `bg-color-background-default` `py-8` `px-6` `focus-visible-brand` `cursor-pointer` `select-none` `outline-none` `group` `text-color-content-default` `hover:text-color-content-default-hover` |
| `icon`    | `size-12` `shrink-0` `text-base` `[&>svg]:size-12`                                                                                                                                    |
| `label`   | `w-full` `text-center` `truncate` `group-data-[selected=true]:text-color-content-brand`                                                                                               |
| `base (state: selected)` | `border` `border-0.5` `border-color-border-brand` `text-color-content-brand` `rounded-lg`                                                                               |

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
- Use SelectionCard instances inside a checkbox group when filters can be toggled independently.
- Reflect the card's state in external data (e.g., `filters.audio`) so visuals and logic stay synced.

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
- Pair `ariaLabel` with pricing cadence selectors so the spoken label is unambiguous.
- Treat `isSelected` as the single source of truth when modeling radio-style grids.

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
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
