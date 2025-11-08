// packages/blueprints/src/components/Visibility/Visibility.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const VisibilityStyleMap = defineStyleMap({
  base: [] as const,

  slots: {
    container: [] as const
  },

  // State toggles are composed to realize:
  // - from="lg"      → baselineInvisible + fromLg
  // - to="xl"        → baselineVisible   + toXl
  // - from="md",to="xl" → baselineInvisible + fromMd + toXl
  state: {
    // Baselines (choose exactly one depending on presence of `from`)
    baselineVisible: ['visible'] as const,
    baselineInvisible: ['invisible'] as const,

    // Lower bound (makes visible at and above the breakpoint)
    fromSm: ['sm:visible'] as const,
    fromMd: ['md:visible'] as const,
    fromLg: ['lg:visible'] as const,
    fromXl: ['xl:visible'] as const,
    from2xl: ['2xl:visible'] as const,

    // Upper bound (makes invisible at and above the breakpoint)
    toSm: ['sm:invisible'] as const,
    toMd: ['md:invisible'] as const,
    toLg: ['lg:invisible'] as const,
    toXl: ['xl:invisible'] as const,
    to2xl: ['2xl:invisible'] as const
  }
});
