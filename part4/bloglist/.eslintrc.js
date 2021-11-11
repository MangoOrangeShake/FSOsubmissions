module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
  },
};
