// packages/blueprints/src/components/IconButton/IconButton.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const IconButtonStyleMap = defineStyleMap({
  base: [
    'inline-flex',
    'select-none',
    'items-center',
    'justify-center',
    'outline-none',
    'transition-colors',
    'focus-visible:ring-2',
    'focus-visible:ring-comp-icon-button-focus-color-ring',
    'focus-visible:ring-offset-2',
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    'whitespace-nowrap'
  ] as const,

  slots: {
    container: ['h-32', 'w-32', 'rounded-md'] as const,
    icon: ['shrink-0', 'pt-1'] as const
  },

  variants: {
    primary: [
      'bg-comp-button-primary-color-background-default',
      'text-comp-button-primary-color-content-default',
      'border-comp-border-none',
      'hover:bg-comp-button-primary-color-background-hover',
      'active:bg-comp-button-primary-color-background-active'
    ] as const,

    secondary: [
      'bg-comp-button-color-background-default',
      'border-comp-button-color-border-default',
      'text-comp-button-color-content-default',
      'hover:bg-comp-button-color-background-hover',
      'active:bg-comp-button-color-background-active'
    ] as const,

    bare: [
      'bg-background-none',
      'text-comp-button-color-content-default',
      'border-comp-border-none',
      'hover:bg-comp-button-color-background-hover',
      'active:bg-comp-button-color-background-active'
    ] as const,

    knockout: [
      'bg-comp-button-color-background-knockout',
      'text-comp-button-color-content-default',
      'border-comp-border-none',
      'hover:bg-comp-button-color-background-knockout-hover',
      'active:bg-comp-button-color-background-knockout-active'
    ] as const,

    // Spec shows a separate “bare knockout” – transparent bg + outline semantics
    bareKnockout: [
      'bg-background-none',
      'text-comp-button-primary-color-content-default',
      'border-comp-border-none',
      'hover:bg-comp-button-color-background-hover',
      'active:bg-comp-button-color-background-active'
    ] as const
  },

  state: {
    loading: ['cursor-wait'] as const
  }
});
