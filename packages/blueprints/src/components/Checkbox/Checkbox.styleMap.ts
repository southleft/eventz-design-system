// packages/blueprints/src/components/Checkbox/Checkbox.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const CheckboxStyleMap = defineStyleMap({
  base: [] as const,

  slots: {
    container: ['inline-flex', 'items-start', 'gap-2', 'select-none'] as const,

    // Square control (always rendered) — base/unchecked visuals + focus ring
    control: [
      'border',
      'border-comp-checkbox-unchecked-color-border-default',
      'bg-comp-checkbox-unchecked-color-background-default',
      'hover:bg-comp-checkbox-unchecked-color-background-hover',
      'active:bg-comp-checkbox-unchecked-color-background-active',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-checkbox-focus-color-ring',
      'focus-visible:ring-offset-2'
    ] as const,

    // Checkmark/filled indicator — only rendered when checked
    indicator: [
      'bg-comp-checkbox-checked-color-background-default',
      'border-comp-checkbox-checked-color-border-default',
      'hover:bg-comp-checkbox-checked-color-background-hover',
      'active:bg-comp-checkbox-checked-color-background-active',
      'text-comp-checkbox-checked-color-icon-default'
    ] as const,

    label: ['text-color-content-default', 'text-sm', 'leading-tight'] as const,
    hint: ['text-color-content-subtle', 'text-xs'] as const
  },

  // Size is defined visually on the control via utilities until tokens exist.
  layout: {},

  // No variants — checked/unchecked are not enum variants
  variants: {},

  state: {
    // Generator applies disabled hooks to the container wrapper
    disabled: ['opacity-50', 'pointer-events-none'] as const
  }
});
