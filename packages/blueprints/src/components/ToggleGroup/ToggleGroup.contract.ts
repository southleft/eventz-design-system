import { defineContract } from '../../utilities';

export const ToggleGroupContract = defineContract({
  component: 'ToggleGroup',
  description:
    'Icon-only grouped toggles built on Radix ToggleGroup with an items prop. All Radix ToggleGroup props (except asChild) pass through.',
  base: 'ToggleGroup', // Radix Primitive

  props: {
    /** Accessible name for the group. */
    ariaLabel: {
      type: 'string',
      required: true,
      description: 'Accessible name for the toggle group'
    },

    /**
     * Icon-only items rendered as Radix ToggleGroup.Item elements.
     * If an item omits `ariaLabel`, the component derives it from `value`.
     */
    items: {
      type: 'array',
      description: 'Icon-only items to render as ToggleGroup.Item controls',
      minItems: 1,
      of: {
        type: 'object',
        shape: {
          value: { type: 'string', required: true, description: 'Unique value for the item' },
          icon: { type: 'slot', required: true, description: 'Icon node (20×20). Icon-only.' },
          ariaLabel: { type: 'string', description: 'If omitted, derive from `value`' },
          disabled: { type: 'boolean', description: 'Disable this item' }
        }
      }
    }
  },

  // No render-time slots; items are rendered internally.
  styleMap: true,

  hints: {
    radixAdapter: { uses: ['ToggleGroup'] as const },
    a11y: 'Root requires aria-label. Each item is icon-only; if item.ariaLabel is missing, derive from its value. Item icons are decorative and should be aria-hidden.'
  },

  rules: [
    {
      hint: 'All Radix ToggleGroup props are passthrough (type, value/defaultValue, onValueChange, orientation, rovingFocus, loop, dir, disabled). `asChild` is omitted.'
    }
  ]
});
