// packages/blueprints/src/components/Footer/Footer.contract.ts
import { defineContract } from '../../utilities';

export const FooterContract = defineContract({
  component: 'Footer',
  description: 'Wrapper that applies a footer gradient background. Consumer owns all content.',

  // Native element; no Radix primitive required for this simple wrapper.
  base: 'div',

  // No explicit props. Reserved/native props like `className`, `style`, `id`, etc.
  // are pass-through at runtime and intentionally not declared here.
  props: {},

  // No named slots; consumer provides arbitrary children.
  slots: [] as const,

  // Advisory only; structural classes belong in the styleMap.
  layout: {
    type: 'container',
    tag: 'div',
    className: []
  },

  styleMap: true,

  hints: {
    a11y: 'No special semantics; accessibility is driven by children content.'
  }
});
