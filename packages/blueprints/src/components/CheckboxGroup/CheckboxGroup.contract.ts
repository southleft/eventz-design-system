// packages/blueprints/src/components/CheckboxGroup/CheckboxGroup.contract.ts
import { defineContract } from '../../utilities';

export const CheckboxGroupContract = defineContract({
  component: 'CheckboxGroup',
  description:
    'Fieldset wrapper for related checkboxes with optional header, description, and help label.',
  base: 'CheckboxGroup', // Radix UI per repo's radix-ui import convention

  props: {
    header: { type: 'string', required: false, description: 'Group title/legend' },
    headerDescription: {
      type: 'string',
      required: false,
      description: 'Helper text below the header'
    },
    helpLabel: {
      type: 'string',
      required: false,
      description: 'Auxiliary action label (e.g., link)'
    },

    // Composition — children will be individual Checkboxes (asChild supported if needed)
    asChild: { type: 'boolean', default: false }
  },

  // Slots in display order
  slots: ['header', 'headerDescription', 'helpLabel'] as const,

  layout: {
    type: 'container',
    tag: 'fieldset',
    className: 'flex flex-col gap-2',
    children: [
      { slot: 'header', tag: 'legend', className: 'mb-1' },
      { slot: 'headerDescription', tag: 'div', className: 'text-caption-md-regular' },
      { slot: 'helpLabel', tag: 'div', className: 'ml-auto text-caption-md-medium underline' }
    ]
  },

  rules: [],

  styleMap: true
});
