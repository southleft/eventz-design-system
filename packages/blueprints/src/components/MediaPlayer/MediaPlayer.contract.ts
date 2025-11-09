// packages/blueprints/src/components/MediaPlayer/MediaPlayer.contract.ts
import { defineContract } from '../../utilities/defineContract';
import type { ContractSpec } from '../../utilities/defineContract/types';

/**
 * MediaPlayer — stateful, dependency-free audio player chrome.
 * Owns a hidden <audio> element and renders native controls (button + ranges).
 * Decorative progress/volume bars are driven by CSS variables: --progress (0..100), --volume (0..100).
 * Variants: 'default' (design lg), 'compact' (design sm), and 'mini' (control-only).
 */
const spec: ContractSpec = {
  component: 'MediaPlayer',
  description: 'Audio player chrome using native <audio> with progress, seek, and volume controls.',
  base: 'div',

  props: {
    /** Required audio source (href). Must be non-empty. */
    audioSrc: { type: 'string', required: true, default: '' },

    /** Labels */
    title: { type: 'string', required: true, default: '' },
    subtitle: { type: 'string' },

    /** Presentation / behavior */
    variant: { type: 'enum', options: ['default', 'compact', 'mini'] as const, default: 'default' },
    autoPlay: { type: 'boolean', default: false },
    preload: { type: 'enum', options: ['metadata', 'auto', 'none'] as const, default: 'metadata' },
    loop: { type: 'boolean', default: false },
    /** Start position in seconds (seeks on loadedmetadata). */
    startTime: { type: 'number', default: 0 }
  },

  /**
   * Slots in render order.
   * These are structural containers used by the styleMap/layout; they do not imply interactivity.
   */
  slots: [
    'progressTop',
    'row',
    'lead',
    'artwork',
    'labels',
    'subtitle',
    'title',
    'controls',
    'playPause',
    'seekGroup',
    'seekRange',
    'timeDisplay',
    'volumeGroup',
    'volumeRange',
    'actions'
  ] as const,

  /**
   * Layout hint for generators. Renders the progress bar on top, then the main row with clusters.
   * Interactive elements (play/pause, ranges) are native elements rendered in core from this layout.
   *
   * NOTE: Class names are intentionally omitted here; all styling is defined in the styleMap.
   */
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      {
        tag: 'div',
        children: [{ tag: 'div' }, { tag: 'div' }, { tag: 'div' }]
      },
      {
        tag: 'div',
        children: [
          {
            tag: 'div',
            children: [
              { tag: 'div' },
              {
                tag: 'div',
                children: [{ tag: 'div' }, { tag: 'div' }]
              }
            ]
          },
          {
            tag: 'div',
            children: [{ tag: 'button' }]
          },
          {
            tag: 'div',
            children: [{ tag: 'input' }, { tag: 'div' }]
          },
          {
            tag: 'div',
            children: [{ tag: 'input' }]
          },
          { tag: 'div' }
        ]
      }
    ]
  },

  styleMap: true,

  hints: {
    a11y: 'Use native <button>-backed controls for play/pause (via MediaControl) and Slider for seek and volume, ensuring aria labels are provided. The top progress bar is decorative and must be aria-hidden.',
    control:
      'Use the shared MediaControl component for play/pause. MediaControl already handles play/pause icons, aria labels, and controlled/uncontrolled state internally. The generating agent should NOT manage icons or ariaLabel directly; instead, it should attach event handlers such as onPlay and onPause (and optionally state/defaultState/onStateChange) so MediaPlayer can synchronize MediaControl with the underlying <audio> element.',
    slider:
      'Implement the seekRange and volumeRange slots with the shared Slider component, not raw <input type="range">. Treat Slider as a controlled component backed by internal MediaPlayer state:\n' +
      '- Seek (progress): map the underlying <audio> element currentTime/duration into a Slider value suitable for the Slider domain (for example, a 0–100 normalized percentage). Use Slider.onChange for live scrub UI (updating visual progress and time display only) and Slider.onCommit to perform the actual seek on the <audio> element (by mapping the committed value back into seconds).\n' +
      '- Volume: in the default variant only, map the Slider value into the <audio> element volume (for example, value/100 for a 0–100 domain). Use Slider.onChange to update volume immediately and keep the --volume CSS variable in sync. The compact and mini variants hide the volumeRange slot.',
    volume:
      'The volume slider is shown only in the default variant. Render VolumeUpIcon as the volume indicator next to the volume slider; treat this icon as decorative (aria-hidden="true"). On some mobile browsers (e.g., iOS Safari), programmatic volume control is limited; when the Slider cannot meaningfully change element volume, it should behave gracefully (e.g., treat it as a UI hint or clamp to mute/unmute only) rather than assuming precise volume control.'
  },

  rules: []
};

export default defineContract(spec);
