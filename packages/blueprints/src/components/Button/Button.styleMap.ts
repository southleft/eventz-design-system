// packages/blueprints/src/components/Button/Button.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ButtonStyleMap = defineStyleMap({
  // Base classes (token-first where possible)
  base: [
    'inline-flex select-none items-center justify-center',
    'font-medium',
    'transition-colors',
    'outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-comp-button-focus-color-ring',
    'focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'whitespace-nowrap'
  ] as const,

  // Single default size per spec (no size prop in contract)
  slots: {
    container: ['h-10', 'px-4', 'gap-2', 'rounded-md'] as const,
    startIcon: ['shrink-0', '-ml-0.5'] as const,
    label: [] as const,
    endIcon: ['shrink-0', '-mr-0.5'] as const
  },

  layout: {
    fullWidth: ['w-full'] as const
  },

  // Variants map 1:1 to the contract `variant` options
  variants: {
    primary: [
      'bg-comp-button-primary-color-background-default',
      'text-comp-button-primary-color-foreground-default',
      'hover:bg-comp-button-primary-color-background-hover',
      'active:bg-comp-button-primary-color-background-active'
      // If you have disabled tokens, you can add:
      // 'disabled:bg-comp-button-primary-color-background-disabled',
      // 'disabled:text-comp-button-primary-color-foreground-disabled',
    ] as const,

    secondary: [
      'bg-comp-button-secondary-color-background-default',
      'text-comp-button-secondary-color-foreground-default',
      'hover:bg-comp-button-secondary-color-background-hover',
      'active:bg-comp-button-secondary-color-background-active'
      // Optional disabled tokens:
      // 'disabled:bg-comp-button-secondary-color-background-disabled',
      // 'disabled:text-comp-button-secondary-color-foreground-disabled',
    ] as const,

    bare: [
      'bg-transparent',
      'text-comp-button-bare-color-foreground-default',
      'hover:bg-comp-button-bare-color-background-hover',
      'active:bg-comp-button-bare-color-background-active'
    ] as const,

    knockout: [
      'bg-transparent',
      'text-comp-button-knockout-color-foreground-default',
      'border',
      'border-comp-button-knockout-color-border-default',
      'hover:bg-comp-button-knockout-color-background-hover',
      'active:bg-comp-button-knockout-color-background-active'
    ] as const
  },

  state: {
    // Extra hook for loading UI tweaks; aria-disabled handled by rules in contract
    loading: ['cursor-wait', 'data-[loading=true]:opacity-100'] as const
  }
});
