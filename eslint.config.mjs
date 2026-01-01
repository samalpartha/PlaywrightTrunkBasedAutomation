// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            'no-unused-vars': 'off', // turned off in favor of @typescript-eslint/no-unused-vars
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_'
            }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-require-imports': 'off', // allow require in scripts
            'no-undef': 'warn',
            'prefer-const': 'warn',
        },
    },
    {
        ignores: [
            'node_modules/**',
            'playwright-report/**',
            'test-results/**',
            'allure-results/**',
            'allure-report/**',
        ],
    }
);
