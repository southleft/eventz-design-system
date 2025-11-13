import { defineStyleMap } from '../../utilities';

export const AvatarGroupStyleMap = defineStyleMap({
  // Root container classes applied in all cases
  base: ['flex', 'gap-2', 'items-center'] as const,

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
      'w-6',
      'lg:w-8',
      '-mr-8',
      'lg:-mr-4.5',
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
      'w-6',
      'h-6',
      'lg:w-6',
      'lg:h-6',
      '-mr-3',
      'lg:-mr-4.5'
    ] as const,

    // Message wrapper and its parts
    message: ['inline-flex', 'gap-1', 'text-color-content-subtle', 'text-sm', 'ml-3', 'lg:ml-4.5'] as const,
    indicator: [] as const,
    count: [] as const,
    messageText: [] as const
  },

  // No variants for v1
  variants: {},

  // No state flags for v1
  state: {}
});
