// packages/blueprints/src/components/EventPanel/EventPanel.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const EventPanelStyleMap = defineStyleMap({
  // Base container (width spacing aligns to runtime)
  base: ['isolate', 'w-97.5', 'lg:w-140', 'lg:mx-8'] as const,

  slots: {
    // Media wrapper (image + overlay + split nav)
    _media: [
      'relative',
      'overflow-clip',
      // Fixed panel sizing
      'w-97.5',
      'h-97.5',
      'lg:w-140',
      'lg:h-122.5',
      // Transform + transition
      'transform-gpu',
      'transition-transform',
      'duration-700',
      'ease-in-out',
      'motion-reduce:transition-none',
      // Visual size change via scale (no layout thrash)
      'scale-80',
      'lg:scale-110',
      'group-data-[is-in-view=true]:scale-100'
    ] as const,

    _image: ['block', 'size-full', 'object-cover', 'object-center'] as const,

    _overlay: ['pointer-events-none', 'absolute', 'inset-0', 'overlay-image-overlay'] as const,

    // Split navigation actions over the image (no other overlay content)
    _actionsBar: [
      'absolute',
      'inset-x-0',
      'bottom-0',
      'flex',
      'items-center',
      'justify-between',
      'p-1',
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const,
    _left: ['flex', 'items-center', 'gap-0.5'] as const,
    _right: ['flex', 'items-center', 'gap-0.5'] as const,

    // Under-image event details (mobile-only block)
    _details: [
      'px-0.5',
      'py-1',
      'lg:hidden',
      'w-95',
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const,

    _subtitle: ['text-sm', 'tracking-wide', 'uppercase', 'text-color-content-weak'] as const,
    _title: ['text-2xl', 'text-color-content-default'] as const,
    _description: ['text-base', 'text-color-content-weak', 'mb-3'] as const,

    _meta: [
      'flex',
      'flex-col',
      'items-start',
      'gap-0.5',
      'text-sm',
      'text-color-content-weak'
    ] as const,
    _labels: ['flex', 'flex-wrap', 'gap-0.5', 'mb-3'] as const,

    _avatars: ['flex', '-space-x-0.5', 'items-center'] as const,

    _buttons: [
      'mt-3',
      'lg:mt-6',
      'mx-1',
      'lg:mx-0',
      'flex',
      'gap-3',
      'items-center',
      'justify-start',
      'lg:justify-end',
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const
  },

  variants: {},
  state: {}
});
