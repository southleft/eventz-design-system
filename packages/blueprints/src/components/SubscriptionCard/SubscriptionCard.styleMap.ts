// packages/blueprints/src/components/SubscriptionCard/SubscriptionCard.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const SubscriptionCardStyleMap = defineStyleMap({
  component: 'SubscriptionCard',

  // Mirrors runtime base class literals (no border token in base).
  base: [
    'flex flex-col gap-0.5 p-4 rounded-md border bg-color-background-none transition-colors',
    'text-left w-123.25'
  ] as const,

  slots: {
    // Header
    header: ['flex items-start justify-between gap-1'] as const,
    terms: ['text-3xl font-bold text-color-content-default'] as const,

    // Applied only when a consumer provides custom `cancel` slot content AND isActive=true.
    // Do NOT apply these classes to the default TextLink.
    cancel: ['text-sm font-medium text-color-content-weak'] as const,

    // Inactive-only subtitle
    subtitle: ['text-sm text-color-content-weak'] as const,

    // Active details
    details: ['flex flex-col gap-0.25'] as const,
    detailRow: ['flex items-center gap-0.5'] as const,
    detailLabel: ['uppercase text-sm w-33.75 font-medium text-color-content-default'] as const,
    detailValue: ['text-sm text-color-content-weak'] as const
  },

  variants: {},

  // Reflects runtime: two explicit states; no default border in base.
  state: {
    isActive: ['border-color-background-utility-danger'],
    'isActive=false': ['border-color-background-utility-success']
  }
});
