// packages/blueprints/src/components/SubscriptionCard/SubscriptionCard.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const SubscriptionCardStyleMap = defineStyleMap({
  component: 'SubscriptionCard',

  // Base utilities now; token colors already mapped as classes here.
  base: [
    'flex',
    'flex-col',
    'gap-2',
    'p-4',
    'rounded-md',
    'border',
    'bg-color-background-none',
    'transition-colors',
    'text-left',
    'w-[439px]'
  ] as const,

  slots: {
    // Header
    header: ['flex', 'items-start', 'justify-between', 'gap-4'] as const,
    terms: ['text-3xl', 'font-bold', 'text-color-content-default'] as const,

    // Applied only when a consumer provides custom `cancel` slot content AND isActive=true.
    // Do NOT apply these classes to the default TextLink.
    cancel: ['text-sm', 'font-medium', 'text-color-content-weak'] as const,

    // Inactive-only subtitle
    subtitle: ['text-sm', 'text-color-content-weak'] as const,

    // Active details
    details: ['flex', 'flex-col', 'gap-1'] as const,
    detailRow: ['flex', 'items-center', 'gap-2'] as const,
    detailLabel: [
      'uppercase',
      'text-sm',
      'w-[135px]',
      'font-medium',
      'text-color-content-default'
    ] as const,
    detailValue: ['text-sm', 'text-color-content-weak'] as const
  },

  variants: {},

  // Use the prop name for state parity so the generator can toggle directly.
  state: {
    isActive: ['border-color-background-utility-danger'],
    isInactive: ['border-color-background-utility-success']
  }
});
