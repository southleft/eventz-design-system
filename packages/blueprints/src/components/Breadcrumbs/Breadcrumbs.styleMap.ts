import { defineStyleMap } from '../../utilities';

export const BreadcrumbsStyleMap = defineStyleMap({
  // Keep root minimal; main layout lives on the list by default.
  base: [] as const,

  slots: {
    // Root <nav> wrapper classes can remain empty; consumers may override via className.
    container: [] as const,

    // <ol> that visually lays out the crumbs
    list: ['flex', 'gap-8', 'list-none'] as const,

    // <li> around each TextLink crumb
    item: [] as const,

    // <li> wrapper for ChevronRightIcon
    separator: ['shrink-0'] as const,

    // <li> wrapper for MoreHorizIcon (when collapsed)
    ellipsis: ['shrink-0', 'pt-1'] as const,

    // <li> content for the current page (non-link)
    current: ['text-sm', 'font-bold', 'text-color-content-default'] as const
  },

  // No variants in v1; TextLink variants are configured within that component.
  variants: {},

  // No extra state in v1.
  state: {}
});
