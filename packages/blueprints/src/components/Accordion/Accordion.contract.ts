import { defineContract } from '../../utilities';

export const AccordionContract = defineContract({
  component: 'Accordion',
  description: 'Single-item disclosure with optional decorative thumbnail image, emphasis styling on the title, and optional intro above body.',
  base: 'Accordion',

  props: {
    // Required header text shown on the trigger
    title: { type: 'string', required: true },

    // Optional decorative thumbnail (no reserved space when absent)
    // The runtime expects an <img> element; this is modeled as a slot here.
    image: { type: 'slot' },

    // Title emphasis treatment
    emphasis: {
      type: 'enum',
      options: ['strong', 'weak'] as const,
      default: 'strong'
    },

    // Optional intro paragraph rendered before the body (within content)
    intro: { type: 'string' },

    // Radix controlled/uncontrolled passthrough
    value: { type: 'string' },
    defaultValue: { type: 'string' }
  },

  // Render order (one logical item only)
  // Matches the component structure, including wrapper slots used by runtime classes.
  slots: [
    'container',
    'item',
    'header',
    'trigger',
    'labelGroup',
    'image',
    'title',
    'icon',
    'content',
    'intro'
  ] as const,

  // Advisory only — structure lives in styleMap
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col'
  },

  styleMap: true,

  // Structural adapter hint only (no Theme props)
  hints: {
    radixAdapter: { uses: ['Accordion'] as const }
  }
});
