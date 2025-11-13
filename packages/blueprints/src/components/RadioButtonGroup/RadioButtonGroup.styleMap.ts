// packages/blueprints/src/components/RadioButtonGroup/RadioButtonGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

// TODO: Reconcile token blurbs against finalized component styling before shipping.
export const RadioButtonGroupStyleMap = defineStyleMap({
  base: ['inline-flex', 'flex-col', 'gap-0.25', 'border-none', 'py-2'] as const,

  slots: {
    label: [
      'inline-flex',
      'gap-0.25',
      'text-color-content-default',
      'text-xs',
      'uppercase'
    ] as const,
    hint: ['text-color-content-subtle', 'text-xs', '-mt-2'] as const,
    // Layout handled by Radix RadioGroup orientation handling.
    radiogroup: ['flex', 'flex-col', 'gap-2'] as const,
    control: [
      'flex',
      'flex-col',
      'gap-3',
      'items-center',
      'justify-center',
      'size-4',
      'shrink-0',
      'rounded-full',
      'border',
      'mt-0.5',
      'border-color-content-weak',
      'bg-background-none',
      'focus:outline-none',
      'disabled:opacity-50',
      'focus-visible-brand'
    ] as const,
    indicator: [
      'pointer-events-none',
      'block',
      'size-2',
      'rounded-full',
      'bg-color-content-brand'
    ] as const,
    // Visual label styling is applied on the wrapping Radix Label.Root container in runtime.
    // The inner span carries no classes to avoid duplication and drift.
    choiceLabel: [] as const,
    choiceHint: ['text-color-content-subtle', 'text-xs'] as const,
    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
      'mt-1',
      'inline-flex',
      'items-start',
      'gap-0.5',
      'items-center'
    ] as const
  },

  layout: {},

  variants: {},

  state: {
    hasError: [
      // TODO: verify final danger border token during component styling QA.
      'data-[has-error=true]:[&_[data-slot=control]]:border-color-border-utility-danger-subtle'
    ] as const
  }
});
