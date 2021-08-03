module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                printWidth: 80,
                trailingComma: 'es5',
                jsxSingleQuote: true,
                singleQuote: true,
                useTabs: false,
            },
        ],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
    },
}
