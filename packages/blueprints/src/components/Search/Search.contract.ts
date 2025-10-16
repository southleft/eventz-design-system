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

    closeIcon: {
      type: 'slot',
      description:
        'Optional override for the default close icon shown in the input when the popover is open. The icon is rendered inside a button, passed as the Input’s endIcon. If not provided, a default CloseIcon is used.'
    },

    viewAllLabel: {
      type: 'string',
      default: 'View all listings matching {searchTerm}',
      description:
        'Optional override for the view-all row label. When not provided, the default message will be used with the current search term interpolated.'
    }
  },

  slots: ['input', 'results', 'status', 'viewAllRow'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col gap-1 border-0',
    children: [{ slot: 'input' }, { slot: 'results' }, { slot: 'status' }, { slot: 'viewAllRow' }]
  },

  rules: [
    {
      hint: 'Popover opens when the input is focused and one of the following is true: loading is true, results exist, or noResultsMessage is present.'
    },
    {
      hint: 'The viewAllRow slot renders a Button component using variant "secondary". Its label is set to the value of viewAllLabel (default: "View all listings matching {searchTerm}"). When clicked, it calls onViewAllClick with the current search term.'
    }
  ],

  styleMap: true,

  hints: {
    // Required runtime imports for generation (inventory, not code)
    imports: [
      // Radix primitives: import only from the aggregator
      { from: 'radix-ui', names: ['Popover'] },

      // Sibling/core components
      { from: '../Input', names: ['Input'] },
      { from: '../Button', names: ['Button'] },
      { from: '../InteractiveListItem', names: ['InteractiveListItem'] },

      // Icons (default + override surface + loading)
      { from: '../../icons', names: ['SearchIcon', 'CloseIcon', 'AnimatedCircularProgressIcon'] }
    ],

    // Structural hints already agreed:
    radixAdapter: { uses: ['Popover'] as const },

    // A11y guidance for the generator:
    a11y: 'Input must have a visible label or aria-label. Popover content (results slot) may use role="listbox" and aria-live="polite" to announce status or results changes.'
  }
});
