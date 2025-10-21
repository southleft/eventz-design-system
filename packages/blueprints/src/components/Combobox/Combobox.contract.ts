import { defineContract } from '../../utilities';

export const ComboboxContract = defineContract({
  component: 'Combobox',
  description:
    'Multi-select text-combo with chips and a suggestion panel. Field chrome, label/info, focus ring, and messaging come from FormElement; the results panel uses Radix Popover; rows render with MenuItem. Single-select is out of scope (use Select).',
  base: 'Popover', // Radix Primitive used for the results panel

  props: {
    /** Uniform MenuItem type for the whole list. */
    menuItemType: {
      type: 'enum',
      options: ['simple', 'complex'] as const,
      default: 'simple',
      description: 'Uniform MenuItem presentation for all items in the list.'
    },

    startIcon: {
      type: 'slot',
      description:
        'Optional leading icon rendered at the start of the field; behaves like Input startIcon (no reserved space when absent).'
    },

    showEndIcon: {
      type: 'boolean',
      default: false,
      description: 'When true, render a clear-all button at the end of the field.'
    },

    endIcon: {
      type: 'slot',
      description: 'Optional override icon for the clear-all button. Defaults to CloseIcon when not provided.'
    },

    /** Placeholder text for the internal input element. */
    placeholder: {
      type: 'string',
      description: 'Optional placeholder text displayed when no chips or user input are present.'
    },

    /** Data for the list; maps to MenuItem minus href. */
    items: {
      type: 'array',
      minItems: 0,
      of: {
        type: 'object',
        shape: {
          id: { type: 'string', required: true, description: 'Stable id used for selection.' },
          option: {
            type: 'string',
            required: true,
            description: 'Primary label text for the option and chip.'
          },
          supportingText: { type: 'string', description: 'Secondary text (used by complex rows).' },
          startIcon: { type: 'slot', description: 'Optional leading icon slot for MenuItem.' },
          imgSrc: { type: 'string', description: 'Optional image URL for complex rows.' },
          imgAlt: { type: 'string', description: 'Alt text for image when imgSrc is provided.' },
          mediaIcon: { type: 'slot', description: 'Optional media icon for complex rows.' },
          ariaLabel: { type: 'string', description: 'Accessible name for the row when needed.' }
        }
      }
    },

    /** Apply a divider below each MenuItem row (uniform, forwarded to MenuItem). */
    menuItemBorderBottom: {
      type: 'boolean',
      description: 'Optional uniform divider under every item row (forwarded to MenuItem). Defaults depend on menuItemType (see rules).'
    },

    /** Controlled/uncontrolled selection. */
    selectedIds: { type: 'array', of: { type: 'string' }, description: 'Controlled selected ids.' },
    defaultSelectedIds: {
      type: 'array',
      of: { type: 'string' },
      description: 'Uncontrolled initial selected ids.'
    },
    onSelectionChange: {
      type: 'callback',
      args: ['selectedIds: string[]'],
      description: 'Fires when selection changes (add/remove/toggle).'
    },

    /** Open state (popover). */
    open: { type: 'boolean', description: 'Controlled popover open state.' },
    defaultOpen: {
      type: 'boolean',
      default: false,
      description: 'Uncontrolled initial open state.'
    },
    onOpenChange: {
      type: 'callback',
      args: ['open: boolean'],
      description: 'Fires when popover open state changes.'
    },

    /** Disabled: keeps field inert and popover closed. */
    disabled: {
      type: 'boolean',
      default: false,
      description: 'When true, field is inert and popover must not open.'
    },

    /** Pass-through to the FormElement shell. */
    FormElementProps: {
      type: 'object',
      description:
        'Props forwarded to FormElement (label, ariaLabel, hint, error, info, asChild, etc.). FormElement manages label/description wiring.',
      // Shape is informational; generators should forward all provided keys.
      shape: {
        label: { type: 'string' },
        ariaLabel: { type: 'string' },
        hint: { type: 'string' },
        error: { type: 'string' },
        info: { type: 'string' },
        asChild: { type: 'boolean' }
      }
    }
  },

  // Internal composition hints (no public slots): panel and list are internal but listed for style parity.
  slots: ['anchor', 'panel', 'list', 'empty', 'chips', 'chip', 'chipDismiss', 'startIcon', 'menuItem', 'input'] as const,

  layout: {
    type: 'container',
    tag: 'Popover.Root',
    children: [
      // Field shell is implemented via FormElement; Popover.Anchor wraps it via asChild.
      { slot: 'anchor' },
      {
        slot: 'panel',
        type: 'container',
        tag: 'Popover.Content',
        children: [{ slot: 'list', tag: 'ul' }]
      }
    ]
  },

  rules: [
    {
      when: { disabled: true },
      imply: { open: false },
      hint: 'When disabled, keep the popover closed and the field inert.'
    },
    {
      hint: 'MenuItem type is uniform for the list. Ignore per-item type and render rows using the top-level menuItemType.'
    },
    {
      hint: 'Selection is multi-select only. Toggle selection by clicking items or chip dismiss; update chips accordingly.'
    },
    {
      hint: 'Chips: When selectedIds.length > 0, render a chip for each selected id. Each chip label is the matching item.option. Chips render inline before the input inside the field content area.'
    },
    {
      hint: 'Chip dismiss: Each chip includes a button with a CloseIcon (decorative, aria-hidden="true"). The button must be focusable and have aria-label="Remove {option}". Clicking it removes only that id from selectedIds and fires onSelectionChange(updatedIds). It must not change the popover open state.'
    },
    {
      hint: 'When showEndIcon is true, render a clear-all button (data-role="clear-all") at the end of the field. Clicking it must remove all selections and fire onSelectionChange([]). It must not change popover open state. Disable or no-op when disabled=true or when there are no selections.'
    },
    {
      hint: 'When startIcon is provided, render it before chips and input in the field content area. When not provided, do not reserve space.'
    },
    {
      when: { menuItemType: 'simple' },
      hint: 'Default resolution: When menuItemType is "simple" and menuItemBorderBottom is not provided, treat menuItemBorderBottom as true.'
    },
    {
      when: { menuItemType: 'complex' },
      hint: 'Default resolution: When menuItemType is "complex" and menuItemBorderBottom is not provided, treat menuItemBorderBottom as false.'
    },
    {
      hint: 'Use <Popover.Anchor asChild> to wrap the field shell (FormElement region). Do not use Popover.Trigger. The component controls open/close via props/state.'
    },
    {
      hint: 'Open state: derive from open ?? internal state (defaultOpen). Set open=true on field focus or click (unless disabled). Do not open when disabled=true.'
    },
    {
      hint: 'Close state: set open=false on outside click, on Escape key from the field or panel, and when the component loses focus contextually (standard Popover behavior).' 
    },
    {
      hint: 'Selection behavior: selecting or deselecting items or chips must not close the Popover (multi-select UX).'
    },
    {
      hint: 'Clear-all behavior: clicking the end icon (when showEndIcon) clears selections only and must not change open state.'
    },
    {
      hint: 'List rows: define a local const menuItemClasses = \'w-full\'. Compose a const menuItemClassName using collapseWhitespace(menuItemClasses) and composeClasses, then pass menuItemClassName to each MenuItem’s className. Use literal tokens that match the styleMap.menuItem slot; do not inline \'w-full\' directly on the component.'
    },
    {
      hint: 'Render a native <input type="text"> inside the field content area (FormElement value region). Bind only accessibility and placeholder: apply the `placeholder` prop to the input’s placeholder attribute. Do not implement filtering behavior in phase one.'
    },
    {
      hint: 'Placeholder visibility: show the placeholder when the input is empty; hide it naturally when the user has typed text. Chips may be present; placeholder behavior is independent of chip presence and does not trigger filtering.'
    },
    {
      hint: 'Input (phase one): Render a native <input type="text" readOnly> inside the FormElement value region. It acts as the focus anchor and popover opener (no typing or filtering).'
    },
    {
      hint: 'Input a11y: set aria-readonly="true", aria-haspopup="listbox", bind aria-expanded to open, and set aria-controls to the panel id when the popover content is mounted.'
    },
    {
      hint: 'Placeholder passthrough: When selectedIds.length === 0, pass the placeholder prop value to the input’s placeholder attribute. When selectedIds.length > 0, omit the placeholder attribute entirely (do not use CSS to hide it).'
    },
    {
      hint: 'End icon placement: When showEndIcon is true and selectedIds.length === 0, render the clear-all button at the end of the input line. When selectedIds.length > 0, render the clear-all button immediately after the last chip (visually following chips even if this places it beyond the input).'
    },
    {
      hint: 'Open behavior: Clicking or focusing the read-only input sets open=true (unless disabled). Close on outside click or Escape. Selection add/remove does not change open state.'
    },
    {
      hint: 'Wrapping: Allow chips to wrap inside the chips container. The FormElement row grows in height to accommodate wrapped lines. Do not implement chip scrolling or max-row clamping in phase one.'
    },
    {
      hint: 'Content order for wrapping: startIcon (if present) → chips container → readOnly input → end icon (if enabled). The input participates in the wrapping flow and moves to the next line when space is exhausted. End icon renders after the last chip when selections exist.'
    }
  ],

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Popover'] as const },
    a11y: 'FormElement provides the accessible name/description. When disabled, prevent opening. Chips dismiss buttons must be focusable and have aria-labels. The list is a plain list; MenuItem handles per-row semantics.'
  }
});
