// packages/blueprints/src/components/Tag/Tag.contract.ts
import { defineContract } from '../../utilities';

export const TagContract = defineContract({
  component: 'Tag',
  description:
    'Label-style pill. Optional interactivity; supports parent/child variants and active state.',
  base: 'Box', // Radix UI generic container; generator can use `asChild` for anchor/button

  props: {
    // Spec "variant"
    variant: {
      type: 'enum',
      options: ['parent', 'child'] as const,
      default: 'parent',
      description: 'Visual style of the tag'
    },

    // Content
    label: { type: 'string', required: true, description: 'Visible tag text' },

    // Spec "isInteractive"
    isInteractive: {
      type: 'boolean',
      default: false,
      description:
        'Enables interactive affordances (hover/active/focus). When true, generator should render semantic interactive markup (e.g., <button> or <a asChild>).'
    },

    // Spec "isActive"
    isActive: {
      type: 'boolean',
      default: false,
      description: 'Applies active styling (useful for filter chips / selection).'
    },

    // Composition
    asChild: { type: 'boolean', default: false }
  },

  // One slot
  slots: ['label'] as const,

  // Layout hint (non-normative; helps agents compose)
  layout: {
    type: 'container',
    tag: 'span',
    className: 'inline-flex items-center justify-center gap-1.5 rounded-full',
    children: [{ slot: 'label', tag: 'span' }]
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const label = props['label'];
        return typeof label === 'string' && label.trim().length > 0;
      },
      message: 'label must be a non-empty string.'
    }
  ],

  styleMap: true,

  // Optional hints (purely advisory)
  hints: {
    a11y: {
      // When interactive, prefer semantic elements and expose pressed state if applicable
      recommendation:
        'If `isInteractive` is true, render a semantic <button> / <a> (via asChild) and reflect `isActive` with aria-pressed.'
    }
  }
});
