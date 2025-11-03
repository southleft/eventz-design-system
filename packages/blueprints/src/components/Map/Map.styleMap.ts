// packages/blueprints/src/components/Map/Map.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  base: [
    'relative',
    'block',
    'w-480',
    'lg:w-full',
    'h-240',
    'lg:h-680',
    'overflow-hidden',
    'rounded-xl',
    // map surface fills container
    '[_map-layer]:absolute',
    '[_map-layer]:inset-0',
    'data-[is-nested=true]:w-358',
    'data-[is-nested=true]:h-400'
  ],
  parts: {
    // container for consumer map mount (positioned fill)
    _surface: ['absolute', 'inset-0'],

    // bottom gradient overlay (82px tall)
    _overlay: [
      'pointer-events-none',
      'absolute',
      'inset-x-0',
      'bottom-0',
      'w-full',
      'h-[82px]',
      // design token for opacity/overlay gradient
      'bg-opacity-overlay'
    ],

    // controls rail (top-right), 40px wide, glass/blur, 8px gaps
    _rail: [
      'absolute',
      'top-3',
      'right-3',
      'flex',
      'flex-col',
      'gap-2',
      'w-10',
      'p-2',
      'backdrop-blur-sm',
      'rounded-lg',
      // subtle glass token background; tune in tokens/theme
      'bg-color-background-subtle/10',
      'text-color-content-default',
      'border',
      'border-white/15',
      'shadow-sm'
    ],

    // segmented zoom group
    _segment: ['flex', 'flex-col', 'gap-2'],

    // control tile (visual only)
    _tile: [
      'grid',
      'place-items-center',
      'h-10',
      'w-10',
      'rounded-md',
      'border',
      'border-white/15',
      'bg-[color-mix(in_oklab,var(--bg-glass)25%,transparent)]',
      'transition-colors'
    ],

    // icon wrapper inside tile
    _icon: ['pointer-events-none', '[&>svg]:size-5', '[&>*]:aria-hidden']
  },
  states: {
    // component-level
    showOverlay: { _overlay: ['block'] },
    hideOverlay: { _overlay: ['hidden'] },
    showControls: { _rail: ['flex'] },
    hideControls: { _rail: ['hidden'] },

    // tile visual states (for consumers to toggle)
    isFocused: { _tile: ['ring-2', 'ring-offset-1', 'ring-[var(--ring-focus)]'] },
    isActive: { _tile: ['bg-white/20'] }
  }
});
