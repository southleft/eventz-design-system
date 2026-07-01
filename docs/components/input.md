---
title: Input
description: Single-line text field with label, optional start/end icons, and hint/error messaging, covering default, hover, focus, filled, error, and disabled states.
status: stable
version: 1.0.0
category: components
level: atom
tags: [input, form, text-field, states, validation]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2365-108
source: packages/core/src/components/client/Input/Input.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-06-30
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2365-108)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/Input/Input.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

A single-line text field for entering and editing short text values. Input renders the control row — optional start icon → native `<input>` → optional end icon — while its `FormElement` wrapper supplies the label, hint/error/info messaging, and focus ring. It covers the full set of interaction states (default, hover, focus), a filled vs. empty distinction, an error state with validation messaging, and a disabled state, all built on the system's tokens so it stays consistent wherever it appears.

## Component Anatomy

```
Input (FormElement wrapper, vertical auto-layout, gap: 4px)
├── Field label (label text + optional info popover)
├── Control row (div[data-slot="input"], horizontal, gap: 8px)
│   ├── Start icon (optional, aria-hidden)
│   ├── Native <input>
│   └── End icon (optional, aria-hidden)
└── Inline hint / error (supporting text)
```

## States

| State | Border | Notable treatment |
|---|---|---|
| **default** | `comp/form/color/border/default` (`#00000233`) | White fill `color/background/default` (`#FFFFFF`), placeholder text `color/content/weak` (`#5B5D5E`) |
| **hover** | `comp/form/color/border/hover` (`#0000024D`) | Slightly stronger border, subtle background shift `comp/form/color/background/hover` (`#00000226`) |
| **focus** | `comp/border/focus-ring` (`#2D6079`) ring | Brand focus ring around the control |
| **filled** | `comp/form/color/border/default` (`#00000233`) | Value text deepens to `color/content/default` (`#252729`) |
| **error** | `comp/form/color/border/utility/danger` (`#C23737`) | Error border + supporting text `color/content/utility/danger-subtle` (`#FF5A6B`) (`data-invalid="true"`) |
| **disabled** | `comp/form/color/border/default` (`#00000233`) | Reduced opacity, non-interactive (`data-disabled="true"`) |

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Visible label; required unless `ariaLabel` is provided |
| `ariaLabel` | `string` | — | Accessible name when `label` is omitted |
| `placeholder` | `string` | — | Native placeholder; fades on focus |
| `type` | `string` | `"text"` | Native input type (`email`, `number`, …) |
| `value` / `defaultValue` | `string` | — | Controlled / uncontrolled value |
| `hint` | `string` | — | Helper text below the control |
| `error` | `string` | — | Error text; overrides `hint` and tints the border |
| `info` | `string` | — | InfoPopover content shown next to the label |
| `startIcon` / `endIcon` | `React.ReactNode` | — | Leading / trailing adornments |
| `required` | `boolean` | `false` | Adds the required indicator and native `required` |
| `disabled` | `boolean` | `false` | Disables the field |
| `readOnly` | `boolean` | `false` | Read-only but still focusable |

## Token Specification

### Color

| Token | Value | Role |
|---|---|---|
| `color/background/default` | `#FFFFFF` | Field fill |
| `comp/form/color/background/default` | `#0000020D` | Control background (default / focus) |
| `comp/form/color/background/hover` | `#00000226` | Control background (hover) |
| `comp/form/color/border/default` | `#00000233` | Border — default, filled, disabled |
| `comp/form/color/border/hover` | `#0000024D` | Border — hover |
| `comp/form/color/border/utility/danger` | `#C23737` | Border — error |
| `comp/border/focus-ring` | `#2D6079` | Focus ring |
| `color/content/default` | `#252729` | Label + filled value text |
| `color/content/weak` | `#5B5D5E` | Placeholder / empty value text |
| `color/content/weak-hover` | `#2C2E30` | Value text on hover |
| `color/content/subtle` | `#424446` | Hint / supporting text |
| `color/content/utility/danger-subtle` | `#FF5A6B` | Error supporting text |

### Spacing

| Property | Value |
|---|---|
| Gap (label ↔ control ↔ hint) | 4px (`spacing/1`) |
| Gap (icon ↔ input) | 8px (`spacing/2`) |
| Control padding (horizontal) | 12px (`spacing/3`) |
| Border width | 1px |
| Focus ring | `comp/border/focus-ring` (`#2D6079`) |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Label | Geist | Medium (500) | 12px | 18px |
| Input content | Geist | Medium (500) | 14px | 20px |

## Usage Guidelines

- Provide clear placeholder text that describes the expected format ("name@email.com"), and use `hint` for requirements or examples.
- Choose an appropriate `type` (`email`, `tel`, `number`) so mobile keyboards adapt.
- Pair `error` with controlled `value`/`onChange` for real-time validation feedback; the border and supporting text turn red automatically.
- Use `ariaLabel` instead of `label` only for compact toolbar placements like search.
- Keep icons decorative — they reinforce intent but never carry the field's meaning.

## Implementation

```tsx
import { Input } from '@eventz-ui/core/client-components';

// Attendee email on a checkout form
<Input
  label="Email"
  type="email"
  placeholder="name@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>

// Event search with a leading icon
<Input
  ariaLabel="Search events"
  startIcon={<MagnifyingGlassIcon aria-hidden="true" />}
  placeholder="Search events"
/>
```

## Accessibility

- The accessible name comes from `FormElement` via `label`/`ariaLabel`; the native `<input>` inherits the generated id and `aria-labelledby` wiring.
- `aria-invalid`, `aria-describedby`, and `required` flow through from `FormElement`, so hints, errors, and info content are announced together.
- Focus is clearly indicated by the brand-600 (`#2D6079`) ring, meeting visible-focus requirements.
- Start/end icons are `aria-hidden="true"` and must not be the only signal of meaning.
- Standard text-field keyboarding applies: Tab focuses, Shift+Tab moves back, characters edit inline.
