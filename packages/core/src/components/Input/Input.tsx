import * as React from 'react';
import { Popover, Label } from 'radix-ui';
import { InfoCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { mergeDescribedBy } from '../../utilities/mergeDescribedBy/mergeDescribedBy';

const baseClasses = `
  inline-flex flex-col gap-1 disabled:opacity-50 disabled:pointer-events-none
`;

const labelClasses = `
  inline-flex gap-1 text-color-content-default text-xs uppercase
`;

const infoTriggerClasses = `
  border-none bg-background-none text-color-content-subtle
  focus:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2
`;

const infoContentClasses = `
  max-w-xs rounded-md bg-color-content-default p-3 text-sm shadow-lg
`;

const inputRowClasses = `
  inline-flex items-center gap-2 text-color-content-default
  bg-comp-form-color-background-default border border-comp-form-color-border-default text-sm
  hover:bg-comp-form-color-background-hover hover:border-comp-form-color-hover
  focus-within:outline-none focus-within:ring-2 focus-within:ring-comp-border-focus-ring focus-within:ring-offset-2
  focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2
`;

const startIconClasses = `
  shrink-0 [&>svg]:size-4
`;

const valueClasses = `
  grow bg-transparent outline-none placeholder:text-color-content-weak
`;

const endIconClasses = `
  shrink-0 [&>svg]:size-4
`;

const hintClasses = `
  text-color-content-subtle text-xs
`;

const errorClasses = `
  text-color-content-utility-danger-subtle text-xs mt-1 inline-flex gap-2 pl-1
`;

const invalidStateClasses = `
  data-[invalid=true]:[&_[data-slot=input]]:border-comp-form-color-border-utility-danger
`;

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface InputProps extends Omit<NativeInputProps, 'children' | 'className' | 'id'> {
  // Contract props (explicit)
  label?: string;
  ariaLabel?: string; // optional; no runtime guard
  hint?: string;
  error?: string; // takes precedence over hint
  info?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  // Controlled / uncontrolled
  value?: string;
  defaultValue?: string;

  // Component flags
  disabled?: boolean;

  // Note: `type` remains available via NativeInputProps.
}

type InputElement = HTMLFieldSetElement;

export const Input = React.forwardRef<InputElement, InputProps>(
  (
    {
      label,
      ariaLabel,
      hint,
      error,
      info,
      startIcon,
      endIcon,
      value,
      defaultValue,
      disabled = false,
      ...inputRest
    },
    ref
  ) => {
    const trimmedLabel = label?.trim();
    const trimmedAriaLabel = ariaLabel?.trim();
    const trimmedHint = hint?.trim();
    const trimmedError = error?.trim();
    const trimmedInfo = info?.trim();

    const fieldsetId = React.useId();
    const inputId = `${fieldsetId}-input`;
    const infoContentId = trimmedInfo ? `${fieldsetId}-info` : undefined;
    const showError = Boolean(trimmedError);
    const showHint = !showError && Boolean(trimmedHint);
    const hintId = showHint ? `${fieldsetId}-hint` : undefined;
    const errorId = showError ? `${fieldsetId}-error` : undefined;

    const [isInfoOpen, setIsInfoOpen] = React.useState(false);

    React.useEffect(() => {
      if (!trimmedInfo) {
        setIsInfoOpen(false);
      }
    }, [trimmedInfo]);

    const { 'aria-describedby': inputAriaDescribedBy, type: typeProp, ...nativeInputRest } = inputRest;

    const describedBy = mergeDescribedBy(
      inputAriaDescribedBy,
      [
        isInfoOpen && infoContentId ? infoContentId : undefined,
        showError ? errorId : showHint ? hintId : undefined
      ].filter((token): token is string => Boolean(token))
    );

    const fieldsetClassName = collapseWhitespace(
      composeClasses(baseClasses, invalidStateClasses)
    );

    const legendClassName = collapseWhitespace(
      composeClasses(labelClasses, trimmedLabel ? undefined : 'sr-only')
    );
    const infoTriggerClassName = collapseWhitespace(composeClasses(infoTriggerClasses));
    const infoContentClassName = collapseWhitespace(composeClasses(infoContentClasses));
    const inputRowClassName = collapseWhitespace(composeClasses(inputRowClasses));
    const startIconClassName = collapseWhitespace(composeClasses(startIconClasses));
    const valueClassName = collapseWhitespace(composeClasses(valueClasses));
    const endIconClassName = collapseWhitespace(composeClasses(endIconClasses));
    const hintClassName = collapseWhitespace(composeClasses(hintClasses));
    const errorClassName = collapseWhitespace(composeClasses(errorClasses));

    const inputAriaLabel = trimmedLabel ? undefined : trimmedAriaLabel;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      ...nativeInputRest,
      className: valueClassName,
      disabled,
      id: inputId,
      'aria-label': inputAriaLabel,
      'aria-describedby': describedBy
    };

    if (typeProp !== undefined) {
      inputProps.type = typeProp;
    }

    if (value !== undefined) {
      inputProps.value = value;
    } else if (defaultValue !== undefined) {
      inputProps.defaultValue = defaultValue;
    }

    return (
      <fieldset
        id={fieldsetId}
        ref={ref}
        className={fieldsetClassName}
        disabled={disabled}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={showError ? 'true' : undefined}
      >
        <div>
          <Label.Root
            className={legendClassName}
            data-slot="label"
            htmlFor={inputId}
          >
            {trimmedLabel ?? trimmedAriaLabel ?? ''}
            {trimmedLabel && trimmedInfo ? (
              <Popover.Root onOpenChange={setIsInfoOpen}>
                <Popover.Trigger
                  className={infoTriggerClassName}
                  data-slot="infoTrigger"
                  aria-label="More info"
                  type="button"
                >
                  <InfoCircledIcon aria-hidden="true" />
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    side="top"
                    sideOffset={8}
                    className={infoContentClassName}
                    data-slot="infoContent"
                    id={infoContentId}
                  >
                    {trimmedInfo}
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            ) : null}
          </Label.Root>
        </div>

        <div className={inputRowClassName} data-slot="input">
          {startIcon ? (
            <span className={startIconClassName} data-slot="startIcon" aria-hidden="true">
              {startIcon}
            </span>
          ) : null}
          <input {...inputProps} />
          {endIcon ? (
            <span className={endIconClassName} data-slot="endIcon" aria-hidden="true">
              {endIcon}
            </span>
          ) : null}
        </div>

        {errorId ? (
          <div className={errorClassName} id={errorId} data-slot="error">
            <span aria-hidden="true">
              <ExclamationTriangleIcon aria-hidden="true" />
            </span>
            <span>{trimmedError}</span>
          </div>
        ) : hintId ? (
          <div className={hintClassName} id={hintId} data-slot="hint">
            {trimmedHint}
          </div>
        ) : null}
      </fieldset>
    );
  }
);

Input.displayName = 'Input';
