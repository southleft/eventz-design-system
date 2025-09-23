// packages/blueprints/src/components/RadioButtonGroup/RadioButtonGroup.contract.ts
import { defineContract } from '../../utilities';

export const RadioButtonGroupContract = defineContract({
  component: 'RadioButtonGroup',
  description:
    'Fieldset wrapper for related radio buttons with optional label, description, and error.',
  base: 'RadioGroup', // Radix UI per this repo’s `radix-ui` import convention

  props: {
    label: { type: 'string', required: false, description: 'Group label/legend' },
    description: { type: 'string', required: false, description: 'Helper text below the label' },

    // Error flag & messaging (spec shows "hasError")
    error: { type: 'boolean', default: false, description: 'Marks the group as invalid' },
    errorText: { type: 'string', required: false, description: 'Error message text' },

    // Composition
    asChild: { type: 'boolean', default: false }
  },

  // Slots in visual order
  slots: ['label', 'description', 'errorText'] as const,

  layout: {
    type: 'container',
    tag: 'fieldset',
    className: 'flex flex-col gap-2',
    children: [
      { slot: 'label', tag: 'legend', className: 'mb-1' },
      { slot: 'description', tag: 'div', className: 'text-caption-md-regular' },
      { slot: 'errorText', tag: 'div', className: 'text-caption-md-medium' }
    ]
  },

  rules: [],

  styleMap: true,

  hints: {
    a11y: {
      recommendation:
        'Use semantic fieldset/legend; set aria-invalid on the group when `error` is true and link error text via aria-describedby.'
    }
  }
});
