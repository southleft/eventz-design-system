import { defineContract } from '../../utilities';

export const DialogContract = defineContract({
  component: 'Dialog',
  description: 'Modal overlay using Radix Dialog. Required trigger; optional left/right navigation controls; three sizes.',
  base: 'Dialog',

  props: {
    trigger: { type: 'slot', required: true },

    size: { type: 'enum', options: ['sm', 'md', 'lg'] as const, default: 'md' },

    hasNavigation: { type: 'boolean', default: false },

    closeIcon: { type: 'slot' },
    controlLeftIcon: { type: 'slot' },
    controlRightIcon: { type: 'slot' },

    onControlLeftClick: { type: 'callback', args: ['event'] },
    onControlRightClick: { type: 'callback', args: ['event'] }
  },

  // Structural slots (parity with styleMap)
  slots: [
    'trigger',
    'portal',
    'overlay',
    'content',
    'close',
    'navigation',
    'controlLeft',
    'controlRight'
  ] as const,

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Dialog'] as const },
    notes: [
      'Render structure: Root → Trigger(asChild) + Portal(Overlay + Content).',
      'Inside Content: a close row (IconButton), then the consumer content.',
      'When hasNavigation=true, render both left/right IconButtons absolutely positioned around content.',
      'Icon-only controls (close/left/right) require non-empty aria-labels at runtime and icons should be aria-hidden.',
      'Overlay click and Escape to close use Radix defaults (no extra handling here).',
      'Root passes through Radix Root props at runtime; do not invent additional props.'
    ] as const
  }
});
