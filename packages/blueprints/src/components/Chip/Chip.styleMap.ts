// packages/blueprints/src/components/Chip/Chip.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ChipStyleMap = defineStyleMap({
  base: [
    // Inline, compact row
    'inline-flex',
    'items-center',
    'gap-1'
  ] as const,

  slots: {
    _icon: [
      // Make SVGs a predictable size and non-wrapping
      'shrink-0',
      '[&>svg]:size-4'
    ] as const,
    _text: [
      // Allow long labels to truncate gracefully when constrained
      'truncate'
    ] as const
  },

  variants: {},
  state: {}
});
