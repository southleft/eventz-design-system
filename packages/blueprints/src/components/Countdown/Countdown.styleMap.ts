import { defineStyleMap } from '../../utilities';

export const CountdownStyleMap = defineStyleMap({
  base: [
    // Layout/typography
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'text-3xl',
    'text-color-content-inverse',
    'w-856'
  ] as const,

  slots: {
    container: [] as const
  },

  // Variants must mirror the contract's enum options
  variants: {
    default: ['bg-color-background-brand'] as const,
    expiring: ['bg-color-background-utility-danger'] as const
  },

  // Extra state class hooks the runtime can toggle based on derived conditions
  state: {
    running: [] as const,
    complete: [] as const,
    urgent: [] as const
  }
});
