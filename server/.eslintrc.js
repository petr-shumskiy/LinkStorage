module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true
  },
  plugins: ['mocha'],
  extends: ['plugin:mocha/recommended', 'standard'],
  parserOptions: {
    ecmaVersion: 12
  },
  ignorePatterns: ['client'],
  rules: {
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'default-param-last': 'off',
    'mocha/no-setup-in-describe': 'off'
  },
  settings: {
    'mocha/additionalCustomNames': [
      { name: 'describeModule', type: 'suite', interfaces: ['BDD'] },
      { name: 'testModule', type: 'testCase', interfaces: ['TDD'] }
    ]
  }
}
