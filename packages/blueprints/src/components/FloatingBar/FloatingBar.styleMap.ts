import { defineStyleMap } from '../../utilities';

export const FloatingBarStyleMap = defineStyleMap({
  base: ['flex items-center justify-between gap-0.5 px-4 py-6 bg-color-background-default outline-none'] as const,

  slots: {
    container: [],
    _startButton: ['_startButton shrink-0'] as const, // rendered only when isScrollable=true
    _endButton: ['_endButton shrink-0'] as const, // rendered only when isScrollable=true
    _rail: ['_rail flex items-center gap-0.5 min-w-0 flex-1'] as const,
    _content: ['_content min-w-0 flex-1 justify-start truncate text-color-content-default text-lg'] as const,
    _actions: ['_actions inline-flex gap-0.5 shrink-0 justify-end'] as const
  }
});
