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
      default: 0,
      description: 'Initial slide index for uncontrolled usage.'
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
      default: false,
      description: 'Enable wrap-around navigation.'
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
      default: true,
      description: 'Render the built-in indicators (bottom, single style).'
    },

    // Autoplay (Embla Autoplay plugin — do NOT roll your own timers)
    autoPlay: {
      type: 'boolean',
      default: false,
      description: 'Enable slide auto-advance using the Embla Autoplay plugin.'
    },
    autoPlayDelay: {
      type: 'number',
      default: 4000,
      description: 'Delay in milliseconds between automatic advances when autoPlay is true.'
    },
    autoPlayPauseOnInteraction: {
      type: 'boolean',
      default: true,
      description: 'Pause autoplay on user drag/click/focus (maps to plugin stopOnInteraction).'
    },
    autoPlayPauseOnHover: {
      type: 'boolean',
      default: true,
      description:
        'Pause autoplay on pointer hover over the carousel (maps to plugin stopOnMouseEnter).'
    },
    autoPlayPauseOnFocus: {
      type: 'boolean',
      default: true,
      description:
        'Pause autoplay when focus is inside the carousel (maps to plugin stopOnFocusIn).'
    },
    autoPlayStopOnLast: {
      type: 'boolean',
      default: false,
      description:
        'When loop=false, stop autoplay on the last snap (maps to plugin stopOnLastSnap).'
    },
    respectReducedMotion: {
      type: 'boolean',
      default: true,
      description: 'If prefers-reduced-motion is set, autoplay will not start unless this is false.'
    },
    onAutoPlayChange: {
      type: 'callback',
      args: ['playing: boolean'] as const,
      description:
        '(playing: boolean) => void — fires whenever autoplay starts or stops (plugin events and manual play/stop).'
    }
  },

  // Base acts as Embla viewport/root; expose Embla track, slide wrapper, indicator rail, and indicator button slots.
  slots: ['_container', '_slide', '_indicators', '_indicator'] as const,

  hints: {
    a11y: [
      // ---------- Region naming ----------
      'Base element is the Embla viewport/root (overflow hidden; touch pan-y). Provide an accessible name via aria-label or aria-labelledby. Do not trap focus.',
      // ---------- Indicators (Option A: plain buttons) ----------
      'Indicators are a simple list of <button> elements at the bottom. Each button is tabbable by default; Enter/Space activates and calls goTo(index). Set aria-current="true" on the active indicator and include an SR-only label like "Go to slide X of Y". No Arrow-key roving or Home/End behavior in v1.',
      // ---------- Embla integration (do not roll your own) ----------
      'Mount Embla on the base viewport and use its API exclusively — do not implement custom transforms/drag/scroll logic. Use embla.scrollPrev(), embla.scrollNext(), and embla.scrollTo(index) for navigation; use embla.canScrollPrev()/canScrollNext() for availability; derive count from embla.scrollSnapList().length and currentIndex from embla.selectedScrollSnap(). Listen to embla events: init, reInit, select, slidesInView, pointerDown, pointerUp, settle. Maintain a Set of embla.slidesInView() and call onInViewChange(indices) only when it changes. Each direct child slide is a provider-owned wrapper element that receives data-is-in-view on the incoming slide during drag and on the active slide when settled; children are treated as opaque (RSC-safe).',
      // ---------- Context API (backed by Embla) ----------
      'Expose context backed by Embla: { currentIndex, count, canPrev, canNext, prev(), next(), goTo(i), isSelected(i), isInView(i), autoPlay?: { isPlaying: boolean; play(): void; stop(): void } }. prev() calls embla.scrollPrev(); next() calls embla.scrollNext(); goTo(i) calls embla.scrollTo(i).',
      // ---------- Autoplay (plugin-backed) ----------
      'When autoPlay=true, instantiate the Embla Autoplay plugin with { delay: autoPlayDelay, stopOnInteraction: autoPlayPauseOnInteraction, stopOnMouseEnter: autoPlayPauseOnHover, stopOnFocusIn: autoPlayPauseOnFocus, stopOnLastSnap: autoPlayStopOnLast }. Respect prefers-reduced-motion by default (respectReducedMotion=true) by not starting autoplay automatically when the media query matches; allow override when false. Wire plugin events "autoplay:play"/"autoplay:stop" to onAutoPlayChange(true/false). If context exposes autoPlay.play() / autoPlay.stop(), ensure those also call onAutoPlayChange.',
      // ---------- Behavioral → class state mapping (styleMap) ----------
      'Toggle style state classes based on runtime: [isDragging] true on pointerDown; false on pointerUp/settle. [isAtStart]=(!loop && !embla.canScrollPrev()). [isAtEnd]=(!loop && !embla.canScrollNext()). [rtl]=(document.dir==="rtl"). [hasIndicators]=(showIndicators). [isAutoPlaying]=(autoplay plugin is currently playing).',
      // ---------- Focus treatment ----------
      'Focus-visible rings are handled on interactive elements (indicator buttons). Do not apply or override focus rings on the root provider.'
    ].join(' ')
  }
});
