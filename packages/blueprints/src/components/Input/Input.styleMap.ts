// packages/blueprints/src/components/Input/Input.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const InputStyleMap = defineStyleMap({
  // Applies to the outer wrapper (label + field + helper)
  base: ['flex flex-col gap-1'] as const,

  // Slot-level classes. The generator will also apply `input` classes to the actual input element.
  slots: {
    container: [] as const,
    label: ['text-comp-input-label-color-foreground'] as const,
    helperText: ['text-comp-input-helper-color-foreground'] as const,
    prefix: ['text-comp-input-adornment-color-foreground'] as const,
    suffix: ['text-comp-input-adornment-color-foreground'] as const,
    // Provide an explicit hook for the input element itself:
    input: [
      'h-10 w-full px-3 rounded-md outline-none transition-colors',
      'bg-comp-input-color-background-default',
      'text-comp-input-color-foreground-default',
      'placeholder:text-comp-input-color-foreground-placeholder',
      'border',
      'border-comp-input-color-border-default',
      'hover:bg-comp-input-color-background-hover',
      // Focus visuals (ring color via token; thickness/offset via utilities)
      'focus-visible:ring-2',
      'focus-visible:ring-comp-input-focus-color-ring',
      'focus-visible:ring-offset-2',
      // Disabled & readOnly base affordances
      'disabled:opacity-50 disabled:pointer-events-none',
      'read-only:bg-comp-input-readonly-color-background'
    ] as const
  },

  // Layout toggles
  layout: {
    fullWidth: ['w-full'] as const // Applies to the wrapper; input slot already uses w-full
  },

  // No visual variants (design uses one visual style); validation is handled in `state` below.
  variants: {},

  // State classes mirror prop names for deterministic toggling
  state: {
    // Validation
    invalid: [
      'data-[validation=invalid]:border-comp-input-invalid-color-border',
      'data-[validation=invalid]:bg-comp-input-invalid-color-background',
      'data-[validation=invalid]:text-comp-input-invalid-color-foreground',
      'data-[validation=invalid]:focus-visible:ring-comp-input-invalid-focus-color-ring'
    ] as const,
    valid: [
      'data-[validation=valid]:border-comp-input-valid-color-border',
      'data-[validation=valid]:bg-comp-input-valid-color-background',
      'data-[validation=valid]:text-comp-input-valid-color-foreground',
      'data-[validation=valid]:focus-visible:ring-comp-input-valid-focus-color-ring'
    ] as const,

    // Disabled/readOnly rely mostly on native pseudos on the input slot (above).
    // Expose data hooks if the wrapper needs styling parity.
    disabled: ['data-[disabled=true]:opacity-50'] as const,
    readOnly: ['data-[readonly=true]:bg-comp-input-readonly-color-background'] as const,
    required: [
      'data-[required=true]:after:content-["*"] data-[required=true]:after:ml-0.5'
    ] as const
  }
});
