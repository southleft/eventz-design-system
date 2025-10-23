import { defineContract } from '../../utilities';

export const ComboboxContract = defineContract({
  component: 'Combobox',
  description:
    'Multi-select text combo with chips, clear-all affordance, and a suggestion panel. The outer field shell comes from FormElement; results render inside a Radix Popover anchored to the field; list rows use MenuItem.',
  base: 'div',

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
      description: 'When true, field is inert and the popover never opens.'
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

  slots: [
    'anchor',
    'panel',
    'empty',
    'chips',
    'chip',
    'chipDismiss',
    'clearAll',
    'startIcon',
    'endIcon',
    'menuItem',
    'input'
  ] as const,

  layout: {
    type: 'container',
    tag: 'div',
    children: [
      {
        type: 'container',
        tag: 'Popover.Root',
        children: [
          { slot: 'anchor' }, // rendered via Popover.Anchor asChild around FormElement field
          { slot: 'panel' } // Popover.Content containing the option list
        ]
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
      hint: 'When endIcon is provided and showEndIcon && !hasSelection, render it in the endIcon slot for visual parity; otherwise default to CloseIcon.'
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
      hint: 'Open state: derive from open ?? internal state (defaultOpen). Set open=true on field click or via keyboard toggles (unless disabled). Do not open when disabled=true.'
    },
    {
      hint: 'Close state: set open=false on outside click, on Escape from the input, and when the component loses focus contextually (standard Popover behavior).'
    },
    {
      hint: 'Keyboard: on the input, Space/Enter toggle open/close, Escape always closes (if open) and returns focus to the input. Ignore other keys.'
    },
    {
      hint: 'Selection behavior: selecting or deselecting items or chips must not close the Popover (multi-select UX).'
    },
    {
      hint: 'Clear-all behavior: clicking the end icon (when showEndIcon) clears selections only and must not change open state.'
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
    },
    {
      hint: 'MenuItem props: forward only the allowed subset from items[] (id used for selection; option/supportingText/startIcon/imgSrc/imgAlt/mediaIcon/ariaLabel). Do not forward href or any anchor-related attributes.'
    }
  ],

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Popover'] as const },
    a11y: 'FormElement provides the accessible name/description. When disabled, prevent opening. Chips dismiss buttons must be focusable and have aria-labels. The list is a plain list; MenuItem handles per-row semantics.'
  }
});
