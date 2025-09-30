import * as React from 'react';

export interface ChevronRightIconProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean;
  title?: string;
  titleId?: string;
  color?: string;
}

type ChevronRightIconElement = SVGSVGElement;

export const ChevronRightIcon = React.forwardRef<ChevronRightIconElement, ChevronRightIconProps>(
  (
    {
      decorative = true,
      width = '20px',
      height = '20px',
      title,
      titleId: providedTitleId,
      color = 'currentColor',
      className,
      'aria-labelledby': ariaLabelledby,
      ...rest
    },
    ref
  ) => {
    const generatedTitleId = React.useId();
    const resolvedTitleId = title ? (providedTitleId ?? generatedTitleId) : undefined;

    const computedAriaHidden = decorative ? 'true' : undefined;
    const computedRole = decorative ? undefined : 'img';
    const computedAriaLabelledby =
      !decorative && title && resolvedTitleId ? resolvedTitleId : ariaLabelledby;

    return (
      <svg
        ref={ref}
        {...rest}
        className={className}
        viewBox="0 0 20 20"
        width={width}
        height={height}
        fill={color}
        aria-hidden={computedAriaHidden}
        role={computedRole}
        aria-labelledby={computedAriaLabelledby}
      >
        {!decorative && title ? <title id={resolvedTitleId}>{title}</title> : null}
        <g transform="scale(0.0208333333,0.0208333333) translate(0,960)">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </g>
      </svg>
    );
  }
);

ChevronRightIcon.displayName = 'ChevronRightIcon';
