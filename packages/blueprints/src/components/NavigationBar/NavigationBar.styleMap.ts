import { defineStyleMap } from '../../utilities';

export const NavigationBarStyleMap = defineStyleMap({
  component: 'NavigationBar',

  // Root nav classes mirror runtime containerClasses.
  base: [
    'flex',
    'items-center',
    'justify-between',
    'h-68',
    'lg:h-88',
    'px-16',
    'lg:px-112',
    'bg-background-none',
    'transition-colors'
  ] as const,

  slots: {
    /** Root nav container */
    container: [] as const,
    /** Primary cluster: logo? → list → mobileNavigation? */
    primary: ['flex', 'items-center', 'justify-start', 'flex-1', 'min-w-0', 'gap-4', 'lg:gap-8'] as const,

    /** Brand mark slot (optional) */
    logo: ['shrink-0', 'max-h-83'] as const,

    /** Tagline slot placed after the logo */
    tagline: [] as const,

    /** Horizontal list of primary links (TextLink hosts) */
    list: ['items-center', 'min-w-0', 'gap-4', 'lg:gap-8'] as const,

    /** Per-item wrapper around each TextLink */
    item: ['inline-flex'] as const,

    /** Mobile navigation slot (e.g., <NavigationDropdown />) */
    mobileNavigation: ['inline-block', 'shrink-0', 'md:hidden'] as const,

    /** Right-side consumer cluster */
    secondaryNavigation: ['min-w-0'] as const
  },

  layout: {
    fixed: ['fixed', 'inset-x-0', 'top-0', 'z-50'] as const
  },

  // No variants in v1.
  state: {
    // Runtime handles per-link `current` aria state; we expose only layout toggles here.
    listNoMobileNavigation: ['flex'] as const,
    listHasMobileNavigation: ['hidden', 'md:flex'] as const
  }
});
