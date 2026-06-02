---
title: Checkbox
description: Binary selection control with a labeled checkbox and optional supporting text, across unchecked, checked, hover, focus, and disabled states.
status: stable
version: 1.0.0
category: components
tags: [checkbox, form, selection, input]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2323-181
source: packages/core/src/components/client/Checkbox/Checkbox.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-06-02
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2323-181)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/Checkbox/Checkbox.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

A form control for selecting or deselecting a binary option. Each checkbox pairs a clickable square with a descriptive label and optional supporting text, and covers the full set of states — unchecked, checked, hover, focus, and disabled — with accessible keyboard and screen-reader behavior.

## Component Anatomy

```
Checkbox (horizontal auto-layout, gap: 4px)
├── Box (square; check glyph when checked)
└── Content (vertical)
    ├── Label (text)
    └── Supporting text (optional hint)
```

## States

| State | Box | Notes |
|---|---|---|
| unchecked | border `#5B5D5E` (neutral/700) | empty square |
| hover | border `#2C2E30` (neutral/900) | darker border |
| checked | fill `#224B60` (brand/700) + check glyph | filled teal box |
| focus | adds focus ring `#2D6079` (brand/600) | keyboard focus |
| disabled | reduced opacity | non-interactive |

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Label"` | Primary text describing the option |
| `state` | `"default" \| "focus" \| "hover"` | `"default"` | Interaction state (design-time) |
| `isChecked` | `boolean` | `false` | Selected state |
| `isDisabled` | `boolean` | `false` | Non-interactive, muted styling |
| `hasHint` | `boolean` | `true` | Show supporting text below the label |

## Token Specification

### Spacing

| Property | Value |
|---|---|
| Gap (box ↔ content) | 4px (`spacing/1`) |
| Border width | 1px |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Label | Geist | Medium (500) | 14px | 20px |
| Supporting text | Geist | Medium (500) | 12px | 18px |

## Usage Guidelines

- Use for independent on/off choices — settings, filters, terms acceptance, or multi-select lists.
- Write labels that state what checking the box does; add supporting text only when it improves understanding.
- Group related checkboxes with consistent spacing and alignment.
- Ensure adequate touch targets on mobile.

## Implementation

```tsx
import { Checkbox } from '@eventz-ui/core/client-components';

<Checkbox label="Email me about upcoming events" />
```

## Accessibility

- Keyboard accessible; toggles with Space.
- The label is programmatically associated with the input, and supporting text is linked for context.
- Checked/unchecked state is announced by screen readers and is not conveyed by color alone (the check glyph is present).
- Focus is shown with a visible brand-600 (`#2D6079`) ring.
- Disabled checkboxes are announced as non-interactive.
