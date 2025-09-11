// packages/blueprints/src/components/TextLink/TextLink.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const TextLinkStyleMap = defineStyleMap({
  base: [
    // Inline behavior + underline
    'inline-flex items-center align-baseline gap-1.5',
    'underline underline-offset-2',
    'transition-colors',
    'outline-none rounded-sm',

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
    container: [] as const,
    startIcon: ['shrink-0', '-ml-0.5'] as const,
    label: [] as const,
    endIcon: ['shrink-0', '-mr-0.5'] as const
  },

  // Emphasis variants map to token classes for text + underline color.
  // If your Style Dictionary omits decoration tokens, keep `decoration-current`.
  variants: {
    strong: [
      'text-comp-text-link-strong-color-foreground-default',
      'hover:text-comp-text-link-strong-color-foreground-hover',
      'active:text-comp-text-link-strong-color-foreground-active',
      // underline color tokens (if present)
      'decoration-comp-text-link-strong-color-underline-default',
      'hover:decoration-comp-text-link-strong-color-underline-hover',
      'active:decoration-comp-text-link-strong-color-underline-active'
    ] as const,

    subtle: [
      'text-comp-text-link-subtle-color-foreground-default',
      'hover:text-comp-text-link-subtle-color-foreground-hover',
      'active:text-comp-text-link-subtle-color-foreground-active',
      'decoration-comp-text-link-subtle-color-underline-default',
      'hover:decoration-comp-text-link-subtle-color-underline-hover',
      'active:decoration-comp-text-link-subtle-color-underline-active'
    ] as const,

    inverted: [
      'text-comp-text-link-inverted-color-foreground-default',
      'hover:text-comp-text-link-inverted-color-foreground-hover',
      'active:text-comp-text-link-inverted-color-foreground-active',
      'decoration-comp-text-link-inverted-color-underline-default',
      'hover:decoration-comp-text-link-inverted-color-underline-hover',
      'active:decoration-comp-text-link-inverted-color-underline-active'
    ] as const,

    brand: [
      'text-comp-text-link-brand-color-foreground-default',
      'hover:text-comp-text-link-brand-color-foreground-hover',
      'active:text-comp-text-link-brand-color-foreground-active',
      'decoration-comp-text-link-brand-color-underline-default',
      'hover:decoration-comp-text-link-brand-color-underline-hover',
      'active:decoration-comp-text-link-brand-color-underline-active'
    ] as const
  },

  state: {
    // Toggle via <a aria-disabled="true"> from the generator
    disabled: ['aria-disabled:text-comp-text-link-disabled-color-foreground'] as const
  }
});
