# MediaPlayer
*Type: client* |
*Base: host:<div>* |
*Last updated: 2025-11-11*

## Overview
MediaPlayer wraps a native `<audio>` element with MediaControl, Slider, artwork, and trailing action chrome. Use it when you need a full-featured audio player that includes seek and volume sliders, artwork, labels, skip ±10 seconds controls, and a dismiss button. The component supports default, compact, and mini layouts so you can reuse the same API across immersive and condensed contexts.

---

## Import

### Component
```ts
import { MediaPlayer } from '@eventz-ui/core/client/MediaPlayer';
```

### Types

```ts
import type { MediaPlayerProps } from '@eventz-ui/core/client/MediaPlayer';
```

---

## Usage

```tsx
<MediaPlayer { ...props } />
```

---

## Props (Declared + Inherited)

| Prop       | Type       |       Default |                          Required                          | Notes    |
| ---------- | ---------- | ------------: | :--------------------------------------------------------: | -------- |
| `audioSrc` | `string` | `` | Yes | Audio source URL for the underlying `<audio>` element. |
| `autoPlay` | `boolean` | `false` |  | Starts playback immediately once metadata loads. |
| `className` | `string` | `` |  | Appends classes to the root wrapper. |
| `imgAlt` | `string` | `` |  | Alt text for artwork images when `imgSrc` is provided. |
| `imgSrc` | `string` | `` |  | Artwork image URL; when omitted the artwork slot renders a placeholder. |
| `loop` | `boolean` | `false` |  | Replays the source indefinitely. |
| `onCloseClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | `` |  | Invoked when the Close IconButton is pressed. |
| `preload` | `'metadata' \| 'auto' \| 'none'` | `'metadata'` |  | Native `<audio>` preload hint. |
| `showVolume` | `boolean` | `true` |  | Hides the volume slider and icon when `false` (volume forced to 100%). |
| `startTime` | `number` | `0` |  | Initial playback position in seconds; clamps to the loaded duration. |
| `subtitle` | `string` | `` |  | Secondary label shown above the title. |
| `title` | `string` | `` | Yes | Primary label and the fallback region `aria-label`. |
| `variant` | `'default' \| 'compact' \| 'mini'` | `'default'` |  | Layout selection: default shows full chrome, compact hides artwork/time/volume, mini renders MediaControl only. |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`, `dangerouslySetInnerHTML`, `suppressContentEditableWarning`, `suppressHydrationWarning`, `color`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **seek** — top-aligned Slider mount for scrubbing the track.
* **row** — main horizontal chrome containing lead, controls, volume/actions.
* **lead** — wrapper for artwork and label stack.
* **artwork** — square art container (image or placeholder).
* **labels** — vertical stack for subtitle + title/time row.
* **subtitle** — supporting text line above the title.
* **titleRow** — wraps title and time display.
* **title** — primary label.
* **timeDisplay** — formatted current time / duration text.
* **controls** — cluster containing MediaControl and optional ±10s buttons.
* **playPause** — MediaControl root (Radix-based button surface).
* **volumeGroup** — volume slider + icon button cluster (default variant only).
* **volumeRange** — Slider mount for volume adjustments.
* **actions** — trailing area for the Close IconButton or custom actions.

> DOM structure sketch:

```jsx
<div data-variant="default|compact|mini">
  <div data-slot="_seek" />
  <div data-slot="_row">
    <div data-slot="_lead">
      <div data-slot="_artwork" />
      <div data-slot="_labels">
        <div data-slot="_subtitle" />
        <div data-slot="_titleRow">
          <div data-slot="_title" />
          <div data-slot="_timeDisplay" />
        </div>
      </div>
    </div>
    <div data-slot="_controls">
      <button data-slot="_playPause" />
    </div>
    <div data-slot="_volumeGroup">
      <div data-slot="_volumeRange" />
    </div>
    <div data-slot="_actions" />
  </div>
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| `data-variant="default|compact|mini"` | Switches layout tokens, toggling artwork, time display, ±10s buttons, and volume chrome. |

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `root` | `flex` `flex-col` `items-start` `w-full` `h-19.5` `data-[variant=compact]:w-104.5` `group` `data-[variant=mini]:size-10` `data-[variant=mini]:rounded-full` |
| `_seek` | `flex` `items-center` `w-full` `-mb-1.5` `pr-0.5` |
| `_row` | `flex` `items-center` `w-full` `bg-color-background-subtle` `py-5` `group-data-[variant=mini]:h-10` `group-data-[variant=mini]:rounded-full` `group-data-[variant=mini]:py-0` |
| `_lead` | `flex` `items-center` `gap-4` `min-w-0` `flex-1` `pl-4` |
| `_lead ._artwork` | `relative` `shrink-0` `size-10` `overflow-clip` |
| `_lead ._labels` | `flex` `flex-col` `min-w-0` `gap-0` |
| `_lead ._labels ._subtitle` | `text-xs` `font-medium` `text-color-content-weak` `truncate` |
| `_lead ._labels ._titleRow` | `flex` `items-baseline` `gap-2` `min-w-0` |
| `_lead ._labels ._titleRow ._title` | `text-base` `font-medium` `text-color-content-default` `truncate` |
| `_lead ._labels ._titleRow ._timeDisplay` | `text-xs` `font-medium` `text-color-content-weak` `whitespace-nowrap` `pl-2` `border-l` `border-color-background-subtle` |
| `_controls` | `flex` `items-center` `gap-2` |
| `_volumeGroup` | `text-comp-button-color-content-default` `justify-end` `flex` `items-center` `gap-2` `pr-4` |
| `_volumeGroup ._volumeRange` | `w-30` |
| `_actions` | `flex` `items-center` `gap-2` |

---

## Accessibility

* **Name:** The root `role="region"` label defaults to the trimmed `title` value; when blank it falls back to “Media player”. IconButtons and Sliders each define explicit `aria-label`s.
* **Keyboard:** Tab/Shift+Tab move focus through the seek slider, MediaControl, skip buttons, volume slider, and close button. Space/Enter activate IconButtons and MediaControl. Arrow keys adjust the Slider that currently has focus.
* **Roles/States:** MediaControl manages its own pressed state and button semantics; Sliders retain the native `role="slider"`. Artwork placeholders are marked `aria-hidden="true"` when no image is provided.
* **Announcements:** Time display updates via visible text; `aria-live="off"` prevents double announcements. Skip/close actions rely on their `aria-label`s for screen reader feedback.
* **Icon-only pattern:** Replay, Forward, Volume, and Close buttons are icon-only and must keep their provided `ariaLabel` strings. Decorative artwork fallbacks should remain `aria-hidden="true"`.

---

## Patterns & Examples

### Default with artwork

```tsx
<MediaPlayer
  audioSrc="/tracks/episode-3.mp3"
  title="Episode 3"
  subtitle="Momentum"
  imgSrc="/cover.png"
/>
```
* Provides artwork, seek slider, ±10-second IconButtons, and volume controls.
* Supply meaningful `title` and `subtitle` strings so the region label stays descriptive.

---

### Compact queue item

```tsx
<MediaPlayer
  audioSrc="/tracks/teaser.mp3"
  title="Teaser"
  variant="compact"
  onCloseClick={handleDismiss}
/>
```
* Moves MediaControl into the lead slot and hides artwork/time/volume chrome for cramped layouts.
* Use `onCloseClick` to let listeners dismiss or dequeue tracks inline.

---

### Mini floating control

```tsx
<MediaPlayer
  audioSrc="/tracks/focus.mp3"
  title="Focus Loop"
  variant="mini"
  autoPlay
/>
```
* Renders only the MediaControl surface, ideal for picture-in-picture or pinned overlays.
* Pair with another surface (e.g., Now Playing) to show metadata or artwork when using the mini layout.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `57ac1ffdd62bc8e1b802a784445432f42c3d38c89b3973072c560fab9cb46d52`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-10 | Initial documentation |
