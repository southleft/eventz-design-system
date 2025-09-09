// packages/blueprints/src/utilities/defineContract/defineContract.test.ts

import { defineContract } from './defineContract';

describe('defineContract', () => {
  it('returns the object unchanged', () => {
    const input = {
      component: 'Sample',
      base: 'Button',
      props: {}
    } as const;

    const contract = defineContract(input);
    expect(contract).toBe(input);
  });

  it('preserves literal types', () => {
    const contract = defineContract({
      component: 'Dialog' as const,
      base: 'Button',
      props: {}
    } as const);

    type ComponentName = typeof contract.component;
    const isLiteral: ComponentName extends 'Dialog' ? true : false = true;
    expect(isLiteral).toBe(true);
  });
});
