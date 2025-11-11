import { defineStyleMap } from '../../utilities/defineStyleMap';

/**
 * StyleMap for InfoPopover — mirrors the classes currently used inline
 * in CheckboxGroup for the info icon trigger and content panel.
 */
export default defineStyleMap({
  /**
   * Host/base — neutral wrapper to anchor Popover positioning if needed.
   * Keep minimal; layout/spacing is a concern of the parent.
   */
  base: 'relative dxyz-info-popover',

  /**
   * No variants for this internal component.
   */
  variants: {},

  /**
   * States are kept minimal; runtime may apply focus-visible on the trigger.
   * We encode focus ring tokens directly on the trigger slot below.
   */
  states: {},

  /**
   * Slot classes lifted from existing CheckboxGroup usage.
   * - trigger: icon button with subtle color and focus ring
   * - content: small info panel surface
   */
  slots: {
    infoTrigger:
      'inline-flex items-center justify-center shrink-0 border-none bg-background-none text-color-content-subtle focus-visible-brand rounded-full [&>svg]:size-16',
    infoContent:
      'max-w-xs rounded-md background-modal text-color-content-default p-3 text-sm shadow-lg'
  }
});
