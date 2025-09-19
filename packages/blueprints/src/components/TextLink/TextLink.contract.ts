// packages/blueprints/src/components/TextLink/TextLink.contract.ts
import { defineContract } from '../../utilities';

export const TextLinkContract = defineContract({
  component: 'TextLink',
  description:
    'Inline text link (styled like a button) with optional start/end icons; no underline. Variants: brand, strong, subtle, inverted.',
  base: 'a', // primitive bias: native anchor

  props: {
    // Visual variants (favor "variant" naming across components)
    variant: {
      type: 'enum',
      options: ['brand', 'strong', 'subtle', 'inverted'] as const,
      default: 'brand',
      description: 'Visual style of the link'
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
        'Signals disabled state (generator applies aria-disabled and disables interaction)'
    }
  },

  // Slot render order
  slots: ['startIcon', 'label', 'endIcon'] as const,

  // Optional layout hint (advisory only; classes live in styleMap)
  layout: {
    type: 'container',
    tag: 'a',
    children: [
      { slot: 'startIcon', tag: 'span' },
      { slot: 'label', tag: 'span' },
      { slot: 'endIcon', tag: 'span' }
    ]
  },

  styleMap: true
});
