module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'react-app',
    // 'plugin:@typescript-eslint/recommended',
    // 'prettier/@typescript-eslint',
    'plugin:react/recommended',
    'standard'
    // 'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'multiline-ternary': 'off',
    '@typescript-eslint': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
