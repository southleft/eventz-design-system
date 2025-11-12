import { defineStyleMap } from '../../utilities';

export const TabsStyleMap = defineStyleMap({
  base: [] as const,

  slots: {
    base: ['flex', 'flex-col'] as const,
    list: ['flex'] as const,
    trigger: [
      'flex-grow',
      'inline-flex',
      'cursor-default',
      'select-none',
      'items-center',
      'justify-center',
      'h-34',
      'px-10',
      'outline-none',
      'text-color-content-weak',
      'border-b',
      'border-b-color-border-default',
      'bg-background-none',
      'border-t-0',
      'border-l-0',
      'border-r-0',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-4',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-color-background-default',
      'gap-6',
      'hover:text-color-content-weak-hover',
      'hover:border-b-color-border-default-hover',
      'data-[state=active]:border-b-color-content-brand',
      'data-[state=active]:text-color-content-brand',
      'data-[state=active]:hover:border-b-color-content-brand-hover',
      'data-[state=active]:hover:text-color-content-brand-hover'
    ] as const,
    triggerIcon: ['shrink-0', '[&>svg]:size-16'] as const,
    content: ['outline-none', 'text-color-content-default'] as const
  },

  layout: {
    listGapped: ['gap-8'] as const
  } as const,

  variants: {
    section: [] as const,
    button: [] as const
  }
});
