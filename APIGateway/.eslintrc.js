module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true, // Jest globals
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  plugins: ['jest'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': 'warn',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'max-len': ['error', { code: 120 }],

    // Add these to fix CommonJS + Jest issues
    'import/no-unresolved': 'off', // allow require() to work
    'import/extensions': 'off', // allow .js extensions in require()
  },
};
