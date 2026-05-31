---
title: Eventz Design System
description: Components, design tokens, and usage guidelines for building event-based product experiences.
---

Eventz is a React component library for event-based applications, built with [Radix UI](https://www.radix-ui.com/)
and [Tailwind CSS](https://tailwindcss.com/) and driven by design tokens synced from Figma.

This documentation is generated from the Eventz Figma library and published from a single source of
Markdown. The same files power two things: this human-readable site and an AI-queryable
**Company Docs MCP** endpoint.

## Foundations

- **Brand color** — a teal ramp (`brand/500 = #3D7A95`)
- **Typeface** — [Geist](https://vercel.com/font)
- **Spacing / radii / shadows** — standard design-system scales, consistent across components

## Components

<CardGroup cols={2}>
  <Card title="Button" href="/components/button">
    Primary, secondary, bare, and knockout variants with full interaction states.
  </Card>
  <Card title="Badge" href="/components/badge">
    Compact status and category labels, including the teal brand treatment.
  </Card>
  <Card title="Alert" href="/components/alert">
    Inline notifications across success, info, warning, and danger severities.
  </Card>
  <Card title="Input" href="/components/input">
    Single-line text field with label, hint, error, and disabled states.
  </Card>
</CardGroup>

## Install

```bash
npm install @eventz-ui/core
```

```tsx
import { Button } from '@eventz-ui/core/client-components';

<Button variant="primary">Get tickets</Button>
```
