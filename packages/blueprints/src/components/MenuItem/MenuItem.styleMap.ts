import { defineStyleMap } from '../../utilities';

export const MenuItemStyleMap = defineStyleMap({
  base: [
    'group',
    'flex',
    'flex-nowrap',
    'items-center',
    'gap-2',
    'no-underline',
    'bg-background-none',
    'border-l-0',
    'border-r-0',
    'border-b-0',
    'border-t-0',
    'pb-2.5',
    'pl-2',
    'pt-2',
    'pr-2',
    'outline-none',
    '[&:focus-visible:not(:hover)]:ring-2',
    '[&:focus-visible:not(:hover)]:ring-offset-4',
    '[&:focus-visible:not(:hover)]:ring-comp-border-focus-ring',
    '[&:focus-visible:not(:hover)]:ring-offset-color-background-default',
    'data-[border-bottom=true]:border-b',
    'data-[border-bottom=true]:border-color-border-subtle'
  ] as const,

  slots: {
    // Main label
    option: [
      'text-sm',
      'flex-grow',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'group-data-[highlighted]:text-color-content-default-hover',
      'group-data-[is-selected=true]:text-color-content-brand',
      'text-left'
    ] as const,

    // Leading icon for simple type
    startIcon: [
      'shrink-0',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'group-data-[is-selected=true]:text-color-content-brand',
      'h-5',
      'w-5'
    ] as const,

    // Supporting line for complex type
    supportingText: [
      'text-color-content-weak',
      'group-hover:text-color-content-weak-hover',
      'text-left'
    ] as const,

    // Thumbnail for complex type (img or placeholder)
    media: [
      'h-10',
      'w-10',
      'rounded-sm',
      'object-cover',
      'group-hover:opacity-75',
      'data-[is-placeholder=true]:bg-color-background-weak'
    ] as const,

    // Thumbnail when rendering an icon instead of an image
    mediaIcon: [
      'h-10',
      'w-10',
      'rounded-sm',
      'object-cover',
      'group-hover:opacity-75',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover',
      'group-data-[is-selected=true]:text-color-content-brand',
      'flex',
      'items-center',
      'justify-center'
    ] as const,

    // Wrapper that stacks [option + selectedIcon] over [supportingText]
    complexSelectedWrapper: ['flex', 'flex-col', 'flex-grow', 'gap-0.25'] as const,

    primaryRow: ['flex', 'items-center', 'justify-between', 'gap-2'] as const,

    selectedIcon: [
      '_selectedIcon',
      'hidden',
      'shrink-0',
      'text-color-content-brand',
      'group-data-[is-selected=true]:inline-flex'
    ] as const
  },

  state: {
    isSelected: [] as const
  }
});
