import { defineStyleMap } from '../../utilities';

/**
 * StyleMap for ActionCard (vertical, centered).
 * Token classes are placeholders following our token naming — adjust mapping in @theme if needed.
 */
export default defineStyleMap({
  base: [
    'outline-none',
    'border-0',
    'rounded-md',
    'group',
    // focus ring (color by token; thickness/offset via utilities)
    'data-[is-focusable=true]:focus-visible:ring-2',
    'data-[is-focusable=true]:focus-visible:ring-offset-2',
    'data-[is-focusable=true]:focus-visible:ring-comp-border-focus-ring',
    'data-[is-focusable=true]:focus-visible:ring-offset-color-background-default'
  ] as const,

  slots: {
    // root spacing; vertical stack; center-aligned content
    container: [
      'flex',
      'flex-col',
      'items-center',
      'text-center',
      'p-4',
      'gap-3',
      'sm:p-6',
      'sm:gap-4'
    ] as const,

    // media block: constrained size, clipped radius
    media: ['w-full', 'overflow-hidden', 'rounded-sm', 'border-0', 'aspect-video'] as const,

    // subtitle/title/description typography tokens
    subtitle: ['text-xs', 'text-color-content-subtle'] as const,
    title: ['text-color-content-default', 'text-lg'] as const,
    description: ['text-color-content-weak', 'text-sm'] as const,

    // footer actions: own block spacing; centered
    actions: ['mt-2', 'sm:mt-3'] as const
  }
});
