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

  base: [
    'flex',
    'flex-col',
    'items-start',
    'w-full',
    'h-78',
    'data-[variant=compact]:w-418',
    'group',
    'data-[variant=mini]:size-40',
    'data-[variant=mini]:rounded-full'
  ],

  slots: {
    // Top seek slider (full-width) — placement only
    _seek: ['flex', 'items-center', 'w-full', '-mb-6', 'pr-2'],

    // Main row surface (rounded chrome)
    _row: ['flex', 'items-center', 'w-full', 'bg-color-background-subtle', 'py-20'],

    // Lead (artwork + labels)
    _lead: ['flex', 'items-center', 'gap-16', 'min-w-0', 'flex-1', 'pl-16'],
    '_lead ._artwork': ['relative', 'shrink-0', 'size-40', 'overflow-clip'],
    '_lead ._labels': ['flex', 'flex-col', 'min-w-0', 'gap-0'],

    '_lead ._labels ._subtitle': ['text-xs', 'font-medium', 'text-color-content-weak', 'truncate'],

    // Inline title + time row
    '_lead ._labels ._titleRow': ['flex', 'items-baseline', 'gap-8', 'min-w-0'],
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
      'whitespace-nowrap',
      'pl-8',
      'border-l',
      'border-color-background-subtle'
    ],

    // Controls cluster (MediaControl internals not styled here)
    _controls: ['flex', 'items-center', 'gap-8'],

    // Volume cluster (Slider goes into _volumeRange; Slider owns its visuals)
    _volumeGroup: [
      'flex',
      'items-center',
      'gap-8',
      'justify-end',
      'pr-16',
      'text-comp-button-color-content-default'
    ],
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
    // Variant-specific visibility is handled via conditional rendering in runtime.
    // These arrays intentionally remain empty to avoid CSS-based hides.
    default: [],
    compact: [],
    mini: []
  },

  // Style hooks for runtime state toggles (e.g., playing vs paused)
  state: {
    playing: []
  }
});
