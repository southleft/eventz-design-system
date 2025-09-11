// packages/blueprints/src/utilities/defineStyleMap/defineStyleMap.ts
import type { StyleMapSpec } from './types';

/**
 * No-op identity helper that enforces the StyleMapSpec shape
 * and preserves literal types (use `as const` on class arrays).
 */
export function defineStyleMap<T extends StyleMapSpec>(map: T): T {
  return map;
}
