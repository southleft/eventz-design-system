import { defineStyleMap } from '../../utilities';

export const BadgeStyleMap = defineStyleMap({
  base: 'inline-flex items-center rounded-full text-label-sm font-medium px-2.5 py-1',
  variants: {
    variant: {
      purple: 'bg-purple-500 text-white',
      blue: 'bg-blue-500 text-white',
      pink: 'bg-pink-500 text-white',
      brand: 'bg-brand-500 text-white',
      orange: 'bg-orange-500 text-white'
    }
  }
});
