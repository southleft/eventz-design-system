import { defineStyleMap } from '../../utilities';

export const TestDialogStyleMap = defineStyleMap({
  root: 'dialog-bg dialog-text',
  overlay: 'fixed inset-0 bg-gray-900/50',
  content: 'rounded-lg p-6 shadow-lg bg-white dark:bg-gray-900',
  title: 'dialog-title mb-4',
  closeButton:
    'absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
});
