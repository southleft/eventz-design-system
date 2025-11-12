// packages/blueprints/src/components/Tag/Tag.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const TagStyleMap = defineStyleMap({
  base: [
    'inline-block text-sm border-none focus:outline-none',
    'text-color-content-default',
    'data-[interactive=false]:rounded-full',
    'data-[interactive=false]:bg-comp-button-color-background-default',
    'data-[interactive=true]:select-none',
    'data-[interactive=true]:rounded-md',
    'data-[interactive=true]:focus-visible:ring-2',
    'data-[interactive=true]:focus-visible:ring-comp-border-focus-ring',
    'data-[interactive=true]:focus-visible:ring-offset-4',
    'data-[interactive=true]:focus-visible:ring-offset-color-background-default',
    'whitespace-nowrap pt-2 pb-2 px-4'
  ] as const,

  // Variant colors (default state). Hover/active are gated by `data-[interactive=true]`
  variants: {
    parent: [
      'data-[interactive=true]:font-bold',
      'data-[interactive=true]:bg-color-background-weak',
      'data-[interactive=true]:hover:bg-color-background-weak-hover',
      'data-[interactive=true]:hover:text-color-content-default-hover',
      'data-[interactive=true]:data-[active=true]:bg-color-content-brand',
      'data-[interactive=true]:data-[active=true]:text-color-background-default',
      'data-[interactive=true]:data-[active=true]:hover:bg-color-content-brand-hover'
    ] as const,

    child: [
      'data-[interactive=true]:bg-background-none',
      'data-[interactive=true]:text-color-content-weak',
      'data-[interactive=true]:hover:bg-color-background-weak-hover',
      'data-[interactive=true]:hover:text-color-content-weak-hover',
      'data-[interactive=true]:data-[active=true]:text-color-content-brand',
      'data-[interactive=true]:data-[active=true]:hover:bg-color-background-subtle-hover',
      'data-[interactive=true]:data-[active=true]:hover:text-color-content-brand-hover'
    ] as const
  },

  state: {
    // Cursor behavior toggled via data attribute
    cursor: [
      'data-[interactive=true]:cursor-pointer',
      'data-[interactive=false]:cursor-default'
    ] as const,
    nonInteractive: [
      'data-[interactive=false]:bg-comp-tag-parent-color-background-default',
      'data-[interactive=false]:text-comp-tag-parent-color-foreground-default',
      'data-[interactive=false]:data-[active=true]:bg-comp-tag-parent-color-background-active',
      'data-[interactive=false]:data-[active=true]:text-comp-tag-parent-color-foreground-active'
    ] as const
  }
});
