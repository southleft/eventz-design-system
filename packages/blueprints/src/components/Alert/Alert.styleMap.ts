// packages/blueprints/src/components/Alert/Alert.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const AlertStyleMap = defineStyleMap({
  // Always-on surface scaffolding lives on container per design tokens
  base: [] as const,

  // Slots map to contract slots; container holds structure and spacing
  slots: {
    container: [
      'flex',
      'gap-8',
      'items-start',
      'pt-12',
      'pb-12',
      'pl-16',
      'pr-16',
      'w-390',
      'rounded-md',
      'text-color-content-inverse'
    ] as const,
    icon: ['_icon', 'mt-0.5', 'shrink-0'] as const,
    content: ['_content', 'flex', 'flex-col', 'gap-2'] as const,
    title: ['text-base', 'font-bold', '_title'] as const,
    description: ['text-sm', '_description'] as const,
    textLink: ['_textLink'] as const,
    closeIcon: ['fill-color-content-inverse', '_closeIcon'] as const
  },

  // Visual variants are 1:1 with contract props.variant options
  variants: {
    success: ['bg-gradient-utility-success', 'fill-color-content-utility-success-strong'] as const,
    info: ['bg-gradient-utility-info', 'fill-color-content-utility-info-strong'] as const,
    warning: ['bg-gradient-utility-warning', 'fill-color-content-utility-warning-strong'] as const,
    danger: ['bg-gradient-utility-danger', 'fill-color-content-utility-danger-strong'] as const
  },

  // Semantic/data-driven flags (generator adds these classes when the state is true)
  state: {
    // Placeholder for text link styling hooks
    hasTextLink: [] as const
  }
});
