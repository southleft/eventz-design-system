// packages/blueprints/src/components/Dropdown/Dropdown.contract.ts
import { defineContract } from '../../utilities';

export const DropdownContract = defineContract({
  component: 'Dropdown',
  description:
    'A simple Popover-backed dropdown: consumer owns the panel content; trigger is a Button (secondary).',
  base: 'Popover',

  props: {
    // Trigger content (passed through to Button)
    label: { type: 'string', required: true, description: 'Visible text on the trigger button.' },
    startIcon: { type: 'slot', description: 'Optional leading icon rendered by Button.' },
    endIcon: {
      type: 'slot',
      description:
        'Optional trailing icon rendered by Button (defaults to ArrowDropDownIcon at runtime).'
    },

    // Open control
    open: { type: 'boolean', default: false, description: 'Controlled open state.' },
    defaultOpen: {
      type: 'boolean',
      default: false,
      description: 'Uncontrolled initial open state.'
    },
    onOpenChange: {
      type: 'callback',
      args: ['open: boolean'],
      description: 'Fires when open state changes.'
    },

    // State (passthrough to Button)
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Passthrough to Button; Dropdown does not style or track disabled state.'
    },

    // Positioning
    align: { type: 'enum', options: ['start', 'center', 'end'] as const, default: 'start' },
    side: { type: 'enum', options: ['top', 'right', 'bottom', 'left'] as const, default: 'bottom' },
    sideOffset: { type: 'number', default: 8 },
    collisionPadding: { type: 'number', default: 8 },

    // Focus behavior
    trapFocus: {
      type: 'boolean',
      default: false,
      description: 'Off by default; opt-in to dialog-like focus trap.'
    },

    // A11y
    ariaHaspopup: {
      type: 'enum',
      options: ['menu', 'listbox', 'dialog'] as const,
      default: 'menu'
    },

    // Panel content owned by consumer
    children: {
      type: 'slot',
      required: true,
      description: 'Content rendered inside the dropdown panel.'
    }
  },

  // Dropdown controls only these surface slots
  slots: ['container', 'content'] as const,

  // Illustrative only: real DOM uses Popover.Trigger and Popover.Content.
  layout: {
    type: 'container',
    tag: 'div',
    className: 'inline-flex',
    children: [
      { slot: 'container', tag: 'button', className: 'hidden' },
      { slot: 'content', tag: 'div', className: 'hidden' }
    ]
  },

  rules: [],

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Popover'] as const },
    structure:
      'Popover.Root → Popover.Trigger(asChild) → Button(variant="secondary", apply styleMap.container) ; Popover.Portal → Popover.Content(apply styleMap.content)',
    trigger:
      'Use Popover.Trigger asChild with Button. Pass label/startIcon/endIcon/disabled to Button (icons are props, not children). Default endIcon to ArrowDropDownIcon when not provided.',
    a11y: 'Acts like a menu: aria-haspopup defaults to "menu"; aria-expanded mirrors state; Esc/Outside click close; focus returns to trigger.',
    notes: 'disabled is a pure passthrough to Button; no Dropdown state classes or style variants.'
  }
});
