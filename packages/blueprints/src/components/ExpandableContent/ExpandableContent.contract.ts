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
      { slot: 'control', tag: 'button' }
    ]
  },

  styleMap: true,

  hints: {
    a11y:
      'Slots: content is public and receives data-state="open" | "closed"; control is a private IconButton (ChevronDownIcon) that always renders, toggles expansion, and rotates. The control forwards aria-expanded and points aria-controls at the collapsible content region. Closed state clamps content to 75px max-height with overflow hidden/ellipsis; open state reveals full height via a smooth max-height transition driven by the content slot data-state.'
  }
});
