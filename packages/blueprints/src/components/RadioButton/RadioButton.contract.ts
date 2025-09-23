// packages/blueprints/src/components/RadioButton/RadioButton.contract.ts
import { defineContract } from '../../utilities';

export const RadioButtonContract = defineContract({
  component: 'RadioButton',
  description:
    'Single radio control with a visible label. Two-state selection (unchecked/checked), disabled, optional hint.',
  base: 'Radio', // Radix UI per this repo’s `radix-ui` import convention

  props: {
    // Two-state selection axis (explicit to keep tokens deterministic, like Checkbox)
    checked: {
      type: 'enum',
      options: ['unchecked', 'checked'] as const,
      default: 'unchecked',
      description: 'Visual/semantic state of the control'
    },

    label: { type: 'string', required: true, description: 'Visible label (accessible name)' },
    hint: {
      type: 'string',
      required: false,
      description: 'Optional secondary text under the label'
    },

    disabled: { type: 'boolean', default: false, description: 'Disables the radio' },

    // Composition
    asChild: { type: 'boolean', default: false }
  },

  // Slots in render order (control is the Radix radio; we expose text slots only)
  slots: ['label', 'hint'] as const,

  layout: {
    type: 'container',
    tag: 'label',
    className: 'inline-flex items-start gap-2 select-none',
    children: [
      { slot: 'label', tag: 'span' },
      { slot: 'hint', tag: 'div', className: 'text-caption-md-regular' }
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
    radixAdapter: {
      // How to feed to Radix Radio (advisory)
      variantMap: { unchecked: { checked: false }, checked: { checked: true } } as const
    }
  }
});
