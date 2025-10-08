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
  slots: ['trigger', 'content'],

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
    }
  },

  // Generator/adaptor guidance
  hints: {
    a11y: 'Icon-only trigger; callers must supply ariaLabel; the icon is decorative (aria-hidden).',
    radixAdapter: { uses: ['Popover'] },
    guideline: 'No event handlers are exposed; Radix Popover manages disclosure behavior.'
  }
});
