// packages/blueprints/src/components/ImagePanel/ImagePanel.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const ImagePanelStyleMap = defineStyleMap({
  base: [
    // Root sizing (hero size) and motion
    'relative',
    'isolate',
    'overflow-clip',
    'w-[390px]',
    'h-[390px]',
    'lg:w-[1040px]',
    'lg:h-[620px]',
    // Transform + transition (explicit duration/ease; motion-reduce guarded)
    'transform-gpu',
    'transition-transform',
    'duration-700',
    'ease-in-out',
    'motion-reduce:transition-none',
    // Visual size change via scale (no layout thrash)
    'scale-80',
    'group-data-[is-in-view=true]:scale-100',
    // Edge spacing adjustments at large breakpoints
    'mx-0',
    'lg:-mx-36'
  ] as const,

  slots: {
    // Structural slot class hooks used by the generator per contract layout
    container: [],

    _image: [
      'block',
      'size-full',
      'object-cover',
      'object-center' // <img> receives loading/fetchpriority via props
    ] as const,

    _overlay: [
      'pointer-events-none',
      'absolute',
      'inset-0',
      'overlay-image-overlay-dark' // utility bound to --overlay-image-overlay-dark token
    ] as const,

    _content: [
      'absolute',
      'inset-0',
      'flex',
      'flex-col',
      'justify-end',
      'items-start',
      // Padding currently mirrors runtime (both token and explicit for now)
      'p-4',
      // Fade with explicit duration/ease; motion-reduce guarded
      'opacity-0',
      'transition-opacity',
      'duration-1000',
      'ease-in-out',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const,

    _title: ['text-2xl', 'text-color-content-default'] as const,

    _description: ['text-base', 'text-color-content-weak'] as const,

    _labels: ['text-sm', 'text-color-content-weak', 'flex', 'gap-4'] as const,

    _actions: ['flex', 'gap-3', 'items-center', '-mb-4'] as const
  },

  // No variants; visuals are token-driven
  variants: {},

  // No extra state keys; visibility is driven by wrapper data attribute (group-data selectors)
  state: {}
});
