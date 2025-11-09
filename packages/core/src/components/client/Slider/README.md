# Slider
*Type: client* | *Base: RadixSlider.Root* | *Last updated: 2025-11-08*

## Overview
Slider exposes a single-thumb, horizontal slider built on Radix Slider. It targets volume/seek scenarios, uses a controlled `value`, and emits “change” and “commit” callbacks so you can separate live updates from final actions. Keyboard interactions mirror Radix (Arrow, Page, Home/End), and you must provide an accessible label for the thumb.

---

## Import

### Component
```ts
import { Slider } from '@doxyz-ui/core/client/Slider';
```

### Types

```ts
import type { SliderProps } from '@doxyz-ui/core/client/Slider';
```

---

## Usage

```tsx
<Slider { ...props } />
```

---

## Props (Declared + Inherited)

| Prop            | Type                     | Default | Required | Notes |
| --------------- | ------------------------ | ------: | :------: | ----- |
| `ariaLabel`     | `string`                 |         |   Yes    | Accessible name applied to the thumb/root when `ariaLabelledBy` is absent.
| `ariaLabelledBy`| `string`                 |         |          | Links the thumb to an external label element; overrides `ariaLabel`.
| `max`           | `number`                 |       100 |          | Upper bound of the domain.
| `min`           | `number`                 |         0 |          | Lower bound of the domain.
| `onChange`      | `(value: number) => void`|         |   Yes    | Fires on every drag/click.
| `onCommit`      | `(value: number) => void`|         |          | Fires once per interaction when the thumb is released.
| `step`          | `number`                 |         1 |          | Increment applied to keyboard/pointer updates.
| `value`         | `number`                 |         |   Yes    | Controlled slider value (single thumb).

* **Extends:** None beyond Radix’s slider root; the component does not expose additional props.
* **Forwards:** Ref forwards to `RadixSlider.Root` for imperative access if needed.

---

## Structure

* **container** — `RadixSlider.Root`; sets the width, aria props, and overall keyboard behavior.
* **track (`_track`)** — Background bar spanning the full width.
* **range (`_range`)** — Filled section from min to the current value.
* **thumb (`_thumb`)** — Handle the user drags; inherits focus ring tokens.

> DOM structure sketch:

```jsx
<Slider.Root value={[value]} min={min} max={max} step={step}>
  <Slider.Track>
    <Slider.Range />
  </Slider.Track>
  <Slider.Thumb aria-label={ariaLabel} />
</Slider.Root>
```

---

## Data Attributes & States

*No custom data attributes beyond Radix’s internal `data-orientation` and `data-disabled`. Styling is handled purely through class composition.*

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `w-full select-none touch-none relative w-full h-[12px] flex items-center` |
| `_track`    | `relative w-full h-[4px] rounded-full bg-color-background-subtle overflow-hidden` |
| `_range`    | `absolute left-0 top-0 h-full rounded-full bg-color-background-brand` |
| `_thumb`    | `block size-[8px] rounded-full bg-color-background-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default` |

---

## Accessibility

* **Name:** Provide either `ariaLabel` or `ariaLabelledBy`; without one, screen readers cannot announce the control.
* **Keyboard:** Arrow keys move by `step`, Shift+Arrow jumps further, PageUp/PageDown move by 10× step, and Home/End jump to min/max.
* **Roles/States:** Radix automatically applies `role="slider"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.
* **Announcements:** Use `aria-describedby` externally if you need to communicate units (e.g., “seconds”).
* **Icon-only pattern:** Not applicable—the thumb uses color only; keep contrast high.

---

## Patterns & Examples

### Volume slider

```tsx
<Slider value={volume} onChange={setVolume} onCommit={commitVolume} ariaLabel="Volume" />
```

- Keep `min=0`, `max=100`, `step=1` for standard volume ranges.

### Seek bar

```tsx
<Slider
  value={position}
  onChange={setPosition}
  onCommit={commitSeek}
  min={0}
  max={durationInSeconds}
  step={1}
  ariaLabel="Playback position"
/>
```

- Update `value` as playback progresses so the handle moves even when the user isn’t interacting.

### Labeled slider

```tsx
<label id="brightness-label" className="text-sm font-medium">
  Brightness
</label>
<Slider
  value={brightness}
  onChange={setBrightness}
  ariaLabelledBy="brightness-label"
/>
```

- Linking to a visible label simplifies translations and ensures consistent announcements.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `05a39dfaba0d275a2fe5b512586cb95dc8045ba45849b98e92cc192ca077b2fa`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
