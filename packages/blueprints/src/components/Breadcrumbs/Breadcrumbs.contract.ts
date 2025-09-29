import { defineContract } from '../../utilities';

export const BreadcrumbsContract = defineContract({
  component: 'Breadcrumbs',
  description:
    'Hierarchical navigation trail composed of subtle TextLinks and a current page label. Collapses middle items when long.',

  // Component renders a semantic <nav> landmark containing an ordered list of crumbs.
  base: 'nav',

  props: {
    items: {
      type: 'array',
      // Array of link crumbs (non-final). Final crumb is provided via `current`.
      // Each item must have a non-empty label and href.
      of: {
        type: 'object',
        shape: {
          label: { type: 'string', required: true },
          href: { type: 'string', required: true }
        }
      },
      required: true
    },

    // The current (last) crumb, rendered as text with aria-current="page".
    current: { type: 'string', required: true },

    // Landmark label for the <nav>; defaults to "Breadcrumbs".
    ariaLabel: { type: 'string', default: 'Breadcrumbs' }
  },

  // Structural slots (not user slot props) in render order.
  // Generators will emit data-slot hooks and map classes from the styleMap.
  slots: ['container', 'list', 'item', 'separator', 'ellipsis', 'current'] as const,

  layout: {
    type: 'container',
    tag: 'nav',
    slot: 'container',
    className: '', // layout classes live in the styleMap
    children: [
      {
        tag: 'ol',
        className: '',
        slot: 'list',
        children: [
          // Items repeat at runtime; this layout block is advisory.
          { tag: 'li', slot: 'item' },
          { tag: 'li', slot: 'separator' },
          { tag: 'li', slot: 'ellipsis' },
          { tag: 'li', slot: 'current' }
        ]
      }
    ]
  },

  rules: [
    {
      validate: ({ items, current }) =>
        Array.isArray(items) &&
        items.every(
          (it: any) =>
            it &&
            typeof it.label === 'string' &&
            it.label.trim().length > 0 &&
            typeof it.href === 'string' &&
            it.href.trim().length > 0
        ) &&
        typeof current === 'string' &&
        current.trim().length > 0,
      message: 'items[].label/href and current must be non-empty strings'
    },
    {
      hint: 'Render semantics: <nav aria-label={ariaLabel}><ol>…</ol></nav>. Non-final crumbs render as TextLink variant="subtle" separated by ChevronRightIcon. Final crumb renders as text with aria-current="page".'
    },
    {
      hint: 'If items.length >= 5, render: first link → separator → MoreHorizIcon → separator → current (collapse middle crumbs).'
    }
  ],

  styleMap: true
});
