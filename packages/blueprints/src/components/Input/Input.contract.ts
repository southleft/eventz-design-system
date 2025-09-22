// packages/blueprints/src/components/Input/Input.contract.ts
import { defineContract } from '../../utilities';

export const InputContract = defineContract({
  component: 'Input',
  description:
    'Fieldset-wrapped text input with optional label, info popover, adornments, and contextual messaging.',
  base: 'fieldset',

  props: {
    label: {
      type: 'string',
      description: 'Visible legend text describing the input field.'
    },
    ariaLabel: {
      type: 'string',
      description: 'Accessible name announced when label is omitted.'
    },
    hint: {
      type: 'string',
      description: 'Helper text displayed below the input when no error is present.'
    },
    error: {
      type: 'string',
      description: 'Error message that replaces the hint and receives priority when provided.'
    },
    info: {
      type: 'string',
      description: 'Supplemental information surfaced through an inline info trigger and popover.'
    },
    startIcon: {
      type: 'slot',
      description: 'Leading adornment rendered at the start of the input row.'
    },
    endIcon: {
      type: 'slot',
      description: 'Trailing adornment rendered at the end of the input row.'
    },
    value: {
      type: 'string',
      description: 'Controlled value bound to the native input element.'
    },
    defaultValue: {
      type: 'string',
      description: 'Uncontrolled default value passed to the native input element.'
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Disables the fieldset contents and applies disabled styling.'
    },
    type: {
      type: 'string',
      default: 'text',
      description: 'Native input type attribute forwarded to the value slot.'
    }
  },

  /**
   * Slot order mirrors the rendered structure inside the fieldset:
   * legend (label + info trigger) → popover content → input row → adornments → value → messaging.
   */
  slots: ['label', 'infoTrigger', 'infoContent', 'input', 'startIcon', 'value', 'endIcon', 'hint', 'error'] as const,

  layout: {
    type: 'container',
    tag: 'fieldset',
    children: [
      {
        slot: 'label',
        tag: 'legend',
        children: [{ slot: 'infoTrigger', tag: 'button' }]
      },
      { slot: 'infoContent', tag: 'div' },
      {
        slot: 'input',
        tag: 'div',
        children: [
          { slot: 'startIcon', tag: 'span' },
          { slot: 'value', tag: 'input' },
          { slot: 'endIcon', tag: 'span' }
        ]
      },
      {
        type: 'container',
        tag: 'div',
        children: [
          { slot: 'hint', tag: 'div' },
          { slot: 'error', tag: 'div' }
        ]
      }
    ]
  },

  rules: [
    {
      when: {},
      hint: 'Provide either label or ariaLabel so the input exposes an accessible name.'
    },
    {
      when: { info: (value: unknown) => typeof value === 'string' && value.trim().length > 0 },
      hint: 'Render infoTrigger inline with the label text and pair infoContent with a popover.'
    },
    {
      when: {},
      hint: 'When both hint and error exist, prefer rendering the error slot and merge messaging ids into aria-describedby for the input control.'
    }
  ],

  styleMap: true
});
