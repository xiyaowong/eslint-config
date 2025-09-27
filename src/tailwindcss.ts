import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsTailwindCSS, RuleOptionsTailwindCSS } from './types'
import pluginTailwind from 'eslint-plugin-better-tailwindcss'

export async function tailwindcss(options: OptionsTailwindCSS = {}): Promise<TypedFlatConfigItem[]> {
  const { overrides = {}, settings } = options

  const rules: RuleOptionsTailwindCSS = {
    'tw/enforce-consistent-class-order': 'warn',
    'tw/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
    'tw/no-duplicate-classes': 'warn',
    'tw/no-unnecessary-whitespace': 'warn',
    'tw/no-conflicting-classes': 'warn',
    'tw/no-unregistered-classes': 'warn',
  }

  return [
    {
      name: 'wongxy/tailwindcss/setup',
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
      ...(!!settings && {
        settings: {
          'better-tailwindcss': settings,
        },
      }),
    },
    {
      name: 'wongxy/tailwindcss/rules',
      rules: {
        ...rules,
        ...overrides,
      },
    },
  ]
}
