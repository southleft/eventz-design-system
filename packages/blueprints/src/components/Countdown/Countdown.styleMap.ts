import { defineStyleMap } from '../../utilities';

export const CountdownStyleMap = defineStyleMap({
  base: [
    // Layout/typography per design spec
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'w-full',
    'p-2',
    'text-3xl',
    'text-color-content-inverse'
  ] as const,

  slots: {
    container: [] as const
  },

  // Variants must mirror the contract's enum options
  variants: {
    default: ['bg-color-background-brand'] as const,
    expiring: ['bg-color-content-utility-danger-subtle'] as const
  }
});
