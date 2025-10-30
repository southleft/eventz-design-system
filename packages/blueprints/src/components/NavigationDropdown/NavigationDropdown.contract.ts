import { defineContract } from '../../utilities';

export const NavigationDropdownContract = defineContract({
  component: 'NavigationDropdown',
  description: 'Popover-based navigation panel listing simple link items (MenuItem rows).',
  base: 'Popover', // Radix UI Primitive via repo aggregator (Primitives only; Themes disallowed)

  props: {
    /** Optional inner landmark for the list (wraps items in <nav aria-label=...>). */
    ariaLabel: { type: 'string' },

    /**
     * Icons for the trigger button (an IconButton in runtime). The runtime toggles which one is visible
     * based on Popover open state.
     * - openIcon: shown when the panel is CLOSED (default: NotesIcon)
     * - closeIcon: shown when the panel is OPEN (default: CloseIcon)
     */
    openIcon: { type: 'slot' },
    closeIcon: { type: 'slot' },

    /**
     * Accessible name for the trigger IconButton. If omitted, runtime defaults to "Menu".
     */
    triggerAriaLabel: { type: 'string' },

    /**
     * Strictly navigational items (v1): each row becomes a MenuItem link.
     * - label: visible text (also default accessible name)
     * - href: required link destination
     * - ariaLabel: optional accessible-name override (defaults to label)
     */
    items: {
      type: 'array',
      required: true,
      minItems: 1,
      of: {
        type: 'object',
        shape: {
          label: { type: 'string', required: true },
          href: { type: 'string', required: true },
          ariaLabel: { type: 'string' }
        }
      }
    }
  },

  // Exposed slottable visuals for the trigger button (order matters for render hints)
  slots: ['openIcon', 'closeIcon'] as const,

  // Structural hint only (no classes here). Generators will wrap Radix Popover Root/Trigger/Content.
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      {
        tag: 'button',
        // This button will be provided by the IconButton runtime via <Popover.Trigger asChild>.
        children: [
          { slot: 'openIcon', tag: 'span' },
          { slot: 'closeIcon', tag: 'span' }
        ]
      },
      { tag: 'div' } // panel/content container (data-driven list of MenuItem links)
    ]
  },

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Popover'] as const },
    a11y: 'IconButton trigger provides focus ring and aria-label. Focus moves into Popover.Content on open and returns to the trigger on close. Each item is a link MenuItem with its name from ariaLabel ?? label.',
    iconDefaults: 'openIcon defaults to NotesIcon; closeIcon defaults to CloseIcon (runtime).',

    /**
     * Trigger rendering directive for the generator:
     *  - Use <Popover.Trigger asChild> and render an **IconButton** as the trigger host.
     *  - IconButton props:
     *      variant="bare"
     *      ariaLabel={props.triggerAriaLabel ?? 'Menu'}
     *      icon={ state.open ? slots.closeIcon : slots.openIcon }
     *  - The open state can be derived via the Radix data-state attribute or Popover state.
     */
    trigger: {
      hostComponent: 'IconButton',
      props: { variant: 'bare', ariaLabelFrom: 'triggerAriaLabel', ariaLabelFallback: 'Menu' },
      iconToggle: { openUses: 'closeIcon', closedUses: 'openIcon' }
    },

    /**
     * Item rendering directive for the generator:
     *  - Render each `items[]` entry using the **MenuItem** component (link variant via `href`).
     *  - Apply these defaults to every MenuItem row:
     *      { type: "simple", isSelected: false, borderBottom: false }
     *  - Map fields as follows:
     *      label      → MenuItem primary text (and default accessible name)
     *      href       → anchor `href` (link variant)
     *      ariaLabel  → MenuItem `ariaLabel` (fallback to `label` when undefined)
     */
    itemRenderer: {
      component: 'MenuItem',
      defaults: { type: 'simple', isSelected: false, borderBottom: false },
      mapping: { label: 'text', href: 'href', ariaLabel: 'ariaLabel' }
    }
  }
});
