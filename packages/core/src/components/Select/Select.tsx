import * as React from 'react';
import { Select as RadixSelect } from 'radix-ui';
import { Input, type InputProps } from '../Input';
import { MenuItem, type MenuItemProps } from '../MenuItem';
import { KeyboardArrowDownIcon } from '../../icons';
import { collapseWhitespace, composeClasses } from '../..//utilities';

type SelectElement = React.ComponentRef<typeof Input>;
type SelectRootProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Root>;

export interface SelectProps
  extends Omit<
    SelectRootProps,
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'open'
    | 'onOpenChange'
    | 'name'
    | 'disabled'
    | 'children'
  > {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  disabled?: boolean;
  InputProps?: InputProps;
  options?: Array<MenuItemProps & { option: string }>;
}

const inputClasses = `w-full`;

export const Select = React.forwardRef<SelectElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      open,
      onOpenChange,
      name,
      disabled = false,
      InputProps,
      options = [],
      ...restProps
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);

    React.useEffect(() => {
      if (!isControlled) {
        setInternalValue(defaultValue);
      }
    }, [defaultValue, isControlled]);

    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      if (onValueChange) {
        onValueChange(nextValue);
      }
    };

    const inputClassName = collapseWhitespace(composeClasses(inputClasses));

    const defaultInputProps = {
      endIcon: <KeyboardArrowDownIcon aria-hidden="true" />
    };

    const preparedInputProps = {
      ...defaultInputProps,
      ...InputProps,
      disabled,
      type: 'text',
      defaultValue: internalValue,
      readOnly: true
    };

    return (
      <RadixSelect.Root
        {...restProps}
        value={isControlled ? value : undefined}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        open={open}
        onOpenChange={onOpenChange}
        name={name}
        disabled={disabled}
      >
        <RadixSelect.Trigger asChild>
          <Input className={inputClassName} ref={ref} {...preparedInputProps} />
        </RadixSelect.Trigger>
        {options.length === 0 ? null : (
          <RadixSelect.Portal>
            <RadixSelect.Content
              position="popper"
              side="bottom"
              align="start"
              sideOffset={4}
              style={{ maxHeight: 'var(--radix-select-content-available-height)' }}
            >
              <RadixSelect.ScrollUpButton />
              <RadixSelect.Viewport>
                {options.map(optionItem => {
                  const { option, isSelected, ...restOptionProps } = optionItem;
                  const resolvedIsSelected = isSelected ?? currentValue === option;

                  return (
                    <RadixSelect.Item key={option} value={option} textValue={option} asChild>
                      <MenuItem
                        {...restOptionProps}
                        option={option}
                        isSelected={resolvedIsSelected}
                      />
                    </RadixSelect.Item>
                  );
                })}
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton />
            </RadixSelect.Content>
          </RadixSelect.Portal>
        )}
      </RadixSelect.Root>
    );
  }
);

Select.displayName = 'Select';
