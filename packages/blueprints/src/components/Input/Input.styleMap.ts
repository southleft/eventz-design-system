// packages/blueprints/src/components/Input/Input.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const InputStyleMap = defineStyleMap({
  base: [
    'inline-flex',
    'border-none',
    'flex-col',
    'gap-1',
    'disabled:opacity-50',
    'disabled:pointer-events-none'
  ] as const,

  slots: {
    label: ['inline-flex', 'gap-1', 'text-color-content-default', 'text-xs', 'uppercase'] as const,
    hint: ['text-color-content-subtle', 'text-xs'] as const,
    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
      'mt-1',
      'inline-flex',
      'gap-2',
      'items-center'
    ] as const,
    input: [
      'inline-flex',
      'items-center',
      'gap-2',
      'rounded-lg',
      'px-(--spacing-1_5)',
      'bg-comp-form-color-background-default',
      'border',
      'border-comp-form-color-border-default',
      'text-sm',
      'hover:bg-comp-form-color-background-hover',
      'hover:border-comp-form-color-hover',
      '[&:has(:focus-visible)]:ring-2',
      '[&:has(:focus-visible)]:ring-offset-4',
      '[&:has(:focus-visible)]:ring-comp-border-focus-ring',
      '[&:has(:focus-visible)]:ring-offset-color-background-default'
    ] as const,
    startIcon: ['shrink-0', '[&>svg]:size-4', 'py-(--spacing-1_5)', 'inline-flex', 'text-color-content-default'] as const,
    value: [
      'grow',
      'bg-transparent',
      'outline-none',
      'text-color-content-default',
      'placeholder-color-content-weak',
      'border-none',
      'py-(--spacing-1_5)',
      'focus:placeholder:opacity-0'
    ] as const,
    endIcon: ['shrink-0', '[&>svg]:size-4', 'py-(--spacing-1_5)', 'inline-flex', 'text-color-content-default'] as const
  },

  variants: {},

  state: {
    disabled: ['data-[disabled=true]:opacity-50', 'data-[disabled=true]:pointer-events-none'] as const,
    invalid: [
      'data-[invalid=true]:[&_[data-slot=input]]:border-comp-form-color-border-utility-danger'
    ] as const
  }
});
