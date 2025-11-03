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
      'bg-linear-to-b',
      'from-opacity-overlay/0',
      'to-opacity-overlay'
    ],

    // controls rail (top-right container for tiles)
    _rail: [
      'absolute',
      'top-3',
      'right-3',
      'flex',
      'flex-col',
      'gap-2',
      'border-none',
      'bg-color-background-subtle/10',
      'text-color-content-default'
    ],

    // segmented zoom group
    _segment: [
      'flex',
      'flex-col',
      'gap-[2px]',
      '[&>button]:first:rounded-b-none',
      '[&>button]:last:rounded-t-none'
    ],

    // control tile (visual only)
    _tile: [
      'size-40',
      'rounded-md',
      'bg-color-background-subtle',
      'text-color-content-default',
      'backdrop-blur-sm',
      'transition-colors',
      'border-none'
    ],

    // icon wrapper inside tile
    _icon: ['pointer-events-none', '[&>svg]:size-20', '[&>*]:aria-hidden']
  },
  states: {
    // component-level
    showOverlay: { _overlay: ['block'] },
    hideOverlay: { _overlay: ['hidden'] },
    showControls: { _rail: ['flex'] },
    hideControls: { _rail: ['hidden'] }
  }
});
