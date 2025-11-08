# DatePicker
*Type: client* | *Base: div* | *Last updated: 2025-11-08*

## Overview
DatePicker wraps RSuite's `DateRangePicker`, replaces the visible trigger with the design-system `Input`, and keeps the popup portal scoped to the wrapper so styles and tests can target a stable DOM subtree. It supports both controlled and uncontrolled `value`/`open` flows, injects responsive defaults (single calendar below `lg`, dual calendars otherwise), and pins a custom locale/button copy to keep copy consistent. Use it when you need a date-range control that feels native to DoXYZ tokens without wiring RSuite manually.

---

## Import

### Component
```ts
import { DatePicker } from '@doxyz-ui/core/client/DatePicker';
```

### Types

```ts
import type { DatePickerProps } from '@doxyz-ui/core/client/DatePicker';
```

---

## Usage

```tsx
<DatePicker {...props} />
```

> - Use `defaultValue`/`defaultOpen` for uncontrolled flows or pair `value`/`open` with the corresponding callbacks for full control.
> - Override the visible trigger via `InputProps` (placeholder, icons, aria-label); DatePicker still owns `onClick`/`onKeyDown`.

---

## Props (Declared + Inherited)

Props are alphabetized and combine DatePicker's own API with the RSuite `DateRangePickerProps` surface (minus pinned keys); DOM attributes are excluded except for the wrapper's `className`.

| Prop | Type | Default | Required | Notes |
| --- | --- | ---: | :---: | --- |
| `InputProps` | `Partial<InputProps>` | `{ placeholder: 'Select a date range', endIcon: <ArrowDropDownIcon aria-hidden="true" /> }` |  | Merged into the visible `Input` trigger before DatePicker applies its own a11y and event handlers. |
| `as` | `React.ElementType` |  |  | Forwards to RSuite so the internal picker can render with a custom wrapper; the outer div always stays a `div`. |
| `calendarSnapping` | `boolean` |  |  | Keeps the start date anchored to the left calendar even if a user begins on the right calendar (RSuite v5.69+). |
| `character` | `string` | `''` |  | Forced to an empty string so the read-only `Input` controls how the selected range is rendered. |
| `children` | `React.ReactNode` |  |  | Accepted by RSuite but ignored by this wrapper because it renders its own trigger. |
| `className` | `string` |  |  | Appended to the outer wrapper alongside the generated token classes. |
| `classPrefix` | `string` |  |  | Overrides RSuite's internal class prefix if you need to target its portal contents. |
| `cleanable` | `boolean` |  |  | Toggles RSuite's clear button; still disabled if the wrapper itself is disabled. |
| `container` | `HTMLElement \| (() => HTMLElement)` | `wrapperRef.current ?? document.body` |  | Always overridden so the popup mounts inside the component wrapper for styling; consumer containers are ignored. |
| `containerPadding` | `number` |  |  | Insets the popup from the viewport edges when RSuite positions it. |
| `defaultCalendarValue` | `DateRange` |  |  | Controls which month pair RSuite displays when the popup first opens. |
| `defaultOpen` | `boolean` |  |  | Sets the initial open state for uncontrolled usage (component otherwise starts closed). |
| `defaultValue` | `DateRange \| null` |  |  | Supplies the initial value when letting DatePicker manage the range. |
| `disabled` | `boolean` |  |  | Disables the trigger `Input`, prevents opening, and forwards to RSuite. |
| `format` | `string` | `'MM/dd/yyyy'` |  | String passed to RSuite for parsing/rendering and mirrored in the trigger display. |
| `fullWidth` | `boolean` | `false` |  | Applies the `w-full` layout token to stretch the wrapper horizontally. |
| `hideHours` | `(hour: number, date: Date) => boolean` |  |  | Return `true` to suppress specific hours whenever the time panel renders. |
| `hideMinutes` | `(minute: number, date: Date) => boolean` |  |  | Return `true` to suppress specific minutes. |
| `hideSeconds` | `(second: number, date: Date) => boolean` |  |  | Return `true` to suppress specific seconds. |
| `hoverRange` | `'week' \| 'month' \| ((date: Date) => DateRange)` |  |  | Lets RSuite derive preset ranges from the hovered date for one-tap selection. |
| `id` | `string` |  |  | Applied to RSuite's hidden input so external `<label htmlFor>` associations continue working. |
| `isoWeek` | `boolean` |  |  | Switches calendars to ISO week numbering (weeks start on Monday). |
| `limitEndYear` | `number` |  |  | Caps how far into the future users can browse relative to the current selection. |
| `limitStartYear` | `number` |  |  | Caps how far into the past users can browse relative to the current selection. |
| `loading` | `boolean` |  |  | Shows RSuite's loading indicator in the popup header. |
| `locale` | `Partial<DateRangePickerLocale>` | `{ ok: 'Apply' }` |  | Runtime injects a minimal locale overriding the OK label; custom locales are currently ignored. |
| `menuAutoWidth` | `boolean` |  |  | Forces the popup width to match the trigger width. |
| `menuClassName` | `string` |  |  | Adds classes to the popup surface for further styling. |
| `menuMaxHeight` | `number` |  |  | Defines the popup's max height in pixels. |
| `menuStyle` | `React.CSSProperties` |  |  | Inline styles applied to the popup element rendered by RSuite. |
| `monthDropdownProps` | `MonthDropdownProps` |  |  | Forwards props to the calendar's month dropdown control. |
| `name` | `string` |  |  | Sets the hidden input's form field name for form submissions. |
| `onBlur` | `React.FocusEventHandler<any>` |  |  | Called when the RSuite picker loses focus. |
| `onChange` | `(value: DateRange \| null, event: React.SyntheticEvent) => void` |  |  | Fired whenever the date range changes; receives `null` when cleared. |
| `onClean` | `(event: React.MouseEvent) => void` |  |  | Fired after RSuite's clear action removes the current value. |
| `onClose` | `() => void` |  |  | Called after the popup closes (fires even if DatePicker triggered the close). |
| `onEnter` | `(node: HTMLElement) => void` |  |  | Animation callback fired before the popup transitions in. |
| `onEntered` | `(node: HTMLElement) => void` |  |  | Animation callback fired after the popup finishes entering. |
| `onEntering` | `(node: HTMLElement) => void` |  |  | Animation callback fired as the popup begins to enter. |
| `onExit` | `(node: HTMLElement) => void` |  |  | Animation callback fired before the popup exits. |
| `onExited` | `(node: HTMLElement) => void` |  |  | Animation callback fired after the popup finishes exiting. |
| `onExiting` | `(node: HTMLElement) => void` |  |  | Animation callback fired while the popup is exiting. |
| `onFocus` | `React.FocusEventHandler<any>` |  |  | Called when the RSuite picker gains focus. |
| `onOk` | `(date: DateRange, event: React.SyntheticEvent) => void` |  |  | Fired when RSuite's OK action confirms a range. |
| `onOpen` | `() => void` |  |  | Called whenever the popup opens (both controlled and uncontrolled cases). |
| `onSelect` | `(date: Date, event?: React.SyntheticEvent) => void` |  |  | Fired after the user selects a specific date cell. |
| `onShortcutClick` | `(range: RangeType, event: React.MouseEvent) => void` |  |  | Fires when a shortcut range is chosen; useful if you need analytics. |
| `oneTap` | `boolean` |  |  | Let users confirm a range with a single click coupled with `hoverRange`. |
| `open` | `boolean` |  |  | Controls the popup's visibility when paired with `onOpen`/`onClose`; otherwise the component manages it internally. |
| `placement` | `TypeAttributes.Placement` |  |  | Sets the popup placement relative to the trigger (falls back to RSuite default). |
| `plaintext` | `boolean` |  |  | Renders the value as plain text rather than an interactive picker. |
| `preventOverflow` | `boolean` |  |  | Stops the popup from overflowing the viewport boundaries. |
| `ranges` | `RangeType[]` | `Today/Tomorrow/Next 7 Days (desktop), [] (mobile)` |  | Runtime injects curated shortcut ranges on desktop and suppresses them on single-calendar/mobile mode; consumer-provided ranges are overwritten. |
| `readOnly` | `boolean` |  |  | Keeps the picker interactive but renders the trigger as read-only text. |
| `renderCell` | `(date: Date) => React.ReactNode` |  |  | Customizes the content rendered inside each date cell. |
| `renderExtraFooter` | `() => React.ReactNode` |  |  | Adds custom footer content beneath the calendars. |
| `renderTitle` | `(date: Date, calendarKey: 'start' \| 'end') => React.ReactNode` |  |  | Replaces the default calendar header rendering. |
| `shouldDisableDate` | `DisabledDateFunction` |  |  | Return `true` to disable specific dates. |
| `shouldDisableHour` | `(hour: number, date: Date) => boolean` |  |  | Return `true` to disable hours in the time picker. |
| `shouldDisableMinute` | `(minute: number, date: Date) => boolean` |  |  | Return `true` to disable minutes in the time picker. |
| `shouldDisableSecond` | `(second: number, date: Date) => boolean` |  |  | Return `true` to disable seconds in the time picker. |
| `showHeader` | `boolean` | `< lg: true, >= lg: false` |  | Defaults to visible below `lg` and hidden at/above `lg`; pass an explicit boolean to override. |
| `showMeridian` | `boolean` |  |  | Deprecated RSuite prop that still forwards through for compatibility. |
| `showMeridiem` | `boolean` |  |  | Enables AM/PM display in the time picker. |
| `showOneCalendar` | `boolean` | `< lg: true, >= lg: false` |  | Controls whether RSuite renders one or two calendars; responsive by default. |
| `showWeekNumbers` | `boolean` |  |  | Displays ISO week numbers in the calendar grid. |
| `style` | `React.CSSProperties` |  |  | Inline styles applied to the RSuite picker element (not the outer wrapper). |
| `toggleAs` | `React.ElementType` |  |  | Overrides the element used for RSuite's internal toggle button. |
| `value` | `DateRange \| null` | `null` |  | Controlled range value; pass `null` to clear both dates. |
| `weekStart` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` |  | Sets which weekday (0 = Sunday) starts the calendar grid when `isoWeek` is false. |

* **Extends:** `DateRangePickerProps` minus: `appearance`, `block`, `caretAs`, `className`, `disabledDate`, `editable`, `format`, `label`, `placeholder`, `renderValue`, `showHeader`, `showOneCalendar`, `size`; plus DatePicker-specific props for layout and trigger control.
* **Forwards:** Does not forward arbitrary `<div>` attributes; interact via the documented picker props and `InputProps`.

---

## Structure

* **container** - root `<div>` that scopes styling, owns the trigger, and hosts the portal container.
* **trigger input** - design-system `Input` rendered inside the container; receives merged `InputProps` and exposes the value read-only.
* **RSuite portal** - `DateRangePicker` attaches to `container` via a ref and renders its popup just inside the wrapper (falls back to `document.body` until the ref exists).

> DOM structure sketch:

```txt
<div data-slot="container" data-show-one-calendar="true|false">
  <Input ... />
  <DateRangePicker portal />
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| --- | --- |
| `data-show-one-calendar="true"` | Signals single-calendar/mobile mode so CSS can adjust toolbar layout and hide shortcut buttons. |

---

## Classes

| Data slot | Classes |
| --- | --- |
| `container` | `relative` `dxyz-date-picker` |
| `container (fullWidth=true)` | `relative` `dxyz-date-picker` `w-full` |

---

## Accessibility

* **Name:** The visible `Input` exposes the name via surrounding `<label>` elements or `InputProps.aria-label`; provide explicit labeling whenever the placeholder is not descriptive enough.
* **Keyboard:** `Tab` moves focus to the trigger, `Enter`/`ArrowDown` open the popup (DatePicker calls `preventDefault()` to avoid native text-field behavior), and `Esc`/RSuite close controls dismiss it.
* **Roles/States:** The trigger sets `aria-haspopup="dialog"` and `aria-expanded`; RSuite renders a proper dialog with focus trapping and status messaging.
* **Announcements:** Rely on RSuite's internal aria-live updates for selection feedback; add your own status region inside `renderExtraFooter` if you need custom narration.
* **Icon-only pattern:** Supply a non-empty `InputProps.aria-label` whenever the trigger lacks visible text and keep decorative icons `aria-hidden="true"`.

---

## Patterns & Examples

### Responsive defaults

```tsx
<DatePicker defaultValue={[new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]} />
```

### Controlled range and open state

```tsx
const [range, setRange] = React.useState<[Date, Date] | null>(null);
const [open, setOpen] = React.useState(false);

<DatePicker
  value={range}
  open={open}
  onChange={(next) => setRange(next)}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
/>
```

### Mobile-friendly single calendar with custom trigger

```tsx
<DatePicker
  showOneCalendar
  fullWidth
  InputProps={{ placeholder: 'Pick travel dates', endIcon: <ArrowDropDownIcon aria-hidden="true" /> }}
  shouldDisableDate={(date) => date < new Date()}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK** (runtime adds `data-show-one-calendar` purely for responsive styling)
* Signature hash: `642db36cc97ca9ff882a19b1d2af01c4399ba2fcd4289058d0d20cf6350b252c`

---

## Changelog

| Date | Changes |
| --- | --- |
| 2025-11-08 | Regenerated README and parity hash from runtime + blueprint. |
