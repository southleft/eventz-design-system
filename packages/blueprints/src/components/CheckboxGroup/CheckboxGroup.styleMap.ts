// packages/blueprints/src/components/CheckboxGroup/CheckboxGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const CheckboxGroupStyleMap = defineStyleMap({
  base: ['flex flex-col gap-2'] as const,

  slots: {
    container: [] as const,
    header: ['text-comp-checkbox-group-header-color-foreground'] as const,
    headerDescription: ['text-comp-checkbox-group-description-color-foreground'] as const,
    helpLabel: [
      'text-comp-checkbox-group-help-color-foreground',
      'hover:text-comp-checkbox-group-help-color-foreground-hover',
      'underline',
      'decoration-comp-checkbox-group-help-color-underline'
    ] as const
  },

  // Layout examples the spec shows (selected note/spacing) are driven by container spacing.
  layout: {},

  variants: {},

  state: {
    // If the group has a focused visual (focus within), expose a data hook:
    // generator can set data-[focus-within=true] when any child checkbox is focused.
    focusWithin: [
      'data-[focus-within=true]:ring-2',
      'data-[focus-within=true]:ring-comp-checkbox-group-focus-color-ring',
      'data-[focus-within=true]:ring-offset-2'
    ] as const
  }
});
