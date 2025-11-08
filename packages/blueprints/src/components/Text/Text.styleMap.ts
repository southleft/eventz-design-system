import { defineStyleMap } from '../../utilities';

export const TextStyleMap = defineStyleMap({
  // No base classes; semantics only
  base: [] as const,

  slots: {
    container: [] as const
  },

  // Encode per-axis values with stable keys to avoid collisions.
  // `inherit` values intentionally have no entries (no class applied).
  variants: {
    // Size
    'size:xs': ['text-xs'] as const,
    'size:sm': ['text-sm'] as const,
    'size:base': ['text-base'] as const,
    'size:lg': ['text-lg'] as const,
    'size:xl': ['text-xl'] as const,
    'size:2xl': ['text-2xl'] as const,
    'size:3xl': ['text-3xl'] as const,
    'size:4xl': ['text-4xl'] as const,
    'size:5xl': ['text-5xl'] as const,
    'size:6xl': ['text-6xl'] as const,
    'size:7xl': ['text-7xl'] as const,
    'size:8xl': ['text-8xl'] as const,

    // Weight
    'weight:thin': ['font-thin'] as const,
    'weight:extra-light': ['font-extralight'] as const,
    'weight:light': ['font-light'] as const,
    'weight:normal': ['font-normal'] as const,
    'weight:medium': ['font-medium'] as const,
    'weight:semi-bold': ['font-semibold'] as const,
    'weight:bold': ['font-bold'] as const,
    'weight:extra-bold': ['font-extrabold'] as const,
    'weight:black': ['font-black'] as const,

    // Align
    'align:left': ['text-left'] as const,
    'align:center': ['text-center'] as const,
    'align:right': ['text-right'] as const,
    'align:justify': ['text-justify'] as const,

    // Color (content)
    'color:default': ['text-color-content-default'] as const,
    'color:brand': ['text-color-content-brand'] as const,
    'color:weak': ['text-color-content-weak'] as const,
    'color:inverse': ['text-color-content-inverse'] as const,
    'color:subtle': ['text-color-content-subtle'] as const,

    // Color (utility/status)
    'color:danger-strong': ['text-color-content-utility-danger-strong'] as const,
    'color:danger-subtle': ['text-color-content-utility-danger-subtle'] as const,
    'color:warning-strong': ['text-color-content-utility-warning-strong'] as const,
    'color:warning-subtle': ['text-color-content-utility-warning-subtle'] as const,
    'color:success-strong': ['text-color-content-utility-success-strong'] as const,
    'color:success-subtle': ['text-color-content-utility-success-subtle'] as const,
    'color:info-strong': ['text-color-content-utility-info-strong'] as const,
    'color:info-subtle': ['text-color-content-utility-info-subtle'] as const,

    // Transform
    'transform:normal': ['normal-case'] as const,
    'transform:uppercase': ['uppercase'] as const,
    'transform:lowercase': ['lowercase'] as const,
    'transform:capitalize': ['capitalize'] as const
  },

  state: {
    truncate: ['truncate'] as const,
    italic: ['italic'] as const
  }
});
