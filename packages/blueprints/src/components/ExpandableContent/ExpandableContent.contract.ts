// packages/blueprints/src/components/ExpandableContent/ExpandableContent.contract.ts
import { defineContract } from '../../utilities';

export const ExpandableContentContract = defineContract({
  component: 'ExpandableContent',
  description: 'Single-section disclosure with a trigger and collapsible content.',
  base: 'Collapsible',

  props: {
    size: {
      type: 'enum',
      options: ['sm', 'md', 'lg'] as const,
      default: 'md'
    },
    iconStrategy: {
      type: 'enum',
      options: ['chevron', 'none', 'custom'] as const,
      default: 'chevron'
    },
    isDisabled: { type: 'boolean', default: false }
  },

  slots: ['trigger', 'icon', 'content'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    className: 'w-full'
  },

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Collapsible'] as const }
  }
});
