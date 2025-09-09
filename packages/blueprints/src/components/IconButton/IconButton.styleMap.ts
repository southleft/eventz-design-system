// packages/blueprints/src/components/IconButton/IconButton.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const IconButtonStyleMap = defineStyleMap({
  base: [
    'inline-flex select-none items-center justify-center',
    'outline-none',
    'transition-colors',
    'focus-visible:ring-2',
    'focus-visible:ring-comp-icon-button-focus-color-ring',
    'focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'whitespace-nowrap'
  ] as const,

  // Square control (matches Button height)
  slots: {
    container: ['h-10', 'w-10', 'rounded-md'] as const,
    icon: ['shrink-0'] as const
  },

  variants: {
    primary: [
      'bg-comp-icon-button-primary-color-background-default',
      'text-comp-icon-button-primary-color-foreground-default',
      'hover:bg-comp-icon-button-primary-color-background-hover',
      'active:bg-comp-icon-button-primary-color-background-active'
    ] as const,

    secondary: [
      'bg-comp-icon-button-secondary-color-background-default',
      'text-comp-icon-button-secondary-color-foreground-default',
      'hover:bg-comp-icon-button-secondary-color-background-hover',
      'active:bg-comp-icon-button-secondary-color-background-active'
    ] as const,

    bare: [
      'bg-transparent',
      'text-comp-icon-button-bare-color-foreground-default',
      'hover:bg-comp-icon-button-bare-color-background-hover',
      'active:bg-comp-icon-button-bare-color-background-active'
    ] as const,

    knockout: [
      'bg-transparent',
      'text-comp-icon-button-knockout-color-foreground-default',
      'border',
      'border-comp-icon-button-knockout-color-border-default',
      'hover:bg-comp-icon-button-knockout-color-background-hover',
      'active:bg-comp-icon-button-knockout-color-background-active'
    ] as const,

    // Spec shows a separate “bare knockout” – transparent bg + outline semantics
    bareKnockout: [
      'bg-transparent',
      'text-comp-icon-button-bare-knockout-color-foreground-default',
      'border',
      'border-comp-icon-button-bare-knockout-color-border-default',
      'hover:bg-comp-icon-button-bare-knockout-color-background-hover',
      'active:bg-comp-icon-button-bare-knockout-color-background-active'
    ] as const
  },

  state: {
    loading: ['cursor-wait', 'data-[loading=true]:opacity-100'] as const
  }
});
