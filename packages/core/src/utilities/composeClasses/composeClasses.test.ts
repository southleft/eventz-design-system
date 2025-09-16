// packages/core/src/utilities/composeClasses/composeClasses.test.ts
import { composeClasses } from './composeClasses';
import type { ClassInput } from './composeClasses';

describe('composeClasses', () => {
  describe('empty & falsy handling', () => {
    it('returns empty string for only falsy inputs', () => {
      const out = composeClasses(null, undefined, false, '', [] as const, {});
      expect(out).toBe('');
    });

    it('ignores empty strings in inputs', () => {
      const out = composeClasses('a', '', 'b');
      expect(out).toBe('a b');
    });
  });

  describe('strings', () => {
    it('joins multiple strings with spaces', () => {
      const out = composeClasses('a', 'b', 'c');
      expect(out).toBe('a b c');
    });
  });

  describe('arrays', () => {
    it('joins an array of strings', () => {
      const out = composeClasses(['a', 'b', 'c']);
      expect(out).toBe('a b c');
    });

    it('joins a readonly array of strings', () => {
      const arr = ['a', 'b'] as const;
      const out = composeClasses(arr);
      expect(out).toBe('a b');
    });

    it('skips falsy/empty items inside arrays', () => {
      const out = composeClasses(['a', '', 'b', undefined as unknown as string]);
      expect(out).toBe('a b');
    });
  });

  describe('object (conditional map)', () => {
    it('includes keys with truthy values', () => {
      const out = composeClasses({ a: true, b: false, c: 1 as unknown as boolean });
      expect(out).toBe('a c');
    });

    it('excludes inherited prototype keys', () => {
      // Create an object with an own key and attach a prototype that has an enumerable key.
      const obj: Record<string, boolean> = { safe: true };
      const proto: Record<string, boolean> = { evil: true };
      Object.setPrototypeOf(obj, proto);
      const out = composeClasses(obj);
      expect(out).toBe('safe');
    });
  });

  describe('mixed inputs', () => {
    it.each<Readonly<{ in: ClassInput[]; out: string }>>([
      { in: ['a', ['b'] as readonly string[], { c: true }], out: 'a b c' },
      { in: [['x', 'y'] as readonly string[], { z: true }], out: 'x y z' },
      { in: ['p', null, undefined, false, { q: true }], out: 'p q' },
      { in: ['a', ['b', ''] as readonly string[], { c: false, d: true }], out: 'a b d' }
    ])('composes mixed forms %#', ({ in: args, out }) => {
      const result = composeClasses(...args);
      expect(result).toBe(out);
    });
  });

  describe('ordering & duplication', () => {
    it('preserves input order', () => {
      const out = composeClasses('one', ['two'], { three: true });
      expect(out).toBe('one two three');
    });

    it('does not de-duplicate by default', () => {
      const out = composeClasses('a', ['a'], { a: true });
      expect(out).toBe('a a a');
    });
  });

  describe('referential transparency', () => {
    it('same inputs yield identical output', () => {
      const args = ['a', ['b'], { c: true }] as const;
      const r1 = composeClasses(...args);
      const r2 = composeClasses(...args);
      expect(r1).toBe(r2);
    });
  });

  describe('object branch edge cases', () => {
    it('treats an empty map object as a no-op', () => {
      const out = composeClasses('a', {} as Record<string, boolean | null | undefined>, 'b');
      expect(out).toBe('a b');
    });

    it('ignores keys whose values are falsy (false | null | undefined)', () => {
      const map: Record<string, boolean | null | undefined> = {
        off: false,
        nada: null,
        nope: undefined
      };
      const out = composeClasses('base', map);
      expect(out).toBe('base');
    });
  });

  describe('defensive inputs (non-union types cast in)', () => {
    it('ignores non-object, non-array, non-string values', () => {
      // Force a number through the type system to hit the guard false branch
      const out = composeClasses('base', 123 as unknown as ClassInput);
      expect(out).toBe('base');
    });

    it('handles object-like instances with no own enumerable keys', () => {
      const out = composeClasses('base', new Date() as unknown as ClassInput);
      expect(out).toBe('base');
    });
  });
});
