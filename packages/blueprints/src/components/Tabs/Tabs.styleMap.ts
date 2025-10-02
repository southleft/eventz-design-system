import { defineStyleMap } from '../../utilities';

export const TabsStyleMap = defineStyleMap({
  base: [] as const,

  slots: {
    base: ['flex', 'flex-col'] as const,
    list: ['flex', 'shrink-0'] as const,
    trigger: [
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
      'data-[state=active]:border-b-color-border-brand',
      'data-[state=active]:text-color-content-brand',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-4',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-color-background-default',
      'gap-6'
    ] as const,
    triggerIcon: ['shrink-0', '[&>svg]:size-16'] as const,
    content: ['outline-none'] as const
  },

  layout: {} as const,

  variants: {
    section: [] as const,
    button: [] as const
  }
});
