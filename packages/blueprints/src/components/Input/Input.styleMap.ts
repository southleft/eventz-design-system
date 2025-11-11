// packages/blueprints/src/components/Input/Input.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const InputStyleMap = defineStyleMap({
  component: 'Input',
  description:
    'Control-only row (startIcon → input → endIcon). FormElement wraps this row to supply label, messaging, focus ring, etc.',

  base: [
    'inline-flex',
    'items-center',
    'gap-2',
    'py-(--spacing-1_5)',
    'px-(--spacing-2_5)'
  ] as const,

  slots: {
    startIcon: [
      'inline-flex',
      'items-center',
      'gap-2',
      'shrink-0',
      'size-20',
      'text-color-content-default'
    ] as const,
    input: [
      'grow',
      'bg-transparent',
      'outline-none',
      'text-color-content-default',
      'placeholder-color-content-weak',
      'border-none',
      'py-(--spacing-1_5)',
      'focus:placeholder:opacity-0'
    ] as const,
    endIcon: ['shrink-0', 'size-20', 'inline-flex', 'text-color-content-default'] as const
  },

  state: {
    invalid: [
      'data-[invalid=true]:[&_[data-slot=input]]:border-comp-form-color-border-utility-danger'
    ] as const
  }
});
