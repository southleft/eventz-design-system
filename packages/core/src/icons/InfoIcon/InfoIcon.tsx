import * as React from 'react';

export interface InfoIconProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean;
  title?: string;
  titleId?: string;
  color?: string;
}

type InfoIconElement = SVGSVGElement;

export const InfoIcon = React.forwardRef<InfoIconElement, InfoIconProps>(
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
          <path d="M440.41-284.41h79.18V-528h-79.18v243.59Zm39.38-310.81q17.24 0 29.12-11.66 11.87-11.67 11.87-28.91 0-17.24-11.66-29.12-11.67-11.87-28.91-11.87-17.24 0-29.12 11.66-11.87 11.67-11.87 28.91 0 17.24 11.66 29.12 11.67 11.87 28.91 11.87Zm.49 507.35q-81.19 0-152.62-30.62-71.44-30.62-125-84.17-53.55-53.56-84.17-124.95Q87.87-399 87.87-480.46q0-81.45 30.62-152.38 30.62-70.94 84.17-124.5 53.56-53.55 124.95-84.17 71.39-30.62 152.85-30.62 81.45 0 152.38 30.62 70.94 30.62 124.5 84.17 53.55 53.56 84.17 124.72 30.62 71.16 30.62 152.34 0 81.19-30.62 152.62-30.62 71.44-84.17 125-53.56 53.55-124.72 84.17-71.16 30.62-152.34 30.62Zm-.28-83q129.04 0 219.09-90.04 90.04-90.05 90.04-219.09 0-129.04-90.04-219.09-90.05-90.04-219.09-90.04-129.04 0-219.09 90.04-90.04 90.05-90.04 219.09 0 129.04 90.04 219.09 90.05 90.04 219.09 90.04ZM480-480Z" />
        </g>
      </svg>
    );
  }
);

InfoIcon.displayName = 'InfoIcon';
