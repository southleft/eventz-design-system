// packages/blueprints/src/components/RadioButtonGroup/RadioButtonGroup.contract.ts
import { defineContract } from '../../utilities';
import type { PropDef } from '../../utilities/defineContract/types';

const choicesProp = {
  type: 'array',
  required: true,
  description:
    'Radio button definitions. Each item provides a unique value and optional label, disabled, and hint text.'
} as unknown as PropDef;

const onValueChangeProp = {
  type: 'function',
  description: 'Called when the selected value changes; receives the next value as a string.'
} as unknown as PropDef;

export const RadioButtonGroupContract = defineContract({
  component: 'RadioButtonGroup',
  description:
    'Fieldset wrapper around a radio group with labeled context, optional info popover, hint, and error messaging.',
  base: 'fieldset',

  props: {
    value: {
      type: 'string',
      description: 'Controlled value for the selected radio option.'
    },
    defaultValue: {
      type: 'string',
      description: 'Initial selected value for uncontrolled usage.'
    },
    onValueChange: onValueChangeProp,
    name: {
      type: 'string',
      description: 'Applied to radio group items for form submission when provided.'
    },
    choices: choicesProp,
    label: {
      type: 'string',
      description: 'Visible legend text describing the radio group.'
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
      description: 'Error message displayed below the radio choices with a leading icon.'
    }
  },

  slots: [
    'label',
    'infoTrigger',
    'infoContent',
    'hint',
    'radiogroup',
    'error',
    'control',
    'indicator',
    'choiceLabel',
    'choiceHint'
  ] as const,

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
      {
        slot: 'radiogroup',
        tag: 'div',
        children: [
          {
            slot: 'control',
            tag: 'button',
            children: [{ slot: 'indicator', tag: 'span' }]
          },
          { slot: 'choiceLabel', tag: 'span' },
          { slot: 'choiceHint', tag: 'div' }
        ]
      },
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
      message: 'Provide ariaLabel when label is not set so the radio group has an accessible name.'
    },
    {
      when: {},
      hint: 'Merge hint and error element IDs into aria-describedby on the radiogroup root.'
    },
    {
      when: { info: (v: unknown) => typeof v === 'string' && v.trim().length > 0 },
      hint: 'Render infoTrigger as an icon-only button with aria-label="More info"; the icon remains aria-hidden.'
    },
    {
      when: {},
      hint: 'Each radio choice should receive a stable id; associate the control’s accessible name via aria-labelledby to the choiceLabel element, and keep the indicator decorative via aria-hidden="true".'
    },
    {
      when: {},
      hint: 'Expose per-choice hint text via aria-describedby on the radio item pointing to the choiceHint element.'
    }
  ],

  styleMap: true
});
