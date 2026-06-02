---
title: Tag
description: A compact label for categorization, status, or filtering — available as a static label or an interactive, selectable chip.
status: stable
version: 1.0.0
category: components
level: atom
tags: [tag, atom, label, chip, filter, status]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2600-5023
source: packages/core/src/components/server/Tag/Tag.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-06-02
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2600-5023)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/server/Tag/Tag.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

A label element that displays categorization, status, or filtering information with optional interactive functionality. A Tag is a rounded container with a text label that works in two modes: a **static** informational label, or an **interactive** chip that responds to hover, focus, and an active (selected) state for use in filters. It supports a `parent`/`child` hierarchy for primary categories versus nested sub-categories.

## Component Anatomy

```
Tag (inline; horizontal padding 12px, vertical 6px)
└── Label (text)
```

The element rendered depends on the mode: an interactive Tag is a `<button>` (rounded corners, focusable); a static Tag is a `<span>` (pill-shaped, non-focusable).

## Variants & States

Tag is driven by four axes: **mode** (`isInteractive`), **hierarchy** (`variant`), **selection** (`isActive`), and **interaction state** (default / hover / focus).

| variant | isActive | Background | Label | Hover |
|---|---|---|---|---|
| `parent` | `false` | weak fill `#0000020D` | `#252729` | fill → `#00000233` |
| `parent` | `true` | brand `#3D7A95` (brand/500) | `#FFFFFF` | fill → `#2D6079` (brand/600) |
| `child` | `false` | transparent | `#5B5D5E` (neutral) | label → `#2C2E30` |
| `child` | `true` | transparent | `#3D7A95` (brand) | label → `#2D6079` (brand/600) |

- **focus** — interactive tags show a brand focus ring (`#2D6079`, brand/600) for keyboard navigation.
- **static (`isInteractive: false`)** — renders the parent fill (`#0000020D` / `#252729`) as a pill with no hover/focus affordance.

### State behavior (from Figma)

- **`isInteractive: true`** — Tag is clickable, with pointer cursor and full hover/focus styling for engagement.
- **`isInteractive: false`** — Tag is a static label only: no hover effects, no focus, informational content.
- **`variant: parent`** — Primary tag level for main categories, primary filters, or top-level classification.
- **`variant: child`** — Secondary tag level for sub-categories, nested options, or hierarchical relationships.
- **`isActive: true`** — Selected styling (accent color / enhanced contrast) indicating the current filter or selection.
- **`isActive: false`** — Standard unselected appearance, available but not chosen.

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — (required) | Text content of the tag (trimmed) |
| `variant` | `"parent" \| "child"` | `"parent"` | Hierarchy level — primary vs nested styling |
| `isInteractive` | `boolean` | `false` | When `true`, renders a focusable `<button>` with hover/focus/active styling; when `false`, a static `<span>` |
| `isActive` | `boolean` | `false` | Selected styling for filter/selection contexts (applies to interactive tags) |

The props are a discriminated union on `isInteractive`: an interactive Tag also accepts native `<button>` attributes (`onClick`, `disabled`, …); a static Tag accepts native `<span>` attributes. `type="button"` is set automatically in interactive mode.

## Token Specification

### Color

| Token | Role |
|---|---|
| `color-content-brand` / `#3D7A95` (brand/500) | Active parent fill / active child label |
| `color-content-brand-hover` / `#2D6079` (brand/600) | Hover for active states + focus ring |
| `color-background-weak` / `#0000020D` | Inactive parent fill |
| `color-content-default` / `#252729` | Inactive parent label |
| `color-content-weak` / `#5B5D5E` | Inactive child label |

### Spacing & Typography

| Property | Value |
|---|---|
| Padding | 6px vertical · 12px horizontal |
| Border radius | 8px (interactive) · full pill (static) |
| Border width | 1px |
| Label | Geist, 14px / 20px — Bold (700) for interactive parent tags |

## Usage Guidelines

**Primary use cases**

- Content filtering and categorization in search interfaces
- Status indicators for items, tasks, or content states
- Skill or attribute labeling in profiles or listings
- Category navigation in content management systems
- Multi-select filtering with active-state feedback

**Implementation considerations**

- Use `parent` tags for primary categories and `child` tags for subcategories.
- Reserve `isInteractive` for filtering or selection contexts — keep purely informational tags static.
- Ensure adequate spacing between multiple tags in a group.
- Plan for tag-removal affordances in filter contexts.

## Implementation

```tsx
import { Tag } from '@eventz-ui/core/server-components';

// Static, informational label
<Tag label="Sold out" />

// Interactive filter chip with selected state
<Tag
  label="Music"
  variant="parent"
  isInteractive
  isActive={selected === 'music'}
  onClick={() => setSelected('music')}
/>

// Nested sub-category
<Tag label="Indie" variant="child" isInteractive onClick={…} />
```

## Accessibility

- Interactive tags must be keyboard accessible with clear focus indicators — the component renders a real `<button>` and applies a brand focus ring (`#2D6079`).
- Tag purpose and current state must be announced to screen readers; pair the active state with text or `aria-pressed` so selection isn't conveyed by color alone.
- Active states must be conveyed through more than color alone.
- Non-interactive tags render as a `<span>` and do not receive focus or suggest interactivity.
