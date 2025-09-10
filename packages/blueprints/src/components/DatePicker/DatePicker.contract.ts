// packages/blueprints/src/components/DatePicker/DatePicker.contract.ts
import { defineContract } from '../../utilities';

export const DatePickerContract = defineContract({
  component: 'DatePicker',
  description:
    'Calendar-driven date picker. Uses Radix TextField as trigger and Radix Popover for the calendar. Calendar grid is provided by React DayPicker.',
  // Root wrapper is a Popover; generator will also import/use TextField internally.
  base: 'Popover',

  props: {
    // Mode: single date or range
    mode: {
      type: 'enum',
      options: ['single', 'range'] as const,
      default: 'single',
      description: 'Selection mode for the calendar'
    },

    // Visible field content
    label: { type: 'string', required: true, description: 'Field label' },
    placeholder: { type: 'string', required: false },
    helperText: { type: 'string', required: false },

    // Value (ISO-8601 strings, e.g., 2025-03-14). In range mode, use startValue/endValue.
    value: {
      type: 'string',
      required: false,
      description: 'Selected date (ISO yyyy-MM-dd) in single mode'
    },
    startValue: {
      type: 'string',
      required: false,
      description: 'Range start (ISO yyyy-MM-dd) in range mode'
    },
    endValue: {
      type: 'string',
      required: false,
      description: 'Range end (ISO yyyy-MM-dd) in range mode'
    },

    // Constraints
    minDate: {
      type: 'string',
      required: false,
      description: 'Minimum selectable date (ISO yyyy-MM-dd)'
    },
    maxDate: {
      type: 'string',
      required: false,
      description: 'Maximum selectable date (ISO yyyy-MM-dd)'
    },

    // Behavior
    closeOnSelect: {
      type: 'boolean',
      default: true,
      description: 'Close the popover when a selection is made (single mode default)'
    },
    allowTyping: {
      type: 'boolean',
      default: false,
      description: 'Allow manual typing in the TextField (parsed on blur)'
    },

    // Standard flags
    disabled: { type: 'boolean', default: false },
    readOnly: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },

    // Layout
    fullWidth: { type: 'boolean', default: false },

    // i18n / calendar options (forwarded to DayPicker)
    locale: { type: 'string', required: false, description: 'BCP-47 locale tag, e.g., en-US' },
    weekStartsOn: { type: 'number', required: false, description: '0 = Sunday … 6 = Saturday' },
    numberOfMonths: {
      type: 'number',
      required: false,
      description: 'Show multiple months in the grid'
    },
    showOutsideDays: {
      type: 'boolean',
      default: true,
      description: 'Render days from adjacent months'
    },
    fixedWeeks: { type: 'boolean', default: false, description: 'Pad weeks to a fixed row count' },

    // Composition
    asChild: { type: 'boolean', default: false }
  },

  // Render order for external slots
  slots: ['label', 'helperText', 'prefix', 'suffix'] as const,

  // Layout hint for generator (Popover + TextField + Calendar)
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col gap-1',
    children: [
      { slot: 'label', tag: 'label', className: 'text-comp-date-picker-label-color-foreground' },
      {
        // Trigger field (TextField) - generator composes Root/Slot/Input and binds native onChange
        type: 'container',
        tag: 'div',
        className: 'inline-flex items-center',
        children: [
          { slot: 'prefix', tag: 'span', className: 'shrink-0 -ml-0.5' },
          // The actual input is placed here by the generator (TextField.Input)
          { slot: 'suffix', tag: 'span', className: 'shrink-0 -mr-0.5' }
        ]
      },
      // Helper text under field
      { slot: 'helperText', tag: 'div', className: 'text-caption-md-regular' }
    ]
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const label = props['label'];
        return typeof label === 'string' && label.trim().length > 0;
      },
      message: 'label must be a non-empty string.'
    }
  ],

  styleMap: true,

  hints: {
    // Advisory – helps the generator import/compose the right primitives and DayPicker
    radixAdapter: {
      uses: ['TextField', 'Popover'] as const
    },
    dependencies: {
      npm: ['react-day-picker']
    },
    a11y: {
      recommendation:
        'Bind native onChange on the input. Reflect validation via aria-invalid when parsing fails, and link helperText via aria-describedby.'
    }
  }
});
