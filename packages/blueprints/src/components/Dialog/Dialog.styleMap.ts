import { defineStyleMap } from '../../utilities';

export const DialogStyleMap = defineStyleMap({
  // Keep root minimal; most styling lives on slots
  base: ['relative', 'outline-none'] as const,

  // Slot classes (token-first; utilities where tokens don’t exist)
  // container = Dialog.Content
  slots: {
    container: [
      'fixed', 'left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2',
      'rounded-md', 'flex', 'flex-col', 'gap-8', 'items-center', 'p-40', 'relative',
      'bg-modal-dark', 'shadow-md',
      'h-650', 'ml-20', 'mr-20',
      'focus-visible:ring-2', 'focus-visible:ring-comp-dialog-focus-color-ring', 'focus-visible:ring-offset-2',
      'outline-none'
    ] as const,

    overlay: [
      'fixed', 'inset-0',
      'bg-modal-dark/50',
      'data-[state=open]:animate-overlayShow'
    ] as const,

    portal: [] as const,

    // Close row sits above the content block; spacing handled via container gap
    close: ['h-40', 'w-full', 'flex', 'justify-end'] as const,

    navigation: ['relative'] as const,

    controlLeft:  ['h-40', 'w-40', 'rounded-full', 'opacity-50', 'absolute', 'top-1/2', '-translate-y-1/2', '-left-20'] as const,
    controlRight: ['h-40', 'w-40', 'rounded-full', 'opacity-50', 'absolute', 'top-1/2', '-translate-y-1/2', 'right-20'] as const
  },

  // No layout toggles for now
  layout: {},

  // No visual variants for Dialog
  variants: {},

  // Size axis modeled as state flags
  state: {
    sizeSm: ['w-600'] as const,        // fixed width small
    sizeMd: ['max-w-1300'] as const,   // responsive medium
    sizeLg: ['max-w-1600'] as const    // responsive large
  }
});
