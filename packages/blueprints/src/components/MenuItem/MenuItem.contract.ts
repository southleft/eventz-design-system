import { defineContract } from '../../utilities';

export const MenuItemContract = defineContract({
  component: 'MenuItem',
  description:
    'Internal menu item for dropdown/select menus; supports simple or complex layouts with optional supporting text.',
  // Per Branch Facts, this component intentionally uses a native element for the root.
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
    imgAlt: { type: 'string' }
  },

  // Slots in render order (generator composes these exactly; truthiness controls spacing)
  slots: [
    'startIcon', // simple only
    'image', // complex only; rendered internally from imgSrc/imgAlt (not a public slot)
    'complexSelectedWrapper', // structural wrapper; stacks rows
    'option', // visible label text/content
    'supportingText' // complex only
  ] as const,

  // StyleMap provided separately; generator must compose classes strictly from it.
  styleMap: true,

  // Structural notes for the generator (no visual semantics here)
  hints: {
    notes:
      'For type="simple", ignore `image` and prefer `startIcon`. For type="complex", ignore `startIcon` and render an internal image using imgSrc/imgAlt (if missing, render a neutral placeholder). For complex items, the image alt should fall back to the `option` prop text when possible, otherwise to `ariaLabel`. Selected icon is internal-only (checkmark), revealed when isSelected=true. Hover and selected styling cascade from the root using `group` and `group-data-[is-selected=true]` to style child slots.'
  }
});
