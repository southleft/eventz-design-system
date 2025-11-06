// packages/blueprints/src/components/EventPanel/EventPanel.contract.ts
import { defineContract } from '../../utilities';

export const EventPanelContract = defineContract({
  component: 'EventPanel',
  description:
    'Server-rendered event panel used inside a client Carousel. Image with overlay actions; under-image event details on mobile; desktop shows only CTA buttons under the image.',
  base: 'div',

  // Public props — allowed kinds only
  props: {
    imgSrc: { type: 'string', required: true },
    imgAlt: { type: 'string', required: true },
    loading: { type: 'enum', options: ['lazy', 'eager'] as const, default: 'lazy' },
    fetchPriority: { type: 'enum', options: ['high', 'low'] as const },

    // Overlay split actions (consumer-provided controls)
    leftAction: { type: 'slot' },
    rightAction: { type: 'slot' },

    // Event content (flattened; complex bits modeled as slots per blueprint rules)
    subtitle: { type: 'string' }, // overline (renders above title)
    title: { type: 'string' },
    description: { type: 'string' },
    labels: { type: 'slot' }, // chips row (icons inside should be aria-hidden)
    avatars: { type: 'slot' }, // AvatarGroup
    buttons: { type: 'slot' } // CTA row; consumer passes multiple controls within
  },

  // Slots in render order (includes all slot props)
  slots: [
    '_image',
    '_overlay',
    '_content',
    '_actionsBar',
    '_left',
    '_right',
    '_overlayButtons',
    '_details',
    '_subtitle',
    '_title',
    '_description',
    '_meta',
    '_labels',
    '_avatars',
    '_buttons'
  ] as const,

  styleMap: true,

  hints: {
    a11y: {
      recommendation:
        'imgAlt is required (empty allowed if decorative). Label icons should be aria-hidden. Visible text supplies the accessible name.'
    },
    composition:
      'Compose inside the client Carousel. Do not import EventPanel from client components. Desktop shows only overlay buttons; mobile shows full details block.'
  }
});
