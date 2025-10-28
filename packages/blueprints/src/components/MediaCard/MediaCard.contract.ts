// packages/blueprints/src/components/MediaCard/MediaCard.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'MediaCard',
  description:
    'Server-rendered display card for media content with an optional image and a required overlay control slot. Non-navigational; fixed horizontal layout. The generator must NOT import any control component.',

  // Server component container
  base: 'div',

  props: {
    subtitle: { type: 'string' },

    title: {
      type: 'string',
      description: 'Visible heading; preferred accessible name.'
    },

    labels: {
      type: 'array',
      of: {
        type: 'object',
        shape: {
          icon: {
            type: 'slot',
            description: 'Optional decorative icon for a meta label (render aria-hidden).'
          },
          label: { type: 'string', required: true }
        }
      },
      description:
        'Rendered in the meta row; each item displays a short label with an optional decorative icon.'
    },

    imgSrc: {
      type: 'string',
      description: 'Optional image source URL.'
    },

    imgAlt: {
      type: 'string',
      description: 'Required iff imgSrc is provided. Use empty string when the image is decorative.'
    },

    ariaLabel: {
      type: 'string',
      description: 'Accessible-name override used only when no visible title is present.'
    },

    control: {
      type: 'slot',
      required: true,
      description:
        'Required overlay **slot** for a consumer-provided control (e.g., a play/pause button). Generator must render this slot as-is and must NOT import or instantiate any control component.'
    }
  },

  // Rendered parts in order; no arbitrary children.
  slots: [
    'media', // wraps <img>; omit entirely when no imgSrc
    'subtitle',
    'title',
    'meta', // container for labels[]
    'metaItem', // each label item
    'metaIcon', // optional decorative icon within a metaItem
    'control' // overlay bubble (play/pause), passed via slot
  ] as const,

  // Structural guidance (no classes here).
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { slot: 'media', tag: 'div' },
      { slot: 'subtitle', tag: 'div' },
      { slot: 'title', tag: 'div' },
      {
        slot: 'meta',
        tag: 'div',
        children: [{ slot: 'metaItem', tag: 'span', children: [{ slot: 'metaIcon', tag: 'span' }] }]
      },
      { slot: 'control', tag: 'div' }
    ]
  },

  styleMap: true,

  rules: [
    // Required control slot (do not import components)
    {
      validate: props => props['control'] != null,
      message:
        'MediaCard requires a `control` slot. The generator must not import a control component.'
    },

    // imgAlt required iff imgSrc provided
    {
      validate: props => {
        const src = props['imgSrc'];
        const hasSrc = typeof src === 'string' && src.length > 0;
        if (!hasSrc) return true;
        const alt = props['imgAlt'];
        return typeof alt === 'string';
      },
      message: '`imgAlt` is required when `imgSrc` is provided (use "" if decorative).'
    },

    // a11y: ariaLabel required when no visible title
    {
      validate: props => {
        const t = props['title'];
        const hasTitle = typeof t === 'string' && t.trim().length > 0;
        if (hasTitle) return true;
        const a = props['ariaLabel'];
        return typeof a === 'string' && a.trim().length > 0;
      },
      message: 'Provide `ariaLabel` when no `title` is present so the card has an accessible name.'
    },

    // Composition / omissions
    { hint: 'Display-only container. Do not add actions, links, or dividers.' },
    { hint: 'Omit the `media` slot entirely when `imgSrc` is not provided.' },
    { hint: 'Render the `meta` slot only when `labels` is a non-empty array.' },

    // Layout & sizing (fixed to horizontal)
    {
      hint: 'Horizontal layout only. Two-column composition: media (left, fixed size) → content stack (right).'
    },
    {
      hint: 'Horizontal layout tokens: grid with [&:has(img)]:grid-cols-[112px_1fr], items-start, p-2, w-340. Media spans rows; image sized to w-104 h-104.'
    },

    // Image guidance
    {
      hint: 'When rendering media, use <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" /> and object-cover.'
    },

    // A11y guidance
    {
      hint: 'If `title` exists, it serves as the accessible name; `ariaLabel` is only a fallback/override when title is not provided.'
    },
    { hint: 'Icons inside `labels` are decorative by default and should be aria-hidden="true".' },

    // Server-only constraint
    {
      hint: 'MediaCard must remain a **server component**: no hooks, no event handlers, no "use client". The `control` slot is where client interactivity lives.'
    },

    // Non-focusable container
    {
      hint: 'The card root is not focusable or interactive; only the provided `control` slot handles interactivity.'
    }
  ],

  hints: {
    a11y: 'Non-interactive container; ensure a non-empty accessible name from visible `title` or `ariaLabel`. Decorative icons should be hidden from assistive tech.',
    server:
      'Generator must not import client components. Render the `control` **slot** exactly as provided by the consumer.'
  }
});
