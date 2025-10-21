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
