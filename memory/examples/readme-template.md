# {{ComponentName}}

## Overview
{{Agent: Write a concise description of the component’s purpose, when to use it, and its key behaviors. Keep to 2–4 sentences.}}

---

## Import

### Component
```ts
import { {{ComponentName}} } from '@doxyz-ui/core/{{server | client}}/{{ComponentName}}';
```

### Types

```ts
import type { {{ComponentName}}Props } from '@doxyz-ui/core/{{server | client}}/{{ComponentName}}';
```

---

## Usage

{{Agent: If the component accepts children, use this code block}}
```tsx
<{{ComponentName}} { ...props }>{children}</{{ComponentName}}>
```

{{Agent: If the component does not accept children, use this code block}}
```tsx
<{{ComponentName}} { ...props } />
```

> {{Agent: Add 1–2 short bullets with usage tips or defaults.}}

---

## Props (Declared + Inherited)

{{Agent: Resolve all extended interfaces and list only public, component-level props. Exclude HTMLElement attributes from @types/react.}}

| Prop       | Type       |       Default | Required | Notes    |
| ---------- | ---------- | ------------: | :------: | -------- |
| `{{prop}}` | `{{type}}` | `{{default}}` |          | {{note}} |

* **Extends:** `{{ExtendedInterfaces}}`
* **Forwards:** All standard HTML attributes for `<{{HTMLTag}}>` to the root element.

---

## Slots & Structure

{{Agent: Describe available slots and root structure. Use concise bullets.}}

* **container** — outer wrapper; receives forwarded HTML attributes.
* **{{slotName}}** — {{slotPurpose}}
* **{{slotName}}** — {{slotPurpose}}

> DOM structure sketch (optional):

```txt
<{{HTMLTag}} data-...>
  {{SlotSketch}}
</{{HTMLTag}}>
```

---

## Data Attributes & States

{{Agent: Derive from runtime/styleMap. Include only semantic, public states.}}

| State flag                  | Selector example | Effect                                            |
| --------------------------- | ---------------- | ------------------------------------------------- |
| `data-[loading=true]`       | `&`              | Applies loading visuals and disables interactions |
| `data-[validation=invalid]` | `[&_._input]`    | Highlights invalid input styles                   |

---

## Accessibility

{{Agent: Generate concrete guidance for this control type. Keep it specific and testable.}}

* **Name:** {{How the accessible name is provided (visible text, `aria-label`, `aria-labelledby`)}}
* **Keyboard:** {{Key interactions; e.g., Tab focus, Enter/Space activate, Arrow keys for sliders/lists}}
* **Roles/States:** {{Relevant ARIA roles or states, if any}}
* **Announcements:** {{When/what changes should be announced (aria-live, status messages)}}
* **Icon-only pattern (if applicable):** Requires non-empty `aria-label`; decorative icons must be `aria-hidden="true"`.

---

## Patterns & Examples

{{Agent: Add 2–4 focused examples that show common patterns. Keep them short.}}

### {{PatternName}}

```tsx
<{{ComponentName}} {{PatternProps}}>{{PatternChildren}}</{{ComponentName}}>
```

---

## Blueprint Parity

{{Agent: Compare blueprint contract + styleMap to runtime. Keep as checklist.}}

* Contract ↔ styleMap variants: **{{OK|MISMATCH}}**
* Slots parity: **{{OK|MISMATCH}}**
* State flags parit
