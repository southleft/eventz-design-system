// packages/blueprints/src/utilities/__tests__/defineContract.test.ts

import { defineContract } from './defineContract';

describe('defineContract', () => {
  it('returns the object unchanged', () => {
    const contract = defineContract({ foo: 'bar' });
    expect(contract.foo).toBe('bar');
  });

  it('preserves literal types', () => {
    const contract = defineContract({ role: 'dialog' as const });
    type Role = typeof contract.role;
    const isLiteral: Role extends 'dialog' ? true : false = true;
    expect(isLiteral).toBe(true);
  });
});
