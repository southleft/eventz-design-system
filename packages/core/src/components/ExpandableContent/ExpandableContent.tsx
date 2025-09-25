// packages/core/src/components/ExpandableContent/ExpandableContent.tsx
import * as React from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { IconButton } from '../IconButton';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

const contentBaseClasses = `peer overflow-hidden transition-[max-height] duration-200 ease-in-out`;
const contentClosedClasses = `data-[state=closed]:mh-75 data-[state=closed]:line-clamp-3`;
const controlClasses = `text-center transition-transform peer-data-[state=open]:rotate-180 peer-data-[state=closed]:rotate-0`;

export interface ExpandableContentProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export const ExpandableContent = React.forwardRef<HTMLDivElement, ExpandableContentProps>(
  (
    { defaultExpanded = false, expanded: expandedProp, onExpandedChange, className, ...rest },
    ref
  ) => {
    const contentId = React.useId();
    const isControlled = expandedProp !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded);

    const expanded = isControlled ? Boolean(expandedProp) : uncontrolledExpanded;

    const handleToggle = () => {
      const nextExpanded = !expanded;
      if (!isControlled) {
        setUncontrolledExpanded(nextExpanded);
      }
      onExpandedChange?.(nextExpanded);
    };

    const { children: contentChildren, ...restWithoutChildren } = rest;

    const contentClassName = collapseWhitespace(
      composeClasses(contentBaseClasses, expanded ? undefined : contentClosedClasses)
    );

    const controlClassName = collapseWhitespace(composeClasses(controlClasses));

    return (
      <div ref={ref} className={className} {...restWithoutChildren}>
        <div id={contentId} data-state={expanded ? 'open' : 'closed'} className={contentClassName}>
          {contentChildren}
        </div>
        <IconButton
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={handleToggle}
          ariaLabel="Toggle expanded content"
          icon={<ChevronDownIcon />}
          className={controlClassName}
        />
      </div>
    );
  }
);

ExpandableContent.displayName = 'ExpandableContent';
