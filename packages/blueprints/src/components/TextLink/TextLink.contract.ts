// packages/blueprints/src/components/TextLink/TextLink.contract.ts
import { defineContract } from '../../utilities';

export const TextLinkContract = defineContract({
  component: 'TextLink',
  description:
    'Inline text link with optional start/end icons. Emphasis variants: strong, subtle, inverted, brand.',
  base: 'Link', // Radix UI per repo's `radix-ui` import convention

  props: {
    // Design "emphasis" variants (spec)
    emphasis: {
      type: 'enum',
      options: ['strong', 'subtle', 'inverted', 'brand'] as const,
      default: 'strong',
      description: 'Visual emphasis level for the link'
    },

    // Content
    label: { type: 'string', required: true, description: 'Visible link text' },
    startIcon: { type: 'slot', required: false, description: 'Leading icon or node' },
    endIcon: { type: 'slot', required: false, description: 'Trailing icon or node' },

    // Navigation
    href: { type: 'string', required: true, description: 'Link destination (URL or path)' },

    // State
    disabled: {
      type: 'boolean',
      default: false,
      description:
        'Disables interaction (applies aria-disabled and prevents pointer/keyboard activation)'
    },

    // Native passthrough / composition
    asChild: { type: 'boolean', default: false }
  },

  // Slot render order
  slots: ['startIcon', 'label', 'endIcon'] as const,

  // Optional layout hint (inline composition)
  layout: {
    type: 'container',
    tag: 'a',
    className: 'inline-flex items-center align-baseline gap-1.5',
    children: [
      { slot: 'startIcon', tag: 'span', className: 'shrink-0 -ml-0.5' },
      { slot: 'label', tag: 'span' },
      { slot: 'endIcon', tag: 'span', className: 'shrink-0 -mr-0.5' }
    ]
  },

  rules: [
    {
      // Keep param typed for strict mode and agent copy-paste
      validate: (props: Record<string, unknown>) => {
        const label = props['label'];
        const href = props['href'];
        return (
          typeof label === 'string' &&
          label.trim().length > 0 &&
          typeof href === 'string' &&
          href.length > 0
        );
      },
      message: 'label and href must be non-empty strings.'
    }
  ],

  styleMap: true,

  // Optional adapter hints for Radix (if the generator wants to set Link color/underline props)
  hints: {
    radixAdapter: {
      // Radix Themes Link supports `highContrast`/`underline` props;
      // keep this as a hint only—tokens still define the actual colors.
      // Example mapping (informational):
      variantMap: {
        strong: { underline: 'always', highContrast: true },
        subtle: { underline: 'hover', highContrast: false },
        inverted: { underline: 'always', highContrast: true },
        brand: { underline: 'always', color: 'blue' }
      } as const
    }
  }
});
