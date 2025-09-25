import * as React from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

const BASE_CLASSES = [
  'w-full',
  'bg-color-background-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-4',
  'focus-visible:ring-comp-border-focus-ring',
  'focus-visible:ring-offset-color-background-default'
] as const;

const SLOT_CLASSES = {
  container: ['flex', 'flex-col', 'w-full'] as const,
  item: [
    'bg-comp-accordion-item-color-background-default',
    'text-comp-accordion-item-color-foreground-default',
    'border',
    'border-comp-accordion-item-color-border-default',
    'rounded-md',
    'overflow-hidden'
  ] as const,
  trigger: ['w-full', 'flex', 'items-center', 'justify-between', 'outline-none'] as const,
  image: ['h-8', 'w-8', 'p-4', 'rounded-4', 'overflow-hidden', '[&_img]:object-cover'] as const,
  title: [
    'text-color-content-default',
    'text-mobile-heading-xs',
    'lg:text-heading-xs',
    'hover:text-color-content-default-hover'
  ] as const,
  icon: ['shrink-0', 'transition-transform'] as const,
  content: ['text-color-content-weak', 'text-sm'] as const,
  intro: ['text-color-content-weak', 'text-sm'] as const
} as const;

const VARIANT_CLASSES = {
  sm: [
    '[&._trigger]:px-3',
    '[&._trigger]:py-2',
    '[&._trigger]:text-sm',
    '[&._content]:px-3',
    '[&._content]:py-2',
    '[&._content]:text-sm'
  ] as const,
  md: [
    '[&._trigger]:px-4',
    '[&._trigger]:py-3',
    '[&._trigger]:text-base',
    '[&._content]:px-4',
    '[&._content]:py-3'
  ] as const,
  lg: [
    '[&._trigger]:px-5',
    '[&._trigger]:py-4',
    '[&._trigger]:text-lg',
    '[&._content]:px-5',
    '[&._content]:py-4'
  ] as const
} as const;

const STATE_CLASSES = {
  emphasisStrong: ['[&._title]:font-bold'] as const,
  itemOpen: ['[&._icon]:rotate-180'] as const,
  itemClosed: ['[&._icon]:rotate-0'] as const
} as const;

const TRIGGER_LABEL_GROUP_CLASSES = ['flex', 'items-center', 'gap-3'] as const;
const TRIGGER_LABEL_GROUP_CLASSNAME = collapseWhitespace(
  composeClasses(TRIGGER_LABEL_GROUP_CLASSES)
);

const SLOT_MARKERS = {
  container: '_container',
  item: '_item',
  trigger: '_trigger',
  image: '_image',
  title: '_title',
  icon: '_icon',
  content: '_content',
  intro: '_intro'
} as const;

const ITEM_VALUE = 'item';

type AccordionRootElement = React.ElementRef<typeof RadixAccordion.Root>;
type AccordionRootProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>;

export interface AccordionProps
  extends Omit<
    AccordionRootProps,
    'children' | 'type' | 'collapsible' | 'className' | 'value' | 'defaultValue'
  > {
  size?: 'sm' | 'md' | 'lg';
  title: string;
  image?: React.ReactNode;
  emphasis?: 'strong' | 'weak';
  intro?: string;
  children: React.ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
}

export const Accordion = React.forwardRef<AccordionRootElement, AccordionProps>(
  (
    {
      size = 'md',
      title,
      image,
      emphasis = 'strong',
      intro,
      children,
      className,
      value: valueProp,
      defaultValue: defaultValueProp,
      onValueChange,
      ...rootProps
    },
    ref
  ) => {
    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Accordion title must be a non-empty string.');
    }

    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValueProp ?? '');
    const itemValue = React.useMemo(() => {
      const controlledValue = valueProp && valueProp.trim().length > 0 ? valueProp : undefined;
      const uncontrolledDefault =
        defaultValueProp && defaultValueProp.trim().length > 0 ? defaultValueProp : undefined;
      return controlledValue ?? uncontrolledDefault ?? ITEM_VALUE;
    }, [valueProp, defaultValueProp]);

    const currentValue = isControlled ? valueProp ?? '' : internalValue;
    const isOpen = currentValue === itemValue;

    const handleValueChange = React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange]
    );

    React.useEffect(() => {
      if (!isControlled) {
        setInternalValue(defaultValueProp ?? '');
      }
    }, [isControlled, defaultValueProp]);

    const rootClassName = collapseWhitespace(
      composeClasses(
        BASE_CLASSES,
        SLOT_CLASSES.container,
        SLOT_MARKERS.container,
        VARIANT_CLASSES[size],
        className
      )
    );

    const itemClassName = collapseWhitespace(
      composeClasses(
        SLOT_CLASSES.item,
        SLOT_MARKERS.item,
        emphasis === 'strong' ? STATE_CLASSES.emphasisStrong : undefined,
        isOpen ? STATE_CLASSES.itemOpen : STATE_CLASSES.itemClosed
      )
    );

    const triggerClassName = collapseWhitespace(
      composeClasses(SLOT_CLASSES.trigger, SLOT_MARKERS.trigger)
    );

    const imageClassName = collapseWhitespace(
      composeClasses(SLOT_CLASSES.image, SLOT_MARKERS.image)
    );

    const titleClassName = collapseWhitespace(
      composeClasses(SLOT_CLASSES.title, SLOT_MARKERS.title)
    );

    const iconClassName = collapseWhitespace(
      composeClasses(SLOT_CLASSES.icon, SLOT_MARKERS.icon)
    );

    const contentClassName = collapseWhitespace(
      composeClasses(SLOT_CLASSES.content, SLOT_MARKERS.content)
    );

    const introClassName = collapseWhitespace(
      composeClasses(SLOT_CLASSES.intro, SLOT_MARKERS.intro)
    );

    return (
      <RadixAccordion.Root
        {...rootProps}
        ref={ref}
        type="single"
        collapsible
        className={rootClassName}
        value={isControlled ? valueProp : undefined}
        defaultValue={isControlled ? undefined : defaultValueProp}
        onValueChange={handleValueChange}
        data-slot="container"
      >
        <RadixAccordion.Item value={itemValue} className={itemClassName} data-slot="item">
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className={triggerClassName} data-slot="trigger">
              <span className={TRIGGER_LABEL_GROUP_CLASSNAME}>
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
