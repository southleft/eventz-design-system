'use client';

import * as React from 'react';
import { Label, Slot } from 'radix-ui';
import { ErrorIcon } from '../../icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { mergeDescribedBy } from '../../utilities/mergeDescribedBy/mergeDescribedBy';
import { InfoPopover } from '../InfoPopover';

type FieldsetProps = React.ComponentPropsWithoutRef<'fieldset'>;

/**
 * Shell-only wrapper that provides consistent label/info rendering, row chrome with focus ring,
 * and contextual messaging. Set `asChild=true` to let FormElement inject `id`, `aria-describedby`,
 * and `aria-label` (when needed) plus `disabled` into your control via Radix Slot. When `asChild`
 * remains false, the component renders a neutral `<div data-slot="value">` and does not wire the
 * consumer’s child; you are responsible for linking any accessible labels or descriptions.
 */
export interface FormElementProps extends Omit<FieldsetProps, 'children' | 'disabled'> {
  label?: string;
  ariaLabel?: string;
  hint?: string;
  error?: string;
  info?: string;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const baseClasses = `
  inline-flex border-none flex-col gap-1 disabled:opacity-50 disabled:pointer-events-none
`;

const labelClasses = `
  inline-flex gap-1 text-color-content-default text-xs uppercase
`;

const rowClasses = `
  inline-flex items-start gap-2 gap-y-1 rounded-lg px-(--spacing-1_5) text-color-content-default
  bg-comp-form-color-background-default border border-comp-form-color-border-default text-sm
  hover:bg-comp-form-color-background-hover hover:border-comp-form-color-hover
  [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-offset-4
  [&:has(:focus-visible)]:ring-comp-border-focus-ring
  [&:has(:focus-visible)]:ring-offset-color-background-default
`;

const hintClasses = `
  text-color-content-subtle text-xs
`;

const errorClasses = `
  text-color-content-utility-danger-subtle text-xs mt-1 inline-flex gap-2 items-center
`;

const disabledStateClasses = `
  data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none
`;

const invalidStateClasses = `
  data-[invalid=true]:[&_[data-slot=row]]:border-comp-form-color-border-utility-danger
`;

/**
 * FormElement arranges label + info content, a focus-ringed row, and hint/error messaging.
 * When `asChild=true`, it renders the value slot via Radix Slot to pass control attributes
 * (`id`, `aria-describedby`, `aria-label`, `disabled`) to the child. With `asChild=false`,
 * FormElement renders a neutral wrapper (no attribute injection) and the consumer must wire
 * their control manually.
 */
export const FormElement = React.forwardRef<HTMLFieldSetElement, FormElementProps>(
  (
    {
      label,
      ariaLabel,
      hint,
      error,
      info,
      disabled = false,
      asChild = false,
      className,
      children,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    const trimmedLabel = label?.trim();
    const trimmedAriaLabel = ariaLabel?.trim();
    const trimmedHint = hint?.trim();
    const trimmedError = error?.trim();
    const trimmedInfo = info?.trim();

    const generatedId = React.useId();
    const fieldsetId = idProp ?? generatedId;
    const labelId = `${fieldsetId}-label`;
    const controlId = `${fieldsetId}-control`;
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

    const describedBy = mergeDescribedBy(
      undefined,
      [
        showError ? errorId : showHint ? hintId : undefined,
        isInfoOpen && infoContentId ? infoContentId : undefined
      ].filter((token): token is string => Boolean(token))
    );

    const fieldsetClassName = collapseWhitespace(
      composeClasses(baseClasses, disabledStateClasses, invalidStateClasses, className)
    );
    const labelClassName = collapseWhitespace(
      composeClasses(labelClasses, trimmedLabel ? undefined : 'sr-only')
    );
    const rowClassName = collapseWhitespace(composeClasses(rowClasses));
    const hintClassName = collapseWhitespace(composeClasses(hintClasses));
    const errorClassName = collapseWhitespace(composeClasses(errorClasses));

    const infoAriaLabel = (() => {
      const source = trimmedLabel ?? trimmedAriaLabel;
      return source ? `${source} info` : undefined;
    })();

    const Comp: React.ElementType = asChild ? Slot.Root : 'div';

    const valueProps = {
      'data-slot': 'value',
      ...(asChild
        ? {
            id: controlId,
            'aria-label': trimmedLabel ? undefined : trimmedAriaLabel,
            'aria-describedby': describedBy,
            'aria-invalid': showError ? true : undefined,
            disabled
          }
        : {})
    };

    return (
      <fieldset
        {...rest}
        id={fieldsetId}
        ref={ref}
        className={fieldsetClassName}
        disabled={disabled}
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={showError ? 'true' : undefined}
      >
        <Label.Root
          id={labelId}
          className={labelClassName}
          data-slot="label"
          htmlFor={asChild ? controlId : undefined}
        >
          {trimmedLabel ?? trimmedAriaLabel ?? ''}
          {trimmedInfo && infoContentId && infoAriaLabel ? (
            <InfoPopover
              ariaLabel={infoAriaLabel}
              contentId={infoContentId}
              onOpenChange={setIsInfoOpen}
            >
              {trimmedInfo}
            </InfoPopover>
          ) : null}
        </Label.Root>

        <div className={rowClassName} data-slot="row">
          <Comp {...valueProps}>{children}</Comp>
        </div>

        {showError ? (
          <div className={errorClassName} id={errorId} data-slot="error" role="alert">
            <ErrorIcon aria-hidden="true" />
            {trimmedError}
          </div>
        ) : showHint ? (
          <div className={hintClassName} id={hintId} data-slot="hint">
            {trimmedHint}
          </div>
        ) : null}
      </fieldset>
    );
  }
);

FormElement.displayName = 'FormElement';
