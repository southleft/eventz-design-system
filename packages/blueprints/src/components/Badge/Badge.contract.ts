import { defineContract } from '../../utilities';

export const BadgeContract = defineContract({
  description: 'A small, color-coded label for denoting status or metadata.',
  component: 'Badge',
  base: 'span',
  props: {
    variant: {
      type: 'enum',
      options: ['purple', 'blue', 'pink', 'brand', 'orange'],
      default: 'purple',
      description: 'Controls the visual color scheme of the badge.'
    },
    icon: {
      type: 'slot',
      required: false,
      description: 'Optional icon placed before the label.'
    },
    label: {
      type: 'string',
      required: false,
      description: 'Text content inside the badge.'
    }
  },
  slots: ['icon', 'label'],
  layout: {
    type: 'container',
    tag: 'span',
    className: 'flex items-center gap-1.5',
    children: [
      { slot: 'icon', tag: 'span', className: 'shrink-0' },
      { slot: 'label', tag: 'span' }
    ]
  },
  styleMap: true
});
