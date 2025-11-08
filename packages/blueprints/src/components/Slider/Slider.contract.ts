// packages/blueprints/src/components/Slider/Slider.contract.ts
import { defineContract } from '../../utilities/defineContract';
import type { ContractSpec } from '../../utilities/defineContract/types';

/**
 * Slider — single-thumb, horizontal, controlled slider.
 * Purpose-built for media seek (time) and volume (0–100).
 * No disabled state; no orientation toggle; no multi-thumb.
 */
const spec: ContractSpec = {
  component: 'Slider',
  description:
    'Single-value, horizontal slider for seek and volume built on the Radix Slider primitive.',
  base: 'Slider', // Radix UI Primitive (imported via local radix-ui aggregator)

  props: {
    /** Controlled value (single thumb). */
    value: { type: 'number', required: true },

    /** Live updates while dragging/clicking. Use for smooth UI mirrors. */
    onChange: { type: 'callback', args: ['value: number'], required: true },

    /** Commit on release (pointer/keyboard up). Use to seek or finalize. */
    onCommit: { type: 'callback', args: ['value: number'] },

    /** Domain (defaults suit volume; override for seek). */
    min: { type: 'number', default: 0 },
    max: { type: 'number', default: 100 },
    step: { type: 'number', default: 1 },

    /** A11y: at least one must be provided and non-empty. */
    ariaLabel: { type: 'string' },
    ariaLabelledBy: { type: 'string' }
  },

  /** Radix parts mapped to slots for layout/styling. */
  slots: ['track', 'range', 'thumb'] as const,

  /** Minimal structural hint; generators wire Radix parts accordingly. */
  layout: {
    type: 'container',
    tag: 'div',
    className: ['Slider', 'w-full', 'flex', 'items-center'],
    children: [
      { tag: 'div', className: ['_track'], children: [{ tag: 'div', className: ['_range'] }] },
      { tag: 'div', className: ['_thumb'] }
    ]
  },

  styleMap: true,

  hints: {
    a11y: 'Provide one: ariaLabel or ariaLabelledBy. Horizontal only; one thumb only. Keyboard: Arrow/Page/Home/End supported by Radix.',
    radixAdapter: { uses: ['Slider'] as const }
  }
};

export default defineContract(spec);
