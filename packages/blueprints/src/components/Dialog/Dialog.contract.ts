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

  // Structural slots (updated to match runtime)
  slots: [
    'trigger',
    'portal',
    'overlay',
    'centerer',     // full-screen grid wrapper that centers content and provides 20px gutters
    'content',      // actual modal surface
    'close',        // close row (IconButton lives here)
    'contentBody',  // scrollable body wrapper for children
    'controlLeft',  // left nav IconButton
    'controlRight'  // right nav IconButton
  ] as const,

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['Dialog'] as const },
    notes: [
      'Render: Root → Trigger(asChild) + Portal(Overlay + Centerer(div) + Content).',
      'Content is centered by the Centerer grid; Content itself is not positioned.',
      'Content height clamps to min(650px, 100vh - 40px) and scroll lives in the contentBody wrapper.',
      'When hasNavigation=true, render both left/right IconButtons positioned to protrude ±20px from the content edges.',
      'Icon-only controls (close/left/right) require non-empty aria-labels; icons are decorative.',
      'Overlay click and Escape close use Radix defaults.'
    ] as const
  }
});
