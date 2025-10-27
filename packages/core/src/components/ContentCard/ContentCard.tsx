// packages/core/src/components/ContentCard/ContentCard.tsx
import * as React from 'react';
import { Badge } from '../Badge';
import { collapseWhitespace, composeClasses } from '../../utilities';

type Layout = 'vertical' | 'horizontal' | 'post';

type ContentCardOwnProps = {
  layout?: Layout;
  focusable?: boolean;
  title: string;
  subtitle?: string;
  description?: string;
  imgSrc?: string;
  imgAlt?: string;
  badge?: string;
  labels?: ReadonlyArray<{
    icon?: React.ReactNode;
    label: string;
  }>;
  ariaLabel?: string;
};

export interface ContentCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'>,
    ContentCardOwnProps {}

const baseClasses = `
  outline-none
  rounded-md
  border-0
  data-[is-focusable=true]:focus-visible:ring-2
  data-[is-focusable=true]:focus-visible:ring-offset-2
  data-[is-focusable=true]:focus-visible:ring-comp-border-focus-ring
  data-[is-focusable=true]:focus-visible:ring-offset-color-background-default
`;

const mediaClasses = `
  relative
  w-full
  overflow-hidden
  rounded-sm
  border-0
  [&>img]:w-full
  [&>img]:h-full
  [&>img]:object-cover
`;

const badgeClasses = `
  absolute
  top-2
  left-2
`;

const subtitleClasses = `
  text-xs
  text-color-content-subtle
`;

const titleClasses = `
  text-color-content-default
  text-lg
`;

const descriptionClasses = `
  text-color-content-weak
  text-sm
`;

const metaClasses = `
  mt-2
  flex
  flex-wrap
  gap-2
  items-center
`;

const layoutVariantClasses: Record<Layout, string> = {
  vertical: `
    flex
    flex-col
    items-start
    text-left
    p-4
    gap-3
    sm:p-6
    sm:gap-4
  `,
  horizontal: `
    grid
    grid-cols-[168px_1fr]
    gap-4
    items-start
    p-4
    sm:p-6
  `,
  post: `
    flex
    flex-col
    items-start
    text-left
    p-0
    gap-2
    sm:gap-3
  `
};

export const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  (
    {
      layout = 'vertical',
      focusable = false,
      title,
      subtitle,
      description,
      imgSrc,
      imgAlt,
      badge,
      labels,
      ariaLabel,
      className,
      ...rest
    },
    ref
  ) => {
    const hasMedia = Boolean(imgSrc);
    const hasBadge = hasMedia && Boolean(badge);
    const labelsList = labels ?? [];
    const hasSubtitle = Boolean(subtitle);
    const hasDescription = Boolean(description);
    const hasMeta = labelsList.length > 0;

    const baseClassName = collapseWhitespace(
      composeClasses(baseClasses, layoutVariantClasses[layout], className)
    );
    const mediaClassName = collapseWhitespace(composeClasses(mediaClasses));
    const badgeClassName = collapseWhitespace(composeClasses(badgeClasses));
    const subtitleClassName = collapseWhitespace(composeClasses(subtitleClasses));
    const titleClassName = collapseWhitespace(composeClasses(titleClasses));
    const descriptionClassName = collapseWhitespace(composeClasses(descriptionClasses));
    const metaClassName = collapseWhitespace(composeClasses(metaClasses));

    return (
      <div
        ref={ref}
        className={baseClassName}
        data-slot="base"
        tabIndex={focusable ? 0 : undefined}
        role={focusable ? 'group' : undefined}
        data-is-focusable={focusable ? 'true' : undefined}
        aria-label={ariaLabel ?? undefined}
        {...rest}
      >
        {hasMedia && (
          <div className={mediaClassName} data-slot="media">
            <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
            {hasBadge && (
              <div className={badgeClassName} data-slot="badge">
                <Badge label={badge} />
              </div>
            )}
          </div>
        )}

        {hasSubtitle && (
          <div className={subtitleClassName} data-slot="subtitle">
            {subtitle}
          </div>
        )}

        <div className={titleClassName} data-slot="title">
          {title}
        </div>

        {hasDescription && (
          <div className={descriptionClassName} data-slot="description">
            {description}
          </div>
        )}

        {hasMeta && (
          <div className={metaClassName} data-slot="meta">
            {labelsList.map(({ icon, label }, index) => (
              <Badge key={`${label}-${index}`} icon={icon} label={label} />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ContentCard.displayName = 'ContentCard';
