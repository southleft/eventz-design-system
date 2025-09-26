// packages/blueprints/src/components/Alert/Alert.contract.ts
import { defineContract } from '../../utilities';

export const AlertContract = defineContract({
  component: 'Alert',
  description: 'Inline status banner with optional title, link, icons, and dismiss control.',
  base: 'div',

  props: {
    variant: {
      type: 'enum',
      options: ['success', 'info', 'warning', 'danger'] as const,
      default: 'info'
    },
    title: { type: 'string' },
    textLink: { type: 'object' },
    isDismissible: { type: 'boolean', default: true },
    withIcon: { type: 'boolean', default: true },
    closeIcon: { type: 'slot' },
    onCloseClick: { type: 'callback', args: ['e: SyntheticEvent'] }
  },

  slots: ['container', 'icon', 'content', 'title', 'description', 'textLink', 'closeIcon'] as const,

  styleMap: true,

  hints: {
    a11y: {
      recommendation:
        'Use role="alert" for the danger variant (assertive); otherwise use role="status" (polite).'
    }
  }
});
