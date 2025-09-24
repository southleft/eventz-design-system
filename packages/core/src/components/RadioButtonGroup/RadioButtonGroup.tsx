// packages/core/src/components/RadioButtonGroup/RadioButtonGroup.tsx
import * as React from 'react';
import { RadioGroup, Popover } from 'radix-ui';
import { InfoCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { mergeDescribedBy } from '../../utilities/mergeDescribedBy/mergeDescribedBy';

const baseClasses = `
  inline-flex flex-col gap-1 border-none py-8
`;

const labelClasses = `
  inline-flex items-center gap-1 text-color-content-default text-xs uppercase
`;

const infoTriggerClasses = `
  inline-flex items-center border-none bg-background-none text-color-content-subtle
  focus:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2
`;

const infoContentClasses = `
  max-w-xs rounded-md bg-color-content-default p-3 text-sm shadow-lg
`;

const hintClasses = `
  text-color-content-subtle text-xs -mt-8
`;

const groupClasses = `
  flex flex-col gap-3
`;

const choiceClasses = `inline-flex items-start gap-2 select-none`;

const choiceWrapperClasses = ``;

const controlClasses = `
  flex flex-col gap-3 items-center justify-center size-4 shrink-0 rounded-full border
  border-color-border-default bg-background-default focus:outline-none
  focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2
`;

const indicatorClasses = `
  pointer-events-none block size-2 rounded-full bg-color-content-brand
`;

const choiceLabelClasses = `
  text-color-content-default text-sm select-none
`;

const choiceHintClasses = `
  text-color-content-subtle text-xs
`;

const errorClasses = `
  text-color-content-utility-danger-subtle text-xs mt-1 inline-flex items-start gap-2 pl-1
`;

type RadioGroupRootProps = React.ComponentPropsWithoutRef<typeof RadioGroup.Root>;

type RadioButtonChoice = {
  value: string;
  label?: string;
  disabled?: boolean;
  hint?: string;
};

export interface RadioButtonGroupProps extends Omit<RadioGroupRootProps, 'children'> {
  choices: ReadonlyArray<RadioButtonChoice>;
  label?: string;
  ariaLabel?: string;
  hint?: string;
  info?: string;
  error?: string;
}

export const RadioButtonGroup = React.forwardRef<HTMLFieldSetElement, RadioButtonGroupProps>(
  ({ choices, label, ariaLabel, hint, info, error, className, id: idProp, ...restProps }, ref) => {
    const trimmedLabel = label?.trim();
    const trimmedAriaLabel = ariaLabel?.trim();
    const trimmedHint = hint?.trim();
    const trimmedInfo = info?.trim();
    const trimmedError = error?.trim();

    if (!trimmedLabel && !trimmedAriaLabel) {
      throw new Error('RadioButtonGroup requires a non-empty label or ariaLabel.');
    }

    const generatedId = React.useId();
    const fieldsetId = idProp ?? generatedId;
    const hintId = trimmedHint ? `${fieldsetId}-hint` : undefined;
    const errorId = trimmedError ? `${fieldsetId}-error` : undefined;
    const hasError = Boolean(trimmedError);

    const { 'aria-describedby': fieldsetAriaDescribedBy, ...rootProps } = restProps;

    const describedBy = mergeDescribedBy(
      fieldsetAriaDescribedBy,
      [hintId, errorId].filter((token): token is string => Boolean(token))
    );

    const fieldsetClassName = collapseWhitespace(composeClasses(baseClasses, className));
    const legendClassName = collapseWhitespace(
      composeClasses(labelClasses, trimmedLabel ? undefined : 'sr-only')
    );
    const infoTriggerClassName = collapseWhitespace(composeClasses(infoTriggerClasses));
    const infoContentClassName = collapseWhitespace(composeClasses(infoContentClasses));
    const hintClassName = collapseWhitespace(composeClasses(hintClasses));
    const groupClassName = collapseWhitespace(composeClasses(groupClasses));
    const choiceClassName = collapseWhitespace(composeClasses(choiceClasses));
    const choiceWrapperClassName = collapseWhitespace(composeClasses(choiceWrapperClasses));
    const controlClassName = collapseWhitespace(composeClasses(controlClasses));
    const indicatorClassName = collapseWhitespace(composeClasses(indicatorClasses));
    const choiceLabelClassName = collapseWhitespace(composeClasses(choiceLabelClasses));
    const choiceHintClassName = collapseWhitespace(composeClasses(choiceHintClasses));
    const errorClassName = collapseWhitespace(composeClasses(errorClasses));

    type RadioGroupEnhancements = {
      'aria-describedby': string | undefined;
      'aria-invalid': true | undefined;
      'data-slot': string;
    };

    const radioGroupProps: RadioGroupRootProps & RadioGroupEnhancements = {
      ...(rootProps as RadioGroupRootProps),
      'aria-describedby': describedBy,
      'aria-invalid': hasError ? true : undefined,
      'data-slot': 'radiogroup'
    };

    return (
      <fieldset
        id={fieldsetId}
        ref={ref}
        className={fieldsetClassName}
        data-has-error={hasError ? 'true' : undefined}
      >
        <legend className={legendClassName} data-slot="label">
          {trimmedLabel ?? trimmedAriaLabel}
          {trimmedLabel && trimmedInfo ? (
            <Popover.Root>
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
                >
                  {trimmedInfo}
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          ) : null}
        </legend>

        {hintId ? (
          <div className={hintClassName} id={hintId} data-slot="hint">
            {trimmedHint}
          </div>
        ) : null}

        <RadioGroup.Root className={groupClassName} {...radioGroupProps} data-slot="choices">
          {choices.map(choice => {
            const controlId = `${fieldsetId}-choice-${choice.value}`;
            const choiceLabelText = choice.label?.trim() || choice.value.trim();
            const trimmedChoiceHint = choice.hint?.trim();
            const choiceHintId = trimmedChoiceHint ? `${controlId}-hint` : undefined;

            return (
              <div key={controlId} className={choiceWrapperClassName}>
                <div className={choiceClassName}>
                  <RadioGroup.Item
                    id={controlId}
                    value={choice.value}
                    className={controlClassName}
                    disabled={Boolean(choice.disabled)}
                    aria-describedby={choiceHintId}
                    data-slot="control"
                  >
                    <RadioGroup.Indicator
                      className={indicatorClassName}
                      data-slot="indicator"
                      aria-hidden="true"
                    />
                  </RadioGroup.Item>
                  <div>
                    <label
                      className={choiceLabelClassName}
                      data-slot="choiceLabel"
                      htmlFor={controlId}
                    >
                      {choiceLabelText}
                    </label>
                    {choiceHintId && (
                      <div className={choiceHintClassName} data-slot="choiceHint" id={choiceHintId}>
                        {trimmedChoiceHint}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </RadioGroup.Root>

        {errorId ? (
          <div className={errorClassName} id={errorId} data-slot="error">
            <span className="inline-flex items-center gap-1">
              <ExclamationTriangleIcon aria-hidden="true" />
            </span>
            <span>{trimmedError}</span>
          </div>
        ) : null}
      </fieldset>
    );
  }
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
