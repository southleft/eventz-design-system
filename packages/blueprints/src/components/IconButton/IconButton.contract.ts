// packages/blueprints/src/components/IconButton/IconButton.contract.ts
import { defineContract } from '../../utilities';

export const IconButtonContract = defineContract({
  component: 'IconButton',
  description:
    'Icon-only button. Requires an accessible label via `ariaLabel`. Accepts a single `icon` slot.',
  base: 'IconButton', // Radix UI per repo's radix-ui import convention

  props: {
    // Design variants (5 total)
    variant: {
      type: 'enum',
      options: ['primary', 'secondary', 'bare', 'knockout', 'bareKnockout'] as const,
      default: 'primary',
      description: 'Visual style of the icon button'
    },

    // Content
    icon: { type: 'slot', required: true, description: 'Icon element or any node to render' },

    // Accessibility (icon-only needs an accessible name)
    ariaLabel: {
      type: 'string',
      required: true,
      description: 'Accessible name for screen readers (applied to `aria-label`)'
    },

    // State
    loading: { type: 'boolean', default: false, description: 'Loading state (implies disabled)' },
    disabled: { type: 'boolean', default: false, description: 'Disables the control' },

    // Native passthrough
    type: { type: 'enum', options: ['button', 'submit', 'reset'] as const, default: 'button' },
    asChild: { type: 'boolean', default: false }
  },

  // Single slot in render order
  slots: ['icon'] as const,

  // Layout hint: square hit-area matching Button height (40px)
  layout: {
    type: 'container',
    tag: 'button',
    className: 'inline-flex items-center justify-center',
    children: [{ slot: 'icon', tag: 'span', className: 'shrink-0' }]
  },

  rules: [
    {
      // Avoid implicit anys; keep a generic "bag"
      validate: (props: Record<string, unknown>) => {
        const a = props['ariaLabel'];
        return typeof a === 'string' && a.trim().length > 0;
      },
      message: 'ariaLabel must be a non-empty string for IconButton.'
    },
    {
      when: { loading: true },
      imply: { disabled: true },
      hint: 'Loading forces disabled and sets aria-busy.'
    }
  ],

  styleMap: true,

  // Optional adapter hints for Radix props (if your generator uses them)
  hints: {
    radixAdapter: {
      variantMap: {
        primary: { variant: 'solid', color: 'blue' },
        secondary: { variant: 'soft', color: 'gray' },
        bare: { variant: 'ghost', color: 'gray' },
        knockout: { variant: 'outline', color: 'blue' },
        bareKnockout: { variant: 'outline', color: 'gray' } // transparent bg + outline vibe
      }
    },
    a11y: { preserveFocusRing: true }
  }
});
