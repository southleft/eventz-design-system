import * as React from 'react';

export interface CircleCheckIconProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean;
  title?: string;
  titleId?: string;
  color?: string;
}

type CircleCheckIconElement = SVGSVGElement;

export const CircleCheckIcon = React.forwardRef<CircleCheckIconElement, CircleCheckIconProps>(
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
          <path d="M428.28-331.22 669.87-571.8l-57.46-57.7-184.13 183.13-82.13-81.13-57.45 57.7 139.58 138.58ZM480-87.87q-80.91 0-152.34-30.62-71.44-30.62-125-84.17-53.55-53.56-84.17-125Q87.87-399.09 87.87-480q0-81.91 30.62-152.84 30.62-70.94 84.17-124.5 53.56-53.55 125-84.17 71.43-30.62 152.34-30.62 81.91 0 152.84 30.62 70.94 30.62 124.5 84.17 53.55 53.56 84.17 124.5 30.62 70.93 30.62 152.84 0 80.91-30.62 152.34-30.62 71.44-84.17 125-53.56 53.55-124.5 84.17Q561.91-87.87 480-87.87Zm0-83q129.04 0 219.09-90.04 90.04-90.05 90.04-219.09 0-129.04-90.04-219.09-90.05-90.04-219.09-90.04-129.04 0-219.09 90.04-90.04 90.05-90.04 219.09 0 129.04 90.04 219.09 90.05 90.04 219.09 90.04ZM480-480Z" />
        </g>
      </svg>
    );
  }
);

CircleCheckIcon.displayName = 'CircleCheckIcon';
