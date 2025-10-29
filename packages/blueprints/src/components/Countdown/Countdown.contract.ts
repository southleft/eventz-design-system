import { defineContract } from '../../utilities';

export const CountdownContract = defineContract({
  component: 'Countdown',
  description:
    'Non-interactive time-to-instant display that counts down to an absolute moment and renders a fixed-width time readout.',
  // Native, semantic element (non-interactive)
  base: 'time',

  props: {
    // Required absolute instant. Require ISO-8601 with explicit timezone (Z or ±HH:MM).
    until: {
      type: 'string',
      required: true,
      description:
        'ISO-8601 with timezone (Z or ±HH:MM), e.g., 2025-12-31T23:59:59Z or 2025-12-31T18:59:59-05:00'
    },

    // Visual/semantic style choice (per design spec)
    variant: {
      type: 'enum',
      options: ['default', 'expiring'] as const,
      default: 'default',
      description: 'Visual variant per spec tokens.'
    },

    // Fires exactly once when the countdown reaches 00:00.
    onComplete: {
      type: 'callback',
      args: [] as const,
      description: 'Called once when the countdown reaches zero.'
    },

    // Optional SR-only prefix, e.g., "Time remaining".
    announceLabel: {
      type: 'string',
      description: 'Screen-reader prefix announced before the time value.'
    }
  },

  // No slots — pure text readout.
  slots: [] as const,

  // Optional structural hint; styling comes from the styleMap.
  layout: {
    type: 'container',
    tag: 'time'
  },

  // Informational (non-enforcing) notes for generators.
  rules: [
    {
      hint: 'Derived end condition: complete (==0).'
    },
    {
      hint: 'Render fixed-width segments with leading zeros. Use MM:SS when < 1 hour; HH:MM:SS when ≥ 1 hour.'
    },
    {
      hint: 'On mount, compute remaining time immediately so past targets render 00:00 and fire onComplete once.'
    },
    {
      hint: 'Store onComplete in a ref to avoid re-registering effects on handler identity changes and guard against multiple invocations.'
    },
    {
      hint:
        'If until parses to NaN, render 00:00, skip scheduling timers, and in development log [Countdown] until must be ISO-8601 with timezone (Z or ±HH:MM).'
    }
  ],

  styleMap: true,

  // Adapter/A11y hints (informational only)
  hints: {
    a11y: 'Use role="timer" with aria-live="polite" and aria-atomic="true". If announceLabel is provided, prepend it for SR-only.',
    runtime: 'client'
  }
});
