// packages/blueprints/src/components/MediaPlayer/MediaPlayer.styleMap.ts
import { defineStyleMap } from '../../utilities/defineStyleMap';
import type { StyleMapSpec } from '../../utilities/defineStyleMap/types';

/**
 * Token-first style map for MediaPlayer.
 * Keys here must align with the contract’s slots and variant options.
 * Decorative progress/volume bars read CSS vars: --progress (0..100), --volume (0..100).
 */
const map: StyleMapSpec = {
  component: 'MediaPlayer',

  base: [
    'flex',
    'flex-col',
    'w-full',
    'rounded-[var(--border/radius/xs,4px)]',
    'focus-within:outline-none'
  ],

  slots: {
    // Top progress (decorative)
    _progressTop: ['relative', 'w-full', 'rounded-[var(--border/radius/xxs,2px)]', 'mb-[-6px]'],
    '_progressTop ._track._trackEmpty': [
      'h-[4px]',
      'w-full',
      'bg-[var(--color/background/subtle,rgba(255,255,255,0.10))]',
      'rounded-[inherit]'
    ],
    '_progressTop ._track._trackFill': [
      'h-[4px]',
      'bg-[var(--color/background/brand,#c2f853)]',
      'rounded-[inherit]',
      '[width:calc(var(--progress,0)*1%)]'
    ],
    '_progressTop ._thumb': [
      'absolute',
      'top-1/2',
      'translate-y-[-50%]',
      'size-[8px]',
      'rounded-full',
      '[left:calc(var(--progress,0)*1%)]',
      'bg-[var(--color/background/brand,#c2f853)]'
    ],

    // Row surface
    _row: [
      'flex',
      'items-center',
      'justify-between',
      'w-full',
      'bg-[var(--color/background/subtle,rgba(255,255,255,0.10))]',
      'px-[var(--spacing/4,16px)]',
      'pt-[var(--spacing/5,20px)]',
      'pb-[var(--spacing/4,16px)]'
    ],

    // Lead
    _lead: ['flex', 'items-center', 'gap-[var(--spacing/2,8px)]', 'min-w-0', 'flex-1'],
    '_lead ._artwork': [
      'relative',
      'shrink-0',
      'size-[40px]',
      'rounded-[var(--border/radius/6,6px)]',
      'overflow-clip'
    ],
    '_lead ._labels': ['flex', 'flex-col', 'gap-[var(--spacing/0,0px)]', 'min-w-0'],
    '_lead ._labels ._subtitle': [
      'font-[family-name:var(--font-family/primary)]',
      'text-[12px]',
      'leading-[18px]',
      'font-medium',
      'text-[color:var(--color/content/weak,#c6c7c6)]',
      'truncate'
    ],
    '_lead ._labels ._title': [
      'font-[family-name:var(--font-family/primary)]',
      'text-[16px]',
      'leading-[20px]',
      'font-medium',
      'text-[color:var(--color/content/default,#ffffff)]',
      'truncate'
    ],

    // Controls
    _controls: ['flex', 'items-center', 'gap-[var(--spacing/2,8px)]'],
    '_controls ._playPause': [
      'rounded-[50px]',
      'backdrop-blur-[5px]',
      'backdrop-filter',
      'bg-[var(--comp/button/color/background/knockout-blur,rgba(37,39,41,0.5))]',
      'p-[var(--spacing/2.5,10px)]',
      'focus-visible:outline-none',
      'focus-visible:ring-[var(--ring/width,2px)]',
      'focus-visible:ring-[color:var(--ring/color,rgba(194,248,83,0.70))]'
    ],

    // Seek
    _seekGroup: ['flex', 'items-center', 'gap-[var(--spacing/2,8px)]', 'min-w-0', 'flex-1'],
    '_seekGroup ._seekRange': ['w-full', 'min-w-[120px]'],
    '_seekGroup ._timeDisplay': [
      'text-[12px]',
      'leading-[18px]',
      'font-medium',
      'text-[color:var(--color/content/weak,#c6c7c6)]',
      'whitespace-nowrap'
    ],

    // Volume
    _volumeGroup: ['flex', 'items-center', 'gap-[var(--spacing/2,8px)]'],
    '_volumeGroup ._volumeRange': ['w-[120px]'],

    // Actions
    _actions: ['flex', 'items-center', 'gap-[var(--spacing/2,8px)]']
  },

  // Variants: 'default' (lg), 'compact' (sm), 'mini' (control-only)
  variants: {
    default: [
      // artwork visible; volume group shown
      '[&_.\\_lead_.\\_artwork]:block'
    ],
    compact: [
      // artwork hidden; volume group hidden
      '[&_.\\_lead_.\\_artwork]:hidden',
      '[&_.\\_volumeGroup]:hidden'
    ],
    mini: [
      // control-only: hide clusters not needed
      '[&_.\\_lead]:hidden',
      '[&_.\\_seekGroup]:hidden',
      '[&_.\\_volumeGroup]:hidden',
      '[&_.\\_actions]:hidden'
    ]
  },

  // Style hooks for runtime state toggles
  state: {
    playing: []
  }
};

export default defineStyleMap(map);
