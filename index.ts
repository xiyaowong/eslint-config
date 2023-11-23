import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'

function wongxy(options?: OptionsConfig & FlatConfigItem, ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]) {
  return antfu(options, {
    rules: {
      'no-console': 'off',
      'no-alert': 'off',
      'no-multiple-empty-lines': 'warn',
      'curly': ['error', 'all'],
      'antfu/top-level-function': 'off',
    },
  }, {
    files: ['**/*.vue'],
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/valid-template-root': 'off',
      'vue/block-order': ['warn', {
        order: [['script', 'template'], 'style'],
      }],
      'vue/custom-event-name-casing': 'off',
    },
  }, ...userConfigs)
}

export default wongxy
export { wongxy }
