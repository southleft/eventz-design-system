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

export const DatePicker = React.forwardRef<HTMLDivElement, InternalDatePickerProps>(
  ({ showOneCalendar, fullWidth = false, className, placeholder, ...rest }, ref) => {
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

    const isDisabled = Boolean((rest as { disabled?: boolean }).disabled);

    const isOpenControlled =
      Object.prototype.hasOwnProperty.call(rest, 'open') &&
      typeof (rest as { open?: unknown }).open === 'boolean';
    const [internalOpen, setInternalOpen] = React.useState<boolean>(
      (rest as { defaultOpen?: boolean }).defaultOpen ?? false
    );
    const effectiveOpen = isOpenControlled
      ? ((rest as { open?: boolean }).open ?? false)
      : internalOpen;

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

    const displayValue = React.useMemo(() => {
      if (!effectiveValue || !effectiveValue[0] || !effectiveValue[1]) {
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

    const userClassName: string | undefined =
      typeof className === 'string' ? className : undefined;

    const wrapperClassName = collapseWhitespace(
      composeClasses(
        baseClasses,
        containerClasses,
        fullWidth ? layoutFullWidthClasses : undefined,
        effectiveShowOneCalendar ? showOneCalendarStateClasses : undefined,
        userClassName
      )
    );

    const inputPlaceholder: string =
      typeof placeholder === 'string' ? placeholder : 'Select a date range';

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
          placeholder={inputPlaceholder}
          aria-haspopup="dialog"
          aria-expanded={effectiveOpen ? true : false}
        />
        <DateRangePicker
          {...rest}
          value={effectiveValue ?? undefined}
          onChange={handleChange}
          open={effectiveOpen}
          onOpen={requestOpen}
          onClose={requestClose}
          editable={false}
          showOneCalendar={effectiveShowOneCalendar}
          container={() => wrapperRef.current as unknown as HTMLElement}
        />
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
