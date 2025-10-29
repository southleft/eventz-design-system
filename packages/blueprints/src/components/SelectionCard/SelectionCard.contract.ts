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
    className: [
      'w-[240px]',
      'inline-flex flex-col items-center justify-start',
      'gap-4 py-8 px-6',
      'rounded-lg bg-color-background-default',
      'cursor-pointer select-none outline-none'
    ],
    children: [
      { slot: 'icon', tag: 'div', className: ['size-12 shrink-0'] },
      { slot: 'label', tag: 'div', className: ['w-full text-center truncate'] }
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
      hint: 'Render root with role="checkbox", tabIndex=0, and aria-checked={isSelected}. Icon content should be aria-hidden="true".'
    }
  ] as const,

  styleMap: true,

  hints: {
    a11y: 'Use checkbox semantics on the root (role="checkbox", tabIndex=0, aria-checked). Label provides accessible name; ariaLabel only when necessary.'
  }
});
