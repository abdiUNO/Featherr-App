module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  env: {
    es6: true,
    'react-native/react-native': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:react-native/all',
    'eslint-config-prettier'
  ],
  plugins: [
    'react',
    'react-native',
    'flowtype',
    'jsx-a11y',
    'import',
    'prettier'
  ],
  rules: {
    camelcase: ['off'],
    'prettier/prettier': 'error',
    'react/sort-comp': [1],
    'react/prefer-stateless-function': ['off'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': ['error', 'unix'],
    'react/no-did-mount-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/jsx-uses-vars': 2,
    'no-undef': 1,
    quotes: ['off'],
    semi: ['off'],
    'react/prop-types': 2,
    'react/jsx-no-bind': 2,
    'react/jsx-no-duplicate-props': 2,
    'space-before-function-paren': ['off'],
    'react/prop-types': ['off'],
    'react-native/sort-styles': ['off'],
    'no-console': ['off'],
    'no-underscore-dangle': ['off']
  }
}
