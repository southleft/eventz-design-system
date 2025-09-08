// packages/core/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['./src'],
  testMatch: ['**/+(*.)+(spec).+(ts)', '**/+(*.)+(test).+(tsx)'],

  // Modern ts-jest config (replaces deprecated `globals['ts-jest']`)
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.jest.json', useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Helps when TS emits `.js` in import paths but source imports omit it
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  setupFilesAfterEnv: ['./test.ts']
};

export default config;
