// packages/blueprints/src/components/CheckboxGroup/CheckboxGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const CheckboxGroupStyleMap = defineStyleMap({
  base: ['inline-flex', 'flex-col', 'gap-1', 'border-none', 'py-8'] as const,

  slots: {
    label: [
      'inline-flex',
      'gap-1',
      'text-color-content-default',
      'text-xs',
      'uppercase'
      // Inline info trigger sits here visually; see `infoTrigger` slot for its classes.
    ] as const,

    infoTrigger: [
      'border-none',
      'bg-background-none',
      'text-color-content-subtle',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2'
    ] as const,

    infoContent: [
      'max-w-xs',
      'rounded-md',
      'bg-color-content-default',
      'p-3',
      'text-sm',
      'shadow-lg'
    ] as const,

    hint: ['text-color-content-subtle', 'text-xs', '-mt-8'] as const,

    choices: ['flex', 'flex-col', 'gap-3'] as const,

    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
      'mt-1',
      'inline-flex',
      'gap-2',
      'pl-1'
      // Leading error icon is decorative; sizing remains a runtime concern.
    ] as const
  },

  layout: {},

  variants: {},

  state: {
    // No state flags currently. Add a focusWithin or hasError flag here if design introduces it later.
  }
});
