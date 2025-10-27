import { defineStyleMap } from '../../utilities';

const ContentCardStyleMap = defineStyleMap({
  component: 'ContentCard',

  base: [
    // Container scaffold (token-first)
    'relative',
    'flex',
    'flex-col',
    'gap-3',
    'p-4',
    'rounded-xl',
    'border',
    'bg-surface',
    'shadow-sm',
    'outline-none',
    'transition-colors',

    // Focus ring (only when the root has data-is-focusable="true")
    'data-[is-focusable=true]:focus-visible:ring-2',
    'data-[is-focusable=true]:focus-visible:ring-offset-4',
    'data-[is-focusable=true]:focus-visible:ring-comp-border-focus-ring',
    'data-[is-focusable=true]:focus-visible:ring-offset-color-background-default'
  ] as const,

  // Flat variant keys (selected by the `layout` prop)
  variants: {
    vertical: ['flex-col'] as const,
    horizontal: ['flex-row', 'items-stretch', 'gap-4'] as const,
    post: ['flex-col'] as const
  },

  // No explicit "focused" state — focus is handled by data-attribute gating above.
  state: {},

  // Only contract slots (mirrors ContentCard.contract.ts):
  slots: {
    media: ['w-full', 'overflow-clip', 'rounded-t-xl'] as const,
    badge: ['mt-1', 'text-xs', 'font-medium', 'text-muted-foreground'] as const,
    meta: ['text-xs', 'text-muted-foreground'] as const,
    actions: ['mt-2', 'flex', 'items-center', 'gap-2', 'pt-2', 'border-t'] as const
  }
});

export default ContentCardStyleMap;
