'use client';

// packages/core/src/components/Checkbox/Checkbox.tsx
import * as React from 'react';
import { Checkbox as RadixCheckbox } from 'radix-ui';
import { CheckIcon } from '@radix-ui/react-icons';
import { composeClasses } from '../../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../../utilities/collapseWhitespace/collapseWhitespace';
import { mergeDescribedBy } from '../../../utilities/mergeDescribedBy/mergeDescribedBy';

const containerClasses = `
  inline-flex items-start gap-2 select-none
`;

const controlClasses = `
  size-20
  bg-background-none
  border-2
  border-color-content-weak
  rounded-xs
  inline-flex
  justify-center
  items-center
  focus-visible:ring-2
  focus-visible:ring-comp-border-focus-ring
  focus-visible:ring-offset-2
`;

const indicatorClasses = `
  bg-color-content-brand
  border-color-content-brand
  border-[2.5px]
  h-16
  rounded-xs
  hover:bg-comp-checkbox-checked-color-background-hover
  active:bg-comp-checkbox-checked-color-background-active
  text-comp-checkbox-checked-color-icon-default
`;

const labelClasses = `
  text-color-content-default text-sm leading-tight
`;

const hintClasses = `
  text-color-content-subtle text-xs
`;

const disabledContainerClasses = `
  opacity-50 pointer-events-none
`;

type CheckboxRootElement = React.ElementRef<typeof RadixCheckbox.Root>;
type CheckboxRootProps = React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;

export interface CheckboxProps
  extends Omit<
    CheckboxRootProps,
    'children' | 'className' | 'checked' | 'disabled' | 'name' | 'required' | 'value'
  > {
  checked?: boolean;
  label: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  className?: string;
}

export const Checkbox = React.forwardRef<CheckboxRootElement, CheckboxProps>(
  (
    {
      checked,
      label,
      hint,
      disabled = false,
      required = false,
      name,
      value,
      className,
      id: idProp,
      ...rest
    },
    ref
  ) => {
    if (typeof label !== 'string' || label.trim().length === 0) {
      throw new Error('Checkbox label must be a non-empty string.');
    }

    const { 'aria-describedby': ariaDescribedBy, ...controlProps } = rest;
    const generatedId = React.useId();
    const controlId = idProp ?? generatedId;
    const hintId = hint ? `${controlId}-hint` : undefined;
    const describedBy = mergeDescribedBy(ariaDescribedBy, hintId);

    const containerClassName = collapseWhitespace(
      composeClasses(containerClasses, disabled ? disabledContainerClasses : undefined, className)
    );

    const controlClassName = collapseWhitespace(composeClasses(controlClasses));
    const indicatorClassName = collapseWhitespace(composeClasses(indicatorClasses));
    const labelClassName = collapseWhitespace(composeClasses(labelClasses));
    const hintClassName = collapseWhitespace(composeClasses(hintClasses));

    return (
      <div className={containerClassName} data-slot="container">
        <RadixCheckbox.Root
          {...controlProps}
          {...(checked !== undefined ? { checked } : {})}
          ref={ref}
          id={controlId}
          className={controlClassName}
          disabled={disabled}
          required={required}
          name={name}
          value={value}
          aria-describedby={describedBy}
          data-slot="control"
        >
          <RadixCheckbox.Indicator className={indicatorClassName} data-slot="indicator">
            <CheckIcon aria-hidden="true" />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <div>
          <label className={labelClassName} htmlFor={controlId} data-slot="label">
            {label}
          </label>
          {hint ? (
            <div className={hintClassName} id={hintId} data-slot="hint">
              {hint}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
