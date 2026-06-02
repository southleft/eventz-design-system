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

A form input control that allows users to select or deselect binary options through an interactive square container with visual confirmation. The component features a clickable square checkbox element paired with descriptive text labels and optional supporting text for additional context. The checkbox displays clear visual states including unchecked, checked, focused, and hover states with appropriate visual feedback. The component supports disabled functionality and includes comprehensive accessibility features for keyboard navigation and screen reader compatibility.

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

### State behavior

**Selection**
- **isChecked: false** — Checkbox appears as an empty square with a border, indicating an unselected state.
- **isChecked: true** — Checkbox shows a checkmark/filled indicator with appropriate contrast, confirming the selected state.

**Interaction**
- **default** — Standard visual state with base styling; no interaction feedback.
- **focus** — Keyboard focus indicator forms a clear boundary for accessibility navigation; coordinates with the checked/unchecked state while meeting contrast requirements.
- **hover** — Visual feedback when the cursor is over the checkbox or its text; the cursor changes to a pointer over interactive areas.

**Disabled**
- **isDisabled: true** — Non-interactive, reduced opacity across checkbox, label, and supporting text; clicks disabled and the cursor stays default.
- **isDisabled: false** — Full interactive functionality with complete focus, hover, and selection support.

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Label"` | Primary text describing the option |
| `state` | `"default" \| "focus" \| "hover"` | `"default"` | Interaction state (design-time) |
| `isChecked` | `boolean` | `false` | Selected state |
| `isDisabled` | `boolean` | `false` | Non-interactive, muted styling |
| `hasHint` | `boolean` | `true` | Show supporting text below the label |

### Content configuration

- **label** — Primary text describing the checkbox option.
- **supportingText** — Secondary text providing additional context or explanation.
- **hasSupportingText: true** — Additional descriptive text appears below the main label using secondary styling and clear visual hierarchy; spacing keeps a logical label↔supporting relationship, and screen readers announce both as related content.
- **hasSupportingText: false** — Only the primary label is shown; component height adjusts to a single line.

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

**Primary use cases**

- Form selections requiring multiple independent choices
- Settings and preferences configuration with on/off options
- Terms and conditions acceptance in registration flows
- Filter controls in search and browsing interfaces
- Task completion tracking in to-do lists or project management

**Implementation considerations**

- Use clear, descriptive labels that explain what checking the box means.
- Include supporting text when additional context improves understanding.
- Group related checkboxes logically with appropriate spacing.
- Ensure adequate touch targets for mobile accessibility.
- Consider visual hierarchy when mixing checkboxes with other form elements.
- Provide a clear visual distinction between checked and unchecked states.
- Maintain consistent spacing and alignment in checkbox groups.

## Implementation

```tsx
import { Checkbox } from '@eventz-ui/core/client-components';

<Checkbox label="Email me about upcoming events" />
```

## Accessibility

- Checkbox must be keyboard accessible with space-bar activation.
- Labels must be properly associated with checkbox inputs for screen readers.
- Focus indicators must be clearly visible for keyboard navigation (brand-600 `#2D6079` ring).
- Checked/unchecked states must be announced by screen readers.
- Supporting text should be connected to the main label for context.
- Color cannot be the only indicator of the checked state (the check glyph is present).
- Disabled checkboxes should be announced as non-interactive.
