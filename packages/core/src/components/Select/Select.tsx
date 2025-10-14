import * as React from 'react';
import { Select as RadixSelect } from 'radix-ui';
import { Input, type InputProps } from '../Input';
import { MenuItem, type MenuItemProps } from '../MenuItem';
import { KeyboardArrowDownIcon } from '../../icons';
import { collapseWhitespace, composeClasses } from '../..//utilities';

type SelectElement = React.ComponentRef<typeof Input>;
type SelectRootProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Root>;
type SelectInputProps = Omit<InputProps, 'startIcon'>;

export interface SelectProps
  extends Omit<SelectRootProps, 'dir' | 'required' | 'disabled' | 'children'> {
  disabled?: boolean;
  InputProps?: SelectInputProps;
  options?: Array<MenuItemProps & { option: string }>;
}

const viewportClasses = `border rounded-lg -ml-[7px] !overflow-x-visible border-color-border-subtle bg-color-background-default`;
const triggerClasses = `[&_input]:cursor-default`;

export const Select = React.forwardRef<SelectElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onOpenChange,
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

    const viewportClassName = collapseWhitespace(composeClasses(viewportClasses));
    const triggerClassName = collapseWhitespace(composeClasses(triggerClasses));

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
        onValueChange={handleValueChange}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger asChild>
          <Input ref={ref} className={triggerClassName} {...preparedInputProps} />
        </RadixSelect.Trigger>
        {options.length === 0 ? null : (
          <RadixSelect.Portal>
            <RadixSelect.Content
              position="popper"
              side="bottom"
              align="start"
              sideOffset={6}
              onCloseAutoFocus={e => e.preventDefault()}
              style={{
                maxHeight: 'var(--radix-select-content-available-height)',
                width: 'calc(var(--radix-select-trigger-width) + 31px)'
              }}
            >
              <RadixSelect.ScrollUpButton />
              <RadixSelect.Viewport className={viewportClassName}>
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
