import * as React from 'react';

export interface WarningIconProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean;
  title?: string;
  titleId?: string;
  color?: string;
}

type WarningIconElement = SVGSVGElement;

export const WarningIcon = React.forwardRef<WarningIconElement, WarningIconProps>(
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
          <path d="M41.07-139.93 480-872.13l438.93 732.2H41.07Zm139.91-79.42h598.04L480-717.3 180.98-219.35Zm298.81-45.37q15.45 0 26.43-10.77 10.98-10.76 10.98-26.21 0-15.45-10.77-26.31t-26.22-10.86q-15.45 0-26.43 10.65t-10.98 26.1q0 15.45 10.77 26.42 10.77 10.98 26.22 10.98ZM444-384h72v-189.37h-72V-384Zm36-84.33Z" />
        </g>
      </svg>
    );
  }
);

WarningIcon.displayName = 'WarningIcon';
