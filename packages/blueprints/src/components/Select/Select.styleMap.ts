import { defineStyleMap } from '../../utilities';

/**
 * SelectStyleMap
 * Select delegates most visuals to Input (trigger) and MenuItem (options).
 * We keep minimal container/trigger affordances here to align with Select.tsx.
 */
export const SelectStyleMap = defineStyleMap({
  slots: {
    /** Applied to RadixSelect.Viewport */
    viewport:
      'border rounded-lg -ml-[7px] !overflow-x-visible border-color-border-subtle bg-color-background-default',
    /** Applied to the Input trigger root so the inner input shows default cursor */
    trigger: '[&_input]:cursor-default'
  }
});
