// packages/blueprints/src/components/EventPanel/EventPanel.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const EventPanelStyleMap = defineStyleMap({
  // Base container stacks media + details (no clipping at root)
  base: ['isolate'] as const,

  slots: {
    // Media wrapper (image + overlay + split nav)
    _media: [
      'relative',
      'overflow-clip',
      // Fixed panel sizing (hero size)
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
      'group-data-[is-in-view=true]:scale-100',
      // Edge spacing at large breakpoints
      'mx-0',
      'lg:-mx-36'
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
      'p-4'
    ] as const,
    _left: [] as const,
    _right: [] as const,

    // Under-image event details (mobile-only block)
    _details: ['flex', 'lg:hidden', 'mt-3', 'flex-col', 'gap-2', 'p-4'] as const,

    _subtitle: ['text-sm', 'tracking-wide', 'uppercase', 'text-color-content-weak'] as const,
    _title: ['text-2xl', 'text-color-content-default'] as const,
    _description: ['text-base', 'text-color-content-weak'] as const,

    _meta: ['flex', 'flex-col', 'gap-1', 'text-sm', 'text-color-content-weak'] as const,
    _labels: ['flex', 'gap-3'] as const,
    label: ['flex', 'items-center', 'gap-1'] as const,

    _avatars: [] as const,

    _buttons: ['mt-2', 'flex', 'gap-3', 'items-center', 'justify-end'] as const
  },

  variants: {},
  state: {}
});
