// packages/blueprints/src/components/ExpandableContent/ExpandableContent.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ExpandableContentStyleMap = defineStyleMap({
  slots: {
    content: [
      'peer',
      'overflow-hidden',
      'data-[state=closed]:mh-75',
      'data-[state=closed]:line-clamp-3',
      'transition-[max-height]',
      'duration-200',
      'ease-in-out'
    ] as const,
    control: [
      'text-center',
      'transition-transform',
      'peer-data-[state=open]:rotate-180',
      'peer-data-[state=closed]:rotate-0'
    ] as const
  }
});
