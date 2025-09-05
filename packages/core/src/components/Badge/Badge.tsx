import * as React from 'react';
import { Badge as RadixBadge } from '@radix-ui/themes';
import { Slot } from '@radix-ui/react-slot';

const cx = (...classes: Array<string | undefined | null | false>) =>
  classes.filter(Boolean).join(' ');

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'purple' | 'blue' | 'pink' | 'brand' | 'orange';
  icon?: React.ReactNode;
  label?: string;
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  purple: 'bg-purple-500 text-white',
  blue: 'bg-blue-500 text-white',
  pink: 'bg-pink-500 text-white',
  brand: 'bg-brand-500 text-white',
  orange: 'bg-orange-500 text-white'
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'purple', icon, label, asChild = false, className, ...props }, ref) => {
    const Root = asChild ? Slot : 'span';
    return (
      <RadixBadge asChild>
        <Root
          ref={ref}
          className={cx(
            // root box
            'inline-flex items-center rounded-full px-2.5 py-1',
            // typography — replace text-label-sm if you don't have it
            'text-label-sm font-medium',
            // variant
            variantClasses[variant],
            className
          )}
          {...props}
        >
          <span className="flex items-center gap-1.5">
            {icon && (
              <span className="shrink-0" aria-hidden="true">
                {icon}
              </span>
            )}
            {label && <span>{label}</span>}
          </span>
        </Root>
      </RadixBadge>
    );
  }
);

Badge.displayName = 'Badge';
