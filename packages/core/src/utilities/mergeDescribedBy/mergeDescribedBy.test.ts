// packages/core/src/utilities/mergeDescribedBy/mergeDescribedBy.test.ts
import { mergeDescribedBy } from './mergeDescribedBy';

describe('mergeDescribedBy', () => {
  it('returns addition when existing is empty', () => {
    expect(mergeDescribedBy(undefined, 'hint')).toBe('hint');
  });

  it('returns existing when addition is empty', () => {
    expect(mergeDescribedBy('ext', undefined)).toBe('ext');
  });

  it('merges without duplicates', () => {
    expect(mergeDescribedBy('ext', 'hint')).toBe('ext hint');
  });

  it('dedupes when existing already contains addition', () => {
    expect(mergeDescribedBy('ext hint', 'hint')).toBe('ext hint');
  });

  it('splits whitespace correctly', () => {
    expect(mergeDescribedBy('a   b', 'c')).toBe('a b c');
  });

  it('accepts multiple additions', () => {
    expect(mergeDescribedBy('a', ['b', 'c'])).toBe('a b c');
  });
});

it('returns undefined when both existing and addition are empty strings', () => {
  expect(mergeDescribedBy('', '')).toBeUndefined();
});

it('returns undefined when addition is an empty array and existing is undefined', () => {
  expect(mergeDescribedBy(undefined, [])).toBeUndefined();
});

it('treats whitespace-only existing as absent', () => {
  expect(mergeDescribedBy('   ', undefined)).toBeUndefined();
});

it('treats whitespace-only addition as absent', () => {
  expect(mergeDescribedBy(undefined, '   ')).toBeUndefined();
});

it('ignores whitespace-only tokens inside array additions', () => {
  expect(mergeDescribedBy('ext', ['   ', 'a', '  '])).toBe('ext a');
});

it('preserves insertion order when merging existing then array additions with duplicates', () => {
  expect(mergeDescribedBy('x', ['x', 'y'])).toBe('x y');
});

it('returns undefined when both existing and addition are undefined (no tokens collected)', () => {
  expect(mergeDescribedBy(undefined, undefined)).toBeUndefined();
});

it('returns undefined when existing is whitespace and addition is an empty array (no tokens collected)', () => {
  expect(mergeDescribedBy('   ', [])).toBeUndefined();
});
