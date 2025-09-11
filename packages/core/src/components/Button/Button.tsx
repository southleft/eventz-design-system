import * as React from 'react';
import { Button as RadixButton } from '@radix-ui/themes';

const cx = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(' ');

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> {
  variant?: 'primary' | 'secondary' | 'bare' | 'knockout';
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

type Variant = NonNullable<ButtonProps['variant']>;

const baseClasses = [
  'inline-flex select-none items-center justify-center',
  'font-medium',
  'transition-colors',
  'outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-comp-button-focus-color-ring',
  'focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:pointer-events-none',
  'whitespace-nowrap'
];

const containerClasses = ['h-10', 'px-4', 'gap-2', 'rounded-md'];

const slotClasses = {
  startIcon: ['shrink-0', '-ml-0.5'],
  label: [] as string[],
  endIcon: ['shrink-0', '-mr-0.5']
};

const layoutClasses = {
  fullWidth: 'w-full'
};

const variantClasses: Record<Variant, readonly string[]> = {
  primary: [
    'bg-comp-button-primary-color-background-default',
    'text-comp-button-primary-color-foreground-default',
    'hover:bg-comp-button-primary-color-background-hover',
    'active:bg-comp-button-primary-color-background-active'
  ],
  secondary: [
    'bg-comp-button-secondary-color-background-default',
    'text-comp-button-secondary-color-foreground-default',
    'hover:bg-comp-button-secondary-color-background-hover',
    'active:bg-comp-button-secondary-color-background-active'
  ],
  bare: [
    'bg-transparent',
    'text-comp-button-bare-color-foreground-default',
    'hover:bg-comp-button-bare-color-background-hover',
    'active:bg-comp-button-bare-color-background-active'
  ],
  knockout: [
    'bg-transparent',
    'text-comp-button-knockout-color-foreground-default',
    'border',
    'border-comp-button-knockout-color-border-default',
    'hover:bg-comp-button-knockout-color-background-hover',
    'active:bg-comp-button-knockout-color-background-active'
  ]
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      label,
      startIcon,
      endIcon,
      fullWidth = false,
      loading = false,
      disabled = false,
      type = 'button',
      className,
      ...rest
    },
    ref
  ) => {
    const effectiveDisabled = disabled || loading;

    const innerWrapperClass = cx(
      ...baseClasses,
      ...containerClasses,
      ...variantClasses[variant],
      fullWidth ? layoutClasses.fullWidth : undefined,
      className
    );

    return (
      <RadixButton
        ref={ref}
        className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-comp-button-focus-color-ring focus-visible:ring-offset-2"
        disabled={effectiveDisabled}
        loading={loading}
        type={type}
        {...rest}
      >
        <span className={innerWrapperClass}>
          {startIcon && (
            <span className={cx(...slotClasses.startIcon)} aria-hidden="true">
              {startIcon}
            </span>
          )}
          <span className={cx(...slotClasses.label)}>{label}</span>
          {endIcon && (
            <span className={cx(...slotClasses.endIcon)} aria-hidden="true">
              {endIcon}
            </span>
          )}
        </span>
      </RadixButton>
    );
  }
);

Button.displayName = 'Button';
