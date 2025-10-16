import { defineContract } from '../../utilities';

export const SearchContract = defineContract({
  component: 'Search',
  description:
    'Search input with async results dropdown, optional empty state, and loading indicator.',
  base: 'div',

  props: {
    value: { type: 'string' },
    defaultValue: { type: 'string' },

    onSearchTermChange: {
      type: 'callback',
      args: ['term: string'],
      required: true
    },

    results: {
      type: 'array',
      required: true,
      of: {
        type: 'object',
        shape: {
          id: { type: 'string', required: true },
          label: { type: 'string', required: true },
          description: { type: 'string' },
          href: { type: 'string' }
        }
      }
    },

    onResultSelect: {
      type: 'callback',
      args: ['result: SearchResult'],
      required: true
    },

    onViewAllClick: {
      type: 'callback',
      args: ['term: string']
    },

    placeholder: { type: 'string', default: 'Search…' },

    loading: { type: 'boolean', default: false },

    noResultsMessage: { type: 'string' },

    InputProps: { type: 'object' },

    closeIcon: { type: 'slot' }
  },

  slots: ['input', 'results', 'status', 'viewAllRow'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col gap-1 border-0',
    children: [{ slot: 'input' }, { slot: 'results' }]
  },

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Popover'] as const },
    a11y: 'Input must have a visible or aria label; Popover uses role=listbox and aria-live for status.'
  }
});
