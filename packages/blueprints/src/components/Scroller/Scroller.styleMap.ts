// packages/blueprints/src/components/Scroller/Scroller.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'Scroller',

  // Base is a non-scroll wrapper
  base: ['relative', 'block', 'w-full'] as const,

  // Slots
  slots: {
    // Horizontal scroll container (scrollbars hidden)
    _viewport: [
      'overflow-x-auto',
      'overscroll-x-contain',
      'touch-pan-x',
      '[scrollbar-gutter:stable]',
      '[-ms-overflow-style:none]',
      '[scrollbar-width:none]',
      '[&::-webkit-scrollbar]:hidden'
    ] as const,

    // Content track; stacks when data attribute is present
    _rail: [
      'flex',
      'items-stretch',
      'min-w-0',
      'w-max',
      'data-[stack-rows=true]:flex-col'
    ] as const,

    // Controls area beneath the viewport
    _controls: ['mt-3', 'flex', 'gap-2', 'justify-end'] as const,
    _prev: ['shrink-0'] as const,
    _next: ['shrink-0'] as const
  },

  state: {
    isScrolling: ['[--scroller-scrolling:1]'] as const,
    isAtStart: ['[--scroller-edge-start:1]'] as const,
    isAtEnd: ['[--scroller-edge-end:1]'] as const,
    hasControls: ['[--has-controls:1]'] as const
  }
});
