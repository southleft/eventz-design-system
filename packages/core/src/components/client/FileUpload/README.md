# FileUpload
*Type: client* | *Base: div* | *Last updated: 2025-11-11*

## Overview
FileUpload renders a labeled dropzone for image uploads with drag states, live-region updates, thumbnail previews, and lifecycle callbacks. It focuses on photo/poster assets but can accept any MIME types you configure via `accept`.

---

## Import

### Component
```ts
import { FileUpload } from '@eventz-ui/core/client/FileUpload';
```

### Types
```ts
import type { FileUploadProps } from '@eventz-ui/core/client/FileUpload';
```

---

## Usage

```tsx
<FileUpload { ...props } />
```

---

## Props (Declared + Inherited)

| Prop              | Type                     | Default | Notes |
| ----------------- | ------------------------ | ------: | ----- |
| `accept`          | `string`                 | `'image/png,image/jpeg'` | Passed to the hidden `<input type="file">`.
| `ariaLabel`       | `string`                 |         | Accessible name when `label` is omitted.
| `error`           | `string`                 |         | Error message shown below the dropzone; toggles invalid state.
| `fileNoun`        | `string`                 | image format | Used in CTA copy (“Select poster”).
| `form`            | `string`                 |         | HTML form owner forwarded to the hidden input.
| `hint`            | `string`                 |         | Helper text below the dropzone (hidden when `error` exists).
| `imageFormat`     | `'photo' \| 'poster'`    | `'photo'` | Controls copy and thumbnail aspect ratio.
| `imageProperties` | `{ supports; maxFilesize; maxDimensions }` | format defaults | Overrides the spec block shown under the dropzone.
| `info`            | `string`                 |         | Renders an `InfoPopover` next to the label when provided.
| `initialValue`    | `string` (URL)           |         | Pre-populates the preview with an existing asset.
| `label`           | `string`                 |         | Visible label text.
| `name`            | `string`                 |         | Form field name.
| `onFileAccepted`  | `(payload: { file?: File; message: string }) => void` | | Called after the file is validated and ready.
| `onFileCanceled`  | Same payload             |         | Fires when an upload is canceled.
| `onFileChanging`  | Same payload             |         | Fires immediately before replacing an existing file.
| `onFileError`     | Same payload             |         | Called when preview/loading fails (still resets UI).
| `onFileRemoved`   | Same payload             |         | Fires when the user clears the current file.
| `onFileSelected`  | Same payload             |         | Fires once a file is chosen (before upload/validation completes).
| `resetOnFail`     | `boolean`                | `false` | When true, failed uploads clear the current file automatically.
| `required`        | `boolean`                |         | Mirrors `required` on the hidden input.
| `showThumbnail`   | `boolean`                | `true`  | Toggles the preview thumbnail.

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` for the outer wrapper.

---

## Structure

* **Label row** — Shows the label + optional `InfoPopover`.
* **Dropzone** — Clicks/drag-n-drop feed a hidden `<input type="file">`; status text and actions sit inside.
* **Thumbnail** — Uses `AspectRatio` + preview image or placeholder.
* **Properties row** — Displays supported formats, max file size, and dimensions.
* **Hint/Error** — Mutually exclusive helper text below the dropzone.

---

## Data Attributes & States

| State flag             | Effect |
| ---------------------- | ------ |
| `data-invalid="true"` | Highlights the dropzone border with the danger token and surfaces the error message.
| `data-drag-over="true"`| Applied while a file is dragged over the dropzone.
| `data-uploading="true"`| Adds `cursor-progress` and disables buttons during upload.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `inline-flex` `border-none` `flex-col` `gap-1` |
| `labelRow` | `inline-flex` `gap-1` `text-color-content-default` `text-xs` `uppercase` |
| `dropzone` | `relative` `group` `inline-flex` `w-full` `flex-col` `items-center` `justify-center` `gap-6` `w-142.5` `rounded-lg` `border` `pt-8` `pl-1` `pr-1` `pb-6` `transition-colors` `bg-comp-form-color-background-default` `border-comp-form-color-border-default` `hover:bg-comp-form-color-background-hover` `hover:border-comp-form-color-hover` `focus-visible-brand` `focus-within:ring-2` `focus-within:ring-offset-4` `focus-within:ring-comp-border-focus-ring` `focus-within:ring-offset-color-background-default` |
| `thumbnail` | `w-[192px]` `overflow-hidden` `rounded-lg` `[&_img]:object-cover` `[&_img]:size-full` |
| `primaryAction` | `group-hover:[&_button]:bg-comp-button-primary-color-background-hover` |
| `secondaryAction` | `group-hover:[&_*]:text-color-content-weak-hover` `text-color-content-weak` `cursor-default` `select-none` |
| `properties` | `flex` `gap-4` `pt-6` `border-t` `border-color-border-subtle` `text-sm` `text-color-content-weak` `group-hover:text-color-content-weak-hover` `group-hover:border-color-border-subtle-hover` |
| `hint` | `text-color-content-subtle` `text-xs` |
| `error` | `text-color-content-utility-danger-subtle` `text-xs` `mt-1` `inline-flex` `gap-2` `pl-1` `items-center` |
| `labelRow (state: invalid)` | `data-[invalid=true]:[&_[data-slot=dropzone]]:border-comp-form-color-border-utility-danger` |
| `labelRow (state: drag over)` | `data-[drag-over=true]:[&_[data-slot=dropzone]]:bg-comp-form-color-background-hover` `data-[drag-over=true]:[&_[data-slot=dropzone]]:border-comp-form-color-hover` |
| `labelRow (state: uploading)` | `data-[uploading=true]:[&_[data-slot=dropzone]]:cursor-progress` |

---

## Accessibility

* **Name:** Use `label` or `ariaLabel`; the hidden input inherits the computed id/`aria-describedby` so hints/errors are announced once.
* **Keyboard:** Space/Enter on the dropzone triggers the file picker; Escape cancels drag states.
* **Roles/States:** Live region announcements (`drag files over`, `drop now`, etc.) help screen-reader users follow drag events.
* **Announcements:** Provide meaningful `info` or helper copy to describe allowed formats; the properties row is visible and readable.
* **Icon-only pattern:** Primary/secondary actions are standard `Button`/`TextLink` components with built-in accessible names.

---

## Patterns & Examples

### Existing preview

```tsx
<FileUpload label="Poster" initialValue={posterUrl} fileNoun="poster" onFileChanging={track} />
```

### Custom properties

```tsx
<FileUpload
  label="Cover art"
  imageProperties={{ supports: 'PNG only', maxFilesize: '3MB', maxDimensions: '1200x630' }}
  accept="image/png"
/>
```

### Error handling

```tsx
<FileUpload
  label="Album art"
  error={uploadError}
  onFileError={({ message }) => setUploadError(message)}
  resetOnFail
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `f72d3c1f379b42d3511dfae7ce4c870bd5052e81a8f6859dd34675ae0a6b9232`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
