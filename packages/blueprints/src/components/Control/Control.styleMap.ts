// packages/blueprints/src/components/Control/Control.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ControlStyleMap = defineStyleMap({
  base: [
    // Structure
    'inline-flex select-none items-center justify-center rounded-full',
    // Visual engine
    'transition-colors outline-none'
  ] as const,

  // Variants (spec “styles”): brand, dark, light
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

    light: [
      'bg-comp-control-light-color-background-default',
      'border',
      'border-comp-control-light-color-border-default',
      'hover:bg-comp-control-light-color-background-hover',
      'active:bg-comp-control-light-color-background-active'
    ] as const
  },

  // Semantic, generator-applied state hooks (plain lists)
  state: {
    // Visual focus treatment
    focused: ['ring-2', 'ring-comp-control-focus-color-ring', 'ring-offset-2'] as const,

    // Size axis (moved from `layout`)
    sizeLg: ['h-6', 'w-6'] as const, // 24px
    sizeSm: ['h-4', 'w-4'] as const  // 16px
  }
});
