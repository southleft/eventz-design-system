// packages/blueprints/src/components/Control/Control.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ControlStyleMap = defineStyleMap({
  base: [
    // Structure
    'inline-flex',
    'select-none',
    'items-center',
    'justify-center',
    'rounded-full',
    // Visual engine
    'transition-colors',
    'outline-none',
    'whitespace-nowrap',
    // Focus-visible ring (matches component)
    'focus-visible:ring-2',
    'focus-visible:ring-comp-border-focus-ring',
    'focus-visible:ring-offset-2'
  ] as const,

  // Slots: icon-only control
  slots: {
    icon: ['shrink-0'] as const
  },

  // Variants (spec “styles”) — align with component token classes
  variants: {
    brand: [
      'bg-comp-button-primary-color-background-default',
      'text-comp-button-primary-color-content-default',
      'border-comp-border-none',
      'hover:bg-comp-button-primary-color-background-hover',
      'active:bg-comp-button-primary-color-background-active'
    ] as const,

    dark: [
      'bg-comp-button-color-background-knockout-blur',
      'text-comp-button-color-content-default',
      'border-comp-border-none',
      'hover:bg-comp-button-color-background-knockout-blur-hover',
      'active:bg-comp-button-color-background-knockout-blur-active'
    ] as const,

    light: [
      'bg-comp-button-color-background-default-blur',
      'text-comp-button-color-content-default',
      'border-comp-border-none',
      'hover:bg-comp-button-color-background-default-blur-hover',
      'active:bg-comp-button-color-background-default-blur-active'
    ] as const
  },

  // Semantic, generator-applied state hooks (plain lists; no data-[...])
  state: {
    // Visual focus treatment (kept separate from focus-visible)
    focused: ['ring-2', 'ring-comp-control-focus-color-ring', 'ring-offset-2'] as const,

    // Size axis (matches component h/w + icon svg sizing via slot selector)
    sizeLg: ['h-40', 'w-40', '[&._icon>svg]:size-20'] as const, // 40px button, 20px icon
    sizeSm: ['h-32', 'w-32', '[&._icon>svg]:size-16'] as const  // 32px button, 16px icon
  }
});
