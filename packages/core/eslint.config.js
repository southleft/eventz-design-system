// packages/core/eslint.config.js
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

const useClientDirectiveRule = {
  meta: {
    type: 'problem',
    schema: [
      {
        type: 'object',
        properties: {
          mode: { enum: ['require', 'forbid'] }
        },
        additionalProperties: false
      }
    ],
    messages: {
      missingDirective: "Client components must include a top-level 'use client' directive.",
      unexpectedDirective: "Server components must not include the 'use client' directive."
    }
  },
  create(context) {
    const mode = context.options[0]?.mode ?? 'forbid';
    return {
      Program(node) {
        const firstStatement = node.body[0];
        const directiveStatement =
          firstStatement &&
          firstStatement.type === 'ExpressionStatement' &&
          firstStatement.directive === 'use client'
            ? firstStatement
            : undefined;
        const anyDirective = node.body.find(
          (statement) =>
            statement.type === 'ExpressionStatement' &&
            statement.directive === 'use client'
        );

        if (mode === 'require') {
          if (!directiveStatement) {
            context.report({
              node: firstStatement ?? node,
              messageId: 'missingDirective'
            });
          }
        } else if (mode === 'forbid' && anyDirective) {
          context.report({
            node: anyDirective,
            messageId: 'unexpectedDirective'
          });
        }
      }
    };
  }
};

const eslintCommentsPlugin = {
  rules: {
    'use-client-directive': useClientDirectiveRule
  }
};

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
      'jest-dom': jestDom,
      'eslint-comments': eslintCommentsPlugin
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // Server component guardrails
  {
    files: ['src/components/server/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: ['radix-ui'],
          patterns: ['@radix-ui/*']
        }
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name=/^use[A-Z]/]',
          message: 'Hooks are not allowed in server components.'
        }
      ],
      'eslint-comments/use-client-directive': ['error', { mode: 'forbid' }]
    }
  },

  // Client component guardrails
  {
    files: ['src/components/client/**/*.{ts,tsx}'],
    rules: {
      'eslint-comments/use-client-directive': ['error', { mode: 'require' }]
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
