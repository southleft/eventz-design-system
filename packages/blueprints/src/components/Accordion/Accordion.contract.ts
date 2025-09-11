// packages/blueprints/src/components/Accordion/Accordion.contract.ts
import { defineContract } from '../../utilities';

export const AccordionContract = defineContract({
  component: 'Accordion',
  description: 'Multi-item disclosure list with togglable sections.',
  base: 'Accordion',

  props: {
    // Visual density
    size: {
      type: 'enum',
      options: ['sm', 'md', 'lg'] as const,
      default: 'md'
    },

    // Indicator icon behavior
    iconStrategy: {
      type: 'enum',
      options: ['chevron', 'none', 'custom'] as const,
      default: 'chevron'
    },

    // Optional: visually separate items (spec shows both contained & ghost looks in some systems;
    // omit if design later decides against it)
    variant: {
      type: 'enum',
      options: ['contained', 'ghost'] as const,
      default: 'contained'
    }
  },

  // Render order follows anatomy per item
  slots: ['item', 'trigger', 'icon', 'content'] as const,

  // Advisory only — structure lives in styleMap
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col'
  },

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Accordion'] as const }
  }
});
