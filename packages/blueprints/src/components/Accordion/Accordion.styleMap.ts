import { defineStyleMap } from '../../utilities';

export const AccordionStyleMap = defineStyleMap({
  base: [
    'w-full',
    'bg-color-background-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-4',
    'focus-visible:ring-comp-border-focus-ring',
    'focus-visible:ring-offset-color-background-default'
  ] as const,

  slots: {
    // Root stack
    container: ['flex', 'flex-col', 'w-full'] as const,

    // One logical item wrapper (contained/default surface)
    item: [
      'bg-comp-accordion-item-color-background-default',
      'text-comp-accordion-item-color-foreground-default',
      'border',
      'border-comp-accordion-item-color-border-default',
      'rounded-md',
      'overflow-hidden'
    ] as const,

    // Clickable header row
    trigger: [
      'w-full',
      'flex',
      'items-center',
      'justify-between',
      'outline-none'
    ] as const,

    // Optional decorative thumbnail
    image: [
      'h-8',
      'w-8',
      'p-4',
      'rounded-4',
      'overflow-hidden',
      '[&_img]:object-cover'
    ] as const,

    // Title text (emphasis handled via state)
    title: [
      'text-color-content-default',
      'text-mobile-heading-xs',
      'lg:text-heading-xs',
      'hover:text-color-content-default-hover'
    ] as const,

    // Expand/collapse indicator
    icon: ['shrink-0', 'transition-transform'] as const,

    // Collapsible region
    content: [
      'text-color-content-weak',
      'text-sm'
    ] as const,

    // Intro line above body; same treatment as body
    intro: [
      'text-color-content-weak',
      'text-sm'
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
    // Emphasis treatment for title
    emphasisStrong: ['[&._title]:font-bold'] as const,

    // Icon rotation only (let Radix handle motion; no slide/fade utilities)
    itemOpen: ['[&._icon]:rotate-180'] as const,
    itemClosed: ['[&._icon]:rotate-0'] as const,

    // Disabled presentation
    disabled: ['[&._trigger]:opacity-50', '[&._trigger]:pointer-events-none'] as const
  }
});
