import { defineContract } from '../../utilities/defineContract';

export default defineContract({
  description:
    'List row with optional avatar, supporting text, and removable state. Can render as a button or link.',
  component: 'InteractiveListItem',
  base: 'button',
  props: {
    title: { type: 'string', required: true },
    supportingText: { type: 'string' },
    highlightText: { type: 'string' },
    imgSrc: { type: 'string' },
    imgAlt: { type: 'string' },
    isRemovable: { type: 'boolean', default: false },
    borderBottom: { type: 'boolean', default: true },
    href: {
      type: 'string',
      description: 'Optional destination URL. When provided, render as an <a> element.'
    }
  },
  slots: [
    'container',
    'image',
    'title',
    'supportingText',
    'highlightText',
    'nonRemovableWrapper',
    'trailingIcon'
  ],
  rules: [
    {
      hint: 'Render a semantic <a> element when `href` is provided; otherwise use <button type="button">.'
    }
  ]
});
