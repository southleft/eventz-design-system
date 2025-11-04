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
    dataPart: 'container',
    children: [
      {
        tag: 'span',
        dataPart: '_startButton',
        when: { isScrollable: true },
        comment:
          'Auto-rendered when isScrollable is true: IconButton(variant="bare", icon=ArrowBackIcon, ariaLabel="Scroll left"). If onLeftScroll is defined, call it on activation; otherwise render the button disabled.'
      },
      {
        tag: 'div',
        dataPart: '_rail',
        children: [
          { slot: 'content', tag: 'div', dataPart: '_content' },
          { slot: 'actions', tag: 'div', dataPart: '_actions' }
        ]
      },
      {
        tag: 'span',
        dataPart: '_endButton',
        when: { isScrollable: true },
        comment:
          'Auto-rendered when isScrollable is true: IconButton(variant="bare", icon=ArrowForwardIcon, ariaLabel="Scroll right"). If onRightScroll is defined, call it on activation; otherwise render the button disabled.'
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
    a11y:
      'Root sets role="region" only when ariaLabel or labelledBy provide a non-empty accessible name. Trim whitespace from both props before applying aria attributes.',
    domHooks: {
      container: {
        dataPart: 'container',
        selector: '[data-part="container"]',
        state: 'data-scrollable="true" when isScrollable is truthy'
      },
      startButton: {
        dataPart: '_startButton',
        selector: '[data-part="_startButton"]',
        renderedWhen: 'isScrollable=true'
      },
      rail: { dataPart: '_rail', selector: '[data-part="_rail"]' },
      content: { dataPart: '_content', selector: '[data-part="_content"]' },
      actions: { dataPart: '_actions', selector: '[data-part="_actions"]' },
      endButton: {
        dataPart: '_endButton',
        selector: '[data-part="_endButton"]',
        renderedWhen: 'isScrollable=true'
      }
    }
  }
});
