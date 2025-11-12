// packages/blueprints/src/components/NavigationContainer/NavigationContainer.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const NavigationContainerStyleMap = defineStyleMap({
  // Layout padding and neutral background utility for navigation regions.
  base: ['px-4', 'lg:px-28', 'py-6', 'lg:py-14', 'bg-background-none'] as const,

  slots: {
    container: [] as const
  }
});
