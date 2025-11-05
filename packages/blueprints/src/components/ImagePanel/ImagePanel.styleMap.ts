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
    'transform-gpu',
    'transition-transform',
    'duration-token-md',
    'ease-token-standard',
    // Visual size change via scale (no layout thrash)
    'scale-95',
    'group-data-[is-in-view=true]:scale-100'
  ] as const,

  slots: {
    // Structural slot class hooks used by the generator per contract layout
    container: [],

    _image: [
      'block',
      'size-full',
      'object-cover',
      'object-center'
      // <img> receives loading/fetchpriority via props
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
      'gap-1',
      'items-start',
      'p-token-md',
      'opacity-0',
      'transition-opacity',
      'duration-token-md',
      'ease-token-standard',
      'group-data-[is-in-view=true]:opacity-100',
      'motion-reduce:transition-none'
    ] as const,

    _title: ['text-2xl', 'text-color-content-default'] as const,

    _description: ['text-base', 'text-color-content-weak'] as const,

    _labels: ['text-sm', 'text-color-content-weak', 'flex'] as const,

    _actions: ['flex', 'gap-2', 'items-center'] as const
  },

  // No variants; visuals are token-driven
  variants: {},

  // No extra state keys; visibility is driven by wrapper data attribute (group-data selectors)
  state: {}
});
