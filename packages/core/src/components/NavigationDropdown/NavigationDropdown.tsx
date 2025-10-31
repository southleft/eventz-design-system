'use client';

import * as React from 'react';
import { Popover } from 'radix-ui';
import { CloseIcon, NotesIcon } from '../../icons';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { IconButton } from '../IconButton';
import { MenuItem } from '../MenuItem';

const panelClasses = `
  z-50
  py-4
  bg-background-none
  w-screen
  h-screen
  top-[var(--nav-offset)]
  overflow-y-auto
`;

const itemClasses = `
  mx-4
`;

type NavigationDropdownItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface NavigationDropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  ariaLabel?: string;
  triggerAriaLabel?: string;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  items: NavigationDropdownItem[];
}

export const NavigationDropdown = React.forwardRef<HTMLDivElement, NavigationDropdownProps>(
  ({ ariaLabel, triggerAriaLabel, openIcon, closeIcon, items, className, ...rest }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const rootClassName = collapseWhitespace(composeClasses(className));
    const panelClassName = collapseWhitespace(composeClasses(panelClasses));
    const itemClassName = collapseWhitespace(composeClasses(itemClasses));

    const resolvedOpenIcon = openIcon ?? <NotesIcon aria-hidden="true" />;
    const resolvedCloseIcon = closeIcon ?? <CloseIcon aria-hidden="true" />;

    const iconButtonAriaLabel = triggerAriaLabel?.trim() || 'Menu';

    const listContent = (
      <div data-slot="list">
        {items.map((item, index) => {
          const key = `${item.href}-${index}`;
          return (
            <div key={key} className={itemClassName} data-slot="item">
              <MenuItem
                href={item.href}
                option={item.label}
                ariaLabel={item.ariaLabel ?? item.label}
                type="simple"
                isSelected={false}
                borderBottom={false}
              />
            </div>
          );
        })}
      </div>
    );

    const landmarkWrappedList = ariaLabel ? (
      <nav aria-label={ariaLabel}>{listContent}</nav>
    ) : (
      listContent
    );

    return (
      <div
        ref={ref}
        className={rootClassName}
        data-slot="base"
        {...(isOpen ? { 'data-is-open': 'true' } : {})}
        {...rest}
      >
        <Popover.Root onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <IconButton
              variant="bare"
              ariaLabel={iconButtonAriaLabel}
              icon={isOpen ? resolvedCloseIcon : resolvedOpenIcon}
              data-slot="trigger"
            />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className={panelClassName}
              data-slot="panel"
              data-testid="navigation-dropdown-panel"
            >
              {landmarkWrappedList}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  }
);

NavigationDropdown.displayName = 'NavigationDropdown';
