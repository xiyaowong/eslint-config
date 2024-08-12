import type { TypedFlatConfigItem } from '@antfu/eslint-config'
// @ts-expect-error no types
import pluginTailwind from 'eslint-plugin-tailwindcss'

import type { OptionsOverrides } from './types'

export async function tailwindcss(options?: OptionsOverrides): Promise<TypedFlatConfigItem[]> {
  const { overrides = {} } = options ?? {}
  return [
    {
      name: 'wongxy/tailwindcss',
      plugins: {
        tw: pluginTailwind,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        'tw/classnames-order': 'warn',
        'tw/enforces-negative-arbitrary-values': 'warn',
        'tw/enforces-shorthand': 'warn',
        'tw/migration-from-tailwind-2': 'warn',
        'tw/no-arbitrary-value': 'off',
        // 'tw/no-custom-classname': 'warn',
        'tw/no-contradicting-classname': 'error',
        // 'tw/no-unnecessary-arbitrary-value': 'warn',
        ...overrides,
      },
    },
  ]
}
