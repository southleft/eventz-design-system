import { defineStyleMap } from '../../utilities';

export const SelectionCardStyleMap = defineStyleMap({
  base: [
    'w-[240px] inline-flex flex-col items-center justify-start',
    'gap-4 py-8 px-6 rounded-lg bg-color-background-default py-32 px-24 focus-visible:ring-offset-color-background-default',
    'cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2',
    'group text-color-content-default hover:text-color-content-default-hover'
  ] as const,

  slots: {
    container: [],
    icon: [
      'size-48 shrink-0 text-base',
      '[&>svg]:size-48'
    ] as const,
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
      'border border-2 border-color-border-brand',
      // also color container text to brand as a fallback (label will be brand via group-data rule) + preserve radius
      'text-color-content-brand rounded-lg'
    ] as const
  }
});
