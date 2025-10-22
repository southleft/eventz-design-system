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
      open: openProp,
      defaultOpen = false,
      onOpenChange,
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

    const isOpenControlled = openProp !== undefined;
    const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen);

    React.useEffect(() => {
      if (!isOpenControlled) {
        setInternalOpen(defaultOpen);
      }
    }, [defaultOpen, isOpenControlled]);

    const effectiveOpen = isOpenControlled ? Boolean(openProp) : internalOpen;

    const updateOpenState = React.useCallback(
      (next: boolean) => {
        if (!isOpenControlled) {
          setInternalOpen(next);
        }
        onOpenChange?.(next);
      },
      [isOpenControlled, onOpenChange]
    );

    React.useEffect(() => {
      if (disabled && effectiveOpen) {
        updateOpenState(false);
      }
    }, [disabled, effectiveOpen, updateOpenState]);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const itemRefs = React.useRef<Array<HTMLButtonElement | HTMLAnchorElement | null>>([]);
    const anchorRef = React.useRef<HTMLDivElement | null>(null);
    const contentRef = React.useRef<HTMLDivElement | null>(null);

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
      updateOpenState(true);
    }, [disabled, updateOpenState]);

    const requestClose = React.useCallback(() => {
      updateOpenState(false);
    }, [updateOpenState]);
    React.useEffect(() => {
      if (!effectiveOpen) return;

      function handleDocPointerDown(event: PointerEvent) {
        const target = event.target as Node | null;
        const anchorEl = anchorRef.current;
        const contentEl = contentRef.current;
        if (!target) return;

        const clickedInsideAnchor = !!(anchorEl && anchorEl.contains(target));
        const clickedInsideContent = !!(contentEl && contentEl.contains(target));

        if (!clickedInsideAnchor && !clickedInsideContent) {
          requestClose();
        }
      }

      document.addEventListener('pointerdown', handleDocPointerDown, true);
      return () => {
        document.removeEventListener('pointerdown', handleDocPointerDown, true);
      };
    }, [effectiveOpen, requestClose]);

    const handleRootOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (disabled && nextOpen) {
          return;
        }
        updateOpenState(nextOpen);
      },
      [disabled, updateOpenState]
    );

    const listboxBaseId = React.useId();
    const listboxId = `${listboxBaseId}-listbox`;

    const [activeIndex, setActiveIndex] = React.useState<number>(-1);

    React.useEffect(() => {
      if (!effectiveOpen) {
        setActiveIndex(-1);
        return;
      }

      if (items.length === 0) {
        setActiveIndex(-1);
        return;
      }

      setActiveIndex(prev => {
        if (prev >= 0 && prev < items.length) {
          return prev;
        }
        const firstSelectedIndex = items.findIndex(item => selectedIdsSet.has(item.id));
        if (firstSelectedIndex >= 0) {
          return firstSelectedIndex;
        }
        return 0;
      });
    }, [effectiveOpen, items, selectedIdsSet]);

    React.useEffect(() => {
      if (activeIndex >= items.length) {
        setActiveIndex(items.length === 0 ? -1 : items.length - 1);
      }
    }, [activeIndex, items.length]);

    React.useEffect(() => {
      if (!effectiveOpen) {
        return;
      }
      if (activeIndex < 0) {
        return;
      }
      const node = itemRefs.current[activeIndex];
      if (node) {
        node.scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex, effectiveOpen]);

    const handleInputKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) {
          return;
        }

        const totalItems = items.length;

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (!effectiveOpen) {
            requestOpen();
            if (totalItems > 0) {
              setActiveIndex(prev => (prev >= 0 ? prev : 0));
            }
            return;
          }
          if (totalItems > 0) {
            setActiveIndex(prev => {
              const next = prev < 0 ? 0 : (prev + 1) % totalItems;
              return next;
            });
          }
          return;
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (!effectiveOpen) {
            requestOpen();
            if (totalItems > 0) {
              setActiveIndex(totalItems - 1);
            }
            return;
          }
          if (totalItems > 0) {
            setActiveIndex(prev => {
              if (prev < 0) {
                return totalItems - 1;
              }
              const next = prev - 1 < 0 ? totalItems - 1 : prev - 1;
              return next;
            });
          }
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (!effectiveOpen) {
            requestOpen();
            return;
          }
          if (activeIndex >= 0 && activeIndex < items.length) {
            const item = items[activeIndex];
            handleToggleSelection(item.id);
          }
          return;
        }

        if (event.key === 'Backspace') {
          if (selectedItems.length > 0) {
            event.preventDefault();
            const last = selectedItems[selectedItems.length - 1];
            handleRemoveSelection(last.id);
          }
          return;
        }

        if (event.key === 'Escape') {
          if (effectiveOpen) {
            event.preventDefault();
            requestClose();
            inputRef.current?.focus();
          }
          return;
        }
      },
      [
        activeIndex,
        disabled,
        effectiveOpen,
        handleRemoveSelection,
        handleToggleSelection,
        items,
        selectedItems,
        requestClose,
        requestOpen
      ]
    );

    const inputPlaceholder = hasSelection ? undefined : placeholder;
    const activeOptionId =
      effectiveOpen && activeIndex >= 0 && activeIndex < items.length
        ? `${listboxId}-option-${items[activeIndex].id}`
        : undefined;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      type: 'text',
      role: 'combobox',
      'aria-expanded': effectiveOpen,
      'aria-haspopup': 'listbox',
      'aria-autocomplete': 'none',
      'aria-controls': listboxId,
      'aria-activedescendant': activeOptionId,
      readOnly: true,
      value: '',
      placeholder: inputPlaceholder,
      onFocus: () => {
        requestOpen();
      },
      onClick: () => {
        requestOpen();
      },
      onKeyDown: handleInputKeyDown
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

    itemRefs.current.length = items.length;

    return (
      <div
        className={rootClassName}
        data-disabled={disabled ? 'true' : undefined}
        data-has-selection={hasSelection ? 'true' : undefined}
      >
        <Popover.Root open={effectiveOpen} onOpenChange={handleRootOpenChange}>
          <Popover.Anchor asChild>
            <div data-slot="anchor" ref={anchorRef}>
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
              ref={contentRef}
              id={listboxId}
              role="listbox"
              aria-multiselectable="true"
              className={panelClassName}
              data-slot="panel"
              data-open={effectiveOpen ? 'true' : 'false'}
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
              onEscapeKeyDown={event => {
                event.preventDefault();
                requestClose();
                inputRef.current?.focus();
              }}
              onPointerDownOutside={() => {
                requestClose();
              }}
              onFocusOutside={() => {
                requestClose();
              }}
              onInteractOutside={() => {
                requestClose();
              }}
            >
              {items.length === 0 ? (
                <div className={emptyClassName} data-slot="empty" role="presentation">
                  No options available
                </div>
              ) : (
                items.map((item, index) => {
                  const optionId = `${listboxId}-option-${item.id}`;
                  const isSelected = selectedIdsSet.has(item.id);
                  const isActive = index === activeIndex;
                  return (
                    <MenuItem
                      key={item.id}
                      ref={element => {
                        itemRefs.current[index] = element;
                      }}
                      id={optionId}
                      data-slot="menuItem"
                      className={menuItemClassName}
                      role="option"
                      aria-selected={isSelected}
                      data-highlighted={isActive ? 'true' : undefined}
                      tabIndex={-1}
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
                        setActiveIndex(index);
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
