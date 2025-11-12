import { defineStyleMap } from '../../utilities';

export const NavigationBarStyleMap = defineStyleMap({
  component: 'NavigationBar',

  // Root nav classes mirror runtime containerClasses.
  base: [
    'group',
    'flex',
    'items-center',
    'justify-between',
    'data-[wrap=true]:flex-col',
    'data-[wrap=true]:items-baseline',
    'data-[wrap=true]:lg:flex-row',
    'data-[wrap=true]:lg:items-center',
    'h-17',
    'lg:h-22',
    'data-[wrap=true]:h-auto',
    'data-[wrap=true]:lg:h-22',
    'px-4',
    'lg:px-28',
    'bg-background-none',
    'transition-colors'
  ] as const,

  slots: {
    /** Root nav container */
    container: [] as const,
    /** Primary cluster: logo? → list → mobileNavigation? */
    primary: [
      'flex',
      'items-center',
      'group-data-[wrap=true]:flex-col',
      'group-data-[wrap=true]:items-baseline',
      'group-data-[wrap=true]:lg:flex-row',
      'group-data-[wrap=true]:lg:items-center',
      'justify-start',
      'flex-1',
      'min-w-0',
      'gap-1',
      'lg:gap-2'
    ] as const,

    /** Brand mark slot (optional) */
    logo: ['shrink-0', 'max-h-20.75'] as const,

    /** Tagline slot placed after the logo */
    tagline: [] as const,

    /** Horizontal list of primary links (TextLink hosts) */
    list: ['items-center', 'min-w-0', 'gap-1', 'lg:gap-2'] as const,

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
