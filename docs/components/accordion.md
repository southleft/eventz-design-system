---
title: Accordion
description: An expandable content container with a clickable header that reveals or hides associated body content.
status: stable
version: 1.0.0
category: components
level: molecule
tags: [accordion, molecule, disclosure, expandable, content]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2403-1099
source: packages/core/src/components/client/Accordion/Accordion.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-06-02
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2403-1099)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/Accordion/Accordion.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

An expandable content container with a clickable header that reveals or hides associated body content. The header lays out a title (with an optional image and slot indicator) alongside a small triangular disclosure indicator that rotates to show the expansion state; the body content area expands vertically when opened. It supports `sm`/`lg` breakpoints, default/hover/focused states, and strong/weak emphasis levels.

## Component Anatomy

```
Accordion (vertical auto-layout, gap: 12px)
├── header (horizontal auto-layout, gap: 8px)
│   ├── Image (optional)
│   ├── Accordion title (text)
│   └── Chevron (disclosure indicator — rotates on expand)
└── content (vertical auto-layout, gap: 16px) — shown when expanded
    ├── Body content (text)
    └── Slot (optional)
```

## States

| State | Treatment |
|---|---|
| default | Title `#FFFFFF`; collapsed shows a right-pointing chevron, expanded points down |
| hover | Title/body deepen to `#C6C7C6` |
| focused | Adds a brand focus stroke `#3D7A95` (brand/500) around the header |
| expanded (`isExpanded: true`) | Body content + slot visible; divider stroke `#FFFFFF80` |
| collapsed (`isExpanded: false`) | Header only; compact footprint |

Header background is transparent (`#FFFFFF00`); emphasis `strong` gives the header a more prominent treatment, `weak` a subdued one.

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `breakpoint` | `"sm" \| "lg"` | `"lg"` | Responsive layout for the target viewport |
| `state` | `"default" \| "hover" \| "focused"` | `"default"` | Interaction state (design-time) |
| `isExpanded` | `boolean` | `false` | Whether the body content is revealed |
| `emphasis` | `"strong" \| "weak"` | `"strong"` | Header prominence |
| `title` | `string` | `"Accordion title"` | Header title text |
| `hasImage` | `boolean` | `true` | Show a small image in the header before the title |
| `hasIntro` | `boolean` | `true` | Show introductory text below the title |
| `hasSlot` | `boolean` | `true` | Show a slot indicator/region |

### Content configuration

- **hasImage** — `true`: a small image appears in the header before the title; `false`: header is text + disclosure indicator only.
- **hasIntro** — `true`: introductory text appears below the main title; `false`: title only.
- **hasSlot** — `true`: slot indicator/region is visible; `false`: no slot.
- **title** — accepts custom text to replace the default "Accordion title" placeholder.

## Token Specification

### Spacing

| Property | Value |
|---|---|
| Gap (header ↔ content) | 12px (`spacing/3`) |
| Gap (content stack) | 16px (`spacing/4`) |
| Gap (header items) | 8px (`spacing/2`) |
| Border width | 1px |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Accordion title | Geist | Bold (700) | 18px | 24px |
| Body content | Geist | Medium (500) | 14px | 20px |
| Slot | Karla* | ExtraBold (800) | 12px | 20px |

> \*The Slot text still references **Karla** (the legacy typeface) — everything else uses **Geist**. Worth updating in Figma for consistency.

## Usage Guidelines

**Primary use cases**

- FAQ sections where users browse multiple questions without overwhelming the interface
- Content organization in forms or settings panels where grouped information should be accessible but not always visible
- Navigation menus with expandable subsections
- Product feature lists where details can be revealed on demand

**Implementation considerations**

- Use **strong** emphasis for primary content sections and **weak** for secondary/supplementary information.
- Include an image when visual context helps users identify content quickly.
- Add intro text for sections that benefit from a brief description before expansion.
- Choose the breakpoint based on content density and target devices.
- Default to the collapsed state unless specific content needs immediate visibility.
- Group related accordions vertically for coherent information architecture.

## Implementation

```tsx
import { Accordion } from '@eventz-ui/core/client-components';

<Accordion title="What's included with my ticket?">
  General admission, access to all stages, and re-entry throughout the day.
</Accordion>
```

## Accessibility

- The header must be keyboard accessible and announce its expansion state to screen readers.
- The focus state must be clearly visible for keyboard navigation (brand focus stroke `#3D7A95`).
- The disclosure indicator should communicate the current state through both visual and semantic means (e.g. `aria-expanded`), not the chevron alone.
- Hover provides non-essential visual feedback only; all behavior remains operable via keyboard.
