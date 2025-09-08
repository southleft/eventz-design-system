// packages/blueprints/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // Modern ts-jest config (replaces deprecated `globals['ts-jest']`)
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.jest.json', useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Keep your alias AND handle TS/ESM relative imports that might include `.js`
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};

export default config;
