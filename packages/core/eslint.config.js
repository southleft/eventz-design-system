// packages/core/eslint.config.js
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url));

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
      'src/components/icons/**',
      'src/components/utilities/**',
      'src/icons/**',
      'src/utilities/**/*.test.*',
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
        tsconfigRootDir
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
          patterns: ['@radix-ui/react-*']
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

  {
    files: [
      'src/components/server/**/*.stories.ts',
      'src/components/server/**/*.stories.tsx',
      'src/components/server/**/*.test.ts',
      'src/components/server/**/*.test.tsx',
      'src/components/server/**/__tests__/**/*.ts',
      'src/components/server/**/__tests__/**/*.tsx'
    ],
    rules: {
      'no-restricted-imports': 'off'
    }
  },

  // Client component guardrails
  {
    files: ['src/components/client/**/*.tsx'],
    rules: {
      'eslint-comments/use-client-directive': ['error', { mode: 'require' }]
    }
  },

  {
    files: [
      'src/components/client/**/*.stories.ts',
      'src/components/client/**/*.stories.tsx',
      'src/components/client/**/*.test.ts',
      'src/components/client/**/*.test.tsx',
      'src/components/client/**/__tests__/**/*.ts',
      'src/components/client/**/__tests__/**/*.tsx'
    ],
    rules: {
      'eslint-comments/use-client-directive': 'off'
    }
  },

  // Testing-specific guidance for test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.jest.json'],
        tsconfigRootDir
      }
    },
    rules: {
      'jest-dom/prefer-checked': 'warn',
      'jest-dom/prefer-enabled-disabled': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off'
    }
  }
];
