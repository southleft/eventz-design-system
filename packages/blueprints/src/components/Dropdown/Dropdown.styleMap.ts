import { defineStyleMap } from '../../utilities';

export const DropdownStyleMap = defineStyleMap({
  component: 'Dropdown',

  base: [] as const,

  slots: {
    // Trigger button (extends Button secondary styles; these are additive constraints)
    container: ['min-w-40'] as const,
    // Popover panel container
    content: [
      'rounded-md',
      'border',
      'shadow-md',
      'p-0.5',
      'bg-color-background-default',
      'text-color-content-default',
      'border-color-border-subtle'
    ] as const
  },

  // No visual variants for Dropdown; appearance is locked.
  // variants: {},

  state: {
    // Mirrors contract props for deterministic toggles (even if no extra classes are needed yet)
    open: [] as const
  }
});
