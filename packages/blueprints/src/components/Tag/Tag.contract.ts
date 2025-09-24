// packages/blueprints/src/components/Tag/Tag.contract.ts
import { defineContract } from '../../utilities';
import type { ContractHints } from '../../utilities/defineContract/types';

type TagContractHints = ContractHints & {
  generator?: {
    computedBase: string;
  };
};

export const TagContract = defineContract({
  component: 'Tag',
  description:
    'Label-style pill. Optional interactivity; supports parent/child variants and active state.',
  base: 'span', // Generator: when isInteractive is true, compute a <button type="button"> root.

  props: {
    // Spec "variant"
    variant: {
      type: 'enum',
      options: ['parent', 'child'] as const,
      default: 'parent',
      description: 'Visual style of the tag'
    },

    // Content
    label: {
      type: 'string',
      required: true,
      description: 'Visible tag text; provides the accessible name and must be non-empty.'
    },

    // Spec "isInteractive"
    isInteractive: {
      type: 'boolean',
      default: false,
      description:
        'When true, render semantic interactive markup (<button>) and enable focus/hover behavior. When false, render a non-focusable pill.'
    },

    // Spec "isActive"
    isActive: {
      type: 'boolean',
      default: false,
      description: 'Visual active styling only; component is not a toggle.'
    }
  },

  slots: [] as const,

  // Layout hint (non-normative; helps agents compose)
  layout: {
    type: 'container',
    tag: 'span'
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const label = props['label'];
        return typeof label === 'string' && label.trim().length > 0;
      },
      message: 'label must be a non-empty string.'
    },
    {
      when: { isInteractive: false },
      message: 'When `isInteractive` is false, variants are ignored (the `parent` visual is used).'
    }
  ],

  styleMap: true,

  // Optional hints (purely advisory)
  hints:
    ({
      generator: {
        computedBase: 'When `isInteractive` is true, render a <button type="button"> root; otherwise use <span>.'
      },
      a11y: {
        recommendation:
          'label provides the accessible name; skip `aria-pressed`; events are pass-through via ...rest.'
      }
    }) satisfies TagContractHints
});
