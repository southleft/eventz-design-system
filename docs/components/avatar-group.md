---
title: Avatar Group
description: A compact, overlapping stack of user avatars with an optional count indicator and message for additional people.
status: stable
version: 1.0.0
category: components
level: molecule
tags: [avatar group, molecule, avatars, social proof, presence]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2625-52953
source: packages/core/src/components/client/AvatarGroup/AvatarGroup.tsx
package: "@eventz-ui/core"
system: Eventz
lastUpdated: 2026-06-30
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2625-52953)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/AvatarGroup/AvatarGroup.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

A compact display component that shows multiple user avatars in an overlapping horizontal arrangement with an optional count indicator for additional users. Avatars overlap slightly to create a stacked visual effect, followed by text indicating how many more people are involved. It adapts responsively between a small (`sm`) and large (`lg`) layout, and can display a varying number of avatars based on configuration. Built on Radix `Avatar`, each avatar falls back to the user's initial when the image is unavailable.

## Component Anatomy

```
AvatarGroup (horizontal auto-layout, gap: 8px)
├── avatars (overlapping stack; gap: -12px sm / -18px lg)
│   ├── Avatar (image, or initial fallback) ×N
│   └── …
└── message (horizontal, gap: 4px) — optional
    ├── indicator ("+")
    ├── count ("2k")
    └── message ("others interested")
```

## Configurable Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `users` | `ReadonlyArray<{ name: string; imageUrl: string }>` | — (required) | People to render; each shows an image with an initial fallback |
| `avatarsToDisplay` | `number` | `4` | Maximum avatars rendered before the rest roll into the count |
| `count` | `number` | `users.length` | Total people represented; the surplus over shown avatars is abbreviated (e.g. `2000` → `2k`) |
| `indicator` | `string` | `"+"` | Glyph shown before the count |
| `message` | `string` | `"others interested"` | Trailing copy after the count |
| `showMessage` | `boolean` | `true` | Toggle the indicator/count/message block |

Extends `React.HTMLAttributes<HTMLDivElement>` (minus `children`), so standard `div` props (`className`, `id`, ARIA, etc.) pass through to the root.

### Responsive behavior

The Figma `breakpoint` variant (`sm` / `lg`) is implemented in code with Tailwind responsive utilities rather than a prop — avatars are `w-6` at `sm` and `w-8` from `lg` up, with overlap and message spacing widening accordingly. There is no `breakpoint` prop to set.

## Token Specification

### Color

| Token | Value | Role |
|---|---|---|
| `color/background/default` | `#FFFFFF` | Group container surface |
| `color/border/inverse` | `#FFFFFFB2` | Avatar ring / overlap border (~70% white) |
| `color/content/subtle` | `#424446` | Message text |

### Spacing & Typography

| Property | Value |
|---|---|
| Gap (avatars ↔ message) | 8px (`gap-2`) |
| Avatar size | 24px (`sm`) / 32px (`lg`) |
| Border width | 1px |
| Message text | Geist Medium (500), 14px (`text-sm`) |

## Usage Guidelines

**Primary use cases**

- Social proof indicators showing participation or interest in content
- Event attendee previews displaying key participants with a total count
- Team or collaborator representations in cards and list items
- Community engagement displays showing active users or contributors

**Implementation considerations**

- Cap `avatarsToDisplay` to keep the stack readable; let the rest fold into the count.
- Provide high-quality, appropriately sized `imageUrl`s; the initial fallback covers missing images.
- Pass a real `count` when the total exceeds the rendered avatars (e.g. 2,000 attendees) so the abbreviation is meaningful.
- Keep `message` short — it reads as a continuation of the count ("+2k others interested").

## Implementation

```tsx
import { AvatarGroup } from '@eventz-ui/core/client-components';

<AvatarGroup
  users={[
    { name: 'Ada Lovelace', imageUrl: '/avatars/ada.jpg' },
    { name: 'Alan Turing', imageUrl: '/avatars/alan.jpg' },
    { name: 'Grace Hopper', imageUrl: '/avatars/grace.jpg' },
  ]}
  count={2000}
  message="others interested"
/>
```

## Accessibility

- Each avatar image uses the user's `name` as `alt` text; the initial fallback is rendered when the image fails.
- Keep the count/message legible — it conveys scale that the avatars alone do not.
- The component is a presentational `div`; if the group is interactive, wrap it in a button or link and provide an accessible name (e.g. "View all 2,000 attendees").
- Avatar borders provide separation against any background without relying on color alone.
