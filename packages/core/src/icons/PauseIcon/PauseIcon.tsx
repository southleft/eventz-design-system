import * as React from 'react';

export interface PauseIconProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean;
  title?: string;
  titleId?: string;
  color?: string;
}

type PauseIconElement = SVGSVGElement;

export const PauseIcon = React.forwardRef<PauseIconElement, PauseIconProps>(
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
          <path d="M560.17-213.41v-533.18h190v533.18h-190Zm-350.34 0v-533.18h190v533.18h-190Z" />
        </g>
      </svg>
    );
  }
);

PauseIcon.displayName = 'PauseIcon';
