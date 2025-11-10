# ImagePanel
*Type: server* |
*Base: div* |
*Last updated: 2025-11-09*

## Overview
ImagePanel powers hero-scale carousel slides by rendering a responsive image, overlay gradient, and a stacked block that fades in when the slide becomes active. Consumers supply CTA buttons and label chips while the component handles scale/opacity transitions tied to the parent’s `data-is-in-view` flag. Use it for promotional rails or landing-page hero carousels where the art direction lives in the image.

---

## Import

### Component
```ts
import { ImagePanel } from '@doxyz-ui/core/server/ImagePanel';
```

### Types

```ts
import type { ImagePanelProps } from '@doxyz-ui/core/server/ImagePanel';
```

---

## Usage

```tsx
<ImagePanel { ...props } />
```


---

## Props (Declared + Inherited)

Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like “…rest” or “Other props”—every inherited prop must appear as its own row.

| Prop           | Type                                                                                           | Default | Required | Notes                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------- | ------- | :------: | --------------------------------------------------------------------------------------------------------- |
| `actions`      | `ReadonlyArray<React.ReactNode>`                                                               | `[]`    |          | CTA buttons/links rendered in the `_actions` slot at the bottom of the content stack.                     |
| `className`    | `string`                                                                                       |         |          | Extra utility classes merged with the hero sizing tokens.                                                 |
| `description`  | `string`                                                                                       |         |          | Optional supporting copy shown beneath the title.                                                          |
| `fetchPriority`| `'high' \| 'low'`                                                                              |         |          | Native `fetchpriority` hint for the `<img>` element.                                                      |
| `imgAlt`       | `string`                                                                                       |         |   Yes    | Required alt text; pass `''` only when the image is decorative and the title covers the context.          |
| `imgSrc`       | `string`                                                                                       |         |   Yes    | Source URL for the hero image.                                                                            |
| `labels`       | `ReadonlyArray<{ icon?: React.ReactNode; label: string; ariaLabel?: string }>`                 | `[]`    |          | Optional chip-style labels rendered at the bottom of the content stack.                                   |
| `loading`      | `'lazy' \| 'eager'`                                                                            | `'lazy'` |          | Native `loading` hint; keep `lazy` for off-screen slides.                                                 |
| `title`        | `string`                                                                                       |         |          | Optional heading displayed above the description.                                                         |

* **Extends:** `React.HTMLAttributes<HTMLDivElement>` minus: `title`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Structure

* **base** — Root wrapper that sets hero dimensions and scaling animation.
* **_image** — `<img>` element that receives `loading` / `fetchpriority`.
* **_overlay** — Gradient overlay stretched over the image.
* **_content** — Absolutely positioned column containing **_actions**, **_title**, **_description**, and **_labels** rows.
* **_labelItem / _labelIcon** — Inline label wrappers for each chip entry.

> DOM structure sketch:

```jsx
<div data-slot="base">
  <img data-slot="_image" src={imgSrc} alt={imgAlt} loading={loading} fetchpriority={fetchPriority} />
  <div data-slot="_overlay" />
  <div data-slot="_content">
    <div data-slot="_actions">{actions.map(action => action)}</div>
    {title && <h3 data-slot="_title">{title}</h3>}
    {description && <p data-slot="_description">{description}</p>}
    <div data-slot="_labels">
      {labels.map(({ icon, label, ariaLabel }) => (
        <span key={label} data-slot="_labelItem" aria-label={ariaLabel}>
          {icon && <span data-slot="_labelIcon" aria-hidden="true">{icon}</span>}
          <span>{label}</span>
        </span>
      ))}
    </div>
  </div>
</div>
```

---

## Data Attributes & States

| State flag               | Effect                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `data-[is-in-view=true]` | Applied by the parent carousel wrapper to trigger the scale and opacity transitions defined on base/content.     |

---

## Classes

| Data slot    | Classes                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`       | `relative` `isolate` `overflow-clip` `w-[390px]` `h-[390px]` `lg:w-[1040px]` `lg:h-[620px]` `transform-gpu` `transition-transform` `duration-700` `ease-in-out` `motion-reduce:transition-none` `scale-80` `group-data-[is-in-view=true]:scale-100` `mx-0` `lg:-mx-36` |
| `_image`     | `block` `size-full` `object-cover` `object-center`                                                                                                 |
| `_overlay`   | `pointer-events-none` `absolute` `inset-0` `overlay-image-overlay`                                                                                 |
| `_content`   | `absolute` `inset-0` `flex` `flex-col` `justify-end` `items-start` `p-4` `opacity-0` `transition-opacity` `duration-1000` `ease-in-out` `group-data-[is-in-view=true]:opacity-100` `motion-reduce:transition-none` |
| `_actions`   | `flex` `gap-3` `items-center` `-mb-4`                                                                                                             |
| `_title`     | `text-2xl` `text-color-content-default`                                                                                                           |
| `_description` | `text-base` `text-color-content-weak` `-mt-22`                                                                                                  |
| `_labels`    | `text-sm` `text-color-content-weak` `flex` `gap-4`                                                                                                |
| `_labelItem` | `flex` `items-center` `gap-1`                                                                                                                     |

---

## Accessibility

* **Name:** Provide descriptive `imgAlt` (or `''` when decorative) and ensure labels/actions have accessible names (e.g., pass `ariaLabel` for icon-only chips).
* **Keyboard:** Actions should be focusable Buttons or Links supplied via the `actions` array; the panel itself remains non-interactive.
* **Roles/States:** When part of a carousel, the parent should manage aria-live, inert, or `aria-roledescription` semantics—ImagePanel simply renders content.
* **Announcements:** Because the content stack is only visually faded, it remains accessible even when the slide is off-screen; manage inert attributes at the carousel level if necessary.
* **Icon-only pattern:** Icons inside labels render with `aria-hidden="true"` so you must supply `ariaLabel` when the visual chip lacks text context.

---

## Patterns & Examples

### Hero slide with single action

```tsx
<ImagePanel
  imgSrc="/images/hero.jpg"
  imgAlt="Studio interior"
  title="Studio sessions"
  description="Behind-the-scenes video series."
  actions={[<Button key="watch">Watch episode</Button>]}
/>
```
- Stick to a single primary action when the panel functions like a hero slide.
- Always provide `imgAlt` so the title and description have visual context for non-visual users.

### Multi-label carousel card

```tsx
<ImagePanel
  imgSrc="/images/city.jpg"
  imgAlt="Skyline at sunset"
  labels={[
    { label: 'Season 4' },
    { icon: <TagIcon />, label: 'Premium', ariaLabel: 'Premium tier' }
  ]}
  actions={[
    <Button key="details" variant="secondary">Details</Button>,
    <IconButton key="share" aria-label="Share card" icon={<ShareIcon />} />
  ]}
/>
```
- Mix text-only and icon-backed labels to communicate tag-like metadata.
- Provide a `variant="secondary"` button plus an icon button to balance emphasis across multiple calls to action.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `bf101caa87477604fccadbd8c8fb327764f7e6fd8e1c19407ba2d472082dfb28`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-09 | Updated usage/examples guidance |
| 2025-11-08 | Initial documentation |
