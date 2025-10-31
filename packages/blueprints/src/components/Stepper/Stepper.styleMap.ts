// packages/blueprints/src/components/Stepper/Stepper.styleMap.ts
import type { StyleMapSpec } from '../../utilities/defineStyleMap/types';

const StepperStyleMap = {
  component: 'Stepper',

  /** Root-level classes always applied. */
  base: [],

  slots: {
    /** Root container (nav) */
    container: ['flex', 'items-center', 'gap-4', 'select-none', 'transition-colors'],

    /** Per-step wrapper (button when interactive, otherwise div) */
    step: ['flex', 'flex-col', 'items-center', 'relative'],

    /**
     * Circular indicator (Control-inspired)
     * - focus ring tokens mirror Control
     * - status applied via data-[step-status=...]
     */
    indicator: [
      'size-8',
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'font-bold',
      'border',
      'p-2',
      'transition-colors',

      // Focus ring (borrowed from Control)
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-color-focus-ring',
      'focus-visible:ring-offset-color-background-default',

      // Active (current)
      'data-[step-status=active]:bg-transparent',
      'data-[step-status=active]:text-color-content-brand',
      'data-[step-status=active]:border-color-content-brand',

      // Completed (done)
      'data-[step-status=completed]:bg-color-content-brand',
      'data-[step-status=completed]:text-color-background-default',
      'data-[step-status=completed]:border-color-content-brand',

      // Upcoming (pending)
      'data-[step-status=upcoming]:bg-transparent',
      'data-[step-status=upcoming]:text-color-content-weak',
      'data-[step-status=upcoming]:border-color-background-default'
    ],

    /** Label under the indicator; supplies accessible name */
    label: ['mt-1', 'text-sm', 'text-center', 'text-color-content-default'],

    /**
     * Rail between steps
     * - default background uses surface token
     * - progress expressed via data-[rail-status]
     *   - full: completed
     *   - partial: toward active
     *   - default: untouched / upcoming
     */
    rail: [
      'flex-1',
      'h-px',
      'transition-colors',
      'bg-color-background-default', // baseline
      'data-[rail-status=default]:bg-color-background-default', // explicit default hook
      'data-[rail-status=full]:bg-color-content-brand',
      // If your Tailwind build does not support opacity suffix, replace with a dedicated weak token later.
      'data-[rail-status=partial]:bg-color-content-brand/50'
    ]
  }
} satisfies StyleMapSpec;

export default StepperStyleMap;
