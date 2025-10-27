import { defineContract } from '../../utilities';

/**
 * ContentCard — server-safe, display-only card.
 * Root is non-interactive; may be focusable via prop.
 * No slots are defined for this component.
 */
const ContentCardContract = defineContract({
  component: 'ContentCard',
  base: 'div',
  styleMap: true,

  props: {
    layout: {
      type: 'enum',
      options: ['vertical', 'horizontal', 'post'] as const,
      default: 'vertical',
      description: 'Presentation-only layout; controls ordering and spacing.'
    },

    focusable: {
      type: 'boolean',
      default: false,
      description:
        'When true, root is tabbable (tabIndex=0). Focus styles are applied via styleMap.'
    },

    title: {
      type: 'string',
      required: true,
      description: 'Primary visible name for the card.'
    },

    subtitle: {
      type: 'string',
      required: false,
      description: 'Optional secondary line under the title.'
    },

    description: {
      type: 'string',
      required: false,
      description: 'Optional body copy.'
    },

    labels: {
      // Array of { icon?: React.ReactNode; label: string }
      type: 'array',
      required: false,
      description: 'Inline labels row. Icons are typically decorative.',
      of: {
        type: 'object',
        shape: {
          icon: { type: 'slot', required: false },
          label: { type: 'string', required: true }
        }
      }
    },

    imgSrc: {
      type: 'string',
      required: false,
      description: 'If provided, a default <img> may be rendered by the runtime.'
    },

    imgAlt: {
      type: 'string',
      required: false,
      description: 'Alt text for the default image when imgSrc is provided.'
    },

    ariaLabel: {
      type: 'string',
      required: false,
      description: 'Accessible name fallback if a visible title is not rendered.'
    }
  }
});

export default ContentCardContract;
