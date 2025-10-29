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
      required: true,
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

    // Composition / omissions
    { hint: 'Display-only container. Do not add actions, links, or dividers.' },
    { hint: 'Omit the `media` slot entirely when `imgSrc` is not provided.' },
    { hint: 'Render the `meta` slot only when `labels` is a non-empty array.' },

    // Layout & sizing (fixed to horizontal)
    {
      hint: 'Horizontal layout only. Two-column composition: media (left, fixed size) → content stack (right).'
    },
    {
      hint:
        'Horizontal layout tokens: grid with [&:has(img)]:grid-cols-[92px_1fr] and sm:[&:has(img)]:grid-cols-[112px_1fr], items-start, p-2, w-340. Base also hosts focus-ring proxy selectors via &:has(:focus-visible).'
    },

    // Image guidance
    {
      hint:
        'When rendering media, use <img src={imgSrc} alt={resolvedAlt} loading="lazy" decoding="async" />, where resolvedAlt falls back to "" when `imgAlt` is missing. Apply object-cover plus responsive sizing (w-80/h-80 → sm:w-104/sm:h-104) and the hover opacity token.'
    },

    // A11y guidance
    { hint: '`title` supplies the accessible name; do not add alternative name props.' },
    { hint: 'Guard against blank strings: treat whitespace-only `title` and `subtitle` as absent when rendering.' },
    {
      hint:
        'Apply width modifiers on the `title` slot: w-286 when there is no media, w-200 sm:w-180 when media is present. Nest title text in a span with truncate helpers.'
    },
    { hint: 'Icons inside `labels` are decorative by default and should be aria-hidden="true".' },
    { hint: 'Render the control overlay only when the `control` slot yields content; skip the wrapper if the slot is empty.' },

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
    a11y:
      'Non-interactive container; keep the accessible name aligned with the visible `title`. Decorative icons should be hidden from assistive tech. Fallback to alt="" when `imgSrc` is present but `imgAlt` is unspecified.',
    server:
      'Generator must not import client components. Render the `control` **slot** exactly as provided by the consumer.'
  }
});
