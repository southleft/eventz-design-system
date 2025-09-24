// packages/blueprints/src/components/RadioButtonGroup/RadioButtonGroup.styleMap.ts
import { defineStyleMap } from '../../utilities';

// TODO: Reconcile token blurbs against finalized component styling before shipping.
export const RadioButtonGroupStyleMap = defineStyleMap({
  base: ['inline-flex', 'flex-col', 'gap-1', 'border-none', 'py-8'] as const,

  slots: {
    label: [
      'inline-flex',
      'items-center',
      'gap-1',
      'text-color-content-default',
      'text-xs',
      'uppercase'
    ] as const,
    infoTrigger: [
      'inline-flex',
      'items-center',
      'border-none',
      'bg-background-none',
      'text-color-content-subtle',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2'
    ] as const,
    infoContent: [
      'max-w-xs',
      'rounded-md',
      'bg-color-content-default',
      'p-3',
      'text-sm',
      'shadow-lg'
    ] as const,
    hint: ['text-color-content-subtle', 'text-xs', '-mt-8'] as const,
    // Layout handled by Radix RadioGroup orientation handling.
    radiogroup: ['flex', 'flex-col', 'gap-3'] as const,
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
      'mt-[2px]',
      'border-color-content-weak',
      'bg-background-none',
      'focus:outline-none',
      'disabled:opacity-50',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-4',
      'focus-visible:ring-offset-color-background-default'
    ] as const,
    indicator: ['pointer-events-none', 'block', 'size-2', 'rounded-full', 'bg-color-content-brand'] as const,
    choiceLabel: ['text-color-content-default', 'text-sm', 'select-none'] as const,
    choiceHint: ['text-color-content-subtle', 'text-xs'] as const,
    error: [
      'text-color-content-utility-danger-subtle',
      'text-xs',
      'mt-1',
      'inline-flex',
      'items-start',
      'gap-2',
      'pl-1'
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
