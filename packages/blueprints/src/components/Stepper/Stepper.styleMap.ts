// packages/blueprints/src/components/Stepper/Stepper.styleMap.ts
import type { StyleMapSpec } from '../../utilities/defineStyleMap/types';

const StepperStyleMap = {
  component: 'Stepper',

  /** Root-level classes always applied. */
  base: [],

  slots: {
    /** Root container (nav) */
    container: ['flex', 'items-center', 'select-none', 'transition-colors'],

    /** Per-step wrapper (button when interactive, otherwise div) */
    step: [
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'relative',
      'size-32',
      'rounded-full',
      'font-bold',
      'border-[2px]',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-color-background-default',
      'data-[step-status=active]:bg-color-background-default',
      'data-[step-status=active]:text-color-content-brand',
      'data-[step-status=active]:border-color-border-strong',
      'data-[step-status=completed]:bg-color-content-brand',
      'data-[step-status=completed]:text-color-background-default',
      'data-[step-status=completed]:outline-2',
      'data-[step-status=completed]:outline-color-border-strong',
      'data-[step-status=completed]:outline-offset-1',
      'data-[step-status=upcoming]:bg-color-background-default',
      'data-[step-status=upcoming]:text-color-content-weak',
      'data-[step-status=upcoming]:border-color-border-default'
    ],

    /**
     * Interactive-only hover tokens (apply only when the step renders as a <button>).
     * These are present in the runtime as `stepElementButtonClasses` and intentionally not
     * included in the `step` slot array to avoid affecting the static <div> mode:
     * - data-[step-status=active]:hover:text-color-content-brand-hover
     * - data-[step-status=active]:hover:border-color-border-strong-hover
     * - data-[step-status=upcoming]:hover:text-color-content-weak-hover
     * - data-[step-status=upcoming]:hover:border-color-border-default-hover
     */

    /** Decorative number/check indicator inside each step element */
    indicator: ['pointer-events-none', 'flex', 'items-center', 'justify-center'],

    /** Label under the indicator; supplies accessible name */
    label: ['text-sm', 'text-center', 'whitespace-nowrap', 'text-color-content-default'],

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
      'h-[2px]',
      'transition-colors',
      'bg-color-border-default',
      'data-[rail-status=default]:bg-color-border-default',
      'data-[rail-status=full]:bg-color-border-strong',
      'data-[rail-status=partial]:bg-color-border-default'
    ]
  }
} satisfies StyleMapSpec;

export default StepperStyleMap;
