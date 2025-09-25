// packages/blueprints/src/components/Alert/Alert.contract.ts
import { defineContract } from '../../utilities';

export const AlertContract = defineContract({
  component: 'Alert',
  description: 'Inline status banner with optional icon, title, link action, and dismiss control.',
  // Inline, non-blocking surface; Radix Themes Callout is the closest base.
  base: 'Callout',

  props: {
    variant: {
      type: 'enum',
      options: ['success', 'info', 'warning', 'danger'] as const,
      default: 'info'
    },

    // Content
    title: { type: 'string' },
    content: { type: 'string', required: true },

    // Icon behavior: auto (per variant), none, or render custom via slot
    iconStrategy: {
      type: 'enum',
      options: ['auto', 'none', 'custom'] as const,
      default: 'auto'
    },
    icon: { type: 'slot' },

    // Trailing link-style action, per spec
    link: { type: 'slot' },

    // Dismiss affordance
    dismissible: { type: 'boolean', default: false },

    // A11y (live region semantics)
    ariaLive: { type: 'enum', options: ['off', 'polite', 'assertive'] as const, default: 'polite' },
    role: { type: 'enum', options: ['status', 'alert'] as const, default: 'status' },

    // Parity with other components
    asChild: { type: 'boolean', default: false }
  },

  // Render order follows the anatomy: icon • title • content • link
  slots: ['icon', 'title', 'content', 'link'] as const,

  // Advisory only — structural classes belong in the styleMap
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex items-start gap-3'
  },

  rules: [
    {
      validate: (p: Record<string, unknown>) =>
        typeof p['content'] === 'string' && p['content'].trim().length > 0,
      message: 'content must be a non-empty string'
    }
  ],

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Callout'] as const }
    // A11y mapping is inferred from ariaLive/role by the generator.
  }
});
