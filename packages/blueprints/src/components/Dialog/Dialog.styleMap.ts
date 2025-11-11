import { defineStyleMap } from '../../utilities';

export const DialogStyleMap = defineStyleMap({
  base: ['relative', 'outline-none'] as const,

  slots: {
    // full-screen grid wrapper that centers the dialog and provides 20px gutters
    centerer: [
      'fixed',
      'inset-0',
      'grid',
      'place-items-center',
      'p-20',
      'pointer-events-none'
    ] as const,

    // overlay sits visually behind content
    overlay: [
      'fixed',
      'inset-0',
      'z-0',
      'bg-color-background-inverted/50',
      'data-[state=open]:animate-overlayShow'
    ] as const,

    // modal surface (no positioning — centered by the centerer)
    content: [
      'rounded-md',
      'flex',
      'flex-col',
      'min-h-0',
      'gap-8',
      'items-center',
      'p-40',
      'relative',
      'box-border',
      'z-10',
      'outline-none',
      'text-color-content-default',
      'pointer-events-auto',
      'bg-background-modal-dark',
      'shadow-xl',
      'h-[min(650px,calc(100vh-40px))]',
      'overflow-visible',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-4',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-color-background-default'
    ] as const,

    // close row above the content body
    close: ['h-40', 'w-full', 'flex', 'justify-end'] as const,

    // scrollable body for consumer content
    contentBody: ['w-full', 'flex-1', 'min-h-0', 'overflow-auto'] as const,

    // absolute nav controls that protrude 20px beyond edges; round & above content
    controlLeft: [
      'h-40',
      'w-40',
      '!rounded-full',
      'border-none',
      'absolute',
      'z-20',
      'pointer-events-auto',
      'top-1/2',
      '-translate-y-1/2',
      '-left-20',
      'bg-comp-button-color-backgroud-knockout-blur'
    ] as const,
    controlRight: [
      'h-40',
      'w-40',
      '!rounded-full',
      'border-none',
      'absolute',
      'z-20',
      'pointer-events-auto',
      'top-1/2',
      '-translate-y-1/2',
      '-right-20',
      'bg-comp-button-color-backgroud-knockout-blur'
    ] as const,

    // portal kept for structural parity (Radix Portal does not accept className)
    portal: [] as const
  },

  layout: {},

  variants: {},

  state: {
    sizeSm: ['w-600'] as const,
    sizeMd: ['w-full', 'max-w-1300'] as const,
    sizeLg: ['w-full', 'max-w-1600'] as const
  }
});
