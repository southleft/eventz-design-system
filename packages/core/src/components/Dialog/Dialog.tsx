import * as React from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import { IconButton } from '../IconButton';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../../icons';
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

const overlayClasses = `
  fixed
  inset-0
  bg-modal-dark/50
  data-[state=open]:animate-overlayShow
`;

const contentClasses = `
  fixed
  left-1/2
  top-1/2
  -translate-x-1/2
  -translate-y-1/2
  rounded-md
  flex
  flex-col
  gap-8
  items-center
  p-40
  relative
  bg-modal-dark
  shadow-md
  h-650
  ml-20
  mr-20
  focus-visible:ring-2
  focus-visible:ring-comp-dialog-focus-color-ring
  focus-visible:ring-offset-2
  outline-none
`;

const closeClasses = `
  h-40
  w-full
  flex
  justify-end
`;

const navigationClasses = `
  relative
`;

const controlLeftClasses = `
  h-40
  w-40
  rounded-full
  opacity-50
  absolute
  top-1/2
  -translate-y-1/2
  -left-20
`;

const controlRightClasses = `
  h-40
  w-40
  rounded-full
  opacity-50
  absolute
  top-1/2
  -translate-y-1/2
  right-20
`;

const sizeSmClasses = `
  w-600
`;

const sizeMdClasses = `
  max-w-1300
`;

const sizeLgClasses = `
  max-w-1600
`;

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
    const contentClassName = collapseWhitespace(
      composeClasses(contentClasses, {
        [sizeSmClasses]: size === 'sm',
        [sizeMdClasses]: size === 'md',
        [sizeLgClasses]: size === 'lg'
      })
    );
    const closeClassName = collapseWhitespace(composeClasses(closeClasses));
    const navigationClassName = collapseWhitespace(composeClasses(navigationClasses));
    const controlLeftClassName = collapseWhitespace(composeClasses(controlLeftClasses));
    const controlRightClassName = collapseWhitespace(composeClasses(controlRightClasses));

    return (
      <RadixDialog.Root {...rest}>
        <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className={overlayClassName} data-radix-dialog-overlay="" />
          <RadixDialog.Content ref={ref} className={contentClassName}>
            <div className={closeClassName}>
              <RadixDialog.Close asChild>
                <IconButton icon={closeIcon ?? <CloseIcon />} ariaLabel="Close dialog" />
              </RadixDialog.Close>
            </div>
            {children}
            {hasNavigation ? (
              <div className={navigationClassName}>
                <IconButton
                  className={controlLeftClassName}
                  icon={controlLeftIcon ?? <ChevronLeftIcon />}
                  ariaLabel="Previous"
                  onClick={onControlLeftClick}
                />
                <IconButton
                  className={controlRightClassName}
                  icon={controlRightIcon ?? <ChevronRightIcon />}
                  ariaLabel="Next"
                  onClick={onControlRightClick}
                />
              </div>
            ) : null}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  }
);

Dialog.displayName = 'Dialog';
