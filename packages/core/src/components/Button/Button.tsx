// packages/core/src/components/Button/Button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

type Variant = 'primary' | 'secondary' | 'bare' | 'knockout';

type ButtonOwnProps = {
  variant?: Variant;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
  children: React.ReactNode;
};

// Strip native props we don’t support/override; disallow passing children there.
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color' | 'children'>,
    ButtonOwnProps {}

const baseClasses = `
  inline-flex select-none items-center justify-center font-font-weight-medium text-sm transition-colors outline-none
  focus-visible:ring-2 focus-visible:ring-comp-button-focus-color-ring focus-visible:ring-offset-2
  disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap
`;

const containerClasses = 'h-10 px-4 gap-2 rounded-md';

const variantClasses: Record<Variant, string> = {
  primary: `
    bg-comp-button-primary-color-background-default text-comp-button-primary-color-content-default border-comp-border-none
    hover:bg-comp-button-primary-color-background-hover active:bg-comp-button-primary-color-background-active
  `,
  secondary: `
    bg-comp-button-color-background-default comp-button-color-border-default text-comp-button-color-content-default
    hover:bg-comp-button-color-background-hover active:bg-comp-button-color-background-active
  `,
  bare: `
    bg-background-none text-comp-button-bare-color-content-default
    hover:bg-comp-button-bare-color-background-hover active:bg-comp-button-bare-color-background-active
  `,
  knockout: `
    bg-transparent text-comp-button-knockout-color-content-default border
    border-comp-button-knockout-color-border-default
    hover:bg-comp-button-knockout-color-background-hover active:bg-comp-button-knockout-color-background-active
  `
};

const slotClasses = {
  startIcon: 'shrink-0 -ml-0.5',
  endIcon: 'shrink-0 -mr-0.5'
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      startIcon,
      endIcon,
      loading = false,
      disabled = false,
      type = 'button',
      asChild = false,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const effectiveDisabled = disabled || loading;

    const rootClass = collapseWhitespace(
      composeClasses(
        baseClasses,
        containerClasses,
        variantClasses[variant],
        {
          'pointer-events-none opacity-50': effectiveDisabled || loading
        },
        className
      )
    );

    const Comp: React.ElementType = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={rootClass}
        aria-busy={loading || undefined}
        aria-disabled={effectiveDisabled || undefined}
        // Only apply native button attributes when not using asChild
        {...(!asChild ? { type, disabled: effectiveDisabled } : {})}
        {...rest}
      >
        {startIcon && (
          <span className={slotClasses.startIcon} aria-hidden="true">
            {startIcon}
          </span>
        )}
        {children}
        {endIcon && (
          <span className={slotClasses.endIcon} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
