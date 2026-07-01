---
title: Button
description: Interactive button with text labels and optional start/end icons, across primary, secondary, bare, and knockout variants and default/hover/active/focus states.
status: stable
version: 1.0.0
category: components
level: atom
tags: [button, action, variants, interactive]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2313-42
source: packages/core/src/components/client/Button/Button.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-06-30
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2313-42)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/Button/Button.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

An interactive button element featuring text labels with optional decorative icons positioned at the start or end of the button. It provides multiple visual treatments — solid brand backgrounds, transparent presentations, and knockout effects for different interface contexts — with full interaction-state coverage (default, hover, active, focus) and an optional disabled state. The button keeps consistent proportions and accessibility standards across every variation while signalling hierarchy through variant selection.

## Component Anatomy

```
Button (auto-layout, horizontal, gap: 4px)
├── Icon (start, optional)
├── Label (text)
└── Icon (end, optional)
+ Focus ring (rendered on focus state)
```

## Variants

| Variant | Background (default) | Text / Icon | Notes |
|---|---|---|---|
| **primary** | `comp/button/primary/color/background/default` (`#3D7A95`) | `comp/button/primary/color/content/default` (`#FFFFFF`) | Main action; solid brand fill |
| **secondary** | `comp/button/color/background/default` (`#0000020D`) | `comp/button/color/content/default` (`#252729`) | Supporting action; subtle fill |
| **bare** | `color/background/none` (`#00000200`) | `comp/button/color/content/default` (`#252729`) | Text-like, minimal emphasis |
| **knockout** | `comp/button/color/background/knockout` (`#F7F8F7`) | `comp/button/color/content/default` (`#252729`) | For dark/high-contrast surfaces |

### Interaction states (primary)

| State | Background |
|---|---|
| default | `comp/button/primary/color/background/default` (`#3D7A95`) |
| hover | `comp/button/primary/color/background/hover` (`#2D6079`) |
| active | `comp/button/primary/color/background/active` (`#2D6079`) |
| focus | `comp/button/primary/color/background/default` (`#3D7A95`) + focus ring `comp/border/focus-ring` (`#2D6079`) |
| disabled | reduced opacity |

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "bare" \| "knockout"` | `"primary"` | Visual treatment |
| `state` | `"default" \| "hover" \| "active" \| "focus"` | `"default"` | Interaction state (design-time) |
| `isDisabled` | `boolean` | `false` | Non-interactive, muted styling |
| `hasStartIcon` | `boolean` | `true` | Show an icon before the label |
| `hasEndIcon` | `boolean` | `true` | Show an icon after the label |
| `text` | `string` | `"Label"` | Button label content |

## Token Specification

### Color

| Token | Value | Role |
|---|---|---|
| `comp/button/primary/color/background/default` | `#3D7A95` | Primary fill (default / focus) |
| `comp/button/primary/color/background/hover` | `#2D6079` | Primary fill (hover) |
| `comp/button/primary/color/background/active` | `#2D6079` | Primary fill (active) |
| `comp/button/primary/color/content/default` | `#FFFFFF` | Primary label + icon |
| `comp/button/color/background/default` | `#0000020D` | Secondary fill (default) |
| `comp/button/color/background/hover` | `#00000233` | Secondary fill (hover) |
| `comp/button/color/border/default` | `#0000021A` | Secondary border |
| `comp/button/color/content/default` | `#252729` | Secondary / bare / knockout label + icon |
| `comp/button/color/background/knockout` | `#F7F8F7` | Knockout fill (default / active) |
| `comp/button/color/background/knockout-hover` | `#C6C7C6` | Knockout fill (hover) |
| `color/background/none` | `#00000200` | Bare variant (transparent) fill |
| `comp/border/none` | `#0000021A` | Primary / bare transparent border |
| `comp/border/focus-ring` | `#2D6079` | Focus ring (all variants) |

### Spacing

| Property | Value |
|---|---|
| Padding (vertical) | 6px (`spacing/1.5`) |
| Padding (horizontal) | 12px (`spacing/3`) |
| Gap (icon ↔ label) | 4px (`spacing/1`) |
| Border radius | 8px (`border/radius/lg`) |
| Border width | 1px |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Label | Geist | Medium (500) | 14px | 20px |

## Usage Guidelines

- Use **primary** for the main action that needs maximum visibility (form submit, confirm, primary CTA).
- Use **secondary** for supporting actions with moderate emphasis.
- Use **bare** for subtle, text-like actions.
- Use **knockout** on dark or imagery-heavy surfaces where a light chip reads better.
- Include a **start icon** for contextual/categorizing actions; an **end icon** for directional or external-navigation cues.
- Keep labels action-oriented and concise; provide adequate spacing between buttons in a group.

## Implementation

```tsx
import { Button } from '@eventz-ui/core/client-components';

<Button variant="primary">Get tickets</Button>
```

## Accessibility

- All interaction states are keyboard accessible with a visible, distinct focus indicator.
- Icons must carry descriptive `aria-label`/alt text when they convey meaning; decorative icons should be hidden from assistive tech.
- Disabled buttons are announced as non-interactive.
- Primary button text (`#FFFFFF`) on the teal brand fill (`#3D7A95`) — verify large/normal-text contrast for your usage; see the Eventz a11y notes on brand-on-dark pairings.
