// packages/blueprints/src/components/TextLink/TextLink.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const TextLinkStyleMap = defineStyleMap({
  base: [
    // Structure
    'inline-flex',
    'items-center',
    'align-baseline',
    'gap-1.5',
    'text-sm',
    'whitespace-nowrap',
    'transition-colors',
    'outline-none',
    'rounded-sm',

    // Focus ring color via token; thickness/offset via utilities
    'focus-visible:ring-2',
    'focus-visible:ring-comp-text-link-focus-color-ring',
    'focus-visible:ring-offset-2',

    // Disabled baseline (anchors don’t support :disabled)
    'aria-disabled:opacity-50',
    'aria-disabled:pointer-events-none',
    'aria-disabled:select-none'
  ] as const,

  slots: {
    startIcon: ['shrink-0', '-ml-0.5'] as const,
    label: [] as const,
    endIcon: ['shrink-0', '-mr-0.5'] as const
  },

  // Emphasis variants map to tokenized foreground colors.
  variants: {
    brand: [
      'text-comp-text-link-brand-color-foreground-default',
      'hover:text-comp-text-link-brand-color-foreground-hover',
      'active:text-comp-text-link-brand-color-foreground-active'
    ] as const,

    strong: [
      'text-comp-text-link-strong-color-foreground-default',
      'hover:text-comp-text-link-strong-color-foreground-hover',
      'active:text-comp-text-link-strong-color-foreground-active'
    ] as const,

    subtle: [
      'text-comp-text-link-subtle-color-foreground-default',
      'hover:text-comp-text-link-subtle-color-foreground-hover',
      'active:text-comp-text-link-subtle-color-foreground-active'
    ] as const,

    inverted: [
      'text-comp-text-link-inverted-color-foreground-default',
      'hover:text-comp-text-link-inverted-color-foreground-hover',
      'active:text-comp-text-link-inverted-color-foreground-active'
    ] as const
  },

  state: {
    // Toggle via <a aria-disabled="true"> from the generator
    disabled: ['aria-disabled:text-comp-text-link-disabled-color-foreground'] as const
  }
});
