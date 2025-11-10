// packages/blueprints/src/components/MediaPlayer/MediaPlayer.contract.ts
import { defineContract } from '../../utilities/defineContract';

/**
 * MediaPlayer — stateful, dependency-free audio player chrome.
 *
 * Uses:
 * - native <audio> as the playback engine
 * - MediaControl for play/pause
 * - Slider for seek (top bar) and volume (right-hand slider)
 *
 * Variants:
 * - 'default'  — top seek slider, artwork, label + **time**, controls (with optional ±10s), volume controls, close, actions.
 * - 'compact'  — top seek slider, **no artwork**, label (no time), controls in lead position, **no volume controls**, close, actions.
 * - 'mini'     — MediaControl-only (no seek, no lead, no volume, no actions).
 */
export default defineContract({
  component: 'MediaPlayer',
  description:
    'Audio player chrome using native <audio> with MediaControl for play/pause and Slider for seek and volume.',
  base: 'div',

  props: {
    /** Required audio source (href). Must be non-empty. */
    audioSrc: { type: 'string', required: true, default: '' },

    /** Labels */
    title: { type: 'string', required: true, default: '' },
    subtitle: { type: 'string' },

    /** Artwork (optional) */
    imgSrc: { type: 'string' },
    imgAlt: { type: 'string' },

    /** Presentation / behavior */
    variant: {
      type: 'enum',
      options: ['default', 'compact', 'mini'] as const,
      default: 'default'
    },
    autoPlay: { type: 'boolean', default: false },
    preload: {
      type: 'enum',
      options: ['metadata', 'auto', 'none'] as const,
      default: 'metadata'
    },
    loop: { type: 'boolean', default: false },

    /** Start position in seconds (seeks on loadedmetadata). */
    startTime: { type: 'number', default: 0 },

    /** Volume UI toggle (default: true). When false, volume UI is hidden and volume is fixed to 100%. */
    showVolume: { type: 'boolean', default: true },

    /** Optional close action handler (used by the Close icon button in default/compact). */
    onCloseClick: { type: 'callback', args: ['event: MouseEvent'] }
  },

  /**
   * Slots in render order.
   * These are structural containers used by the styleMap/layout; they do not imply interactivity.
   */
  slots: [
    'seek', // top seek slider (Slider host)
    'row', // main row surface
    'lead', // left cluster (artwork + labels)
    'artwork', // thumbnail/avatar for the track
    'labels', // vertical stack: subtitle + titleRow
    'subtitle', // small label above
    'titleRow', // inline row wrapper for title + timeDisplay
    'title', // main label text
    'timeDisplay', // "MM:SS / MM:SS" next to the title
    'controls', // play/pause cluster (and future +/-10s icons)
    'playPause', // MediaControl instance
    'volumeGroup', // right-hand volume cluster
    'volumeRange', // volume Slider host (shared Slider mounts here)
    'actions' // trailing actions (e.g., overflow)
  ] as const,

  /**
   * Layout hint for generators — every node is slot-bound (deterministic mapping).
   *
   * Structure:
   * - seek (Slider)
   * - row
   *   - lead
   *     - artwork
   *     - labels
   *       - subtitle
   *       - titleRow
   *         - title
   *         - timeDisplay
   *   - controls
   *     - playPause (MediaControl)
   *   - volumeGroup
   *     - volumeRange (Slider)
   *   - actions
   *
   * NOTE: Class names are intentionally omitted here; all styling is defined in the styleMap.
   */
  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { tag: 'div', slot: 'seek' },
      {
        tag: 'div',
        slot: 'row',
        children: [
          {
            tag: 'div',
            slot: 'lead',
            children: [
              { tag: 'div', slot: 'artwork' },
              {
                tag: 'div',
                slot: 'labels',
                children: [
                  { tag: 'div', slot: 'subtitle' },
                  {
                    tag: 'div',
                    slot: 'titleRow',
                    children: [
                      { tag: 'div', slot: 'title' },
                      { tag: 'div', slot: 'timeDisplay' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            tag: 'div',
            slot: 'controls',
            children: [{ tag: 'button', slot: 'playPause' }]
          },
          {
            tag: 'div',
            slot: 'volumeGroup',
            children: [{ tag: 'div', slot: 'volumeRange' }]
          },
          { tag: 'div', slot: 'actions' }
        ]
      }
    ]
  },

  styleMap: true,

  hints: {
    a11y: 'Use MediaControl for play/pause and the shared Slider component for both seek and volume. MediaControl provides proper button semantics. Each Slider must have an accessible name via ariaLabel or ariaLabelledBy (e.g., "Seek" and "Volume"). Time stamps are text next to the title, not part of the seek Slider.',

    control:
      'Use the shared MediaControl component for play/pause. MediaControl already handles play/pause icons, aria labels, and its own focus styling. The generating agent must NOT manage icons or ariaLabel directly; instead, wire MediaControl with handlers such as onPlay and onPause (and optionally state/defaultState/onStateChange) so its internal state reflects the underlying <audio> element.',

    slider:
      'Render the shared Slider component in the seek and volume slots; do not build custom tracks or thumbs in MediaPlayer.\n' +
      '- Seek: mount <Slider> in the seek slot. Use value=audioCurrentTime, min=0, max=audioDuration, and a small step (e.g., 0.1 or 1). Pass ariaLabel="Seek" (or ariaLabelledBy) and wire Slider.onChange to update a local scrub value + timeDisplay while the user is dragging. Use Slider.onCommit to set audio.currentTime to the committed value.\n' +
      '- Volume: render only when `variant === \'default\'` **and** `showVolume !== false`; mount <Slider> in the volumeRange slot. Use a 0–100 domain (min=0, max=100, step=1). Pass ariaLabel="Volume" (or ariaLabelledBy) and wire Slider.onChange to update the <audio> element volume (value/100) and any internal volume state.',

    volume:
      'The volume Slider is shown only when `variant === "default"` **and** `showVolume !== false`. Render a decorative volume icon adjacent to the Slider; icon choice is implementation-defined. Do not build custom rails/thumbs here — use the shared Slider component. When the volume UI is not shown, treat volume as fixed at 100%. Use **conditional rendering**, not CSS, to include/exclude the volume group.',

    chrome:
      'Default variant: show Replay10/Forward10 IconButtons flanking MediaControl for ±10s seek. Default **and** compact variants: show a Close IconButton at the far right; wire its onClick to `onCloseClick` when provided. Mini variant: control-only (no seek, no close, no actions). Use conditional rendering for variant differences (no CSS hides).'
  },

  rules: []
});
