// packages/core/src/components/IconButton/IconButton.tsx
import * as React from 'react';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

type Variant = 'primary' | 'secondary' | 'bare' | 'knockout' | 'bareKnockout';

type IconButtonOwnProps = {
  variant?: Variant;
  icon: React.ReactNode;
  ariaLabel: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export interface IconButtonProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'color' | 'disabled' | 'type' | 'aria-label'
    >,
    IconButtonOwnProps {}

const baseClasses = `
  inline-flex select-none items-center justify-center
  outline-none
  transition-colors
  focus-visible:ring-2
  focus-visible:ring-comp-icon-button-focus-color-ring
  focus-visible:ring-offset-2
  disabled:opacity-50 disabled:pointer-events-none
  whitespace-nowrap
`;

const containerClasses = `
  h-10
  w-10
  rounded-md
`;

const variantClasses: Record<Variant, string> = {
  primary: `
    bg-comp-icon-button-primary-color-background-default
    text-comp-icon-button-primary-color-foreground-default
    hover:bg-comp-icon-button-primary-color-background-hover
    active:bg-comp-icon-button-primary-color-background-active
  `,
  secondary: `
    bg-comp-icon-button-secondary-color-background-default
    text-comp-icon-button-secondary-color-foreground-default
    hover:bg-comp-icon-button-secondary-color-background-hover
    active:bg-comp-icon-button-secondary-color-background-active
  `,
  bare: `
    bg-transparent
    text-comp-icon-button-bare-color-foreground-default
    hover:bg-comp-icon-button-bare-color-background-hover
    active:bg-comp-icon-button-bare-color-background-active
  `,
  knockout: `
    bg-transparent
    text-comp-icon-button-knockout-color-foreground-default
    border
    border-comp-icon-button-knockout-color-border-default
    hover:bg-comp-icon-button-knockout-color-background-hover
    active:bg-comp-icon-button-knockout-color-background-active
  `,
  bareKnockout: `
    bg-transparent
    text-comp-icon-button-bare-knockout-color-foreground-default
    border
    border-comp-icon-button-bare-knockout-color-border-default
    hover:bg-comp-icon-button-bare-knockout-color-background-hover
    active:bg-comp-icon-button-bare-knockout-color-background-active
  `
};

const stateClasses = {
  loading: `
    cursor-wait
  `
} as const;

const slotClasses = {
  icon: 'shrink-0'
} as const;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'primary',
      icon,
      ariaLabel,
      loading = false,
      disabled = false,
      type = 'button',
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const normalizedAriaLabel = ariaLabel.trim();
    if (normalizedAriaLabel.length === 0) {
      throw new Error('IconButton requires a non-empty ariaLabel.');
    }

    const childElement = children ?? null;

    if (childElement !== null) {
      throw new Error('IconButton does not accept children; pass the icon via the `icon` prop.');
    }

    const effectiveDisabled = disabled || loading;

    const rootClass = collapseWhitespace(
      composeClasses(
        baseClasses,
        containerClasses,
        variantClasses[variant],
        loading ? stateClasses.loading : undefined,
        className
      )
    );

    const iconSlot = (
      <span className={slotClasses.icon} aria-hidden="true">
        {icon}
      </span>
    );

    return (
      <button
        ref={ref}
        className={rootClass}
        aria-label={normalizedAriaLabel}
        aria-busy={loading || undefined}
        aria-disabled={effectiveDisabled || undefined}
        type={type}
        disabled={effectiveDisabled || undefined}
        data-loading={loading ? 'true' : undefined}
        {...rest}
      >
        {iconSlot}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
