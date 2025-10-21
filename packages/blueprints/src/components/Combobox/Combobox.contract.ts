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

    showEndIcon: {
      type: 'boolean',
      default: false,
      description: 'When true, render a clear-all button at the end of the field.'
    },

    endIcon: {
      type: 'slot',
      description: 'Optional override icon for the clear-all button. Defaults to CloseIcon when not provided.'
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
      default: false,
      description: 'When true, render a divider under every item row.'
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

    /** Query state for filtering. */
    query: { type: 'string', description: 'Controlled filter text.' },
    defaultQuery: { type: 'string', default: '', description: 'Uncontrolled initial filter text.' },
    onQueryChange: {
      type: 'callback',
      args: ['query: string'],
      description: 'Fires when query text changes.'
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
  slots: ['panel', 'list', 'empty', 'chips', 'chip', 'chipDismiss', 'input'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    className: 'relative inline-block w-full',
    children: [
      // Field shell is implemented via FormElement; not represented here.
      { slot: 'panel', tag: 'div', children: [{ slot: 'list', tag: 'ul' }] }
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
      hint: 'Value control: Render a native <input type="text"> inside the FormElement value region. Bind its value to `query`/`defaultQuery`, and call `onQueryChange(next)` on user edits. Disable the input when `disabled` is true.'
    },
    {
      hint: 'Backspace behavior: When the input is empty and the user presses Backspace, remove the last selected chip (if any) and fire onSelectionChange(updatedIds). Do not change popover open state.'
    }
  ],

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Popover'] as const },
    a11y: 'FormElement provides the accessible name/description. When disabled, prevent opening. Chips dismiss buttons must be focusable and have aria-labels. The list is a plain list; MenuItem handles per-row semantics.'
  }
});
