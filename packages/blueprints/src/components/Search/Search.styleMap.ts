import { defineStyleMap } from '../../utilities';

export const SearchStyleMap = defineStyleMap({
  base: ['flex', 'flex-col', 'gap-1', 'border-0'] as const,

  slots: {
    input: [] as const,

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
      'data-[is-loading=true]:h-48',
      'data-[no-results=true]:h-48',
      'data-[no-results=true]:items-center'
    ] as const,

    status: [
      'inline-block',
      'w-full',
      'text-center',
      'text-sm',
      'text-color-content-weak'
    ] as const,

    viewAllRow: [] as const // to be defined during implementation
  },

  state: {
    loading: [] as const,
    hasResults: [] as const,
    empty: [] as const,
    focused: [] as const,
    open: [] as const
  }
});
