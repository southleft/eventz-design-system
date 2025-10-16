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
          label: { type: 'string', required: true }, // → MenuItem.option
          description: { type: 'string' }, // → MenuItem.supportingText
          href: { type: 'string' }, // → MenuItem.href (renders <a>)
          icon: { type: 'slot' } // → MenuItem.mediaIcon (visual node)
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
        'Optional override for the view-all row label. The substring {searchTerm} will be replaced with the current input value at render time.'
    }
  },

  // ✅ Nest status + viewAllRow **inside** the results container (Popover.Content)
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col gap-1 border-0',
    children: [
      { slot: 'input' },
      {
        // Popover.Content root gets the `results` slot classes
        slot: 'results',
        type: 'container',
        tag: 'div',
        children: [
          // Spinner OR empty message lives here
          { slot: 'status' },
          // Results list (MenuItem entries) render before this,
          // and the viewAllRow button comes last inside the same Popover.Content
          { slot: 'viewAllRow' }
        ]
      }
    ]
  },

  rules: [
    {
      hint: 'Input.startIcon defaults to <SearchIcon /> unless overridden via InputProps.startIcon. Pass directly; do not wrap with Slot.'
    },
    {
      hint: 'Results, status, and viewAllRow render inside <Popover.Content>. The root <div> contains the Input and the Popover (no Trigger) as siblings.'
    },
    {
      hint: 'Render results with <MenuItem type="complex" ...>.'
    },
    {
      hint: 'Each item in `results` renders as <MenuItem type="complex" option={result.label} supportingText={result.description} href={result.href} mediaIcon={result.icon} />. Also call onResultSelect(result) when an item is activated (click/Enter).'
    },
    {
      hint: 'Render viewAllRow only when results.length > 0; place it after all MenuItem results. Use <Button variant="secondary" label={viewAllLabelInterpolated} /> and call onViewAllClick(term) on click.'
    },
    {
      hint: 'Interpolate viewAllLabel by replacing the substring "{searchTerm}" with the current input value: const viewAllLabelInterpolated = (viewAllLabel ?? "View all listings matching {searchTerm}").replace("{searchTerm}", term).'
    },
    {
      hint: 'Popover opens when the input is focused and (loading || results.length > 0 || noResultsMessage). There is no Popover.Trigger.'
    },
    {
      hint: 'When Popover is open, pass a clickable <button type="button" aria-label="Clear search"> as InputProps.endIcon containing `closeIcon` (or default CloseIcon). On click: (1) call onSearchTermChange("") to clear, (2) close the Popover, and (3) restore focus to the input.'
    },
    {
      hint: 'Fire onSearchTermChange(term) on every keystroke. Debounce and fetching are consumer-managed.'
    },
    {
      hint: 'Apply aria-live="polite" to the status slot container to announce loading/empty changes.'
    },
    {
      hint: 'Apply data-is-loading / data-no-results to the element that receives the results slot classes (i.e., the Popover.Content root).'
    },
    {
      hint: 'Also handle Escape on the input: pressing Escape clears the term and closes the Popover; return focus to the input.'
    },
    {
      hint: 'onResultSelect receives the exact object from results[i] without transformation.'
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
      { from: '../MenuItem', names: ['MenuItem'] },

      // Icons (default + override surface + loading)
      { from: '../../icons', names: ['SearchIcon', 'CloseIcon', 'AnimatedCircularProgressIcon'] }
    ],

    radixAdapter: { uses: ['Popover'] as const },

    a11y: 'Ensure the Input has a visible label or aria-label. Use role="list" on the results container and role="listitem" for entries when they render as links. Put aria-live="polite" on the status slot.'
  }
});
