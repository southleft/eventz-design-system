// packages/blueprints/src/components/FileUpload/FileUpload.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'FileUpload',
  description:
    'Single-file upload control with drag-and-drop and click-to-browse. Uncontrolled internal state machine with callbacks for key transitions. Thumbnail frame via Radix AspectRatio.',

  // Composite base; internal layout uses div/AspectRatio.
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
        'Display-only capability hints rendered in the `properties` slot. These strings are fixed and do not change with state.',
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
    'thumbnail',
    'progress',
    'status',
    'primaryAction',
    'secondaryAction',
    'properties',
    'message'
  ] as const,

  // Layout hint (structure only; classes finalized in styleMap)
  layout: {
    type: 'container',
    tag: 'div',
    className: ['relative', 'w-full', 'outline-none'],
    children: [
      { slot: 'labelRow', tag: 'div' },
      { slot: 'dropzone', tag: 'button' }, // native focus + Enter/Space
      { slot: 'thumbnail', tag: 'div' },
      { slot: 'progress', tag: 'div' },
      { slot: 'status', tag: 'div' },
      { slot: 'primaryAction', tag: 'div' },
      { slot: 'secondaryAction', tag: 'div' },
      { slot: 'properties', tag: 'div' },
      { slot: 'message', tag: 'div' }
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

    // State model & flags (drives show/hide, icon swaps, and copy)
    {
      hint: 'Internal state model: empty → uploading → accepted; uploading → (canceled|error) → empty; accepted → (changing) → uploading. Reflect states via data attributes: data-drag-over, data-uploading, data-accepted, data-error.'
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

    // Properties slot composition (fixed across states)
    {
      hint: 'Render the `properties` slot as a flex row. Inside, render three <span> children: "Supports: {imageProperties.supports}", "Max filesize: {imageProperties.maxFilesize}", "Max dimensions: {imageProperties.maxDimensions}". Always visible and unchanged in all states.'
    },

    // Placeholder thumbnail behavior (single asset)
    {
      hint: 'Use a single placeholder image for the thumbnail frame during uploading, on non-image files when showThumbnail=true, and on preview failure. Import it next to the component as `import fileThumbnail from "./fileThumbnail.png"`. Render it inside AspectRatio; sizing is handled by AspectRatio.'
    },

    // ── Label + InfoPopover composition (mirrors Input’s pattern)
    {
      when: { info: (v: unknown) => typeof v === 'string' && v.trim().length > 0 },
      hint: 'Render the InfoPopover trigger inline with the label inside the `labelRow` slot (e.g., label text followed by an inline info trigger).'
    },

    // ── Message slot semantics (mirrors Input’s message precedence + a11y wiring)
    {
      hint: 'The `message` slot is used for either hint or error. When both exist, render **error** instead of hint. Prepend an `ErrorIcon` to the error copy. Merge the rendered message id (and the InfoPopover content id if open) into `aria-describedby` on the dropzone button.'
    },

    // ── Dropzone details (native button best practices)
    {
      hint: 'Render the dropzone as <button type="button">. Prevent default on dragenter/dragover/drop to avoid browser navigation. Handle Space/Enter to open the file dialog. Maintain focus ring on keyboard focus.'
    },

    // ── Hidden input wiring (forward native props)
    {
      hint: 'Create a visually-hidden <input type="file"> with id from useId(). Forward native input attributes (at least: name, required, form) and the `accept` prop. Programmatically trigger input.click() from dropzone/button and from the primary action.'
    },

    // ── Status copy suggestion
    {
      hint: 'In the `status` slot, show the current filename and a humanized size (e.g., 1.4 MB) when available.'
    }
  ] as const,

  styleMap: true,

  hints: {
    radixAdapter: {
      uses: ['AspectRatio'] as const
    },

    a11y: 'Dropzone is focusable (render as <button> for native keyboard support). Space/Enter keys activate the file dialog. Announce drag state with aria-live="polite". Thumbnails are decorative; filename is textual in status.',

    // UI copy per state (generator templating with {NOUN})
    uiCopy: {
      empty: { primary: 'Select {NOUN}', secondary: 'Or drop to upload' },
      uploading: { primary: 'Uploading…', secondary: 'Cancel upload' },
      accepted: { primary: 'Change {NOUN}', secondary: 'Remove {NOUN}' }
    },

    // Primary action wiring (Button)
    primaryAction: {
      component: 'Button',
      variant: 'primary',
      labelSource: 'uiCopy.primary',
      startIconSource: 'icons.primary'
    },

    // Secondary action wiring (TextLink or styled text)
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

    // Primary icon per state (passed to Button as startIcon)
    icons: {
      primary: {
        empty: 'FileUploadIcon',
        uploading: 'AnimatedCircularProgressIcon',
        accepted: 'FileUploadIcon'
      }
    },

    // Flags the runtime should toggle and the styleMap will consume
    stateFlags: ['dragOver', 'uploading', 'accepted', 'error'],

    // AspectRatio guidance
    aspectRatio: {
      photo: '1/1',
      poster: '3/4'
    },

    // Asset guidance for placeholder image
    assets: {
      placeholder: {
        import: 'fileThumbnail',
        from: './fileThumbnail.png',
        usedInStates: ['uploading', 'nonImage', 'previewError']
      }
    },

    // ── Imports inventory (to aid the generator; module resolution may use project aliases)
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
