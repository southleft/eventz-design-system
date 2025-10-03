import { defineContract } from '../../utilities';

export const DatePickerContract = defineContract({
  component: 'DatePicker',
  description:
    'Wrapper for rsuite DateRangePicker with passthrough props. Minimal DoXYZ wrapper handles responsive default for showOneCalendar and scoped styling.',

  // Use a neutral root container; core runtime renders rsuite DateRangePicker inside.
  base: 'div',

  // Public API modeled minimally; all other props are forwarded to rsuite.
  // We do NOT set a default on showOneCalendar here because the default is responsive at runtime:
  // < lg → true, >= lg → false.
  props: {
    showOneCalendar: { type: 'boolean' },
    fullWidth: { type: 'boolean', default: false }
  },

  // Single base slot; rsuite renders internally.
  slots: ['container'] as const,

  // Optional hint for container layout; visual classes live in the styleMap.
  layout: {
    type: 'container',
    tag: 'div',
    className: 'dxyz-date-picker'
  },

  // No validation guards; this is a passthrough wrapper.
  rules: [],

  styleMap: true,

  // Adapter + runtime guidance for the generator.
  hints: {
    // Not a Radix primitive; explicitly call out external adapter.
    radixAdapter: { uses: ['external:rsuite/DateRangePicker'] as const },
    dependencies: { npm: ['rsuite'] },

    // Forward ALL non-modeled props to rsuite DateRangePicker (omit deprecated props upstream).
    passthrough:
      'Forward all unmodeled props directly to rsuite DateRangePicker (omit deprecated props per rsuite docs).',

    // Responsive default documented for the runtime generator (handled in core):
    responsiveDefaults: {
      showOneCalendar: { lessThanLg: true, greaterOrEqualLg: false }
    },

    a11y: {
      recommendation:
        'Rely on rsuite semantics for the picker dialog and inputs. The wrapper should not alter accessible naming.'
    }
  }
});
