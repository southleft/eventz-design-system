// packages/blueprints/src/components/MediaCard/MediaCard.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'MediaCard',

  // Fixed horizontal scaffolding (parity with ContentCard: horizontal)
  base: [
    'relative',
    'outline-none',
    'rounded-md',
    'border-0',
    'group',
    'bg-background-none',
    'hover:bg-color-background-default',
    'grid',
    '[&:has(img)]:grid-cols-[112px_1fr]',
    'items-start',
    'p-2',
    'w-340',
    '[&_[data-slot=media]]:row-span-4',
    '[&_[data-slot=media]>img]:w-104',
    '[&_[data-slot=media]>img]:h-104'
  ],

  // Slot classes — mirrors ContentCard tokens where applicable
  slots: {
    media: [
      'relative',
      'overflow-hidden',
      'rounded-sm',
      'border-0',
      'shrink-0',
      '[&>img]:object-cover'
    ],

    subtitle: [
      'text-xs',
      'text-color-content-subtle',
      'group-hover:text-color-content-subtle-hover'
    ],

    title: [
      'inline-flex',
      'justify-between',
      'items-center',
      'w-full',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'text-base',
      'sm:text-lg'
    ],

    meta: ['mt-2', 'flex', 'flex-wrap', 'gap-2', 'items-center'],

    metaItem: [
      'inline-flex',
      'items-center',
      'gap-1',
      'text-xs',
      'text-color-content-subtle',
      'group-hover:text-color-content-subtle-hover'
    ],

    metaIcon: ['shrink-0', '[&>svg]:size-3'],

    control: [
      // Overlay capsule — matches spec (blur + tint + rounded bubble)
      'absolute',
      'right-2',
      'top-2',
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
