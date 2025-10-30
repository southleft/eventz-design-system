import { defineStyleMap } from '../../utilities';

export const NavigationBarStyleMap = defineStyleMap({
  component: 'NavigationBar',

  // Keep base minimal; use slots for structural layout.
  base: [] as const,

  slots: {
    /** Root nav container */
    container: [
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'h-68',
      'lg:h-88',
      'bg-color-background-none',
      'has-[[data-slot=mobileNavigation] [data-state=open]]:bg-background-modal-dark',
      'transition-colors'
    ],
    /** Primary cluster: logo? → list → mobileNavigation? */
    primary: ['flex', 'items-center', 'justify-start', 'gap-4', 'lg:gap-8', 'min-w-0'] as const,

    /** Brand mark slot (optional) */
    logo: ['shrink-0', 'max-h-83'] as const,

    /** Horizontal list of primary links (TextLink hosts) */
    list: ['hidden', 'md:flex', 'items-center', 'gap-4', 'lg:gap-8', 'min-w-0'] as const,

    /** Per-item wrapper around each TextLink */
    item: ['inline-flex'] as const,

    /** Mobile navigation slot (e.g., <NavigationDropdown />) */
    mobileNavigation: ['inline-block', 'md:hidden', 'shrink-0'] as const,

    /** Right-side consumer cluster */
    secondaryNavigation: ['min-w-0'] as const
  },

  // No variants in v1.
  state: {
    // No component-level states; per-link `current` is handled via `aria-current` on the TextLink.
  }
});
