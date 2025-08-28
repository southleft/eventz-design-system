// packages/blueprints/src/utilities/defineContract.ts

/**
 * Ensures that the provided contract object retains literal types.
 * Useful for authoring component contracts in TypeScript without type widening.
 */
export function defineContract<T extends Record<string, any>>(contract: T): T {
  return contract;
}
