module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    // indentation: 2,
    'string-quotes': 'single',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'color-no-invalid-hex': true,
    'font-family-no-missing-generic-family-keyword': true,
  },
}
