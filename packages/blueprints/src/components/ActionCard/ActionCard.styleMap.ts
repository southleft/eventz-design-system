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
    'gap-0.25',
    'items-center',
    'text-center',
    'p-0.5',
    'w-20.5',
    '[&:has(img)]:w-42',
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
      'mb-2',
      '[&>img]:w-42',
      '[&>img]:h-42',
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
    actions: ['mt-0.5', 'sm:mt-0.75'] as const
  }
});
