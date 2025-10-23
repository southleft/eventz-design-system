'use client';

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

const anchorClasses = `relative inline-block`;

const panelClasses = `
  rounded-md border border-color-border-subtle z-50 overflow-hidden ml-[14px] -mt-[28px]
  border-color-border-subtle bg-color-background-default content-center

`;

const emptyClasses = `
  text-color-content-subtle text-xs px-2 py-1.5
`;

const clearAllClasses = `
  inline-flex items-center justify-center rounded-full border-0 bg-background-none text-color-content-default
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring
  focus-visible:ring-offset-2 focus-visible:ring-offset-color-background-default transition-opacity
  opacity-0
`;

const chipsContainerClasses = `
  flex flex-wrap items-center gap-1 py-0.5
`;

const chipClasses = `
  inline-flex items-center gap-1 rounded-xs border-0 text-xs font-medium leading-[18px]
  bg-color-background-brand hover:bg-color-background-brand-hover text-color-content-inverse
  px-2 h-22 transition-colors group
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring
  focus-visible:ring-offset-[-4px]
`;

const chipDismissClasses = `
  inline-flex items-center justify-center rounded-full h-20 w-20 shrink-0 border-0
  bg-color-background-brand group-hover:bg-color-background-brand-hover text-color-content-inverse
  focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2
  focus-visible:ring-offset-color-background-default
`;

const startIconClasses = `
  shrink-0 py-(--spacing-1_5) inline-flex text-color-content-default
`;

const endIconClasses = `
  shrink-0 py-(--spacing-1_5) inline-flex text-color-content-default
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

const EMPTY_ITEMS: ComboboxOption[] = [];

export function resolveClearedSelection(disabled: boolean, hasSelection: boolean): boolean {
  return !disabled && hasSelection;
}

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

export function Combobox({
  menuItemType = 'simple',
  startIcon,
  showEndIcon = false,
  endIcon,
  placeholder,
  items: itemsProp,
  menuItemBorderBottom,
  selectedIds: selectedIdsProp,
  defaultSelectedIds: defaultSelectedIdsProp,
  onSelectionChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  FormElementProps: formElementProps
}: ComboboxProps) {
  const items = itemsProp ?? EMPTY_ITEMS;
  const initialSelectedRef = React.useRef<string[]>(defaultSelectedIdsProp ?? []);

  const isSelectionControlled = selectedIdsProp !== undefined;
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<string[]>(
    initialSelectedRef.current
  );

  const selectedIds = React.useMemo<string[]>(() => {
    if (isSelectionControlled && selectedIdsProp) {
      return selectedIdsProp;
    }
    return internalSelectedIds;
  }, [isSelectionControlled, selectedIdsProp, internalSelectedIds]);
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

  const isOpenControlled = openProp !== undefined;
  const open = isOpenControlled ? openProp : internalOpen;

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const ignoreNextFocusOutsideRef = React.useRef(false);
  const prevOpenRef = React.useRef(false);

  const handleInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
  }, []);

  React.useEffect(() => {
    if (!prevOpenRef.current && open) {
      ignoreNextFocusOutsideRef.current = true;
    }
    prevOpenRef.current = open;
  }, [open]);

  const updateSelection = React.useCallback(
    (nextSelected: string[]) => {
      if (!isSelectionControlled) {
        setInternalSelectedIds(nextSelected);
      }
      if (onSelectionChange) {
        onSelectionChange(nextSelected);
      }
    },
    [isSelectionControlled, onSelectionChange]
  );

  const handleToggleSelection = React.useCallback(
    (id: string) => {
      const nextSelected = selectedIdsSet.has(id)
        ? selectedIds.filter(existingId => existingId !== id)
        : [...selectedIds, id];

      updateSelection(nextSelected);
    },
    [selectedIds, selectedIdsSet, updateSelection]
  );

  const handleRemoveSelection = React.useCallback(
    (id: string) => {
      // Always compute the next selection by filtering out the id.
      // If the id is not present, this yields the same array contents.
      const next = selectedIds.filter(existingId => existingId !== id);
      updateSelection(next);
    },
    [selectedIds, updateSelection]
  );

  const handleClearAll = React.useCallback(() => {
    updateSelection([]);
  }, [updateSelection]);

  const requestOpen = React.useCallback(() => {
    if (isOpenControlled) {
      onOpenChange?.(true);
      return;
    }
    setInternalOpen(true);
  }, [isOpenControlled, onOpenChange]);

  const requestClose = React.useCallback(() => {
    if (isOpenControlled) {
      onOpenChange!(false);
      return;
    }
    setInternalOpen(false);
  }, [isOpenControlled, onOpenChange]);

  const listboxBaseId = React.useId();
  const listboxId = `${listboxBaseId}-listbox`;

  const inputPlaceholder = hasSelection ? undefined : placeholder;

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    type: 'text',
    role: 'combobox',
    'aria-expanded': open,
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
  const anchorClassName = collapseWhitespace(composeClasses(anchorClasses));

  const resolvedBorderBottom =
    menuItemBorderBottom !== undefined ? menuItemBorderBottom : menuItemType === 'simple';

  const resolvedEndIcon = endIcon ?? <CloseIcon aria-hidden="true" />;
  const endIconSpan = showEndIcon && !hasSelection ? resolvedEndIcon : null;

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
          inputRef.current!.focus();
        }}
        disabled={disabled}
      >
        {resolvedEndIcon}
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
            inputRef.current!.focus();
          }}
          disabled={disabled}
        >
          <CloseIcon aria-hidden="true" />
        </button>
      </span>
    );
  });

  return (
    <div
      className={rootClassName}
      data-disabled={disabled ? 'true' : undefined}
      data-has-selection={hasSelection ? 'true' : undefined}
    >
      <Popover.Root open={open} defaultOpen={defaultOpen}>
        <Popover.Anchor asChild>
          <div className={anchorClassName} data-slot="anchor">
            <FormElement {...formElementProps} disabled={disabled} asChild>
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
            style={{
              width: 'calc(var(--radix-popper-anchor-width) - var(--portal-extra-width))'
            }}
            data-slot="panel"
            data-open={open ? 'true' : 'false'}
            side="bottom"
            align="start"
            sideOffset={4}
            onOpenAutoFocus={event => {
              event.preventDefault();
            }}
            onCloseAutoFocus={event => {
              event.preventDefault();
            }}
            onPointerDownOutside={() => requestClose()}
            onFocusOutside={() => {
              if (ignoreNextFocusOutsideRef.current) {
                ignoreNextFocusOutsideRef.current = false;
                return;
              }
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

Combobox.displayName = 'Combobox';
