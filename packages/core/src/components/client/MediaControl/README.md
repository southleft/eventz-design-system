# MediaControl
*Type: client* | *Base: Control* | *Last updated: 2025-11-11*

## Overview
MediaControl is an icon-only button that toggles between play and pause states. It wraps the shared `Control` component, supports controlled/uncontrolled state, and emits `onPlay`, `onPause`, and `onStateChange` callbacks so you can synchronize external media players. Use it inside MediaCards, hero sections, or any audio/video UI that needs a concise toggle.

---

## Import

### Component
```ts
import { MediaControl } from '@doxyz-ui/core/client/MediaControl';
```

### Types

```ts
import type { MediaControlProps } from '@doxyz-ui/core/client/MediaControl';
```

---

## Usage

```tsx
<MediaControl { ...props } />
```

---

## Props (Declared + Inherited)

| Prop             | Type                                | Default | Required | Notes |
| ---------------- | ----------------------------------- | ------: | :------: | ----- |
| `ariaLabelPause` | `string`                            | `'Pause media'` |      | Accessible name when the control will pause on activation. Trimmed; falls back to the default if empty.
| `ariaLabelPlay`  | `string`                            | `'Play media'` |      | Accessible name when the control will play on activation.
| `className`      | `string`                            |         |          | Appends utility classes to the underlying `Control`.
| `defaultState`   | `'playing' \| 'paused'`             | `'paused'` |        | Initial uncontrolled state.
| `onPause`        | `() => void`                        |         |          | Fired after the state transitions to `'paused'`.
| `onPlay`         | `() => void`                        |         |          | Fired after the state transitions to `'playing'`.
| `onStateChange`  | `(state: 'playing' \| 'paused') => void` |     |          | Emitted on every toggle (before `onPlay`/`onPause`).
| `size`           | `'lg' \| 'sm'`                      | `'lg'`   |          | Forwarded to `Control`.
| `state`          | `'playing' \| 'paused'`             |         |          | Controlled state. When provided, internal state is ignored.
| `variant`        | `'brand' \| 'dark' \| 'light'`      | `'light'` |        | Forwarded to `Control`.

* **Extends:** `ControlProps` minus `icon`/`ariaLabel`.

---

## Structure

* **Control** — Root button from the shared `Control` component.
* **_icon** — Internal slot wrapping `<PlayIcon>` or `<PauseIcon>` depending on state.

> DOM structure sketch:

```jsx
<Control
  icon={<span data-slot="_icon">{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>}
  ariaLabel={isPlaying ? ariaLabelPause : ariaLabelPlay}
  data-state={state}
  onClick={handleToggle}
/>
```

---

## Data Attributes & States

| State flag            | Effect |
| --------------------- | ------ |
| `data-state="playing"` | Tints the icon with the brand content color (via style map).
| `data-state="paused"`  | Shows the play icon and removes the tint.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `_icon` | — |
| `container (state: playing)` | `text-color-content-brand` |

---

## Accessibility

* **Name:** Provide meaningful `ariaLabelPlay`/`ariaLabelPause`. The component trims them, falling back to sensible defaults when empty.
* **Keyboard:** Because it wraps `Control`, it inherits button semantics—Space/Enter toggles play/pause.
* **Roles/States:** `aria-pressed` is not used; instead, consumers rely on `ariaLabel*` plus surrounding media context. Add `aria-pressed` externally if you need to expose toggle semantics.
* **Announcements:** Pair with live regions or subtitles to describe what media will play/pause.
* **Icon-only pattern:** Icons are `aria-hidden`; the accessible name comes exclusively from the `ariaLabel*` props.

---

## Patterns & Examples

### Uncontrolled toggle

```tsx
<MediaControl onPlay={audio.play} onPause={audio.pause} />
```

- Useful when the player can infer state changes directly from the button.

### Controlled with analytics

```tsx
<MediaControl
  state={playerState}
  onStateChange={next => {
    setPlayerState(next);
    trackEvent('media_control_toggle', { next });
  }}
/>
```

- `onStateChange` fires before `onPlay`/`onPause`, so you can update state optimistically.

### Compact variant

```tsx
<MediaControl size="sm" variant="brand" ariaLabelPlay="Play teaser" ariaLabelPause="Pause teaser" />
```

- Small variant works well inside badges or stacked cards.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `e66f4f5a55d6ce978ba9f1b1688fae3f67a5e26257579f58171117c6888a5549`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
