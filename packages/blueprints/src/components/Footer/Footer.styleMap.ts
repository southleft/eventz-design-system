// packages/blueprints/src/components/Footer/Footer.styleMap.ts
import { defineStyleMap } from '../../utilities';

export const FooterStyleMap = defineStyleMap({
  // Single-purpose utility that applies the footer gradient background.
  base: ['background-footer'] as const,

  // Structural layout (if any) belongs here; this wrapper has none by default.
  slots: {
    container: [] as const
  }
});
