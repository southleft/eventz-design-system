// packages/blueprints/src/components/AvatarGroup/AvatarGroup.contract.ts
import { defineContract } from '../../utilities';

export const AvatarGroupContract = defineContract({
  component: 'AvatarGroup',
  description: 'Inline stack of avatars with overlap and optional “+N” counter.',
  // No Radix primitive for groups; use a neutral layout base (Radix Themes Flex)
  base: 'Flex',

  props: {
    breakpoint: {
      type: 'enum',
      options: ['sm', 'lg'] as const,
      default: 'sm'
    }
  },

  // Treat individual avatars as a collection slot; internals are owned by a future Avatar atom.
  // Render order: avatars → counter
  slots: ['avatars', 'counter'] as const,

  // Advisory only — structural classes live in the styleMap (slots.container)
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex items-center'
  },

  styleMap: true,

  hints: {
    // No coupling to a missing Avatar atom; generator should accept any nodes in `avatars`
    radixAdapter: { uses: ['Flex'] as const }
  }
});
