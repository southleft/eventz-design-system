// packages/blueprints/src/components/FormElement/FormElement.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const FormElementStyleMap = defineStyleMap({
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

    /**
     * Row chrome for the control. Mirrors Input but generalized, and supports chip wrapping.
     * Focus ring remains on the row via :has(:focus-visible).
     */
    row: [
      'inline-flex',
      'items-start',
      'gap-2',
      'gap-y-1',
      'rounded-lg',
      'px-(--spacing-1_5)',
      'bg-comp-form-color-background-default',
      'border',
      'border-comp-form-color-border-default',
      'text-sm',
      'hover:bg-comp-form-color-background-hover',
      'hover:border-comp-form-color-hover',
      'flex-wrap',
      '[&:has(:focus-visible)]:ring-2',
      '[&:has(:focus-visible)]:ring-offset-4',
      '[&:has(:focus-visible)]:ring-comp-border-focus-ring',
      '[&:has(:focus-visible)]:ring-offset-color-background-default'
    ] as const,

    startIcon: [
      'shrink-0',
      '[&>svg]:size-4',
      'py-(--spacing-1_5)',
      'inline-flex',
      'text-color-content-default'
    ] as const,

    /**
     * Prefix region for chips/badges. Allows wrapping and vertical scroll when clamped by runtime.
     * Runtime may set a max-height on this region based on `maxRows`.
     */
    prefix: [
      'inline-flex',
      'flex-wrap',
      'items-center',
      'gap-1',
      'py-(--spacing-1_5)',
      'overflow-y-auto'
    ] as const,

    value: [
      'grow',
      'bg-transparent',
      'outline-none',
      'text-color-content-default',
      'placeholder-color-content-weak',
      'border-none',
      'py-(--spacing-1_5)',
      'min-w-0',
      'focus:placeholder:opacity-0'
    ] as const,

    endIcon: [
      'shrink-0',
      '[&>svg]:size-4',
      'py-(--spacing-1_5)',
      'inline-flex',
      'text-color-content-default'
    ] as const,

    /**
     * Optional trailing affordance area after endIcon.
     */
    suffix: ['inline-flex', 'items-center', 'gap-1', 'py-(--spacing-1_5)'] as const
  },

  variants: {},

  state: {
    disabled: [
      'data-[disabled=true]:opacity-50',
      'data-[disabled=true]:pointer-events-none'
    ] as const,
    invalid: [
      'data-[invalid=true]:[&_[data-slot=row]]:border-comp-form-color-border-utility-danger'
    ] as const
  }
});
