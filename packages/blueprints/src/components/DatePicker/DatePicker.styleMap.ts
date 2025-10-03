import { defineStyleMap } from '../../utilities';

export const DatePickerStyleMap = defineStyleMap({
  // Minimal surface styling; further tokens will be added after the styling pass.
  base: ['bg-modal-dark', 'text-content-default'] as const,

  slots: {
    // Root wrapper; provides a stable scope class for targeting rsuite internals.
    container: ['dxyz-date-picker'] as const
  },

  // Layout flag for the wrapper.
  layout: {
    fullWidth: ['w-full'] as const
  },

  // No variant axis for v1; visuals are handled by tokens/utilities and future styling work.
  variants: {},

  // State: Tailwind-only reordering of predefined ranges to the top when one calendar is shown (mobile).
  // The runtime sets data-show-one-calendar on the wrapper when effective (prop or responsive default).
  state: {
    showOneCalendar: [
      'data-[show-one-calendar=true]:[&_.rs-picker-toolbar]:flex',
      'data-[show-one-calendar=true]:[&_.rs-picker-toolbar]:flex-col',
      'data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:order-first',
      'data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:mb-2',
      'data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:border-b',
      'data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:pb-1'
    ] as const
  }
});

