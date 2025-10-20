import { defineContract } from '../../utilities';

export const SearchContract = defineContract({
  component: 'Search',
  description:
    'Search input with async results dropdown, optional empty state, and loading indicator.',
  base: 'Popover',

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
          icon: { type: 'slot' }, // → MenuItem.mediaIcon (visual node) (override)
          type: { type: 'string' } // -> venue | article | event | artist | guide | undefined
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

    InputProps: {
      type: 'object',
      description:
        'Passthrough props for the inner Input. Accepts InputProps minus value/defaultValue/startIcon/endIcon; startIcon/endIcon may be overridden here.',
      shape: {
        startIcon: {
          type: 'slot',
          description: 'Optional override for the leading icon inside the Input trigger.'
        },
        endIcon: {
          type: 'slot',
          description:
            'Optional trailing adornment. Replaced by the built-in clear button while the search term is non-empty.'
        }
      }
    },

    closeIcon: {
      type: 'slot',
      description:
        'Optional override for the default close icon rendered inside the clear button while the search term is non-empty. The icon sits inside a button passed through Input.endIcon. If not provided, a default CloseIcon is used.'
    },

    viewAllLabel: {
      type: 'string',
      default: 'View all listings matching {searchTerm}',
      description:
        'Optional override for the view-all row label. The substring {searchTerm} will be replaced with the current input value at render time.'
    }
  },

  slots: ['anchor', 'results', 'status', 'viewAllRow', 'clearButton'] as const,

  // ✅ Anchor contains the Input trigger; results/status/viewAllRow live inside Popover.Content
  layout: {
    type: 'container',
    tag: 'Popover.Root',
    children: [
      { slot: 'anchor' },
      {
        // Popover.Content root gets the `results` slot classes
        slot: 'results',
        type: 'container',
        tag: 'Popover.Content',
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
      hint: 'Render the Input inside <Popover.Anchor asChild className={styleMap.slots.anchor}>. The Popover has no explicit Trigger component.'
    },
    {
      hint: 'Apply `styleMap.slots.clearButton` to the inline <button type="button" aria-label="Clear search"> that replaces InputProps.endIcon while the search term is non-empty. On activation, clear the term, close the Popover, and restore focus to the input.'
    },
    {
      hint: 'Render results with <MenuItem type="complex" ...>.'
    },
    {
      hint: 'Each item in `results` renders as <MenuItem type="complex" option={result.label} supportingText={result.description} href={result.href} mediaIcon={result.icon} />. Also call onResultSelect(result) when an item is activated (click/Enter).'
    },
    {
      hint: 'Render viewAllRow only when results.length > 0 and onViewAllClick is provided; place it after all MenuItem results. Use <Button variant="secondary" label={viewAllLabelInterpolated} /> and call onViewAllClick(term) on click.'
    },
    {
      hint: 'Interpolate viewAllLabel by replacing the substring "{searchTerm}" with the current input value: const viewAllLabelInterpolated = (viewAllLabel ?? "View all listings matching {searchTerm}").replace("{searchTerm}", term).'
    },
    {
      hint: 'Popover opens when the input is focused and (loading || results.length > 0 || noResultsMessage). There is no Popover.Trigger.'
    },
    {
      hint: 'Fire onSearchTermChange(term) on every keystroke. Debounce and fetching are consumer-managed.'
    },
    {
      hint: 'Mirror controlled/uncontrolled patterns: derive searchTerm from value ?? internal state, and pass it to <Input value={searchTerm} type={InputProps.type ?? "search"} />.'
    },
    {
      hint: 'Apply aria-live="polite" to the status slot container to announce loading/empty changes.'
    },
    {
      hint: 'Apply data-is-loading / data-no-results / data-focused / data-open attributes to the Popover.Content element that receives the results slot classes.'
    },
    {
      hint: 'Render Popover.Content inside <Popover.Portal> with sideOffset={8}, align="start", role="list", and data-popover-content="true". Mirror the inline width sync: style={{ minWidth: "calc(var(--radix-popper-anchor-width) + var(--portal-extra-width))" }}.'
    },
    {
      hint: 'Also handle Escape on the input: pressing Escape clears the term and closes the Popover; return focus to the input.'
    },
    {
      hint: 'onResultSelect receives the exact object from results[i] without transformation.'
    },
    {
      hint: 'type prop corrosponds to the default icon, mapped as follows: venue - StadiumIcon, article - NewsmodeIcon, event - EventIcon, artist - ArtistIcon, guide - MapIcon, undefined - EventIcon. if icon is provided as a prop, it takes priority and overrides all.'
    },
    {
      hint: 'Result type union: "venue" | "article" | "event" | "artist" | "guide". If type is missing or unrecognized, use EventIcon. If result.icon is provided, it overrides type-based defaults.'
    },
    {
      hint: 'Centralize icon mapping in runtime: const defaultIcons = { venue: <StadiumIcon/>, article: <NewsmodeIcon/>, event: <EventIcon/>, artist: <ArtistIcon/>, guide: <MapIcon/> } as const; const mediaIcon = result.icon ?? defaultIcons[result.type ?? "event"] ?? <EventIcon/>;'
    },
    {
      hint: 'Search generation assumes MenuItem supports a `mediaIcon` prop. Ensure MenuItem is updated accordingly before integrating Search at runtime.'
    },
    {
      hint: 'While `loading` is true, do **not** render MenuItem results or the viewAllRow. The status slot (spinner) replaces all list content until loading completes. This prevents stale results from appearing under a new fetch cycle.'
    },
    {
      hint: 'When `loading` transitions from false → true, hide any previously rendered results immediately. Render results only when `loading` is false and results.length > 0.'
    },
    {
      hint: 'Maintain Popover open state internally: focus sets open=true unless suppressed, but Popover closes itself when no loading/results/empty message exists. Consumers manage fetch timing to keep the surface open while new data loads.'
    },
    {
      hint: 'Results shown must reflect the latest search term. When a new term is typed and loading=true, hide prior results until the new data arrives to avoid displaying stale items.'
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
      {
        from: '../../icons',
        names: [
          'SearchIcon',
          'CloseIcon',
          'AnimatedCircularProgressIcon',
          'StadiumIcon',
          'NewsmodeIcon',
          'MapIcon',
          'EventIcon',
          'ArtistIcon'
        ]
      }
    ],

    radixAdapter: { uses: ['Popover'] as const },

    a11y: 'Ensure the Input has a visible label or aria-label. Use role="list" on the results container and role="listitem" for entries when they render as links. Put aria-live="polite" on the status slot.'
  }
});
