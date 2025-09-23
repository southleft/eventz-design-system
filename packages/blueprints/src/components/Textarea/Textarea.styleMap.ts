import { defineStyleMap } from '../../utilities';

export const TextareaStyleMap = defineStyleMap({
  base: [
    'inline-flex',
    'border-none',
    'flex-col',
    'gap-1',
    // visual disabled affordance at wrapper level
    'disabled:opacity-50',
    'disabled:pointer-events-none'
  ] as const,

  slots: {
    label: ['inline-flex', 'gap-1', 'text-color-content-default', 'text-xs', 'uppercase'] as const,
    infoTrigger: [
      'border-none',
      'bg-background-none', // token-driven per design
      'text-color-content-subtle',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2'
    ] as const,
    infoContent: [
      'max-w-xs',
      'rounded-md',
      'bg-color-content-default',
      'p-3',
      'text-sm',
      'shadow-lg'
    ] as const,

    textArea: [
      // row wrapper
      'inline-flex',
      'items-center',
      'gap-2',
      'rounded-lg',
      'px-(--spacing-1_5)',
      'text-color-content-default',
      'bg-comp-form-color-background-default',
      'border',
      'border-comp-form-color-border-default',
      'text-sm',
      'hover:bg-comp-form-color-background-hover',
      'hover:border-comp-form-color-hover'
      // (no focus classes here per decision — focus lives on `value`)
    ] as const,

    startIcon: [
      'shrink-0',
      '[&>svg]:size-4',
      'py-(--spacing-1_5)',
      'inline-flex',
      'text-color-content-default'
    ] as const,

    // native <textarea/>
    value: [
      'grow',
      'bg-transparent',
      'outline-none',
      'text-color-content-default',
      'placeholder-color-content-weak',
      'border-none',
      'py-(--spacing-1_5)',
      'focus:placeholder:opacity-0',
      // focus ring on the focusable element
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2'
    ] as const,

    endIcon: [
      'shrink-0',
      '[&>svg]:size-4',
      'py-(--spacing-1_5)',
      'inline-flex',
      'text-color-content-default'
    ] as const,

    hint: ['text-color-content-subtle', 'text-xs'] as const,
    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
      'mt-1',
      'inline-flex',
      'gap-2',
      'pl-1'
    ] as const
  },

  variants: {},

  state: {
    // targeted state (kept alongside visual `disabled:*` on base)
    disabled: [
      'data-[disabled=true]:opacity-50',
      'data-[disabled=true]:pointer-events-none'
    ] as const,

    invalid: [
      'data-[invalid=true]:[&_[data-slot=textArea]]:border-comp-form-color-border-utility-danger'
    ] as const
  }
});
