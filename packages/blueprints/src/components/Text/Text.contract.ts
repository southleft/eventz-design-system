import { defineContract } from '../../utilities';

export const TextContract = defineContract({
  component: 'Text',
  description: 'Semantic text component that maps typographic props to tokenized Tailwind classes.',
  base: 'span',

  props: {
    as: {
      type: 'enum',
      options: [
        'span',
        'p',
        'div',
        'label',
        'strong',
        'em',
        'small',
        'code',
        'kbd',
        'mark'
      ] as const,
      default: 'span',
      description: 'Semantic element to render. Semantics only; visuals are controlled by props.'
    },

    size: {
      type: 'enum',
      options: [
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        'inherit'
      ] as const,
      default: 'base',
      description: 'Typography scale. `inherit` applies no class.'
    },

    weight: {
      type: 'enum',
      options: [
        'thin',
        'extra-light',
        'light',
        'normal',
        'medium',
        'semi-bold',
        'bold',
        'extra-bold',
        'black',
        'inherit'
      ] as const,
      default: 'normal',
      description: 'Font weight. `inherit` applies no class.'
    },

    align: {
      type: 'enum',
      options: ['left', 'center', 'right', 'justify', 'inherit'] as const,
      default: 'inherit',
      description: 'Text alignment. `inherit` applies no class.'
    },

    truncate: {
      type: 'boolean',
      default: false,
      description: 'Single-line truncation with ellipsis.'
    },

    color: {
      type: 'enum',
      options: [
        'default',
        'brand',
        'weak',
        'inverse',
        'subtle',
        'danger-strong',
        'danger-subtle',
        'warning-strong',
        'warning-subtle',
        'success-strong',
        'success-subtle',
        'info-strong',
        'info-subtle',
        'inherit'
      ] as const,
      default: 'default',
      description:
        'Text color role. Status (utility) roles use the utility prefix. `inherit` applies no class.'
    },

    transform: {
      type: 'enum',
      options: ['normal', 'uppercase', 'lowercase', 'capitalize', 'inherit'] as const,
      default: 'inherit',
      description: 'Text transform. `inherit` applies no class.'
    },

    italic: {
      type: 'boolean',
      default: false,
      description: 'Render italic style when true.'
    }
  },

  // No slots; typography-only component
  styleMap: true,

  hints: {
    a11y: 'Typography-only; avoid conveying meaning with color alone. Inherit uses no class to prevent collisions.'
  }
});
