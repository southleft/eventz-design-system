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
      'outline-none',
      'group'
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
    icon: [
      'shrink-0',
      'transition-transform',
      'group-data-[state=open]:rotate-180',
      'group-data-[state=closed]:rotate-0'
    ] as const,

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
  state: {
    // Emphasis treatment for title
    emphasisStrong: ['[&._title]:font-bold'] as const,

    // Icon rotation only (let Radix handle motion; no slide/fade utilities)
    // Disabled presentation
    disabled: ['[&._trigger]:opacity-50', '[&._trigger]:pointer-events-none'] as const
  }
});
