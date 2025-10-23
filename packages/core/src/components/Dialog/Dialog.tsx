'use client';

import * as React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { IconButton } from '../IconButton';
import { CloseIcon, ArrowBackIcon, ArrowForwardIcon } from '../../icons';
import { collapseWhitespace, composeClasses } from '../../utilities';

type DialogContentElement = React.ComponentRef<typeof RadixDialog.Content>;
type DialogRootProps = React.ComponentPropsWithoutRef<typeof RadixDialog.Root>;

export interface DialogProps extends Omit<DialogRootProps, 'children'> {
  trigger: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hasNavigation?: boolean;
  closeIcon?: React.ReactNode;
  controlLeftIcon?: React.ReactNode;
  controlRightIcon?: React.ReactNode;
  onControlLeftClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onControlRightClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const centererClasses = `fixed inset-0 grid place-items-center p-20 pointer-events-none`;
const overlayClasses = `fixed inset-0 z-0 bg-color-background-inverted/50 data-[state=open]:animate-overlayShow`;
const contentClasses = `
  rounded-md flex flex-col min-h-0 gap-8 items-center p-40 relative box-border z-10 outline-none text-color-content-default
  pointer-events-auto bg-background-modal-dark shadow-(--shadow-shadows-shadow-6) h-[min(650px,calc(100vh-40px))] overflow-visible
  focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default
`;
const closeClasses = `h-40 w-full flex justify-end`;
const contentBodyClasses = `
  w-full
  flex-1
  min-h-0
  overflow-auto
`;
const navigationClasses = `h-40 w-40 !rounded-full border-none absolute z-20 pointer-events-auto`;
const controlLeftClasses = `top-1/2 -translate-y-1/2 -left-20`;
const controlRightClasses = `top-1/2 -translate-y-1/2 -right-20`;
const sizeSmClasses = `w-600`;
const sizeMdClasses = `w-full max-w-1300`;
const sizeLgClasses = `w-full max-w-1600`;

const contentBodyClassName = collapseWhitespace(composeClasses(contentBodyClasses));

export const Dialog = React.forwardRef<DialogContentElement, DialogProps>(
  (
    {
      trigger,
      size = 'md',
      hasNavigation = false,
      closeIcon,
      controlLeftIcon,
      controlRightIcon,
      onControlLeftClick,
      onControlRightClick,
      children,
      ...rest
    },
    ref
  ) => {
    const overlayClassName = collapseWhitespace(composeClasses(overlayClasses));
    const centererClassName = collapseWhitespace(composeClasses(centererClasses));
    const contentClassName = collapseWhitespace(
      composeClasses(contentClasses, {
        [sizeSmClasses]: size === 'sm',
        [sizeMdClasses]: size === 'md',
        [sizeLgClasses]: size === 'lg'
      })
    );
    const closeClassName = collapseWhitespace(composeClasses(closeClasses));
    const controlLeftClassName = collapseWhitespace(
      composeClasses(navigationClasses, controlLeftClasses)
    );
    const controlRightClassName = collapseWhitespace(
      composeClasses(navigationClasses, controlRightClasses)
    );

    return (
      <RadixDialog.Root {...rest}>
        <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className={overlayClassName} data-radix-dialog-overlay="" />
          <div className={centererClassName}>
            <RadixDialog.Content ref={ref} className={contentClassName}>
              <div className={closeClassName}>
                <RadixDialog.Close asChild>
                  <IconButton
                    icon={closeIcon ?? <CloseIcon />}
                    ariaLabel="Close dialog"
                    variant="bare"
                  />
                </RadixDialog.Close>
              </div>
              <div className={contentBodyClassName}>{children}</div>
              {hasNavigation ? (
                <React.Fragment>
                  <IconButton
                    className={controlLeftClassName}
                    icon={controlLeftIcon ?? <ArrowBackIcon />}
                    ariaLabel="Previous"
                    variant="secondary"
                    onClick={onControlLeftClick}
                  />
                  <IconButton
                    className={controlRightClassName}
                    icon={controlRightIcon ?? <ArrowForwardIcon />}
                    ariaLabel="Next"
                    variant="secondary"
                    onClick={onControlRightClick}
                  />
                </React.Fragment>
              ) : null}
            </RadixDialog.Content>
          </div>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  }
);

Dialog.displayName = 'Dialog';
