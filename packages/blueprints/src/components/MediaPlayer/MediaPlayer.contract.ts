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
   */
  layout: {
    type: 'container',
    tag: 'div',
    className: ['MediaPlayer', 'flex', 'flex-col', 'w-full'],
    children: [
      {
        tag: 'div',
        className: ['_progressTop'],
        children: [
          { tag: 'div', className: ['_track', '_trackEmpty'] },
          { tag: 'div', className: ['_track', '_trackFill'] },
          { tag: 'div', className: ['_thumb'] }
        ]
      },
      {
        tag: 'div',
        className: ['_row'],
        children: [
          {
            tag: 'div',
            className: ['_lead'],
            children: [
              { tag: 'div', className: ['_artwork'] },
              {
                tag: 'div',
                className: ['_labels'],
                children: [
                  { tag: 'div', className: ['_subtitle'] },
                  { tag: 'div', className: ['_title'] }
                ]
              }
            ]
          },
          {
            tag: 'div',
            className: ['_controls'],
            children: [{ tag: 'button', className: ['_playPause'] }]
          },
          {
            tag: 'div',
            className: ['_seekGroup'],
            children: [
              { tag: 'input', className: ['_seekRange'] },
              { tag: 'div', className: ['_timeDisplay'] }
            ]
          },
          {
            tag: 'div',
            className: ['_volumeGroup'],
            children: [{ tag: 'input', className: ['_volumeRange'] }]
          },
          { tag: 'div', className: ['_actions'] }
        ]
      }
    ]
  },

  styleMap: true,

  hints: {
    a11y: 'Use native <button> for play/pause (Space/Enter work). Use <input type="range"> for seek and volume with aria-labels. Top progress bar is decorative and must be aria-hidden.',
    control:
      'Play/pause renders the shared Control component with variant="light". When paused, Control uses icon={<PlayIcon />}. When playing, Control uses icon={<PauseIcon />}. The Control’s icon is decorative (aria-hidden) and Control must receive a non-empty ariaLabel.',
    volume:
      'The volume slider is shown only in the default variant. On some mobile browsers (e.g., iOS Safari), programmatic volume control is limited; the slider should gracefully disable/hide if element volume cannot be changed.'
  },

  rules: [
    {
      validate: props => typeof props.audioSrc === 'string' && props.audioSrc.trim().length > 0,
      message: 'audioSrc must be a non-empty string (href).'
    },
    {
      validate: props => typeof props.title === 'string' && props.title.trim().length > 0,
      message: 'title must be a non-empty string.'
    }
  ]
};

export default defineContract(spec);
