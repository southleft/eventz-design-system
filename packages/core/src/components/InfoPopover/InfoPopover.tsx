import * as React from 'react';
import { Popover } from 'radix-ui';
import { InfoIcon } from '../../icons';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';

const baseClasses = `relative dxyz-info-popover`;
const triggerClasses = `inline-flex items-center justify-center shrink-0 border-none bg-background-none text-color-content-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2 [&>svg]:size-16`;
const contentClasses = `max-w-xs rounded-md bg-color-content-default p-3 text-sm shadow-lg`;

type Side = 'top' | 'right' | 'bottom' | 'left';

export interface InfoPopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  ariaLabel: string;
  side?: Side;
  sideOffset?: number;
  children: React.ReactNode;
}

export const InfoPopover = React.forwardRef<HTMLDivElement, InfoPopoverProps>(
  ({ ariaLabel, side = 'top', sideOffset = 8, children, className, ...rest }, ref) => {
    const baseClassName = collapseWhitespace(composeClasses(baseClasses, className));
    const triggerClassName = collapseWhitespace(composeClasses(triggerClasses));
    const contentClassName = collapseWhitespace(composeClasses(contentClasses));

    return (
      <div ref={ref} className={baseClassName} {...rest}>
        <Popover.Root>
          <Popover.Trigger
            className={triggerClassName}
            aria-label={ariaLabel}
            data-slot="infoTrigger"
          >
            <InfoIcon aria-hidden="true" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className={contentClassName}
              side={side}
              sideOffset={sideOffset}
              data-slot="infoContent"
            >
              {children}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  }
);

InfoPopover.displayName = 'InfoPopover';
