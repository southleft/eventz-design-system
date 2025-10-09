import * as React from 'react';
import { composeClasses, collapseWhitespace } from '../../utilities';
import { CancelIcon, ChevronRightIcon } from '../../icons';

export interface InteractiveListItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  title: string;
  supportingText?: string;
  highlightText?: string;
  imgSrc?: string;
  imgAlt?: string;
  isRemovable?: boolean;
  borderBottom?: boolean;
}

const baseClasses = `
  group
  flex
  justify-between
  gap-8
  w-full
  outline-none
  pb-10
  pl-8
  pt-8
  pr-8
  focus-visible:ring-2
  focus-visible:ring-offset-4
  focus-visible:ring-comp-border-focus-ring
  focus-visible:ring-offset-color-background-default
  data-[border-bottom=true]:border-b
  data-[border-bottom=true]:border-b-color-border-subtle
`;

const containerClasses = `
  flex
  items-center
  gap-8
  w-full
`;

const imageClasses = `
  h-40
  w-40
  rounded-full
  bg-color-background-brand
  shrink-0
`;

const titleClasses = `
  text-base
  lg:text-lg
  font-bold
  text-left
  truncate
  whitespace-nowrap
  text-color-content-default
  group-hover:text-color-content-default-hover
`;

const supportingTextClasses = `
  text-sm
  text-left
  truncate
  whitespace-nowrap
  text-color-content-weak
`;

const highlightTextClasses = `
  text-sm
  text-left
  truncate
  whitespace-nowrap
  text-color-content-brand
`;

const nonRemovableWrapperClasses = `
  flex
  flex-col
  min-w-0
  flex-1
`;

const trailingIconClasses = `
  shrink-0
`;

export const InteractiveListItem = React.forwardRef<HTMLButtonElement, InteractiveListItemProps>(
  (
    {
      title,
      supportingText,
      highlightText,
      imgSrc,
      imgAlt,
      isRemovable = false,
      borderBottom = true,
      className,
      ...rest
    },
    ref
  ) => {
    const baseClassName = collapseWhitespace(composeClasses(baseClasses, className));
    const containerClassName = collapseWhitespace(composeClasses(containerClasses));
    const imageClassName = collapseWhitespace(composeClasses(imageClasses));
    const nonRemovableWrapperClassName = collapseWhitespace(
      composeClasses(nonRemovableWrapperClasses)
    );
    const titleClassName = collapseWhitespace(composeClasses(titleClasses));
    const supportingTextClassName = collapseWhitespace(composeClasses(supportingTextClasses));
    const highlightTextClassName = collapseWhitespace(composeClasses(highlightTextClasses));
    const trailingIconClassName = collapseWhitespace(composeClasses(trailingIconClasses));

    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={baseClassName}
        data-is-removable={isRemovable ? 'true' : undefined}
        data-border-bottom={borderBottom ? 'true' : undefined}
      >
        <span className={containerClassName}>
          {isRemovable ? (
            imgSrc ? (
              <img className={imageClassName} src={imgSrc} alt={imgAlt || ''} />
            ) : (
              <div className={imageClassName} aria-hidden="true" />
            )
          ) : null}
          <span className={nonRemovableWrapperClassName}>
            <span className={titleClassName}>{title.trim()}</span>
            {!isRemovable && supportingText ? (
              <span className={supportingTextClassName}>{supportingText.trim()}</span>
            ) : null}
            {!isRemovable && highlightText ? (
              <span className={highlightTextClassName}>{highlightText.trim()}</span>
            ) : null}
          </span>
        </span>
        <span className={trailingIconClassName}>
          {isRemovable ? (
            <CancelIcon aria-hidden="true" />
          ) : (
            <ChevronRightIcon aria-hidden="true" />
          )}
        </span>
      </button>
    );
  }
);

InteractiveListItem.displayName = 'InteractiveListItem';
