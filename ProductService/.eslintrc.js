module.exports = {
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  plugins: ['jest'],
  rules: {
    'no-tabs': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-underscore-dangle': 'off',
    'no-async-promise-executor': 'error',
    'prefer-promise-reject-errors': 'error',
    'no-useless-catch': 'error',
  },
};
