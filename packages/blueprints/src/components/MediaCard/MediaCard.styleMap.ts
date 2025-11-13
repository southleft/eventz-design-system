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
    'p-0.5',
    'w-85',
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
      '[&>img]:w-20',
      '[&>img]:h-20',
      'sm:[&>img]:w-26',
      'sm:[&>img]:h-26',
      '[&>img]:object-cover',
      '[&>img]:group-hover:opacity-30'
    ],

    subtitle: [
      'text-xs',
      'mt-0.25',
      'sm:mt-3',
      'sm:mt-1.5',
      'text-color-content-subtle',
      'group-hover:text-color-content-subtle-hover',
      'min-w-0',
      'w-full'
    ],

    title: [
      'inline-flex',
      'justify-between',
      'items-center',
      'mt-0.25',
      'min-w-0',
      'w-71.5',
      'w-50',
      'sm:w-45'
    ],

    titleText: [
      'block',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'text-base',
      'sm:text-lg',
      'flex-1',
      'min-w-0',
      'truncate',
      'mb-2',
      'sm:mb-3'
    ],

    meta: ['mt-1', 'flex', 'flex-wrap', 'gap-0.5', 'items-center', 'min-w-0', 'w-full'],

    metaItem: [
      'inline-flex',
      'items-center',
      'gap-0.25',
      'text-xs',
      'text-color-content-subtle',
      'group-hover:text-color-content-subtle-hover'
    ],

    metaIcon: ['shrink-0', '[&>svg]:size-0.75'],

    control: [
      // Overlay capsule — matches spec (blur + tint + rounded bubble)
      'absolute',
      'right-1.5',
      'top-5',
      'sm:top-8',
      'inline-grid',
      'place-items-center',
      'rounded-full',
      'backdrop-blur-sm',
      'p-0.25'
    ]
  },

  // No variants axis for MediaCard; layout is fixed to horizontal
  variants: {},

  // No interactive states on the container itself; interactivity belongs to the `control`
  state: {}
});
