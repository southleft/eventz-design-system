// packages/blueprints/src/components/FileUpload/FileUpload.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  // Surrounding chrome matches Input (label/hint/error handled like Input)
  base: ['inline-flex', 'border-none', 'flex-col', 'gap-1'] as const,

  slots: {
    // Label row (InfoPopover inline), mirrors Input
    labelRow: [
      'inline-flex',
      'gap-1',
      'text-color-content-default',
      'text-xs',
      'uppercase'
    ] as const,

    // DROPZONE — non-focusable group container; children react via group-hover
    dropzone: [
      'relative',
      'group', // ← enables group-hover propagation to child controls
      'inline-flex',
      'w-full',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-4',
      'w-570',
      'rounded-lg',
      'border',
      'pt-32',
      'pl-4',
      'pr-4',
      'pb-24',
      'transition-colors',
      // Base tokens (match Input families)
      'bg-comp-form-color-background-default',
      'border-comp-form-color-border-default',
      // Hover (when the dropzone itself is hovered)
      'hover:bg-comp-form-color-background-hover',
      'hover:border-comp-form-color-hover',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-4',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-color-background-default'
    ] as const,

    // Thumbnail host (AspectRatio handles sizing)
    thumbnail: ['w-[192px]', 'overflow-hidden', 'rounded-lg', '[&_img]:object-cover', '[&_img]:size-full'] as const,

    // Primary action container (Button sits here). Also encourage group-hover for minimal merges.
    primaryAction: ['group-hover:[&_button]:bg-comp-button-primary-color-background-hover'] as const,

    // Secondary action container (TextLink or styled text).
    secondaryAction: ['group-hover:[&_*]:text-color-content-weak-hover', 'text-color-content-weak', 'cursor-default', 'select-none'] as const,

    // Properties row — fixed across states; spans are flex children
    properties: [
      'flex',
      'gap-4',
      'pt-6',
      'border-t',
      'border-color-border-subtle',
      'text-sm',
      'text-color-content-weak',
      'group-hover:text-color-content-weak-hover',
      'group-hover:border-color-border-subtle-hover'
    ] as const,

    // Message area split like Input: runtime conditionally renders ONE of these
    hint: ['text-color-content-subtle', 'text-xs'] as const,
    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
      'mt-1',
      'inline-flex',
      'gap-2',
      'pl-1',
      'items-center'
    ] as const
  },

  variants: {},

  state: {
    // invalid state mirrors Input's pattern — turn the dropzone border red
    invalid: [
      'data-[invalid=true]:[&_[data-slot=dropzone]]:border-comp-form-color-border-utility-danger'
    ] as const,

    // Drag-over accent — restyles dropzone while dragging files over
    dragOver: [
      'data-[drag-over=true]:[&_[data-slot=dropzone]]:bg-comp-form-color-background-hover',
      'data-[drag-over=true]:[&_[data-slot=dropzone]]:border-comp-form-color-hover'
    ] as const,

    // Uploading may change cursor or overlay treatment (keep minimal for now)
    uploading: ['data-[uploading=true]:[&_[data-slot=dropzone]]:cursor-progress'] as const,

    // Accepted has no special chrome here (thumbnail & actions convey state)
    accepted: [] as const
  }
});
