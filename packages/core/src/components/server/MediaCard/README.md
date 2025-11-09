# MediaCard
*Type: server* |
*Base: div* |
*Last updated: 2025-11-08*

## Overview
MediaCard displays a horizontal preview with an optional image, subtitle, label chips, and a required overlay control slot (for example, a play button). The card itself is non-interactive: hover/focus styles react to whichever control you pass in. Use it inside carousels or lists where you want a consistent tile but need to inject your own interactive control.

---

## Import

### Component
```ts
import { MediaCard } from '@doxyz-ui/core/server/MediaCard';
```

### Types

```ts
import type { MediaCardProps } from '@doxyz-ui/core/server/MediaCard';
```

---

## Usage

```tsx
<MediaCard
  subtitle="Season 4 • Episode 12"
  title="Co-designing with AI"
  labels={[
    { icon: <ClockIcon />, label: '38 min' },
    { label: 'Premium' }
  ]}
  imgSrc="/art/episode-12.jpg"
  imgAlt="Episode artwork"
  control={<PlayButton aria-label="Play episode" />}
/>
```

> - The `control` slot must always render something interactive (Button, IconButton, etc.); the card simply positions it.
> - Provide `imgAlt` whenever `imgSrc` exists—use `''` if the artwork is purely decorative.

---

## Props (Declared + Inherited)

Only component-level props are listed; standard `<div>` attributes from `React.HTMLAttributes<HTMLDivElement>` (other than `children`/`title`) are forwarded automatically.

| Prop        | Type                                                    | Default | Required | Notes                                                                                           |
| ----------- | ------------------------------------------------------- | ------- | :------: | ----------------------------------------------------------------------------------------------- |
| `className` | `string`                                                |         |          | Extra utility classes merged with the card grid tokens.                                         |
| `control`   | `React.ReactNode`                                       |         |   Yes    | Required overlay slot—render your own interactive Button/IconButton.                            |
| `imgAlt`    | `string`                                                |         |          | Required when `imgSrc` is provided; pass `''` for decorative art.                               |
| `imgSrc`    | `string`                                                |         |          | Optional artwork shown on the left; omitted entirely when blank.                                |
| `labels`    | `ReadonlyArray<{ icon?: React.ReactNode; label: string }>` |         |          | Optional chip-style metadata; icons are treated as decorative.                                  |
| `subtitle`  | `string`                                                |         |          | Optional supporting line displayed above the title.                                             |
| `title`     | `string`                                                |         |   Yes    | Visible heading that also acts as the accessible name.                                          |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `children`, `title`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **media** — Optional wrapper containing the `<img>` preview.
* **subtitle** — Optional overline text.
* **title**/**titleText** — Inline-flex wrapper ensuring the title truncates correctly.
* **meta**/**metaItem**/**metaIcon** — Container for label chips with optional decorative icons.
* **control** — Absolutely positioned bubble hosting the required control slot.

> DOM structure sketch:

```jsx
<div data-slot="base">
  {imgSrc && (
    <div data-slot="media">
      <img src={imgSrc} alt={imgAlt ?? ''} loading="lazy" decoding="async" />
    </div>
  )}
  {subtitle && <div data-slot="subtitle">{subtitle}</div>}
  <div data-slot="title">
    <span data-slot="titleText">{title}</span>
  </div>
  {labels?.length ? (
    <div data-slot="meta">
      {labels.map(({ icon, label }) => (
        <span key={label} data-slot="metaItem">
          {icon && <span data-slot="metaIcon" aria-hidden="true">{icon}</span>}
          <span>{label}</span>
        </span>
      ))}
    </div>
  ) : null}
  <div data-slot="control">{control}</div>
</div>
```

---

## Data Attributes & States

| State flag | Effect |
| ---------- | ------ |
| None       | MediaCard does not expose `data-*` states; hover/focus styling is driven by `:has()` selectors. |

---

## Classes

| Data slot   | Classes                                                                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`      | `relative` `outline-none` `rounded-md` `border-0` `group` `bg-background-none` `hover:bg-color-background-default` `grid` `[&:has(img)]:grid-cols-[92px_1fr]` `sm:[&:has(img)]:grid-cols-[112px_1fr]` `items-start` `p-2` `w-340` `[&_[data-slot=media]]:row-span-4` `[&:has(:focus-visible)]:ring-offset-2` `[&:has(:focus-visible)]:ring-2` `[&:has(:focus-visible)]:ring-comp-border-focus-ring` `[&:has(:focus-visible)]:ring-offset-color-background-default` |
| `media`     | `relative` `overflow-hidden` `rounded-sm` `border-0` `shrink-0` `[&>img]:w-80` `[&>img]:h-80` `sm:[&>img]:w-104` `sm:[&>img]:h-104` `[&>img]:object-cover` `[&>img]:group-hover:opacity-30`                                   |
| `subtitle`  | `text-xs` `mt-1` `sm:mt-12` `sm:mt-6` `text-color-content-subtle` `group-hover:text-color-content-subtle-hover` `min-w-0` `w-full`                                                                                        |
| `title`     | `inline-flex` `justify-between` `items-center` `mt-1` `min-w-0` `w-286` `w-200` `sm:w-180`                                                                                                                                |
| `titleText` | `block` `text-color-content-default` `group-hover:text-color-content-default-hover` `text-base` `sm:text-lg` `flex-1` `min-w-0` `truncate` `mb-8` `sm:mb-12`                                                               |
| `meta`      | `mt-1` `flex` `flex-wrap` `gap-2` `items-center` `min-w-0` `w-full`                                                                                                                 |
| `metaItem`  | `inline-flex` `items-center` `gap-1` `text-xs` `text-color-content-subtle` `group-hover:text-color-content-subtle-hover`                                                           |
| `metaIcon`  | `shrink-0` `[&>svg]:size-3`                                                                                                                                                         |
| `control`   | `absolute` `right-2` `top-20` `sm:top-32` `inline-grid` `place-items-center` `rounded-full` `backdrop-blur-sm` `p-1.5`                                                              |

---

## Accessibility

* **Name:** The `title` string doubles as the accessible name; avoid duplicating it in `aria-label`.
* **Keyboard:** The card itself stays non-focusable; ensure the `control` slot renders a focusable element responsible for playback or actions.
* **Roles/States:** No additional roles required. If the control toggles state (e.g., play/pause), expose that state on the control itself.
* **Announcements:** Label chips are visible text, so they will be read in order; keep them short to avoid verbose announcements.
* **Icon-only pattern:** Icons inside labels and the control bubble should be `aria-hidden="true"` with accessible text elsewhere (e.g., `aria-label` on the control button).

---

## Patterns & Examples

### Playback control

```tsx
<MediaCard
  title="Night Shift Live"
  labels={[{ label: 'Live' }, { icon: <ClockIcon />, label: '45 min' }]}
  control={<IconButton aria-label="Play Night Shift" icon={<PlayIcon />} />}
/>
```

### Bookmark button

```tsx
<MediaCard
  subtitle="Playlist"
  title="Future Frequencies"
  imgSrc="/art/future-frequencies.jpg"
  imgAlt="Future Frequencies cover"
  control={<IconButton aria-label="Save playlist" icon={<BookmarkIcon />} />}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `801523dcc03fe599adcff80b5aebac06cd989f9e559ba8d1a870ea4dbefdcc40`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
