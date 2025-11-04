// packages/blueprints/src/components/Carousel/Carousel.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'Carousel',

  // Base is the Embla viewport/root (no focus ring here; interactive children own it)
  base: [
    'embla',
    'relative',
    'block',
    'overflow-hidden',
    'w-full',
    'touch-pan-y' // preserve vertical page scroll on mobile
  ] as const,

  // Slot-level class hooks rendered by the provider runtime
  // Expose the Embla track, the indicators rail, and individual indicator buttons
  slots: {
    _container: [
      'embla__container',
      'flex',
      'items-stretch',
      '[will-change:transform]',
      '[transform:translateZ(0)]' // GPU hint for smoother drag
      // gap/spacing is a composition concern; do not set here
    ] as const,

    _indicators: [
      'absolute',
      'inset-x-0',
      'bottom-0',
      'flex',
      'justify-center',
      'gap-2',
      'p-3'
    ] as const,

    // Each indicator is a <button>; no visible text, SR label provided at runtime.
    // Focus ring lives here (not on base).
    _indicator: [
      'relative',
      'shrink-0',
      'rounded-full',
      'outline-none',
      'transition-[transform,opacity]',
      'focus-visible:ring-2',
      'focus-visible:ring-token-focus'
    ] as const
  },

  state: {
    // Behavioral flags (runtime toggles)
    isDragging: ['[--carousel-dragging:1]'] as const,
    isAtStart: ['[--edge-start:1]'] as const,
    isAtEnd: ['[--edge-end:1]'] as const,
    rtl: ['[direction:rtl]'] as const,

    // Presence flags
    hasIndicators: ['[--has-indicators:1]'] as const,

    // Indicator visual states (apply to each button)
    // Inactive ≈ 14px gray; Active ≈ 20px lime (per Figma selection).
    // Colors are token-friendly with safe fallbacks; feel free to remap in theme.
    indicatorInactive: ['size-[14px]', 'opacity-80', 'bg-color-background-brand'] as const,

    indicatorActive: [
      'size-5', // 20px
      'opacity-100',
      'bg-color-content-subtle'
    ] as const
  }
});
