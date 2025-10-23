'use client';

import * as React from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { KeyboardArrowDownIcon } from '../../icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

const baseClasses = `
  [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-offset-4 [&:has(:focus-visible)]:ring-comp-border-focus-ring [&:has(:focus-visible)]:ring-offset-color-background-default
`;
const containerClasses = `flex flex-col w-full`;
const headerClasses = `border mt-auto mb-auto border-none`;
const itemClasses = `
  bg-comp-accordion-item-color-background-default text-comp-accordion-item-color-foreground-default rounded-md
`;
const triggerClasses = `
  text-color-content-default hover:text-color-content-default-hover border-none
  w-full flex justify-between outline-none bg-background-none pt-2 pb-2 pl-1 pr-1 group
`;
const imageClasses = `[&_img]:h-24 [&_img]:w-24 [&_img]:rounded-[4px] overflow-hidden [&_img]:object-cover`;
const titleClasses = `text-base lg:text-lg`;
const iconContainerClasses = `shrink-0`;
const iconClasses = `transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0 size-20`;
const contentClasses = `text-color-content-weak text-sm pl-1 pr-1`;
const introClasses = `text-color-content-weak text-sm`;
const emphasisStrongClasses = `font-bold`;
const triggerLabelGroupClasses = `inline-flex items-center gap-8`;

type AccordionRootProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>;

export interface AccordionProps
  extends Omit<AccordionRootProps, 'children' | 'type' | 'collapsible' | 'className'>,
    React.PropsWithChildren<{
      className?: string;
    }> {
  title: string;
  image?: React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>;
  emphasis?: 'strong' | 'weak';
  intro?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ title, image, emphasis = 'strong', intro, children, className, ...rootProps }, ref) => {
    const rootClassName = collapseWhitespace(
      composeClasses(baseClasses, containerClasses, className)
    );

    const itemClassName = collapseWhitespace(composeClasses(itemClasses));
    const headerClassName = collapseWhitespace(composeClasses(headerClasses));
    const triggerClassName = collapseWhitespace(composeClasses(triggerClasses));
    const imageClassName = collapseWhitespace(composeClasses(imageClasses));
    const titleClassName = collapseWhitespace(
      composeClasses(titleClasses, emphasis === 'strong' ? emphasisStrongClasses : '')
    );
    const iconContainerClassName = collapseWhitespace(composeClasses(iconContainerClasses));
    const iconClassName = collapseWhitespace(composeClasses(iconClasses));
    const contentClassName = collapseWhitespace(composeClasses(contentClasses));
    const introClassName = collapseWhitespace(composeClasses(introClasses));
    const triggerLabelGroupClassName = collapseWhitespace(composeClasses(triggerLabelGroupClasses));

    return (
      <RadixAccordion.Root
        {...rootProps}
        ref={ref}
        type="single"
        className={rootClassName}
        collapsible
        data-slot="container"
      >
        <RadixAccordion.Item
          value={
            (rootProps as { value?: string; defaultValue?: string }).value ??
            (rootProps as { value?: string; defaultValue?: string }).defaultValue ??
            'accordionContent'
          }
          className={itemClassName}
          data-slot="item"
        >
          <RadixAccordion.Header className={headerClassName} data-slot="header">
            <RadixAccordion.Trigger className={triggerClassName} data-slot="trigger">
              <span className={triggerLabelGroupClassName} data-slot="triggerLabelGroup">
                {image ? (
                  <span className={imageClassName} aria-hidden="true" data-slot="image">
                    {image}
                  </span>
                ) : null}
                <span className={titleClassName} data-slot="title">
                  {title}
                </span>
              </span>
              <span className={iconContainerClassName} aria-hidden="true" data-slot="icon">
                <KeyboardArrowDownIcon className={iconClassName} data-slot="iconGlyph" />
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className={contentClassName} data-slot="content">
            {intro ? (
              <p className={introClassName} data-slot="intro">
                {intro}
              </p>
            ) : null}
            {children}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      </RadixAccordion.Root>
    );
  }
);

Accordion.displayName = 'Accordion';
