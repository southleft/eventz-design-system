// packages/blueprints/src/components/MediaPlayer/MediaPlayer.styleMap.ts
import { defineStyleMap } from '../../utilities/defineStyleMap';

/**
 * Token-first style map for MediaPlayer.
 *
 * MediaControl and Slider own their internal visuals (track, thumb, pill, focus ring).
 * This styleMap only defines layout, spacing, and typography for MediaPlayer’s clusters,
 * plus variant reductions (default / compact / mini).
 */
export default defineStyleMap({
  component: 'MediaPlayer',

  base: ['flex', 'flex-col', 'items-start', 'w-full'],

  slots: {
    // Top seek slider (full-width) — placement only
    _seek: ['flex', 'items-center', 'w-full', '-mb-6', 'pr-2'],

    // Main row surface (rounded chrome)
    _row: [
      'flex',
      'items-center',
      'justify-between',
      'w-full',
      'bg-color-background-subtle',
      'px-16',
      'pt-20',
      'pb-16',
      'gap-24',
      'rounded-xs'
    ],

    // Lead (artwork + labels)
    _lead: ['flex', 'items-center', 'gap-16', 'min-w-0', 'flex-1'],
    '_lead ._artwork': ['relative', 'shrink-0', 'size-40', 'overflow-clip'],
    '_lead ._labels': ['flex', 'flex-col', 'min-w-0', 'gap-0'],

    '_lead ._labels ._subtitle': ['text-xs', 'font-medium', 'text-color-content-weak', 'truncate'],

    // Inline title + time row
    '_lead ._labels ._titleRow': ['flex', 'items-center', 'gap-8', 'min-w-0'],
    '_lead ._labels ._titleRow ._title': [
      'font-[family-name:var(--font-family/primary)]',
      'text-[16px]',
      'font-medium',
      'text-color-content-default',
      'truncate'
    ],
    '_lead ._labels ._titleRow ._timeDisplay': [
      'text-xs',
      'font-medium',
      'text-color-content-weak',
      'whitespace-nowrap'
    ],

    // Controls cluster (MediaControl internals not styled here)
    _controls: ['flex', 'items-center', 'gap-8'],

    // Volume cluster (Slider goes into _volumeRange; Slider owns its visuals)
    _volumeGroup: ['flex', 'items-center', 'gap-8'],
    '_volumeGroup ._volumeRange': ['w-120'],

    // Actions cluster (e.g., overflow)
    _actions: ['flex', 'items-center', 'gap-8']
  },

  /**
   * Variants:
   * - default: full layout
   * - compact: no artwork, no volume slider
   * - mini: controls-only (no seek, no lead, no volume, no actions)
   */
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
      // controls-only
      '[&_.\\_seek]:hidden',
      '[&_.\\_lead]:hidden',
      '[&_.\\_volumeGroup]:hidden',
      '[&_.\\_actions]:hidden'
    ]
  },

  // Style hooks for runtime state toggles (e.g., playing vs paused)
  state: {
    playing: []
  }
});
