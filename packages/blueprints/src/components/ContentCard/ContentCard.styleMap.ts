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
      'w-full',
      'overflow-hidden',
      'rounded-sm',
      'border-0',
      // img normalization
      '[&>img]:w-full',
      '[&>img]:h-full',
      '[&>img]:object-cover'
    ] as const,

    // Badge overlays within media
    badge: ['absolute', 'top-2', 'left-2'] as const,

    subtitle: ['text-xs', 'text-color-content-subtle'] as const,
    title: ['text-color-content-default', 'text-lg'] as const,
    description: ['text-color-content-weak', 'text-sm'] as const,

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
      'p-4',
      'gap-3',
      'sm:p-6',
      'sm:gap-4'
    ],
    horizontal: ['grid', 'grid-cols-[168px_1fr]', 'gap-4', 'items-start', 'p-4', 'sm:p-6'],
    post: [
      // Post-style: generous vertical rhythm, headline-forward
      'flex',
      'flex-col',
      'items-start',
      'text-left',
      'p-0',
      'gap-2',
      'sm:gap-3'
    ]
  } as const,

  state: {
    focused: [] as const
  }
});
