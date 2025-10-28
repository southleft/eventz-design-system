import { defineStyleMap } from '../../utilities';

/**
 * StyleMap for ContentCard (content display; no actions).
 * Tokens are placeholders to sync from Figma.
 */
export default defineStyleMap({
  base: [
    'outline-none',
    'rounded-md',
    'border-0',
    'group',
    'bg-background-none',
    'hover:bg-color-background-default',

    // focus ring via data-attr when focusable
    'data-[is-focusable=true]:focus-visible:ring-2',
    'data-[is-focusable=true]:focus-visible:ring-offset-2',
    'data-[is-focusable=true]:focus-visible:ring-comp-border-focus-ring',
    'data-[is-focusable=true]:focus-visible:ring-offset-color-background-default'
  ] as const,

  // Per-slot tokens; alignment/stacking comes from the variant sets below.
  slots: {
    media: [
      'relative',
      'overflow-hidden',
      'rounded-sm',
      'border-0',
      // img normalization
      '[&>img]:object-cover',
      '[&>img]:group-hover:opacity-30'
    ] as const,

    // Badge overlays within media
    badge: ['absolute', 'top-2', 'left-2'] as const,

    subtitle: ['text-xs', 'text-color-content-subtle', 'group-hover:text-color-content-subtle-hover'] as const,
    title: [
      'inline-flex',
      'justify-between',
      'items-center',
      'w-full',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'text-base',
      'sm:text-lg',
      '[&_span[aria-hidden=true]]:ml-1',
      '[&_span[aria-hidden=true]]:shrink-0',
      '[&_span[aria-hidden=true]>svg]:size-[20px]',
      '[&_span[aria-hidden=true]]:invisible',
      'group-hover:[&_span[aria-hidden=true]]:visible',
      'group-hover:[&_span[aria-hidden=true]]:text-color-content-brand'
    ] as const,
    description: ['text-color-content-weak', 'group-hover:text-color-content-weak-hover', 'text-sm'] as const,

    // Meta badges row
    meta: ['mt-2', 'flex', 'flex-wrap', 'gap-2', 'items-center'] as const
  },

  // Flat variant map: keys = contract enum options
  variants: {
    vertical: [
      'flex',
      'flex-col',
      'items-start',
      'text-left',
      'w-168',
      'p-2'
    ],
    horizontal: ['grid', 'grid-cols-[112px_1fr]', 'items-start', 'p-2', 'w-340'],
    post: [
      // Post-style: generous vertical rhythm, headline-forward
      'flex',
      'flex-col',
      'items-start',
      'text-left',
      'w-288',
      'p-2'
    ]
  } as const,

  state: {
    focused: [] as const
  }
});
