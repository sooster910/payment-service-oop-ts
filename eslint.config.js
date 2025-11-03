import js from '@eslint/js';
import tsPlugin from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'coverage/', '*.config.js', 'pnpm-lock.yaml'],
  },
  js.configs.recommended,
  ...tsPlugin.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsPlugin.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        NodeJS: 'readonly',
      },
    },
    rules: {
      // TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',

      // 일반 규칙
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'no-empty': 'error',
      'no-implicit-coercion': 'error',
      'no-unreachable': 'error',
    },
  },
  {
    files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
