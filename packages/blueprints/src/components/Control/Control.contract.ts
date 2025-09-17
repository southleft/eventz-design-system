// packages/blueprints/src/components/Control/Control.contract.ts
import { defineContract } from '../../utilities';

export const ControlContract = defineContract({
  component: 'Control',
  description:
    'Icon-only visual control used inside buttons and related UI. Single `icon` slot; requires `ariaLabel` for accessible name.',
  base: 'Slot', // primitives-only policy; note: asChild is NOT supported here

  props: {
    // Spec calls these "styles"; treat as component variants
    variant: {
      type: 'enum',
      options: ['brand', 'dark', 'light'] as const,
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

    // Icon-only API (same pattern as IconButton)
    icon: { type: 'slot', required: true, description: 'Icon element or any node to render' },
    ariaLabel: {
      type: 'string',
      required: true,
      description: 'Accessible name for screen readers (applied to `aria-label`)'
    }

    // NOTE: no `asChild` and no runtime states like `disabled` / `loading`
  },

  // Single slot in render order
  slots: ['icon'] as const,

  // Advisory only — structural classes live in the styleMap
  layout: {
    type: 'container',
    tag: 'span',
    className: 'inline-flex items-center justify-center rounded-full',
    children: [{ slot: 'icon', tag: 'span', className: 'shrink-0' }]
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const a = props['ariaLabel'];
        return typeof a === 'string' && a.trim().length > 0;
      },
      message: 'ariaLabel must be a non-empty string for Control (icon-only).'
    }
  ],

  styleMap: true,

  hints: {
    // Visuals are token-driven; no Radix theme props
  }
});
