import { defineStyleMap } from '../../utilities';

export const MenuItemStyleMap = defineStyleMap({
  base: [
    'group',
    'flex',
    'flex-nowrap',
    'items-center',
    'gap-8',
    'bg-background-none',
    'w-full',
    'border-l-0',
    'border-r-0',
    'border-b-0',
    'border-t-0',
    'pb-10',
    'pl-8',
    'pt-8',
    'pr-8',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-4',
    'focus-visible:ring-comp-border-focus-ring',
    'focus-visible:ring-offset-color-background-default',
    'data-[border-bottom=true]:border-b',
    'data-[border-bottom=true]:border-color-border-subtle'
  ] as const,

  slots: {
    // Root container (kept for parity with other components; usually empty because `base` holds shared tokens)
    container: [] as const,

    // Main label
    option: [
      'text-sm',
      'flex-grow',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'group-data-[is-selected=true]:text-color-content-brand',
      'text-left'
    ] as const,

    // Leading icon for simple type
    startIcon: [
      'shrink-0',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'group-data-[is-selected=true]:text-color-content-brand',
      'h-20',
      'w-20'
    ] as const,

    // Supporting line for complex type
    supportingText: [
      'text-color-content-weak',
      'group-hover:text-color-content-weak-hover',
      'text-left'
    ] as const,

    // Thumbnail for complex type
    image: [
      'h-40',
      'w-40',
      'rounded-sm',
      'object-cover',
      'group-hover:opacity-75',
      'data-[is-placeholder=true]:bg-color-background-brand'
    ] as const,

    // Wrapper that stacks [option + selectedIcon] over [supportingText]
    complexSelectedWrapper: ['flex', 'flex-col', 'flex-grow', 'gap-1'] as const
  },

  // Structural axis mirrors `props.type`; no additional classes at this time.
  variants: {
    simple: [] as const,
    complex: [] as const
  },

  // Extra state keys (present for parity; slot arrays already include data-qualified color shifts)
  state: {
    isSelected: [] as const,
    borderBottom: [] as const
  }
});
