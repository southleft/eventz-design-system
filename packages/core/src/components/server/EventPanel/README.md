# EventPanel
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
EventPanel showcases a large hero image with overlay navigation controls and a stacked block of event details that fades in when the panel scrolls into view. Consumers supply chips, avatars, and call-to-action buttons so the panel can promote livestreams, festivals, or tours without owning interaction logic. The component animates scale and opacity using the `data-is-in-view` flag that higher-level observers toggle.

---

## Import

### Component
```ts
import { EventPanel } from '@doxyz-ui/core/server/EventPanel';
```

### Types

```ts
import type { EventPanelProps } from '@doxyz-ui/core/server/EventPanel';
```

---

## Usage

```tsx
<EventPanel
  imgSrc="https://picsum.photos/seed/event-panel/960/720"
  imgAlt="Crowd at a night concert"
  leftAction={<ArrowLeftIcon aria-label="Previous" />}
  rightAction={<ArrowRightIcon aria-label="Next" />}
  subtitle="Live taping"
  title="Design Signals Tour"
  description="Join the crew in London for a live episode and studio walkthrough."
  chips={[
    <Chip key="date" label="Apr 24" />,
    <Chip key="venue" label="Kings Cross" />
  ]}
  avatars={<AvatarGroup />}
  buttons={<Button variant="primary">Reserve a seat</Button>}
/>
```

> - Always provide both `imgSrc` and descriptive `imgAlt`; the hero image is the focal point and drives the accessible context.
> - The surrounding controller is responsible for toggling `data-is-in-view="true"` on the group when the panel enters the viewport.

---

## Props (Declared + Inherited)

Only component-level props are listed; standard `<div>` attributes from `React.HTMLAttributes<HTMLDivElement>` (other than `children`) are forwarded automatically.

| Prop          | Type                      | Default | Required | Notes                                                                                  |
| ------------- | ------------------------- | ------- | :------: | -------------------------------------------------------------------------------------- |
| `avatars`     | `React.ReactNode`         |         |          | Optional avatar stack rendered below the details.                                      |
| `buttons`     | `React.ReactNode`         |         |          | CTA row displayed beneath the panel.                                                   |
| `chips`       | `React.ReactNode[]`       |         |          | Array of Chip elements rendered inside the labels row.                                 |
| `className`   | `string`                  |         |          | Additional utility classes merged with the base width tokens.                          |
| `description` | `string`                  |         |          | Supporting text inside the details block.                                              |
| `imgAlt`      | `string`                  |         |   Yes    | Accessible description for the hero image (use `''` if purely decorative).             |
| `imgSrc`      | `string`                  |         |   Yes    | Source URL for the hero image.                                                         |
| `leftAction`  | `React.ReactNode`         |         |          | Optional control rendered on the left side of the overlay action bar.                  |
| `loading`     | `'lazy' \| 'eager'`       | `'lazy'` |          | Native loading strategy for the hero `<img>`.                                          |
| `rightAction` | `React.ReactNode`         |         |          | Optional control rendered on the right side of the overlay action bar.                 |
| `subtitle`    | `string`                  |         |          | Uppercase overline text above the title.                                               |
| `title`       | `string`                  |         |          | Event name displayed prominently below the image.                                      |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **_media** — Wrapper containing the hero **_image**, overlay, and **_actionsBar** with **_left**/**_right** slots.
* **_details** — Mobile-visible details stack with optional **_subtitle**, **_title**, **_description**, and **_meta** rows.
* **_meta** — Contains **_labels** (chips) and **_avatars** (avatar group).
* **_buttons** — CTA row positioned beneath the panel so buttons stay visible on all breakpoints.

> DOM structure sketch:

```jsx
<div data-slot="base" data-is-in-view={isInView ? 'true' : undefined}>
  <div data-slot="_media">
    <img data-slot="_image" src={imgSrc} alt={imgAlt} loading={loading} />
    <div data-slot="_overlay" />
    <div data-slot="_actionsBar">
      <div data-slot="_left">{leftAction}</div>
      <div data-slot="_right">{rightAction}</div>
    </div>
  </div>
  <div data-slot="_details">
    {subtitle && <div data-slot="_subtitle">{subtitle}</div>}
    {title && <div data-slot="_title">{title}</div>}
    {description && <div data-slot="_description">{description}</div>}
    {(chips?.length || avatars) && (
      <div data-slot="_meta">
        <div data-slot="_labels">{chips?.map((chip, index) => <React.Fragment key={index}>{chip}</React.Fragment>)}</div>
        <div data-slot="_avatars">{avatars}</div>
      </div>
    )}
  </div>
  {buttons && <div data-slot="_buttons">{buttons}</div>}
</div>
```

---

## Data Attributes & States

| State flag                | Effect                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| `data-[is-in-view=true]`  | Triggers the scale and opacity transitions for the media, details, and buttons slots.            |

---

## Classes

| Data slot    | Classes                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`       | `isolate` `w-[390px]` `lg:w-[560px]` `lg:mx-32`                                                                                                               |
| `_media`     | `relative` `overflow-clip` `w-[390px]` `h-[390px]` `lg:w-[560px]` `lg:h-[490px]` `transform-gpu` `transition-transform` `duration-700` `ease-in-out` `motion-reduce:transition-none` `scale-80` `lg:scale-110` `group-data-[is-in-view=true]:scale-100` |
| `_image`     | `block` `size-full` `object-cover` `object-center`                                                                                                            |
| `_overlay`   | `pointer-events-none` `absolute` `inset-0` `overlay-image-overlay`                                                                                             |
| `_actionsBar`| `absolute` `inset-x-0` `bottom-0` `flex` `items-center` `justify-between` `p-4` `opacity-0` `transition-opacity` `duration-1000` `ease-in-out` `group-data-[is-in-view=true]:opacity-100` `motion-reduce:transition-none` |
| `_left`      | `flex` `items-center` `gap-2`                                                                                                                                 |
| `_right`     | `flex` `items-center` `gap-2`                                                                                                                                 |
| `_details`   | `px-2` `py-4` `lg:hidden` `w-[380px]` `opacity-0` `transition-opacity` `duration-1000` `ease-in-out` `group-data-[is-in-view=true]:opacity-100` `motion-reduce:transition-none` |
| `_subtitle`  | `text-sm` `tracking-wide` `uppercase` `text-color-content-weak`                                                                                               |
| `_title`     | `text-2xl` `text-color-content-default`                                                                                                                       |
| `_description` | `text-base` `text-color-content-weak` `mb-12`                                                                                                               |
| `_meta`      | `flex` `flex-col` `items-start` `gap-2` `text-sm` `text-color-content-weak`                                                                                   |
| `_labels`    | `flex` `flex-wrap` `gap-3` `mb-12`                                                                                                                            |
| `_avatars`   | `flex` `-space-x-2` `items-center`                                                                                                                            |
| `_buttons`   | `mt-12` `lg:mt-24` `mx-12` `lg:mx-0` `flex` `gap-3` `items-center` `justify-start` `lg:justify-end` `opacity-0` `transition-opacity` `duration-1000` `ease-in-out` `group-data-[is-in-view=true]:opacity-100` `motion-reduce:transition-none` |

---

## Accessibility

* **Name:** The hero image must include meaningful `imgAlt`; overlay controls and detail text provide additional spoken context.
* **Keyboard:** Overlay actions and CTA buttons must be focusable elements (Button, Link, etc.) provided via slots.
* **Roles/States:** The root stays a passive `<div>`; assign roles only if the panel becomes part of a carousel.
* **Announcements:** Keep subtitle/title/description informative because they are the only mobile-visible text.
* **Icon-only pattern:** Treat icons inside chips or overlay actions as decorative by setting `aria-hidden="true"` within those nodes.

---

## Patterns & Examples

### Static hero

```tsx
<EventPanel
  imgSrc="/images/event.jpg"
  imgAlt="DJ booth with neon lighting"
  title="Night Shift Live"
  description="Streaming Friday at 8PM CET."
  chips={[<Chip key="stream" label="Livestream" />]}
  buttons={<Button variant="secondary">Add to calendar</Button>}
/>
```

### Carousel-controlled panel

```tsx
<EventPanel
  imgSrc="/images/venue.jpg"
  imgAlt="Theatre seating"
  leftAction={<IconButton icon={<ChevronLeftIcon />} aria-label="Previous show" />}
  rightAction={<IconButton icon={<ChevronRightIcon />} aria-label="Next show" />}
  subtitle="On tour"
  title="DoXYZ Sessions"
  chips={[<Chip key="city" label="Berlin" />, <Chip key="date" label="May 4" />]}
  avatars={<AvatarGroup size="lg" />}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK** (no variants defined)
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `d869ab6a5a3efc916086af73a8f43245e5785e1603e3e4a305fa3dd85bc1e454`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
