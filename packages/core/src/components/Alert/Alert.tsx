'use client';

// packages/core/src/components/Alert/Alert.tsx
import * as React from 'react';
import { collapseWhitespace, composeClasses } from '../../utilities';
import { TextLink, type TextLinkProps } from '../TextLink';
import { IconButton } from '../IconButton';
import { CircleCheckIcon, CloseIcon, ErrorIcon, InfoIcon, WarningIcon } from '../../icons';

type AlertVariant = 'success' | 'info' | 'warning' | 'danger';

const containerClasses = `
  flex gap-8 items-start pt-12 pb-12 pl-16 pr-16 w-390 rounded-md text-color-content-inverse
`;

const surfaceByVariant: Record<AlertVariant, string> = {
  success: `bg-gradient-utility-success`,
  info: `bg-gradient-utility-info`,
  warning: `bg-gradient-utility-warning`,
  danger: `bg-gradient-utility-danger`
};

const iconSlotClasses = `mt-0.5 shrink-0`;
const contentClasses = `flex flex-col gap-2 flex-grow`;
const titleClasses = `text-base font-bold`;
const descriptionClasses = `text-sm`;
const closeButtonClasses = `pt-0`;
const closeGlyphClasses = `fill-color-content-inverse -mt-2`;

const iconFillClasses: Record<AlertVariant, string> = {
  success: `fill-color-content-utility-success-strong`,
  info: `fill-color-content-utility-info-strong`,
  warning: `fill-color-content-utility-warning-strong`,
  danger: `fill-color-content-utility-danger-strong`
};

const classNameFor = (variant: AlertVariant) =>
  collapseWhitespace(composeClasses(iconSlotClasses, iconFillClasses[variant]));

const iconByVariant: Record<AlertVariant, React.ReactElement> = {
  success: (
    <CircleCheckIcon className={classNameFor('success')} aria-hidden="true" data-slot="icon" />
  ),
  info: <InfoIcon className={classNameFor('info')} aria-hidden="true" data-slot="icon" />,
  warning: <WarningIcon className={classNameFor('warning')} aria-hidden="true" data-slot="icon" />,
  danger: <ErrorIcon className={classNameFor('danger')} aria-hidden="true" data-slot="icon" />
};

type NativeDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

export interface AlertProps extends NativeDivProps {
  variant?: AlertVariant;
  title?: string;
  textLink?: TextLinkProps;
  isDismissible?: boolean;
  withIcon?: boolean;
  closeIcon?: React.ReactNode;
  onCloseClick?: (event: React.SyntheticEvent) => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      textLink,
      isDismissible = true,
      withIcon = true,
      closeIcon,
      onCloseClick,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const trimmedTitle = title?.trim();

    const rootRole = variant === 'danger' ? 'alert' : 'status';

    const rootClassName = collapseWhitespace(
      composeClasses(containerClasses, surfaceByVariant[variant], className)
    );

    const contentClassName = collapseWhitespace(composeClasses(contentClasses));
    const titleClassName = collapseWhitespace(composeClasses(titleClasses));
    const descriptionClassName = collapseWhitespace(composeClasses(descriptionClasses));
    const closeButtonClassName = collapseWhitespace(composeClasses(closeButtonClasses));
    const closeGlyphClassName = collapseWhitespace(composeClasses(closeGlyphClasses));

    const textLinkElement = textLink ? <TextLink {...textLink} data-slot="textLink" /> : null;

    return (
      <div {...rest} ref={ref} className={rootClassName} role={rootRole} data-slot="container">
        {withIcon ? iconByVariant[variant] : null}

        <div className={contentClassName} data-slot="content">
          {trimmedTitle ? (
            <div className={titleClassName} data-slot="title">
              {trimmedTitle}
            </div>
          ) : (
            <div className={descriptionClassName} data-slot="description">
              {children}
            </div>
          )}

          {textLinkElement}
        </div>

        {isDismissible ? (
          <IconButton
            ariaLabel="Dismiss alert"
            onClick={onCloseClick}
            variant="bareKnockout"
            className={closeButtonClassName}
            icon={closeIcon ?? <CloseIcon className={closeGlyphClassName} data-slot="closeIcon" />}
          />
        ) : null}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
