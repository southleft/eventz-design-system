// packages/core/src/components/ContentCard/ContentCard.tsx
import * as React from 'react';
import { Badge } from '../Badge';
import { ArrowForwardIcon } from '../../../icons';
import { collapseWhitespace, composeClasses } from '../../../utilities';

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
  href?: string;
};

type NativeDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'>;
type AnchorLinkProps = Pick<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel' | 'download' | 'hrefLang' | 'ping' | 'referrerPolicy'
>;

export interface ContentCardProps extends NativeDivProps, AnchorLinkProps, ContentCardOwnProps {}

const baseClasses = `
  outline-none rounded-md border-0 group bg-background-none hover:bg-color-background-default
  data-[is-focusable=true]:focus-visible:ring-2 data-[is-focusable=true]:focus-visible:ring-offset-2
  data-[is-focusable=true]:focus-visible:ring-comp-border-focus-ring data-[is-focusable=true]:focus-visible:ring-offset-color-background-default
`;

const mediaVariantClasses = {
  vertical: `
    relative overflow-hidden rounded-sm border-0
    [&>img]:w-168 [&>img]:h-168 [&>img]:object-cover [&>img]:group-hover:opacity-30
  `,
  horizontal: `
    relative overflow-hidden rounded-sm border-0 row-span-4
    [&>img]:w-104 [&>img]:h-104 [&>img]:object-cover [&>img]:group-hover:opacity-30
  `,
  post: `
    relative overflow-hidden rounded-sm border-0
    [&>img]:w-288 [&>img]:h-288 [&>img]:object-cover [&>img]:group-hover:opacity-30
  `
};

const badgeClasses = `
  absolute top-2 left-2
`;

const subtitleClasses = `
  text-xs text-color-content-subtle group-hover:text-color-content-subtle-hover
`;

const titleClasses = `
  inline-flex justify-between items-center w-full text-color-content-default group-hover:text-color-content-default-hover text-base sm:text-lg
`;

const titleIconClasses = `
  ml-1 shrink-0 [&>svg]:size-[20px] invisible group-hover:visible group-hover:text-color-content-brand
`;

const descriptionClasses = `
  text-color-content-weak group-hover:text-color-content-weak-hover text-sm
`;

const metaClasses = `
  mt-2 flex flex-wrap gap-2 items-center
`;

const metaItemClasses = `
  inline-flex items-center gap-1 text-xs text-color-content-subtle group-hover:text-color-content-subtle-hover
`;

const metaIconClasses = `
  shrink-0 [&>svg]:size-3
`;

const layoutVariantClasses: Record<Layout, string> = {
  vertical: `
    flex flex-col items-start text-left w-168 p-2
  `,
  horizontal: `
    grid [&:has(img)]:grid-cols-[112px_1fr] items-start p-2 w-340
  `,
  post: `
    flex flex-col items-start text-left w-288 p-2
  `
};

export const ContentCard = React.forwardRef<HTMLDivElement | HTMLAnchorElement, ContentCardProps>(
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
      href,
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
    const isLink = isNonEmpty(href);

    const baseClassName = collapseWhitespace(
      composeClasses(baseClasses, layoutVariantClasses[layout], className)
    );
    const mediaClassName = collapseWhitespace(composeClasses(mediaVariantClasses[layout]));
    const badgeClassName = collapseWhitespace(composeClasses(badgeClasses));
    const subtitleClassName = collapseWhitespace(composeClasses(subtitleClasses));
    const titleClassName = collapseWhitespace(composeClasses(titleClasses));
    const descriptionClassName = collapseWhitespace(composeClasses(descriptionClasses));
    const titleIconClassName = collapseWhitespace(composeClasses(titleIconClasses));
    const metaClassName = collapseWhitespace(composeClasses(metaClasses));
    const metaItemClassName = collapseWhitespace(composeClasses(metaItemClasses));
    const metaIconClassName = collapseWhitespace(composeClasses(metaIconClasses));

    const baseElementProps = {
      className: baseClassName,
      'data-slot': 'base',
      'data-is-focusable': focusable || isLink ? 'true' : undefined,
      'aria-label': (focusable || isLink) && isNonEmpty(ariaLabel) ? ariaLabel : undefined
    };

    const cardContent = (
      <>
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
          <span>{title}</span>
          {isLink ? (
            <span aria-hidden="true" className={titleIconClassName}>
              <ArrowForwardIcon />
            </span>
          ) : null}
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
      </>
    );

    if (isLink) {
      const anchorAttributes = rest as AnchorLinkProps;
      return (
        <a
          {...anchorAttributes}
          {...baseElementProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
        >
          {cardContent}
        </a>
      );
    }

    const divAttributes = rest as NativeDivProps;

    return (
      <div
        {...divAttributes}
        {...baseElementProps}
        ref={ref as React.Ref<HTMLDivElement>}
        tabIndex={focusable ? 0 : undefined}
        role={focusable ? 'group' : undefined}
      >
        {cardContent}
      </div>
    );
  }
);

ContentCard.displayName = 'ContentCard';
