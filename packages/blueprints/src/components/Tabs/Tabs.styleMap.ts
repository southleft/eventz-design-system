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
      'h-8.5',
      'px-5',
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
      'focus-visible-brand',
      'gap-1.5',
      'hover:text-color-content-weak-hover',
      'hover:border-b-color-border-default-hover',
      'data-[state=active]:border-b-color-content-brand',
      'data-[state=active]:text-color-content-brand',
      'data-[state=active]:hover:border-b-color-content-brand-hover',
      'data-[state=active]:hover:text-color-content-brand-hover'
    ] as const,
    triggerIcon: ['shrink-0', '[&>svg]:size-4'] as const,
    content: ['outline-none', 'text-color-content-default'] as const
  },

  layout: {
    listGapped: ['gap-2'] as const
  } as const,

  variants: {
    section: [] as const,
    button: [] as const
  }
});
