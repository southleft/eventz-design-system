import { defineStyleMap } from '../../utilities';

export const ComboboxStyleMap = defineStyleMap({
  base: ['relative', 'inline-block', 'w-full'] as const,

  slots: {
    /** Popover panel wrapping the list; width matches field; tokenized background/border. */
    panel: [
      'mt-1',
      'w-full',
      'rounded-md',
      'border',
      'bg-comp-combobox-popover-color-background-default',
      'border-comp-combobox-popover-color-border-default',
      'shadow',
      'p-1',
      'z-50'
    ] as const,

    /** Scroll container for options. */
    list: ['max-h-60', 'overflow-auto', 'py-0.5'] as const,

    /** Empty-state row styling (when no matches). */
    empty: ['text-color-content-subtle', 'text-xs', 'px-2', 'py-1.5'] as const,

    clearAll: [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'h-20',
      'w-20',
      'border-0',
      'bg-background-none',
      'text-color-content-default',
      'hover:bg-color-background-default-hover',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-color-background-default',
      'transition-opacity',
      'opacity-0'
    ] as const,

    /** Container for selected chips inline before the input. */
    chips: ['flex', 'flex-wrap', 'items-center', 'gap-1', 'py-0.5'] as const,

    /** Individual chip pill. */
    chip: [
      'inline-flex',
      'items-center',
      'gap-1',
      'rounded-xs',
      'border',
      'border-color-border-subtle',
      'bg-color-background-default-subtle',
      'text-color-content-default',
      'text-xs',
      'font-medium',
      'leading-[18px]',
      'px-2',
      'h-24',
      'transition-colors',
      'hover:bg-color-background-default-hover',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-[-4px]'
    ] as const,

    /** Dismiss button inside the chip (icon-only). */
    chipDismiss: [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'h-16',
      'w-16',
      'shrink-0',
      'hover:bg-color-background-default-hover',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-offset-color-background-default'
    ] as const,

    /** Leading icon inside the field (optional; no reserved space when absent). */
    startIcon: [
      'shrink-0',
      '[&>svg]:size-4',
      'py-(--spacing-1_5)',
      'inline-flex',
      'text-color-content-default'
    ] as const,

    /** Inner text input inside the field (combobox query). */
    input: [
      'min-w-0',
      'flex-1',
      'bg-transparent',
      'outline-none',
      'border-0',
      'text-color-content-default',
      'placeholder:text-color-content-subtle',
      'focus:placeholder:opacity-0'
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
      'data-[has-selection=true]:[&_ [data-slot=clearAll]]:opacity-100'
    ] as const
  }
});
