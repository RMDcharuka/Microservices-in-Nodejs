module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 12, // ES2021 is fine too
    sourceType: 'script', // <--- Important for CommonJS
  },
  rules: {
    'linebreak-style': ['error', 'unix'], // LF line endings
    'no-unused-vars': 'warn',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'max-len': ['error', { code: 120 }],
  },
};
