// packages/core/src/components/Control/Control.tsx
import * as React from 'react';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

type Variant = 'brand' | 'dark' | 'light';
type Size = 'lg' | 'sm';

type ControlOwnProps = {
  variant?: Variant;
  size?: Size;
  focused?: boolean;
  icon: React.ReactNode;
  ariaLabel: string;
};

export interface ControlProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'>,
    ControlOwnProps {}

const baseClasses = `
  inline-flex select-none items-center justify-center
  rounded-full
  transition-colors
  focus-visible:ring-2
  focus-visible:ring-comp-border-focus-ring
  focus-visible:ring-offset-2
  whitespace-nowrap
`;

const variantClasses: Record<Variant, string> = {
  brand: `
    bg-comp-button-primary-color-background-default text-comp-button-primary-color-content-default border-comp-border-none
    hover:bg-comp-button-primary-color-background-hover active:bg-comp-button-primary-color-background-active
  `,
  dark: `
    bg-comp-button-color-background-knockout-blur text-comp-button-color-content-default border-comp-border-none
    hover:bg-comp-button-color-background-knockout-blur-hover active:bg-comp-button-color-background-knockout-blur-active
  `,
  light: `
    bg-comp-button-color-background-default-blur border-comp-border-none text-comp-button-color-content-default
    hover:bg-comp-button-color-background-default-blur-hover active:bg-comp-button-color-background-default-blur-active
  `
};

const sizeClasses: Record<Size, string> = {
  lg: 'h-40 w-40',
  sm: 'h-32 w-32'
};

const stateClasses = {
  focused: 'ring-2 ring-comp-control-focus-color-ring ring-offset-2'
} as const;

const slotClasses = {
  icon: 'shrink-0'
} as const;

const iconSizeSelectorBySize: Record<Size, string> = {
  sm: '[&>svg]:size-16',
  lg: '[&>svg]:size-20'
};

export const Control = React.forwardRef<HTMLButtonElement, ControlProps>(
  (
    { variant = 'brand', size = 'lg', focused = false, icon, ariaLabel, className, ...rest },
    ref
  ) => {
    const normalizedAriaLabel = ariaLabel.trim();

    if (normalizedAriaLabel.length === 0) {
      throw new Error('Control requires a non-empty ariaLabel.');
    }

    const rootClassName = collapseWhitespace(
      composeClasses(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        focused ? stateClasses.focused : undefined,
        className
      )
    );

    const iconWrapperClassName = collapseWhitespace(
      composeClasses(slotClasses.icon, iconSizeSelectorBySize[size])
    );

    return (
      <button
        ref={ref}
        type="button"
        className={rootClassName}
        aria-label={normalizedAriaLabel}
        {...rest}
      >
        <span className={iconWrapperClassName} aria-hidden="true">
          {icon}
        </span>
      </button>
    );
  }
);

Control.displayName = 'Control';
