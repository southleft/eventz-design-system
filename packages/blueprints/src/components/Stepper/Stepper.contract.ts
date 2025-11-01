// packages/blueprints/src/components/Stepper/Stepper.contract.ts
import type { ContractSpec } from '../../utilities/defineContract/types';

const StepperContract = {
  description: 'Horizontal numeric stepper showing completed, active, and upcoming steps.',
  component: 'Stepper',
  /** Base is a native element; no Radix primitive required. */
  base: 'nav',

  props: {
    steps: {
      type: 'number',
      required: true,
      description: 'Total number of steps (≥ 1).'
    },
    activeStep: {
      type: 'number',
      required: true,
      description: 'One-based index of the current (active) step (1 ⇒ first step).'
    },
    /** Visible text rendered under the active step indicator only (design requirement). */
    activeLabel: {
      type: 'string',
      required: true,
      description: 'Label text displayed under the active step indicator only.'
    },
    onStepChange: {
      type: 'callback',
      args: ['index: number'],
      description:
        'Called when a step is activated by the user. Receives the zero-based step index. When provided, steps render as focusable buttons.'
    }
  },

  /**
   * Ordered slots for generators. The runtime will render:
   *  - container (root nav)
   *  - step (repeated per index)
   *     - indicator
   *     - label (ACTIVE STEP ONLY)
   *  - rail (between steps)
   */
  slots: ['container', 'step', 'indicator', 'label', 'rail'] as const,

  /** Optional layout hint (no strict enforcement by generators). */
  layout: {
    type: 'container',
    tag: 'nav'
  },

  styleMap: true,

  /**
   * Hints only — we do not validate consumer data in blueprints.
   * Generators should follow these semantics precisely.
   */
  rules: [
    {
      hint: 'Compute activeIndex = activeStep - 1. For each rendered step index i: i < activeIndex → data-step-status="completed"; i === activeIndex → "active"; otherwise → "upcoming".'
    },
    {
      hint: 'Render a rail between steps except before the first. For rail ahead of index i: if i < activeIndex → data-rail-status="full"; if i === activeIndex → "partial"; otherwise → "default".'
    },
    {
      hint: 'Render the label slot ONLY for the active step (index === activeIndex) and place it under the indicator. For interactive mode, wire the button’s accessible name via aria-labelledby to that label element when active.'
    },
    {
      hint: 'For non-active steps (no label element present), compute a simple accessible name (e.g., aria-label="Step {i+1}") so the button is named while the numeric indicator remains aria-hidden.'
    },
    {
      hint: 'Interactivity: when `onStepChange` is provided, container uses role="tablist" and each step is a <button role="tab">; the active step may include aria-current="step". Without `onStepChange`, use role="list" / role="listitem".'
    },
    {
      hint: 'The numeric indicator is decorative and should be aria-hidden="true". Completed steps render a check glyph/icon instead of the step number (icon is decorative as well).'
    },
    {
      hint: 'Apply hover tokens for the step element only in interactive mode (when rendered as a <button>). Do not apply hover classes to the static <div> path.'
    }
  ]
} satisfies ContractSpec;

export default StepperContract;
