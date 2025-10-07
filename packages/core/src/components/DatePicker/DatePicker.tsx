import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { DateRangePicker, DateRangePickerProps } from 'rsuite';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { ArrowDropDownIcon } from '../../icons';
import { Input, InputProps as InputComponentProps } from '../Input';
import { Button } from '../Button';

/**
 * DatePicker wraps RSuite’s DateRangePicker:
 * - We render our own <Input> as the visible trigger; the RSuite input group stays hidden.
 * - A few minimal casts exist because RSuite’s public prop types are permissive in places.
 *   These casts LOCALIZE looseness so the rest of this component stays strictly typed.
 *   If RSuite tightens types later, remove the casts here — do not spread casts elsewhere.
 * - Unit tests cover controlled/uncontrolled value & open, keyboard open/close, and portal container branches.
 */

const defaultInputProps: React.ComponentPropsWithoutRef<typeof Input> = {
  placeholder: 'Select a date range',
  endIcon: <ArrowDropDownIcon aria-hidden="true" />
};

const customLocale = {
  ok: 'Apply'
};

/** Class policy: use template literals only (no arrays). Keep token classes intact; compose via `composeClasses`. */
const baseClasses = `
  relative
  [&_.rs-btn]:border-comp-button-color-border-default
  [&_.rs-btn]:text-comp-button-color-content-default
  [&_.rs-btn]:hover:bg-comp-button-color-background-hover
  [&_.rs-btn]:hover:text-comp-button-color-content-default
  [&_.rs-btn]:hover:no-underline
  [&_.rs-btn]:active:text-comp-button-color-content-default
  [&_.rs-btn]:active:no-underline
  [&_.rs-btn]:active:bg-comp-button-color-background-active
  [&_.rs-btn]:focus:text-comp-button-color-content-default
  [&_.rs-btn]:focus:no-underline
  [&_.rs-btn]:focus:bg-transparent
  [&_.rs-btn]:focus-visible:outline-none
  [&_.rs-btn]:focus-visible:ring-2
  [&_.rs-btn]:focus-visible:ring-comp-border-focus-ring
  [&_.rs-btn-link]:bg-comp-button-color-background-default
  [&_.rs-btn-link]:focus:bg-comp-button-color-background-active
  [&_.rs-btn-link]:focus-visible:ring-offset-color-background-default
  [&_.rs-btn-primary]:bg-comp-button-primary-color-background-default
  [&_.rs-btn-primary]:text-comp-button-primary-color-content-default
  [&_.rs-btn-primary]:disabled:bg-comp-button-primary-color-background-default
  [&_.rs-btn-primary]:disabled:text-comp-button-primary-color-content-default
  [&_.rs-picker-input-group]:hidden
  [&_.rs-picker-input-group]:pointer-events-none
  [&_.rs-picker-daterange-header]:flex
  [&_.rs-picker-daterange-header]:justify-around
  [&_.rs-btn-subtle]:text-color-content-default
  [&_.rs-btn-subtle]:font-bold
  [&_.rs-btn-subtle]:hover:bg-transparent
  [&_.rs-btn-subtle]:hover:text-color-content-subtle
`;

const containerClasses = `dxyz-date-picker`;
const layoutFullWidthClasses = `w-full`;
const buttonMobileClasses = `text-[10px]`;

type PartialInputComponentProps = Partial<InputComponentProps>;

export interface DatePickerProps {
  showOneCalendar?: boolean;
  fullWidth?: boolean;
  className?: string;
  format?: string;
  showHeader?: boolean;
  placeholder?: string;
  /**
   * Props to pass to the internal Input trigger.
   * These are spread onto <Input />; DatePicker’s own props (value, readOnly, handlers, a11y)
   * are applied AFTER the spread and therefore take precedence.
   */
  InputProps?: PartialInputComponentProps;
}

type RsuiteDateRangePickerProps = Omit<
  DateRangePickerProps,
  | 'className'
  | 'showOneCalendar'
  | 'disabledDate'
  | 'editable'
  | 'format'
  | 'label'
  | 'appearance'
  | 'size'
  | 'block'
  | 'placeholder'
  | 'caretAs'
  | 'renderValue'
  | 'showHeader'
>;

type InternalDatePickerProps = RsuiteDateRangePickerProps & DatePickerProps;

export const DatePicker = React.forwardRef<HTMLDivElement, InternalDatePickerProps>(
  (
    {
      showOneCalendar,
      showHeader,
      format = 'MM/dd/yyyy',
      fullWidth,
      className,
      InputProps = {},
      ...rest
    }: InternalDatePickerProps,
    ref
  ) => {
    const [matchesLg, setMatchesLg] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => wrapperRef.current!, []);
    const customToolbarHostRef = React.useRef<HTMLDivElement | null>(null);
    const customToolbarRootRef = React.useRef<Root | null>(null);
    const [, setHasToolbarHost] = React.useState(false);

    const isDisabled = Boolean(rest.disabled);

    /**
     * Controlled `open` detection: presence + boolean type.
     * NOTE: The minimal cast(s) around RSuite props are intentional due to upstream wide types.
     * Do not “clean up” by removing these unless RSuite typings improve.
     */
    const isOpenControlled =
      Object.prototype.hasOwnProperty.call(rest, 'open') && typeof rest.open === 'boolean';
    const [internalOpen, setInternalOpen] = React.useState<boolean>(
      (rest as { defaultOpen?: boolean }).defaultOpen ?? false
    );
    const openProp = (rest as { open?: boolean }).open;
    const effectiveOpen = isOpenControlled ? openProp : internalOpen;

    const requestOpen = React.useCallback(
      (event?: React.SyntheticEvent | Event) => {
        if (isDisabled) {
          return;
        }
        if (!isOpenControlled) {
          setInternalOpen(true);
        }
        (rest as { onOpen?: (event?: React.SyntheticEvent | Event) => void }).onOpen?.(event);
      },
      [isDisabled, isOpenControlled, rest]
    );

    const requestClose = React.useCallback(
      (event?: React.SyntheticEvent | Event) => {
        if (!isOpenControlled) {
          setInternalOpen(false);
        }
        (rest as { onClose?: (event?: React.SyntheticEvent | Event) => void }).onClose?.(event);
      },
      [isOpenControlled, rest]
    );

    type RangeValue = [Date, Date] | null;

    /**
     * Controlled `value` detection uses presence (not type) by design:
     * RSuite may pass partial tuples; we normalize to `[Date, Date] | null` before forwarding.
     */
    const isValueControlled = Object.prototype.hasOwnProperty.call(rest, 'value');
    const [internalValue, setInternalValue] = React.useState<RangeValue>(
      ((rest as { defaultValue?: RangeValue }).defaultValue ?? null) as RangeValue
    );
    const effectiveValue: RangeValue =
      (isValueControlled ? ((rest as { value?: RangeValue }).value ?? null) : internalValue) ??
      null;

    const handleChange = React.useCallback(
      (next: RangeValue, event?: React.SyntheticEvent | Event) => {
        if (!isValueControlled) {
          setInternalValue(next);
        }
        (
          rest as { onChange?: (value: RangeValue, event?: React.SyntheticEvent | Event) => void }
        ).onChange?.(next ?? null, event);
      },
      [isValueControlled, rest]
    );

    /**
     * Display formatting seam — intentionally simple for now.
     * If product needs custom formatting, introduce a `formatRange?: (range) => string` prop
     * and default to this implementation to avoid branching here.
     */
    const displayValue = React.useMemo(() => {
      if (!effectiveValue || !effectiveValue[0] || !effectiveValue[1]) {
        return '';
      }
      const [start, end] = effectiveValue;
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }, [effectiveValue]);

    React.useEffect(() => {
      /**
       * SSR-safe: `window` / `matchMedia` may be unavailable. We guard before reading.
       * This effect drives the default for `showOneCalendar` based on the `lg` breakpoint.
       */
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return;
      }

      const mediaQueryList = window.matchMedia('(min-width: 1024px)');
      setMatchesLg(mediaQueryList.matches);

      const onChange = (event: MediaQueryListEvent) => {
        setMatchesLg(event.matches);
      };

      mediaQueryList.addEventListener('change', onChange);
      return () => {
        mediaQueryList.removeEventListener('change', onChange);
      };
    }, []);

    const effectiveShowOneCalendar =
      typeof showOneCalendar === 'boolean' ? showOneCalendar : !matchesLg;

    const effectiveShowHeader = showHeader === undefined ? !matchesLg : showHeader;
    const userClassName: string | undefined = typeof className === 'string' ? className : undefined;

    const wrapperClassName = collapseWhitespace(
      composeClasses(
        baseClasses,
        containerClasses,
        fullWidth ? layoutFullWidthClasses : undefined,
        userClassName
      )
    );
    const buttonMobileClassName = collapseWhitespace(composeClasses(buttonMobileClasses));

    /**
     * Keyboard trigger: open the popup from the visible Input.
     * We `preventDefault()` to avoid native text-field behaviors on Enter/ArrowDown.
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        requestOpen(event);
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        requestOpen(event);
      }
    };

    /**
     * Input defaults + consumer overrides:
     * - `defaultInputProps` supplies design defaults (e.g., placeholder).
     * - `InputProps` is a Partial of <Input> props and overrides defaults.
     * - DatePicker’s controlled/a11y props are applied AFTER this spread and take precedence.
     *   (Event handlers on the trigger are owned here; do not rely on `InputProps.onKeyDown/onClick`.)
     */
    const effectiveInputProps = React.useMemo<PartialInputComponentProps>(
      (): PartialInputComponentProps => ({ ...defaultInputProps, ...InputProps }),
      [InputProps]
    );

    const ranges = React.useMemo<DateRangePickerProps['ranges']>(() => {
      const dayMs = 24 * 60 * 60 * 1000;
      const now = Date.now();
      return [
        {
          label: 'Today',
          value: [new Date(now), new Date(now)]
        },
        {
          label: 'Tomorrow',
          value: [new Date(now + dayMs), new Date(now + dayMs)]
        },
        {
          label: 'Next 7 Days',
          value: [new Date(now), new Date(now + 7 * dayMs)]
        }
      ];
    }, []);

    React.useEffect(() => {
      // Helper: remove host if present
      const removeHost = () => {
        if (customToolbarRootRef.current) {
          customToolbarRootRef.current.unmount();
          customToolbarRootRef.current = null;
        }
        if (customToolbarHostRef.current && customToolbarHostRef.current.parentNode) {
          customToolbarHostRef.current.parentNode.removeChild(customToolbarHostRef.current);
          customToolbarHostRef.current = null;
        }
        setHasToolbarHost(false);
      };

      // Only when the popup is open and we are in one-calendar (mobile) mode.
      if (!effectiveOpen || !effectiveShowOneCalendar) {
        removeHost();
        return;
      }

      const renderToolbarIntoHost = () => {
        const host = customToolbarHostRef.current;
        if (!host) return;

        // Ensure we have a root bound to the current host
        if (!customToolbarRootRef.current) {
          customToolbarRootRef.current = createRoot(host);
        }

        // Compose the same toolbar UI we previously portaled
        const toolbar = (
          <div
            className="rs-picker-toolbar rs-stack"
            style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
          >
            <div className="rs-stack-item">
              <div
                className="rs-picker-toolbar-ranges rs-stack"
                style={{ alignItems: 'flex-start', gap: 4 }}
              >
                {ranges?.map(range => (
                  <div key={range.label as string} className="rs-stack-item">
                    <Button
                      variant="secondary"
                      className={buttonMobileClassName}
                      onClick={e => {
                        const closeOverlay = (range as { closeOverlay?: boolean }).closeOverlay;
                        handleChange(range.value as [Date, Date] | null, e);
                        if (closeOverlay !== false) {
                          requestClose(e);
                        }
                      }}
                    >
                      {range.label}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="rs-stack-item">
              {/* Keep an "Apply" affordance aligned with RSuite's layout; optional to implement later */}
            </div>
          </div>
        );

        customToolbarRootRef.current.render(toolbar);
        setHasToolbarHost(true); // keep our state in sync
      };

      // Create and insert a host as the first child of the RSuite panel
      const createHost = (panelEl: HTMLDivElement) => {
        const host = document.createElement('div');
        host.setAttribute('data-testid', 'daterange-predefined-top');
        panelEl.insertBefore(host, panelEl.firstChild);
        customToolbarHostRef.current = host;
        renderToolbarIntoHost();
      };

      // Ensure a host exists and is attached to the current panel
      const ensureHost = (panelEl: HTMLDivElement) => {
        const current = customToolbarHostRef.current;
        // If no host, or the current host is detached/not under this panel, (re)create it
        if (!current || !panelEl.contains(current)) {
          if (current && current.parentNode) {
            current.parentNode.removeChild(current);
          }
          createHost(panelEl);
          renderToolbarIntoHost();
          return;
        }
        // Host is valid and in the DOM
        renderToolbarIntoHost();
      };

      // Find the panel (fast path)
      const panel = wrapperRef.current?.querySelector(
        '.rs-picker-daterange-panel'
      ) as HTMLDivElement | null;

      // Observer that keeps the host alive across RSuite re-renders
      let observer: MutationObserver | null = null;

      const startObserving = (panelEl: HTMLDivElement) => {
        // Initial ensure
        ensureHost(panelEl);

        // Observe direct children only — panel re-renders will swap its child list
        observer = new MutationObserver(() => {
          ensureHost(panelEl);
        });
        observer.observe(panelEl, { childList: true });
      };

      if (panel) {
        startObserving(panel);
        return () => {
          if (observer) observer.disconnect();
          if (customToolbarRootRef.current) {
            customToolbarRootRef.current.unmount();
            customToolbarRootRef.current = null;
          }
          removeHost();
        };
      }

      // Slow path: panel not yet mounted — observe wrapper for subtree changes until panel appears
      if (wrapperRef.current && typeof MutationObserver !== 'undefined') {
        const wrapperObserver = new MutationObserver(() => {
          const found = wrapperRef.current!.querySelector('.rs-picker-daterange-panel');
          if (found instanceof HTMLDivElement) {
            wrapperObserver.disconnect();
            startObserving(found);
          }
        });

        wrapperObserver.observe(wrapperRef.current, { childList: true, subtree: true });

        // Cleanup: disconnect observer(s) and remove host (if any)
        return () => {
          wrapperObserver.disconnect();
          if (observer) observer.disconnect();
          if (customToolbarRootRef.current) {
            customToolbarRootRef.current.unmount();
            customToolbarRootRef.current = null;
          }
          removeHost();
        };
      }

      // Fallback cleanup (non-DOM envs)
      return removeHost;
    }, [
      effectiveOpen,
      buttonMobileClassName,
      effectiveShowOneCalendar,
      wrapperRef,
      ranges,
      handleChange,
      requestClose
    ]);

    return (
      <div
        ref={wrapperRef}
        className={wrapperClassName}
        data-slot="container"
        data-show-one-calendar={effectiveShowOneCalendar ? 'true' : undefined}
      >
        {/*
          Spread consumer InputProps first; DatePicker’s controlled & a11y props follow and win.
        */}
        <Input
          {...effectiveInputProps}
          data-testid="date-picker-input"
          value={displayValue}
          readOnly
          onClick={requestOpen}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          aria-haspopup="dialog"
          aria-expanded={effectiveOpen ? true : false}
        />
        {/*
          Portal container: mount inside our wrapper for styling/scope; fallback to `document.body` until ref is set.
          Tests exercise both branches of `container={() => (wrapperRef.current ?? document.body)}`.
        */}
        <DateRangePicker
          {...rest}
          character=""
          format={format}
          value={effectiveValue ?? undefined}
          onChange={handleChange}
          open={effectiveOpen}
          onOpen={requestOpen}
          onClose={requestClose}
          editable={false}
          showOneCalendar={effectiveShowOneCalendar}
          showHeader={effectiveShowHeader}
          container={() => wrapperRef.current ?? document.body}
          ranges={effectiveShowOneCalendar ? [] : ranges}
          locale={customLocale}
        />
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
