// packages/blueprints/src/components/Scroller/Scroller.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'Scroller',

  // Base is the horizontal scroll viewport
  base: [
    'relative',
    'block',
    'w-full',
    'overflow-x-auto',
    'overscroll-x-contain',
    'touch-pan-x',
    '[scrollbar-gutter:stable]'
  ] as const,

  // Slots:
  // - _rail: horizontal flex container for consumer content (switches to column via data attr)
  // - _controls: container below the rail for the two Control buttons
  // - _prev / _next: wrappers (Controls own their internal rings/styles)
  slots: {
    _rail: [
      'flex',
      'items-stretch',
      'min-w-0',
      'w-max',
      // When Scroller is composed with ScrollerRow children, stack rows vertically
      'data-[stack-rows=true]:flex-col'
    ] as const,

    _controls: ['mt-3', 'flex', 'gap-2', 'justify-end'] as const,

    _prev: ['shrink-0'] as const,
    _next: ['shrink-0'] as const
  },

  state: {
    // Behavioral flags (runtime toggles)
    isScrolling: ['[--scroller-scrolling:1]'] as const,
    isAtStart: ['[--scroller-edge-start:1]'] as const,
    isAtEnd: ['[--scroller-edge-end:1]'] as const,

    // Presence flags
    hasControls: ['[--has-controls:1]'] as const
  }
});
