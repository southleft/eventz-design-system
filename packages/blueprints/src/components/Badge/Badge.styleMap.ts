import { defineStyleMap } from '../../utilities';

export const BadgeStyleMap = defineStyleMap({
  base: 'inline-flex items-center rounded-sm px-1.5 py-0.5 text-caption-lg-allcaps-bold',
  variants: {
    variant: {
      purple: 'bg-gradient-purple',
      blue: 'bg-gradient-blue',
      pink: 'bg-gradient-pink',
      brand: 'bg-brand-500',
      orange: 'bg-gradient-orange'
    }
  }
});
