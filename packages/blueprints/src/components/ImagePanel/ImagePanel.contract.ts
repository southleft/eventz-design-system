// packages/blueprints/src/components/ImagePanel/ImagePanel.contract.ts
import { defineContract } from '../../utilities';

export const ImagePanelContract = defineContract({
  component: 'ImagePanel',
  description:
    'Server-rendered image panel for Carousel slides. Renders an image, overlay, and a content stack (actions/title/description/labels). Content fades and panel scales based on the parent slide wrapper data attribute.',
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
    title: { type: 'string', description: 'Optional heading text.' },
    description: { type: 'string', description: 'Optional supporting text.' },

    labels: {
      type: 'array',
      of: {
        type: 'object',
        shape: {
          icon: { type: 'slot', description: 'Optional decorative icon; aria-hidden in runtime.' },
          label: { type: 'string', required: true },
          ariaLabel: {
            type: 'string',
            description: 'Accessible label for the visual chip if needed.'
          }
        }
      },
      default: [],
      description: 'List of category/status chips.'
    },

    actions: {
      type: 'array',
      of: { type: 'slot' },
      default: [],
      description: 'Action controls (e.g., Buttons/Links).'
    }
  },

  // Only consumer-facing slots go here. Internal styling hooks live in the styleMap via underscored slots.
  slots: ['actions'] as const,

  // Structural layout with internal styleMap slot hooks (no classNames in contract).
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { tag: 'img', slot: '_image' },
      { tag: 'div', slot: '_overlay' },
      {
        tag: 'div',
        slot: '_content',
        children: [
          // Actions at the top (per spec correction)
          { tag: 'div', slot: '_actions', children: [{ slot: 'actions' }] },
          { tag: 'div', slot: '_title' },
          { tag: 'div', slot: '_description' },
          { tag: 'div', slot: '_labels', children: [{ slot: 'label' }] }
        ]
      }
    ]
  },

  // No validations; schema-only blueprints.
  styleMap: true,

  hints: {
    a11y: 'Content remains in the DOM for SEO. Opacity transitions do not hide content from assistive tech; Carousel wrapper may use inert on non-visible slides.',
    radixAdapter: { uses: [] as const }
  }
});
