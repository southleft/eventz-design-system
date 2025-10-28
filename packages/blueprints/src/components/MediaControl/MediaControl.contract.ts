// packages/blueprints/src/components/MediaControl/MediaControl.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'MediaControl',
  description:
    'Icon-only play/pause control built on top of Control. Used in MediaCard and MediaPlayer.',

  // Per project guidance, this wraps our internal Control component (which renders a native button).
  base: 'Control',

  props: {
    state: {
      type: 'enum',
      options: ['playing', 'paused'] as const,
      description: 'Controlled state. When provided, visual state is driven externally.'
    },

    defaultState: {
      type: 'enum',
      options: ['playing', 'paused'] as const,
      default: 'paused',
      description: 'Uncontrolled initial state. Ignored when `state` is provided.'
    },

    onStateChange: {
      type: 'callback',
      args: ["next: 'playing' | 'paused'"],
      description: 'Fires whenever the control is activated with the next state value.'
    },

    onPlay: {
      type: 'callback',
      args: [],
      description: 'Fires only when the next state becomes playing.'
    },

    onPause: {
      type: 'callback',
      args: [],
      description: 'Fires only when the next state becomes paused.'
    },

    ariaLabelPlay: {
      type: 'string',
      default: 'Play media',
      description: 'Accessible name when the control will play on activation.'
    },

    ariaLabelPause: {
      type: 'string',
      default: 'Pause media',
      description: 'Accessible name when the control will pause on activation.'
    },

    // Passthrough Control styling knobs (exposed directly)
    variant: {
      type: 'enum',
      options: ['brand', 'dark', 'light'] as const,
      default: 'light',
      description: 'Visual variant forwarded to Control.'
    },

    size: {
      type: 'enum',
      options: ['lg', 'sm'] as const,
      default: 'lg',
      description: 'Size forwarded to Control (defaults to Control’s default).'
    }
  },

  // No external slot props; icons are internal (Play/Pause). We still expose a slot order for generators.
  slots: ['_icon'] as const,

  // Structural hint is unnecessary; Control provides structure. Keep styleMap true to attach token classes.
  styleMap: true,

  rules: [
    {
      validate: props => {
        // Determine effective state (controlled or default)
        const s = (props['state'] as string) ?? (props['defaultState'] as string) ?? 'paused';
        if (s === 'playing') {
          const label = String(props['ariaLabelPause'] ?? 'Pause media').trim();
          return label.length > 0;
        } else {
          const label = String(props['ariaLabelPlay'] ?? 'Play media').trim();
          return label.length > 0;
        }
      },
      message: 'Computed aria-label must be non-empty for the current state.'
    },
    {
      hint: 'Event order on activation: onStateChange(next) fires first, then onPlay() or onPause() (exactly one).'
    },
    {
      hint: 'Icons: render PlayIcon when state is paused; render PauseIcon when state is playing. Icons come from the design-system icon set.'
    },
    {
      hint: 'Icon-only control: accessible name comes from ariaLabelPlay/ariaLabelPause depending on current state.'
    },
    {
      hint: 'When state is playing, apply the brand content color class directly to the rendered icon element.'
    },
    {
      hint: 'Generator hook: render the icon wrapper element with data-slot="_icon" for testing and future hooks; tint is applied directly to the icon element (no descendant selector required).'
    },
    {
      hint: 'Glyph imports are explicit: use PlayIcon when paused and PauseIcon when playing, sourced from the design-system icon set.'
    }
  ],

  hints: {
    a11y: 'Icon-only control. Button semantics via Control. Ensure focus-visible ring remains visible.'
  }
});
