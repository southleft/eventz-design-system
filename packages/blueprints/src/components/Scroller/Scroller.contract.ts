// packages/blueprints/src/components/Scroller/Scroller.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'Scroller',
  base: 'div',
  styleMap: true,

  // Native overflow-x scroller with integrated Controls (prev/next).
  // No indicators in Scroller; those belong to Carousel.
  props: {
    // Controls (always bottom-right in design)
    showControls: {
      type: 'boolean',
      default: true,
      description: 'Render integrated prev/next Controls (bottom-right).'
    },

    // Layout: stack multiple ScrollerRow children vertically
    stackRows: {
      type: 'boolean',
      default: false,
      description:
        'When true, the internal rail stacks child rows vertically (flex-col). Use with ScrollerRow compositions.'
    },

    // Paging model: by viewport width or fixed pixels (manual only)
    pageBy: {
      type: 'enum',
      options: ['viewport', 'fixed'] as const,
      default: 'viewport',
      description: 'Paging step: viewport width or a fixed pixel amount.'
    },
    pageSize: {
      type: 'number',
      default: 320,
      description:
        'When pageBy="fixed", the number of pixels to scroll per click. Ignored for pageBy="viewport".'
    },

    // Scroll telemetry
    onScrollChange: {
      type: 'callback',
      args: [
        'metrics: { left: number; width: number; viewport: number; atStart: boolean; atEnd: boolean }'
      ] as const,
      description: '(metrics) => void — fires when scroll position changes or edges toggle.'
    }
  },

  // Base acts as the scroll viewport; rail holds consumer content (rows/items).
  slots: ['rail', 'controls'] as const,

  hints: {
    a11y: [
      // ---------- Region semantics ----------
      'Do NOT set role="region" and do NOT add aria labels. The Scroller is unlabeled by design.',
      // ---------- Integrated Controls ----------
      'When showControls=true, render two icon-only Control buttons beneath the rail in a right-aligned row (the `_controls` slot uses "flex gap-2 justify-end"). Left = ArrowBackIcon; Right = ArrowForward`Icon. Controls are NOT disabled; instead, set Control variant="light" at edges and "brand" when paging is possible. Controls are size="sm" and must include non-empty aria-labels (e.g., "Scroll left", "Scroll right").',
      // ---------- Paging behavior (manual only) ----------
      'Prev/Next perform element.scrollBy({ left: ±step, behavior: "auto" }), where step = (pageBy==="viewport" ? base.clientWidth : pageSize). Do NOT implement smooth scrolling or autoplay. Desktop is expected to scroll via Controls (or wheel/trackpad); mobile supports native swipe.',
      // ---------- Layout: stacked rows ----------
      'When stackRows=true, set `data-stack-rows="true"` on the `_rail` slot; the styleMap encodes `data-[stack-rows=true]:flex-col` so the rows stack vertically. Default is horizontal row flow.',
      // ---------- Direction ----------
      'LTR only in this phase. Ignore RTL concerns; do not add direction toggles.',
      // ---------- State flags → styleMap ----------
      'Toggle class-state flags: [isScrolling] during wheel/drag/keyboard-initiated motion; [isAtStart] when scrollLeft<=0 (with tolerance); [isAtEnd] when scrollLeft+clientWidth>=scrollWidth (tolerance); [hasControls] when showControls.',
      // ---------- Focus treatment ----------
      'Focus-visible rings live on the Control buttons. Do not add focus ring to the base scroller.'
    ].join(' ')
  }
});
