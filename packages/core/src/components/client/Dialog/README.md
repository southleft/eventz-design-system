# Dialog
*Type: client* | *Base: RadixDialog.Root* | *Last updated: 2025-11-08*

## Overview
Dialog renders a modal overlay using Radix Dialog primitives. It includes a configurable trigger, overlay, focus-trapped content surface, optional navigation controls, and size presets. Use it for blocking flows such as confirmations or carousels where users can step through content.

---

## Import

### Component
```ts
import { Dialog } from '@doxyz-ui/core/client/Dialog';
```

### Types

```ts
import type { DialogProps } from '@doxyz-ui/core/client/Dialog';
```

---

## Usage

```tsx
<Dialog
  trigger={<Button>Open dialog</Button>}
  size="md"
>
  <div className="space-y-4 w-full">
    <h2 className="text-xl font-semibold">Request access</h2>
    <p>Submit the form below and we’ll review within 24 hours.</p>
    <Form>…</Form>
  </div>
</Dialog>
```

- Provide any React node as `trigger`; it renders via `RadixDialog.Trigger asChild` and receives focus trapping automatically.
- Choose `size` (`sm`, `md`, `lg`) to set the max width.

---

## Props (Declared + Inherited)

| Prop                | Type                                        | Default | Required | Notes |
| ------------------- | ------------------------------------------- | ------: | :------: | ----- |
| `closeIcon`         | `React.ReactNode`                           | `<CloseIcon />` | | Replaces the IconButton glyph used to close the dialog.
| `controlLeftIcon`   | `React.ReactNode`                           | `<ArrowBackIcon />` | | Icon for the left navigation control when `hasNavigation` is true.
| `controlRightIcon`  | `React.ReactNode`                           | `<ArrowForwardIcon />` | | Icon for the right navigation control.
| `hasNavigation`     | `boolean`                                   | `false` |          | When true, renders both navigation IconButtons.
| `onControlLeftClick`| `(event: React.MouseEvent<HTMLButtonElement>) => void` |     |          | Fired when the left nav control is clicked.
| `onControlRightClick`| `(event: React.MouseEvent<HTMLButtonElement>) => void` |    |          | Fired when the right nav control is clicked.
| `size`              | `'sm' \| 'md' \| 'lg'`                      | `'md'`  |          | Determines the content width clamp.
| `trigger`           | `React.ReactNode`                           |         |   Yes    | Element that opens the dialog when activated.

* **Extends:** Radix Dialog root props (`open`, `defaultOpen`, `onOpenChange`, `modal`, etc.).

---

## Structure

* **trigger** — Rendered via `RadixDialog.Trigger asChild`.
* **overlay** — `RadixDialog.Overlay` covering the viewport with a translucent backdrop.
* **centerer** — Full-screen grid wrapper that centers the content and provides gutters.
* **content** — Actual modal surface, sized via the `size` prop.
* **close** — Row containing the close IconButton (`RadixDialog.Close asChild`).
* **contentBody** — Scrollable area where `children` render.
* **controlLeft/right** — Optional IconButtons for previous/next navigation.

> DOM structure sketch:

```jsx
<RadixDialog.Root>
  <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="overlay" />
    <div className="centerer">
      <RadixDialog.Content className="content">
        <div className="close">
          <RadixDialog.Close asChild>
            <IconButton icon={closeIcon ?? <CloseIcon />} ariaLabel="Close dialog" />
          </RadixDialog.Close>
        </div>
        <div className="contentBody">{children}</div>
        {hasNavigation && (
          <>
            <IconButton ariaLabel="Previous" icon={controlLeftIcon ?? <ArrowBackIcon />} />
            <IconButton ariaLabel="Next" icon={controlRightIcon ?? <ArrowForwardIcon />} />
          </>
        )}
      </RadixDialog.Content>
    </div>
  </RadixDialog.Portal>
</RadixDialog.Root>
```

---

## Data Attributes & States

| State flag         | Effect |
| ------------------ | ------ |
| `sizeSm/md/lg`     | Style map hooks that set the max width (`600px`, `1300px`, `1600px`).
| Radix `data-state` | Drives overlay/content animations (`open` block fade).

---

## Classes

| Slot        | Classes |
| ----------- | ------- |
| `overlay`   | `fixed inset-0 z-0 bg-color-background-inverted/50 data-[state=open]:animate-overlayShow` |
| `centerer`  | `fixed inset-0 grid place-items-center p-20 pointer-events-none` |
| `content`   | `rounded-md flex flex-col min-h-0 gap-8 items-center p-40 relative box-border z-10 bg-background-modal-dark shadow-(--shadow-shadows-shadow-6) h-[min(650px,calc(100vh-40px))] overflow-visible focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default` + size class. |
| `close`     | `h-40 w-full flex justify-end` |
| `contentBody` | `w-full flex-1 min-h-0 overflow-auto` |
| `controlLeft/right` | `h-40 w-40 !rounded-full border-none absolute z-20 pointer-events-auto top-1/2 -translate-y-1/2 (-left-20 | -right-20)` |

---

## Accessibility

* **Name:** Place headings or `aria-label`/`aria-describedby` inside `children` to describe the modal’s purpose; Radix handles focus trapping.
* **Keyboard:** Esc closes the dialog, Tab/Shift+Tab stay within the content, and the close IconButton is focusable.
* **Roles/States:** Radix sets `role="dialog"` and `aria-modal="true"` automatically. Navigation controls must have clear `ariaLabel`s (“Previous slide”, “Next slide”).
* **Announcements:** Keep the dialog’s title at the top so screen readers announce it when focus enters the content.
* **Icon-only pattern:** All icon buttons have explicit `ariaLabel`s; customize them when using different icons.

---

## Patterns & Examples

### Confirmation dialog

```tsx
<Dialog trigger={<Button variant="primary">Delete</Button>} size="sm">
  <div className="space-y-4 w-full">
    <h2 className="text-lg font-semibold">Delete project?</h2>
    <p>This action cannot be undone.</p>
    <div className="flex gap-3 justify-end">
      <Button variant="secondary">Cancel</Button>
      <Button variant="knockout">Delete project</Button>
    </div>
  </div>
</Dialog>
```

### Carousel modal

```tsx
<Dialog
  trigger={<Button>Open gallery</Button>}
  hasNavigation
  onControlLeftClick={showPrev}
  onControlRightClick={showNext}
>
  <GallerySlide slide={activeIndex} />
</Dialog>
```

- Use `hasNavigation` to overlay previous/next controls for galleries or onboarding flows.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `678d67b77d4b65ed35e7b1002d5f1f5ff8a36807d4c833134692306ab60fb808`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
