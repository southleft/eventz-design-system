// packages/blueprints/src/components/Map/Map.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'Map',
  base: 'section',
  props: {
    ariaLabel: {
      type: 'string',
      required: true,
      description: 'Accessible name for the map container (region).'
    },
    showControls: { type: 'boolean', default: true },
    showOverlay: { type: 'boolean', default: true },
    isNested: {
      type: 'boolean',
      default: false,
      description:
        'Applies nested layout sizing; when true, the runtime must set data-is-nested="true" on the root to activate nested styles.'
    },
    className: { type: 'string' }
  },
  slots: [],
  children: { allowed: true, description: 'Consumer-owned map instance renders here.' },
  rules: [
    {
      hint: 'Render presentational rail controls as real <button type="button"> elements with default disabled=true. Provide stable data hooks: [data-action="zoomIn"|"zoomOut"|"nearMe"]. Consumers enable & wire events externally.'
    },
    {
      hint: 'Each rail button should include an aria-label ("Zoom in", "Zoom out", "Near me"). Decorative icon content is aria-hidden.'
    },
    {
      hint: 'When isNested is true, add data-is-nested="true" to the root element; omit the attribute otherwise. This enables styleMap selectors data-[is-nested=true].'
    }
  ],
  styleMap: true,
  hints: {
    a11y: 'Root uses role="region". Name comes from ariaLabel. Do not cover provider logos/attribution.',
    /** DOM hooks (advisory for generators; not type-enforced) */
    domHooks: {
      rail: { part: '_rail', dataPart: 'rail', selector: '[data-part="rail"]' },
      tiles: [
        {
          action: 'zoomIn',
          selector: '[data-action="zoomIn"]',
          ariaLabel: 'Zoom in',
          defaultDisabled: true
        },
        {
          action: 'zoomOut',
          selector: '[data-action="zoomOut"]',
          ariaLabel: 'Zoom out',
          defaultDisabled: true
        },
        {
          action: 'nearMe',
          selector: '[data-action="nearMe"]',
          ariaLabel: 'Near me',
          defaultDisabled: true
        }
      ]
    }
  }
});
