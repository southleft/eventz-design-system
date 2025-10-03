import * as React from 'react';
import { DateRangePicker } from 'rsuite';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { Input } from '../Input';

const baseClasses = `
  relative
  bg-modal-dark
  text-content-default
  [&_.rs-picker-popup]:bg-background-modal-dark
  [&_.rs-picker-popup]:text-content-default
  [&_.rs-picker-input-group]:invisible
  [&_.rs-picker-input-group]:pointer-events-none
`;

const containerClasses = `dxyz-date-picker`;
const layoutFullWidthClasses = `w-full`;
const showOneCalendarStateClasses = `
  data-[show-one-calendar=true]:[&_.rs-picker-toolbar]:flex
  data-[show-one-calendar=true]:[&_.rs-picker-toolbar]:flex-col
  data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:order-first
  data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:mb-2
  data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:border-b
  data-[show-one-calendar=true]:[&_.rs-picker-toolbar-option-group]:pb-1
`;

export interface DatePickerProps {
  showOneCalendar?: boolean;
  fullWidth?: boolean;
  className?: string;
  placeholder?: string;
}

type RsuiteDateRangePickerProps = Omit<
  React.ComponentPropsWithoutRef<typeof DateRangePicker>,
  | 'className'
  | 'showOneCalendar'
  | 'disabledDate'
  | 'editable'
  | 'label'
  | 'appearance'
  | 'size'
  | 'block'
  | 'placeholder'
  | 'caretAs'
  | 'renderValue'
>;

type InternalDatePickerProps = RsuiteDateRangePickerProps & DatePickerProps;

type DateRange = [Date, Date];

const isDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());

const isDateRange = (value: unknown): value is DateRange =>
  Array.isArray(value) && value.length === 2 && isDate(value[0]) && isDate(value[1]);

export const DatePicker = React.forwardRef<HTMLDivElement, InternalDatePickerProps>(
  (
    {
      showOneCalendar,
      fullWidth = false,
      className,
      placeholder,
      open: openProp,
      defaultOpen,
      onOpen: onOpenProp,
      onClose: onCloseProp,
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
      disabled: disabledProp,
      ...passThrough
    },
    ref
  ) => {
    const [matchesLg, setMatchesLg] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const setWrapperRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        wrapperRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const isDisabled = Boolean(disabledProp);

    const isOpenControlled = typeof openProp === 'boolean';
    const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen ?? false);
    const effectiveOpen = isOpenControlled ? (openProp as boolean) : internalOpen;

    const requestOpen = React.useCallback((event?: React.SyntheticEvent | Event) => {
      if (isDisabled) {
        return;
      }
      if (!isOpenControlled) {
        setInternalOpen(true);
      }
      onOpenProp?.(event);
    }, [isDisabled, isOpenControlled, onOpenProp]);

    const requestClose = React.useCallback((event?: React.SyntheticEvent | Event) => {
      if (!isOpenControlled) {
        setInternalOpen(false);
      }
      onCloseProp?.(event);
    }, [isOpenControlled, onCloseProp]);

    const isValueControlled = typeof valueProp !== 'undefined';
    const [internalValue, setInternalValue] = React.useState<DateRange | null>(
      isDateRange(defaultValue) ? defaultValue : null
    );
    const effectiveValue: DateRange | null = isValueControlled
      ? (isDateRange(valueProp) ? valueProp : null)
      : internalValue;

    const handleChange = React.useCallback(
      (nextValue: DateRange | null, event?: React.SyntheticEvent | Event) => {
        const nextRange = isDateRange(nextValue) ? nextValue : null;
        if (!isValueControlled) {
          setInternalValue(nextRange);
        }
        onChangeProp?.(nextRange, event);
      },
      [isValueControlled, onChangeProp]
    );

    const displayValue = React.useMemo(() => {
      if (!effectiveValue) {
        return '';
      }
      const [start, end] = effectiveValue;
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }, [effectiveValue]);

    React.useEffect(() => {
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

    const wrapperClassName = collapseWhitespace(
      composeClasses(
        baseClasses,
        containerClasses,
        fullWidth ? layoutFullWidthClasses : undefined,
        effectiveShowOneCalendar ? showOneCalendarStateClasses : undefined,
        className
      )
    );

    return (
      <div
        ref={setWrapperRef}
        className={wrapperClassName}
        data-slot="container"
        data-show-one-calendar={effectiveShowOneCalendar ? 'true' : undefined}
      >
        <Input
          data-testid="date-picker-input"
          value={displayValue}
          readOnly
          onClick={requestOpen}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === 'ArrowDown') {
              event.preventDefault();
              requestOpen(event);
            }
          }}
          disabled={isDisabled}
          placeholder={placeholder ?? 'Select a date range'}
          aria-haspopup="dialog"
          aria-expanded={effectiveOpen ? true : false}
        />
        <DateRangePicker
          {...passThrough}
          value={effectiveValue ?? null}
          onChange={handleChange}
          open={effectiveOpen}
          onOpen={requestOpen}
          onClose={requestClose}
          editable={false}
          disabled={disabledProp}
          showOneCalendar={effectiveShowOneCalendar}
          container={() => wrapperRef.current as unknown as HTMLElement}
        />
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
