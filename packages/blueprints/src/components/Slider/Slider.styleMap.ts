// packages/blueprints/src/components/Slider/Slider.styleMap.ts
import { defineStyleMap } from '../../utilities/defineStyleMap';
import type { StyleMapSpec } from '../../utilities/defineStyleMap/types';

/**
 * Token-first styling for Slider (single style, no variants).
 * Map to Radix parts:
 *  - container → Root
 *  - _track    → Track (full background)
 *  - _range    → Range (elapsed segment)
 *  - _thumb    → Thumb (handle)
 */
const map: StyleMapSpec = {
  component: 'Slider',

  // Shared base: layout only; no color tokens here.
  base: ['w-full', 'select-none', 'touch-none'],

  slots: {
    // Root container (agent maps to Radix Root)
    container: ['relative', 'w-full', 'h-[12px]', 'flex', 'items-center'],

    // Background track
    _track: [
      'relative',
      'w-full',
      'h-[4px]',
      'rounded-full',
      'bg-color-background-subtle', // token
      'overflow-hidden'
    ],

    // Elapsed range (fills from start → thumb)
    '_track ._range': [
      'absolute',
      'left-0',
      'top-0',
      'h-full',
      'rounded-full',
      'bg-color-background-brand' // token
    ],

    // Thumb (handle)
    _thumb: [
      'block',
      'size-[8px]', // fixed per spec (was 4px)
      'rounded-full',
      'bg-color-background-brand', // token
      'focus-visible-brand'
    ]
  },

  // No variants for Slider; single visual style.
  variants: {},

  // No extra state hooks; Radix handles interactive states.
  state: {}
};

export default defineStyleMap(map);
