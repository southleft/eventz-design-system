// packages/blueprints/src/components/Textarea/Textarea.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const TextareaStyleMap = defineStyleMap({
  // Wrapper (label + field + helper)
  base: ['flex flex-col gap-1'] as const,

  // Slot hooks (explicit hook for the <textarea/> element)
  slots: {
    container: [] as const,
    label: ['text-comp-textarea-label-color-foreground'] as const,
    helperText: ['text-comp-textarea-helper-color-foreground'] as const,
    textarea: [
      'min-h-24 w-full px-3 py-2 rounded-md outline-none transition-colors',
      'bg-comp-textarea-color-background-default',
      'text-comp-textarea-color-foreground-default',
      'placeholder:text-comp-textarea-color-foreground-placeholder',
      'border',
      'border-comp-textarea-color-border-default',
      'hover:bg-comp-textarea-color-background-hover',
      // Focus visuals (ring color via token; thickness/offset via utilities)
      'focus-visible:ring-2',
      'focus-visible:ring-comp-textarea-focus-color-ring',
      'focus-visible:ring-offset-2',
      // Disabled & readOnly base affordances
      'disabled:opacity-50 disabled:pointer-events-none',
      'read-only:bg-comp-textarea-readonly-color-background',
      // Reasonable default resize behavior
      'resize-y'
    ] as const
  },

  // Layout toggles
  layout: {
    fullWidth: ['w-full'] as const // wrapper toggle; textarea is already w-full
  },

  variants: {},

  state: {
    invalid: [
      'data-[validation=invalid]:border-comp-textarea-invalid-color-border',
      'data-[validation=invalid]:bg-comp-textarea-invalid-color-background',
      'data-[validation=invalid]:text-comp-textarea-invalid-color-foreground',
      'data-[validation=invalid]:focus-visible:ring-comp-textarea-invalid-focus-color-ring'
    ] as const,
    valid: [
      'data-[validation=valid]:border-comp-textarea-valid-color-border',
      'data-[validation=valid]:bg-comp-textarea-valid-color-background',
      'data-[validation=valid]:text-comp-textarea-valid-color-foreground',
      'data-[validation=valid]:focus-visible:ring-comp-textarea-valid-focus-color-ring'
    ] as const,

    // Wrapper parity
    disabled: ['data-[disabled=true]:opacity-50'] as const,
    readOnly: ['data-[readonly=true]:bg-comp-textarea-readonly-color-background'] as const,
    required: [
      'data-[required=true]:after:content-["*"] data-[required=true]:after:ml-0.5'
    ] as const
  }
});
