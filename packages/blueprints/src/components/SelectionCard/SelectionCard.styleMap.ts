import { defineStyleMap } from '../../utilities';

export const SelectionCardStyleMap = defineStyleMap({
  base: [
    // width + stack + alignment
    'w-[240px]',
    'inline-flex flex-col items-center justify-start',
    // spacing (maps to spacing/8 = 32, spacing/6 = 24, spacing/4 = 16)
    'gap-4 py-8 px-6',
    // surface + radius
    'rounded-lg bg-color-background-default',
    // interaction affordance
    'cursor-pointer select-none outline-none',
    // focus ring (color via token var; thickness/offset via utilities)
    'focus-visible:ring-2',
    'focus-visible:ring-comp-focus-color-ring',
    'focus-visible:ring-offset-2',
    // grouping for hover/selected slot styling
    'group',
    // default text color cascades to children unless overridden
    'text-color-content-default'
  ] as const,

  slots: {
    container: [],
    icon: [
      // 48×48 box; ensure inner SVG scales
      'size-12 shrink-0',
      '[&>svg]:size-12',
      '[&>svg]:aria-hidden-true'
    ] as const,
    label: [
      // single-line, centered, truncation
      'w-full text-center truncate',
      // hover only affects label color (container stays put)
      'group-hover:text-color-content-default-hover',
      // when selected (data-selected on container), label turns brand
      'group-data-[selected=true]:text-color-content-brand'
    ] as const
  },

  // No variants; single spec
  variants: {},

  // Visual state hooks toggled by props / aria/data on the container
  state: {
    // Selected adds brand border and locks brand text color via the group-data selector above
    selected: [
      'border border-2',
      'border-color-border-brand',
      // also color container text to brand as a fallback (label will be brand via group-data rule)
      'text-color-content-brand',
      // ensure radius is preserved when border appears
      'rounded-lg'
    ] as const
  }
});
