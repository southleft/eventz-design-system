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
      required: true,
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
    fixed: { type: 'boolean', default: false }
  },

  // Slottable regions (all optional)
  // - logo: brand mark area (left)
  // - mobileNavigation: typically a <NavigationDropdown />; rendered within the primary cluster
  // - secondaryNavigation: consumer-owned cluster on the right
  propsOptionalSlots: true,
  slots: ['logo', 'mobileNavigation', 'secondaryNavigation'] as const,

  // Structural hint only; no classes here. Two flex children: primary cluster + secondary cluster.
  layout: {
    type: 'container',
    tag: 'nav',
    children: [
      { tag: 'div' }, // _primary → logo? + list (items) + mobileNavigation?
      { slot: 'secondaryNavigation', tag: 'div' } // _secondaryNavigation
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
     *  - Render order inside the primary cluster: `logo?` → list (items) → `mobileNavigation?`.
     */
    itemRenderer: {
      component: 'TextLink',
      mapping: { label: 'label', href: 'href', current: 'aria-current' },
      currentValue: 'page'
    },
    containerSlots: { primary: 0 },

    /** Layout note for implementers */
    layoutNote:
      'When fixed=true, position the bar at the top (fixed/inset-x-0/top-0). Downstream overlays (e.g., NavigationDropdown) should respect --nav-offset for available viewport space.'
  }
});
