import * as React from 'react';
import { Popover, Label } from 'radix-ui';
import { InfoCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { mergeDescribedBy } from '../../utilities/mergeDescribedBy/mergeDescribedBy';

const baseClasses = `
  inline-flex border-none flex-col gap-1 disabled:opacity-50 disabled:pointer-events-none
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

const textareaRowClasses = `
  inline-flex items-center gap-2 rounded-lg px-(--spacing-1_5)
  bg-comp-form-color-background-default border border-comp-form-color-border-default text-sm
  hover:bg-comp-form-color-background-hover hover:border-comp-form-color-hover
  [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-offset-4 [&:has(:focus-visible)]:ring-comp-border-focus-ring [&:has(:focus-visible)]:ring-offset-color-background-default
`;

const startIconClasses = `
  shrink-0 [&>svg]:size-4 py-(--spacing-1_5) inline-flex text-color-content-default
`;

const valueClasses = `
  grow bg-transparent outline-none text-color-content-default placeholder-color-content-weak border-none py-(--spacing-1_5) focus:placeholder:opacity-0
`;

const endIconClasses = `
  shrink-0 [&>svg]:size-4 py-(--spacing-1_5) inline-flex text-color-content-default
`;

const hintClasses = `
  text-color-content-subtle text-xs
`;

const errorClasses = `
  text-color-content-utility-danger-subtle text-xs mt-1 inline-flex gap-2 pl-1
`;

const invalidStateClasses = `
  data-[invalid=true]:[&_[data-slot=textarea]]:border-comp-form-color-border-utility-danger
`;

type NativeTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface TextareaProps extends Omit<NativeTextareaProps, 'children' | 'className' | 'id'> {
  label?: string;
  ariaLabel?: string;
  hint?: string;
  error?: string;
  info?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
}

type TextareaElement = HTMLFieldSetElement;

export const Textarea = React.forwardRef<TextareaElement, TextareaProps>(
  (
    { label, ariaLabel, hint, error, info, startIcon, endIcon, disabled = false, ...textareaRest },
    ref
  ) => {
    const trimmedLabel = label?.trim();
    const trimmedAriaLabel = ariaLabel?.trim();
    const trimmedHint = hint?.trim();
    const trimmedError = error?.trim();
    const trimmedInfo = info?.trim();

    const fieldsetId = React.useId();
    const textareaId = `${fieldsetId}-textarea`;
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

    const { 'aria-describedby': textareaAriaDescribedBy, ...nativeTextareaRest } = textareaRest;

    const describedBy = mergeDescribedBy(
      textareaAriaDescribedBy,
      [
        isInfoOpen && infoContentId ? infoContentId : undefined,
        showError ? errorId : showHint ? hintId : undefined
      ].filter((token): token is string => Boolean(token))
    );

    const fieldsetClassName = collapseWhitespace(composeClasses(baseClasses, invalidStateClasses));

    const labelClassName = collapseWhitespace(
      composeClasses(labelClasses, trimmedLabel ? undefined : 'sr-only')
    );
    const infoTriggerClassName = collapseWhitespace(composeClasses(infoTriggerClasses));
    const infoContentClassName = collapseWhitespace(composeClasses(infoContentClasses));
    const textareaRowClassName = collapseWhitespace(composeClasses(textareaRowClasses));
    const startIconClassName = collapseWhitespace(composeClasses(startIconClasses));
    const valueClassName = collapseWhitespace(composeClasses(valueClasses));
    const endIconClassName = collapseWhitespace(composeClasses(endIconClasses));
    const hintClassName = collapseWhitespace(composeClasses(hintClasses));
    const errorClassName = collapseWhitespace(composeClasses(errorClasses));

    const textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
      ...nativeTextareaRest,
      className: valueClassName,
      disabled,
      id: textareaId,
      'aria-describedby': describedBy
    };

    if (!trimmedLabel && trimmedAriaLabel) {
      textareaProps['aria-label'] = trimmedAriaLabel;
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
        <Label.Root className={labelClassName} data-slot="label" htmlFor={textareaId}>
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

        <div className={textareaRowClassName} data-slot="textarea">
          {startIcon ? (
            <span className={startIconClassName} data-slot="startIcon" aria-hidden="true">
              {startIcon}
            </span>
          ) : null}
          <textarea {...textareaProps} data-slot="value" />
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

Textarea.displayName = 'Textarea';
