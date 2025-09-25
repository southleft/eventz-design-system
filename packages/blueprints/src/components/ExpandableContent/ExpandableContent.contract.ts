// packages/blueprints/src/components/ExpandableContent/ExpandableContent.contract.ts
import { defineContract } from '../../utilities';

export const ExpandableContentContract = defineContract({
  component: 'ExpandableContent',
  description:
    'Single-region expandable container with a rotating icon-only control that reveals additional content. Supports uncontrolled (defaultExpanded) and controlled (expanded + onExpandedChange) usage.',
  base: 'div',

  props: {
    defaultExpanded: {
      type: 'boolean',
      default: false,
      description: 'Sets the initial uncontrolled expanded state (defaults to collapsed).'
    },
    expanded: {
      type: 'boolean',
      description: 'Controls the expanded state when provided; omit to use the internal state.'
    },
    onExpandedChange: {
      type: 'callback',
      description: 'Fires whenever the expand/collapse state changes.',
      args: ['expanded: boolean']
    }
  },

  slots: ['content', 'control'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { slot: 'content', tag: 'div' },
      { slot: 'control', tag: 'div' }
    ]
  },

  styleMap: true,

  hints: {
    a11y:
      'Content slot receives children and data-state="open" | "closed"; control slot is a private wrapper that always renders and mounts an IconButton (ChevronDownIcon). The IconButton forwards aria-expanded and aria-controls pointing to the content region ID. Closed state clamps content to 75px with overflow hidden and line-clamp; open state reveals full height via an animated max-height transition. Control rotation is driven by peer-data selectors on the wrapper.'
  }
});
