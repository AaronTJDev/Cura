module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'react-hooks'],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-var': 'off',
        'escript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'dot-notation': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react-native/no-inline-styles': 0
      }
    }
  ]
};
