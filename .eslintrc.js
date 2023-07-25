module.exports = {
  plugins: ['solid'],
  extends: ['alloy', 'plugin:solid/typescript', 'alloy/typescript'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  root: true,
  rules: {
    // 自定义你的规则
    'solid/reactivity': 'warn',
    'solid/no-destructure': 'warn',
    'solid/jsx-no-undef': 'error',
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'max-depth': ['error', 7],
    'max-lines': ['error', { max: 600, skipBlankLines: true, skipComments: true }],
    radix: 'off'
  }
};
