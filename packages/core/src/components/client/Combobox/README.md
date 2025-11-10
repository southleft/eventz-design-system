# Combobox
*Type: client* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
Combobox is a multi-select text input that renders chips for the active selections and opens a suggestion list inside a Radix Popover. It handles both controlled and uncontrolled selection/open state, includes optional start/end icons, and forwards FormElement props for labeling. Use it anywhere you need a compact, filter-style picker that keeps selections visible directly in the field.

---

## Import

### Component
```ts
import { Combobox } from '@doxyz-ui/core/client/Combobox';
```

### Types

```ts
import type { ComboboxProps } from '@doxyz-ui/core/client/Combobox';
```

---

## Usage

```tsx
<Combobox { ...props } />
```

---

## Props (Declared + Inherited)

| Prop                    | Type                              |       Default | Required | Notes                                                                                   |
| ----------------------- | --------------------------------- | ------------: | :------: | --------------------------------------------------------------------------------------- |
| `FormElementProps`      | `FormElementProps`                |             – |          | Pass-through props for the surrounding `FormElement` (labels, hint, error, asChild).    |
| `defaultOpen`           | `boolean`                         |        `false` |          | Sets the initial popover state for uncontrolled use.                                    |
| `defaultSelectedIds`    | `string[]`                        |            `[]` |          | Seeds uncontrolled selection before the user interacts.                                 |
| `disabled`              | `boolean`                         |        `false` |          | Prevents opening the popover and disables chips/clear-all controls.                     |
| `endIcon`               | `React.ReactNode`                 |   `CloseIcon` |          | Optional override for the clear-all icon (also used as the decorative end icon).        |
| `items`                 | `ComboboxOption[]`                |            `[]` |          | Data backing the MenuItem list; each entry must include an id and label.                |
| `menuItemBorderBottom`  | `boolean`                         | `menuItemType === 'simple'` |          | Controls dividers under every MenuItem; defaults on for simple rows, off for complex.   |
| `menuItemType`          | `'simple' \| 'complex'`           |      `'simple'` |          | Selects the MenuItem presentation applied to every row.                                 |
| `onOpenChange`          | `(open: boolean) => void`         |             – |          | Fires whenever the popover open state changes (controlled mode).                        |
| `onSelectionChange`     | `(selectedIds: string[]) => void` |             – |          | Emits the new ordered set of selected ids after toggles, dismiss, or clear-all.         |
| `open`                  | `boolean`                         |             – |          | Controlled open state for the Popover list.                                             |
| `placeholder`           | `string`                          |             – |          | Read-only input placeholder shown only when no chips exist.                             |
| `selectedIds`           | `string[]`                        |             – |          | Controlled selection list; pair with `onSelectionChange`.                               |
| `showEndIcon`           | `boolean`                         |        `false` |          | Toggles rendering of the clear-all button/end icon affordance.                          |
| `startIcon`             | `React.ReactNode`                 |             – |          | Optional leading icon rendered before the chips/input.                                  |

* **Extends:** None
* **Forwards:** None; the root `<div>` is managed internally.

---

## Structure

* **container (`div`)** — wraps the entire control, applies disabled/selection state data attributes.
* **anchor (`div[data-slot="anchor"]`)** — positioning hook for Radix `Popover.Anchor`.
* **FormElement / field (`ComboboxField`)** — flex container that wraps start icon, chips, clear-all button, input, and optional end icon.
* **chips (`[data-slot="chips"]`)** — presents the current selections as removable chips.
* **chip / chipDismiss** — each chip contains a dismiss button to remove a single id.
* **clearAll (`button[data-role="clear-all"]`)** — optional clear-all control shown when `showEndIcon` and there is a selection.
* **input (`[data-slot="input"]`)** — read-only combobox input that toggles the popover; receives ARIA wiring.
* **panel (`[data-slot="panel"]`)** — Radix `Popover.Content` containing the listbox.
* **empty (`[data-slot="empty"]`)** — empty state message when `items` is empty.
* **menuItem (`[data-slot="menuItem"]`)** — each option row rendered via `MenuItem`.

> DOM structure sketch:

```txt
<div data-disabled? data-has-selection?>
  <Popover.Root>
    <div data-slot="anchor">
      <FormElement>
        <div data-slot="chips/input container">
          [startIcon] [chips] [clearAll] <input data-slot="input" />
          [endIcon]
        </div>
      </FormElement>
    </div>
    <div data-slot="panel" data-open?>
      [empty | menuItem*]
    </div>
  </Popover.Root>
</div>
```

---

## Data Attributes & States

| State flag            | Effect                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| `data-disabled="true"` (root, field) | Disables interactions, prevents opening, and reduces opacity.          |
| `data-has-selection="true"` (root)   | Fades in the clear-all affordance once at least one item is selected. |
| `data-open="true"` (panel)           | Displays the Popover content; hidden when `false`.                        |

---

## Classes

| Data slot / element | Classes |
| ------------------- | ------- |
| container           | `relative` `inline-block` `w-full` |
| anchor              | `relative` `inline-block` |
| panel               | `rounded-md` `border` `border-color-border-subtle` `z-50` `overflow-hidden` `ml-[14px]` `-mt-[28px]` `bg-color-background-default` `content-center` |
| empty               | `text-color-content-subtle` `text-xs` `px-2` `py-1.5` |
| value / field       | `flex` `flex-wrap` `items-center` `gap-1` `w-full` `py-(--spacing-1)` `px-(--spacing-2_5)` |
| clearAll            | `inline-flex` `items-center` `justify-center` `rounded-full` `border-0` `bg-background-none` `text-color-content-default` `focus-visible:outline-none` `focus-visible:ring-2` `focus-visible:ring-comp-border-focus-ring` `focus-visible:ring-offset-2` `focus-visible:ring-offset-color-background-default` `transition-opacity` `opacity-0` |
| chips               | `flex` `flex-wrap` `items-center` `gap-1` `py-0.5` |
| chip                | `inline-flex` `items-center` `gap-1` `rounded-xs` `border-0` `text-xs` `font-medium` `leading-[18px]` `bg-color-background-brand` `hover:bg-color-background-brand-hover` `text-color-content-inverse` `px-2` `h-22` `transition-colors` `group` `focus-visible:outline-none` `focus-visible:ring-2` `focus-visible:ring-comp-border-focus-ring` `focus-visible:ring-offset-[-4px]` |
| chipDismiss         | `inline-flex` `items-center` `justify-center` `rounded-full` `h-20` `w-20` `shrink-0` `border-0` `bg-color-background-brand` `group-hover:bg-color-background-brand-hover` `text-color-content-inverse` `focus-visible:ring-2` `focus-visible:ring-comp-border-focus-ring` `focus-visible:ring-offset-2` `focus-visible:ring-offset-color-background-default` |
| startIcon           | `shrink-0` `py-(--spacing-1_5)` `inline-flex` `text-color-content-default` |
| endIcon             | `shrink-0` `py-(--spacing-1_5)` `inline-flex` `text-color-content-default` |
| menuItem            | `w-full` |
| input               | `min-w-0` `flex-1` `bg-transparent` `outline-none` `border-0` `text-color-content-default` `placeholder:text-color-content-subtle` `focus:placeholder:opacity-0` `caret-transparent` `select-none` |

---

## Accessibility

* **Name:** Provided by `FormElementProps.label` or other FormElement labeling props; add `ariaLabel` in `FormElementProps` when rendering without visible text.
* **Keyboard:** Input is focusable; Space or Enter toggles the popover, Escape closes it and re-focuses the input, and Tab/Shift+Tab move focus out per normal flow. Chip dismiss buttons and clear-all are clickable via Enter/Space.
* **Roles/States:** Input declares `role="combobox"` with `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`, and `aria-autocomplete="none"`. The list uses `role="listbox"` with `aria-multiselectable` and each MenuItem row sets `role="option"` plus `aria-selected`.
* **Announcements:** Selection changes occur via focusable buttons; announce removals by ensuring chip dismiss buttons keep `aria-label="Remove {option}"`. Provide inline status text via FormElement hint/error if asynchronous changes need narration.
* **Icon-only pattern:** When using decorative start/end icons, set `aria-hidden="true"`; for a clear-all icon-only affordance, rely on its built-in `aria-label="Clear all selections"` string or override with your own accessible name.

---

## Patterns & Examples

### Filter Categories

```tsx
<Combobox
  FormElementProps={{ label: 'Categories', hint: 'Pick one or more topics.' }}
  items={[
    { id: 'artists', option: 'Artists' },
    { id: 'events', option: 'Events' },
    { id: 'venues', option: 'Venues' }
  ]}
  defaultSelectedIds={['artists']}
/>
```

### Controlled Selection

```tsx
const [selectedIds, setSelectedIds] = React.useState(['news']);

<Combobox
  items={[
    { id: 'news', option: 'News' },
    { id: 'guides', option: 'Guides' }
  ]}
  selectedIds={selectedIds}
  onSelectionChange={setSelectedIds}
  FormElementProps={{ label: 'Content types' }}
/>
```

### Start & End Icons

```tsx
<Combobox
  startIcon={<SearchIcon aria-hidden="true" />}
  showEndIcon
  placeholder="Search collections…"
  items={[
    { id: 'artists', option: 'Artists' },
    { id: 'venues', option: 'Venues' }
  ]}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
