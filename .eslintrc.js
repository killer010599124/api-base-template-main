module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'jest', 'unused-imports'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'files', 'dist', '.github', 'public', 'scripts', 'Migrations', 'Docs'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'import/no-import-module-exports': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': ['error', { allow: ['_doc', '_id', '__v'] }],
    'no-console': 'off',
    'dot-notation': 'off',
    'import/no-cycle': 'off',
    camelcase: 'off',
  },
};
