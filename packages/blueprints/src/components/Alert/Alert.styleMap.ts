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
    icon: ['mt-0.5', 'shrink-0'] as const,
    content: ['flex', 'flex-col', 'gap-2', 'flex-grow'] as const,
    title: ['text-base', 'font-bold'] as const,
    description: ['text-sm'] as const,
    textLink: [] as const,
    closeIcon: [] as const
  },

  // Visual variants are 1:1 with contract props.variant options
  variants: {
    success: ['bg-gradient-utility-success'] as const,
    info: ['bg-gradient-utility-info'] as const,
    warning: ['bg-gradient-utility-warning'] as const,
    danger: ['bg-gradient-utility-danger'] as const
  }
});
