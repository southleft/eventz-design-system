// packages/blueprints/src/components/Input/Input.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const InputStyleMap = defineStyleMap({
  component: 'Input',
  description:
    'Control-only row (startIcon → input → endIcon). Field chrome (label/hint/error) is provided by FormElement.',
  base: 'relative flex items-center rounded-md transition-colors focus-within:ring-token',
  state: {
    disabled: 'opacity-50 cursor-not-allowed',
    invalid: 'border-border-error text-content-error'
  },
  slots: {
    startIcon: 'mr-2 shrink-0 [&>svg]:size-4',
    input: 'flex-1 bg-transparent outline-none',
    endIcon: 'ml-2 shrink-0 [&>svg]:size-4'
  }
});
