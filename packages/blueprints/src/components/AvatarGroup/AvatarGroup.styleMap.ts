// packages/blueprints/src/components/AvatarGroup/AvatarGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const AvatarGroupStyleMap = defineStyleMap({
  base: [] as const,

  slots: {
    // Group row; overlap/styling is applied to children of the `avatars` slot below
    container: ['flex', 'items-center'] as const,

    // Collection of avatar nodes (img, future <Avatar/>, etc.)
    // Use descendant selectors to style each child consistently
    avatars: [
      // Ensure each child is circular and layered for overlap
      '[&>*]:relative',
      '[&>*]:rounded-full',
      // Separation ring around each avatar (token-colored); thickness as utility
      '[&>*]:ring-2',
      '[&>*]:ring-comp-avatar-group-item-color-ring',
      // Make subsequent avatars overlap the previous one
      '[&>*+*]:-ml-comp-avatar-group-item-space-overlap'
    ] as const,

    // Counter chip (e.g., “+3”)
    counter: [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-comp-avatar-group-counter-color-background',
      'text-comp-avatar-group-counter-color-foreground'
    ] as const
  },

  // Size scales avatar diameter, overlap spacing, and counter typography/padding
  variants: {
    sm: [
      // Avatar size
      '[&._avatars>*]:h-6',
      '[&._avatars>*]:w-6',
      // Counter height matches avatar height; minimal horizontal padding
      '[&._counter]:h-6',
      '[&._counter]:min-w-6',
      '[&._counter]:px-1.5',
      // Type scale (token preferred; utility fallback)
      'text-comp-avatar-group-sm-color-foreground',
      '[&._counter]:text-xs'
    ] as const,
    lg: [
      // Avatar size
      '[&._avatars>*]:h-8',
      '[&._avatars>*]:w-8',
      // Counter height matches avatar height; slightly larger padding
      '[&._counter]:h-8',
      '[&._counter]:min-w-8',
      '[&._counter]:px-2',
      // Type scale (token preferred; utility fallback)
      'text-comp-avatar-group-lg-color-foreground',
      '[&._counter]:text-sm'
    ] as const
  },

  state: {
    // (Intentionally empty for now.) If design later adds interactive/hover states or max-visible logic,
    // the generator can toggle semantic flags here without changing the API.
  }
});
