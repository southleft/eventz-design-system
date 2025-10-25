// packages/blueprints/src/components/Input/Input.contract.ts
import { defineContract } from '../../utilities';

export const InputContract = defineContract({
  component: 'Input',
  description:
    'Control-only input row that lives inside FormElement. FormElement owns the field chrome (label, info/hint/error messaging, focus ring) while Input renders the interactive control (startIcon → input → endIcon).',
  base: 'FormElement',

  props: {
    startIcon: { type: 'slot', description: 'Optional leading icon rendered before the input.' },
    endIcon: { type: 'slot', description: 'Optional trailing icon rendered after the input.' },
    className: { type: 'string', description: 'Additional classes for the control row container.' },
    placeholder: { type: 'string', description: 'Native placeholder text.' },
    type: { type: 'string', default: 'text', description: 'HTML input type.' },
    value: { type: 'string', description: 'Controlled value for the native input.' },
    defaultValue: { type: 'string', description: 'Initial value for uncontrolled usage.' },
    name: { type: 'string', description: 'Native input name attribute.' },
    required: {
      type: 'boolean',
      description: 'Marks the field as required; forwarded to FormElement and the native input.'
    },
    readOnly: {
      type: 'boolean',
      description: 'Marks the native input as read-only (still focusable).'
    },
    disabled: {
      type: 'boolean',
      default: false,
      description: 'Disables the fieldset + native input.'
    },
    label: {
      type: 'string',
      description: 'Visible label handled by FormElement (Input must not render its own label).'
    },
    ariaLabel: {
      type: 'string',
      description: 'Accessible name forwarded to FormElement when no visible label is provided.'
    },
    hint: { type: 'string', description: 'Helper text rendered by FormElement.' },
    error: { type: 'string', description: 'Error text rendered by FormElement.' },
    info: { type: 'string', description: 'Info popover content rendered by FormElement.' }
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
      hint: 'Render <FormElement {...wrapperProps} asChild> and place the control row inside so FormElement handles label, messaging, and focus ring styles.'
    },
    {
      hint: 'The internal InputField must forward the Slot-injected id/aria-* props and disabled flag to the native <input> while merging any consumer-provided aria attributes.'
    },
    {
      hint: 'Only render the control row: startIcon (optional) → <input> → endIcon. Both icon wrappers must be <span aria-hidden="true"> containers.'
    },
    {
      hint: 'Do not render label, hint, error, or info markup here—those live entirely within FormElement.'
    },
    {
      hint: 'Use the styleMap slots for the control row container and icon wrappers so focus + invalid styles come from tokens.'
    }
  ],

  styleMap: true
});
