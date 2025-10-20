import { defineContract } from '../../utilities';

export const MenuItemContract = defineContract({
  component: 'MenuItem',
  description:
    'Internal menu item for dropdown/select menus; supports simple or complex layouts with optional supporting text.',
  // Root defaults to <button>; href swaps to <a>.
  base: 'button',

  props: {
    // Structural type (not a visual "variant")
    type: { type: 'enum', options: ['simple', 'complex'] as const, default: 'simple' },

    // Selection state controls color shifts and visibility of an internal check icon
    isSelected: { type: 'boolean', default: false },

    // Divider between items
    borderBottom: { type: 'boolean', default: true },

    // Accessible name fallback when the item has no visible text (icons/image-only)
    ariaLabel: { type: 'string' },
    option: { type: 'string' },
    supportingText: { type: 'string' },

    // Visuals
    // - simple: may render a start icon
    startIcon: { type: 'slot' },

    // Optional convenience props when no `image` slot is provided (component may render an <img /> internally)
    imgSrc: { type: 'string' },
    imgAlt: { type: 'string' },
    mediaIcon: {
      type: 'slot',
      description:
        'Optional icon rendered in the media thumbnail slot for type="complex" when no imgSrc is provided.'
    },

    href: {
      type: 'string',
      description: 'Optional destination URL. When provided, render as an <a> element.'
    }
  },

  // Slots in render order (generator composes these exactly; truthiness controls spacing)
  slots: [
    'startIcon', // simple only
    'media', // complex only base thumbnail (img/span placeholder)
    'mediaIcon', // complex only icon-filled thumbnail
    'complexSelectedWrapper', // structural wrapper; stacks rows
    'primaryRow', // flex row housing option + selected icon
    'option', // visible label text/content
    'selectedIcon', // internal checkmark
    'supportingText' // complex only
  ] as const,

  // StyleMap provided separately; generator must compose classes strictly from it.
  styleMap: true,

  // Structural notes for the generator (no visual semantics here)
  hints: {
    notes:
      'For type="simple", ignore the media slots and prefer `startIcon`. For type="complex", ignore `startIcon` and render a media thumbnail: if imgSrc is provided render <img className={styleMap.slots.media} />, otherwise if mediaIcon is provided render <span className={styleMap.slots.mediaIcon}>{mediaIcon}</span>, otherwise render <span className={styleMap.slots.media} data-is-placeholder="true" />. When rendering <img>, default its alt text to imgAlt ?? option ?? ariaLabel ?? undefined. Selected icon is an internal <CheckIcon /> element that uses styleMap.slots.selectedIcon, revealed when isSelected=true. Hover and selected styling cascade from the root using group + data attributes.'
  },

  rules: [
    {
      validate: props =>
        typeof (props as any).option === 'undefined' ||
        ((props as any).option !== undefined && String((props as any).option).trim().length > 0),
      message: '`option` should be a non-empty string when provided.'
    },
    {
      hint: 'Render a semantic <a> element when `href` is provided (keeping disabled via aria-disabled); otherwise use <button type="button">.'
    },
    {
      hint: 'Mirror `className` onto the root element and include styleMap.base along with data attributes `data-border-bottom` and `data-is-selected`.'
    }
  ]
});
