import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

function wongxy(
  options: OptionsConfig & TypedFlatConfigItem & { reactnative?: boolean } = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const finalOptions = { ...options, react: options.react || options.reactnative }

  const configs: typeof userConfigs = []

  configs.push({
    name: 'wongxy/general',
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'no-multiple-empty-lines': 'warn',
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'import/order': ['error', { 'newlines-between': 'always' }],
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    },
  })

  if (options.vue) {
    configs.push({
      name: 'wongxy/vue',
      files: ['**/*.vue'],
      rules: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-template-root': 'off',
        'vue/block-order': ['warn', { order: [['script', 'template'], 'style'] }],
        'vue/custom-event-name-casing': 'off',
      },
    })
  }

  if (options.react) {
    configs.push({
      name: 'wongxy/react',
      rules: {
        'react/prefer-destructuring-assignment': 'off',
      },
    })
  }

  if (options.reactnative) {
    configs.push({
      name: 'wongxy/reactnative',
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-use-before-define': 'off',
      },
    })
  }

  return antfu(finalOptions, ...configs, ...userConfigs)
}

export default wongxy
