# Carousel
*Type: client* | *Base: div (Embla viewport)* | *Last updated: 2025-11-08*

## Overview
Carousel wraps Embla Carousel and its Autoplay plugin to deliver a horizontal slider with snapping, peek support, indicators, and navigation helpers exposed via context. Use it for hero galleries, testimonials, or product cards where you need embeddable slides and optional autoplay.

---

## Import

### Component
```ts
import { Carousel } from '@doxyz-ui/core/client/Carousel';
```

### Hook
```ts
import { useCarouselContext } from '@doxyz-ui/core/client/Carousel';
```

---

## Usage

```tsx
<Carousel autoPlay loop ariaLabel="Customer quotes">
  {quotes.map(quote => (
    <CarouselSlide key={quote.id}>
      <QuoteCard {...quote} />
    </CarouselSlide>
  ))}
</Carousel>
```

- Wrap slide content in elements that fill the available width; the component clones children inside Embla’s track.
- Consume `useCarouselContext()` inside descendants to render custom controls or indicators (prev, next, goTo, etc.).

---

## Props (Declared + Inherited)

| Prop                     | Type                           | Default | Notes |
| ------------------------ | ------------------------------ | ------: | ----- |
| `align`                  | `'start' \| 'center' \| 'end'` | `'center'` | Embla alignment — determines where slides snap.
| `ariaLabel`              | `string`                       | `'Carousel'` | Accessible name when `ariaLabelledBy` is absent.
| `ariaLabelledBy`         | `string`                       |         | ID of a visible heading that labels the carousel.
| `autoPlay`               | `boolean`                      | `false` | Enables Embla Autoplay plugin.
| `autoPlayDelay`          | `number`                       |  4000    | Delay between automatic advances (ms).
| `autoPlayPauseOnFocus`   | `boolean`                      | `true`  | Pauses autoplay when focus enters the carousel.
| `autoPlayPauseOnHover`   | `boolean`                      | `true`  | Pauses autoplay on hover.
| `autoPlayPauseOnInteraction` | `boolean`                  | `true`  | Pauses autoplay while the user drags/clicks.
| `autoPlayStopOnLast`     | `boolean`                      | `false` | When loop=false, stop autoplay on the final slide.
| `onAutoPlayChange`       | `(playing: boolean) => void`   |         | Called whenever autoplay starts or stops.
| `children`               | `React.ReactNode`              |   —     | Slide content.
| `currentIndex`           | `number`                       |         | Controlled slide index.
| `defaultIndex`           | `number`                       | `0`     | Initial slide for uncontrolled mode.
| `loop`                   | `boolean`                      | `false` | Wrap-around navigation.
| `onChange`               | `(index: number) => void`     |         | Fires whenever the selected index changes.
| `onInViewChange`         | `(indices: number[]) => void` |         | Fired when the set of slides currently visible changes.
| `peek`                   | `boolean`                      | `false` | Applies `data-peek` to slides so adjacent slides peek in.
| `respectReducedMotion`   | `boolean`                      | `true`  | Suppresses autoplay when `prefers-reduced-motion` is set.
| `showIndicators`         | `boolean`                      | `true`  | Displays built-in indicators beneath the carousel.

---

## Structure & Context

* **_container** — Embla viewport (`overflow-hidden`) with Embla track/slide wrappers.
* **_slide** — Wrapper applied to each child; receives `data-peek` when `peek` is enabled.
* **_indicators / _indicator** — Optional button row; `aria-current="true"` on the active indicator.
* **Context (`useCarouselContext`)** exposes navigation helpers (`prev`, `next`, `goTo`), state (`count`, `currentIndex`, `canPrev`, `canNext`), slide helpers (`isSelected`, `isInView`), and optional `autoPlay` controls (`play`, `stop`, `isPlaying`).

---

## Data Attributes & States

| State flag           | Effect |
| -------------------- | ------ |
| `data-is-dragging`   | Applied while Embla handles pointer drag; useful for disabling transitions.
| `data-is-at-start` / `data-is-at-end` | True when the carousel can’t scroll further (loop=false).
| `data-has-indicators`| Indicates whether the built-in indicator row is rendered.
| `data-is-auto-playing` | Applied when the autoplay plugin is actively running.
| `data-peek="true"`  | Added to slides when `peek` is enabled to adjust sizing.

---

## Classes

| Slot        | Classes |
| ----------- | ------- |
| `_container`| `embla relative block overflow-hidden w-full touch-pan-y`
| `_track`    | `embla__container flex items-stretch [will-change:transform] [transform:translateZ(0)]`
| `_slide`    | `embla__slide group shrink-0 not-data-[peek=true]:basis-full min-w-0`
| `_indicators` | `flex justify-center items-center gap-2 pt-32 pb-12`
| `_indicator` | `rounded-full transition-[transform,opacity] focus-visible:ring-2 ...` (active/inactive tokens built in).

---

## Accessibility

* **Name:** Provide `ariaLabel` or `ariaLabelledBy` so screen readers announce the region.
* **Keyboard:** Users can Tab to indicator buttons (and any focusable slide content). Provide custom prev/next controls via `useCarouselContext` when needed.
* **Roles/States:** Indicators use `aria-current` to announce the active slide; slides remain ordinary content so focusable elements behave normally.
* **Announcements:** Consider adding a heading before the carousel describing its content; `onChange` can update a live region with slide titles if required.
* **Reduced motion:** With `respectReducedMotion=true`, autoplay does not start when users prefer reduced motion; expose `autoPlay.play()` via context for manual opt-in.

---

## Patterns & Examples

### Controlled carousel

```tsx
const [index, setIndex] = useState(0);
<Carousel currentIndex={index} onChange={setIndex} loop>
  {slides}
</Carousel>
```

### Custom controls

```tsx
function CarouselControls() {
  const { prev, next, currentIndex, count } = useCarouselContext();
  return (
    <div className="flex gap-2">
      <Button onClick={prev}>Previous</Button>
      <Button onClick={next}>Next</Button>
      <span>{currentIndex + 1} / {count}</span>
    </div>
  );
}
```

### Autoplay toggle

```tsx
function AutoPlayToggle() {
  const { autoPlay } = useCarouselContext();
  if (!autoPlay) return null;
  return (
    <Button onClick={autoPlay.isPlaying ? autoPlay.stop : autoPlay.play}>
      {autoPlay.isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
    </Button>
  );
}
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `93750947ff20442563f7ec7778e65e95e9c31198f3dbac9e5940a27be04ae983`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
