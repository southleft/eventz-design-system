import { defineStyleMap } from '../../utilities';

export const FloatingBarStyleMap = defineStyleMap({
  base: ['flex items-center justify-between gap-2 px-16 py-24 bg-color-background-default outline-none'] as const,

  slots: {
    container: [],
    _startButton: ['_startButton shrink-0'] as const, // rendered only when isScrollable=true
    _endButton: ['_endButton shrink-0'] as const, // rendered only when isScrollable=true
    _rail: ['_rail flex items-center gap-2 min-w-0 flex-1'] as const,
    _content: ['_content min-w-0 flex-1 justify-start truncate text-color-content-default'] as const,
    _actions: ['_actions inline-flex gap-2 shrink-0 justify-end'] as const
  }
});
