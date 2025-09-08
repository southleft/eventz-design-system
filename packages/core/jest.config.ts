// packages/core/jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['./src'],
  testMatch: ['**/+(*.)+(spec).+(ts)', '**/+(*.)+(test).+(tsx)'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json'
    }
  },
  setupFilesAfterEnv: ['./test.ts']
};

export default config;
