import { defineContract } from '../../utilities/defineContract';

export default defineContract({
  component: 'InteractiveListItem',
  base: 'button',
  props: {
    title: { type: 'string', required: true },
    supportingText: { type: 'string' },
    highlightText: { type: 'string' },
    imgSrc: { type: 'string' },
    imgAlt: { type: 'string' },
    isRemovable: { type: 'boolean', default: false },
    borderBottom: { type: 'boolean', default: true }
  },
  slots: [
    'container',
    'image',
    'title',
    'supportingText',
    'highlightText',
    'nonRemovableWrapper',
    'trailingIcon'
  ]
});
