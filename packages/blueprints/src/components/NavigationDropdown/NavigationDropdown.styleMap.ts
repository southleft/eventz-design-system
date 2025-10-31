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
      'py-4',
      'bg-background-none',
      'w-screen',
      'h-screen',
      'top-[var(--nav-offset)]',
      'overflow-y-auto'
    ] as const,

    // Vertical list container for MenuItem rows
    list: [] as const,

    // Row wrapper around each MenuItem host (keep lightweight)
    item: ['mx-4'] as const
  },

  // No variants in v1.

  state: {
    // No prop-driven states in v1; open/closed is handled via data-state selectors above.
  }
});
