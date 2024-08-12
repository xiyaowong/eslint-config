import { antfu } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import { isPackageExists } from 'local-pkg'

import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from './types'
import { tailwindcss } from './tailwindcss'

const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']
const ReactPackages = ['react', 'react-native', 'react-dom', 'next']

export default function wongxy(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const finalOptions: typeof options = {
    ...options,
    vue: options.vue ?? VuePackages.some(i => isPackageExists(i)),
    typescript: options.typescript ?? isPackageExists('typescript'),
    react: (options.react || options.reactnative) ?? ReactPackages.some(i => isPackageExists(i)),
    reactnative: options.reactnative ?? isPackageExists('react-native'),
    tailwindcss: options.tailwindcss ?? isPackageExists('tailwindcss'),
  }

  finalOptions.rules = {
    'no-console': 'off',
    'no-alert': 'off',
    'no-multiple-empty-lines': 'warn',
    'antfu/top-level-function': 'off',
    'antfu/if-newline': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    ...finalOptions.rules,
  }

  if (finalOptions.vue) {
    const vue = typeof finalOptions.vue === 'object' ? finalOptions.vue : {}
    finalOptions.vue = {
      ...vue,
      overrides: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-template-root': 'off',
        'vue/block-order': ['warn', { order: [['script', 'template'], 'style'] }],
        'vue/custom-event-name-casing': 'off',
        ...vue.overrides,
      },
    }
  }

  if (finalOptions.react) {
    const react = typeof finalOptions.react === 'object' ? finalOptions.react : {}
    finalOptions.react = {
      ...react,
      overrides: {
        'react/prefer-destructuring-assignment': 'off',
        ...react.overrides,
      },
    }
  }

  if (finalOptions.typescript) {
    const typescript = typeof finalOptions.typescript === 'object' ? finalOptions.typescript : {}
    finalOptions.typescript = {
      ...typescript,
      overrides: {
        'ts/consistent-type-imports': ['error', { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports', prefer: 'type-imports' }],
        ...(finalOptions.reactnative
          ? {
              'ts/no-require-imports': 'off',
              'ts/no-use-before-define': 'off',
            }
          : undefined),
        ...typescript.overrides,
      },
    }
  }

  if (finalOptions.tailwindcss) {
    userConfigs.splice(0, 0, tailwindcss({
      overrides: typeof finalOptions.tailwindcss === 'object'
        ? finalOptions.tailwindcss.overrides
        : undefined,
    }))
  }

  delete finalOptions.reactnative
  delete finalOptions.tailwindcss

  return antfu(finalOptions, ...userConfigs)
}

export { tailwindcss } from './tailwindcss'
export * from './types'
