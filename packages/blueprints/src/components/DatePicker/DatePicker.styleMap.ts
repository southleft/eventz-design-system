// packages/blueprints/src/components/DatePicker/DatePicker.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const DatePickerStyleMap = defineStyleMap({
  // Wrapper (label + trigger + helper)
  base: ['flex flex-col gap-1'] as const,

  // Slots for field, popover surface, and calendar subparts.
  // The generator will map these to Radix TextField/Popover pieces and DayPicker classNames.
  slots: {
    container: [] as const,

    // Label & helper text
    label: ['text-comp-date-picker-label-color-foreground'] as const,
    helperText: ['text-comp-date-picker-helper-color-foreground'] as const,

    // Text input (trigger)
    input: [
      'h-10 w-full px-3 rounded-md outline-none transition-colors',
      'bg-comp-date-picker-input-color-background-default',
      'text-comp-date-picker-input-color-foreground-default',
      'placeholder:text-comp-date-picker-input-color-foreground-placeholder',
      'border',
      'border-comp-date-picker-input-color-border-default',
      'hover:bg-comp-date-picker-input-color-background-hover',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-date-picker-focus-color-ring',
      'focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      'read-only:bg-comp-date-picker-input-readonly-color-background'
    ] as const,

    // Popover surface
    popoverContent: [
      'rounded-md border p-2 shadow-md',
      'bg-comp-date-picker-surface-color-background',
      'border-comp-date-picker-surface-color-border'
    ] as const,

    // DayPicker structural hooks
    caption: ['text-comp-date-picker-caption-color-foreground', 'px-1', 'py-1'] as const,
    navPrev: [
      'text-comp-date-picker-nav-color-foreground',
      'hover:text-comp-date-picker-nav-color-foreground-hover'
    ] as const,
    navNext: [
      'text-comp-date-picker-nav-color-foreground',
      'hover:text-comp-date-picker-nav-color-foreground-hover'
    ] as const,

    weekdays: ['text-comp-date-picker-weekday-color-foreground'] as const,
    row: [] as const,
    cell: ['p-0.5'] as const,

    // Day button (default state)
    day: [
      'inline-flex h-9 w-9 items-center justify-center rounded-md outline-none transition-colors',
      'text-comp-date-picker-day-color-foreground-default',
      'hover:bg-comp-date-picker-day-color-background-hover',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-date-picker-focus-color-ring',
      'focus-visible:ring-offset-2'
    ] as const,

    footer: ['pt-2'] as const,

    // Optional prefix/suffix adornments on the TextField
    prefix: ['text-comp-date-picker-adornment-color-foreground'] as const,
    suffix: ['text-comp-date-picker-adornment-color-foreground'] as const
  },

  // Layout toggles
  layout: {
    fullWidth: ['w-full'] as const // wrapper; input slot already uses w-full
  },

  // No visual "variant" axis; states below cover selection/validation
  variants: {},

  // State classes — names match DayPicker modifiers and wrapper flags.
  // The generator should apply these via DayPicker's classNames/modifiersClassNames (for days)
  // and data attributes on the wrapper/input for validation/disabled/readOnly if needed.
  state: {
    // Day states (apply to the "day" slot)
    selected: [
      'bg-comp-date-picker-day-selected-color-background',
      'text-comp-date-picker-day-selected-color-foreground'
    ] as const,
    rangeStart: [
      'bg-comp-date-picker-day-selected-color-background',
      'text-comp-date-picker-day-selected-color-foreground',
      'rounded-l-md'
    ] as const,
    rangeMiddle: [
      'bg-comp-date-picker-day-range-color-background',
      'text-comp-date-picker-day-range-color-foreground'
    ] as const,
    rangeEnd: [
      'bg-comp-date-picker-day-selected-color-background',
      'text-comp-date-picker-day-selected-color-foreground',
      'rounded-r-md'
    ] as const,
    today: ['ring-1', 'ring-comp-date-picker-day-today-color-ring'] as const,
    outside: ['text-comp-date-picker-day-outside-color-foreground'] as const,
    disabled: [
      'text-comp-date-picker-day-disabled-color-foreground',
      'pointer-events-none',
      'opacity-50'
    ] as const,
    hidden: ['hidden'] as const,
    hovered: ['data-[hovered=true]:bg-comp-date-picker-day-hovered-color-background'] as const,
    focused: [
      'data-[focused=true]:ring-2',
      'data-[focused=true]:ring-comp-date-picker-focus-color-ring'
    ] as const,

    // Wrapper states (validation mirrors Input/Textarea pattern)
    invalid: [
      'data-[validation=invalid]:[&_input]:border-comp-date-picker-input-invalid-color-border',
      'data-[validation=invalid]:[&_input]:bg-comp-date-picker-input-invalid-color-background',
      'data-[validation=invalid]:[&_input]:text-comp-date-picker-input-invalid-color-foreground',
      'data-[validation=invalid]:[&_input]:focus-visible:ring-comp-date-picker-input-invalid-focus-color-ring'
    ] as const,
    valid: [
      'data-[validation=valid]:[&_input]:border-comp-date-picker-input-valid-color-border',
      'data-[validation=valid]:[&_input]:bg-comp-date-picker-input-valid-color-background',
      'data-[validation=valid]:[&_input]:text-comp-date-picker-input-valid-color-foreground',
      'data-[validation=valid]:[&_input]:focus-visible:ring-comp-date-picker-input-valid-focus-color-ring'
    ] as const
  }
});
