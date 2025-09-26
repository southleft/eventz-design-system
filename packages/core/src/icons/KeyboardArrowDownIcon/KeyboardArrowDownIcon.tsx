import * as React from 'react';

export interface KeyboardArrowDownIconProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean;
  title?: string;
  titleId?: string;
  color?: string;
}

type KeyboardArrowDownIconElement = SVGSVGElement;

export const KeyboardArrowDownIcon = React.forwardRef<
  KeyboardArrowDownIconElement,
  KeyboardArrowDownIconProps
>(
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
        color={color}
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
          <path d="M480-325.35 232.35-573 291-631.65l189 189 189-189L727.65-573 480-325.35Z" />
        </g>
      </svg>
    );
  }
);

KeyboardArrowDownIcon.displayName = 'KeyboardArrowDownIcon';
