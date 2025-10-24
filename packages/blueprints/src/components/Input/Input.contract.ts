// packages/blueprints/src/components/Input/Input.contract.ts
import { defineContract } from '../../utilities';

export const InputContract = defineContract({
  component: 'Input',
  description:
    'A text input control rendered within FormElement. FormElement handles field chrome (label, hint, error, info, required, a11y). Input renders only the interactive control row.',
  base: 'div',

  props: {
    startIcon: { type: 'slot', description: 'Optional leading icon.' },
    endIcon: { type: 'slot', description: 'Optional trailing icon or button.' },
    placeholder: { type: 'string', description: 'Native placeholder text.' },
    type: { type: 'string', default: 'text', description: 'HTML input type.' },
    value: { type: 'string', description: 'Controlled value.' },
    defaultValue: { type: 'string', description: 'Initial value for uncontrolled usage.' },
    disabled: { type: 'boolean', default: false, description: 'Disables the input control.' },
    className: { type: 'string', description: 'Consumer-provided className.' },

    FormElementProps: {
      type: 'object',
      description:
        'Props forwarded to FormElement, which provides field chrome and accessibility wiring.',
      shape: {
        label: { type: 'string' },
        ariaLabel: { type: 'string' },
        hint: { type: 'string' },
        error: { type: 'string' },
        info: { type: 'string' },
        required: { type: 'boolean' },
        disabled: { type: 'boolean' },
        readOnly: { type: 'boolean' },
        asChild: { type: 'boolean' }
      }
    }
  },

  slots: ['startIcon', 'input', 'endIcon'],

  layout: {
    type: 'container',
    tag: 'div',
    children: [
      { slot: 'startIcon', tag: 'span' },
      { slot: 'input', tag: 'input' },
      { slot: 'endIcon', tag: 'span' }
    ]
  },

  rules: [
    {
      hint: 'FormElement provides label, hint, error, and accessible description. Input must not render these.'
    },
    { hint: 'id, aria-*, and disabled are injected by FormElement and forwarded to the <input>.' },
    { hint: 'When FormElement has an error, the Input row may reflect an invalid visual state via the styleMap "invalid" state.' },
    { when: { disabled: true }, hint: 'Control becomes inert; visual disabled state applied.' }
  ],

  styleMap: true
});
