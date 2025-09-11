// packages/blueprints/src/components/Control/Control.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ControlStyleMap = defineStyleMap({
  base: [
    // Structure
    'inline-flex select-none items-center justify-center rounded-full',
    // Visual engine
    'transition-colors outline-none'
  ] as const,

  // Size definitions (layout bucket works fine for enumerated sizes)
  layout: {
    lg: ['h-6', 'w-6'] as const, // 24px
    sm: ['h-4', 'w-4'] as const // 16px
  },

  // Style axis — token-first classes by role/state
  variants: {
    brand: [
      'bg-comp-control-brand-color-background-default',
      'border',
      'border-comp-control-brand-color-border-default',
      'hover:bg-comp-control-brand-color-background-hover',
      'active:bg-comp-control-brand-color-background-active'
    ] as const,

    dark: [
      'bg-comp-control-dark-color-background-default',
      'border',
      'border-comp-control-dark-color-border-default',
      'hover:bg-comp-control-dark-color-background-hover',
      'active:bg-comp-control-dark-color-background-active'
    ] as const,

    mid: [
      'bg-comp-control-mid-color-background-default',
      'border',
      'border-comp-control-mid-color-border-default',
      'hover:bg-comp-control-mid-color-background-hover',
      'active:bg-comp-control-mid-color-background-active'
    ] as const
  },

  state: {
    // Spec shows a distinct “isFocused” visualization; since this element isn’t focusable,
    // we use a data attribute from the generator (e.g., data-focused={focused || undefined}).
    focused: [
      'data-[focused=true]:ring-2',
      'data-[focused=true]:ring-comp-control-focus-color-ring',
      'data-[focused=true]:ring-offset-2'
    ] as const
  }
});
