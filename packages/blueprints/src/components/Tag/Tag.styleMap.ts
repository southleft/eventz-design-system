// packages/blueprints/src/components/Tag/Tag.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const TagStyleMap = defineStyleMap({
  base: [
    // Structure
    'inline-flex items-center justify-center data-[interactive=true]:select-none',
    // Typography (swap to a tokenized text style if provided)
    'text-caption-md-medium',
    // Shape toggles
    'data-[interactive=true]:rounded-md',
    'data-[interactive=false]:rounded-full',
    // Focus ring gated by interactivity (see below)
    'data-[interactive=true]:focus-visible:ring-2',
    'data-[interactive=true]:focus-visible:ring-comp-tag-focus-color-ring',
    'data-[interactive=true]:focus-visible:ring-offset-2',
    // Non-interactive affordance
    'data-[interactive=false]:pointer-events-none',
    'whitespace-nowrap',
    'px-2',
    'h-6'
  ] as const,

  slots: {
    container: [] as const
  },

  // Variant colors (default state). Hover/active are gated by `data-[interactive=true]`
  variants: {
    parent: [
      'data-[interactive=true]:font-bold',
      'data-[interactive=true]:bg-comp-tag-parent-color-background-default',
      'data-[interactive=true]:text-comp-tag-parent-color-foreground-default',

      // Interactivity-gated pseudo states
      'data-[interactive=true]:hover:bg-comp-tag-parent-color-background-hover',
      'data-[interactive=true]:active:bg-comp-tag-parent-color-background-active',

      // Active flag (non-pseudo) — useful for filter/tag selections
      'data-[interactive=true]:data-[active=true]:bg-comp-tag-parent-color-background-active',
      'data-[interactive=true]:data-[active=true]:text-comp-tag-parent-color-foreground-active'
    ] as const,

    child: [
      'data-[interactive=true]:bg-comp-tag-child-color-background-default',
      'data-[interactive=true]:text-comp-tag-child-color-foreground-default',

      'data-[interactive=true]:hover:bg-comp-tag-child-color-background-hover',
      'data-[interactive=true]:active:bg-comp-tag-child-color-background-active',

      'data-[interactive=true]:data-[active=true]:bg-comp-tag-child-color-background-active',
      'data-[interactive=true]:data-[active=true]:text-comp-tag-child-color-foreground-active'
    ] as const
  },

  state: {
    // Cursor behavior toggled via data attribute
    interactive: [
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
