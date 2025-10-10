import { defineStyleMap } from '../../utilities';

export const ToggleGroupStyleMap = defineStyleMap({
  base: ['inline-flex', 'rounded'] as const,

  slots: {
    item: [
      'flex',
      'h-35',
      'w-35',
      'items-center',
      'justify-center',
      'border-none',
      'outline-none',
      'focus:shadow-none',
      'bg-comp-button-color-background-knockout',
      'active:bg-comp-button-color-background-knockout-active',
      'active:text-comp-button-color-content-default-active',
      'text-comp-button-color-content-default',
      'first:rounded-l-sm',
      'last:rounded-r-sm',
      'hover:bg-comp-button-color-background-knockout-hover',
      'hover:text-comp-button-color-content-default-hover',
      'focus:z-10',
      'focus:shadow-[0_0_0_2px]',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-4',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-color-background-default',
      'data-[state=on]:bg-comp-button-primary-color-background-default',
      'data-[state=on]:text-comp-button-primary-color-content-default',
      'data-[state=on]:hover:bg-comp-button-primary-color-background-hover',
      'data-[state=on]:hover:text-comp-button-primary-color-content-hover',
      'data-[state=on]:active:bg-comp-button-primary-color-background-active',
      'disabled:opacity-50',
      'disabled:pointer-events-none'
    ] as const
  }
});
