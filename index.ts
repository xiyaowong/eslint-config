import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'

function wongxy(
  options?: OptionsConfig & FlatConfigItem & { reactnative?: boolean },
  ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
) {
  const reactnative = options?.reactnative
  const react = options?.react || reactnative

  const configs: typeof userConfigs = []
  configs.push(
    {
      rules: {
        'no-console': 'off',
        'no-alert': 'off',
        'no-multiple-empty-lines': 'warn',
        'antfu/top-level-function': 'off',
      },
    },
  )
  if (options?.vue) {
    configs.push({
      files: ['**/*.vue'],
      rules: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-template-root': 'off',
        'vue/block-order': ['warn', {
          order: [['script', 'template'], 'style'],
        }],
        'vue/custom-event-name-casing': 'off',
      },
    })
  }
  if (reactnative) {
    configs.push({
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-use-before-define': 'off',
      },
    })
  }

  return antfu({ ...options, react }, ...configs, ...userConfigs)
}

export default wongxy
