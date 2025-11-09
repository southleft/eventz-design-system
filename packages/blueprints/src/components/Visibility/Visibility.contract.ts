// packages/blueprints/src/components/Visibility/Visibility.contract.ts
import { defineContract } from '../../utilities';

export const VisibilityContract = defineContract({
  component: 'Visibility',
  description:
    'Utility wrapper that shows or hides its children between Tailwind breakpoints (mobile-first).',
  base: 'div',

  props: {
    from: {
      type: 'enum',
      options: ['sm', 'md', 'lg', 'xl', '2xl'] as const
    },
    to: {
      type: 'enum',
      options: ['sm', 'md', 'lg', 'xl', '2xl'] as const
    }
  },

  // Notes & guardrails for the generator; schema-only.
  rules: [
    {
      hint: 'Baseline selection: • Only `from` provided → toggle `baselineInvisible` (start hidden, become visible at and above `from`). • Only `to` provided → toggle `baselineVisible` (start visible, become invisible at and above `to`). • Both provided: if `from ≤ to`, use `baselineInvisible` (visible only between `from` and `to`); if `from > to`, use `baselineVisible` (visible outside the `to…from` window).'
    },
    {
      hint: 'State toggles: pick exactly one baseline (`baselineInvisible` or `baselineVisible`). If `from` exists, also toggle exactly one of `fromSm|fromMd|fromLg|fromXl|from2xl`. If `to` exists, also toggle exactly one of `toSm|toMd|toLg|toXl|to2xl`.'
    },
    {
      hint: 'Examples: <Visibility from="lg"> → invisible lg:visible <Visibility to="xl"> → visible xl:invisible <Visibility from="md" to="xl"> → invisible md:visible xl:invisible <Visibility from="xl" to="md"> → visible md:invisible xl:visible'
    }
  ],

  // Visuals come purely from utilities; no tokens needed.
  styleMap: true,

  // No slots; children are rendered directly inside the container.
  slots: [] as const,

  // Accessibility hint: this wrapper does not change semantics; it only toggles CSS visibility.
  hints: {
    a11y: 'This component only controls CSS visibility. Do not use it to hide focusable interactive elements without also managing tab order.'
  }
});
