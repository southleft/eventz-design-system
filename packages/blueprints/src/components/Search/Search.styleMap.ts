import { defineStyleMap } from '../../utilities';

export const SearchStyleMap = defineStyleMap({
  base: [] as const,

  slots: {
    anchor: ['min-w-xs'] as const,

    // Popover content wrapper
    results: [
      'inline-flex',
      'flex-col',
      'justify-center',
      'p-4',
      'rounded-sm',
      'border',
      'overflow-hidden',
      'border-color-border-subtle',
      'bg-color-background-default',
      'content-center',
      '-ml-[31px]',
      'mt-6'
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
    viewAllRow: ['inline-flex', 'w-full', 'justify-end'] as const,

    // Clear button injected as Input endIcon while the search term is present
    clearButton: [
      'inline-flex',
      'h-20',
      'w-20',
      'items-center',
      'justify-center',
      'rounded-full',
      'border-0',
      'bg-background-none',
      'text-color-content-default',
      'hover:bg-color-background-default-hover',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-color-background-default'
    ] as const
  },

  // State selectors map to Popover.Content data attributes
  state: {
    isLoading: ['data-[is-loading=true]:h-48'] as const,
    noResults: ['data-[no-results=true]:h-48', 'data-[no-results=true]:items-center'] as const,
    focused: [] as const,
    open: [] as const
  }
});
