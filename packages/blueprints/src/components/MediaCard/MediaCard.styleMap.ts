// packages/blueprints/src/components/MediaCard/MediaCard.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'MediaCard',

  // Root surface and horizontal composition scaffolding (non-navigational)
  base: [
    'relative',
    'grid',
    'items-start',
    'gap-3',
    'p-2',
    'rounded-md',
    'bg-color-background-default/0',
    'hover:bg-color-background-default/6'
  ],

  // Slot classes — names match contract slots; additional sub-slots for meta items/icons
  slots: {
    media: [
      'relative',
      'overflow-hidden',
      'rounded-sm',
      'shrink-0',
      'w-104',
      'h-104',
      '[&>img]:size-full',
      '[&>img]:object-cover'
    ],

    subtitle: ['text-xs', 'text-color-content-subtle'],

    title: [
      'inline-flex',
      'items-center',
      'justify-between',
      'w-full',
      'text-color-content-default',
      'text-base',
      'sm:text-lg'
    ],

    meta: ['mt-2', 'flex', 'flex-wrap', 'items-center', 'gap-2'],

    metaItem: ['inline-flex', 'items-center', 'gap-1', 'text-xs', 'text-color-content-subtle'],

    metaIcon: ['shrink-0', '[&>svg]:size-3'],

    control: [
      // Overlay capsule — visual parity with spec (blur + tint + rounded bubble)
      'inline-grid',
      'place-items-center',
      'rounded-full',
      'backdrop-blur-sm',
      'bg-color-background-soft/60',
      'p-1.5'
    ]
  },

  // No variants axis for MediaCard; layout is fixed to horizontal
  variants: {},

  // No interactive states on the container itself; interactivity belongs to the `control`
  state: {}
});
