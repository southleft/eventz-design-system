import * as React from 'react';
import { Dialog } from 'radix-ui';

export function TestDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="px-4 py-2 bg-blue-500 text-white">Open Dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 bg-white p-4 rounded shadow-lg -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold">Hello!</Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            This is a Radix dialog.
          </Dialog.Description>
          <Dialog.Close className="text-blue-500">Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
