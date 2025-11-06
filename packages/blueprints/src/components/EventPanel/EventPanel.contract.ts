// packages/blueprints/src/components/EventPanel/EventPanel.contract.ts
import { defineContract } from '../../utilities';

export const EventPanelContract = defineContract({
  component: 'EventPanel',
  description:
    'Server-rendered event panel. Image with overlay navigation (left/right) only; all event details render under the image. Details are mobile-only; CTAs render below the media at all sizes.',
  base: 'div',

  // Flat props (server component)
  props: {
    imgSrc: { type: 'string', required: true },
    imgAlt: { type: 'string', required: true },
    loading: { type: 'enum', options: ['lazy', 'eager'] as const, default: 'lazy' },

    // Overlay split nav on the image
    leftAction: { type: 'slot' },
    rightAction: { type: 'slot' },

    // Event details (all UNDER the image)
    subtitle: { type: 'string' }, // overline (renders above title)
    title: { type: 'string' },
    description: { type: 'string' },
    chips: { type: 'slot' }, // Chip[] row (consumer-provided)
    avatars: { type: 'slot' }, // AvatarGroup (consumer-provided)
    buttons: { type: 'slot' } // CTA row (consumer-provided Buttons)
  },

  // Deterministic slots (no overlay content slot)
  slots: [
    '_media',
    '_image',
    '_overlay',
    '_actionsBar',
    '_left',
    '_right',
    '_details',
    '_subtitle',
    '_title',
    '_description',
    '_meta',
    '_labels',
    '_avatars',
    '_buttons'
  ] as const,

  // Structural layout only (no classes)
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      {
        tag: 'div',
        slot: '_media',
        children: [
          { tag: 'img', slot: '_image' },
          { tag: 'div', slot: '_overlay' },
          {
            tag: 'div',
            slot: '_actionsBar',
            children: [
              { tag: 'div', slot: '_left' },
              { tag: 'div', slot: '_right' }
            ]
          }
        ]
      },
      {
        tag: 'div',
        slot: '_details',
        children: [
          { tag: 'div', slot: '_subtitle' },
          { tag: 'div', slot: '_title' },
          { tag: 'div', slot: '_description' },
          {
            tag: 'div',
            slot: '_meta',
            children: [
              { tag: 'div', slot: '_labels' },
              { tag: 'div', slot: '_avatars' }
            ]
          }
        ]
      },
      { tag: 'div', slot: '_buttons' }
    ]
  },

  styleMap: true,

  hints: {
    a11y: {
      recommendation:
        'imgAlt is required (empty allowed if decorative). Decorative icons inside chips should be aria-hidden. Visible text provides the accessible name.'
    },
    visibility:
      'Event details are intended to be hidden at larger breakpoints via the styleMap (mobile-only). CTAs (_buttons) are rendered outside details so they remain visible at all sizes.'
  }
});
