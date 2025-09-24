// packages/core/src/components/Tag/Tag.tsx
import * as React from 'react';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

type TagVariant = 'parent' | 'child';

type CommonTagProps = {
  variant?: TagVariant;
  label: string;
  isInteractive?: boolean;
  isActive?: boolean;
};

type InteractiveTagProps = CommonTagProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'children' | 'dangerouslySetInnerHTML' | 'type'
  > & {
    isInteractive: true;
  };

type NonInteractiveTagProps = CommonTagProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'dangerouslySetInnerHTML'> & {
    isInteractive?: false | undefined;
  };

export type TagProps = InteractiveTagProps | NonInteractiveTagProps;

type TagElement = HTMLButtonElement | HTMLSpanElement;

const baseClasses = `
  inline-block text-sm border-none
  text-color-content-default
  data-[interactive=false]:rounded-full
  data-[interactive=false]:bg-comp-button-color-background-default
  data-[interactive=true]:select-none
  data-[interactive=true]:rounded-md
  data-[interactive=true]:focus-visible:ring-2
  data-[interactive=true]:focus-visible:ring-comp-tag-focus-color-ring
  data-[interactive=true]:focus-visible:ring-offset-2
  whitespace-nowrap pt-2 pb-2 px-4
`;

const variantClasses: Record<TagVariant, string> = {
  parent: `
    data-[interactive=true]:font-bold
    data-[interactive=true]:bg-color-background-weak
    data-[interactive=true]:hover:bg-color-background-weak-hover
    data-[interactive=true]:hover:text-color-content-default-hover
    data-[interactive=true]:data-[active=true]:bg-color-background-brand
    data-[interactive=true]:data-[active=true]:text-color-background-default
    data-[interactive=true]:data-[active=true]:hover:bg-color-background-brand-hover
  `,
  child: `
    data-[interactive=true]:bg-comp-tag-child-color-background-default
    data-[interactive=true]:text-comp-tag-child-color-foreground-default
    data-[interactive=true]:hover:bg-comp-tag-child-color-background-hover
    data-[interactive=true]:active:bg-comp-tag-child-color-background-active
    data-[interactive=true]:data-[active=true]:bg-comp-tag-child-color-background-active
    data-[interactive=true]:data-[active=true]:text-comp-tag-child-color-foreground-active
  `
};

const stateClasses = {
  cursor: `
    data-[interactive=true]:cursor-pointer data-[interactive=false]:cursor-default
  `,
  nonInteractive: `
    data-[interactive=false]:bg-comp-tag-parent-color-background-default
    data-[interactive=false]:text-comp-tag-parent-color-foreground-default
    data-[interactive=false]:data-[active=true]:bg-comp-tag-parent-color-background-active
    data-[interactive=false]:data-[active=true]:text-comp-tag-parent-color-foreground-active
  `
} as const;

export const Tag = React.forwardRef<TagElement, TagProps>((props, forwardedRef) => {
  const {
    variant = 'parent',
    label,
    isActive = false,
    isInteractive: isInteractiveProp,
    className,
    ...rest
  } = props;

  const isInteractive = isInteractiveProp ?? false;
  const trimmedLabel = label.trim();

  if (trimmedLabel.length === 0) {
    throw new Error('Tag: `label` must be a non-empty string.');
  }

  const rootClassName = collapseWhitespace(
    composeClasses(
      baseClasses,
      variantClasses[variant],
      stateClasses.cursor,
      stateClasses.nonInteractive,
      className
    )
  );

  const Comp: React.ElementType = isInteractive ? 'button' : 'span';

  return (
    <Comp
      {...rest}
      ref={forwardedRef as never}
      type={isInteractive ? 'button' : undefined}
      className={rootClassName}
      data-interactive={isInteractive ? 'true' : 'false'}
      data-active={isActive ? 'true' : undefined}
    >
      {trimmedLabel}
    </Comp>
  );
});

Tag.displayName = 'Tag';
