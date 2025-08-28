import { defineContract } from '../../utilities';

export const TestDialogContract = defineContract({
  description: 'A test dialog for verifying core dialog structure and styling.',
  component: 'TestDialog',
  base: 'Dialog',
  props: {
    open: {
      type: 'boolean',
      description: 'Controls the open state of the dialog.',
      required: true
    },
    onOpenChange: {
      type: '(open: boolean) => void',
      description: 'Callback fired when open state changes.',
      required: true
    },
    title: {
      type: 'string',
      description: 'Dialog title text.',
      required: false
    },
    children: {
      type: 'React.ReactNode',
      description: 'Dialog body content.',
      required: false
    }
  },
  optionalEnhancements: ['focusTrap', 'initialFocus', 'closeButton']
});
