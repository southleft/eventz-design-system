// packages/blueprints/src/components/ExpandableContent/ExpandableContent.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ExpandableContentStyleMap = defineStyleMap({
  slots: {
    content: [
      'peer',
      'overflow-hidden',
      'data-[state=closed]:mh-18.75',
      'data-[state=closed]:line-clamp-3',
      'transition-[max-height]',
      'duration-200',
      'ease-in-out',
      'text-color-content-weak',
      'text-sm'
    ] as const,
    control: [
      'flex',
      'justify-center',
      'pt-4',
      '[&>button]:transition-transform',
      'peer-data-[state=open]:[&>button]:rotate-180',
      'peer-data-[state=closed]:[&>button]:rotate-0'
    ] as const
  }
});
