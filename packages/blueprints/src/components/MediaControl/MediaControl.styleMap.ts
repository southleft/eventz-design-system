// packages/blueprints/src/components/MediaControl/MediaControl.styleMap.ts
import { defineStyleMap } from '../../utilities';

export default defineStyleMap({
  component: 'MediaControl',

  // Root inherits layout, focus, hover, and disabled visuals from Control.
  base: [],

  // Slot classes. `_icon` mirrors Control’s icon slot convention (aria-hidden at runtime).
  slots: {
    container: [],
    _icon: []
  },

  // Forwarded variant parity with Control; no extra visuals added here.
  variants: {
    brand: [],
    dark: [],
    light: []
  },

  // State hooks. Generators/runtime can toggle these based on the component's state.
  // Apply brand content color to the icon ONLY when playing.
  state: {
    // Scope the color to the inner icon slot without affecting container text color:
    // Target a descendant with the `_icon` slot class.
    playing: ['[&_[data-slot=\\"_icon\\"]]:text-color-content-brand'],
    paused: []
  }
});
