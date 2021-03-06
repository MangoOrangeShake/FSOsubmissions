module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
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
    'no-console': 'off',
    'consistent-return': 'off',
    'arrow-parens': ['error', 'as-needed'],
  },
};
