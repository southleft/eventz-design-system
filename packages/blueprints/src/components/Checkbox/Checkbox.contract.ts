// packages/blueprints/src/components/Checkbox/Checkbox.contract.ts
import { defineContract } from '../../utilities';

export const CheckboxContract = defineContract({
  component: 'Checkbox',
  description:
    'Binary/tri-state control with a visible label. Supports unchecked, checked, and indeterminate.',
  base: 'Checkbox', // Radix UI per repo's radix-ui import convention

  props: {
    // Tri-state maps directly to Radix's `checked: boolean | "indeterminate"`
    checked: {
      type: 'enum',
      options: ['unchecked', 'checked', 'indeterminate'] as const,
      default: 'unchecked',
      description: 'Visual/semantic state of the control'
    },

    label: { type: 'string', required: true, description: 'Visible label (accessible name)' },

    disabled: { type: 'boolean', default: false, description: 'Disables the checkbox' },

    // Composition
    asChild: { type: 'boolean', default: false }
  },

  // Render order for slots (control square + text)
  slots: ['label'] as const,

  layout: {
    type: 'container',
    tag: 'label',
    className: 'inline-flex items-start gap-2 select-none',
    children: [
      // The visual square is the Radix Checkbox itself; label text is adjacent
      { slot: 'label', tag: 'span' }
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

  styleMap: true
});
