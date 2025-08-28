import { defineStyleMap } from './defineStyleMap';

describe('defineStyleMap', () => {
  it('returns the input object without modification', () => {
    const input = {
      base: 'text-sm',
      variant: {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500'
      }
    };

    const result = defineStyleMap(input);
    expect(result).toBe(input);
  });

  it('preserves type information on the returned object', () => {
    const map = defineStyleMap({
      size: {
        small: 'text-sm',
        large: 'text-lg'
      }
    });

    // Type inference test — will fail type check if incorrect
    const sizeClass: string = map.size.small;
    expect(sizeClass).toBe('text-sm');
  });
});
