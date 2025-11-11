# Stepper
*Type: client* | *Base: nav* | *Last updated: 2025-11-11*

## Overview
Stepper renders a horizontal sequence of numbered steps that visualize progress through a multi-step flow. It supports both static display (non-interactive list) and interactive mode (buttons with `role="tab"`) when `onStepChange` is provided. Completed steps show a check icon, the active step shows the provided `activeLabel`, and rails between steps update to reflect progress.

---

## Import

### Component
```ts
import { Stepper } from '@doxyz-ui/core/client/Stepper';
```

### Types

```ts
import type { StepperProps } from '@doxyz-ui/core/client/Stepper';
```

---

## Usage

```tsx
<Stepper { ...props } />
```

---

## Props (Declared + Inherited)

| Prop          | Type                    | Default | Required | Notes |
| ------------- | ----------------------- | ------: | :------: | ----- |
| `activeLabel` | `string`                |         |   Yes    | Text rendered under the active step indicator; also used to label the active button in interactive mode.
| `activeStep`  | `number`                |         |   Yes    | One-based index of the current step.
| `className`   | `string`                |         |          | Appends utility classes to the root `<nav>`.
| `onStepChange`| `(index: number) => void` |       |          | When provided, steps become buttons with `role="tab"`; the callback receives the zero-based index that was clicked.
| `steps`       | `number`                |         |   Yes    | Total number of steps; must be ≥ 1.

* **Extends:** `React.ComponentPropsWithoutRef<'nav'>` minus `children`.
* **Forwards:** Additional nav attributes (`aria-label`, `aria-describedby`, etc.) via `{...rest}`.

---

## Structure

* **container** — `<nav>` with `role="tablist"` when interactive, otherwise `role="list"`.
* **rail** — Horizontal line segments between steps; data attributes indicate progress (`default`, `partial`, `full`).
* **step** — Button or div representing a numbered step; carries `data-step-status` (`completed`, `active`, `upcoming`).
* **indicator** — Numeric or check icon inside each step.
* **label** — Text below the active step only.

> DOM structure sketch:

```jsx
<nav role={onStepChange ? 'tablist' : 'list'}>
  {steps.map((_, index) => (
    <Fragment key={index}>
      {index > 0 && <div data-slot="rail" data-rail-status={...} />}
      <div className="step-wrapper">
        {onStepChange ? (
          <button
            role="tab"
            data-slot="step"
            data-step-status={status}
            onClick={() => onStepChange(index)}
            aria-current={index === activeIndex ? 'step' : undefined}
          >
            <span data-slot="indicator" aria-hidden="true">{indicator}</span>
          </button>
        ) : (
          <div role="listitem" data-slot="step" data-step-status={status}>
            <span data-slot="indicator" aria-hidden="true">{indicator}</span>
          </div>
        )}
        {index === activeIndex && (
          <span data-slot="label">{activeLabel}</span>
        )}
      </div>
    </Fragment>
  ))}
</nav>
```

---

## Data Attributes & States

| State flag                   | Effect |
| ---------------------------- | ------ |
| `data-step-status="completed"` | Applies brand background, white text, and check indicator.
| `data-step-status="active"`     | Highlights the circle with brand text/border and shows the active label.
| `data-step-status="upcoming"`   | Keeps the circle muted.
| `data-rail-status="partial"`    | Fills the rail halfway to illustrate progress into the active step; `full` fills entirely.

---

## Classes

| Data slot | Classes |
| --------- | ------- |
| `container` | `flex` `items-center` `select-none` `transition-colors` |
| `step` | `flex` `flex-col` `items-center` `justify-center` `relative` `size-32` `rounded-full` `font-bold` `border-[2px]` `transition-colors` `focus-visible-brand` `data-[step-status=active]:bg-color-background-default` `data-[step-status=active]:text-color-content-brand` `data-[step-status=active]:border-color-border-strong` `data-[step-status=completed]:bg-color-content-brand` `data-[step-status=completed]:text-color-background-default` `data-[step-status=completed]:outline-2` `data-[step-status=completed]:outline-color-border-strong` `data-[step-status=completed]:outline-offset-1` `data-[step-status=upcoming]:bg-color-background-default` `data-[step-status=upcoming]:text-color-content-weak` `data-[step-status=upcoming]:border-color-border-default` `data-[step-status=active]:hover:text-color-content-brand-hover` `data-[step-status=active]:hover:border-color-border-strong-hover` `data-[step-status=upcoming]:hover:text-color-content-weak-hover` `data-[step-status=upcoming]:hover:border-color-border-default-hover` |
| `indicator` | `pointer-events-none` `flex` `items-center` `justify-center` |
| `label` | `text-sm` `text-center` `whitespace-nowrap` `text-color-content-default` `absolute` `left-1/2` `top-[calc(100%+6px)]` `-translate-x-1/2` |
| `rail` | `flex-1` `h-[2px]` `transition-colors` `bg-color-border-default` `data-[rail-status=default]:bg-color-border-default` `data-[rail-status=full]:bg-color-border-strong` `data-[rail-status=partial]:bg-color-border-default` |

---

## Accessibility

* **Name:** Provide `aria-label` on the `<nav>` to describe the overall process (“Checkout progress”).
* **Keyboard:** Interactive mode behaves like tabs—Left/Right arrows move between steps, Enter/Space activate the focused step (handled by browser buttons).
* **Roles/States:** Buttons use `role="tab"`, `aria-selected`, and `aria-current="step"` for the active position. Static mode falls back to `role="list"` + `role="listitem"`.
* **Announcements:** Only the active step renders the text label, but interactive buttons include `aria-labelledby` pointing to it so screen readers announce meaningful names.
* **Icon-only pattern:** The numeric/check indicator is decorative and marked `aria-hidden`; the accessible name comes from labels and aria attributes.

---

## Patterns & Examples

### Read-only progress

```tsx
<Stepper steps={3} activeStep={1} activeLabel="Plan" />
```

- Omit `onStepChange` when the user can’t manipulate the progress.

### Interactive wizard

```tsx
<Stepper
  steps={5}
  activeStep={active}
  activeLabel={labels[active - 1]}
  onStepChange={index => setActive(index + 1)}
/>
```

- Update your form state before switching `activeStep`.

### Custom nav attributes

```tsx
<Stepper steps={4} activeStep={3} activeLabel="Review" aria-label="Onboarding status" />
```

- Additional nav props like `aria-label` or `aria-describedby` are forwarded.

---

## Blueprint Parity

* Contract ↔ styleMap variants: **OK**
* Slots parity: **OK**
* State flags parity: **OK**
* Signature hash: `4e75c81838bbf8b83edc73b9ea095092ff69e326eeaab53aa01bb98c014d69a2`

---

## Changelog

| Date       | Changes |
| ---------- | ------- |
| 2025-11-11 | Synced classes with blueprint tokens. |
| 2025-11-08 | Initial documentation and Storybook README wiring. |
