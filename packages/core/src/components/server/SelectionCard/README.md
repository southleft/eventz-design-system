# SelectionCard
*Type: server | Base: div | Last updated: 2025-11-08*

## Overview
SelectionCard is a fixed-width, checkbox-style tile for multi-select flows that pairs a required icon with a single-line label. It renders on the server and exposes checkbox semantics (role, aria-checked, tab focus) so parent components can provide interaction handlers client-side. Use it when you need a lightweight way to preview and choose between small sets of workspaces, plans, or entities without pulling in a full card grid experience.

---

## Import

### Component
```ts
import { SelectionCard } from '@doxyz-ui/core/server/SelectionCard';
```

### Types

```ts
import type { SelectionCardProps } from '@doxyz-ui/core/server/SelectionCard';
```

---

## Usage

```tsx
<SelectionCard { ...props } />
```

> - `label` is the visible and accessible text; prefer `ariaLabel` only when the label cannot be exposed.
> - Toggle `isSelected` to sync the tile with upstream selection logic and emit `data-selected="true"` for styling hooks.

---

## Props (Declared + Inherited)

| Prop        | Type              |       Default | Required | Notes                                                                 |
| ----------- | ----------------- | ------------: | :------: | --------------------------------------------------------------------- |
| `label`     | `string`          |             — |   ✅    | Visible text; also the default accessible name.                       |
| `icon`      | `React.ReactNode` |             — |   ✅    | Required decorative icon rendered inside a 48×48 box.                 |
| `isSelected` | `boolean`        |         false |   ❌    | Controls selection visuals, `aria-checked`, and `data-selected`.      |
| `ariaLabel` | `string`          |             — |   ❌    | Optional accessible label; trimmed and omitted when empty or missing. |

* **Extends:** `Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'role' | 'aria-checked' | 'aria-label' | 'tabIndex'>`
* **Forwards:** All standard HTML attributes for `<div>` to the root element.

---

## Slots & Structure

* **container** — `<div>` root with checkbox semantics; receives forwarded HTML attributes.
* **icon** — `<div>` wrapper whose contents are `aria-hidden`; sized to 48×48 and centers the provided icon.
* **label** — `<div>` that truncates overflow and mirrors group-selected color changes.

> DOM structure sketch:

```txt
<div role="checkbox" tabIndex="0" aria-checked data-selected>
  <div aria-hidden="true">{icon}</div>
  <div>{label}</div>
</div>
```

---

## Data Attributes & States

| State flag            | Effect                                                                 |
| --------------------- | ---------------------------------------------------------------------- |
| `data-selected="true"`| Adds brand border, brand text color, and drives slot color sync via group selectors. |

---

## Accessibility

* **Name:** Provided by the `label` string; set `ariaLabel` when the visual label cannot be exposed verbatim.
* **Keyboard:** Receives focus via Tab and should be toggled by the parent handler on Space/Enter keypress (root already has `role="checkbox"` and `tabIndex=0`).
* **Roles/States:** Root exposes `role="checkbox"` with `aria-checked={isSelected}` for assistive parity.
* **Announcements:** Parent logic should announce selection changes if toggling happens outside native checkbox events (e.g., via `aria-live` region).
* **Icon-only pattern:** Decorative icon wrapper sets `aria-hidden="true"`; do not pass focusable elements in the `icon` slot.

---

## Patterns & Examples

### Basic Card

```tsx
<SelectionCard label="Workspace Alpha" icon={<EventIcon />} />
```

### Controlled Selection Grid

```tsx
{workspaces.map(workspace => (
  <SelectionCard
    key={workspace.id}
    label={workspace.name}
    icon={<workspace.Icon />}
    isSelected={selectedIds.includes(workspace.id)}
  />
))}
```

### Custom Accessible Label

```tsx
<SelectionCard
  label="DSP-025"
  ariaLabel="Workspace DSP zero two five"
  icon={<EventIcon />}
/>
```

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK (single spec)**
* Slots parity: **OK (icon, label)**
* State flags parity: **OK (`data-selected`)**
