// packages/blueprints/src/components/RadioButtonGroup/RadioButtonGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const RadioButtonGroupStyleMap = defineStyleMap({
  base: ['flex flex-col gap-2'] as const,

  slots: {
    container: [] as const,
    label: ['text-comp-radio-group-label-color-foreground'] as const,
    description: ['text-comp-radio-group-description-color-foreground'] as const,
    errorText: ['text-comp-radio-group-error-color-foreground'] as const
  },

  // Layout from the spec “selected nodes” is primarily spacing — handled by base
  layout: {},

  variants: {},

  state: {
    // Show a group-level focus ring when any child is focused
    focusWithin: [
      'data-[focus-within=true]:ring-2',
      'data-[focus-within=true]:ring-comp-radio-group-focus-color-ring',
      'data-[focus-within=true]:ring-offset-2'
    ] as const,

    // Error styles/use tokens if available
    error: [
      'data-[error=true]:ring-2',
      'data-[error=true]:ring-comp-radio-group-error-color-ring',
      'data-[error=true]:border-comp-radio-group-error-color-border'
    ] as const
  }
});
