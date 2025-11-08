# DatePicker
*Type: client* | *Base: div* | *Last updated: 2025-11-08*

## Overview
DatePicker wraps RSuite's `DateRangePicker`, replaces the visible trigger with the design-system `Input`, and scopes the popup portal to a stable wrapper so styles and tests can target predictable DOM. It supports both controlled and uncontrolled `value`/`open` flows, injects responsive defaults (single calendar below `lg`, dual calendars otherwise), and preloads desktop shortcuts plus localized copy. Reach for it when you need RSuite's calendar ergonomics without wiring the picker and trigger plumbing yourself.

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

> - Pair `value`/`onChange` (and optionally `open`/`onOpen`/`onClose`) for controlled flows; otherwise rely on `defaultValue`/`defaultOpen`.
> - Customize placeholder text, icons, or `aria-label` via `InputProps`, but DatePicker still owns the click/keydown handlers on the trigger.

---

## Props (Declared + Inherited)

Props are alphabetized and merge DatePicker's layout props with RSuite's `DateRangePickerProps` surface (minus pinned keys such as `appearance`, `block`, `caretAs`, `className`, `disabledDate`, `editable`, `format`, `label`, `placeholder`, `renderValue`, `showHeader`, `showOneCalendar`, and `size`). DOM attributes are excluded except for the wrapper's `className`/`style`.

| Prop | Type | Default | Required | Notes |
| --- | --- | ---: | :---: | --- |
| `as` | `React.ElementType` |  |  | Forwarded to RSuite so the internal picker can swap its host element (the outer wrapper always stays a `div`). |
| `calendarSnapping` | `boolean` | `false` |  | Keeps the start date anchored to the left calendar even if a user begins selection on the right calendar. |
| `character` | `string` | `''` |  | DatePicker forces an empty separator so the visible Input fully controls how the range is rendered. |
| `children` | `React.ReactNode` |  |  | Accepted by RSuite but ignored because DatePicker renders and controls its own trigger. |
| `className` | `string` |  |  | Appended to the wrapper in addition to the generated token classes. |
| `classPrefix` | `string` |  |  | Overrides RSuite's internal class prefix if you need to scope portal styles. |
| `cleanable` | `boolean` |  |  | Toggles RSuite's clear button; it is still disabled when the wrapper is disabled. |
| `container` | `HTMLElement | (() => HTMLElement)` | `wrapperRef.current ?? document.body` |  | Always overridden so the popup portal stays scoped to the wrapper for styling and tests. |
| `containerPadding` | `number` |  |  | Insets the popup from the viewport edges when RSuite positions it. |
| `defaultCalendarValue` | `[Date, Date]` |  |  | Controls the initial month pair the calendars show on first open. |
| `defaultOpen` | `boolean` | `false` |  | Initial open state when leaving `open` uncontrolled. |
| `defaultValue` | `[Date, Date] | null` | `null` |  | Initial range when DatePicker owns `value`. |
| `disabled` | `boolean` |  |  | Disables the Input trigger, prevents toggling, and forwards to RSuite. |
| `format` | `string` | `'MM/dd/yyyy'` |  | Forwarded to RSuite for parsing/rendering and mirrored in the Input display string. |
| `fullWidth` | `boolean` | `false` |  | Adds the `w-full` layout token to stretch the wrapper horizontally. |
| `hideHours` | `(hour: number, date: Date) => boolean` |  |  | Return `true` to hide specific hour options when the time panel is visible. |
| `hideMinutes` | `(minute: number, date: Date) => boolean` |  |  | Return `true` to hide specific minute options. |
| `hideSeconds` | `(second: number, date: Date) => boolean` |  |  | Return `true` to hide specific second options. |
| `hoverRange` | `'week' | 'month' | ((date: Date) => [Date, Date])` |  |  | Lets RSuite derive preset ranges from the hovered date for one-tap selection. |
| `id` | `string` |  |  | Applied to RSuite's hidden input so external `<label htmlFor>` connections continue working. |
| `InputProps` | `Partial<InputProps>` | `{ placeholder: 'Select a date range', endIcon: <ArrowDropDownIcon aria-hidden="true" /> }` |  | Merged into the visible Input trigger; DatePicker still overrides readOnly, events, and accessibility props. |
| `isoWeek` | `boolean` |  |  | Switches the calendars to ISO week numbering (weeks start on Monday). |
| `limitEndYear` | `number` | `1000` |  | Maximum number of years users can browse forward relative to the current selection. |
| `limitStartYear` | `number` |  |  | Maximum number of years users can browse backward relative to the current selection. |
| `loading` | `boolean` |  |  | Shows RSuite's loading indicator in the popup header. |
| `locale` | `Partial<DateRangePickerLocale>` | `{ ok: 'Apply' }` |  | Runtime injects this locale to pin the OK label; custom locales are currently ignored. |
| `menuAutoWidth` | `boolean` |  |  | If true, forces the popup width to match the trigger width. |
| `menuClassName` | `string` |  |  | Adds custom classes to the popup surface rendered by RSuite. |
| `menuMaxHeight` | `number` |  |  | Caps the popup height before scrolling. |
| `menuStyle` | `React.CSSProperties` |  |  | Inline styles forwarded to the popup element. |
| `monthDropdownProps` | `MonthDropdownProps` |  |  | Configures the optional month dropdown (item renderer, class names, virtualization). |
| `name` | `string` |  |  | Forwarded to the hidden input so native form submissions include the value. |
| `onBlur` | `React.FocusEventHandler<any>` |  |  | Fires when the trigger Input loses focus. |
| `onChange` | `(value: [Date, Date] | null, event?: React.SyntheticEvent | Event) => void` |  |  | Called after the range changes; DatePicker normalizes the payload to `[Date, Date] | null`. |
| `onClean` | `(event: React.MouseEvent) => void` |  |  | Called when RSuite's clear action is triggered. |
| `onClose` | `(event?: React.SyntheticEvent | Event) => void` |  |  | Runs whenever the popup closes (controlled or uncontrolled). |
| `onEnter` | `(node: HTMLElement) => void` |  |  | Animation callback fired before the popup finishes entering. |
| `onEntered` | `(node: HTMLElement) => void` |  |  | Animation callback fired after the popup enters. |
| `onEntering` | `(node: HTMLElement) => void` |  |  | Animation callback fired as the popup begins to enter. |
| `onExit` | `(node: HTMLElement) => void` |  |  | Animation callback fired before the popup finishes exiting. |
| `onExited` | `(node: HTMLElement) => void` |  |  | Animation callback fired after the popup exits. |
| `onExiting` | `(node: HTMLElement) => void` |  |  | Animation callback fired as the popup begins to exit. |
| `onFocus` | `React.FocusEventHandler<any>` |  |  | Fires when the trigger Input receives focus. |
| `onOk` | `(value: [Date, Date], event: React.SyntheticEvent) => void` |  |  | Called when the RSuite OK action is clicked. |
| `onOpen` | `(event?: React.SyntheticEvent | Event) => void` |  |  | Runs whenever the popup opens (controlled or uncontrolled). |
| `onSelect` | `(date: Date, event?: React.SyntheticEvent) => void` |  |  | Called as individual dates are selected inside the calendar. |
| `onShortcutClick` | `(range: RangeType<[Date, Date]>, event: React.MouseEvent) => void` |  |  | Called when a predefined shortcut range is clicked. |
| `oneTap` | `boolean` |  |  | Allows users to select a full range with a single tap when combined with `hoverRange`. |
| `open` | `boolean` |  |  | Controls popup visibility; pair with `onOpen`/`onClose`. |
| `placement` | `TypeAttributes.Placement` |  |  | Positions the RSuite popup (e.g., `bottomStart`, `topEnd`, or one of the `auto*` placements). |
| `plaintext` | `boolean` |  |  | Renders the picker in read-only/plain-text mode. |
| `preventOverflow` | `boolean` |  |  | Prevents the popup from overflowing the viewport by flipping placement when needed. |
| `ranges` | `RangeType<[Date, Date]>[]` | `desktop presets; [] in single-calendar mode` |  | DatePicker overrides this prop: desktop mode injects Today/Tomorrow/Next 7 Days, while one-calendar mode passes an empty array. |
| `readOnly` | `boolean` |  |  | Marks the picker as read-only while keeping it focusable. |
| `renderCell` | `(date: Date) => React.ReactNode` |  |  | Custom renderer for individual calendar cells. |
| `renderExtraFooter` | `() => React.ReactNode` |  |  | Renders custom footer content beneath the calendars. |
| `renderTitle` | `(date: Date, calendarKey: 'start' | 'end') => React.ReactNode` |  |  | Custom renderer for each calendar's title. |
| `shouldDisableDate` | `(date: Date, selected?: [Date?, Date?], selectedDone?: boolean, target?: string) => boolean` |  |  | Return `true` to disable specific dates. |
| `shouldDisableHour` | `(hour: number, date: Date) => boolean` |  |  | Return `true` to disable an hour in the time view. |
| `shouldDisableMinute` | `(minute: number, date: Date) => boolean` |  |  | Return `true` to disable a minute in the time view. |
| `shouldDisableSecond` | `(second: number, date: Date) => boolean` |  |  | Return `true` to disable a second in the time view. |
| `showHeader` | `boolean` |  |  | If omitted, DatePicker hides the RSuite header below `lg` and shows it at `lg` and above. |
| `showMeridian` | `boolean` |  |  | Deprecated alias for `showMeridiem`; kept for RSuite compatibility. |
| `showMeridiem` | `boolean` |  |  | Shows 12-hour clock markers when the time panel is enabled. |
| `showOneCalendar` | `boolean` |  |  | If omitted, DatePicker defaults to one calendar below `lg` and two calendars at/above `lg`. |
| `showWeekNumbers` | `boolean` |  |  | Displays ISO week numbers in the calendar grid. |
| `style` | `React.CSSProperties` |  |  | Inline styles applied to the wrapper `div`. |
| `toggleAs` | `React.ElementType` |  |  | Customizes RSuite's hidden toggle button (rare because the visible trigger is an Input). |
| `value` | `[Date, Date] | null` | `null` |  | Controlled range value; pair with `onChange`. |
| `weekStart` | `0 | 1 | 2 | 3 | 4 | 5 | 6` | `0` |  | Index of the first day of the week unless `isoWeek` is true. |

* **Extends:** `DateRangePickerProps` minus: `appearance`, `block`, `caretAs`, `className`, `disabledDate`, `editable`, `format`, `label`, `placeholder`, `renderValue`, `showHeader`, `showOneCalendar`, `size`; DatePicker reintroduces `className`, `format`, `showHeader`, `showOneCalendar`, and adds layout/trigger seams (`fullWidth`, `InputProps`).
* **Forwards:** Non-modeled props pass directly to RSuite's `DateRangePicker`; the wrapper `div` only exposes `className`, `style`, and data attributes.

---

## Structure

* **container** — outer wrapper; hosts the Input trigger, receives forwarded `className`/`style`, and scopes the portal for RSuite.
* **RSuite panel (internal)** — rendered by `DateRangePicker`, scoped via `.dxyz-date-picker` for downstream CSS.

> DOM structure sketch:

```txt
<div data-slot="container" data-show-one-calendar="true|undefined">
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

* **Name:** Provided by surrounding `<label>` elements or `InputProps.aria-label`; supply explicit text when the placeholder is not descriptive.
* **Keyboard:** `Tab` focuses the Input, `Enter`/`ArrowDown` open the popup (native text-field actions are prevented), and `Esc`/RSuite close controls dismiss the dialog.
* **Roles/States:** The trigger sets `aria-haspopup="dialog"` and `aria-expanded`; RSuite renders a focus-trapped dialog with the correct roles.
* **Announcements:** Rely on RSuite's internal aria-live updates for selection changes, or render status text via `renderExtraFooter` for custom narration.
* **Icon-only pattern:** Provide a non-empty `InputProps.aria-label` when the trigger lacks visible text and keep decorative icons `aria-hidden="true"`.

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
  onChange={next => setRange(next)}
  onOpen={() => setOpen(true)}
  onClose={() => setOpen(false)}
/>
```

### Custom trigger copy with disabled dates

```tsx
<DatePicker
  showOneCalendar
  InputProps={{ placeholder: 'Pick travel dates', 'aria-label': 'Select travel window' }}
  shouldDisableDate={date => date < new Date()}
  shouldDisableHour={hour => hour < 8}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK** (runtime adds `data-show-one-calendar` purely for responsive styling)
* Signature hash: `f2e4c1ff2b6a28a4823d7d2496846580e431bb82058296a6e5a9739993c24dac`

---

## Changelog

| Date | Changes |
| --- | --- |
| 2025-11-08 | Regenerated README and parity hash from runtime + blueprint. |
