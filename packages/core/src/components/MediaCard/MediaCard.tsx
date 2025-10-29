// packages/core/src/components/MediaCard/MediaCard.tsx
import * as React from 'react';
import { collapseWhitespace, composeClasses } from '../../utilities';

type MediaCardLabel = {
  icon?: React.ReactNode;
  label: string;
};

type NativeDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'>;

export interface MediaCardProps extends NativeDivProps {
  subtitle?: string;
  title: string;
  labels?: ReadonlyArray<MediaCardLabel>;
  imgSrc?: string;
  imgAlt?: string;
  control: React.ReactNode;
}

const baseClasses = `
  relative outline-none rounded-md border-0 group bg-background-none hover:bg-color-background-default
  grid [&:has(img)]:grid-cols-[92px_1fr] sm:[&:has(img)]:grid-cols-[112px_1fr] items-start p-2 max-w-340 sm:w-340
  [&_[data-slot=media]]:row-span-4
  [&:has(:focus-visible)]:ring-offset-2 [&:has(:focus-visible)]:ring-2
  [&:has(:focus-visible)]:ring-comp-border-focus-ring
  [&:has(:focus-visible)]:ring-offset-color-background-default
`;

const mediaClasses = `
  relative overflow-hidden rounded-sm border-0 shrink-0
  [&>img]:w-80 [&>img]:h-80 sm:[&>img]:w-104 sm:[&>img]:h-104
  [&>img]:object-cover [&>img]:group-hover:opacity-30
`;

const subtitleClasses = `
  text-xs mt-1 sm:mt-1 sm:mt-6 text-color-content-subtle group-hover:text-color-content-subtle-hover
  min-w-0 w-full
`;

const titleWrapperClasses = `
  inline-flex justify-between items-center w-120 min-w-0 mt-1
`;

const titleTextClasses = `
  block text-color-content-default
  group-hover:text-color-content-default-hover text-base sm:text-lg
  flex-1 min-w-0 truncate mb-8 sm:mb-12
`;

const metaClasses = `
  mt-1 flex flex-wrap gap-2 items-center
  min-w-0 w-full
`;

const metaItemClasses = `
  inline-flex items-center gap-1 text-xs text-color-content-subtle group-hover:text-color-content-subtle-hover
`;

const metaIconClasses = `
  shrink-0 [&>svg]:size-3
`;

const controlClasses = `
  absolute right-2 top-20 sm:top-32 inline-grid place-items-center rounded-full backdrop-blur-sm bg-color-background-soft/60 p-1.5
`;

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  ({ subtitle, title, labels, imgSrc, imgAlt, control, className, ...rest }, ref) => {
    const isNonEmpty = (value?: string): value is string =>
      typeof value === 'string' && value.trim().length > 0;

    const hasMedia = isNonEmpty(imgSrc);
    const hasSubtitle = isNonEmpty(subtitle);
    const labelsList: ReadonlyArray<MediaCardLabel> = Array.isArray(labels) ? labels : [];
    const hasTitle = isNonEmpty(title);
    const hasMeta = labelsList.length > 0;
    const imageAlt = typeof imgAlt === 'string' ? imgAlt : '';

    const baseClassName = collapseWhitespace(composeClasses(baseClasses, className));
    const mediaClassName = collapseWhitespace(composeClasses(mediaClasses));
    const subtitleClassName = collapseWhitespace(composeClasses(subtitleClasses));
    const titleWrapperClassName = collapseWhitespace(composeClasses(titleWrapperClasses));
    const titleTextClassName = collapseWhitespace(composeClasses(titleTextClasses));
    const metaClassName = collapseWhitespace(composeClasses(metaClasses));
    const metaItemClassName = collapseWhitespace(composeClasses(metaItemClasses));
    const metaIconClassName = collapseWhitespace(composeClasses(metaIconClasses));
    const controlClassName = collapseWhitespace(composeClasses(controlClasses));

    return (
      <div {...rest} ref={ref} className={baseClassName} data-slot="base">
        {hasMedia ? (
          <div className={mediaClassName} data-slot="media">
            <img src={imgSrc} alt={imageAlt} loading="lazy" decoding="async" />
          </div>
        ) : null}

        {hasSubtitle ? (
          <div className={subtitleClassName} data-slot="subtitle">
            {subtitle}
          </div>
        ) : null}

        {hasTitle ? (
          <div className={titleWrapperClassName} data-slot="title">
            <span className={titleTextClassName}>{title}</span>
          </div>
        ) : null}

        {hasMeta ? (
          <div className={metaClassName} data-slot="meta">
            {labelsList.map(({ icon, label }, index) => (
              <span key={`${label}-${index}`} className={metaItemClassName} data-slot="metaItem">
                {icon ? (
                  <span aria-hidden="true" className={metaIconClassName} data-slot="metaIcon">
                    {icon}
                  </span>
                ) : null}
                <span>{label}</span>
              </span>
            ))}
          </div>
        ) : null}

        {control ? (
          <div className={controlClassName} data-slot="control">
            {control}
          </div>
        ) : null}
      </div>
    );
  }
);

MediaCard.displayName = 'MediaCard';
