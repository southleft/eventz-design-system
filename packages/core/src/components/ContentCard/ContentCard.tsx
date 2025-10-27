// packages/core/src/components/ContentCard/ContentCard.tsx
import * as React from 'react';
import { Badge } from '../Badge';
import { collapseWhitespace, composeClasses } from '../../utilities';

type Layout = 'vertical' | 'horizontal' | 'post';

type ContentCardLabel = {
  icon?: React.ReactNode;
  label: string;
};

type ContentCardOwnProps = {
  layout?: Layout;
  focusable?: boolean;
  title: string;
  subtitle?: string;
  description?: string;
  imgSrc?: string;
  imgAlt?: string;
  badge?: string;
  labels?: ReadonlyArray<ContentCardLabel>;
  ariaLabel?: string;
};

export interface ContentCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'>,
    ContentCardOwnProps {}

const baseClasses = `
  outline-none rounded-md border-0
  data-[is-focusable=true]:focus-visible:ring-2 data-[is-focusable=true]:focus-visible:ring-offset-2
  data-[is-focusable=true]:focus-visible:ring-comp-border-focus-ring data-[is-focusable=true]:focus-visible:ring-offset-color-background-default
`;

const mediaClasses = `
  relative overflow-hidden rounded-sm border-0
  [&>img]:w-288 [&>img]:h-288 [&>img]:object-cover
`;

const badgeClasses = `
  absolute top-2 left-2
`;

const subtitleClasses = `
  text-xs text-color-content-subtle
`;

const titleClasses = `
  text-color-content-default text-base sm:text-lg
`;

const descriptionClasses = `
  text-color-content-weak text-sm
`;

const metaClasses = `
  mt-2 flex flex-wrap gap-2 items-center
`;

const metaItemClasses = `
  inline-flex gap-1 text-xs text-color-content-subtle
`;

const metaIconClasses = `
  shrink-0 [&>svg]:size-[13px]
`;

const layoutVariantClasses: Record<Layout, string> = {
  vertical: `
    flex flex-col items-start text-left p-4 gap-3
    sm:p-6 sm:gap-4
  `,
  horizontal: `
    grid grid-cols-[168px_1fr] gap-4 items-start p-4
    sm:p-6
  `,
  post: `
    flex flex-col items-start text-left w-288 p-2
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
    const isNonEmpty = (v?: string): v is string => typeof v === 'string' && v.trim() !== '';
    const hasMedia = isNonEmpty(imgSrc);
    const hasBadge = hasMedia && isNonEmpty(badge);
    const labelsList: ReadonlyArray<ContentCardLabel> = Array.isArray(labels) ? labels : [];
    const hasSubtitle = isNonEmpty(subtitle);
    const hasDescription = isNonEmpty(description);
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
    const metaItemClassName = collapseWhitespace(composeClasses(metaItemClasses));
    const metaIconClassName = collapseWhitespace(composeClasses(metaIconClasses));

    return (
      <div
        ref={ref}
        className={baseClassName}
        data-slot="base"
        tabIndex={focusable ? 0 : undefined}
        role={focusable ? 'group' : undefined}
        data-is-focusable={focusable ? 'true' : undefined}
        aria-label={focusable && isNonEmpty(ariaLabel) ? ariaLabel : undefined}
        {...rest}
      >
        {hasMedia && (
          <div className={mediaClassName} data-slot="media">
            <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" />
            {hasBadge && (
              <div className={badgeClassName} data-slot="badge">
                <Badge variant="brand" label={badge} />
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
              <span key={`${label}-${index}`} className={metaItemClassName} data-meta-item>
                {icon ? (
                  <span aria-hidden="true" className={metaIconClassName}>
                    {icon}
                  </span>
                ) : null}
                <span>{label}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ContentCard.displayName = 'ContentCard';
