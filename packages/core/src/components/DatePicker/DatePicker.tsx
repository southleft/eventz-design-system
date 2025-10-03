import * as React from 'react';
import { DateRangePicker } from 'rsuite';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

const baseClasses = `
  [&_.rs-picker-popup]:bg-background-modal-dark
  [&_.rs-picker-popup]:text-content-default
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
}

type RsuiteDateRangePickerProps = Omit<
  React.ComponentPropsWithoutRef<typeof DateRangePicker>,
  'className' | 'showOneCalendar' | 'disabledDate'
>;

type InternalDatePickerProps = RsuiteDateRangePickerProps & DatePickerProps;

export const DatePicker = React.forwardRef<HTMLDivElement, InternalDatePickerProps>(
  ({ showOneCalendar, fullWidth = false, className, ...rest }, ref) => {
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
        className ? [className] : undefined
      )
    );

    return (
      <div
        ref={setWrapperRef}
        className={wrapperClassName}
        data-slot="container"
        data-show-one-calendar={effectiveShowOneCalendar ? 'true' : undefined}
      >
        <DateRangePicker
          {...rest}
          showOneCalendar={effectiveShowOneCalendar}
          container={() => wrapperRef.current as unknown as HTMLElement}
        />
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
