module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  plugins: ['jest'],
  rules: {
    'linebreak-style': ['error', 'unix'], // LF line endings
    'no-unused-vars': 'warn', // warn instead of error
    'class-methods-use-this': 'off', // allow class methods without 'this'
    'no-console': 'off', // allow console.log for dev
    'max-len': ['error', { code: 120 }], // max line length 120
  },
};
