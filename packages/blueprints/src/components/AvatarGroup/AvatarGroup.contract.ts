import { defineContract } from '../../utilities';

export const AvatarGroupContract = defineContract({
  component: 'AvatarGroup',
  description:
    'Inline stack of user avatars with overlap and an optional “+N others interested” message.',
  // Root is a neutral container; Radix Avatar is used internally for faces/fallback.
  base: 'div',

  props: {
    indicator: { type: 'string', default: '+' },
    count: { type: 'number' },
    message: { type: 'string', default: 'others interested' },
    showMessage: { type: 'boolean', default: true },
    avatarsToDisplay: { type: 'number', default: 4 },

    // Users dataset (schema: { name: string; imageUrl: string }[])
    // Keep guards minimal per spec; empty name ⇒ empty fallback.
    // Note: The generator/runtime will type this precisely in core.
    users: { type: 'object' }
  },

  // Slots in render order: avatars row, then the composed message.
  // Avatar internals are exposed as sub-slots for styling control.
  slots: [
    'avatars',
    'avatar',
    'avatarImage',
    'avatarFallback',
    'message',
    'indicator',
    'count',
    'messageText'
  ] as const,

  // Optional layout hint for the generator (advisory; visuals live in styleMap)
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex gap-8 items-center'
  },

  rules: [
    // Behavioral notes (non-visual):
    // - visibleFaces = min(users.length, avatarsToDisplay)
    // - if count is undefined: count = users.length
    // - displayCount = max(count - visibleFaces, 0)
    // - abbreviation: nearest rounding, lowercase suffix (k/m/b); 0–999 raw
  ],

  styleMap: true,

  hints: {
    // Structural adapter note only; visuals come from the styleMap.
    radixAdapter: { uses: ['Avatar'] as const }
  }
});
