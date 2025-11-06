// packages/blueprints/src/components/NavigationContainer/NavigationContainer.contract.ts
import { defineContract } from '../../utilities';

export const NavigationContainerContract = defineContract({
  component: 'NavigationContainer',
  description:
    'Wrapper that provides navigation layout padding and neutral background. Consumer owns all content.',

  // Native element; no Radix primitive required.
  base: 'div',

  // No explicit props; standard HTML attributes (e.g., className) pass through at runtime.
  props: {},

  // No named slots; arbitrary children allowed.
  slots: [] as const,

  // Advisory only; structural classes belong in the styleMap.
  layout: {
    type: 'container',
    tag: 'div',
    className: []
  },

  styleMap: true,

  hints: {
    a11y: 'No special semantics; accessibility is defined by children.'
  }
});
