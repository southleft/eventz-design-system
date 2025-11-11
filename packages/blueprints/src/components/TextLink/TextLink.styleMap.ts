// packages/blueprints/src/components/TextLink/TextLink.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const TextLinkStyleMap = defineStyleMap({
  base: [
    'inline-flex',
    'items-center',
    'select-none',
    'no-underline',
    'gap-2',
    'text-sm',
    'whitespace-nowrap',
    'transition-colors',
    'outline-none',
    'rounded-sm',
    'focus-visible-brand',
    'aria-disabled:opacity-50',
    'aria-disabled:pointer-events-none',
    'aria-disabled:select-none'
  ] as const,

  slots: {
    startIcon: ['shrink-0', '-ml-0.5', 'pt-2'] as const,
    label: [] as const,
    endIcon: ['shrink-0', '-mr-0.5', 'pt-2'] as const
  },

  variants: {
    brand: [
      'text-color-content-brand',
      'hover:text-color-content-brand-hover',
      'font-bold'
    ] as const,
    strong: [
      'text-color-content-default',
      'hover:text-color-content-default-hover',
      'font-medium'
    ] as const,
    subtle: ['text-color-content-weak', 'hover:text-color-content-weak-hover'] as const,
    inverted: [
      'text-comp-button-primary-color-content-default',
      'hover:text-comp-button-primary-color-content-hover',
      'active:text-comp-button-primary-color-content-active'
    ] as const
  },

  state: {} as const
});
