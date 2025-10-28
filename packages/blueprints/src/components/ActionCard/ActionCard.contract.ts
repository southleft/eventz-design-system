import { defineContract } from '../../utilities';

export default defineContract({
  component: 'ActionCard',
  description:
    'Vertical card with optional media, subtitle, title, description, and a footer action node. Center-aligned stack; no meta/labels.',
  base: 'div',

  props: {
    focusable: { type: 'boolean', default: false },

    title: {
      type: 'string',
      required: true,
      description: 'Primary visible heading; used as the accessible name by default.'
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
      description: 'Accessible name override when you need a different name than the visible title.'
    },

    // Replaces ButtonProps — allows a client Button or a plain <a>.
    action: {
      type: 'slot',
      required: true,
      description: 'Rendered in the actions slot; typically a Button or anchor.'
    }
  },

  // Rendered parts in order (layout drives structure; content comes from props).
  slots: ['base', 'media', 'subtitle', 'title', 'description', 'actions'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { slot: 'media', tag: 'div' },
      { slot: 'subtitle', tag: 'div' },
      { slot: 'title', tag: 'div' },
      { slot: 'description', tag: 'div' },
      { slot: 'actions', tag: 'div' }
    ]
  },

  rules: [
    {
      when: {},
      hint: "When 'focusable' is true, set tabIndex=0 and role='group' on the base; use 'title' for the accessible name (or 'ariaLabel' override)."
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
      hint: "For the <img> element: prefer loading='lazy' and decoding='async'. Styling comes from the styleMap on the 'media' slot; do not add ad-hoc classes."
    },
    {
      when: {},
      hint: "Render the 'actions' slot by outputting the provided 'action' node directly — do not wrap or alter it beyond the actions slot container."
    },
    {
      when: {},
      hint: "Always render the visible 'title' slot. If 'ariaLabel' is provided, it overrides only the accessible name; it must not suppress the visible title."
    },
    {
      when: {},
      hint: "Do not render any 'meta' or divider elements in this composition; the stack is strictly media → subtitle → title → description → actions."
    }
  ] as const,

  styleMap: true,
  hints: {}
});
