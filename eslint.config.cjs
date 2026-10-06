const js = require('@eslint/js');
const jest = require('eslint-plugin-jest');

module.exports = [
    {
        files: ['src/**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'readonly',
            },
        },

        rules: {
            ...js.configs.recommended.rules,
        },
    },

    {
        files: ['test/**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'readonly',
                ...jest.environments.globals.globals,
            },
        },

        plugins: {
            jest,
        },

        rules: {
            ...js.configs.recommended.rules,
            ...jest.configs.recommended.rules,

            'jest/no-disabled-tests': 'warn',
            'jest/no-conditional-expect': 'error',
            'jest/no-identical-title': 'error',
        },
    },
];