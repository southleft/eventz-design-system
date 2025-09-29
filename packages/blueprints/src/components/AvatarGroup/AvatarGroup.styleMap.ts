import { defineStyleMap } from '../../utilities';

export const AvatarGroupStyleMap = defineStyleMap({
  // Root container classes applied in all cases
  base: ['flex', 'gap-8', 'items-center'] as const,

  // Slot classes
  slots: {
    // Row that holds the avatar faces
    avatars: ['flex', 'items-center'] as const,

    // Individual avatar root (Radix Avatar.Root)
    avatar: [
      'inline-flex',
      'select-none',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'rounded-full',
      'align-middle',
      'size-sm',
      'lg:size-lg',
      '-mr-12',
      'lg:-mr-18'
    ] as const,

    // Radix Avatar.Image
    avatarImage: ['size-full', 'rounded-[inherit]', 'object-cover'] as const,

    // Radix Avatar.Fallback
    avatarFallback: [
      'leading-1',
      'flex',
      'size-full',
      'items-center',
      'justify-center',
      'bg-color-border-inverse',
      'text-base',
      'font-medium'
    ] as const,

    // Message wrapper and its parts
    message: ['flex', 'gap-4', 'text-color-content-subtle', 'text-sm'] as const,
    indicator: [] as const,
    count: [] as const,
    messageText: [] as const
  },

  // No variants for v1 (size axis is encoded in avatar utilities above)
  variants: {},

  // No state flags for v1
  state: {}
});
