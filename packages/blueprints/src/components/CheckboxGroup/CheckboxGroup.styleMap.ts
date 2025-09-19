// packages/blueprints/src/components/CheckboxGroup/CheckboxGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const CheckboxGroupStyleMap = defineStyleMap({
  base: ['inline-flex', 'flex-col', 'gap-8'] as const,

  slots: {
    label: [
      'text-color-content-default',
      'text-xs',
      'uppercase'
      // Info trigger icon lives inline here and defaults to text-color-content-subtle;
      // focus styles are pulled from shared utilities at runtime.
    ] as const,
    hint: ['text-color-content-subtle', 'text-xs'] as const,
    choices: ['flex', 'flex-col', 'gap-4'] as const,
    error: [
      'text-color-danger-subtle',
      'text-xs'
      // Leading error icon is decorative; runtime may add a sizing utility.
    ] as const
  },

  layout: {},

  variants: {},

  state: {
    // Future focusWithin data-flag can be added if the design introduces a group-level ring.
  }
});
