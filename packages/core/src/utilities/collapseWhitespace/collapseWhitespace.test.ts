// packages/core/src/utilities/collapseWhitespace/collapseWhitespace.test.ts
import { collapseWhitespace } from './collapseWhitespace';

describe('collapseWhitespace', () => {
  const cases: Array<[string, string, string]> = [
    ['removes leading and trailing whitespace', '   hello world   ', 'hello world'],
    ['collapses multiple spaces between words', 'hello    world', 'hello world'],
    ['collapses tabs into a single space', 'hello\t\tworld', 'hello world'],
    ['collapses newlines into a single space', 'hello\n\nworld', 'hello world'],
    ['collapses mixed whitespace into a single space', ' hello \t\n  world ', 'hello world'],
    ['returns an empty string for input that is only whitespace', '   \t\n   ', ''],
    ['returns the same string if no extra whitespace', 'hello world', 'hello world']
  ];

  it.each(cases)('%s', (_description, input, expected) => {
    expect(collapseWhitespace(input)).toBe(expected);
  });
});
