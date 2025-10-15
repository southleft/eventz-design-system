// packages/blueprints/src/components/FileUpload/FileUpload.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'FileUpload',
  description:
    'Single-file upload control with drag-and-drop and click-to-browse. Uncontrolled internal state machine with callbacks for key transitions. Thumbnail frame via Radix AspectRatio.',

  base: 'div',

  props: {
    imageFormat: {
      type: 'enum',
      options: ['photo', 'poster'] as const,
      default: 'photo',
      description: 'Controls thumbnail AspectRatio and related layout.'
    },
    accept: {
      type: 'string',
      default: 'image/png,image/jpeg',
      description: 'Comma-separated MIME types/extensions allowed (native input.accept).'
    },
    showThumbnail: {
      type: 'boolean',
      default: true,
      description: 'When true, render the thumbnail frame; if the asset is an image, preview it.'
    },
    label: { type: 'string', description: 'Visible label above the control.' },
    ariaLabel: {
      type: 'string',
      description: 'Accessible name when no visible label is provided.'
    },
    hint: { type: 'string', description: 'Helper text below the control.' },
    info: {
      type: 'string',
      description: 'If present, InfoPopover appears next to the label with this content.'
    },
    error: {
      type: 'string',
      description: 'Consumer-controlled error text; toggles error visual state.'
    },

    imageProperties: {
      type: 'object',
      description:
        'Display-only capability hints rendered in the `properties` slot. These strings are fixed and do not change with state. If omitted, defaults are derived from `imageFormat` (see rules).',
      shape: {
        supports: { type: 'string' },
        maxFilesize: { type: 'string' },
        maxDimensions: { type: 'string' }
      }
    },

    initialValue: {
      type: 'string',
      description:
        'Bootstrap the accepted state with an existing asset reference (e.g., image URL or id).'
    },

    resetOnFail: {
      type: 'boolean',
      default: false,
      description:
        'When an unexpected failure occurs: if true, auto-reset to empty; if false, remain frozen in uploading/error until user cancels.'
    },

    fileNoun: {
      type: 'string',
      description:
        'Copy override for CTA nouns. When provided, always overrides; otherwise use `photo`/`poster` from imageFormat.'
    },

    // Callbacks (runtime payload: { file?: File, message: string })
    onFileSelected: {
      type: 'callback',
      args: ['file?: File', 'message: string'],
      description: 'User selected/dropped a file that passes `accept`; enter uploading visuals.'
    },
    onFileCanceled: {
      type: 'callback',
      args: ['file?: File', 'message: string'],
      description: 'User canceled during uploading; return to empty.'
    },
    onFileAccepted: {
      type: 'callback',
      args: ['file?: File', 'message: string'],
      description: 'File accepted/ready; enter accepted visuals.'
    },
    onFileChanging: {
      type: 'callback',
      args: ['file?: File', 'message: string'],
      description: 'User initiates replace while accepted; back to uploading.'
    },
    onFileError: {
      type: 'callback',
      args: ['file?: File', 'message: string'],
      description:
        'Selection rejected by `accept` filter or unexpected failure during uploading (timeout, abort, corrupted/preview failure, etc.).'
    },
    onFileRemoved: {
      type: 'callback',
      args: ['file?: File', 'message: string'],
      description: 'User removed after accepted; return to empty.'
    }
  },

  // Slots in render order
  slots: [
    'labelRow',
    'dropzone',
    // Children rendered INSIDE the dropzone, in this exact order:
    'thumbnail',
    'primaryAction',
    'secondaryAction',
    'properties',
    // Message area mirrors Input; runtime conditionally renders ONE of these:
    'hint',
    'error'
  ] as const,

  // Layout hint: dropzone is a flex column container; its children are nested here
  layout: {
    type: 'container',
    tag: 'div',
    className: ['relative', 'w-full', 'outline-none'],
    children: [
      { slot: 'labelRow', tag: 'div' },
      {
        slot: 'dropzone',
        tag: 'button', // native focus + Enter/Space
        children: [
          { slot: 'thumbnail', tag: 'div' },
          { slot: 'primaryAction', tag: 'div' },
          { slot: 'secondaryAction', tag: 'div' },
          { slot: 'properties', tag: 'div' }
        ]
      },
      { slot: 'hint', tag: 'div' },
      { slot: 'error', tag: 'div' }
    ]
  },

  rules: [
    {
      hint: 'Use Radix AspectRatio internally for the thumbnail frame; keep icons decorative (aria-hidden=true).'
    },
    {
      hint: 'Implement drag-and-drop on the dropzone; Space/Enter should trigger the native file dialog.'
    },
    { hint: 'Single file only; do not set input[multiple].' },

    // Dropzone content order (canonical)
    {
      hint: 'Inside the dropzone (flex column), render slots in this order: thumbnail → primaryAction → secondaryAction → properties.'
    },

    // State model & flags
    {
      hint: 'Internal state model: empty → uploading → accepted; uploading → (canceled|error) → empty; accepted → (changing) → uploading. Reflect states via data attributes: data-drag-over, data-uploading, data-accepted, and data-invalid (for error styling).'
    },

    // {NOUN} resolution for visible strings
    {
      hint: 'Copy tokens use {NOUN}. Resolution order: fileNoun (if provided) → imageFormat (photo|poster).'
    },

    // Accept filter behavior and error handling
    {
      hint: 'Apply accept filtering before firing onFileSelected: check native input.accept and MIME/extension; on failure, fire onFileError with message and do not enter uploading.'
    },

    // resetOnFail semantics during uploading
    {
      hint: 'During uploading, treat preview decode failure, read/stream error, abort, or timeout as failure: fire onFileError with message. If resetOnFail=true → reset to empty; else remain frozen in uploading/error until user clicks Cancel (then emit onFileCanceled).'
    },

    // Properties slot composition and defaults
    {
      hint: 'Render the `properties` slot as a flex row of three <span>s: "Supports: {imageProperties.supports}", "Max filesize: {imageProperties.maxFilesize}", "Max dimensions: {imageProperties.maxDimensions}". If `imageProperties` is **undefined**, compute defaults by `imageFormat`: photo → supports "PNG and JPG", maxFilesize "5MB", maxDimensions "840px x 840px"; poster → supports "PNG and JPG", maxFilesize "5MB", maxDimensions "840px x 1120px". Always visible.'
    },

    // Placeholder thumbnail behavior (single asset)
    {
      hint: 'Use a single placeholder image for the thumbnail frame. Render an <img src={fileThumbnail} alt="" aria-hidden="true" /> inside AspectRatio. Show the placeholder during uploading, on non-image files (when showThumbnail=true), and on preview failure. For non-image files, keep showing the placeholder even in accepted state when showThumbnail=true.'
    },

    // Label + InfoPopover composition (mirrors Input)
    {
      when: { info: (v: unknown) => typeof v === 'string' && v.trim().length > 0 },
      hint: 'Render the InfoPopover trigger inline with the label inside the `labelRow` slot.'
    },

    // Message area (mirrors Input runtime) — conditional rendering, no data-* switching
    {
      hint: 'Render either the `error` slot or the `hint` slot (never both). When error text exists, render the `error` slot and prepend an `ErrorIcon`; otherwise, if hint text exists, render the `hint` slot.'
    },

    // A11y wiring — mirror Input’s aria-describedby behavior
    {
      hint: 'Compute `aria-describedby` for the dropzone button like Input: merge the open InfoPopover content id (if any) with the id of the rendered message node (error OR hint).'
    },

    // Dropzone details (native button best practices)
    {
      hint: 'Render the dropzone as <button type="button">. Prevent default on dragenter/dragover/drop to avoid browser navigation. Handle Space/Enter to open the file dialog. Maintain focus ring on keyboard focus.'
    },

    // Hidden input wiring (forward native props)
    {
      hint: 'Create a visually-hidden <input type="file"> with id from useId(). Forward native input attributes (at least: name, required, form) and the `accept` prop. Programmatically trigger input.click() from the dropzone and from the primary action.'
    },

    // 🔁 Uploading exit criteria (explicit)
    {
      hint: 'This component does **not** manage network upload. Enter `uploading` immediately after a file passes the `accept` filter. Transition to `accepted` after local readiness: (a) image preview successfully decodes if the file is an image; or (b) for non-images, immediately after selection. On any local failure, fire `onFileError` and either reset or freeze per `resetOnFail`.'
    },

    // 🔊 Drag announcements (live region location)
    {
      hint: 'Add a visually-hidden live region near the dropzone: <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" />. Write short messages on drag enter/over/leave (e.g., "Drag files over", "Drop now") to announce state changes.'
    }
  ] as const,

  styleMap: true,

  hints: {
    radixAdapter: { uses: ['AspectRatio'] as const },

    references: [
      { name: 'Input.runtime', path: 'packages/core/src/components/Input/Input.tsx' },
      { name: 'Input.styleMap', path: 'packages/blueprints/src/components/Input/Input.styleMap.ts' }
    ],

    a11y: 'Dropzone is focusable (render as <button> for native keyboard support). Space/Enter keys activate the file dialog. Announce drag state with a hidden live region. Thumbnails are decorative; accessible name comes from label/ariaLabel; errors/hints are associated via aria-describedby.',

    uiCopy: {
      empty: { primary: 'Select {NOUN}', secondary: 'Or drop to upload' },
      uploading: { primary: 'Uploading…', secondary: 'Cancel upload' },
      accepted: { primary: 'Change {NOUN}', secondary: 'Remove {NOUN}' }
    },

    primaryAction: {
      component: 'Button',
      variant: 'primary',
      labelSource: 'uiCopy.primary',
      startIconSource: 'icons.primary'
    },

    secondaryAction: {
      component: 'TextLink',
      variant: 'subtle',
      behavior: {
        empty: { interactive: false, render: 'text' },
        uploading: { interactive: true, action: 'cancel-upload' },
        accepted: { interactive: true, action: 'remove-file' }
      },
      labelSource: 'uiCopy.secondary'
    },

    icons: {
      primary: {
        empty: 'FileUploadIcon',
        uploading: 'AnimatedCircularProgressIcon',
        accepted: 'FileUploadIcon'
      }
    },

    stateFlags: ['dragOver', 'uploading', 'accepted', 'invalid'],

    aspectRatio: { photo: '1/1', poster: '3/4' },

    assets: {
      placeholder: {
        import: 'fileThumbnail',
        from: './fileThumbnail.png',
        usedInStates: ['uploading', 'nonImage', 'previewError']
      }
    },

    // Canonical messages for callback payloads (used in examples/tests; generator may inline)
    messages: {
      onFileSelected: 'File selected',
      onFileCanceled: 'Upload canceled',
      onFileAccepted: 'File ready',
      onFileChanging: 'Changing file',
      onFileError: 'Upload failed',
      onFileRemoved: 'File removed'
    },

    // Format-specific default properties (used when props.imageProperties is undefined)
    defaultImageProperties: {
      photo: {
        supports: 'PNG and JPG',
        maxFilesize: '5MB',
        maxDimensions: '840px x 840px'
      },
      poster: {
        supports: 'PNG and JPG',
        maxFilesize: '5MB',
        maxDimensions: '840px x 1120px'
      }
    },

    imports: {
      primitives: [{ name: 'AspectRatio' }],
      components: [{ name: 'Button' }, { name: 'TextLink' }, { name: 'InfoPopover' }],
      icons: [
        { name: 'FileUploadIcon' },
        { name: 'AnimatedCircularProgressIcon' },
        { name: 'ErrorIcon' }
      ],
      assets: [{ name: 'fileThumbnail', from: './fileThumbnail.png' }]
    }
  }
});
