// packages/blueprints/src/components/MediaCard/MediaCard.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'MediaCard',

  // Fixed horizontal scaffolding (responsive horizontal layout with focus ring proxy)
  base: [
    'relative',
    'outline-none',
    'rounded-md',
    'border-0',
    'group',
    'bg-background-none',
    'hover:bg-color-background-default',
    'grid',
    '[&:has(img)]:grid-cols-[92px_1fr]',
    'sm:[&:has(img)]:grid-cols-[112px_1fr]',
    'items-start',
    'p-2',
    'w-340',
    '[&_[data-slot=media]]:row-span-4',
    '[&:has(:focus-visible)]:ring-offset-2',
    '[&:has(:focus-visible)]:ring-2',
    '[&:has(:focus-visible)]:ring-comp-border-focus-ring',
    '[&:has(:focus-visible)]:ring-offset-color-background-default'
  ],

  // Slot classes reflect responsive typography + structural helpers
  slots: {
    media: [
      'relative',
      'overflow-hidden',
      'rounded-sm',
      'border-0',
      'shrink-0',
      '[&>img]:w-80',
      '[&>img]:h-80',
      'sm:[&>img]:w-104',
      'sm:[&>img]:h-104',
      '[&>img]:object-cover',
      '[&>img]:group-hover:opacity-30'
    ],

    subtitle: [
      'text-xs',
      'mt-1',
      'sm:mt-12',
      'sm:mt-6',
      'text-color-content-subtle',
      'group-hover:text-color-content-subtle-hover',
      'min-w-0',
      'w-full'
    ],

    title: [
      'inline-flex',
      'justify-between',
      'items-center',
      'mt-1',
      'min-w-0',
      'w-286',
      'w-200',
      'sm:w-180',
      '[&>span]:block',
      '[&>span]:text-color-content-default',
      '[&>span]:group-hover:text-color-content-default-hover',
      '[&>span]:text-base',
      '[&>span]:sm:text-lg',
      '[&>span]:flex-1',
      '[&>span]:min-w-0',
      '[&>span]:truncate',
      '[&>span]:mb-8',
      '[&>span]:sm:mb-12'
    ],

    meta: ['mt-1', 'flex', 'flex-wrap', 'gap-2', 'items-center', 'min-w-0', 'w-full'],

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
      'top-20',
      'sm:top-32',
      'inline-grid',
      'place-items-center',
      'rounded-full',
      'backdrop-blur-sm',
      'p-1.5'
    ]
  },

  // No variants axis for MediaCard; layout is fixed to horizontal
  variants: {},

  // No interactive states on the container itself; interactivity belongs to the `control`
  state: {}
});
