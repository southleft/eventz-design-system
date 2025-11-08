# {{ComponentName}}
*Type: {{server | client}}* |
*Base: {{HTMLTag | BasePrimitive}}* |
*Last updated: {{YYYY-MM-DD}}*

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

{{Agent: Resolve all extended interfaces and list only public, component-level props. Except for className, exclude HTMLElement attributes from @types/react. List props in alphabetical order. Do NOT include a catch-all row like "...rest" or "Other props"—every inherited prop must appear as its own row. In the Default column, print the exact JS/TS literal when available (e.g., { placeholder: 'Select a date range', endIcon: <ArrowDropDownIcon /> }); do not use prose descriptions like "placeholder + Icon". Keep all props in alphabetical order.}}

| Prop       | Type       |       Default |                          Required                          | Notes    |
| ---------- | ---------- | ------------: | :--------------------------------------------------------: | -------- |
| `{{prop}}` | `{{type}}` | `{{default}}` | {{Agent: Output "Yes" if required; otherwise leave blank}} | {{note}} |

{{Agent: For {{ExtendedInterfaces}}, output a wrap-friendly block (start with a newline). Expand utility types (Omit, Pick, Partial, Required, Readonly, intersections) before printing. For each extended interface:

- If keys are omitted, print: "`{{InterfaceName}}` minus: " then a comma delimited list: `{{key1}}`, `{{key2}}`, `{{key3}}`, ...
- If no keys are omitted, print: `{{InterfaceName}}`

Rules: do NOT output raw `Omit<>`/`Pick<>` strings; do NOT include DOM/HTMLElement attributes; wrap only identifiers in backticks; prefer comma delimited lists; keep width ≤ 80 chars.}}
* **Extends:** {{ExtendedInterfaces}}
* **Forwards:** All standard HTML attributes for `<{{HTMLTag}}>` to the root element.

---

## Structure

{{Agent: Describe available slots and root structure. Use concise bullets.}}

* **container** — outer wrapper; receives forwarded HTML attributes.
* **{{slotName}}** — {{slotPurpose}}
* **{{slotName}}** — {{slotPurpose}}

> DOM structure sketch:

```txt
<{{HTMLTag}} data-...>
  {{SlotSketch}}
</{{HTMLTag}}>
```

---

## Data Attributes & States

{{Agent: Derive from runtime/styleMap. Include only semantic, public states.}}

| State flag                  | Effect                                            |
| --------------------------- | ------------------------------------------------- |
| `data-[loading=true]`       | Applies loading visuals and disables interactions |
| `data-[validation=invalid]` | Highlights invalid input styles                   |

---

## Classes

{{Agent: List all classes used by each data slot.}}

| Data slot                    | Classes                                 |
| ---------------------------- | --------------------------------------- |
| `{{data slot or container}}` | `{{class}}` `{{class}}` `{{class}}` ... |

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
* State flags parity: **{{OK|MISMATCH}}**
* Signature hash: `{{runtimeHash}}`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| {{YYYY-MM-DD}} | {{Agent: Summarize the update (e.g., "Initial documentation", "Synced props with contract")}} |
