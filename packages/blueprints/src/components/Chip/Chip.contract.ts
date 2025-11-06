// packages/blueprints/src/components/Chip/Chip.contract.ts
import { defineContract } from '../../utilities';

export const ChipContract = defineContract({
  component: 'Chip',
  description:
    'Server-rendered, inline Chip for small metadata: optional decorative icon + required text label. Purely presentational; tone/colour come from parent.',
  base: 'span',

  props: {
    label: { type: 'string', required: true },
    ariaLabel: { type: 'string' },
    icon: { type: 'slot' },
    className: { type: 'string' }
  },

  slots: ['_icon', '_text'] as const,

  layout: {
    type: 'container',
    tag: 'span',
    children: [
      { tag: 'span', slot: '_icon' },
      { tag: 'span', slot: '_text' }
    ]
  },

  styleMap: true,

  hints: {
    a11y: {
      recommendation:
        'If an icon is provided, render it as decorative with aria-hidden="true". The visible text (label) provides the accessible name; ariaLabel may be used to override it.'
    },
    composition:
      'Keep Chip neutral. Do not hard-code colour tokens that would fight parent context (lists, cards, overlay content).'
  }
});
