import { defineStyleMap } from '../../utilities';

export const SelectionCardStyleMap = defineStyleMap({
  base: [
    'w-60 inline-flex flex-col items-center justify-start',
    'gap-1 py-2 px-1.5 rounded-lg bg-color-background-default py-8 px-6 focus-visible-brand',
    'cursor-pointer select-none outline-none',
    'group text-color-content-default hover:text-color-content-default-hover'
  ] as const,

  slots: {
    container: [],
    icon: ['size-12 shrink-0 text-base', '[&>svg]:size-12'] as const,
    label: [
      'w-full text-center truncate',
      'group-data-[selected=true]:text-color-content-brand'
    ] as const
  },

  // No variants; single spec
  variants: {},

  // Visual state hooks toggled by props / aria/data on the container
  state: {
    // Selected adds brand border and locks brand text color via the group-data selector above
    selected: [
      'border border-0.5 border-color-border-brand',
      // also color container text to brand as a fallback (label will be brand via group-data rule) + preserve radius
      'text-color-content-brand rounded-lg'
    ] as const
  }
});
