// packages/blueprints/src/components/CheckboxGroup/CheckboxGroup.contract.ts
import { defineContract } from '../../utilities';

export const CheckboxGroupContract = defineContract({
  component: 'CheckboxGroup',
  description:
    'Fieldset wrapper for related checkboxes with optional hint, info popover, and error text.',
  base: 'fieldset',

  props: {
    label: {
      type: 'string',
      description: 'Visible legend text describing the checkbox group.'
    },
    ariaLabel: {
      type: 'string',
      description:
        'Accessible name used when label is omitted. Must be non-empty if label is not provided.'
    },
    hint: {
      type: 'string',
      description: 'Optional helper text shown below the legend.'
    },
    info: {
      type: 'string',
      description:
        'Optional supporting information surfaced via an inline info trigger and popover.'
    },
    error: {
      type: 'string',
      description: 'Error message displayed below the choices list with a leading icon.'
    },
    name: {
      type: 'string',
      description: 'Form field name applied to each checkbox input for submission.'
    },
    choices: {
      type: 'array',
      required: true,
      description:
        'Checkbox options rendered inside the group. Each item should provide a label and optional value/id.',
      of: {
        type: 'object',
        shape: {
          label: { type: 'string', required: true },
          value: { type: 'string' },
          id: { type: 'string' }
        }
      }
    },
    onCheckedChange: {
      type: 'callback',
      args: ['values: string[]'],
      description: 'Called after any checkbox toggles with the full array of selected values.'
    }
  },

  /**
   * Slots note:
   * - `infoTrigger` is an inline control that appears after the label text when `info` && `label`.
   *   It currently renders an icon-only trigger (not exposed as a public prop).
   * - `infoContent` is the popover content container that displays the `info` string.
   */
  slots: ['label', 'infoTrigger', 'infoContent', 'hint', 'choices', 'error'] as const,

  layout: {
    type: 'container',
    tag: 'fieldset',
    children: [
      {
        slot: 'label',
        tag: 'legend',
        children: [{ slot: 'infoTrigger', tag: 'button' }]
      },
      { slot: 'infoContent', tag: 'div' },
      { slot: 'hint', tag: 'div' },
      { slot: 'choices', tag: 'div' },
      { slot: 'error', tag: 'div' }
    ]
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const label = props['label'];
        if (typeof label === 'string' && label.trim().length > 0) return true;
        const ariaLabel = props['ariaLabel'];
        return typeof ariaLabel === 'string' && ariaLabel.trim().length > 0;
      },
      message:
        'Provide ariaLabel when label is not set so the checkbox group has an accessible name.'
    },
    {
      when: { info: (v: unknown) => typeof v === 'string' && v.trim().length > 0 },
      hint:
        '`infoTrigger` should render only when a visible `label` is present; `infoContent` renders the info string via a popover at runtime.'
    },
    {
      when: {},
      hint: 'Hint and error content should merge into `aria-describedby` when rendered at runtime.'
    }
  ],

  styleMap: true
});
