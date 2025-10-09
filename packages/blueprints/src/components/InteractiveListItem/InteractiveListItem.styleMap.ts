import { defineStyleMap } from '../../utilities/defineStyleMap';

export default defineStyleMap({
  base: [
    'group',
    'flex',
    'justify-between',
    'gap-8',
    'w-full',
    'outline-none',
    'pb-10',
    'pl-8',
    'pt-8',
    'pr-8',
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
    container: 'flex items-center gap-8 w-full',

    image: [
      'h-40',
      'w-40',
      'rounded-full',
      // visible only when removable
      'group-data-[is-removable=true]:inline-flex',
      'group-data-[is-removable=false]:hidden'
    ].join(' '),

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
      'text-color-content-weak',
      // hidden when removable
      'group-data-[is-removable=true]:hidden',
      'group-data-[is-removable=false]:inline-flex'
    ].join(' '),

    highlightText: [
      'text-sm',
      'text-left',
      'truncate',
      'whitespace-nowrap',
      'text-color-content-brand',
      // hidden when removable
      'group-data-[is-removable=true]:hidden',
      'group-data-[is-removable=false]:inline-flex'
    ].join(' '),

    nonRemovableWrapper: 'flex flex-col',

    trailingIcon: 'shrink-0'
  }
});
