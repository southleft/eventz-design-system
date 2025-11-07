// packages/blueprints/src/components/Heading/Heading.contract.ts
import { defineContract } from '../../utilities';

export const HeadingContract = defineContract({
  component: 'Heading',
  description:
    'Semantic heading component (h1–h6) with level presets and tokenized Tailwind classes.',
  base: 'h2',

  props: {
    as: {
      type: 'enum',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const,
      default: 'h2',
      description: 'Semantic heading element to render.'
    },

    // Typography axes — same keys as Text.
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
        'auto',
        'inherit'
      ] as const,
      default: 'auto',
      description:
        'Typography scale. `auto` applies level presets by `as`. `inherit` applies no class.'
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
        'auto',
        'inherit'
      ] as const,
      default: 'auto',
      description: 'Font weight. `auto` applies level presets by `as`. `inherit` applies no class.'
    },

    align: {
      type: 'enum',
      options: ['left', 'center', 'right', 'justify', 'inherit'] as const,
      default: 'inherit',
      description: 'Text alignment. `inherit` applies no class.'
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
    },

    truncate: {
      type: 'boolean',
      default: false,
      description: 'Single-line truncation with ellipsis.'
    },

    noMargin: {
      type: 'boolean',
      default: true,
      description: 'When true, removes UA default margins via `m-0`.'
    }
  },

  styleMap: true,

  hints: {
    a11y: 'Headings convey document structure. Choose the correct `as` for outline, not just appearance.',
    /**
     * Generator/runtime hints (no responsive assumptions):
     * - Do not add breakpoint classes; leave responsiveness to consumers (e.g., a future Visibility wrapper).
     * - When `size === 'auto'`, toggle the preset size state for the current `as` level.
     * - When `weight === 'auto'`, toggle the preset weight state for the current `as` level.
     * - If the consumer provides an explicit `size` or `weight`, do NOT toggle the corresponding preset state.
     *
     * Fixed preset mapping (Tailwind base utilities only, non-responsive):
     *   h1 → size: `text-3xl` ; weight: `font-bold`
     *   h2 → size: `text-2xl` ; weight: `font-bold`
     *   h3 → size: `text-2xl` ; weight: `font-extrabold`
     *   h4 → size: `text-xl`  ; weight: `font-bold`
     *   h5 → size: `text-lg`  ; weight: `font-bold`
     *   h6 → size: `text-base`; weight: `font-bold`
     *
     * Note: Presets are realized via styleMap `presetSizeH*` / `presetWeightH*` states.
     */
    presets: {
      byAs: {
        h1: { size: '3xl', weight: 'bold' },
        h2: { size: '2xl', weight: 'bold' },
        h3: { size: 'xl', weight: 'extra-bold' },
        h4: { size: 'xl', weight: 'bold' },
        h5: { size: 'lg', weight: 'bold' },
        h6: { size: 'base', weight: 'bold' }
      }
    }
  }
});
