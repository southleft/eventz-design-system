import { defineContract } from '../../utilities';

export const TextareaContract = defineContract({
  component: 'Textarea',
  description:
    'Fieldset-wrapped textarea with Radix Label, optional info popover, adornments, and contextual messaging.',
  base: 'fieldset',

  props: {
    label: {
      type: 'string',
      description:
        'Visible label text rendered with Radix Label and associated to the textarea via htmlFor.'
    },
    ariaLabel: {
      type: 'string',
      description: 'Accessible name announced when label is omitted.'
    },
    hint: { type: 'string', description: 'Helper text displayed below the textarea.' },
    error: { type: 'string', description: 'Error message that replaces the hint when present.' },
    info: { type: 'string', description: 'Inline info trigger + popover content.' },

    startIcon: { type: 'slot', description: 'Leading adornment in the textarea row.' },
    endIcon: { type: 'slot', description: 'Trailing adornment in the textarea row.' },

    value: { type: 'string', description: 'Controlled value for the native textarea.' },
    defaultValue: { type: 'string', description: 'Uncontrolled default for the native textarea.' },

    disabled: { type: 'boolean', default: false, description: 'Disables the fieldset contents.' }
  },

  /**
   * Render order:
   * label (+ info trigger) → popover content → textarea row → adornments → value → messaging.
   */
  slots: [
    'label',
    'infoTrigger',
    'infoContent',
    'textArea',
    'startIcon',
    'value',
    'endIcon',
    'hint',
    'error'
  ] as const,

  layout: {
    type: 'container',
    tag: 'fieldset',
    children: [
      { slot: 'label', tag: 'label', children: [{ slot: 'infoTrigger', tag: 'button' }] },
      { slot: 'infoContent', tag: 'div' },
      {
        slot: 'textArea',
        tag: 'div',
        children: [
          { slot: 'startIcon', tag: 'span' },
          { slot: 'value', tag: 'textarea' }, // native element (lowercase)
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
      hint: 'Provide either label or ariaLabel so the textarea has an accessible name (Radix Label via htmlFor or aria-label fallback).'
    },
    {
      when: { info: (value: unknown) => typeof value === 'string' && value.trim().length > 0 },
      hint: 'Render the info trigger inline with the label and pair infoContent with a popover.'
    },
    {
      when: {},
      hint: 'When both hint and error exist, render error instead of hint, and merge message id (and open info content id) into aria-describedby on the textarea.'
    }
  ],

  styleMap: true
});
