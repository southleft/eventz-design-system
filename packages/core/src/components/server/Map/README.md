# Map
*Type: server* |
*Base: section* |
*Last updated: 2025-11-08*

## Overview
Map wraps consumer-provided map layers inside a sized region with optional overlay and a decorative control rail. It does not initialize map SDKs; instead it offers a consistent frame, gradient overlay, and disabled control tiles that product teams can later wire to real interactions. Use it when embedding third-party map canvases or panoramics that need consistent sizing within cards or detail pages.

---

## Import

### Component
```ts
import { Map } from '@doxyz-ui/core/server/Map';
```

### Types

```ts
import type { MapProps } from '@doxyz-ui/core/server/Map';
```

---

## Usage

```tsx
<Map ariaLabel="Nearby studios" showControls={false}>
  <ConsumerMapLayer data-map-layer />
</Map>
```

> - Always supply a descriptive `ariaLabel`; the component renders a `role="region"` to give the map content an accessible name.
> - Add the `data-map-layer` attribute (or `_map-layer` class) to your map canvas so the base selectors can pin it edge-to-edge.

---

## Props (Declared + Inherited)

Only component-level props are listed; standard `<section>` attributes from `React.HTMLAttributes<HTMLElement>` (other than `aria-label`) are forwarded automatically.

| Prop          | Type      | Default | Required | Notes                                                                                     |
| ------------- | --------- | ------- | :------: | ----------------------------------------------------------------------------------------- |
| `ariaLabel`   | `string`  |         |   Yes    | Accessible name announced for the `role="region"` wrapper.                                |
| `className`   | `string`  |         |          | Additional utility classes appended to the map container.                                 |
| `isNested`    | `boolean` | `false` |          | Applies nested sizing via `data-is-nested="true"` for compact map variants.               |
| `showControls`| `boolean` | `true`  |          | Toggles the decorative zoom/near-me rail.                                                 |
| `showOverlay` | `boolean` | `true`  |          | Shows the bottom gradient overlay that improves text contrast.                            |

* **Extends:** `React.HTMLAttributes<HTMLElement>` minus: `aria-label`
* **Forwards:** All standard HTML attributes for `<section>` to the root element.

---

## Structure

* **base** — `<section>` wrapper sized for hero or nested layout; renders `role="region"` and forwards props.
* **_surface** — Absolutely positioned container for the consumer’s map canvas (`children`).
* **_overlay** — Optional gradient overlay at the bottom edge.
* **_rail** — Control stack containing a zoom segment and near-me button; each tile includes a disabled `<button>`.
* **_tile / _icon** — Buttons and icon wrappers for zoom in/out and near-me placeholders.

> DOM structure sketch:

```jsx
<section role="region" aria-label={ariaLabel} data-is-nested={isNested ? 'true' : undefined}>
  <div data-part="surface">{children}</div>
  {showOverlay && <div data-part="overlay" />}
  {showControls && (
    <div data-part="rail">
      <div data-part="segment">
        <button data-action="zoomIn" disabled aria-label="Zoom in"><AddIcon /></button>
        <button data-action="zoomOut" disabled aria-label="Zoom out"><RemoveIcon /></button>
      </div>
      <button data-action="nearMe" disabled aria-label="Near me"><NearMeIcon /></button>
    </div>
  )}
</section>
```

---

## Data Attributes & States

| State flag                 | Effect                                                                          |
| -------------------------- | ------------------------------------------------------------------------------- |
| `data-[is-nested=true]`    | Reduces width/height for nested placements (e.g., inside cards or columns).     |

---

## Classes

| Data slot | Classes                                                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`    | `relative` `block` `w-480` `lg:w-full` `h-240` `lg:h-680` `overflow-hidden` `rounded-xl` `[_map-layer]:absolute` `[_map-layer]:inset-0` `data-[is-nested=true]:w-358` `data-[is-nested=true]:h-400` |
| `_surface`| `absolute` `inset-0`                                                                                                                                           |
| `_overlay`| `pointer-events-none` `absolute` `inset-x-0` `bottom-0` `w-full` `h-[82px]` `bg-linear-to-b` `from-opacity-overlay/0` `to-opacity-overlay`                       |
| `_rail`   | `absolute` `top-3` `right-3` `flex` `flex-col` `gap-2` `border-none` `bg-color-background-subtle/10` `text-color-content-default`                               |
| `_segment`| `flex` `flex-col` `gap-[2px]` `[&>button]:first:rounded-b-none` `[&>button]:last:rounded-t-none`                                                                 |
| `_tile`   | `size-40` `rounded-md` `bg-color-background-subtle` `text-color-content-default` `backdrop-blur-sm` `transition-colors` `border-none`                            |
| `_icon`   | `pointer-events-none` `[&>svg]:size-20` `[&>*]:aria-hidden`                                                                                                      |

---

## Accessibility

* **Name:** Provide a specific `ariaLabel` (e.g., “Map of nearby studios”) so assistive tech can distinguish multiple instances.
* **Keyboard:** Rail buttons are rendered but disabled by default; when wiring interactions, ensure they become focusable and invoke zoom handlers.
* **Roles/States:** Root uses `role="region"`; add `aria-live` or `aria-describedby` only if the surrounding experience requires it.
* **Announcements:** Overlay is purely visual and `pointer-events-none`, so it will not interfere with provider attribution or map controls.
* **Icon-only pattern:** Each placeholder button already includes an `aria-label`; keep icons decorative (`aria-hidden`) when you enable the controls.

---

## Patterns & Examples

### Hero map with controls

```tsx
<Map ariaLabel="Studios worldwide">
  <ProviderMap data-map-layer />
</Map>
```

### Nested map inside card

```tsx
<Map ariaLabel="Store locator" isNested showOverlay={false} showControls={false} className="mt-4">
  <MiniMap data-map-layer />
</Map>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `823949def7d368b0685df5273de69d256b6258c25532ea2ab67bea916191bc23`

---

## Changelog

| Date       | Changes              |
| ---------- | -------------------- |
| 2025-11-08 | Initial documentation |
