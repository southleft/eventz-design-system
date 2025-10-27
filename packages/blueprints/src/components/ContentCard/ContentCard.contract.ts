import { defineContract } from '../../utilities';

export default defineContract({
  component: 'ContentCard',
  description:
    'Content-only card for displaying media and text. Supports vertical, horizontal, and post layouts. No actions; meta labels render as badges.',
  base: 'div',

  props: {
    layout: {
      type: 'enum',
      options: ['vertical', 'horizontal', 'post'] as const,
      default: 'vertical',
      description: 'Visual composition of the card.'
    },

    focusable: { type: 'boolean', default: false },

    title: {
      type: 'string',
      required: true,
      description: 'Primary visible heading; used as the accessible name by default.'
    },
    subtitle: { type: 'string', description: 'Optional secondary line.' },
    description: { type: 'string', description: 'Optional body copy.' },

    imgSrc: { type: 'string', description: 'Optional media source URL.' },
    imgAlt: {
      type: 'string',
      description: 'Required iff imgSrc is provided; use empty string when decorative.'
    },

    badge: {
      type: 'string',
      description: 'Optional small badge rendered over the media.'
    },

    // Labels become badges in the `meta` slot.
    labels: {
      type: 'array',
      of: {
        type: 'object',
        shape: {
          // Use slot kind per schema; this is NOT a top-level component slot,
          // so do not list it in the contract `slots` array.
          icon: { type: 'slot', description: 'Optional inline icon for the meta badge.' },
          label: { type: 'string', required: true }
        }
      },
      description:
        'Optional list of badges for the meta slot. Each item: { icon?: ReactNode; label: string }.'
    },

    ariaLabel: {
      type: 'string',
      description: 'Accessible name override; does not suppress the visible title.'
    }
  },

  // Rendered parts in order.
  slots: ['base', 'media', 'badge', 'subtitle', 'title', 'description', 'meta'] as const,

  // Structural hint only (no classes here).
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      {
        // Media container; when imgSrc exists, place <img> inside; otherwise omit entirely.
        slot: 'media',
        tag: 'div',
        // Badge overlays inside media (omit if no `badge` or no `media`).
        children: [{ slot: 'badge', tag: 'div' }]
      },
      { slot: 'subtitle', tag: 'div' },
      { slot: 'title', tag: 'div' },
      { slot: 'description', tag: 'div' },
      // Meta badges row (omit if no labels)
      { slot: 'meta', tag: 'div' }
    ]
  },

  // Generator guidance only (no runtime guards/validation).
  rules: [
    {
      when: {},
      hint: "When 'focusable' is true, set tabIndex=0, role='group', and data-is-focusable='true' on the base; use 'title' as the accessible name unless 'ariaLabel' is provided (which sets aria-label on the base)."
    },
    {
      when: {},
      hint: "When 'imgSrc' is provided, render an <img src={imgSrc} alt={imgAlt} loading='lazy' decoding='async' /> inside the 'media' slot. When absent, omit the 'media' (and 'badge') slots entirely."
    },
    {
      when: {},
      hint: "When 'badge' is provided and media is present, render a design-system <Badge>{badge}</Badge> inside the 'badge' slot, positioned as an overlay by the styleMap."
    },
    {
      when: {},
      hint: "Render the 'meta' slot only when 'labels' is a non-empty array. For each item, render a design-system <Badge> with its label and optional icon. Do not introduce extra wrappers beyond the 'meta' slot container."
    },
    {
      when: {},
      hint: "Always render the visible 'title' slot. 'ariaLabel' overrides only the accessible name; it must not hide the title."
    },
    {
      when: {},
      hint: 'This component is display-only: do not render actions, links, or dividers; the stack is strictly media → badge (overlay) → subtitle → title → description → meta.'
    }
  ] as const,

  styleMap: true,
  hints: {}
});
