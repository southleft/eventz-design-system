// packages/core/eslint.config.js
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

export default [
  // Ignore build outputs, deps, and config files to avoid typed rules on JS configs
  {
    ignores: [
      'dist/**',
      'build/**',
      'coverage/**',
      'node_modules/**',
      '.storybook/**',
      'scripts/**',
      'styles/tokens/**',
      'test.ts',
      'eslint.config.js',
      // (optional, extra safety)
      '**/*.config.*',
      'vite.config.*',
      'storybook*.ts',
      'jest.config.*'
    ]
  },

  // Base JS recommended rules
  js.configs.recommended,

  // TypeScript recommended (type-checked) rules
  ...tseslint.configs.recommendedTypeChecked,

  // Core TS/React config
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.build.json', './tsconfig.jest.json'],
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url))
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'testing-library': testingLibrary,
      'jest-dom': jestDom
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Testing-specific guidance for test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*.{ts,tsx}'],
    rules: {
      'jest-dom/prefer-checked': 'warn',
      'jest-dom/prefer-enabled-disabled': 'warn'
    }
  }
];
