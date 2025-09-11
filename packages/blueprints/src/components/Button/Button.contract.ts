// packages/blueprints/src/components/Button/Button.contract.ts
import { defineContract } from '../../utilities';

export const ButtonContract = defineContract({
  component: 'Button',
  description: 'Clickable action control with a text label and optional start/end icons.',
  base: 'Button', // Radix UI primitive/theme per repo's radix-ui import convention

  props: {
    // Visual variants per design spec
    variant: {
      type: 'enum',
      options: ['primary', 'secondary', 'bare', 'knockout'] as const,
      default: 'primary',
      description: 'Visual style of the button'
    },

    // Content
    label: { type: 'string', required: true, description: 'Visible text label (required)' },
    startIcon: { type: 'slot', required: false, description: 'Leading icon or node' },
    endIcon: { type: 'slot', required: false, description: 'Trailing icon or node' },

    // Layout/state
    fullWidth: { type: 'boolean', default: false, description: 'Expands to 100% width' },
    loading: {
      type: 'boolean',
      default: false,
      description: 'Shows loading state; disables interaction'
    },
    disabled: { type: 'boolean', default: false, description: 'Disables the button' },

    // Native passthrough
    type: { type: 'enum', options: ['button', 'submit', 'reset'] as const, default: 'button' },
    asChild: { type: 'boolean', default: false }
  },

  // Render order for slots
  slots: ['startIcon', 'label', 'endIcon'] as const,

  // Optional layout hint (generators may use/ignore)
  layout: {
    type: 'container',
    tag: 'button',
    className: 'flex items-center justify-center gap-2',
    children: [
      { slot: 'startIcon', tag: 'span', className: 'shrink-0 -ml-0.5' },
      { slot: 'label', tag: 'span' },
      { slot: 'endIcon', tag: 'span', className: 'shrink-0 -mr-0.5' }
    ]
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const label = props['label'];
        return typeof label === 'string' && label.trim().length > 0;
      },
      message: 'label must be non-empty'
    },
    {
      when: { loading: true },
      imply: { disabled: true },
      hint: 'Loading forces disabled and sets aria-busy'
    }
  ],
  styleMap: true,

  // Optional adapter hints for Radix props (used only if generator supports it)
  hints: {
    radixAdapter: {
      variantMap: {
        primary: { variant: 'solid', color: 'blue' },
        secondary: { variant: 'soft', color: 'gray' },
        bare: { variant: 'ghost', color: 'gray' },
        knockout: { variant: 'outline', color: 'blue' }
      }
    }
  }
});
