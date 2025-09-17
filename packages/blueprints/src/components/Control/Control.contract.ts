// packages/blueprints/src/components/Control/Control.contract.ts
import { defineContract } from '../../utilities';

export const ControlContract = defineContract({
  component: 'Control',
  description:
    'Non-interactive visual control used inside buttons and related UI. Supports variant, size, and focused state.',
  base: 'Slot', // Radix primitive per primitives-only policy

  props: {
    // Spec calls these "styles"; treat as component variants
    variant: {
      type: 'enum',
      options: ['brand', 'dark', 'light'] as const, // mid -> light
      default: 'brand',
      description: 'Visual variant of the control'
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
      description: 'Visual focus state'
    },

    // Optional composition
    asChild: { type: 'boolean', default: false }
  },

  // No child slots in the spec (pure visual)
  slots: [] as const,

  // Advisory only — structural classes live in the styleMap
  layout: {
    type: 'container',
    tag: 'span',
    className: 'inline-flex items-center justify-center rounded-full'
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) =>
        typeof props['variant'] === 'string' && typeof props['size'] === 'string',
      message: 'variant and size are required.'
    }
  ],

  styleMap: true,

  hints: {
    // Visuals are token-driven; no Radix theme props
  }
});
