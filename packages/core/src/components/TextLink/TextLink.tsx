// packages/core/src/components/TextLink/TextLink.tsx
import * as React from 'react';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

type Variant = 'brand' | 'strong' | 'subtle' | 'inverted';

type TextLinkOwnProps = {
  variant?: Variant;
  href: string;
  label: string;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export interface TextLinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'children' | 'aria-disabled' | 'href'
    >,
    TextLinkOwnProps {}

const baseClasses = `
  inline-flex items-center select-none justify-center no-underline gap-2 outline-none
  text-sm whitespace-nowrap transition-colors outline-none rounded-sm
  focus-visible:ring focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2
  aria-disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:select-none
`;

const variantClasses: Record<Variant, string> = {
  brand: `
    text-color-content-brand
    hover:text-color-content-brand-hover
  `,
  strong: `
    font-medium
    text-color-content-default
    hover:text-color-content-default-hover
  `,
  subtle: `
    text-comp-text-link-subtle-color-foreground-default
    hover:text-comp-text-link-subtle-color-foreground-hover
    active:text-comp-text-link-subtle-color-foreground-active
  `,
  inverted: `
    text-comp-text-link-inverted-color-foreground-default
    hover:text-comp-text-link-inverted-color-foreground-hover
    active:text-comp-text-link-inverted-color-foreground-active
  `
};

const slotClasses = {
  startIcon: 'shrink-0 -ml-0.5 pt-2',
  label: '',
  endIcon: 'shrink-0 -mr-0.5 pt-2'
} as const;

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  (
    {
      variant = 'brand',
      href,
      label,
      disabled = false,
      startIcon,
      endIcon,
      className,
      ...restProps
    },
    ref
  ) => {
    const normalizedLabel = label.trim();
    const normalizedHref = href.trim();

    const rootClassName = collapseWhitespace(
      composeClasses(baseClasses, variantClasses[variant], className)
    );

    return (
      <a
        ref={ref}
        href={normalizedHref}
        className={rootClassName}
        aria-disabled={disabled ? 'true' : undefined}
        {...restProps}
      >
        {startIcon ? (
          <span className={slotClasses.startIcon} aria-hidden="true">
            {startIcon}
          </span>
        ) : null}

        <span className={slotClasses.label}>{normalizedLabel}</span>

        {endIcon ? (
          <span className={slotClasses.endIcon} aria-hidden="true">
            {endIcon}
          </span>
        ) : null}
      </a>
    );
  }
);

TextLink.displayName = 'TextLink';
