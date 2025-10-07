import { defineContract } from '../../utilities';

export const DatePickerContract = defineContract({
  component: 'DatePicker',
  description:
    'Wrapper for RSuite DateRangePicker with a scoped container and our own visible Input trigger. Responsive defaults: showOneCalendar (< lg) and showHeader (!lg). Forwards unmodeled props to RSuite.',

  // Base root; runtime renders RSuite DateRangePicker inside and portals into this container.
  base: 'div',

  // Public API modeled to mirror the core component. All other props are forwarded to RSuite.
  props: {
    /**
     * Force single-calendar (mobile) layout. If omitted, the runtime defaults to true below lg and false at/above lg.
     */
    showOneCalendar: { type: 'boolean' },

    /**
     * Force showing the RSuite header. If omitted, the runtime defaults to !lg (hidden on mobile, visible on desktop).
     */
    showHeader: { type: 'boolean' },

    /**
     * Date display/parse format passed to RSuite.
     */
    format: { type: 'string', default: 'MM/dd/yyyy' },

    /**
     * Apply full-width layout to the wrapper container.
     */
    fullWidth: { type: 'boolean', default: false },

    /**
     * Additional classes for the wrapper container.
     */
    className: { type: 'string' },

    /**
     * Partial props forwarded to the internal Input trigger (not the RSuite input).
     * Use `InputProps.placeholder` to override the visible placeholder (default: "Select a date range").
     * Opaque, passthrough.
     */
    InputProps: { type: 'object' }
  },

  // Single base slot; RSuite renders internally beneath this container.
  slots: ['container'] as const,

  // Optional layout hint for the container wrapper; visuals live in the styleMap.
  layout: {
    type: 'container',
    tag: 'div',
    className: 'dxyz-date-picker'
  },

  // No validation guards at this layer; wrapper is a light adapter.
  rules: [],

  // This component has a dedicated style map file.
  styleMap: true,

  // Adapter + runtime guidance for the generator.
  hints: {
    radixAdapter: { uses: ['external:rsuite/DateRangePicker'] as const },
    dependencies: { npm: ['rsuite'] },

    // Forward ALL non-modeled props directly to RSuite DateRangePicker (omit deprecated upstream props).
    passthrough:
      'Forward all unmodeled props directly to RSuite DateRangePicker (omit deprecated props per RSuite docs).',

    // Responsive defaults documented for the runtime generator (handled in core runtime code):
    responsiveDefaults: {
      showOneCalendar: { lessThanLg: true, greaterOrEqualLg: false },
      showHeader: { lessThanLg: false, greaterOrEqualLg: true }
    },

    a11y: {
      recommendation:
        'Rely on RSuite semantics for the dialog and inputs. The wrapper does not alter accessible naming of the picker.'
    }
  }
});
