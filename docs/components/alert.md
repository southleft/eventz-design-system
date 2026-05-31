---
title: Alert
description: Inline notification surfacing product or system status across success, info, warning, and danger variants, with an optional title, supporting description, remediation link, and dismiss control.
status: stable
version: 1.0.0
category: components
tags: [alert, notification, status, variants, dismissible]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2629-56948
source: packages/core/src/components/client/Alert/Alert.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-05-31
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2629-56948)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/Alert/Alert.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

An inline notification container that surfaces product or system status with a gradient background, a leading status icon, and a content stack holding an optional title and supporting description. It can include an inline remediation link and a dismiss control to keep messages scannable and easy to clear. Severity is communicated through four variants — success, info, warning, and danger — each with a matching color treatment and icon. The `danger` variant escalates urgency with `role="alert"` (assertive), while the others stay polite via `role="status"`, keeping announcements aligned with severity.

## Component Anatomy

```
Alert (div, horizontal auto-layout, gap: 8px) — role="status" | "alert"
├── Icon (leading, variant-colored, optional)
├── Content (vertical stack, gap: 2px)
│   ├── Title (text, optional)
│   ├── Description (text — falls back to children when no title)
│   └── Text link (inline remediation, optional)
└── Dismiss (IconButton, aria-label="Dismiss alert", optional)
```

## Variants

| Variant | Accent | Icon | ARIA role | Use |
|---|---|---|---|---|
| **success** | `#329B40` (green) | check | `status` | Positive confirmations (e.g. registration complete) |
| **info** | `#326E9B` (blue) | info | `status` | Neutral system info, tips, scheduled notices |
| **warning** | `#9B6E31` (amber) | triangle | `status` | Cautionary, non-blocking messages |
| **danger** | `#9B3232` (red) | exclamation | `alert` | Errors, failures, critical issues |

Text and icon glyphs render at `#252729` across all variants. Each variant also supports `hasIcon`, `hasTitle`, `hasLink`, and `isDismissible` toggles.

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `variant` | `"success" \| "info" \| "warning" \| "danger"` | `"info"` | Selects gradient tokens, icon, and ARIA role |
| `title` | `string` | — | Bold heading; description falls back to `children` when empty |
| `children` | `React.ReactNode` | — | Description / body copy |
| `textLink` | `TextLinkProps` | — | Inline remediation link rendered below the text stack |
| `isDismissible` | `boolean` | `true` | Show the trailing dismiss IconButton |
| `onCloseClick` | `(e: React.SyntheticEvent) => void` | — | Fired when the dismiss button is pressed |
| `withIcon` | `boolean` | `true` | Show the leading status icon |
| `closeIcon` | `React.ReactNode` | — | Override the default close glyph |
| `className` | `string` | — | Utility classes merged onto the root |

## Token Specification

### Spacing

| Property | Value |
|---|---|
| Padding (vertical) | 12px (`spacing/3`) |
| Padding (horizontal) | 16px (`spacing/4`) |
| Gap (icon ↔ content ↔ dismiss) | 8px (`spacing/2`) |
| Gap (title ↔ description) | 2px (`spacing/0.5`) |
| Border radius | 6px (`border/radius/md`) |
| Border width | 1px |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Title | Geist | Bold (700) | 16px | 20px |
| Description | Geist | Medium (500) | 14px | 20px |

## Usage Guidelines

- Use **success** for positive confirmations, **info** for neutral tips, **warning** for cautionary non-blocking messages, and reserve **danger** for errors and critical issues.
- Use `title` for a crisp headline and `children` for supporting detail; omit the title for single-line notices.
- Set `isDismissible={false}` when a notice is critical and must stay visible until resolved.
- Provide a `textLink` for remediation ("View order", "Retry checkout") rather than burying the action in body copy.
- Keep messaging tone and length appropriate to severity; avoid interrupting active workflows.

## Implementation

```tsx
import { Alert } from '@eventz-ui/core/client-components';

// Confirmation after a successful ticket purchase
<Alert variant="success" title="You're going!">
  Your tickets for Summer Sounds Festival are confirmed. Check your email for entry passes.
</Alert>

// Non-dismissible warning with a remediation link
<Alert
  variant="warning"
  isDismissible={false}
  textLink={{ href: '/checkout', label: 'Complete payment', variant: 'inverted' }}
>
  Your order is on hold — payment hasn't been confirmed yet.
</Alert>
```

## Accessibility

- `danger` uses `role="alert"` (assertive) and all other variants use `role="status"` (polite), so announcements match severity; content changes re-announce via live-region behavior.
- The dismiss IconButton sets `aria-label="Dismiss alert"`, is reachable via Tab, and activates with Space/Enter — localize the label as needed.
- The accessible name comes from the title or description text; the root is static and does not steal focus.
- A custom `closeIcon` should stay decorative (`aria-hidden="true"`) so the IconButton label remains authoritative.
- Severity is conveyed by icon and text, not color alone — keep titles/descriptions explicit about the message type.
