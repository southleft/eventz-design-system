import { defineStyleMap } from '../../utilities';

export const NavigationDropdownStyleMap = defineStyleMap({
  component: 'NavigationDropdown',

  // Global defaults applied to the root wrapper when present.
  base: [
    // (Keep base minimal; most visuals live on panel/list slots.)
  ] as const,

  slots: {
    // Trigger is consumer-provided; keep only focus-visible treatment minimal.
    trigger: [] as const,

    // Popover content panel
    panel: [
      'z-50',
      'bg-background-modal-dark',
      'w-full',
      'fixed',
      'inset-x-0',
      'bottom-0',
      'top-[var(--nav-offset)]'
    ] as const,

    // Vertical list container for MenuItem rows
    list: [] as const,

    // Row wrapper around each MenuItem host (keep lightweight)
    item: ['w-full'] as const
  },

  // No variants in v1.

  state: {
    // No prop-driven states in v1; open/closed is handled via data-state selectors above.
  }
});
