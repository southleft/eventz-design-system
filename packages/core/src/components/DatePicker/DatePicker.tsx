import * as React from 'react';
import { DateRangePicker } from 'rsuite';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { Input, InputProps as InputComponentProps } from '../Input';

const defaultInputProps: React.ComponentPropsWithoutRef<typeof Input> = {
  placeholder: 'Select a date range'
  // endIcon: <CalendarIcon aria-hidden="true" /> // optional: add when ready
};

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

type PartialInputComponentProps = Partial<InputComponentProps>

export interface DatePickerProps {
  showOneCalendar?: boolean;
  fullWidth?: boolean;
  className?: string;
  /**
   * Props to pass to the internal Input trigger.
   * These are spread onto <Input />; DatePicker’s own props (value, readOnly, handlers, a11y)
   * are applied AFTER the spread and therefore take precedence.
   */
  InputProps?: PartialInputComponentProps;
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
  ({ showOneCalendar, fullWidth = false, className, InputProps = {}, ...rest }: InternalDatePickerProps, ref) => {
    const [matchesLg, setMatchesLg] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => wrapperRef.current!, []);

    const isDisabled = Boolean((rest).disabled);

    const isOpenControlled =
      Object.prototype.hasOwnProperty.call(rest, 'open') &&
      typeof (rest).open === 'boolean';
    const [internalOpen, setInternalOpen] = React.useState<boolean>(
      (rest as { defaultOpen?: boolean }).defaultOpen ?? false
    );
    const openProp = (rest as { open?: boolean }).open;
    const effectiveOpen = isOpenControlled ? (openProp) : internalOpen;

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

    const effectiveInputProps = React.useMemo<PartialInputComponentProps>(
      (): PartialInputComponentProps => ({ ...defaultInputProps, ...InputProps }),
      [InputProps]
    );

    return (
      <div
        ref={wrapperRef}
        className={wrapperClassName}
        data-slot="container"
        data-show-one-calendar={effectiveShowOneCalendar ? 'true' : undefined}
      >
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
        <DateRangePicker
          {...rest}
          value={effectiveValue ?? undefined}
          onChange={handleChange}
          open={effectiveOpen}
          onOpen={requestOpen}
          onClose={requestClose}
          editable={false}
          showOneCalendar={effectiveShowOneCalendar}
          container={() => (wrapperRef.current ?? document.body)}
        />
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
