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
    ] as const,

    hint: ['text-color-content-subtle', 'text-xs', '-mt-8'] as const,

    choices: ['flex', 'flex-col', 'gap-3'] as const,

    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
      'mt-1',
      'inline-flex',
      'gap-2',
      'items-center'
      // Leading error icon is decorative; sizing remains a runtime concern.
    ] as const
  },

  layout: {},

  variants: {},

  state: {
    // No state flags currently. Add a focusWithin or hasError flag here if design introduces it later.
  }
});
