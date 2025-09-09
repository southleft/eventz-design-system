// packages/blueprints/src/utilities/defineContract/defineContract.ts
import type { ContractSpec } from './types';

/**
 * Ensures that the provided contract object retains literal types (no widening),
 * and conforms to the ContractSpec shape.
 */
export function defineContract<T extends ContractSpec>(contract: T): T {
  return contract;
}
