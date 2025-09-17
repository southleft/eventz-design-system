// packages/blueprints/src/components/Button/Button.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ButtonStyleMap = defineStyleMap({
  // Mirrors the actual Button.tsx base classes (token-first where possible)
  base: [
    // layout & interaction
    'inline-flex',
    'select-none',
    'items-center',
    'justify-center',
    'transition-colors',
    'whitespace-nowrap',
    // typography
    'font-font-weight-medium',
    'text-sm',
    // focus ring (token)
    'focus-visible:ring',
    'focus-visible:ring-comp-border-focus-ring',
    // disabled
    'disabled:opacity-50',
    'disabled:pointer-events-none',
    // structural
    'h-24',
    'px-4',
    'gap-2',
    'rounded-md',
    // border thickness (as used by the component)
    'border-1'
  ] as const,

  // Slots used by the runtime component (no container wrapper)
  slots: {
    startIcon: ['shrink-0', '-ml-0.5'] as const,
    label: [] as const,
    endIcon: ['shrink-0', '-mr-0.5'] as const
  },

  // Variants match Button.tsx exactly
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
    ] as const
  },

  // Semantic state hooks the runtime can toggle (kept minimal)
  state: {
    loading: ['cursor-wait', 'data-[loading=true]:opacity-100'] as const
  }
});
