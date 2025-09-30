import { defineContract } from '../../utilities';

export const DialogContract = defineContract({
  component: 'Dialog',
  description:
    'Modal overlay using Radix Dialog. Required trigger; optional left/right navigation controls; three sizes.',
  // Radix Primitive base (Themes disallowed)
  base: 'Dialog',

  // Public API
  props: {
    // Required: consumer-provided trigger rendered via <Dialog.Trigger asChild>
    trigger: { type: 'slot', required: true },

    // Size axis (no variants). Default is medium.
    size: { type: 'enum', options: ['sm', 'md', 'lg'] as const, default: 'md' },

    // Optional navigation (both controls shown when true)
    hasNavigation: { type: 'boolean', default: false },

    // Icon slots for internal IconButtons (visual defaults are runtime concerns)
    closeIcon: { type: 'slot' },
    controlLeftIcon: { type: 'slot' },
    controlRightIcon: { type: 'slot' },

    // Optional callbacks passed through to the corresponding controls
    onControlLeftClick: { type: 'callback', args: ['e: event'] },
    onControlRightClick: { type: 'callback', args: ['e: event'] }
  },

  // Slots in render order (consumer content lives in `content`)
  // Note: `closeIcon`, `controlLeftIcon`, `controlRightIcon` are slot props above.
  slots: [
    'trigger', // Dialog.Trigger (asChild)
    'content', // children area inside Dialog.Content
    'closeIcon', // icon rendered via IconButton in a close row
    'controlLeftIcon',
    'controlRightIcon'
  ] as const,

  // StyleMap pairing enabled
  styleMap: true,

  // Structural/a11y hints for the generator (non-styling)
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
