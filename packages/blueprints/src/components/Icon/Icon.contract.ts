// packages/blueprints/src/components/Icon/Icon.contract.ts
import { defineContract } from '../../utilities';

export const IconContract = defineContract({
  component: 'Icon',
  description: 'Blueprint for Material Symbol icons rendered as standalone SVG elements.',
  base: 'svg',
  extends: 'React.SVGAttributes<SVGSVGElement>',

  props: {
    decorative: {
      type: 'boolean',
      default: true,
      description: 'Marks the icon as decorative. Set to false when the icon conveys meaning.'
    },

    title: {
      type: 'string',
      description:
        'Accessible title rendered when provided (required when decorative is false unless externally labelled).'
    },

    titleId: {
      type: 'string',
      description: 'ID used to associate the <title> element with aria-labelledby patterns.'
    },

    color: {
      type: 'string',
      default: 'currentColor',
      description:
        'Fill color applied to the svg; defaults to currentColor to inherit from text color.'
    }
  },

  slots: ['icon'] as const,

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        if (props['decorative'] === false) {
          const title = props['title'];
          const hasTitle = typeof title === 'string' && title.trim().length > 0;
          const ariaLabel = props['aria-label'] ?? props['ariaLabel'];
          const ariaLabelledby = props['aria-labelledby'] ?? props['ariaLabelledby'];
          const hasExternalLabel =
            (typeof ariaLabel === 'string' && ariaLabel.trim().length > 0) ||
            (typeof ariaLabelledby === 'string' && ariaLabelledby.trim().length > 0);
          return hasTitle || hasExternalLabel;
        }
        return true;
      },
      message:
        'Non-decorative icons require a title or accessible name via aria-label/aria-labelledby.'
    }
  ],

  styleMap: true,

  hints: {
    a11y: 'When decorative=false expose a readable label via title or external aria attributes; otherwise set decorative=true to hide from assistive tech.',
    passthrough:
      'Props extend React.SVGAttributes<SVGSVGElement>; width/height/viewBox and other svg attributes may be passed via ...rest.',
    viewBoxBaseline:
      'Normalize icons to viewBox="0 0 20 20" for consistency with the design baseline.',
    normalization:
      'If a source SVG uses the Material glyph viewBox "0 -960 960 960", set the component <svg viewBox="0 0 20 20"> and wrap the pasted path content in a <g transform="scale(0.0208333333,-0.0208333333)">…</g> to map the 960-unit, inverted Y space to the 20×20 grid. If the source is already 0 0 20 20, do not add a transform.'
  }
});
