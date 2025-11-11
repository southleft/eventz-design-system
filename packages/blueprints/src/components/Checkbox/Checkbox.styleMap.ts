// packages/blueprints/src/components/Checkbox/Checkbox.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const CheckboxStyleMap = defineStyleMap({
  base: [] as const,

  slots: {
    // container matches wrapper <div>
    container: ['inline-flex', 'items-start', 'gap-2', 'select-none'] as const,

    // control matches Radix.Checkbox.Root
    control: [
      'size-20',
      'bg-background-none',
      'border-2',
      'border-color-content-weak',
      'rounded-xs',
      'inline-flex',
      'justify-center',
      'items-center',
      'focus-visible-brand'
    ] as const,

    // indicator matches Radix.Checkbox.Indicator (renders only when checked)
    indicator: [
      'bg-color-content-brand',
      'border-color-content-brand',
      'border-[2.5px]',
      'h-16',
      'rounded-xs',
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
