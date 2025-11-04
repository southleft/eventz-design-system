// packages/blueprints/src/components/Carousel/Carousel.contract.ts
import { defineContract } from '../../utilities';

export default defineContract({
  component: 'Carousel',
  base: 'div',
  styleMap: true,

  // Provider = behavior & a11y only. Indicators are integrated (single placement & style).
  props: {
    // Region naming (prefer visible label when present)
    ariaLabel: {
      type: 'string',
      description: 'Named region label for screen readers. Default: "Carousel".'
    },
    ariaLabelledBy: {
      type: 'string',
      description: 'ID of a visible heading that labels the carousel region.'
    },

    // Index control
    defaultIndex: {
      type: 'number',
      description: 'Initial slide index for uncontrolled usage. Default: 0.'
    },
    currentIndex: {
      type: 'number',
      description: 'Controlled current slide index.'
    },
    onChange: {
      type: 'callback',
      args: ['index: number'] as const,
      description: '(index: number) => void — fires when the current index changes.'
    },

    // Physics
    loop: {
      type: 'boolean',
      description: 'Enable wrap-around navigation. Default: false.'
    },
    align: {
      type: 'enum',
      options: ['start', 'center', 'end'] as const,
      default: 'center',
      description: 'Where a slide snaps after drag.'
    },

    // Visibility set hook (analytics/lazy-load)
    onInViewChange: {
      type: 'callback',
      args: ['indices: number[]'] as const,
      description: '(indices: number[]) => void — fires when the set of slides in view changes.'
    },

    // Integrated chrome (fixed placement & style)
    showIndicators: {
      type: 'boolean',
      description: 'Render the built-in indicators (bottom, single style). Default: true.'
    }
  },

  // Base acts as Embla viewport/root; we expose only the track and indicators slots.
  slots: ['container', 'indicators'] as const,

  hints: {
    a11y: [
      // ---------- Region naming ----------
      'Base element is the Embla viewport/root (overflow hidden; touch pan-y). Provide an accessible name via aria-label or aria-labelledby. Do not trap focus.',
      // ---------- Indicators (Option A: plain buttons) ----------
      'Indicators are a simple list of <button> elements at the bottom. Each button is tabbable by default; Enter/Space activates and calls goTo(index). Set aria-current="true" on the active indicator and include an SR-only label like "Go to slide X of Y". No Arrow-key roving or Home/End behavior in v1.',
      // ---------- Embla integration (do not roll your own) ----------
      'Mount Embla on the base viewport and use its API exclusively — do not implement custom transforms/drag/scroll logic. Use embla.scrollPrev(), embla.scrollNext(), and embla.scrollTo(index) for navigation; use embla.canScrollPrev()/canScrollNext() for availability; derive count from embla.scrollSnapList().length and currentIndex from embla.selectedScrollSnap(). Listen to embla events: init, reInit, select, slidesInView, pointerDown, pointerUp, settle. Maintain a Set of embla.slidesInView() and call onInViewChange(indices) only when it changes.',
      // ---------- Context API (backed by Embla) ----------
      'Expose context backed by Embla: { currentIndex, count, canPrev, canNext, prev(), next(), goTo(i), isSelected(i), isInView(i) }. prev() calls embla.scrollPrev(); next() calls embla.scrollNext(); goTo(i) calls embla.scrollTo(i).',
      // ---------- Behavioral → class state mapping (styleMap) ----------
      'Toggle style state classes based on runtime: [isDragging] true on pointerDown; false on pointerUp/settle. [isAtStart]=(!loop && !embla.canScrollPrev()). [isAtEnd]=(!loop && !embla.canScrollNext()). [rtl]=(document.dir==="rtl"). [hasIndicators]=(showIndicators).',
      // ---------- Focus treatment ----------
      'Focus-visible rings are handled on interactive elements (indicator buttons). Do not apply or override focus rings on the root provider.'
    ].join(' ')
  }
});
