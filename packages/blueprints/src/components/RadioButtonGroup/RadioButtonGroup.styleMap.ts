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
    radiogroup: ['flex', 'flex-col', 'gap-2'] as const,
    choices: ['flex', 'flex-col', 'gap-2'] as const,
    choice: ['inline-flex', 'items-center', 'gap-2'] as const,
    control: [
      'relative',
      'inline-flex',
      'items-center',
      'justify-center',
      'size-4',
      'shrink-0',
      'rounded-full',
      'border',
      'border-color-border-default',
      'bg-background-default',
      'focus:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-comp-border-focus-ring',
      'focus-visible:ring-offset-2'
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
    disabled: [
      'data-[disabled=true]:[&_[data-slot=label]]:text-color-content-subtle',
      'data-[disabled=true]:[&_[data-slot=choiceLabel]]:text-color-content-subtle',
      'data-[disabled=true]:[&_[data-slot=choiceHint]]:text-color-content-subtle',
      'data-[disabled=true]:[&_[data-slot=hint]]:text-color-content-subtle',
      'data-[disabled=true]:[&_[data-slot=control]]:cursor-not-allowed',
      'data-[disabled=true]:[&_[data-slot=control]]:pointer-events-none',
      'data-[disabled=true]:[&_[data-slot=control]]:opacity-60'
    ] as const,
    orientationHorizontal: [
      'data-[orientation-horizontal=true]:[&_[data-slot=radiogroup]]:flex-row',
      'data-[orientation-horizontal=true]:[&_[data-slot=radiogroup]]:flex-wrap',
      'data-[orientation-horizontal=true]:[&_[data-slot=radiogroup]]:gap-x-4',
      'data-[orientation-horizontal=true]:[&_[data-slot=radiogroup]]:gap-y-2',
      'data-[orientation-horizontal=true]:[&_[data-slot=choices]]:flex-row',
      'data-[orientation-horizontal=true]:[&_[data-slot=choices]]:flex-wrap',
      'data-[orientation-horizontal=true]:[&_[data-slot=choices]]:gap-x-4',
      'data-[orientation-horizontal=true]:[&_[data-slot=choices]]:gap-y-2'
    ] as const,
    hasError: [
      // TODO: verify final danger border token during component styling QA.
      'data-[has-error=true]:[&_[data-slot=control]]:border-color-border-utility-danger-subtle'
    ] as const
  }
});
