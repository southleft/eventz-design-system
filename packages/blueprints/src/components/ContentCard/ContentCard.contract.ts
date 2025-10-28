import { defineContract } from '../../utilities';

export default defineContract({
  component: 'ContentCard',
  description:
    'Content-only card for displaying media and text. Supports vertical, horizontal, and post layouts. Optional link treatment adds a decorative title arrow. Meta labels render as inline badges.',
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

    // Labels become inline badges in the `meta` slot.
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
    },

    href: {
      type: 'string',
      description:
        'Optional URL that turns the card into a link. When present, render the root as <a> and append a forward arrow icon inside the title.'
    }
  },

  // Rendered parts in order.
  slots: [
    'base',
    'media',
    'badge',
    'subtitle',
    'title',
    'titleIcon',
    'description',
    'meta',
    'metaItem',
    'metaIcon'
  ] as const,

  // Structural hint only (no classes here).
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { slot: 'media', tag: 'div', children: [{ slot: 'badge', tag: 'div' }] },
      { slot: 'subtitle', tag: 'div' },
      { slot: 'title', tag: 'div', children: [{ slot: 'titleIcon', tag: 'span' }] },
      { slot: 'description', tag: 'div' },
      {
        slot: 'meta',
        tag: 'div',
        children: [{ slot: 'metaItem', tag: 'span', children: [{ slot: 'metaIcon', tag: 'span' }] }]
      }
    ]
  },

  // Generator guidance only (no runtime guards/validation).
  rules: [
    {
      when: {
        href: (value: unknown) => typeof value !== 'string' || value.trim().length === 0
      },
      hint: "Render the base as a plain <div> when 'href' is empty or absent. When 'href' is a non-empty string, render the root as <a href={href}> instead of a div."
    },
    {
      when: { href: (value: unknown) => typeof value === 'string' && value.trim().length > 0 },
      hint: "In link mode, always set data-is-focusable='true' on the base but omit tabIndex and role attributes. Append an aria-hidden forward arrow icon inside the 'title' slot (rendered in the 'titleIcon' slot) using the token combo ml-1 shrink-0 [&>svg]:size-[20px] invisible group-hover:visible group-hover:text-color-content-brand."
    },
    {
      when: {
        href: (value: unknown) => typeof value !== 'string' || value.trim().length === 0
      },
      hint: "When not in link mode, set data-is-focusable='true' only when 'focusable' is true. In that case also set tabIndex=0 and role='group' on the base."
    },
    {
      when: {},
      hint: "Apply aria-label only when the base is focusable (either via 'focusable' or link mode) and 'ariaLabel' is a non-empty string. The visible 'title' text always renders."
    },
    {
      when: {},
      hint: "Render the 'media' slot only when 'imgSrc' is a non-empty string. Inside, render <img src={imgSrc} alt={imgAlt} loading='lazy' decoding='async' />. When no media, omit both 'media' and 'badge' slots."
    },
    {
      when: {},
      hint: "Render the 'badge' slot only when both media and 'badge' content exist, using the design-system Badge with variant='brand'."
    },
    {
      when: {},
      hint: "Render the 'meta' slot only when 'labels' is a non-empty array. Each entry renders a 'metaItem' span with optional 'metaIcon' (aria-hidden) followed by the label text—no core Badge component."
    },
    {
      when: { layout: 'vertical' },
      hint: "Vertical layout tokens: base uses flex-col w-168 p-2; the media slot keeps the badge overlay and sizes the <img> to w-168 h-168."
    },
    {
      when: { layout: 'horizontal' },
      hint: "Horizontal layout tokens: base becomes a grid with grid-cols-[112px_1fr] w-340 p-2. The media slot spans the grid rows (row-span-4) and sizes the <img> to w-104 h-104."
    },
    {
      when: { layout: 'post' },
      hint: "Post layout tokens: base stays flex-col with w-288 p-2; the media slot sizes the <img> to w-288 h-288."
    },
    {
      when: {},
      hint: 'Layout order: media (optional) → subtitle (optional) → title (always) with nested titleIcon (link only) → description (optional) → meta (optional).'
    }
  ] as const,

  styleMap: true,
  hints: {
    titleArrow: 'Link mode adds a decorative forward arrow inside the title using the titleIcon slot.'
  }
});
