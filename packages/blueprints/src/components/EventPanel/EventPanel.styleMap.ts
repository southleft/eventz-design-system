// packages/blueprints/src/components/EventPanel/EventPanel.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const EventPanelStyleMap = defineStyleMap({
  // Base container (width spacing aligns to runtime)
  base: ['isolate', 'w-[390px]', 'lg:w-[560px]', 'lg:mx-32'] as const,

  slots: {
    // Media wrapper (image + overlay + split nav)
    _media: [
      'relative',
      'overflow-clip',
      // Fixed panel sizing
      'w-[390px]',
      'h-[390px]',
      'lg:w-[560px]',
      'lg:h-[490px]',
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
      'p-4',
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const,
    _left: ['flex', 'items-center', 'gap-2'] as const,
    _right: ['flex', 'items-center', 'gap-2'] as const,

    // Under-image event details (mobile-only block)
    _details: [
      'px-2',
      'py-4',
      'lg:hidden',
      'w-[380px]',
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const,

    _subtitle: ['text-sm', 'tracking-wide', 'uppercase', 'text-color-content-weak'] as const,
    _title: ['text-2xl', 'text-color-content-default'] as const,
    _description: ['text-base', 'text-color-content-weak', 'mb-12'] as const,

    _meta: [
      'flex',
      'flex-col',
      'items-start',
      'gap-2',
      'text-sm',
      'text-color-content-weak'
    ] as const,
    _labels: ['flex', 'flex-wrap', 'gap-3', 'mb-12'] as const,

    _avatars: ['flex', '-space-x-2', 'items-center'] as const,

    _buttons: [
      'mt-12',
      'lg:mt-24',
      'mx-12',
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
