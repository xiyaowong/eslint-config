const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    rules: {
      semi: 'off',
      quotes: 'off',
      'no-console': 'off',
      'no-multiple-empty-lines': 'warn',
    },
    overrides: {
      vue: {
        "vue/block-order": ["warn", {
          "order": [["script", "template"], "style"]
        }],
        "vue/valid-template-root": "off"
      },
      typescript: {
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/semi': ['warn', 'never'],
        '@typescript-eslint/quotes': ['warn', 'single'],
      },
    }
  }
)
