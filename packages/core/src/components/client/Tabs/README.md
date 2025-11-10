# Tabs
*Type: client* | *Base: RadixTabs.Root* | *Last updated: 2025-11-08*

## Overview
Tabs renders a Radix-powered tab system with two trigger styles: `section` (classic underlined tabs with optional icons) and `button` (each trigger renders inside the Button component). Pass an array of tab descriptors and control the active tab via `value`/`onValueChange` or let it manage its own state with `defaultValue`.

---

## Import

### Component
```ts
import { Tabs } from '@doxyz-ui/core/client/Tabs';
```

### Types

```ts
import type { TabsProps } from '@doxyz-ui/core/client/Tabs';
```

---

## Usage

```tsx
<Tabs { ...props } />
```

---

## Props (Declared + Inherited)

| Prop            | Type                                                                 | Default | Required | Notes |
| --------------- | -------------------------------------------------------------------- | ------: | :------: | ----- |
| `activationMode`| `'automatic' \| 'manual'`                                            | `'automatic'` |       | Radix prop controlling whether focus (automatic) or click (manual) activates a tab.
| `ariaLabel`     | `string`                                                             |         |   Yes    | Accessible label applied to the `Tabs.List` element.
| `className`     | `string`                                                             |         |          | Appends utility classes to the root container.
| `defaultValue`  | `string`                                                             |         |          | Initial tab value when uncontrolled.
| `disabled`      | `boolean`                                                            |   `false` |          | Disables every trigger regardless of per-item `disabled` flags.
| `dir`           | `'ltr' \| 'rtl'`                                                     |         |          | Direction hint forwarded to Radix for keyboard navigation.
| `loop`          | `boolean`                                                            |        `false` |     | When true, arrow-key navigation loops from end to start.
| `onValueChange` | `(value: string) => void`                                            |         |          | Fired when a new tab is selected (both controlled and uncontrolled modes).
| `orientation`   | `'horizontal' \| 'vertical'`                                         | `'horizontal'` |     | Switch to `'vertical'` when triggers stack top-to-bottom.
| `tabsList`      | `ReadonlyArray<{ value: string; label: string; content: React.ReactNode; icon?: React.ReactNode; disabled?: boolean; forceMount?: true }>` |         |   Yes    | Data describing each tab. `icon` only renders for `type="section"`. `forceMount` passes through to `Tabs.Content`.
| `type`          | `'section' \| 'button'`                                              | `'section'` |        | Chooses trigger rendering mode.
| `value`         | `string`                                                             |         |          | Controlled active tab value; pair with `onValueChange`.

* **Extends:** `RadixTabs.Root` props (value/defaultValue/onValueChange/orientation/dir/activationMode) plus `Tabs.List` prop `loop`
* **Forwards:** Additional Radix props (`id`, `asChild`, etc.) through `...restRootProps`.

---

## Structure

* **base** — `RadixTabs.Root`; hosts `data-slot="base"` and wraps the list + content.
* **list** — `RadixTabs.List` containing triggers; receives `aria-label`.
* **trigger** — `RadixTabs.Trigger` (section mode) or `Button` via `asChild` (button mode); optional icon span is decorative.
* **content** — `RadixTabs.Content` for each tab’s body; `forceMount` ensures persistent DOM when requested.

> DOM structure sketch:

```jsx
<Tabs.Root value={value} onValueChange={setValue}>
  <Tabs.List aria-label={ariaLabel}>
    {tabsList.map(item => (
      <Tabs.Trigger key={item.value} value={item.value} disabled={disabled || item.disabled}>
        {type === 'section' && item.icon && (
          <span data-slot="triggerIcon" aria-hidden>{item.icon}</span>
        )}
        {item.label}
      </Tabs.Trigger>
    ))}
  </Tabs.List>
  {tabsList.map(item => (
    <Tabs.Content key={item.value} value={item.value} forceMount={item.forceMount}>
      {item.content}
    </Tabs.Content>
  ))}
</Tabs.Root>
```

---

## Data Attributes & States

| State flag             | Effect |
| ---------------------- | ------ |
| `data-state="active"` | Applied by Radix to the trigger; sets the brand underline and text color in section mode.
| `data-slot="list"`    | Used by the style map to set flex layouts; button mode adds an extra gap utility.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `base`    | `flex flex-col` |
| `list`    | `flex` (`gap-8` appended when `type="button"`) |
| `trigger` | `flex-grow inline-flex cursor-default select-none items-center justify-center h-34 px-10 outline-none text-color-content-weak border-b border-b-color-border-default bg-background-none border-t-0 border-l-0 border-r-0 disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default gap-6 hover:text-color-content-weak-hover hover:border-b-color-border-default-hover data-[state=active]:border-b-color-border-brand data-[state=active]:text-color-content-brand data-[state=active]:hover:border-b-color-border-brand-hover data-[state=active]:hover:text-color-content-brand-hover` (section mode)
| `triggerIcon` | `shrink-0 [&>svg]:size-16` |
| `content` | `outline-none text-color-content-default` |
| `button trigger` | Renders via `<Button>`; supply extra classes with `className` if needed.

---

## Accessibility

* **Name:** `ariaLabel` names the tablist; if you also render a heading, you can reuse that text.
* **Keyboard:** Arrow keys move between triggers (Left/Right or Up/Down based on `orientation`); Home/End jumps to the first/last tab; Space/Enter activates manual tabs.
* **Roles/States:** Radix handles `role="tablist"`, `role="tab"`, and `aria-controls`; `aria-selected` toggles automatically.
* **Announcements:** Disabled tabs remain focusable only when set programmatically; `forceMount` keeps inactive panels in the DOM when you need to preserve state for animations.
* **Icon-only pattern:** If you ever hide tab labels, ensure `tabsList[i].label` still contains readable text; icons stay `aria-hidden`.

---

## Patterns & Examples

### Section tabs with icons

```tsx
<Tabs
  ariaLabel="Project tabs"
  tabsList=[
    { value: 'summary', label: 'Summary', content: <Summary />, icon: <DashboardIcon /> },
    { value: 'activity', label: 'Activity', content: <Activity /> },
    { value: 'files', label: 'Files', content: <Files />, disabled: !canViewFiles }
  ]
/>
```

- Icons appear only in section mode; keep them concise so labels remain readable.

### Button-style tabs

```tsx
<Tabs
  type="button"
  ariaLabel="Chart range"
  defaultValue="7d"
  tabsList=[
    { value: '1d', label: '1D', content: <Range1D /> },
    { value: '7d', label: '7D', content: <Range7D /> },
    { value: '30d', label: '30D', content: <Range30D /> }
  ]
/>
```

- Each trigger renders inside the shared Button component for high-contrast chips.

### Manual activation

```tsx
<Tabs
  ariaLabel="Editor panels"
  activationMode="manual"
  value={panel}
  onValueChange={setPanel}
  tabsList={panels}
/>
```

- Manual mode waits for Enter/Space before changing content, which is useful when the tab body is expensive to render.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `f478117c7767e226b77a15d795474accf080474dddcce8e80eaf468cce7ec3e8`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
