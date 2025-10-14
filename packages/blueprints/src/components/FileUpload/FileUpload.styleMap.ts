// packages/blueprints/src/components/FileUpload/FileUpload.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  // Root/base classes — token-first where possible
  base: [
    'relative',
    'w-full',
    'rounded-md',
    'border',
    'bg-surface',
    'text-foreground',
    'outline-none',
    'transition-colors',
    'focus-within:ring-2',
    'focus-within:ring-offset-2'
    // Prefer token ring color once mapped in theme:
    // 'focus-within:ring-comp-fileupload-focus-color-ring'
  ] as const,

  // Slot-level classes
  slots: {
    container: [] as const,

    // Label row (label + optional InfoPopover)
    labelRow: ['mb-2', 'flex', 'items-start', 'gap-2'] as const,

    // Interactive dropzone (rendered as <button>)
    dropzone: [
      'relative',
      'flex',
      'w-full',
      'items-center',
      'justify-center',
      'rounded-md',
      'border',
      'border-dashed',
      'bg-muted/30',
      'px-4',
      'py-8',
      'text-center',
      'cursor-pointer',
      'select-none',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'hover:bg-muted/40',
      'data-[drag-over=true]:bg-accent/20',
      'data-[drag-over=true]:border-accent'
    ] as const,

    // Thumbnail host (AspectRatio wrapper is inside)
    thumbnail: ['mt-3', 'overflow-hidden', 'rounded-md', 'bg-muted/20', 'border'] as const,

    // Absolute overlay for progress spinner
    progress: [
      'absolute',
      'inset-0',
      'flex',
      'items-center',
      'justify-center',
      'pointer-events-none'
    ] as const,

    // Filename / status copy
    status: ['mt-2', 'text-sm', 'text-foreground/80'] as const,

    // Primary action button container
    primaryAction: ['mt-3'] as const,

    // Secondary action (text link)
    secondaryAction: [
      'mt-2',
      'text-sm',
      'underline',
      'underline-offset-2',
      'text-foreground/70',
      'hover:text-foreground'
    ] as const,

    // Display-only capability strings
    properties: ['mt-3', 'text-xs', 'text-foreground/70', 'leading-snug'] as const,

    // Hint / error message region (consumer-driven)
    message: ['mt-2', 'text-sm'] as const
  },

  // No visual variants — visuals are driven by state + tokens
  variants: {},

  // State flags toggled via data-*
  state: {
    dragOver: [] as const, // handled inline on dropzone via data attribute
    uploading: ['data-[uploading=true]:cursor-progress'] as const,
    accepted: [] as const,
    error: ['data-[error=true]:ring-2', 'data-[error=true]:ring-destructive'] as const,

    // Axis-as-state: image format controls min-heights and aspect ratio variable
    imageFormatPhoto: [
      'data-[image-format=photo]:[--fileupload-ar:1/1]',
      'data-[image-format=photo]:[--fileupload-min-h:theme(spacing.40)]' // ~160px
    ] as const,
    imageFormatPoster: [
      'data-[image-format=poster]:[--fileupload-ar:3/4]',
      'data-[image-format=poster]:[--fileupload-min-h:theme(spacing.56)]' // ~224px
    ] as const
  }
});
