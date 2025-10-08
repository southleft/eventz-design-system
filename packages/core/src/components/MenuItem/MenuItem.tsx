// packages/core/src/components/MenuItem/MenuItem.tsx
import * as React from 'react';
import { composeClasses, collapseWhitespace } from '../../utilities';
import { CheckIcon } from '../../icons';

type MenuItemType = 'simple' | 'complex';

export interface MenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: MenuItemType;
  isSelected?: boolean;
  borderBottom?: boolean;
  ariaLabel?: string;
  startIcon?: React.ReactNode;
  option?: string;
  supportingText?: string;
  imgSrc?: string;
  imgAlt?: string;
}

const baseClasses = `
  flex flex-nowrap items-center justify-between gap-8 bg-background-none
  [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-offset-4
  [&:has(:focus-visible)]:ring-comp-border-focus-ring [&:has(:focus-visible)]:ring-offset-color-background-default
  data-[border-bottom=true]:border-b data-[border-bottom=true]:border-b-color-border-subtle
`;

const optionClasses = `
  text-sm flex-grow text-color-content-default hover:text-color-content-default-hover
  data-[is-selected=true]:text-color-content-brand
`;

const startIconClasses = `
  shrink-0 text-color-content-default hover:text-color-content-default-hover
  data-[is-selected=true]:text-color-content-brand
`;

const supportingTextClasses = `
  text-color-content-weak hover:text-color-content-weak-hover
  data-[is-selected=true]:text-color-content-brand
`;

const imageClasses = `
  h-40 w-40 rounded-4
`;

const complexSelectedWrapperClasses = `
  flex flex-col
`;

const primaryRowClasses = `
  flex items-center justify-between gap-8
`;

const selectedIconBaseClasses = `
  _selectedIcon hidden shrink-0 text-color-content-brand
`;

const selectedIconVisibleClasses = `
  data-[is-selected=true]:inline-flex
`;

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      type = 'simple',
      isSelected = false,
      borderBottom = true,
      ariaLabel,
      startIcon,
      option,
      supportingText,
      imgSrc,
      imgAlt,
      className,
      ...rest
    },
    ref
  ) => {
    const baseClassName = collapseWhitespace(composeClasses(baseClasses, className ?? ''));

    const optionClassName = collapseWhitespace(composeClasses(optionClasses));
    const startIconClassName = collapseWhitespace(composeClasses(startIconClasses));
    const supportingTextClassName = collapseWhitespace(composeClasses(supportingTextClasses));
    const imageClassName = collapseWhitespace(composeClasses(imageClasses));
    const complexSelectedWrapperClassName = collapseWhitespace(
      composeClasses(complexSelectedWrapperClasses)
    );
    const primaryRowClassName = collapseWhitespace(composeClasses(primaryRowClasses));
    const selectedIconClassName = collapseWhitespace(
      composeClasses(selectedIconBaseClasses, selectedIconVisibleClasses)
    );

    const resolvedImgAlt =
      type === 'complex'
        ? imgAlt?.trim() || option?.trim() || ariaLabel?.trim() || undefined
        : undefined;

    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={baseClassName}
        data-is-selected={isSelected}
        data-border-bottom={borderBottom}
        aria-label={ariaLabel?.trim() || undefined}
      >
        {type === 'simple' ? (
          <>
            {startIcon ? (
              <span className={startIconClassName} aria-hidden="true">
                {startIcon}
              </span>
            ) : null}
            <span className={optionClassName}>{option}</span>
            <CheckIcon
              aria-hidden="true"
              className={selectedIconClassName}
              data-testid="menu-item-selected-icon"
            />
          </>
        ) : (
          <>
            {imgSrc ? (
              <img className={imageClassName} src={imgSrc} alt={resolvedImgAlt} />
            ) : (
              <span
                className={imageClassName}
                aria-hidden="true"
                data-testid="menu-item-image-placeholder"
              />
            )}
            <span className={complexSelectedWrapperClassName}>
              <span className={primaryRowClassName}>
                <span className={optionClassName}>{option}</span>
                <CheckIcon
                  aria-hidden="true"
                  className={selectedIconClassName}
                  data-testid="menu-item-selected-icon"
                />
              </span>
              {supportingText ? (
                <span className={supportingTextClassName}>{supportingText}</span>
              ) : null}
            </span>
          </>
        )}
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';
