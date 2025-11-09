# Accordion
*Type: client* | *Base: RadixAccordion.Root* | *Last updated: 2025-11-08*

## Overview
Accordion reveals a single collapsible answer or detail block with a Radix-powered trigger and chevron indicator. Use it for short FAQ-style disclosures that may optionally show a decorative thumbnail and intro sentence before the body. Emphasis styles let you control how bold the title reads without changing the layout.

---

## Import

### Component
```ts
import { Accordion } from '@doxyz-ui/core/client/Accordion';
```

### Types

```ts
import type { AccordionProps } from '@doxyz-ui/core/client/Accordion';
```

---

## Usage

```tsx
<Accordion title="What is DoXYZ?">
  {children}
</Accordion>
```

---

## Props (Declared + Inherited)

The table below flattens `RadixAccordion.Root` into component-level props (alphabetical, with HTMLElement attributes omitted except for `className`). Defaults show the exact literal applied by the runtime or Radix.

| Prop          | Type                                                             | Default | Required | Notes |
| ------------- | ---------------------------------------------------------------- | ------- | :------: | ----- |
| `asChild`     | `boolean`                                                        | `false` |          | Render the root inside your own component via Radix Slot semantics. |
| `children`    | `React.ReactNode`                                                |         |          | Body content rendered inside the collapsible region. |
| `className`   | `string`                                                         |         |          | Appends utility classes to the root container. |
| `defaultValue`| `string`                                                         |         |          | Initial item value to expand; forwarded to `RadixAccordion.Root`. |
| `dir`         | `'ltr' \| 'rtl'`                                                 | `'ltr'` |          | Reading direction passed to Radix for proper keyboard order. |
| `disabled`    | `boolean`                                                        | `false` |          | Disables all user interaction and styles the trigger accordingly. |
| `emphasis`    | `'strong' \| 'weak'`                                             | `'strong'` |        | Chooses whether the title text receives the bold emphasis class. |
| `image`       | `React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>`  |         |          | Decorative thumbnail shown to the left of the title. |
| `intro`       | `string`                                                         |         |          | Optional paragraph rendered above the main children within content. |
| `onValueChange` | `(value: string) => void`                                      |         |          | Controlled callback fired when the accordion toggles. |
| `orientation` | `'horizontal' \| 'vertical'`                                     | `'vertical'` |      | Changes the arrow key behavior Radix wires to the trigger. |
| `title`       | `string`                                                         |         |   Yes    | Visible label for the trigger button and accessible name. |
| `value`       | `string`                                                         |         |          | Controlled value that keeps the lone item open when it matches `value`. |

* **Extends:** `RadixAccordion.Root` minus: `children`, `className`, `collapsible`, `type`
* **Forwards:** All standard HTML attributes for `&lt;div&gt;` to the root element.

---

## Structure

* **container (`data-slot="container"`)** — `RadixAccordion.Root`; wraps the single logical item and receives forwarded HTML attributes.
* **item (`data-slot="item"`)** — `RadixAccordion.Item`; keeps Radix state in sync with the configured `value`.
* **header (`data-slot="header"`)** — `RadixAccordion.Header`; structural wrapper for the trigger button.
* **trigger (`data-slot="trigger"`)** — `RadixAccordion.Trigger`; contains the label group and chevron and handles focus rings.
* **triggerLabelGroup (`data-slot="triggerLabelGroup"`)** — Inline flex wrapper for the optional image and title.
* **image (`data-slot="image"`)** — Optional decorative span wrapping the provided `&lt;img&gt;` element.
* **title (`data-slot="title"`)** — Text node showing the required `title` prop; bolded when `emphasis="strong"`.
* **icon (`data-slot="icon"`)** — Span that reserves space for the chevron glyph.
* **iconGlyph (`data-slot="iconGlyph"`)** — `KeyboardArrowDownIcon`; rotates based on Radix `data-state`.
* **content (`data-slot="content"`)** — `RadixAccordion.Content`; renders the optional intro followed by `children`.
* **intro (`data-slot="intro"`)** — Paragraph that appears before the main body when `intro` is provided.

> DOM structure sketch:

```jsx
<div data-slot="container">
  <div data-slot="item" value="accordionContent">
    <h3 data-slot="header">
      <button data-slot="trigger">
        <span data-slot="triggerLabelGroup">
          <span data-slot="image" aria-hidden="true">{image}</span>
          <span data-slot="title">{title}</span>
        </span>
        <span data-slot="icon" aria-hidden="true">
          <KeyboardArrowDownIcon data-slot="iconGlyph" />
        </span>
      </button>
    </h3>
    <div data-slot="content">
      <p data-slot="intro">{intro}</p>
      {children}
    </div>
  </div>
</div>
```

---

## Data Attributes & States

| State flag           | Effect |
| -------------------- | ------ |
| `data-state="open"` | Applied by Radix to the trigger/item to rotate the chevron and reveal content height. |
| `data-state="closed"` | Resets the icon rotation and keeps the content region collapsed. |

---

## Classes

| Data slot                     | Classes |
| ----------------------------- | ------- |
| `container`                   | `[&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-offset-4 [&:has(:focus-visible)]:ring-comp-border-focus-ring [&:has(:focus-visible)]:ring-offset-color-background-default flex flex-col w-full` |
| `item`                        | `bg-comp-accordion-item-color-background-default text-comp-accordion-item-color-foreground-default rounded-md` |
| `header`                      | `border mt-auto mb-auto border-none` |
| `trigger`                     | `text-color-content-default hover:text-color-content-default-hover border-none w-full flex justify-between outline-none bg-background-none pt-2 pb-2 pl-1 pr-1 group` |
| `triggerLabelGroup`           | `inline-flex items-center gap-8` |
| `image`                       | `[&_img]:h-24 [&_img]:w-24 [&_img]:rounded-[4px] overflow-hidden [&_img]:object-cover` |
| `title`                       | `text-base lg:text-lg` |
| `title (strong emphasis)`     | `font-bold` |
| `icon`                        | `shrink-0` |
| `iconGlyph`                   | `transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0 size-20` |
| `content`                     | `text-color-content-weak text-sm pl-1 pr-1` |
| `intro`                       | `text-color-content-weak text-sm` |

---

## Accessibility

* **Name:** The required `title` prop renders inside the trigger button, providing the accessible name; supply an `aria-label` only when rendering a fully custom trigger via `asChild`.
* **Keyboard:** Standard button semantics apply—Tab sets focus, Space or Enter toggles the item, and Shift+Tab moves backwards; Radix also honors ArrowUp/ArrowDown for orientation-specific navigation.
* **Roles/States:** `RadixAccordion.Trigger` manages `aria-expanded` and `aria-controls`, while `RadixAccordion.Content` references the controlling trigger via `aria-labelledby`.
* **Announcements:** Radix automatically updates `aria-expanded`, so screen readers announce the expanded/collapsed state as the user toggles; keep body copy concise so announcements remain short.
* **Icon-only pattern:** Not applicable—the chevron is marked `aria-hidden="true"`; keep the title text visible for every usage.

---

## Patterns & Examples

### Basic Disclosure

```tsx
<Accordion title="What is DoXYZ?">
  <p>DoXYZ pairs AI + design systems to help teams launch better docs faster.</p>
</Accordion>
```

- Keep FAQ answers to a few sentences so the pattern stays scannable.

### With Thumbnail

```tsx
<Accordion
  title="Customer story"
  image={<img src="https://placehold.co/160x160/png" alt="Customer illustration" />}
>
  <p>Pair the decorative thumbnail with copy that reinforces the visual.</p>
</Accordion>
```

- Pass an actual `&lt;img&gt;` element; the wrapper enforces consistent sizing and rounded corners.
- Set `alt` text that matches how you reference the image in the copy.

### Intro + Weak Emphasis

```tsx
<Accordion title="Onboarding overview" emphasis="weak" intro="Start here before diving into the guides.">
  <ol>
    <li>Create your workspace.</li>
    <li>Invite collaborators.</li>
    <li>Publish your first doc.</li>
  </ol>
</Accordion>
```

- Use the `intro` prop for a short summary sentence; keep the longer steps in `children`.
- `emphasis="weak"` leaves the title at regular weight so it blends into dense lists.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `4059d322d7a83180b3648f8e73d8684ed95871da72beb6775fb2667a4670d156`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
