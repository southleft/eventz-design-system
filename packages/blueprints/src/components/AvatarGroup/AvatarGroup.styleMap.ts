import { defineStyleMap } from '../../utilities';

export const AvatarGroupStyleMap = defineStyleMap({
  // Root container classes applied in all cases
  base: ['flex', 'gap-8', 'items-center'] as const,

  // Slot classes (kept in sync with the core component)
  slots: {
    // Row that holds the avatar faces (reversed layout)
    avatars: ['flex', 'items-center', 'flex-row-reverse'] as const,

    // Individual avatar root (Radix Avatar.Root)
    avatar: [
      'inline-flex',
      'select-none',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'rounded-full',
      'align-middle',
      'w-24',
      'lg:w-32',
      '-mr-12',
      'lg:-mr-18',
      'border-color-border-inverse',
      'border'
    ] as const,

    // Radix Avatar.Image
    avatarImage: ['size-full', 'rounded-[inherit]', 'object-cover'] as const,

    // Radix Avatar.Fallback (mirrors runtime sizes + spacing)
    avatarFallback: [
      'flex',
      'items-center',
      'justify-center',
      'overflow-hidden',
      'rounded-full',
      'bg-background-none',
      'text-base',
      'font-medium',
      'w-24',
      'h-24',
      'lg:w-32',
      'lg:h-32',
      '-mr-12',
      'lg:-mr-18'
    ] as const,

    // Message wrapper and its parts
    message: ['inline-flex', 'gap-[4]', 'text-color-content-subtle', 'text-sm', 'ml-12', 'lg:ml-18'] as const,
    indicator: [] as const,
    count: [] as const,
    messageText: [] as const
  },

  // No variants for v1
  variants: {},

  // No state flags for v1
  state: {}
});
