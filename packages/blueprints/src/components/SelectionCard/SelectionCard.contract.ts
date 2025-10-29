// packages/blueprints/src/components/SelectionCard/SelectionCard.contract.ts
import { defineContract } from '../../utilities';

export const SelectionCardContract = defineContract({
  component: 'SelectionCard',
  description:
    'Fixed-width (240px) selectable card for multi-select UIs with required icon and single-line label. Server-component friendly; no client handlers.',
  base: 'div',

  props: {
    label: {
      type: 'string',
      required: true,
      description: 'Visible text label (single line; provides accessible name).'
    },

    icon: {
      type: 'slot',
      required: true, // ← made required
      description: 'Required decorative icon (renders in a 48×48 box).'
    },

    isSelected: {
      type: 'boolean',
      default: false,
      description: 'Controls the selected visual state and aria-checked.'
    },

    ariaLabel: {
      type: 'string',
      required: false,
      description:
        'Optional accessible name when visible label is insufficient. Prefer label as the accessible name.'
    }
  },

  slots: ['icon', 'label'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { slot: 'icon', tag: 'div' },
      { slot: 'label', tag: 'div' }
    ]
  },

  rules: [
    {
      validate: ({ label }) => typeof label === 'string' && label.trim().length > 0,
      message: 'label must be a non-empty string'
    },
    {
      validate: ({ icon }) => !!icon,
      message: 'icon slot is required for SelectionCard'
    },
    {
      hint: 'Render root with role="checkbox", tabIndex=0, aria-checked={isSelected}, and data-selected={isSelected || undefined}. Icon wrapper must set aria-hidden="true".'
    },
    {
      hint: 'Normalize ariaLabel by trimming; omit aria-label when empty so the visible label remains the accessible name.'
    }
  ] as const,

  styleMap: true,

  hints: {
    a11y: 'Use checkbox semantics on the root (role="checkbox", tabIndex=0, aria-checked). Label provides accessible name; ariaLabel only when necessary.'
  }
});
