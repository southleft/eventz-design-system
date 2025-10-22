import * as React from 'react';
import { Popover } from 'radix-ui';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { CloseIcon } from '../../icons';
import { FormElement, type FormElementProps } from '../FormElement';
import { MenuItem } from '../MenuItem';

const baseClasses = `
  relative inline-block w-full
`;

const panelClasses = `
  mt-1 w-full rounded-md border bg-comp-combobox-popover-color-background-default
  border-comp-combobox-popover-color-border-default shadow p-1 z-50
`;

const emptyClasses = `
  text-color-content-subtle text-xs px-2 py-1.5
`;

const clearAllClasses = `
  inline-flex items-center justify-center rounded-full h-20 w-20 border-0
  bg-background-none text-color-content-default hover:bg-color-background-default-hover
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring
  focus-visible:ring-offset-2 focus-visible:ring-offset-color-background-default transition-opacity
  opacity-0
`;

const chipsContainerClasses = `
  flex flex-wrap items-center gap-1 py-0.5
`;

const chipClasses = `
  inline-flex items-center gap-1 rounded-xs border border-color-border-subtle
  bg-color-background-default-subtle text-color-content-default text-xs font-medium leading-[18px]
  px-2 h-24 transition-colors hover:bg-color-background-default-hover
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring
  focus-visible:ring-offset-[-4px]
`;

const chipDismissClasses = `
  inline-flex items-center justify-center rounded-full h-16 w-16 shrink-0
  hover:bg-color-background-default-hover focus-visible:ring-2
  focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2
  focus-visible:ring-offset-color-background-default
`;

const startIconClasses = `
  shrink-0 [&>svg]:size-4 py-(--spacing-1_5) inline-flex text-color-content-default
`;

const endIconClasses = `
  shrink-0 [&>svg]:size-4 py-(--spacing-1_5) inline-flex text-color-content-default
`;

const inputClasses = `
  min-w-0 flex-1 bg-transparent outline-none border-0 text-color-content-default
  placeholder:text-color-content-subtle focus:placeholder:opacity-0
  caret-transparent select-none
`;

const fieldWrapperClasses = `
  flex flex-wrap items-center gap-1 w-full
`;

const openStateClasses = `
  data-[open=true]:block data-[open=false]:hidden
`;

const disabledStateClasses = `
  data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50
`;

const hasSelectionStateClasses = `
  data-[has-selection=true]:[&_button[data-role=clear-all]]:opacity-100
  data-[has-selection=true]:[&_[data-slot=clearAll]]:opacity-100
`;

type ComboboxMenuItemType = 'simple' | 'complex';

interface ComboboxOption {
  id: string;
  option: string;
  supportingText?: string;
  startIcon?: React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  mediaIcon?: React.ReactNode;
  ariaLabel?: string;
}

type FormElementPassthroughProps = Omit<FormElementProps, 'children'>;

type ComboboxFieldProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  chips: React.ReactNode;
  clearAll?: React.ReactNode;
  chipsClassName: string;
  startIconClassName: string;
  endIconClassName: string;
  inputClassName: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef: (node: HTMLInputElement | null) => void;
};

const ComboboxField = React.forwardRef<HTMLDivElement, ComboboxFieldProps>(
  (
    {
      startIcon,
      endIcon,
      chips,
      clearAll,
      chipsClassName,
      startIconClassName,
      endIconClassName,
      inputClassName,
      inputProps,
      inputRef,
      className,
      disabled,
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

    const wrapperClassName = collapseWhitespace(composeClasses(fieldWrapperClasses, className));

    const resolvedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      ...inputProps,
      id,
      disabled,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid
    };

    return (
      <div {...restSlotProps} ref={ref} className={wrapperClassName}>
        {startIcon ? (
          <span className={startIconClassName} data-slot="startIcon" aria-hidden="true">
            {startIcon}
          </span>
        ) : null}
        <div className={chipsClassName} data-slot="chips">
          {chips}
        </div>
        {clearAll}
        <input
          {...resolvedInputProps}
          ref={inputRef}
          className={inputClassName}
          data-slot="input"
        />
        {endIcon ? (
          <span className={endIconClassName} data-slot="endIcon" aria-hidden="true">
            {endIcon}
          </span>
        ) : null}
      </div>
    );
  }
);

ComboboxField.displayName = 'ComboboxField';

export interface ComboboxProps {
  menuItemType?: ComboboxMenuItemType;
  startIcon?: React.ReactNode;
  showEndIcon?: boolean;
  endIcon?: React.ReactNode;
  placeholder?: string;
  items?: ComboboxOption[];
  menuItemBorderBottom?: boolean;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  FormElementProps?: FormElementPassthroughProps;
}

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      menuItemType = 'simple',
      startIcon,
      showEndIcon = false,
      endIcon,
      placeholder,
      items: itemsProp,
      menuItemBorderBottom,
      selectedIds: selectedIdsProp,
      defaultSelectedIds = [],
      onSelectionChange,
      defaultOpen = false,
      disabled = false,
      FormElementProps: formElementProps
    },
    forwardedRef
  ) => {
    const items = React.useMemo(() => itemsProp ?? [], [itemsProp]);
    const memoizedDefaultSelectedIds = React.useMemo(
      () => defaultSelectedIds ?? [],
      [defaultSelectedIds]
    );
    const memoizedControlledSelectedIds = React.useMemo(
      () => selectedIdsProp ?? [],
      [selectedIdsProp]
    );

    const isSelectionControlled = selectedIdsProp !== undefined;
    const [internalSelectedIds, setInternalSelectedIds] = React.useState<string[]>(
      memoizedDefaultSelectedIds
    );

    React.useEffect(() => {
      if (!isSelectionControlled) {
        setInternalSelectedIds(memoizedDefaultSelectedIds);
      }
    }, [memoizedDefaultSelectedIds, isSelectionControlled]);

    const selectedIds = isSelectionControlled ? memoizedControlledSelectedIds : internalSelectedIds;
    const selectedIdsSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);

    const itemsById = React.useMemo(() => {
      const map = new Map<string, ComboboxOption>();
      for (const item of items) {
        map.set(item.id, item);
      }
      return map;
    }, [items]);

    const selectedItems = React.useMemo(
      () =>
        selectedIds
          .map(id => itemsById.get(id))
          .filter((item): item is ComboboxOption => Boolean(item)),
      [itemsById, selectedIds]
    );

    const hasSelection = selectedItems.length > 0;

    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    const updateSelection = React.useCallback(
      (nextSelected: string[]) => {
        if (!isSelectionControlled) {
          setInternalSelectedIds(nextSelected);
        }
        onSelectionChange?.(nextSelected);
      },
      [isSelectionControlled, onSelectionChange]
    );

    const handleToggleSelection = React.useCallback(
      (id: string) => {
        if (disabled) {
          return;
        }

        const nextSelected = selectedIdsSet.has(id)
          ? selectedIds.filter(existingId => existingId !== id)
          : [...selectedIds, id];

        updateSelection(nextSelected);
      },
      [disabled, selectedIds, selectedIdsSet, updateSelection]
    );

    const handleRemoveSelection = React.useCallback(
      (id: string) => {
        if (disabled || !selectedIdsSet.has(id)) {
          return;
        }
        updateSelection(selectedIds.filter(existingId => existingId !== id));
      },
      [disabled, selectedIds, selectedIdsSet, updateSelection]
    );

    const handleClearAll = React.useCallback(() => {
      if (disabled || !hasSelection) {
        return;
      }
      updateSelection([]);
    }, [disabled, hasSelection, updateSelection]);

    const requestOpen = React.useCallback(() => {
      if (disabled) {
        return;
      }
      setInternalOpen(prev => (prev ? prev : true));
    }, [disabled]);

    const requestClose = React.useCallback(() => {
      setInternalOpen(prev => (prev ? false : prev));
    }, []);

    const listboxBaseId = React.useId();
    const listboxId = `${listboxBaseId}-listbox`;


    const inputPlaceholder = hasSelection ? undefined : placeholder;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      type: 'text',
      role: 'combobox',
      'aria-expanded': internalOpen,
      'aria-haspopup': 'listbox',
      'aria-autocomplete': 'none',
      'aria-controls': listboxId,
      readOnly: true,
      value: '',
      placeholder: inputPlaceholder,
      onClick: () => {
        requestOpen();
      }
    };

    const menuItemClasses = `w-full`;
    const menuItemClassName = collapseWhitespace(composeClasses(menuItemClasses));

    const rootClassName = collapseWhitespace(
      composeClasses(baseClasses, disabledStateClasses, hasSelectionStateClasses)
    );
    const panelClassName = collapseWhitespace(composeClasses(panelClasses, openStateClasses));
    const emptyClassName = collapseWhitespace(composeClasses(emptyClasses));
    const clearAllClassName = collapseWhitespace(composeClasses(clearAllClasses));
    const chipsClassName = collapseWhitespace(composeClasses(chipsContainerClasses));
    const chipClassName = collapseWhitespace(composeClasses(chipClasses));
    const chipDismissClassName = collapseWhitespace(composeClasses(chipDismissClasses));
    const startIconClassName = collapseWhitespace(composeClasses(startIconClasses));
    const endIconClassName = collapseWhitespace(composeClasses(endIconClasses));
    const inputClassName = collapseWhitespace(composeClasses(inputClasses));

    const resolvedBorderBottom =
      menuItemBorderBottom !== undefined ? menuItemBorderBottom : menuItemType === 'simple';

    const clearAllButton =
      showEndIcon && hasSelection ? (
        <button
          type="button"
          className={clearAllClassName}
          data-slot="clearAll"
          data-role="clear-all"
          aria-label="Clear all selections"
          tabIndex={-1}
          onMouseDown={event => {
            event.preventDefault();
          }}
          onClick={() => {
            handleClearAll();
            inputRef.current?.focus();
          }}
          disabled={disabled}
        >
          {(endIcon ?? <CloseIcon aria-hidden="true" />) as React.ReactNode}
        </button>
      ) : null;

    const chipsMarkup = selectedItems.map(item => {
      const optionLabel = item.option;
      return (
        <span key={item.id} className={chipClassName} data-slot="chip">
          <span>{optionLabel}</span>
          <button
            type="button"
            className={chipDismissClassName}
            data-slot="chipDismiss"
            aria-label={`Remove ${optionLabel}`}
            tabIndex={-1}
            onMouseDown={event => {
              event.preventDefault();
            }}
            onClick={() => {
              handleRemoveSelection(item.id);
              inputRef.current?.focus();
            }}
            disabled={disabled}
          >
            <CloseIcon aria-hidden="true" />
          </button>
        </span>
      );
    });

    const endIconSpan =
      showEndIcon && !hasSelection
        ? ((endIcon ?? <CloseIcon aria-hidden="true" />) as React.ReactNode)
        : null;


    return (
      <div
        className={rootClassName}
        data-disabled={disabled ? 'true' : undefined}
        data-has-selection={hasSelection ? 'true' : undefined}
      >
        <Popover.Root open={internalOpen} onOpenChange={setInternalOpen}>
          <Popover.Anchor asChild>
            <div data-slot="anchor">
              <FormElement {...(formElementProps ?? {})} disabled={disabled} asChild>
                <ComboboxField
                  startIcon={startIcon}
                  chips={chipsMarkup}
                  clearAll={clearAllButton}
                  chipsClassName={chipsClassName}
                  startIconClassName={startIconClassName}
                  endIcon={endIconSpan}
                  endIconClassName={endIconClassName}
                  inputClassName={inputClassName}
                  inputProps={inputProps}
                  inputRef={handleInputRef}
                  data-disabled={disabled ? 'true' : undefined}
                />
              </FormElement>
            </div>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              forceMount
              id={listboxId}
              role="listbox"
              aria-multiselectable="true"
              className={panelClassName}
              data-slot="panel"
              data-open={internalOpen ? 'true' : 'false'}
              side="bottom"
              align="start"
              sideOffset={4}
              onOpenAutoFocus={event => {
                event.preventDefault();
              }}
              onCloseAutoFocus={event => {
                event.preventDefault();
                inputRef.current?.focus();
              }}
              onPointerDownOutside={() => {
                requestClose();
              }}
            >
              {items.length === 0 ? (
                <div className={emptyClassName} data-slot="empty" role="presentation">
                  No options available
                </div>
              ) : (
                items.map(item => {
                  const optionId = `${listboxId}-option-${item.id}`;
                  const isSelected = selectedIdsSet.has(item.id);
                  return (
                    <MenuItem
                      key={item.id}
                      id={optionId}
                      data-slot="menuItem"
                      className={menuItemClassName}
                      role="option"
                      aria-selected={isSelected}
                      option={item.option}
                      supportingText={item.supportingText}
                      startIcon={item.startIcon}
                      imgSrc={item.imgSrc}
                      imgAlt={item.imgAlt}
                      mediaIcon={item.mediaIcon}
                      ariaLabel={item.ariaLabel}
                      type={menuItemType}
                      borderBottom={resolvedBorderBottom}
                      isSelected={isSelected}
                      disabled={disabled}
                      onMouseDown={event => {
                        event.preventDefault();
                      }}
                      onClick={() => {
                        handleToggleSelection(item.id);
                        inputRef.current?.focus();
                      }}
                    />
                  );
                })
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
