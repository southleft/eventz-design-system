// packages/blueprints/src/components/Textarea/Textarea.contract.ts
import { defineContract } from '../../utilities';

export const TextareaContract = defineContract({
  component: 'Textarea',
  description:
    'Multi-line text input with label and optional helper text. Supports disabled/readOnly/required and validation states.',
  base: 'TextArea', // Radix UI base remains TextArea

  props: {
    // Content
    label: { type: 'string', required: true, description: 'Visible field label' },
    placeholder: { type: 'string', required: false },
    helperText: { type: 'string', required: false },

    // Behavior / state
    disabled: { type: 'boolean', default: false },
    readOnly: { type: 'boolean', default: false },
    required: { type: 'boolean', default: false },

    // Validation (design shows explicit valid/invalid visuals)
    validation: {
      type: 'enum',
      options: ['none', 'invalid', 'valid'] as const,
      default: 'none',
      description: 'Validation state: none, invalid, or valid'
    },

    // Sizing / layout
    rows: { type: 'number', required: false, description: 'Initial row count' },
    fullWidth: { type: 'boolean', default: false },

    // Composition
    asChild: { type: 'boolean', default: false }
  },

  // Render order for external content
  slots: ['label', 'helperText'] as const,

  // Layout hint (non-normative)
  layout: {
    type: 'container',
    tag: 'div',
    className: 'flex flex-col gap-1',
    children: [
      { slot: 'label', tag: 'label', className: 'text-comp-textarea-label-color-foreground' },
      // The generator inserts the actual <textarea> element here.
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

  styleMap: true,

  hints: {
    radixAdapter: {
      validationMap: { none: {}, invalid: { 'aria-invalid': true }, valid: {} } as const
    },
    a11y: {
      recommendation:
        'Associate <label> with the textarea via id/for. If helperText is present, link it with aria-describedby.'
    }
  }
});
