// packages/blueprints/src/components/CheckboxGroup/CheckboxGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const CheckboxGroupStyleMap = defineStyleMap({
  base: ['inline-flex', 'flex-col', 'gap-1', 'border-none', 'py-2'] as const,

  slots: {
    label: [
      'inline-flex',
      'gap-2',
      'text-color-content-default',
      'text-xs',
      'uppercase'
    ] as const,

    hint: ['text-color-content-subtle', 'text-xs', '-mt-2'] as const,

    choices: ['flex', 'flex-col', 'gap-2'] as const,

    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
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
