---
title: Text Link
description: Inline navigational link with optional start/end icons, across brand, strong, subtle, and inverted emphasis levels and default, hover, active, focus, and disabled states.
status: stable
version: 1.0.0
category: components
level: atom
tags: [text-link, link, anchor, navigation, variants, inline]
figma: https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2369-3049
source: packages/core/src/components/client/TextLink/TextLink.tsx
package: "@eventz-ui/core"
system: Eventz
canonical: reconciled
lastUpdated: 2026-08-05
---

**[Open in Figma](https://www.figma.com/design/E7oXr98i91HYQGZxA2USOQ/DEMO-Eventz-Design-System?node-id=2369-3049)** | **[View Source](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/TextLink/TextLink.tsx)** | **[Storybook](https://github.com/southleft/eventz-design-system/blob/main/packages/core/src/components/client/TextLink/TextLink.stories.tsx)**

> Generated from the Eventz Figma library via the Company Docs MCP component-doc tool, lightly curated.

## Overview

An interactive text element that provides navigation or action functionality, rendered as a native
`<a>` with optional decorative icons before and after the label. It supports four emphasis levels —
`brand`, `strong`, `subtle`, and `inverted` — each with its own color treatment, and covers the full
set of interaction states: default, hover, active, focus, and disabled.

The link is deliberately **not underlined** (`no-underline` in code), so emphasis and color carry the
affordance. See [Accessibility](#accessibility) for why that matters.

### Emphasis levels

- **`brand`** — brand-colored, for key conversion points and brand-related actions. The default.
- **`strong`** — high contrast, for primary navigation or important actions.
- **`subtle`** — reduced contrast, for secondary links that support the main content.
- **`inverted`** — light styling for dark backgrounds or brand-filled surfaces.

### Interactive states

- **`default`** — standard display state with base styling.
- **`hover`** — color shift signalling interactivity.
- **`active`** — pressed state during interaction.
- **`focus`** — keyboard focus ring for accessibility navigation.
- **`disabled`** — reduced opacity, pointer events removed.

### Content configuration

- **`label`** — the visible link text.
- **`hasStartIcon`** — optional icon before the label.
- **`hasEndIcon`** — optional icon after the label, typically a directional or outbound cue.

## Component Anatomy

```
TextLink (a, inline-flex, horizontal, gap: 8px in code / 4px in Figma)
├── startIcon (span, optional, aria-hidden="true")
├── label     (span)
└── endIcon   (span, optional, aria-hidden="true")
```

### Design structure (Figma)

```
emphasis=subtle, state=default (COMPONENT) — horizontal auto-layout, gap: 4px
├── Icon (INSTANCE)
│   └── Icon (VECTOR)
├── Label (TEXT)
└── Icon (INSTANCE)
    └── Icon (VECTOR)
```

## Variants

The Figma component ships **20 variants** — four `emphasis` values × five `state` values. Text and
icon share the same color in every combination, so the table below gives one color per cell.

| emphasis | default | hover | active | focus | disabled |
|---|---|---|---|---|---|
| **brand** | `color/content/brand` (#224B60) | `color/content/brand-hover` (#3D7A95) | #224B60 | #224B60 + ring | #224B60 |
| **strong** | `color/content/default` (#252729) | `color/content/default-hover` (#000002) | `comp/button/color/content/active` (#252729) | #252729 + ring | #252729 |
| **subtle** | `color/content/weak` (#5B5D5E) | `color/content/weak-hover` (#2C2E30) | #5B5D5E | #5B5D5E + ring | #5B5D5E |
| **inverted** | `comp/button/primary/color/content/default` (#FFFFFF) | #FFFFFF | #FFFFFF | #FFFFFF + ring | #FFFFFF |

All focus variants add the stroke `comp/border/focus-ring` (#2D6079).

<Note>
Three things the variant set does not encode. **1.** The `disabled` variants carry the same colors as
`default` — the dimming is a layer property in Figma, and `opacity-50` in code. **2.** `active` is
visually identical to `default` for all four emphasis levels in Figma, so it is effectively
unspecified there. **3.** `inverted` never changes on hover or active in Figma, but code does define
both. See [Design-Code Parity](#design-code-parity).
</Note>

### Configurable properties (Figma)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `emphasis` | `"strong" \| "subtle" \| "inverted" \| "brand"` | `"strong"` | Color treatment. Named `variant` in code, and code defaults to `brand`. |
| `state` | `"default" \| "hover" \| "active" \| "focus" \| "disabled"` | `"default"` | Interaction state (design-time) |
| `hasStartIcon` | `boolean` | `true` | Show an icon before the label |
| `hasEndIcon` | `boolean` | `true` | Show an icon after the label |
| `text` | `string` | `"Label"` | Link label content |

## Token Specification

### Color

| Token | Value | Role |
|---|---|---|
| `color/content/brand` | #224B60 | `brand` label + icon |
| `color/content/brand-hover` | #3D7A95 | `brand` on hover |
| `color/content/default` | #252729 | `strong` label + icon |
| `color/content/default-hover` | #000002 | `strong` on hover |
| `comp/button/color/content/active` | #252729 | `strong` on active |
| `color/content/weak` | #5B5D5E | `subtle` label + icon |
| `color/content/weak-hover` | #2C2E30 | `subtle` on hover |
| `comp/button/primary/color/content/default` | #FFFFFF | `inverted` label + icon |
| `comp/border/focus-ring` | #2D6079 | Focus ring (all emphasis levels) |

### Spacing

| Property | Figma Variable | Value |
|---|---|---|
| Gap (icon ↔ label) | `spacing/1` | 4px in Figma · 8px in code (`gap-2`) |
| Border radius (focus ring) | — | `rounded-sm` |
| Border width | — | 1px |

### Typography

| Element | Font | Weight | Size | Line height |
|---|---|---|---|---|
| Label (Figma, all variants) | Geist | Medium (500) | 14px | 20px |
| Label — `brand` (code) | Geist | **Bold (700)** | 14px | 20px |
| Label — `strong` (code) | Geist | Medium (500) | 14px | 20px |
| Label — `subtle` / `inverted` (code) | Geist | inherited | 14px | 20px |

## Usage Guidelines

**Primary use cases**

- Navigation links within content areas or menus
- Call-to-action links in marketing or promotional content
- Reference links to external resources or documentation
- Inline links within body text for additional information

**Implementation considerations**

- Use **strong** for primary navigation and important actions; **subtle** for secondary links that support main content.
- Use **inverted** whenever the link sits on a dark or brand-filled surface — for example inside an `Alert`, which accepts a `textLink` prop.
- Reserve **brand** for key conversion points and brand-related actions.
- Include an icon only when it adds meaningful context; use `endIcon` for directional or outbound cues.
- Write link text that describes the destination on its own — avoid "click here".
- Reach for `Button` instead when the control performs an action rather than navigating.

## Implementation

### Import

```tsx
import { TextLink } from '@eventz-ui/core/client-components';
```

### Component API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — (required) | Visible link text. Trimmed before render. |
| `href` | `string` | — (required) | Link destination (URL or path). Trimmed before render. |
| `variant` | `"brand" \| "strong" \| "subtle" \| "inverted"` | `"brand"` | Visual style. Only `brand` is bold; `inverted` is for dark/brand-filled surfaces. |
| `startIcon` | `React.ReactNode` | — | Leading icon; wrapped in an `aria-hidden` span. |
| `endIcon` | `React.ReactNode` | — | Trailing icon; wrapped in an `aria-hidden` span. |
| `disabled` | `boolean` | `false` | Applies `aria-disabled="true"`, 50% opacity, and `pointer-events-none`. |

Extends `React.AnchorHTMLAttributes<HTMLAnchorElement>` minus `children`, `aria-disabled`, and
`href`, so `target`, `rel`, `onClick`, and other anchor attributes pass through to the root.

### Sub-parts

| Slot | Element | Description |
|---|---|---|
| `startIcon` | `<span>` | Leading icon — `aria-hidden="true"`, `shrink-0`. |
| `label` | `<span>` | The visible link text. |
| `endIcon` | `<span>` | Trailing icon — `aria-hidden="true"`, `shrink-0`. |

### Variant definition

```tsx
// Tailwind class groups (no CVA) — TextLink.tsx
const baseClasses = `
  inline-flex items-center select-none no-underline gap-2
  text-sm whitespace-nowrap transition-colors outline-none rounded-sm
  focus-visible-brand
  aria-disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:select-none
`;

const variantClasses: Record<Variant, string> = {
  brand:    `text-color-content-brand hover:text-color-content-brand-hover font-bold`,
  strong:   `font-medium text-color-content-default hover:text-color-content-default-hover`,
  subtle:   `text-color-content-weak hover:text-color-content-weak-hover`,
  inverted: `text-comp-button-primary-color-content-default
             hover:text-comp-button-primary-color-content-hover
             active:text-comp-button-primary-color-content-active`
};
```

### Usage examples

#### Default brand link

```tsx
<TextLink label="Learn more" href="/events" />
```

#### Inverted link on a brand-filled surface, with a trailing icon

```tsx
<TextLink
  variant="inverted"
  label="Complete payment"
  href="/checkout"
  endIcon={<ArrowRightIcon />}
/>
```

#### Subtle secondary link, disabled

```tsx
<TextLink
  variant="subtle"
  label="Download invoice"
  href="/invoice.pdf"
  disabled
/>
```

### Source files

| File | Role |
|------|------|
| `packages/core/src/components/client/TextLink/TextLink.tsx` | Component implementation |
| `packages/core/src/components/client/TextLink/TextLink.stories.tsx` | Storybook stories: Default, Strong, Subtle, Inverted, Disabled, WithStartIcon, WithEndIcon, WithIcons |
| `packages/core/src/components/client/TextLink/TextLink.test.tsx` | Unit tests |
| `packages/core/src/components/client/TextLink/README.md` | Component README |
| `packages/blueprints/src/components/TextLink/TextLink.contract.ts` | Blueprint prop contract |
| `packages/blueprints/src/components/TextLink/TextLink.styleMap.ts` | Blueprint style map |

## Accessibility

- Renders a native `<a>`, so it is keyboard focusable and activates with Enter by default.
- Focus is clearly indicated by the brand focus ring (`comp/border/focus-ring`, #2D6079) via `focus-visible-brand`.
- Link text must describe its destination or action on its own — `label` is the entire accessible name.
- Start and end icons are `aria-hidden="true"`, so they must never be the only carrier of meaning.

**Two things to verify in your usage:**

- **Links are not underlined.** `no-underline` is applied in the base classes and there is no other
  non-color affordance, so within a block of body text the only thing distinguishing a link is its
  color — which fails WCAG 1.4.1 (Use of Color) unless the surrounding design supplies another cue.
  The Figma component description itself states "color cannot be the only means of indicating link
  functionality." Add an underline (or another indicator) for links placed inline in prose.
- **`disabled` does not remove the link from the tab order.** It sets `aria-disabled="true"` and
  `pointer-events-none`, but the anchor keeps its `href` and stays focusable, so a keyboard user can
  still focus it and activate it with Enter. If a link must be genuinely unavailable, render it as
  plain text instead. Pair the disabled state with text explaining *why* it is unavailable.

## Design-Code Parity

| Axis | In Figma | In Code | Status |
|---|---|---|---|
| Emphasis values (`brand` / `strong` / `subtle` / `inverted`) | Yes, as `emphasis` | Yes, as `variant` | **Naming mismatch** — same four values, different property name |
| Default emphasis | `strong` | `brand` | **Mismatch — needs reconciliation** |
| `hover` | Yes, all four | Yes, all four | Matched |
| `active` | Variant exists, but colors equal `default` | Only `inverted` defines an active color | **Under-specified in Figma** |
| `focus` | Yes (variant) | CSS `focus-visible`, not a prop | Expected difference — design-time only |
| `disabled` | Yes (colors equal default; dimming is a layer property) | `aria-disabled` + `opacity-50` | Matched in effect |
| Label weight | Medium (500) for all variants | `brand` is Bold (700) | **Mismatch — needs reconciliation** |
| Gap (icon ↔ label) | 4px (`spacing/1`) | 8px (`gap-2`) | **Mismatch — needs reconciliation** |
| `startIcon` / `endIcon` | `hasStartIcon` / `hasEndIcon` booleans | Node slots | Matched in intent |

<Note>
`color/content/brand` resolves to **#224B60** with `color/content/brand-hover` at **#3D7A95** — so the
`brand` link gets *lighter* on hover. Button and Tag treat #3D7A95 as the base brand color and #2D6079
as its hover. Worth confirming which direction is intended before relying on the brand ramp here.
</Note>
