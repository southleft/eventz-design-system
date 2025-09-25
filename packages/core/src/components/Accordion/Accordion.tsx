import * as React from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

const baseClasses = `w-full bg-color-background-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default`;
const containerClasses = `flex flex-col w-full`;
const itemClasses = `bg-comp-accordion-item-color-background-default text-comp-accordion-item-color-foreground-default border border-comp-accordion-item-color-border-default rounded-md overflow-hidden`;
const triggerClasses = `w-full flex items-center justify-between outline-none group`;
const imageClasses = `h-8 w-8 p-4 rounded-4 overflow-hidden [&_img]:object-cover`;
const titleClasses = `text-color-content-default text-mobile-heading-xs lg:text-heading-xs hover:text-color-content-default-hover`;
const iconClasses = `shrink-0 transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0`;
const contentClasses = `text-color-content-weak text-sm`;
const introClasses = `text-color-content-weak text-sm`;
const emphasisStrongClasses = `[&._title]:font-bold`;
const disabledClasses = `[&._trigger]:opacity-50 [&._trigger]:pointer-events-none`;
const triggerLabelGroupClasses = `flex items-center gap-3`;

const slotMarkers = {
  container: '_container',
  item: '_item',
  trigger: '_trigger',
  image: '_image',
  title: '_title',
  icon: '_icon',
  content: '_content',
  intro: '_intro'
} as const;

const itemValue = 'item';

type AccordionRootProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>;
type AccordionRef = React.ElementRef<typeof RadixAccordion.Root>;

export interface AccordionProps
  extends Omit<
      AccordionRootProps,
      'children' | 'type' | 'collapsible' | 'className' | 'value' | 'defaultValue' | 'onValueChange'
    >,
    React.PropsWithChildren<{
      className?: string;
    }> {
  title: string;
  image?: React.ReactNode;
  emphasis?: 'strong' | 'weak';
  intro?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Accordion = React.forwardRef<AccordionRef, AccordionProps>(
  (
    {
      title,
      image,
      emphasis = 'strong',
      intro,
      children,
      className,
      value: valueProp,
      defaultValue: defaultValueProp,
      ...rootProps
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const providedValue =
      typeof valueProp === 'string' && valueProp.trim().length > 0 ? valueProp : undefined;
    const providedDefaultValue =
      typeof defaultValueProp === 'string' && defaultValueProp.trim().length > 0
        ? defaultValueProp
        : undefined;
    const resolvedItemValue = providedValue ?? providedDefaultValue ?? itemValue;
    const isDisabled = Boolean((rootProps as Record<string, unknown>)['data-disabled']);

    const rootClassName = collapseWhitespace(
      composeClasses(baseClasses, containerClasses, slotMarkers.container, className)
    );

    const itemClassName = collapseWhitespace(
      composeClasses(
        itemClasses,
        slotMarkers.item,
        emphasis === 'strong' ? emphasisStrongClasses : undefined,
        isDisabled ? disabledClasses : undefined
      )
    );

    const triggerClassName = collapseWhitespace(
      composeClasses(triggerClasses, slotMarkers.trigger)
    );

    const imageClassName = collapseWhitespace(composeClasses(imageClasses, slotMarkers.image));

    const titleClassName = collapseWhitespace(composeClasses(titleClasses, slotMarkers.title));

    const iconClassName = collapseWhitespace(composeClasses(iconClasses, slotMarkers.icon));

    const contentClassName = collapseWhitespace(
      composeClasses(contentClasses, slotMarkers.content)
    );

    const introClassName = collapseWhitespace(composeClasses(introClasses, slotMarkers.intro));
    const triggerLabelGroupClassName = collapseWhitespace(composeClasses(triggerLabelGroupClasses));

    return (
      <RadixAccordion.Root
        {...rootProps}
        ref={ref}
        type="single"
        className={rootClassName}
        value={isControlled ? valueProp : undefined}
        defaultValue={isControlled ? undefined : defaultValueProp}
        data-slot="container"
      >
        <RadixAccordion.Item value={resolvedItemValue} className={itemClassName} data-slot="item">
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className={triggerClassName} data-slot="trigger">
              <span className={triggerLabelGroupClassName}>
                {image ? (
                  <span className={imageClassName} aria-hidden="true" data-slot="image">
                    {image}
                  </span>
                ) : null}
                <span className={titleClassName} data-slot="title">
                  {title}
                </span>
              </span>
              <span className={iconClassName} aria-hidden="true" data-slot="icon">
                <ChevronDownIcon />
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content forceMount className={contentClassName} data-slot="content">
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
