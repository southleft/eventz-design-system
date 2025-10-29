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
  grid [&:has(img)]:grid-cols-[112px_1fr] items-start p-2 w-340
  [&_[data-slot=media]]:row-span-4 [&_[data-slot=media]>img]:w-104 [&_[data-slot=media]>img]:h-104
`;

const mediaClasses = `
  relative overflow-hidden rounded-sm border-0 shrink-0 [&>img]:object-cover
`;

const subtitleClasses = `
  text-xs text-color-content-subtle group-hover:text-color-content-subtle-hover
`;

const titleClasses = `
  inline-flex justify-between items-center w-full text-color-content-default
  group-hover:text-color-content-default-hover text-base sm:text-lg
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

const controlClasses = `
  absolute right-2 top-2 inline-grid place-items-center rounded-full backdrop-blur-sm bg-color-background-soft/60 p-1.5
`;

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  (
    { subtitle, title, labels, imgSrc, imgAlt, control, className, ...rest },
    ref
  ) => {
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
    const titleClassName = collapseWhitespace(composeClasses(titleClasses));
    const metaClassName = collapseWhitespace(composeClasses(metaClasses));
    const metaItemClassName = collapseWhitespace(composeClasses(metaItemClasses));
    const metaIconClassName = collapseWhitespace(composeClasses(metaIconClasses));
    const controlClassName = collapseWhitespace(composeClasses(controlClasses));

    return (
      <div
        {...rest}
        ref={ref}
        className={baseClassName}
        data-slot="base"
      >
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
          <div className={titleClassName} data-slot="title">
            {title}
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
