// packages/core/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]sx?$'],

  // Modern ts-jest config (replaces deprecated `globals['ts-jest']`)
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.jest.json', useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Helps when TS emits `.js` in import paths but source imports omit it
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  setupFilesAfterEnv: ['./test.ts']
};

export default config;
