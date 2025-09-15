// packages/blueprints/src/components/Input/Input.contract.ts
import { defineContract } from '../../utilities';

export const InputContract = defineContract({
  component: 'Input',
  description:
    'Single-line text input with label, optional prefix/suffix adornments, and helper text. Supports disabled/readOnly/required and validation states.',
  base: 'TextField', // Radix UI per repo's radix-ui import convention (Root + Input + Slot)

  props: {
    // Content
    label: { type: 'string', required: true, description: 'Visible field label' },
    placeholder: { type: 'string', required: false },
    helperText: { type: 'string', required: false },

    // Adornments (prefix/suffix can be icons, text, or any node)
    prefix: { type: 'slot', required: false, description: 'Leading adornment' },
    suffix: { type: 'slot', required: false, description: 'Trailing adornment' },

    // Behavior / state
    disabled: { type: 'boolean', default: false },
    readOnly: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },

    // Validation state (spec shows explicit valid/invalid visuals)
    validation: {
      type: 'enum',
      options: ['none', 'invalid', 'valid'] as const,
      default: 'none',
      description: 'Validation state: none, invalid, or valid'
    },

    // Native type passthrough (visuals are token-driven; type is semantic)
    type: {
      type: 'enum',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'] as const,
      default: 'text'
    },

    // Layout
    fullWidth: { type: 'boolean', default: false },

    // Composition
    asChild: { type: 'boolean', default: false }
  },

  // Render order for external slots
  slots: ['prefix', 'label', 'suffix', 'helperText'] as const,

  // Layout hint: TextField.Root wrapper with Label, Input, and Slots
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col gap-1',
    children: [
      { slot: 'label', tag: 'label', className: 'text-comp-input-label-color-foreground' },
      {
        type: 'container',
        tag: 'div',
        className: 'inline-flex items-center rounded-md',
        children: [
          { slot: 'prefix', tag: 'span', className: 'shrink-0 -ml-0.5' },
          // The generator will place the actual <input> element between prefix/suffix.
          { slot: 'suffix', tag: 'span', className: 'shrink-0 -mr-0.5' }
        ]
      },
      { slot: 'helperText', tag: 'div', className: 'text-caption-md-regular' }
    ]
  },

  rules: [
    {
      validate: (props: Record<string, unknown>) => {
        const label = props['label'];
        return typeof label === 'string' && label.trim().length > 0;
      },
      message: 'label must be a non-empty string.'
    }
  ],

  styleMap: true
});
