// packages/blueprints/src/components/Accordion/Accordion.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const AccordionStyleMap = defineStyleMap({
  base: ['w-full'] as const,

  slots: {
    // Root stack
    container: ['flex', 'flex-col', 'w-full'] as const,

    // One logical item wrapper
    item: [
      // contained/default surface tokens; ghost variant will override via state/variant
      'bg-comp-accordion-item-color-background-default',
      'text-comp-accordion-item-color-foreground-default',
      'border',
      'border-comp-accordion-item-color-border-default',
      'rounded-md',
      'overflow-hidden'
    ] as const,

    // Click/pressable header row
    trigger: [
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-accordion-focus-color-ring',
      'focus-visible:ring-offset-2'
    ] as const,

    // Leading/ending indicator
    icon: ['shrink-0', 'transition-transform'] as const,

    // Collapsible region
    content: [
      'text-comp-accordion-content-color-foreground-default',
      'bg-comp-accordion-content-color-background-default'
    ] as const
  },

  // Size controls spacing & typography scale for trigger/content
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
      '[&._trigger]:text-base',
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
    // Visual style alternative
    ghost: [
      // remove contained chrome, use ghost tokens
      '[&._item]:bg-transparent',
      '[&._item]:border-transparent',
      '[&._trigger]:bg-comp-accordion-ghost-color-background-default',
      '[&._trigger]:text-comp-accordion-ghost-color-foreground-default'
    ] as const,

    // Open/closed animations & icon rotation
    itemOpen: [
      '[&._content]:animate-in',
      '[&._content]:fade-in',
      '[&._content]:slide-in-from-top-1',
      '[&._icon]:rotate-180'
    ] as const,
    itemClosed: [
      '[&._content]:animate-out',
      '[&._content]:fade-out',
      '[&._content]:slide-out-to-top-1',
      '[&._icon]:rotate-0'
    ] as const,

    // Disabled item presentation
    disabled: ['[&._trigger]:opacity-50', '[&._trigger]:pointer-events-none'] as const
  }
});
