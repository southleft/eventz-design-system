// packages/blueprints/src/components/Scroller/Scroller.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'Scroller',
  base: 'div',
  styleMap: true,

  props: {
    showControls: {
      type: 'boolean',
      default: true,
      description: 'Render integrated prev/next Controls (bottom-right).'
    },
    stackRows: {
      type: 'boolean',
      default: false,
      description: 'When true, internal rail stacks child rows vertically (flex-col). Use with ScrollerRow compositions.'
    },
    pageBy: {
      type: 'enum',
      options: ['viewport', 'fixed'] as const,
      default: 'viewport',
      description: 'Paging step: viewport width or a fixed pixel amount.'
    },
    pageSize: {
      type: 'number',
      default: 320,
      description: 'When pageBy="fixed", pixels to scroll per click. Ignored for pageBy="viewport".'
    },
    onScrollChange: {
      type: 'callback',
      args: ['metrics: { left: number; width: number; viewport: number; atStart: boolean; atEnd: boolean }'] as const,
      description: '(metrics) => void — fires once on mount and when scroll position or edges change.'
    }
  },

  // Base is a non-scroll wrapper. `_viewport` is the horizontal scroll container.
  // `_controls` is a sibling below the viewport.
  slots: ['viewport', 'rail', 'controls'] as const,

  hints: {
    a11y: [
      'No role/region; unlabeled by design.',
      'Controls: two icon-only Control buttons beneath the viewport (right-aligned). Controls live outside the scroll viewport so they never scroll with content. Left=ArrowBackIcon; Right=ArrowForwardIcon. Never disabled. Variant="light" at edges; "brand" when paging possible; size="sm"; aria-label strings: "Scroll left" / "Scroll right".',
      'Manual paging only: element.scrollBy({ left: ±step, behavior: "auto" }), where step = (pageBy==="viewport" ? viewport.clientWidth : pageSize).',
      'When stackRows=true, set data-stack-rows="true" on `_rail` (styleMap encodes data-[stack-rows=true]:flex-col).',
      'LTR only; ignore RTL.',
      'State flags (on base): [isScrolling], [isAtStart], [isAtEnd], [hasControls].',
      'Focus rings live on Control buttons; none on base/viewport.',
      'Viewport MUST hide native scrollbars while remaining scrollable.'
    ].join(' ')
  }
});
