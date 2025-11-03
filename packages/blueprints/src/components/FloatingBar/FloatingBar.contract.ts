import { defineContract } from '../../utilities';

export const FloatingBarContract = defineContract({
  component: 'FloatingBar',
  description:
    'Fixed bottom utility bar with optional start/end scroll buttons and two consumer-owned slots: content and actions. Component does not manage scrolling; it only emits scroll intent via callbacks.',
  base: 'div',

  props: {
    ariaLabel: {
      type: 'string',
      description: 'Accessible name when the container is given role="region".'
    },
    labelledBy: {
      type: 'string',
      description: 'IDREF to an external label; alternative to ariaLabel.'
    },

    isScrollable: {
      type: 'boolean',
      default: false,
      description:
        'When true, show left/right scroll IconButtons. Component does not manage scrolling.'
    },

    // Scroll intent callbacks (fired when the respective button is activated)
    onLeftScroll: {
      type: 'callback',
      args: ['event?: MouseEvent | KeyboardEvent'],
      description:
        'Called when the left scroll button is activated. Component does not manage scrolling; consumers implement behavior.'
    },
    onRightScroll: {
      type: 'callback',
      args: ['event?: MouseEvent | KeyboardEvent'],
      description:
        'Called when the right scroll button is activated. Component does not manage scrolling; consumers implement behavior.'
    }
  },

  // Declared slots — consumer supplies ReactNodes; we only lay them out.
  slots: ['content', 'actions'] as const,

  layout: {
    type: 'container',
    tag: 'div',
    className: ['flex items-center justify-between', 'gap-2'],
    children: [
      {
        tag: 'span',
        className: ['_startButton', 'shrink-0'],
        comment:
          'Auto-rendered when isScrollable is true: IconButton(variant="bare", icon=ArrowBackIcon, ariaLabel="Scroll left"). On activation, call onLeftScroll if provided; otherwise render disabled.'
      },
      {
        tag: 'div',
        className: ['_rail', 'flex', 'items-center', 'gap-2', 'min-w-0', 'flex-1'],
        children: [
          { slot: 'content', tag: 'div', className: ['_content', 'min-w-0', 'flex-1'] },
          {
            slot: 'actions',
            tag: 'div',
            className: ['_actions', 'inline-flex', 'gap-2', 'shrink-0']
          }
        ]
      },
      {
        tag: 'span',
        className: ['_endButton', 'shrink-0'],
        comment:
          'Auto-rendered when isScrollable is true: IconButton(variant="bare", icon=ArrowForwardIcon, ariaLabel="Scroll right"). On activation, call onRightScroll if provided; otherwise render disabled.'
      }
    ]
  },

  rules: [
    {
      hint: 'When isScrollable=true, render a left IconButton(variant="bare", icon=ArrowBackIcon, ariaLabel="Scroll left"). If onLeftScroll is defined, call it on activation; otherwise render the button disabled (aria-disabled, disabled).'
    },
    {
      hint: 'When isScrollable=true, render a right IconButton(variant="bare", icon=ArrowForwardIcon, ariaLabel="Scroll right"). If onRightScroll is defined, call it on activation; otherwise render the button disabled (aria-disabled, disabled).'
    }
  ],

  styleMap: true,

  hints: {
    a11y: 'Optionally role="region" when labelled by ariaLabel/labelledBy.'
  }
});
