// packages/blueprints/src/components/Checkbox/Checkbox.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const CheckboxStyleMap = defineStyleMap({
  base: [
    // Applies to the <label> wrapper when we render using the layout hint
    'inline-flex items-start gap-2 select-none'
  ] as const,

  // Slot classes for a generated composition where the Radix <Checkbox> is the control,
  // and the text is the label. The "control" slot is implied by the root Radix element.
  slots: {
    container: [] as const,
    label: ['text-comp-checkbox-color-foreground-label'] as const
  },

  // Size is defined visually on the control (square) via utilities until tokens exist.
  layout: {},

  // Variants reflect the tri-state visuals using component tokens.
  variants: {
    unchecked: [
      // Base square: background, border; icon transparent
      'bg-comp-checkbox-unchecked-color-background-default',
      'border',
      'border-comp-checkbox-unchecked-color-border-default',
      'hover:bg-comp-checkbox-unchecked-color-background-hover',
      'active:bg-comp-checkbox-unchecked-color-background-active'
    ] as const,

    checked: [
      'bg-comp-checkbox-checked-color-background-default',
      'border',
      'border-comp-checkbox-checked-color-border-default',
      'hover:bg-comp-checkbox-checked-color-background-hover',
      'active:bg-comp-checkbox-checked-color-background-active',
      'text-comp-checkbox-checked-color-icon-default' // checkmark/indicator color
    ] as const,

    indeterminate: [
      'bg-comp-checkbox-indeterminate-color-background-default',
      'border',
      'border-comp-checkbox-indeterminate-color-border-default',
      'hover:bg-comp-checkbox-indeterminate-color-background-hover',
      'active:bg-comp-checkbox-indeterminate-color-background-active',
      'text-comp-checkbox-indeterminate-color-icon-default' // dash/indicator color
    ] as const
  },

  state: {
    // Native :disabled is supported on Radix checkbox
    disabled: [
      'disabled:bg-comp-checkbox-disabled-color-background',
      'disabled:border-comp-checkbox-disabled-color-border',
      'disabled:text-comp-checkbox-disabled-color-foreground',
      'disabled:opacity-50',
      'disabled:pointer-events-none'
    ] as const,

    // Focus visualization (applied to the control)
    focused: [
      'focus-visible:ring-2',
      'focus-visible:ring-comp-checkbox-focus-color-ring',
      'focus-visible:ring-offset-2'
    ] as const
  }
});
