// packages/blueprints/src/components/ImagePanel/ImagePanel.contract.ts
import { defineContract } from '../../utilities';

export const ImagePanelContract = defineContract({
  component: 'ImagePanel',
  description:
    'Server-rendered image panel for Carousel slides. Renders an image, overlay, and a content stack (title/description/labels/actions). Content fades and panel scales based on the parent slide wrapper data attribute.',
  // Native root; no Radix adapter needed.
  base: 'div',

  props: {
    /* Media */
    imgSrc: { type: 'string', required: true, description: 'Image source URL.' },
    imgAlt: {
      type: 'string',
      required: true,
      description: 'Image alt text ("" allowed if decorative).'
    },
    loading: {
      type: 'enum',
      options: ['lazy', 'eager'] as const,
      default: 'lazy',
      description: 'Native <img loading> hint.'
    },
    fetchPriority: {
      type: 'enum',
      options: ['high', 'low'] as const,
      description: 'Native <img fetchpriority> hint; use "high" for the first/hero image.'
    },

    /* Content */
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },

    labels: {
      type: 'array',
      of: {
        type: 'object',
        shape: {
          icon: {
            type: 'slot',
            description: 'Optional decorative icon; must be aria-hidden in runtime.'
          },
          label: { type: 'string', required: true },
          ariaLabel: {
            type: 'string',
            description: 'Accessible label for the visual chip if needed.'
          }
        }
      },
      default: [],
      description: 'List of category/status chips rendered above actions.'
    },

    actions: {
      type: 'array',
      of: { type: 'slot' },
      default: [],
      description: 'Action controls (e.g., Buttons/Links).'
    }
  },

  // Only consumer-facing slots go here. Internal styling hooks live in the styleMap via slot keys.
  slots: ['actions'] as const,

  // Structural layout with internal styleMap slot hooks (no classNames in contract).
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      // Image element
      { tag: 'img', slot: '_image' },
      // Overlay layer
      { tag: 'div', slot: '_overlay' },
      // Content stack
      {
        tag: 'div',
        slot: '_content',
        children: [
          { tag: 'div', slot: '_title' },
          { tag: 'div', slot: '_description' },
          { tag: 'div', slot: '_labels' },
          // Actions wrapper gets styling via _actions; the consumer-provided actions render inside it
          { tag: 'div', slot: '_actions', children: [{ slot: 'actions' }] }
        ]
      }
    ]
  },

  rules: [
    {
      hint: 'Server Component. Do not use client hooks. Pass img attributes directly (loading, fetchpriority). Use token classes for visuals.'
    },
    {
      hint: 'Fade/scale are driven by the Carousel-provided slide wrapper: set on wrapper `data-is-in-view="true"` for the incoming/active slide. ImagePanel responds via group-data selectors.'
    },
    {
      hint: 'Accessibility: imgAlt required ("" allowed if decorative). Label icons should be aria-hidden in runtime; actions should be real buttons/links with visible focus rings.'
    }
  ],

  styleMap: true,

  hints: {
    a11y: 'Content remains in the DOM for SEO. Opacity transitions do not hide content from assistive tech; consider `inert` on non-visible slide wrappers in the Carousel.',
    radixAdapter: { uses: [] as const }
  }
});
