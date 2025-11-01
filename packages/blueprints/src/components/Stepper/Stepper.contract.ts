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
      description: 'Zero-based index of the current (active) step.'
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
        'Called when a step is activated by the user. When provided, steps render as focusable buttons.'
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
    tag: 'nav',
    className: ['container'],
    children: [
      {
        tag: 'div',
        className: ['step'] // repeated per step at runtime; children order matters
      },
      {
        tag: 'div',
        className: ['rail'] // rendered between steps (not before the first)
      }
    ]
  },

  styleMap: true,

  /**
   * Hints only — we do not validate consumer data in blueprints.
   * Generators should follow these semantics precisely.
   */
  rules: [
    {
      hint: 'Derived step status for index i: i < activeStep → "completed"; i === activeStep → "active"; i > activeStep → "upcoming". Apply as data-step-status on each step.'
    },
    {
      hint: 'Rail status between steps (except before the first): before a completed step → data-rail-status="full"; before the active step → "partial"; otherwise → "default".'
    },
    {
      hint: 'Render the label slot ONLY for the active step (index === activeStep) and place it under the indicator. For interactive mode, wire the button’s accessible name via aria-labelledby to that label element when active.'
    },
    {
      hint: 'For non-active steps (no label element present), compute a simple accessible name (e.g., aria-label="Step {i+1}") so the button is named while the numeric indicator remains aria-hidden.'
    },
    {
      hint: 'Interactivity: when `onStepChange` is provided, container uses role="tablist" and each step is a <button role="tab">; the active step may include aria-current="step". Without `onStepChange`, use role="list" / role="listitem".'
    },
    {
      hint: 'The numeric indicator is decorative and should be aria-hidden="true". Completed steps render a check glyph/icon instead of the step number (icon is decorative as well). Preserve focus-visible ring tokens on the interactive step element.'
    }
  ]
} satisfies ContractSpec;

export default StepperContract;
