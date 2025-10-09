import { defineStyleMap } from '../../utilities';

export const MenuItemStyleMap = defineStyleMap({
  base: [
    'flex',
    'flex-nowrap',
    'items-center',
    'justify-between',
    'gap-8',
    'bg-background-none',
    // Focus ring (token-colored) on focus-visible within the item (supports nested focusables)
    '[&:has(:focus-visible)]:ring-2',
    '[&:has(:focus-visible)]:ring-offset-4',
    '[&:has(:focus-visible)]:ring-comp-border-focus-ring',
    '[&:has(:focus-visible)]:ring-offset-color-background-default',
    // Optional bottom divider
    'data-[border-bottom=true]:border-b',
    'data-[border-bottom=true]:border-b-color-border-subtle'
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
      'group-data-[is-selected=true]:text-color-content-brand'
    ] as const,

    // Leading icon for simple type
    startIcon: [
      'shrink-0',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'group-data-[is-selected=true]:text-color-content-brand'
    ] as const,

    // Supporting line for complex type
    supportingText: [
      'text-color-content-weak',
      'group-hover:text-color-content-weak-hover',
      'group-data-[is-selected=true]:text-color-content-brand'
    ] as const,

    // Thumbnail for complex type
    image: ['h-40', 'w-40', 'rounded-4', 'object-cover'] as const,

    // Wrapper that stacks [option + selectedIcon] over [supportingText]
    complexSelectedWrapper: ['flex', 'flex-col'] as const
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
