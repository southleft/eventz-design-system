// packages/blueprints/src/components/ScrollerRow/ScrollerRow.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'ScrollerRow',
  base: 'div',
  styleMap: true,

  // No custom props; accepts standard div attributes (including className) at runtime.
  props: {},

  // Pure layout wrapper; no internal slots
  slots: [] as const,

  hints: {
    a11y: [
      'Pure layout wrapper for scroller rows; applies flex row layout to its children.',
      'No role or region semantics; do not trap focus; defer focus rings to interactive children.',
      'Accepts standard div attributes (including className); at runtime, forward props and merge any consumer className with the base classes using composeClasses.'
    ].join(' ')
  }
});
