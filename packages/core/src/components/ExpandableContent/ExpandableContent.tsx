// packages/core/src/components/ExpandableContent/ExpandableContent.tsx
import * as React from 'react';
import { KeyboardArrowDownIcon } from '../../icons';
import { IconButton } from '../IconButton';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';

const CLOSED_MAX_HEIGHT_PX = 75;

const contentBaseClasses = `peer overflow-hidden transition-[max-height] duration-200 ease-in-out text-color-content-weak text-sm`;
const contentClosedClasses = `data-[state=closed]:mh-75 data-[state=closed]:line-clamp-3`;
const controlWrapperClasses = `flex justify-center pt-16 [&>button]:transition-transform peer-data-[state=open]:[&>button]:rotate-180 peer-data-[state=closed]:[&>button]:rotate-0`;

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
    const contentRef = React.useRef<HTMLDivElement>(null);
    const lastOpenHeightRef = React.useRef(0);
    const didMountRef = React.useRef(false);
    const contentId = React.useId();
    const isControlled = expandedProp !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded);

    const expanded = isControlled ? Boolean(expandedProp) : uncontrolledExpanded;

    React.useEffect(() => {
      const el = contentRef.current;
      /* istanbul ignore next */
      if (!el) return;
      if (!didMountRef.current) {
        didMountRef.current = true;
        el.style.maxHeight = '';
        el.style.webkitLineClamp = '';
        el.style.display = '';
        return;
      }

      const measuredScrollHeight = el.scrollHeight;

      const forceReflow = () => {
        void el.offsetHeight;
      };

      if (expanded) {
        lastOpenHeightRef.current = measuredScrollHeight;
        el.style.maxHeight = `${CLOSED_MAX_HEIGHT_PX}px`;
        forceReflow();
        el.style.maxHeight = `${measuredScrollHeight}px`;

        el.style.webkitLineClamp = '';
        el.style.display = '';

        const onEnd = () => {
          el.style.maxHeight = '';
          el.removeEventListener('transitionend', onEnd);
        };
        el.addEventListener('transitionend', onEnd);
      } else {
        el.style.webkitLineClamp = 'unset';
        el.style.display = 'block';

        const fromHeight = lastOpenHeightRef.current || measuredScrollHeight;
        el.style.maxHeight = `${fromHeight}px`;
        forceReflow();
        el.style.maxHeight = `${CLOSED_MAX_HEIGHT_PX}px`;
      }
    }, [expanded]);

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
    const controlWrapperClassName = collapseWhitespace(composeClasses(controlWrapperClasses));

    return (
      <div ref={ref} className={className} {...restWithoutChildren}>
        <div
          ref={contentRef}
          id={contentId}
          data-state={expanded ? 'open' : 'closed'}
          className={contentClassName}
        >
          {contentChildren}
        </div>
        <div className={controlWrapperClassName}>
          <IconButton
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={handleToggle}
            ariaLabel="Toggle expanded content"
            icon={<KeyboardArrowDownIcon />}
            variant="knockout"
          />
        </div>
      </div>
    );
  }
);

ExpandableContent.displayName = 'ExpandableContent';
