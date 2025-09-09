// packages/blueprints/src/components/Control/Control.contract.ts
import { defineContract } from '../../utilities';

export const ControlContract = defineContract({
  component: 'Control',
  description:
    'Non-interactive visual control used inside buttons and related UI. Supports style, size, and focused state.',
  base: 'Box', // Radix UI generic container per this repo's radix-ui import convention

  props: {
    // Design "style" axis
    style: {
      type: 'enum',
      options: ['brand', 'dark', 'mid'] as const,
      default: 'brand',
      description: 'Visual style of the control'
    },

    // Size axis (matches spec: lg, sm)
    size: {
      type: 'enum',
      options: ['lg', 'sm'] as const,
      default: 'lg',
      description: 'Control size'
    },

    // Focus visualization (component is not focusable; this toggles ring styles)
    focused: {
      type: 'boolean',
      default: false,
      description: 'Visual focus state (maps to data-focused)'
    },

    // Optional composition
    asChild: { type: 'boolean', default: false }
  },

  // No child slots in the spec (pure visual)
  slots: [] as const,

  // Optional layout hint (circle container)
  layout: {
    type: 'container',
    tag: 'span',
    className: 'inline-flex items-center justify-center rounded-full'
  },

  rules: [
    // Example guard: ensure size/style are present (enum default covers it; retained for pattern)
    {
      validate: (props: Record<string, unknown>) =>
        typeof props['style'] === 'string' && typeof props['size'] === 'string',
      message: 'style and size are required.'
    }
  ],

  styleMap: true,

  hints: {
    // No Radix visual props to sync; color is token-driven.
  }
});
