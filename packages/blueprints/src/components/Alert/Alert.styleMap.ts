// packages/blueprints/src/components/Alert/Alert.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const AlertStyleMap = defineStyleMap({
  // Always-on surface & interaction scaffolding
  base: [
    'relative',
    'w-full',
    'rounded-md',
    'border',
    'px-4',
    'py-3',
    'outline-none',
    'transition-colors',
    'focus-visible:ring-2',
    'focus-visible:ring-comp-alert-focus-color-ring',
    'focus-visible:ring-offset-2'
  ] as const,

  // Slots map to contract slots; container holds structure
  slots: {
    container: ['flex', 'items-start', 'gap-3'] as const,
    icon: ['mt-0.5', 'shrink-0'] as const,
    title: ['text-sm', 'font-semibold', 'leading-5'] as const,
    content: ['text-sm', 'leading-5'] as const,
    link: [
      'text-sm',
      'underline',
      'underline-offset-2',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2'
    ] as const
  },

  // Optional layout toggles (none required by spec)
  layout: {},

  // Visual variants are 1:1 with contract props.variant options
  variants: {
    success: [
      'bg-comp-alert-success-color-background-default',
      'text-comp-alert-success-color-foreground-default',
      'border-comp-alert-success-color-border-default'
    ] as const,
    info: [
      'bg-comp-alert-info-color-background-default',
      'text-comp-alert-info-color-foreground-default',
      'border-comp-alert-info-color-border-default'
    ] as const,
    warning: [
      'bg-comp-alert-warning-color-background-default',
      'text-comp-alert-warning-color-foreground-default',
      'border-comp-alert-warning-color-border-default'
    ] as const,
    danger: [
      'bg-comp-alert-danger-color-background-default',
      'text-comp-alert-danger-color-foreground-default',
      'border-comp-alert-danger-color-border-default'
    ] as const
  },

  // Semantic/data-driven flags (generator adds these classes when the state is true)
  state: {
    // Reserve space at end for a close affordance
    dismissible: ['pr-10'] as const,

    // Hide icon when iconStrategy === 'none'
    iconNone: ['[&_._icon]:hidden'] as const,

    // If a title is present, slightly soften body copy to create hierarchy
    hasTitle: ['[&_._content]:opacity-90'] as const,

    // If a trailing link/action is present, add a little start margin to separate from content
    hasLink: ['[&_._link]:ml-2'] as const
  }
});
