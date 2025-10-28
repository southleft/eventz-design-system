// packages/core/src/components/ActionCard/ActionCard.tsx
import * as React from 'react';
import { collapseWhitespace, composeClasses } from '../../utilities';

type NativeDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

type ActionCardOwnProps = {
  focusable?: boolean;
  title: string;
  subtitle?: string;
  description?: string;
  imgSrc?: string;
  imgAlt?: string;
  ariaLabel?: string;
  action: React.ReactNode;
};

export interface ActionCardProps extends NativeDivProps, ActionCardOwnProps {}

const baseClasses = `
  outline-none border-0 rounded-md group flex flex-col items-center text-center p-2
  sm:p-6 sm:gap-4 data-[is-focusable=true]:[&:has(:focus-visible)]:ring-2 w-168
  data-[is-focusable=true]:[&:has(:focus-visible)]:ring-offset-2
  data-[is-focusable=true]:[&:has(:focus-visible)]:ring-comp-border-focus-ring
  data-[is-focusable=true]:[&:has(:focus-visible)]:ring-offset-color-background-default
`;

const mediaClasses = `
  relative overflow-hidden rounded-sm border-0
  [&>img]:w-168 [&>img]:h-168 [&>img]:object-cover [&>img]:group-hover:opacity-30
`;

const subtitleClasses = `
  text-xs text-color-content-subtle group-hover:text-color-content-subtle-hover
`;

const titleClasses = `
  inline-flex justify-between items-center w-full text-color-content-default group-hover:text-color-content-default-hover text-base sm:text-lg
`;

const descriptionClasses = `
  text-color-content-weak group-hover:text-color-content-weak-hover text-sm
`;

const actionsClasses = `
  mt-2 sm:mt-3
`;

export const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  (
    {
      focusable = false,
      title,
      subtitle,
      description,
      imgSrc,
      imgAlt,
      ariaLabel,
      action,
      className,
      ...rest
    },
    ref
  ) => {
    const isNonEmpty = (value?: string): value is string =>
      typeof value === 'string' && value.trim().length > 0;
    const hasSubtitle = isNonEmpty(subtitle);
    const hasDescription = isNonEmpty(description);
    const hasMedia = isNonEmpty(imgSrc);

    const baseClassName = collapseWhitespace(composeClasses(baseClasses, className));
    const mediaClassName = collapseWhitespace(composeClasses(mediaClasses));
    const subtitleClassName = collapseWhitespace(composeClasses(subtitleClasses));
    const titleClassName = collapseWhitespace(composeClasses(titleClasses));
    const descriptionClassName = collapseWhitespace(composeClasses(descriptionClasses));
    const actionsClassName = collapseWhitespace(composeClasses(actionsClasses));

    return (
      <div
        {...rest}
        ref={ref}
        className={baseClassName}
        data-slot="base"
        data-is-focusable={focusable ? 'true' : undefined}
        tabIndex={focusable ? 0 : undefined}
        role={focusable ? 'group' : undefined}
        aria-label={isNonEmpty(ariaLabel) ? ariaLabel : undefined}
      >
        {hasMedia ? (
          <div className={mediaClassName} data-slot="media">
            <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
          </div>
        ) : null}

        {hasSubtitle ? (
          <div className={subtitleClassName} data-slot="subtitle">
            {subtitle}
          </div>
        ) : null}

        <div className={titleClassName} data-slot="title">
          {title}
        </div>

        {hasDescription ? (
          <div className={descriptionClassName} data-slot="description">
            {description}
          </div>
        ) : null}

        <div className={actionsClassName} data-slot="actions">
          {action}
        </div>
      </div>
    );
  }
);

ActionCard.displayName = 'ActionCard';
