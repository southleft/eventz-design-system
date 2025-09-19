// packages/blueprints/src/components/Checkbox/Checkbox.contract.ts
import { defineContract } from '../../utilities';

export const CheckboxContract = defineContract({
  component: 'Checkbox',
  description: 'Two-state checkbox with a visible label and optional hint.',
  base: 'Checkbox', // Radix UI per repo's radix-ui import convention

  props: {
    checked: {
      type: 'boolean',
      default: false,
      description: 'Whether the checkbox is checked'
    },

    label: { type: 'string', required: true, description: 'Visible label (accessible name)' },

    hint: { type: 'string', description: 'Optional helper text shown under the label' },

    disabled: { type: 'boolean', default: false, description: 'Disables the checkbox' },

    // Form props (pass-through to Radix root)
    required: { type: 'boolean', default: false, description: 'Marks the checkbox as required' },
    name: { type: 'string', description: 'Form field name' },
    value: { type: 'string', description: 'Form value; Radix defaults to \"on\" when omitted' }
  },

  // Render order for slots (control square + text)
  slots: ['control', 'indicator', 'label', 'hint'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    className: 'inline-flex items-start gap-2 select-none',
    children: [
      { slot: 'control', tag: 'div' },
      {
        tag: 'div',
        className: '._textGroup',
        children: [
          { slot: 'label', tag: 'label' },
          { slot: 'hint', tag: 'div' }
        ]
      }
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
    radixAdapter: { uses: ['Checkbox'] as const },
    a11y: 'Associate <label htmlFor={id}> with the control; map hint to aria-describedby; apply required to the control/input for forms.'
  }
});
