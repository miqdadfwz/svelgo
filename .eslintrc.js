module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'google', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    },
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    'svelte3/typescript': true,
  },
};
