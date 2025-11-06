// packages/blueprints/src/components/EventPanel/EventPanel.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const EventPanelStyleMap = defineStyleMap({
  base: [
    // Hero sizing owned by the panel (not Carousel)
    'relative',
    'isolate',
    'overflow-clip',
    'w-[390px]',
    'h-[390px]',
    'lg:w-[1040px]',
    'lg:h-[620px]',
    // Motion & transform
    'transform-gpu',
    'transition-transform',
    'duration-700',
    'ease-in-out',
    'motion-reduce:transition-none',
    // Scale change for snap visibility
    'scale-80',
    'group-data-[is-in-view=true]:scale-100',
    // Edge spacing at large breakpoints
    'mx-0',
    'lg:-mx-36'
  ] as const,

  slots: {
    // Optional structural hook (unused, kept for mapping completeness)
    container: [],

    _image: ['block', 'size-full', 'object-cover', 'object-center'] as const,

    _overlay: [
      'pointer-events-none',
      'absolute',
      'inset-0',
      'overlay-image-overlay' // resolves to dark by default; light override via root mode
    ] as const,

    _content: [
      'absolute',
      'inset-0',
      'flex',
      'flex-col',
      'justify-between',
      'p-4',
      'p-token-md',
      // Fade in on snap visibility (parallel to ImagePanel behavior)
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const,

    _actionsBar: ['flex', 'items-center', 'justify-between', 'w-full'] as const,
    _left: ['flex', 'items-center', 'gap-2'] as const,
    _right: ['flex', 'items-center', 'gap-2'] as const,

    _overlayButtons: ['hidden', 'lg:flex', 'gap-3', 'items-center', 'justify-end'] as const,

    // Under-image details (mobile only)
    _details: [
      'block',
      'lg:hidden',
      'mt-3',
      'flex',
      'flex-col',
      'gap-2',
      'p-4',
      'p-token-md'
    ] as const,

    _subtitle: ['text-sm', 'tracking-wide', 'uppercase', 'text-color-content-weak'] as const,
    _title: ['text-2xl', 'text-color-content-default'] as const,
    _description: ['text-base', 'text-color-content-weak'] as const,

    _meta: [
      'flex',
      'flex-wrap',
      'items-center',
      'gap-x-4',
      'gap-y-1',
      'text-sm',
      'text-color-content-weak'
    ] as const,
    _labels: ['flex', 'gap-3'] as const,
    _avatars: ['flex', '-space-x-2', 'items-center'] as const,

    _buttons: ['mt-2', 'flex', 'gap-3', 'items-center'] as const
  },

  variants: {},
  state: {}
});
