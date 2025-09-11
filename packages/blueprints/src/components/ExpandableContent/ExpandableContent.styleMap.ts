// packages/blueprints/src/components/ExpandableContent/ExpandableContent.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ExpandableContentStyleMap = defineStyleMap({
  base: ['w-full'] as const,

  slots: {
    container: ['w-full'] as const,

    trigger: [
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-expandable-content-focus-color-ring',
      'focus-visible:ring-offset-2',
      'text-comp-expandable-content-trigger-color-foreground-default',
      'bg-comp-expandable-content-trigger-color-background-default'
    ] as const,

    icon: ['shrink-0', 'transition-transform'] as const,

    content: [
      'text-comp-expandable-content-color-foreground-default',
      'bg-comp-expandable-content-color-background-default'
    ] as const
  },

  variants: {
    sm: [
      '[&._trigger]:px-3',
      '[&._trigger]:py-2',
      '[&._trigger]:text-sm',
      '[&._content]:px-3',
      '[&._content]:py-2',
      '[&._content]:text-sm'
    ] as const,
    md: [
      '[&._trigger]:px-4',
      '[&._trigger]:py-3',
      '[&._content]:px-4',
      '[&._content]:py-3'
    ] as const,
    lg: [
      '[&._trigger]:px-5',
      '[&._trigger]:py-4',
      '[&._trigger]:text-lg',
      '[&._content]:px-5',
      '[&._content]:py-4'
    ] as const
  },

  state: {
    open: [
      '[&._content]:animate-in',
      '[&._content]:fade-in',
      '[&._content]:slide-in-from-top-1',
      '[&._icon]:rotate-180'
    ] as const,
    closed: [
      '[&._content]:animate-out',
      '[&._content]:fade-out',
      '[&._content]:slide-out-to-top-1',
      '[&._icon]:rotate-0'
    ] as const,

    isDisabled: ['[&._trigger]:opacity-50', '[&._trigger]:pointer-events-none'] as const
  }
});
