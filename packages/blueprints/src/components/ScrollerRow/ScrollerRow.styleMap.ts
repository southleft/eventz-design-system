// packages/blueprints/src/components/ScrollerRow/ScrollerRow.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'ScrollerRow',

  // Flex row container used inside Scroller rails
  base: ['flex', 'gap-2', 'justify-between', 'items-center'] as const
});
