import { defineContract } from '../../utilities';

/**
 * Select — Unstyled composite built from Radix Select with an Input trigger (asChild)
 * and MenuItem options (asChild). Visuals come from Input/MenuItem with a minimal
 * popup container treatment (viewport border/background) and default cursor on the trigger input.
 */
export const SelectContract = defineContract({
  component: 'Select',
  description:
    'Composite Select (Radix Select + Input trigger + MenuItem options). Visuals delegated to Input/MenuItem; popup viewport lightly styled.',
  base: 'Select',

  /** Props mirror Radix Select Root except where omitted below. */
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

    /** Disabled state (passed to Root and mirrored to the Input trigger for visuals). */
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Disables the Select and the trigger Input.'
    },

    /**
     * Passthrough props to the Input trigger (rendered via RadixSelect.Trigger asChild).
     * We omit `startIcon` by design; `endIcon` defaults to the down-chevron but can be overridden.
     */
    InputProps: {
      type: 'object',
      default: {},
      description:
        'Passthrough props for the Input trigger; identical to InputProps except `startIcon` is not accepted.'
    },

    /**
     * Options list rendered as RadixSelect.Item asChild → MenuItem.
     * Each element minimally requires an `option` (string) which we pass to Radix `value` and `textValue` (for typeahead).
     * `isSelected` may be provided to force selection; otherwise we derive from current value.
     */
    options: {
      type: 'array',
      of: { type: 'object' },
      default: [],
      description:
        'Array of MenuItem props plus required `option` (string). Used for Radix Item `value` & `textValue`. Empty arrays render nothing.'
    }
  },

  /**
   * Structural slots (informational): we render an Input trigger and an options list.
   * Visual slots include the popup viewport container.
   */
  slots: ['trigger', 'options', 'viewport'] as const,

  /** styleMap exists and encodes the trigger/viewport classes used by Select. */
  styleMap: true,

  /** Differences from Radix Root: we omit `dir`, `required`, `disabled`, and `children`. */
  omit: ['dir', 'required', 'disabled', 'children'],

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
      hint: 'When disabled, we pass `disabled` to Radix Root and also mirror it to the Input trigger via prepared InputProps.'
    }
  ],

  hints: {
    radixAdapter: { uses: ['Select'] as const },
    a11y: 'Accessible name/icon semantics are delegated to Input/MenuItem; Select does not add ARIA beyond Radix. The trigger is a readOnly input (combobox role) and items are `role="option"`.',
    structure: `
- Render <RadixSelect.Root {...rootProps}> supporting controlled (value/onValueChange) and uncontrolled (defaultValue).
- Prepare default trigger props: { endIcon: <KeyboardArrowDownIcon aria-hidden="true" />, type: 'text', readOnly: true }.
- Merge InputProps into the prepared props and mirror \`disabled\` to the trigger.
- Trigger: <RadixSelect.Trigger asChild><Input className={styleMap.trigger} {...preparedInputProps} /></RadixSelect.Trigger>.
  The arrow icon always points down (no rotation on open). Consumers may override \`endIcon\`.
- Options: if options.length > 0, map to:
  <RadixSelect.Item asChild value={option} textValue={option}><MenuItem {...rest} isSelected={resolved} /></RadixSelect.Item>
  where resolved = option.isSelected ?? (currentValue === option).
- Do not render Select.ItemIndicator; MenuItem handles its own selected visuals.
- Portal/positioning: use Content position="popper" side="bottom" align="start" sideOffset={6}.
  Apply styleMap.viewport to the Viewport. Limit height with \`maxHeight: var(--radix-select-content-available-height)\` and allow internal scroll.
- Trigger cursor: apply styleMap.trigger to force a default/arrow cursor over the inner input.`
  }
});
