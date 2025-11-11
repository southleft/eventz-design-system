import { defineStyleMap } from '../../utilities';

export const ComboboxStyleMap = defineStyleMap({
  base: ['relative', 'inline-block', 'w-full'] as const,

  slots: {
    anchor: ['relative', 'inline-block'] as const,

    panel: [
      'rounded-md',
      'border',
      'border-color-border-subtle',
      'z-50',
      'overflow-hidden',
      'ml-[14px]',
      '-mt-[28px]',
      'bg-color-background-default',
      'content-center'
    ] as const,

    empty: ['text-color-content-subtle', 'text-xs', 'px-2', 'py-1.5'] as const,

    value: [
      'flex',
      'flex-wrap',
      'items-center',
      'gap-1',
      'w-full',
      'py-(--spacing-1)',
      'px-(--spacing-2_5)'
    ] as const,

    clearAll: [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'border-0',
      'bg-background-none',
      'text-color-content-default',
      'focus-visible-brand',
      'transition-opacity',
      'opacity-0'
    ] as const,

    chips: ['flex', 'flex-wrap', 'items-center', 'gap-1', 'py-0.5'] as const,

    chip: [
      'inline-flex',
      'items-center',
      'gap-1',
      'rounded-xs',
      'border-0',
      'text-xs',
      'font-medium',
      'leading-[18px]',
      'bg-color-background-brand',
      'hover:bg-color-background-brand-hover',
      'text-color-content-inverse',
      'px-2',
      'h-22',
      'transition-colors',
      'group',
      'focus-visible-brand'
    ] as const,

    chipDismiss: [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'h-20',
      'w-20',
      'shrink-0',
      'border-0',
      'bg-color-background-brand',
      'group-hover:bg-color-background-brand-hover',
      'text-color-content-inverse',
      'focus-visible-brand'
    ] as const,

    startIcon: [
      'shrink-0',
      'py-(--spacing-1_5)',
      'inline-flex',
      'text-color-content-default'
    ] as const,

    endIcon: [
      'shrink-0',
      'py-(--spacing-1_5)',
      'inline-flex',
      'text-color-content-default'
    ] as const,

    menuItem: ['w-full', 'focus-visible-brand-inset'] as const,

    input: [
      'min-w-0',
      'flex-1',
      'bg-transparent',
      'outline-none',
      'border-0',
      'text-color-content-default',
      'placeholder:text-color-content-subtle',
      'focus:placeholder:opacity-0',
      'caret-transparent',
      'select-none'
    ] as const
  },

  state: {
    open: ['data-[open=true]:block', 'data-[open=false]:hidden'] as const,
    disabled: [
      'data-[disabled=true]:pointer-events-none',
      'data-[disabled=true]:opacity-50'
    ] as const,
    hasSelection: [
      'data-[has-selection=true]:[&_button[data-role=clear-all]]:opacity-100',
      'data-[has-selection=true]:[&_[data-slot=clearAll]]:opacity-100'
    ] as const
  }
});
