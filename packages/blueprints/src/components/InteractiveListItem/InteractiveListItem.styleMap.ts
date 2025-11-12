import { defineStyleMap } from '../../utilities/defineStyleMap';

export default defineStyleMap({
  // Shared root tokens for both button and anchor renders.
  base: [
    'group',
    'flex',
    'justify-between',
    'data-[is-removable=true]:items-center',
    'gap-2',
    'w-full',
    'outline-none',
    'no-underline',
    'pb-2.5',
    'pl-2',
    'pt-2',
    'pr-2',
    'bg-background-none',
    'border-l-0',
    'border-r-0',
    'border-b-0',
    'border-t-0',
    // focus ring tokens
    'focus-visible:ring-2',
    'focus-visible:ring-offset-4',
    'focus-visible:ring-comp-border-focus-ring',
    'focus-visible:ring-offset-color-background-default',
    // divider (driven by data attribute)
    'data-[border-bottom=true]:border-b',
    'data-[border-bottom=true]:border-b-color-border-subtle'
  ].join(' '),

  slots: {
    container: ['flex', 'items-center', 'gap-2', 'w-full'].join(' '),

    image: ['h-10', 'w-10', 'rounded-full', 'bg-color-background-brand', 'shrink-0'].join(' '),

    title: [
      'text-base',
      'lg:text-lg',
      'font-bold',
      'text-left',
      'truncate',
      'whitespace-nowrap',
      'text-color-content-default',
      'group-hover:text-color-content-default-hover'
    ].join(' '),

    supportingText: [
      'text-sm',
      'text-left',
      'truncate',
      'whitespace-nowrap',
      'text-color-content-weak'
    ].join(' '),

    highlightText: [
      'text-sm',
      'text-left',
      'truncate',
      'whitespace-nowrap',
      'text-color-content-brand'
    ].join(' '),

    nonRemovableWrapper: ['flex', 'flex-col', 'min-w-0', 'flex-1'].join(' '),

    trailingIcon: ['shrink-0', 'text-color-content-default', 'h-5', 'w-5'].join(' ')
  }
});
