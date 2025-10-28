import { defineContract } from '../../utilities';

export default defineContract({
  component: 'ContentCard',
  description:
    'Content-only card for displaying media and text. Supports vertical, horizontal, and post layouts. Optional link treatment adds an arrow cue in the title. Meta labels render as inline badges.',
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
    },

    href: {
      type: 'string',
      description:
        'Optional URL that turns the card into a link. When present, render the root as <a> and append a forward arrow icon inside the title.'
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
      when: {
        href: (value: unknown) => typeof value !== 'string' || value.trim().length === 0
      },
      hint: "When 'focusable' is true (and 'href' is not set), keep the root <div>, set tabIndex=0, role='group', and data-is-focusable='true'. Use the trimmed 'title' as the accessible name unless 'ariaLabel' is provided."
    },
    {
      when: { href: (value: unknown) => typeof value === 'string' && value.trim().length > 0 },
      hint: "When 'href' is provided, render the root as <a href={href}>. Do not set role='group' or tabIndex. Always set data-is-focusable='true' on the base and append an aria-hidden <ForwardArrowIcon /> immediately after the title text, using the token combo ml-1 shrink-0 [&>svg]:size-[20px] invisible group-hover:visible group-hover:text-color-content-brand."
    },
    {
      when: {},
      hint: "When 'imgSrc' is provided, render an <img src={imgSrc} alt={imgAlt} loading='lazy' decoding='async' /> inside the 'media' slot. When absent, omit the 'media' (and 'badge') slots entirely."
    },
    {
      when: {},
      hint: "When 'badge' is provided and media is present, render a design-system <Badge variant='brand'>{badge}</Badge> inside the 'badge' slot, positioned as an overlay by the styleMap."
    },
    {
      when: {},
      hint: "Render the 'meta' slot only when 'labels' is a non-empty array. Inside it, map labels to <span data-meta-item> rows (inline-flex, text tokens) with an optional aria-hidden icon span followed by the label text. Do not wrap them in the core Badge component."
    },
    {
      when: {},
      hint: "Always render the visible 'title' slot. 'ariaLabel' overrides only the accessible name; it must not hide the title. Ensure non-link cards omit the arrow icon."
    },
    {
      when: { layout: 'vertical' },
      hint: "Vertical layout: apply base tokens flex/column plus w-168 and p-2. In the media slot, keep the overlay badge and size <img> to 168px square (w-168, h-168)."
    },
    {
      when: { layout: 'horizontal' },
      hint: "Horizontal layout: switch the base to a 112px/1fr grid with w-340 and p-2. Set the media slot to row-span-4 and size the <img> to 104px square (w-104, h-104)."
    },
    {
      when: { layout: 'post' },
      hint: "Post layout: base stays flex/column with w-288 and p-2. Size the media image to 288px square (w-288, h-288)."
    },
    {
      when: {},
      hint: 'This component is display-only: do not render actions or additional interactive affordances beyond the optional href. Layout order is strictly media → badge (overlay) → subtitle → title → description → meta.'
    }
  ] as const,

  styleMap: true,
  hints: {}
});
