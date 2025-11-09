// packages/blueprints/src/components/MediaPlayer/MediaPlayer.contract.ts
import { defineContract } from '../../utilities/defineContract';
import type { ContractSpec } from '../../utilities/defineContract/types';

/**
 * MediaPlayer — stateful, dependency-free audio player chrome.
 * Owns a hidden <audio> element and renders native controls (button + ranges).
 * Decorative progress bar is driven by a CSS variable: --progress (0..100).
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
   * Interactive elements (play/pause, ranges) are composed in core using MediaControl + Slider.
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
    a11y: 'Use MediaControl for play/pause and the shared Slider component for seek and volume. Provide aria labels on Slider (e.g., "Seek" and "Volume") or aria-labelledby wiring. The top progress bar is decorative and must be aria-hidden.',

    control:
      'Use the shared MediaControl component for play/pause. MediaControl already handles play/pause icons, aria labels, and controlled/uncontrolled state internally. The generating agent should NOT manage icons or ariaLabel directly; instead, it should attach event handlers such as onPlay and onPause (and optionally state/defaultState/onStateChange) so MediaPlayer can synchronize MediaControl with the underlying <audio> element.',

    slider:
      'Implement the seekRange and volumeRange slots by rendering the shared Slider component (do not build custom tracks or thumbs here). Treat Slider as a controlled component driven by MediaPlayer state:\n' +
      '- Seek: mount <Slider> inside the seekRange slot. Use value=audioCurrentTime, min=0, max=audioDuration, and a small step (e.g., 0.1 or 1). Wire Slider.onChange to update a local "scrub" value and time display while the user is dragging, and Slider.onCommit to set audio.currentTime to the committed value.\n' +
      '- Volume: in the default variant only, mount <Slider> inside the volumeRange slot. Use a percentage domain such as min=0, max=100, step=1. Wire Slider.onChange to update the <audio> element volume (value/100) and any internal volume state. compact and mini variants hide the volumeGroup/volumeRange slots via the styleMap.',

    volume:
      'The volume slider is shown only in the default variant. Render VolumeUpIcon next to the volume Slider as a decorative indicator (aria-hidden="true"). On platforms where fine-grained volume control is restricted (e.g., iOS Safari), the Slider should still render, but updates may effectively behave like a mute/unmute or coarse control; handle this in core without changing the blueprint.'
  },

  rules: []
};

export default defineContract(spec);
