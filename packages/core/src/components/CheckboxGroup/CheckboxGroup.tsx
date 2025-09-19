// packages/core/src/components/CheckboxGroup/CheckboxGroup.tsx
import * as React from 'react';
import { Popover } from 'radix-ui';
import { InfoCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { mergeDescribedBy } from '../../utilities/mergeDescribedBy/mergeDescribedBy';
import { Checkbox } from '../Checkbox';

const baseClasses = `
  inline-flex flex-col gap-8
`;

const labelClasses = `
  text-color-content-default text-xs uppercase
`;

const hintClasses = `
  text-color-content-subtle text-xs
`;

const choicesClasses = `
  flex flex-col gap-4
`;

const errorClasses = `
  text-color-danger-subtle text-xs
`;

type CheckboxChoice = {
  label: string;
  value?: string;
  id?: string;
};

type FieldsetProps = React.ComponentPropsWithoutRef<'fieldset'>;

export interface CheckboxGroupProps
  extends Omit<FieldsetProps, 'children' | 'defaultValue' | 'value'> {
  label?: string;
  ariaLabel?: string;
  hint?: string;
  info?: string;
  error?: string;
  name?: string;
  choices: ReadonlyArray<CheckboxChoice>;
  onCheckedChange?: (values: string[]) => void;
}

export const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>((
  {
    label,
    ariaLabel,
    hint,
    info,
    error,
    name,
    choices,
    onCheckedChange: onGroupCheckedChange,
    className,
    id: idProp,
    ...rest
  },
  ref
) => {
  const trimmedLabel = label?.trim();
  const trimmedAriaLabel = ariaLabel?.trim();

  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const generatedId = React.useId();
  const fieldsetId = idProp ?? generatedId;
  const hintId = hint && hint.trim().length > 0 ? `${fieldsetId}-hint` : undefined;
  const errorId = error && error.trim().length > 0 ? `${fieldsetId}-error` : undefined;
  const { 'aria-describedby': ariaDescribedBy, ...fieldsetProps } = rest;
  const describedBy = mergeDescribedBy(
    ariaDescribedBy,
    [hintId, errorId].filter((token): token is string => Boolean(token))
  );

  const fieldsetClassName = collapseWhitespace(composeClasses(baseClasses, className));
  const legendClassName = collapseWhitespace(
    composeClasses(labelClasses, trimmedLabel ? undefined : 'sr-only')
  );
  const hintClassName = collapseWhitespace(composeClasses(hintClasses));
  const choicesClassName = collapseWhitespace(composeClasses(choicesClasses));
  const errorClassName = collapseWhitespace(composeClasses(errorClasses));

  const handleToggle = React.useCallback(
    (value: string, next: boolean) => {
      setSelectedValues((prev) => {
        let nextSelected: string[];

        if (next) {
          if (prev.includes(value)) {
            nextSelected = prev;
          } else {
            nextSelected = [...prev, value];
          }
        } else {
          nextSelected = prev.filter((item) => item !== value);
        }

        if (nextSelected !== prev) {
          onGroupCheckedChange?.(nextSelected);
        }

        return nextSelected;
      });
    },
    [onGroupCheckedChange]
  );

  return (
    <fieldset
      {...fieldsetProps}
      id={fieldsetId}
      className={fieldsetClassName}
      aria-describedby={describedBy}
      ref={ref}
    >
      <legend className={legendClassName} data-slot="label">
        {trimmedLabel ?? trimmedAriaLabel}
        {trimmedLabel && info ? (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                aria-label="More info"
                className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-color-content-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2"
              >
                <InfoCircledIcon aria-hidden="true" />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content side="top" sideOffset={8} className="max-w-xs rounded-md bg-color-background-default p-3 text-sm text-color-content-default shadow-lg">
                {info}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ) : null}
      </legend>

      {hintId ? (
        <div className={hintClassName} id={hintId} data-slot="hint">
          {hint}
        </div>
      ) : null}

      <div className={choicesClassName} data-slot="choices">
        {choices.map((choice, index) => {
          const trimmedChoiceLabel = choice.label;
          const computedValue = (choice.value ?? choice.label).trim();
          const checkboxId = choice.id ?? `${fieldsetId}-choice-${index}`;
          const isChecked = selectedValues.includes(computedValue);

          return (
            <Checkbox
              key={checkboxId}
              id={checkboxId}
              label={trimmedChoiceLabel}
              value={computedValue}
              name={name}
              checked={isChecked}
              onCheckedChange={(next) => handleToggle(computedValue, next === true)}
            />
          );
        })}
      </div>

      {errorId ? (
        <div className={errorClassName} id={errorId} data-slot="error">
          <span className="inline-flex items-center gap-1">
            <ExclamationTriangleIcon aria-hidden="true" />
          </span>
          <span>{error}</span>
        </div>
      ) : null}
    </fieldset>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';
