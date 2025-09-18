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
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'aria-disabled' | 'href'>,
    TextLinkOwnProps {}

const baseClasses = `
  inline-flex items-center align-baseline gap-1.5
  text-sm whitespace-nowrap transition-colors outline-none rounded-sm
  focus-visible:ring-2 focus-visible:ring-comp-text-link-focus-color-ring focus-visible:ring-offset-2
  aria-disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:select-none
`;

const variantClasses: Record<Variant, string> = {
  brand: `
    text-comp-text-link-brand-color-foreground-default
    hover:text-comp-text-link-brand-color-foreground-hover
    active:text-comp-text-link-brand-color-foreground-active
  `,
  strong: `
    text-comp-text-link-strong-color-foreground-default
    hover:text-comp-text-link-strong-color-foreground-hover
    active:text-comp-text-link-strong-color-foreground-active
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
  startIcon: 'shrink-0 -ml-0.5',
  label: '',
  endIcon: 'shrink-0 -mr-0.5'
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
      target,
      rel,
      onClick,
      tabIndex,
      ...restProps
    },
    ref
  ) => {
    const normalizedLabel = typeof label === 'string' ? label.trim() : '';
    if (normalizedLabel.length === 0) {
      throw new Error('TextLink requires a non-empty label.');
    }

    const normalizedHref = typeof href === 'string' ? href.trim() : '';
    if (normalizedHref.length === 0) {
      throw new Error('TextLink requires a non-empty href.');
    }

    const rootClassName = collapseWhitespace(
      composeClasses(baseClasses, variantClasses[variant], className)
    );

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = event => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    };

    const computedTabIndex = disabled ? -1 : tabIndex;
    const relValue = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <a
        ref={ref}
        href={normalizedHref}
        className={rootClassName}
        aria-disabled={disabled ? 'true' : undefined}
        tabIndex={computedTabIndex}
        target={target}
        rel={relValue}
        onClick={handleClick}
        {...restProps}
      >
        {startIcon ? (
          <span
            className={collapseWhitespace(composeClasses(slotClasses.startIcon))}
            aria-hidden="true"
          >
            {startIcon}
          </span>
        ) : null}

        <span className={slotClasses.label}>{normalizedLabel}</span>

        {endIcon ? (
          <span
            className={collapseWhitespace(composeClasses(slotClasses.endIcon))}
            aria-hidden="true"
          >
            {endIcon}
          </span>
        ) : null}
      </a>
    );
  }
);

TextLink.displayName = 'TextLink';
