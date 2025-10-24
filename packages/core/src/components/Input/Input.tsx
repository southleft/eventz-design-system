'use client';

import * as React from 'react';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { FormElement, type FormElementProps } from '../FormElement';

const inputRowClasses = ``;

const startIconClasses = `
  shrink-0 [&>svg]:size-4 py-(--spacing-1_5) inline-flex text-color-content-default
`;

const inputClasses = `
  grow bg-transparent outline-none text-color-content-default placeholder-color-content-weak border-none py-(--spacing-1_5) focus:placeholder:opacity-0
`;

const endIconClasses = `
  shrink-0 [&>svg]:size-4 py-(--spacing-1_5) inline-flex text-color-content-default
`;

const invalidStateClasses = `
  data-[invalid=true]:[&_[data-slot=input]]:border-comp-form-color-border-utility-danger
`;

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;
type FormElementWithoutChildren = Omit<FormElementProps, 'children'>;
type WrapperProps = Omit<
  FormElementProps,
  'children' | 'className' | 'asChild' | keyof NativeInputProps
>;

type InputFieldInputProps = NativeInputProps & {
  ref?: React.Ref<HTMLInputElement>;
};

type InputFieldProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startIconClassName: string;
  inputClassName: string;
  endIconClassName: string;
  inputProps: InputFieldInputProps;
};

const InputField = React.forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      startIcon,
      endIcon,
      startIconClassName,
      inputClassName,
      endIconClassName,
      inputProps,
      disabled,
      className,
      ...rest
    },
    ref
  ) => {
    const {
      id,
      ['aria-label']: ariaLabel,
      ['aria-describedby']: ariaDescribedBy,
      ['aria-invalid']: ariaInvalid,
      ...restSlotProps
    } = rest;

    const wrapperClassName = collapseWhitespace(composeClasses(inputRowClasses, className));

    const { ref: inputRef, ...restInputProps } = inputProps;

    const {
      ['aria-label']: consumerAriaLabel,
      ['aria-describedby']: consumerAriaDescribedBy,
      ['aria-invalid']: consumerAriaInvalid,
      ...otherInputProps
    } = restInputProps;

    const describedBy =
      [ariaDescribedBy, consumerAriaDescribedBy]
        .filter((value): value is string => Boolean(value))
        .join(' ') || undefined;

    const resolvedInputProps: NativeInputProps = {
      ...otherInputProps,
      id,
      disabled,
      'aria-label': ariaLabel ?? consumerAriaLabel,
      'aria-describedby': describedBy,
      'aria-invalid': ariaInvalid ?? consumerAriaInvalid
    };

    return (
      <div
        {...restSlotProps}
        ref={ref}
        className={wrapperClassName}
        data-slot="input"
        data-disabled={disabled ? 'true' : undefined}
        data-invalid={ariaInvalid ? 'true' : undefined}
      >
        {startIcon ? (
          <span className={startIconClassName} data-slot="startIcon" aria-hidden="true">
            {startIcon}
          </span>
        ) : null}
        <input {...resolvedInputProps} ref={inputRef} className={inputClassName} />
        {endIcon ? (
          <span className={endIconClassName} data-slot="endIcon" aria-hidden="true">
            {endIcon}
          </span>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export interface InputProps
  extends Omit<WrapperProps, 'id'>,
    Omit<NativeInputProps, 'children' | 'id'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { startIcon, endIcon, className, disabled = false, ...rest } = props;

  const { label, ariaLabel, hint, error, info, ...nativeRest } = rest;

  const formElementProps: FormElementWithoutChildren = {
    label,
    ariaLabel,
    hint,
    error,
    info,
    disabled
  };

  const nativeInputProps: NativeInputProps = {
    ...nativeRest,
    disabled
  };

  const inputRowClassName = collapseWhitespace(
    composeClasses(inputRowClasses, invalidStateClasses, className)
  );
  const startIconClassName = collapseWhitespace(composeClasses(startIconClasses));
  const inputClassName = collapseWhitespace(composeClasses(inputClasses));
  const endIconClassName = collapseWhitespace(composeClasses(endIconClasses));

  const inputPropsWithRef: InputFieldInputProps = {
    ...nativeInputProps,
    ref
  };

  return (
    <FormElement {...formElementProps} asChild>
      <InputField
        startIcon={startIcon}
        endIcon={endIcon}
        startIconClassName={startIconClassName}
        inputClassName={inputClassName}
        endIconClassName={endIconClassName}
        inputProps={inputPropsWithRef}
        className={inputRowClassName}
        disabled={disabled}
        data-disabled={disabled ? 'true' : undefined}
      />
    </FormElement>
  );
});

Input.displayName = 'Input';
