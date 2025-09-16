// packages/core/src/utilities/composeClasses/composeClasses.ts

export type ClassInput =
  | string
  | null
  | undefined
  | false
  | readonly string[]
  | Record<string, boolean | null | undefined>;

/** Narrow unknown to a conditional map used for object-form class inputs. */
function isConditionalMap(v: unknown): v is Record<string, boolean | null | undefined> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Safe own-key check without relying on object prototypes. */
function hasOwn(obj: object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/** Push keys from an object-form map where the value is truthy. */
function pushTruthyKeys(rec: Record<string, boolean | null | undefined>, out: string[]): void {
  // for-in over own keys only; include key iff value is truthy
  for (const key in rec) {
    if (hasOwn(rec, key) && rec[key]) {
      out.push(key);
    }
  }
}

/**
 * Join strings, arrays, and conditional maps into one class string.
 * - Falsy values (null/undefined/false/empty strings) are ignored.
 * - Arrays are treated as lists of class names.
 * - Object form includes a key only when its value is truthy.
 */
/* @__PURE__ */
export function composeClasses(...parts: ClassInput[]): string {
  const out: string[] = [];

  for (const part of parts) {
    if (!part) continue;

    // Direct string (non-empty guaranteed by the truthy guard above)
    if (typeof part === 'string') {
      out.push(part);
      continue;
    }

    // Array of class names (accept unknown, narrow per-item)
    if (Array.isArray(part)) {
      const arr: readonly unknown[] = part;
      for (const item of arr) {
        if (typeof item === 'string' && item.length > 0) {
          out.push(item);
        }
      }
      continue;
    }

    // Object-form conditional classes
    if (isConditionalMap(part)) {
      pushTruthyKeys(part, out);
    }
  }

  return out.join(' ');
}
