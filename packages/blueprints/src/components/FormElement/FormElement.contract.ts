// packages/blueprints/src/components/FormElement/FormElement.contract.ts
import { defineContract } from '../../utilities';

export const FormElementContract = defineContract({
  component: 'FormElement',
  description:
    'Shared fieldset shell for form controls: label + info, row chrome with focus ring, and contextual messaging. Child control renders via Slot when asChild is true. Children are always rendered into the `value` slot; `asChild` only changes how props are passed to that child.',
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

    /** Consumer-provided className merged after composed classes. */
    className: { type: 'string', description: 'Optional consumer className merged last.' },

    /** Disabled state applied to the entire fieldset; forwarded to the slotted control when applicable. */
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Disables the fieldset and child control.'
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
   * label (+ info trigger) → infoContent → row → value → messaging.
   * Children from the consumer are placed into the `value` slot in both modes.
   */
  slots: [
    'label',
    'infoTrigger',
    'infoContent',
    'row',
    'value',
    'hint',
    'error'
  ] as const,

  layout: {
    type: 'container',
    tag: 'fieldset',
    children: [
      {
        slot: 'label',
        tag: 'Label.Root',
        children: [{ slot: 'infoTrigger' }] // element type owned by InfoPopover
      },
      { slot: 'infoContent', tag: 'div' },
      {
        slot: 'row',
        tag: 'div',
        children: [
          { slot: 'value', tag: 'input' }
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
      hint: 'Label primitive: Render the label slot using Radix Label (Label.Root) from the aggregator import, and link it to the slotted control via htmlFor/id.'
    },
    {
      when: {},
      hint: 'Children & asChild: Always render consumer children inside the value slot. When asChild=true, render the value via Radix Slot and inject id/aria-describedby/disabled/className into the child. When asChild=false, render a neutral container element for the value slot and do not inject these props; consumers are responsible for wiring their child control.'
    }
  ],

  styleMap: true,

  hints: {
    a11y:
      'Preserve keyboard focus ring; decorative icons are aria-hidden. Merge aria-describedby from rendered messaging (error preferred over hint; include info content id when open). Set data-disabled and data-invalid on the root to drive styleMap state selectors.'
  }
});
