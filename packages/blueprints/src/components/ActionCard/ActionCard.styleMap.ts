import { defineStyleMap } from '../../utilities';

/**
 * StyleMap for ActionCard (vertical, centered).
 * Tokens are placeholders you’ll sync from Figma.
 */
export default defineStyleMap({
  base: [
    'outline-none',
    'border-0',
    'rounded-md',
    'group',
    'flex',
    'flex-col',
    'gap-1',
    'items-center',
    'text-center',
    'p-2',
    'w-82',
    '[&:has(img)]:w-168',
    '[&:has(:focus-visible)]:ring-2',
    '[&:has(:focus-visible)]:ring-offset-2',
    '[&:has(:focus-visible)]:ring-comp-border-focus-ring',
    '[&:has(:focus-visible)]:ring-offset-color-background-default'
  ] as const,

  slots: {
    media: [
      'relative',
      'overflow-hidden',
      'rounded-sm',
      'border-0',
      'mb-8',
      '[&>img]:w-168',
      '[&>img]:h-168',
      '[&>img]:object-cover',
      '[&>img]:group-hover:opacity-30'
    ] as const,
    badge: ['absolute', 'top-2', 'left-2'] as const,
    subtitle: ['text-xs', 'text-color-content-subtle', 'group-hover:text-color-content-subtle-hover'] as const,
    title: [
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'text-base',
      'sm:text-lg'
    ] as const,
    description: [
      'text-color-content-weak',
      'group-hover:text-color-content-weak-hover',
      'text-sm'
    ] as const,
    actions: ['mt-2', 'sm:mt-3'] as const
  }
});
