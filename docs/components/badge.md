---
title: Badge
description: Small non-interactive label with a gradient or brand background and optional leading icon, used to call out status, metadata, or featured categories.
status: stable
version: 1.0.0
category: components
level: atom
tags: [badge, status, label, variants]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2369-2993
source: packages/core/src/components/server/Badge/Badge.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-05-31
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2369-2993)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/server/Badge/Badge.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

A compact, non-interactive label that calls out status, metadata, or featured categories inline. Badge renders a styled `<span>` with tightly controlled all-caps typography and a colored background — gradient treatments for the accent variants and a solid brand fill for `brand`. An optional leading icon can reinforce the label, and the badge keeps its pill proportions across every variant. It carries no interactive behavior, so it relies entirely on its label (or a forwarded `aria-label`) for an accessible name.

## Component Anatomy

```
Badge (span, inline-flex, horizontal auto-layout, gap: 2px)
├── Icon (optional, leading, aria-hidden)
└── Label (text)
```

## Variants

| Variant | Background | Text / Icon | Use |
|---|---|---|---|
| **purple** | gradient (purple) | `#252729` | Default; neutral metadata callout |
| **blue** | gradient (blue) | `#252729` | Informational / featured tags |
| **pink** | gradient (pink) | `#252729` | In-progress, beta, "new" states |
| **orange** | gradient (orange) | `#252729` | Warnings, time-sensitive flags |
| **brand** | `#3D7A95` (brand/500) | `#252729` | On-brand emphasis |

Each variant additionally supports `hasIcon` and `hasLabel` toggles, giving label-only, icon-only, and icon+label compositions (15 design permutations in Figma). Avoid the icon-only form unless an `aria-label` is supplied.

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | `"purple" \| "blue" \| "pink" \| "brand" \| "orange"` | `"purple"` | Color / gradient treatment |
| `label` | `string` | `"Label"` | Text content shown inside the badge |
| `icon` | `React.ReactNode` | — | Optional leading glyph; `aria-hidden` by default |
| `hasIcon` | `boolean` | `true` | Show the leading icon (design-time toggle) |
| `hasLabel` | `boolean` | `true` | Show the label text (design-time toggle) |
| `className` | `string` | — | Utility classes merged after the base tokens |

## Token Specification

### Spacing

| Property | Value |
|---|---|
| Padding (vertical) | 2px (`spacing/0.5`) |
| Padding (horizontal) | 6px (`spacing/1.5`) |
| Gap (icon ↔ label) | 2px (`spacing/0.5`) |
| Border radius | 4px (`border/radius/sm`) |
| Border width | 1px |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Label | Geist | Bold (700) | 12px | 18px |

Label uses the `caption-lg-allcaps-bold` text style (uppercase).

## Usage Guidelines

- Use **purple** as the neutral default; reach for **blue**, **pink**, or **orange** to differentiate informational, beta, and time-sensitive states.
- Use **brand** sparingly for on-brand emphasis where the teal fill reinforces the Eventz identity.
- Keep labels short — typically a single word — so the badge holds its pill shape.
- Pair an icon only when it reinforces the label's meaning; keep decorative icons `aria-hidden`.
- Badges are descriptors, not controls. Do not attach click handlers; use a Button or link instead.

## Implementation

```tsx
import { Badge } from '@eventz-ui/core/server-components';

// Status on an event card
<Badge variant="pink" label="Selling fast" />

// Featured category with a reinforcing icon
<Badge variant="blue" icon={<StarIcon />} label="Featured" />
```

## Accessibility

- The accessible name comes entirely from `label` (or a forwarded `aria-label`); keep it descriptive.
- Icons are `aria-hidden="true"` so screen readers announce only the label text.
- The badge is non-interactive — it should not be focusable; leave keyboard behavior to surrounding controls.
- Avoid icon-only badges; if unavoidable, supply an `aria-label` with the text equivalent.
- Colors are intentionally consistent across light and dark modes (no token overrides) — verify label contrast against each gradient for your content.
