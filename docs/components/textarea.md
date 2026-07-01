---
title: Textarea
description: Multi-line text field with label, optional start/end icons, and hint/error messaging, covering default, hover, focus, filled, error, and disabled states.
status: stable
version: 1.0.0
category: components
level: atom
tags: [textarea, form, text-field, states, validation, atom]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2369-2738
source: packages/core/src/components/client/Textarea/Textarea.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-06-30
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2369-2738)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/Textarea/Textarea.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

A multi-line text field for entering and editing longer free-form content. Textarea renders the control row — optional start icon → native `<textarea>` → optional end icon — inside a labeled `fieldset` that also supplies the label, optional info popover, and hint/error messaging. It covers the full set of interaction states (default, hover, focus), a filled vs. empty distinction, an error state with validation messaging, and a disabled state, all built on the system's tokens so it stays consistent wherever it appears. It is the multi-line sibling of [Input](/components/input) and shares the same labeling, icon, and messaging model.

## Component Anatomy

```
Textarea (fieldset, vertical auto-layout, gap: 4px)
├── Field label (label text + optional info popover)
├── Control row (div[data-slot="textarea"], horizontal, gap: 8px)
│   ├── Start icon (optional, aria-hidden)
│   ├── Native <textarea> (data-slot="value")
│   └── End icon (optional, aria-hidden)
└── Inline hint / error (supporting text)
```

## States

| State | Border | Notable treatment |
|---|---|---|
| **default** | `comp/form/color/border/default` (`#00000233`) | White fill `color/background/default` (`#FFFFFF`), placeholder text `color/content/weak` (`#5B5D5E`) |
| **hover** | `comp/form/color/border/hover` (`#0000024D`) | Stronger border, subtle background shift `comp/form/color/background/hover` (`#00000226`) |
| **focus** | `comp/border/focus-ring` (`#2D6079`) ring | Brand focus ring around the control |
| **filled** | `comp/form/color/border/default` (`#00000233`) | Value text deepens to `color/content/default` (`#252729`) |
| **error** | `comp/form/color/border/utility/danger` (`#C23737`) | Error border + supporting text `color/content/utility/danger-subtle` (`#FF5A6B`) (`data-invalid="true"`) |
| **disabled** | `comp/form/color/border/default` (`#00000233`) | Reduced opacity, non-interactive (`data-disabled="true"`) |

The Figma component set ships 13 variants spanning the `state` (default / hover / focus), `isFilled`, `hasError`, and `isDisabled` axes, plus `hasLabel`, `hasStartIcon`, `hasEndIcon`, and `hasHint` toggles.

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Visible label; required unless `ariaLabel` is provided |
| `ariaLabel` | `string` | — | Accessible name when `label` is omitted |
| `placeholder` | `string` | — | Native placeholder; fades on focus |
| `value` / `defaultValue` | `string` | — | Controlled / uncontrolled value |
| `rows` | `number` | — | Native row count for initial height |
| `hint` | `string` | — | Helper text below the control |
| `error` | `string` | — | Error text; overrides `hint` and tints the border |
| `info` | `string` | — | InfoPopover content shown next to the label |
| `startIcon` / `endIcon` | `React.ReactNode` | — | Leading / trailing adornments |
| `disabled` | `boolean` | `false` | Disables the field |

Standard native `<textarea>` attributes (`maxLength`, `readOnly`, `onChange`, `name`, …) pass straight through to the underlying element.

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
| Gap (icon ↔ textarea) | 8px (`spacing/2`) |
| Control padding (horizontal) | 6px (`spacing/1.5`) |
| Border radius | 8px (`border/radius/lg`) |
| Border width | 1px |
| Focus ring | `comp/border/focus-ring` (`#2D6079`), 2px with 4px offset |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Label | Geist | Medium (500) | 12px | 18px (uppercase) |
| Textarea content | Geist | Medium (500) | 14px | 20px |

## Usage Guidelines

- Reach for Textarea over [Input](/components/input) when users enter long-form content — comments, feedback, messages, descriptions, or notes.
- Provide a clear `placeholder` describing the expected content, and use `hint` for requirements such as character limits or formatting guidance.
- Pair `error` with controlled `value`/`onChange` for real-time validation feedback; the border and supporting text turn red automatically.
- Set `rows` to a sensible starting height for the expected content, and plan for overflow/scrolling in constrained layouts.
- Use `ariaLabel` instead of `label` only for compact placements where a visible label is impractical.
- Keep icons decorative — they reinforce intent but never carry the field's meaning.

## Implementation

```tsx
import { Textarea } from '@eventz-ui/core/client-components';

// Attendee message on an RSVP form
<Textarea
  label="Message"
  placeholder="Add a note for the host…"
  rows={4}
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  hint="Optional — up to 500 characters"
  maxLength={500}
/>

// With validation error
<Textarea
  label="Event description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  error={descriptionError}
/>
```

## Accessibility

- The accessible name comes from `label`/`ariaLabel`; the native `<textarea>` inherits the generated id and label association.
- `aria-describedby` merges hint, error, and open info-popover content, so supporting messaging is announced together with the field.
- The error state sets `data-invalid="true"` and surfaces a descriptive error message with an icon — never rely on the red border alone.
- Focus is clearly indicated by the brand-600 (`#2D6079`) ring, meeting visible-focus requirements.
- Start/end icons are `aria-hidden="true"` and must not be the only signal of meaning.
- Disabled fields set `data-disabled="true"`, drop pointer events, and are skipped by keyboard navigation.
- Standard text-field keyboarding applies: Tab focuses, Shift+Tab moves back, characters edit inline, Enter inserts a new line.
