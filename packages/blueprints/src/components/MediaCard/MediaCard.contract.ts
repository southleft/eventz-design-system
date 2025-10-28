// packages/blueprints/src/components/MediaCard/MediaCard.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'MediaCard',
  description:
    'Display card for media content with an optional image and a required overlay control. Non-navigational; horizontal layout only.',

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
            description: 'Optional decorative icon for a label item (render aria-hidden).'
          },
          label: { type: 'string' }
        }
      },
      description:
        'Rendered as the meta row; each item displays a short label with an optional decorative icon.'
    },

    imgSrc: {
      type: 'string',
      description: 'Optional picture source.'
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
      description: 'Required overlay control (e.g., &lt;MediaControl /&gt;).'
    }
  },

  // Slot order and presence rules (no arbitrary children)
  slots: [
    'media', // wraps <img>; omit entirely when no imgSrc
    'subtitle',
    'title',
    'meta', // renders from labels[]
    'control' // overlay bubble
  ] as const,

  styleMap: true,

  rules: [
    // Required control
    {
      validate: props => props['control'] != null,
      message: 'MediaCard requires a `control` slot (e.g., <MediaControl />).'
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
    { hint: 'This card is display-only. Do not add actions, links, or dividers.' },
    { hint: 'Omit the `media` slot entirely when `imgSrc` is not provided.' },
    { hint: 'Render the `meta` slot only when `labels` is a non-empty array.' },

    // Layout & order
    {
      hint: 'Horizontal layout only. Two-column composition: media (left, fixed size) → content stack (right).'
    },
    { hint: 'Content stack order is strictly: subtitle → title → meta.' },

    // Image guidance
    {
      hint: 'When rendering media, use <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" /> and object-cover.'
    },

    // A11y guidance
    {
      hint: 'If `title` exists, it serves as the accessible name; `ariaLabel` is only a fallback/override when title is not provided.'
    },
    { hint: 'Icons inside `labels` are decorative by default and should be aria-hidden="true".' },

    // Non-focusable container
    {
      hint: 'The card root is not focusable or interactive; only the provided `control` handles interactivity.'
    }
  ],

  hints: {
    a11y: 'Non-interactive container; ensure a non-empty accessible name from visible `title` or `ariaLabel`. Decorative icons should be hidden from assistive tech.'
  }
});
