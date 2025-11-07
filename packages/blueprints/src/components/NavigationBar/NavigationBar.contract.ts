import { defineContract } from '../../utilities';

export const NavigationBarContract = defineContract({
  component: 'NavigationBar',
  description:
    'Site-wide primary navigation bar with logo, primary link list, optional mobile navigation trigger, and a secondary area.',
  base: 'nav', // semantic container; server component by design

  props: {
    /** Required accessible name for the nav landmark. */
    ariaLabel: { type: 'string', required: true },

    /** Primary navigation links (rendered as TextLink items). */
    items: {
      type: 'array',
      required: false,
      minItems: 1,
      of: {
        type: 'object',
        shape: {
          label: { type: 'string', required: true },
          href: { type: 'string', required: true },
          current: { type: 'boolean' } // when true, render aria-current="page" on the link
        }
      }
    },

    /** When true, the bar is `position: fixed` at the top of the viewport. */
    fixed: { type: 'boolean', default: false },

    /** Optional brand mark rendered ahead of the primary link list. */
    logo: { type: 'slot' },

    /** Optional tagline rendered between the logo and primary links. */
    tagline: { type: 'slot' },

    /**
     * Optional mobile navigation trigger. When present, the primary link list is hidden at small
     * breakpoints and the trigger becomes the first element in the primary cluster.
     */
    mobileNavigation: { type: 'slot' },

    /** Optional right-aligned cluster for secondary actions (buttons, avatar menu, etc.). */
    secondaryNavigation: { type: 'slot' }
  },

  // Rendered slots / data-slot hooks in order of appearance.
  slots: [
    'container',
    'primary',
    'mobileNavigation',
    'logo',
    'tagline',
    'list',
    'item',
    'secondaryNavigation'
  ] as const,

  // Structural hint only; classes live in the styleMap.
  layout: {
    type: 'container',
    tag: 'nav',
    slot: 'container',
    children: [
      {
        tag: 'div',
        slot: 'primary',
        children: [
          { tag: 'div', slot: 'mobileNavigation' },
          { tag: 'div', slot: 'logo' },
          { tag: 'div', slot: 'tagline' },
          {
            tag: 'ul',
            slot: 'list',
            children: [{ tag: 'li', slot: 'item' }]
          }
        ]
      },
      { tag: 'div', slot: 'secondaryNavigation' }
    ]
  },

  styleMap: true,

  hints: {
    a11y: 'Render <nav aria-label=ariaLabel>. For each item with current=true, set aria-current="page" on the corresponding link.',

    /**
     * Item rendering directive for the generator:
     *  - Render primary links as **TextLink** components inside the list container.
     *  - Mapping:
     *      label      → TextLink `label`
     *      href       → TextLink `href`
     *      current    → add `aria-current="page"` to the anchor when true
     *  - Defaults: TextLink renders with `variant="strong"`.
     *  - Render order inside the primary cluster: `mobileNavigation?` → `logo?` → list (items)`.
     */
    itemRenderer: {
      component: 'TextLink',
      defaults: { variant: 'strong' },
      mapping: { label: 'label', href: 'href', current: 'aria-current' },
      currentValue: 'page'
    },
    listVisibility:
      'On small screens, hide the primary list only when a mobileNavigation slot is provided (use `hidden md:flex` when present; otherwise `flex`).',
    containerSlots: { primary: 0 },

    /** Layout note for implementers */
    layoutNote:
      'When fixed=true, position the bar at the top (fixed/inset-x-0/top-0). Downstream overlays (e.g., NavigationDropdown) should respect --nav-offset for available viewport space.'
  }
});
