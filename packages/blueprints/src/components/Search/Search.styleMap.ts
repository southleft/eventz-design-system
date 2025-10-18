import { defineStyleMap } from '../../utilities';

export const SearchStyleMap = defineStyleMap({
  base: ['flex', 'flex-col', 'gap-1', 'border-0'] as const,

  slots: {
    input: [] as const,

    // Popover content wrapper
  results: [
    'inline-flex',
    'flex-col',
    'gap-2',
    'p-4',
    'rounded-sm',
    'border',
    'border-color-border-subtle',
    'bg-color-background-default',
    'content-center',
    'min-w-[var(--radix-popover-trigger-width)]',
    'max-w-[var(--radix-popover-content-available-width)]',
    'box-border'
  ] as const,

    // Shared status area (loading spinner OR no-results message)
    status: [
      'inline-block',
      'w-full',
      'text-center',
      'text-sm',
      'text-color-content-weak'
    ] as const,

    // Container for the "View all…" Button (variant="secondary")
    viewAllRow: ['inline-flex', 'w-full', 'justify-end'] as const
  },

  // Option A: move data-attribute selectors into state,
  // leaving the results slot clean and predictable.
  state: {
    // Applied on the same element that receives the `results` slot classes
    isLoading: ['data-[is-loading=true]:h-48'] as const,
    noResults: ['data-[no-results=true]:h-48', 'data-[no-results=true]:items-center'] as const,

    // Reserved flags for runtime wiring (no class tokens needed yet)
    focused: [] as const,
    open: [] as const
  }
});
