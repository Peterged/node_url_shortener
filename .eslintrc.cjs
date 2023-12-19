/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript'
    ],
    rules: {
        "no-console": "off",
        'import/no-namespace': 'off',
        "@typescript-eslint/no-namespace": "off"
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        node: true,
        browser: true
    },
    parserOptions: {
        project: ["./tsconfig.json"]
    },
};
