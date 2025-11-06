// packages/blueprints/src/components/NavigationContainer/NavigationContainer.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const NavigationContainerStyleMap = defineStyleMap({
  // Layout padding and neutral background utility for navigation regions.
  base: ['px-16', 'lg:px-112', 'py-24', 'lg:py-56', 'bg-background-none'] as const,

  slots: {
    container: [] as const
  }
});
