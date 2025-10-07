import { defineStyleMap } from '../../utilities';

// Style map mirrors the runtime: the wrapper is relatively positioned and scoped by
// a stable class so component-layer CSS can target RSuite internals. All deeper
// overrides (calendar/popup/buttons) live in `@layer components` (index.css).
export const DatePickerStyleMap = defineStyleMap({
  // Keep structural positioning only; visual tokens are handled in CSS.
  base: ['relative'] as const,

  slots: {
    // Root wrapper; provides a stable scope class for targeting RSuite internals.
    container: ['dxyz-date-picker'] as const
  },

  // Layout flag for the wrapper (matches `fullWidth` prop in runtime).
  layout: {
    fullWidth: ['w-full'] as const
  },

  // No variant axis for v1; visuals are handled by tokens/utilities and the CSS component layer.
  variants: {},

  // No additional state-driven utilities: toolbar placement and responsive behavior
  // are handled by runtime logic + CSS (data attributes are set by the component itself).
  state: {}
});
