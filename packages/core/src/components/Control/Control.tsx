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
  inline-flex select-none items-center justify-center rounded-full
  transition-colors outline-none
`;

const variantClasses: Record<Variant, string> = {
  brand: `
    bg-comp-control-brand-color-background-default
    border border-comp-control-brand-color-border-default
    hover:bg-comp-control-brand-color-background-hover
    active:bg-comp-control-brand-color-background-active
  `,
  dark: `
    bg-comp-control-dark-color-background-default
    border border-comp-control-dark-color-border-default
    hover:bg-comp-control-dark-color-background-hover
    active:bg-comp-control-dark-color-background-active
  `,
  light: `
    bg-comp-control-light-color-background-default
    border border-comp-control-light-color-border-default
    hover:bg-comp-control-light-color-background-hover
    active:bg-comp-control-light-color-background-active
  `
};

const sizeClasses: Record<Size, string> = {
  lg: 'h-6 w-6',
  sm: 'h-4 w-4'
};

const stateClasses = {
  focused: 'ring-2 ring-comp-control-focus-color-ring ring-offset-2'
} as const;

const slotClasses = {
  icon: 'shrink-0'
} as const;

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

    return (
      <button
        ref={ref}
        type="button"
        className={rootClassName}
        aria-label={normalizedAriaLabel}
        {...rest}
      >
        <span className={slotClasses.icon} aria-hidden="true">
          {icon}
        </span>
      </button>
    );
  }
);

Control.displayName = 'Control';
