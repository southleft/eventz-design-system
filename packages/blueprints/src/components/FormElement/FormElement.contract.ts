// packages/blueprints/src/components/FormElement/FormElement.contract.ts
import { defineContract } from '../../utilities';

export const FormElementContract = defineContract({
  component: 'FormElement',
  description:
    'Shared fieldset shell for form controls: label + info, row chrome with focus ring, optional adornments (start/end), optional prefix/suffix regions, and contextual messaging. Child control renders via Slot when asChild is true.',
  base: 'fieldset',

  props: {
    /** Visible label rendered with Radix Label and associated to the slotted control via htmlFor. */
    label: { type: 'string', description: 'Visible label text for the form element.' },

    /** Accessible name used when label is omitted. Applied to the slotted control. */
    ariaLabel: { type: 'string', description: 'ARIA label when no visible label is provided.' },

    /** Helper text shown beneath the row when no error is present. */
    hint: { type: 'string', description: 'Helper text below the control.' },

    /** Error message that replaces hint and takes priority in aria-describedby. */
    error: { type: 'string', description: 'Error message; supersedes hint when present.' },

    /** Supplemental information exposed via an inline info trigger + popover. */
    info: { type: 'string', description: 'Supplemental info shown via an inline popover.' },

    /** Leading adornment rendered at the start of the row (decorative). */
    startIcon: { type: 'slot', description: 'Leading adornment inside the row.' },

    /**
     * Prefix region rendered inside the row before the value slot.
     * Used by composite controls (e.g., Combobox) to render chips/badges.
     */
    prefix: { type: 'slot', description: 'Inline region before the value (chips, badges, etc.).' },

    /** Trailing adornment rendered at the end of the row (decorative). */
    endIcon: { type: 'slot', description: 'Trailing adornment inside the row.' },

    /** Optional trailing region for custom affordances (clear button, toggles). */
    suffix: { type: 'slot', description: 'Trailing region after endIcon for custom affordances.' },

    /** Consumer-provided className merged after composed classes. */
    className: { type: 'string', description: 'Optional consumer className merged last.' },

    /** Disabled state applied to the entire fieldset; forwarded to the slotted control when applicable. */
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Disables the fieldset and child control.'
    },

    /**
     * Maximum visual rows for the row content before internal scrolling engages for the prefix region.
     * The generator may translate this into a data-attribute/class that clamps height.
     */
    maxRows: {
      type: 'number',
      default: 2,
      description: 'Cap row growth before internal scroll (default 2).'
    },

    /**
     * When true, render the value via Radix Slot so id/aria/disabled/className pass through to the child control.
     * Consumers must ensure the child ultimately renders a focusable element.
     */
    asChild: {
      type: 'boolean',
      default: false,
      description: 'Render the value via Slot to pass props into the child.'
    }
  },

  /**
   * Slot order mirrors the rendered structure:
   * label (+ info trigger) → infoContent → row → adornments/prefix/value/suffix → messaging.
   */
  slots: [
    'label',
    'infoTrigger',
    'infoContent',
    'row',
    'startIcon',
    'prefix',
    'value',
    'endIcon',
    'suffix',
    'hint',
    'error'
  ] as const,

  layout: {
    type: 'container',
    tag: 'fieldset',
    children: [
      {
        slot: 'label',
        tag: 'label',
        children: [{ slot: 'infoTrigger', tag: 'button' }]
      },
      { slot: 'infoContent', tag: 'div' },
      {
        slot: 'row',
        tag: 'div',
        children: [
          { slot: 'startIcon', tag: 'span' },
          { slot: 'prefix', tag: 'div' },
          { slot: 'value', tag: 'input' },
          { slot: 'endIcon', tag: 'span' },
          { slot: 'suffix', tag: 'div' }
        ]
      },
      {
        type: 'container',
        tag: 'div',
        children: [
          { slot: 'hint', tag: 'div' },
          { slot: 'error', tag: 'div' }
        ]
      }
    ]
  },

  rules: [
    {
      when: {},
      hint: "When 'asChild' is true, inject id/disabled/aria-describedby/className into the slotted child via Radix Slot. Ensure the child renders a focusable element so the row's :has(:focus-visible) ring engages."
    },
    {
      when: {},
      hint: 'Provide either label or ariaLabel so the control exposes an accessible name. If both hint and error exist, render error instead of hint and merge the rendered ids (plus info content id when open) into aria-describedby on the child.'
    },
    {
      when: {},
      hint: 'Row layout supports wrapping for prefix content (chips). Generators may clamp height based on maxRows and make only the prefix region scroll when exceeded.'
    }
  ],

  styleMap: true,

  hints: {
    a11y: 'Preserve keyboard focus ring; decorative icons are aria-hidden. Use button with aria-label on chip dismiss affordances.'
  }
});
