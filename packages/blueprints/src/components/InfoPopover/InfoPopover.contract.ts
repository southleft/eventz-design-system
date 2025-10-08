import { defineContract } from '../../utilities/defineContract';

/**
 * InfoPopover — internal-first component used by form controls.
 * Thin wrapper around Radix Popover with an icon-only trigger.
 * Content is provided via children at the callsite.
 */
export default defineContract({
  base: 'div',
  component: 'InfoPopover',
  styleMap: true,

  // Slots reflect the runtime structure used in form controls today.
  slots: ['infoTrigger', 'infoContent'],

  // Public props — minimal to match current usage.
  props: {
    ariaLabel: {
      type: 'string',
      required: true,
      description: 'Accessible name for the icon-only trigger button.'
    },
    side: {
      type: 'enum',
      options: ['top', 'right', 'bottom', 'left'],
      default: 'top',
      description: 'Placement of the popover content relative to the trigger.'
    },
    sideOffset: {
      type: 'number',
      default: 8,
      description: 'Offset distance in pixels between trigger and content.'
    },
    onOpenChange: {
      type: 'callback',
      args: ['open: boolean'],
      description: 'Notifies the caller when the popover open state changes.'
    },
    contentId: {
      type: 'string',
      description: 'Optional id applied to the popover content for aria-describedby wiring.'
    }
  },

  // Generator/adaptor guidance
  hints: {
    a11y: 'Icon-only trigger rendered as a native button (type="button"); callers must supply ariaLabel; the icon is decorative (aria-hidden).',
    radixAdapter: { uses: ['Popover'] },
    guideline:
      'Runtime exposes an onOpenChange callback for parent controls to mirror disclosure state when needed.'
  }
});
