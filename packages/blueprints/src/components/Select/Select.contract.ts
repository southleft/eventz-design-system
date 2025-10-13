import { defineContract } from '../../utilities';

/**
 * Select — Unstyled composite built from Radix Select with an Input trigger (asChild)
 * and MenuItem options (asChild). Visuals come entirely from Input/MenuItem.
 */
export const SelectContract = defineContract({
  component: 'Select',
  description:
    'Unstyled composite Select: Radix Select + Input (Trigger asChild) + MenuItem (Item asChild). Visuals delegated to Input/MenuItem.',
  base: 'Select',

  props: {
    /** Controlled value (Radix Select Root passthrough). */
    value: { type: 'string', description: 'Controlled value.' },

    /** Uncontrolled initial value (Radix Select Root passthrough). */
    defaultValue: { type: 'string', description: 'Uncontrolled initial value.' },

    /** Fires when selection changes (Radix Select Root passthrough). */
    onValueChange: {
      type: 'callback',
      args: ['value: string'],
      description: 'Called when selection changes.'
    },

    /** Controlled open state (Radix Select Root passthrough). */
    open: { type: 'boolean', description: 'Controlled open state.' },

    /** Fires when open state changes (Radix Select Root passthrough). */
    onOpenChange: {
      type: 'callback',
      args: ['open: boolean'],
      description: 'Called when open state changes.'
    },

    /** Optional form field name (Radix Select Root passthrough). */
    name: { type: 'string', description: 'Form field name for submission.' },

    /** Disabled state (passed to Root and mirrored to Input trigger for visuals). */
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Disables the Select and the trigger Input.'
    },

    /**
     * Passthrough props to the Input trigger (rendered via RadixSelect.Trigger asChild).
     * Full Input functionality is allowed; Select does not guard/validate these.
     */
    InputProps: {
      type: 'object',
      default: {},
      description:
        'Passthrough props for the Input trigger (label, placeholder, startIcon, endIcon, info, hint, error, etc.).'
    },

    /**
     * Options list rendered as RadixSelect.Item asChild → MenuItem.
     * Each element minimally requires an `option` (string) used as the Radix `value`.
     * `isSelected` may be provided to force selection; otherwise we derive from current value.
     */
    options: {
      type: 'array',
      of: { type: 'object' },
      default: [],
      description:
        'Array of MenuItem props plus required `option` (string). Empty arrays render nothing.'
    }
  },

  /**
   * Structural slots (informational): we render an Input trigger and an options list.
   * No visual slots are defined here; visuals come from Input/MenuItem.
   */
  slots: ['trigger', 'options'] as const,

  /** styleMap exists but is intentionally empty at this stage. */
  styleMap: true,

  rules: [
    {
      validate: props =>
        !Array.isArray((props as any).options) ||
        (Array.isArray((props as any).options) &&
          (props as any).options.every(
            (o: any) => typeof o?.option === 'string' && o.option.trim().length > 0
          )),
      message: 'Each option must include a non-empty `option` string.'
    },
    {
      when: { disabled: true },
      hint: 'When disabled, also pass `disabled` to the Input trigger (merge with provided InputProps).'
    }
  ],

  hints: {
    radixAdapter: { uses: ['Select'] as const },
    a11y: 'Accessible name and icon semantics are delegated to Input/MenuItem; Select does not add ARIA beyond Radix.',
    structure: `
- Render <RadixSelect.Root {...rootProps}> supporting controlled (value/onValueChange) and uncontrolled (defaultValue).
- Prepare: const defaultInputProps = { endIcon: <KeyboardArrowDownIcon /> };
           const preparedInputProps = { ...defaultInputProps, ...InputProps, disabled };
- Trigger: <RadixSelect.Trigger asChild><Input {...preparedInputProps} /></RadixSelect.Trigger>.
  The arrow icon always points down (no rotation on open), and consumers can still override endIcon.
- Options: if options.length > 0, map to:
  <RadixSelect.Item asChild value={option}><MenuItem {...rest} isSelected={resolvedSelected} /></RadixSelect.Item>
  where resolvedSelected = option.isSelected ?? (currentValue === option).
- Do not render Select.ItemIndicator.
- No Select-specific styles; visuals come from Input/MenuItem.
- Portal/positioning: rely on Radix defaults; content should open below the trigger.
`
  }
});
