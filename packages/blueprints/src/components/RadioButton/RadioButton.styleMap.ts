// packages/blueprints/src/components/RadioButton/RadioButton.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const RadioButtonStyleMap = defineStyleMap({
  // Applies to the <label> wrapper in our layout hint
  base: ['inline-flex items-start gap-2 select-none'] as const,

  slots: {
    container: [] as const,
    label: ['text-comp-radio-color-foreground-label'] as const,
    hint: ['text-comp-radio-color-foreground-hint'] as const
  },

  // Selection axis tokens (default/hover/active). Applied to the radio control root.
  variants: {
    unchecked: [
      'bg-comp-radio-unchecked-color-background-default',
      'border',
      'border-comp-radio-unchecked-color-border-default',
      'hover:bg-comp-radio-unchecked-color-background-hover',
      'active:bg-comp-radio-unchecked-color-background-active'
      // indicator remains transparent/unset for unchecked
    ] as const,

    checked: [
      'bg-comp-radio-checked-color-background-default',
      'border',
      'border-comp-radio-checked-color-border-default',
      'hover:bg-comp-radio-checked-color-background-hover',
      'active:bg-comp-radio-checked-color-background-active',
      'text-comp-radio-checked-color-indicator-default' // inner dot / indicator color
    ] as const
  },

  state: {
    // Native :disabled styles plus token colors if your SD exports them
    disabled: [
      'disabled:bg-comp-radio-disabled-color-background',
      'disabled:border-comp-radio-disabled-color-border',
      'disabled:text-comp-radio-disabled-color-foreground',
      'disabled:opacity-50',
      'disabled:pointer-events-none'
    ] as const,

    // Focus ring applied to the radio control
    focused: [
      'focus-visible:ring-2',
      'focus-visible:ring-comp-radio-focus-color-ring',
      'focus-visible:ring-offset-2'
    ] as const
  }
});
