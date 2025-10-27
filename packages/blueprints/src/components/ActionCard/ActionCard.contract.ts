import { defineContract } from '../../utilities';

export default defineContract({
  component: 'ActionCard',
  description:
    'Vertical card with optional media, subtitle, title, description, and a required footer Button. Center-aligned stack; no meta/labels.',
  base: 'div',

  props: {
    focusable: { type: 'boolean', default: false },

    title: {
      type: 'string',
      required: true,
      description: 'Primary visible heading; also used as accessible name.'
    },
    subtitle: { type: 'string', description: 'Optional secondary line beneath media.' },
    description: { type: 'string', description: 'Optional body copy.' },

    imgSrc: { type: 'string', description: 'Optional media source URL.' },
    imgAlt: {
      type: 'string',
      description: 'Required iff imgSrc is provided; use empty string when decorative.'
    },

    ariaLabel: {
      type: 'string',
      description:
        'Fallback accessible name if title is intentionally absent (normally not needed).'
    },

    // Passthrough to the design-system Button
    ButtonProps: {
      type: 'object',
      required: true,
      description:
        'Passthrough props for the footer Button (consumer chooses variant/icons/URL semantics).'
    }
  },

  // Rendered parts in order (layout drives structure; content comes from props).
  slots: ['base', 'media', 'subtitle', 'title', 'description', 'actions'] as const,

  // Structural hint to the generator (root tag + part containers).
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      // Media is a container; when imgSrc is provided, place an <img> inside (see rules).
      { slot: 'media', tag: 'div' },
      { slot: 'subtitle', tag: 'div' },
      { slot: 'title', tag: 'div' },
      { slot: 'description', tag: 'div' },
      { slot: 'actions', tag: 'div' }
    ]
  },

  // No validations/guards — only generator guidance.
  rules: [
    {
      when: {},
      hint: "When 'focusable' is true, set tabIndex=0 and role='group' on the base; use 'title' for the accessible name (or 'ariaLabel' fallback)."
    },
    {
      when: {},
      hint: "When 'focusable' is true, also apply data-is-focusable='true' to the base so styleMap selectors (e.g., data-[is-focusable=true]:focus-visible:...) activate on the correct element."
    },
    {
      when: {},
      hint: "When 'imgSrc' is provided, render an <img> element INSIDE the 'media' slot container with src={imgSrc} and alt={imgAlt}. Do not render placeholder text."
    },
    {
      when: {},
      hint: "When 'imgSrc' is NOT provided, omit the 'media' slot entirely to preserve vertical rhythm (no empty container)."
    },
    {
      when: {},
      hint: "For the <img> element: prefer loading='lazy' and decoding='async'. Styling (fit/size/radius/overflow) comes from the styleMap on the 'media' slot; do not add ad-hoc classes in the component."
    }
  ] as const,

  styleMap: true,

  hints: {}
});
