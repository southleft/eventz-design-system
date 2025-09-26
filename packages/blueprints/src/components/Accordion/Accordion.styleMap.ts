import { defineStyleMap } from '../../utilities';

export const AccordionStyleMap = defineStyleMap({
  base: [
    '[&:has(:focus-visible)]:ring-2',
    '[&:has(:focus-visible)]:ring-offset-4',
    '[&:has(:focus-visible)]:ring-comp-border-focus-ring',
    '[&:has(:focus-visible)]:ring-offset-color-background-default'
  ] as const,

  slots: {
    // Root stack
    container: ['flex', 'flex-col', 'w-full'] as const,

    // One logical item wrapper (contained/default surface)
    item: [
      'bg-comp-accordion-item-color-background-default',
      'text-comp-accordion-item-color-foreground-default',
      'rounded-md'
    ] as const,

    // Radix header element wraps the trigger
    header: ['border', 'mt-auto', 'mb-auto', 'border-none'] as const,

    // Clickable header row
    trigger: [
      'text-color-content-default',
      'hover:text-color-content-default-hover',
      'border-none',
      'w-full',
      'flex',
      'justify-between',
      'outline-none',
      'bg-background-none',
      'pt-2',
      'pb-2',
      'pl-1',
      'pr-1',
      'group'
    ] as const,

    // Wrapper around image + title to handle spacing
    triggerLabelGroup: ['inline-flex', 'items-center', 'gap-8'] as const,

    // Optional decorative thumbnail
    image: [
      '[&_img]:h-24',
      '[&_img]:w-24',
      '[&_img]:rounded-[4px]',
      'overflow-hidden',
      '[&_img]:object-cover'
    ] as const,

    // Title text (emphasis handled via state)
    title: ['text-base', 'lg:text-lg'] as const,

    // Expand/collapse indicator
    icon: ['shrink-0'] as const,

    // Inner glyph rotates to reflect state
    iconGlyph: [
      'transition-transform',
      'group-data-[state=open]:rotate-180',
      'group-data-[state=closed]:rotate-0',
      'size-20'
    ] as const,

    // Collapsible region
    content: ['text-color-content-weak', 'text-sm', 'pl-1', 'pr-1'] as const,

    // Intro line above body; same treatment as body
    intro: ['text-color-content-weak', 'text-sm'] as const
  },
  state: {
    titleStrong: ['font-bold'] as const
  }
});
