import type { Rules } from '@antfu/eslint-config'
import type { Options, OptionsReturn, UserConfig } from './types'
import { antfu, getOverrides, GLOB_SRC, GLOB_TS, GLOB_TSX, GLOB_VUE } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { tailwindcss } from './tailwindcss'

const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']
const ReactPackages = ['react', 'react-native', 'react-dom', 'next']

function resolveRules(overrides: ReturnType<typeof getOverrides>, rules: Rules) {
  return Object.fromEntries(Object.entries(rules).filter(([k]) => !overrides[k]))
}

export default function wongxy(options: Options = {}, ...userConfigs: UserConfig[]): OptionsReturn {
  const {
    react: enableReact = ReactPackages.some(i => isPackageExists(i)),
    typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
    tailwindcss: enableTailwind = isPackageExists('tailwindcss'),
    reactnative: enableReactNative = isPackageExists('react-native'),
  } = options

  const configs: UserConfig[] = []

  configs.push({
    name: 'wongxy/common',
    rules: resolveRules(options.rules ?? {}, {
      'no-console': 'off',
      'no-alert': 'off',
      'no-multiple-empty-lines': 'warn',
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'perfectionist/sort-jsx-props': ['warn', {
        order: 'asc',
        type: 'natural',
        groups: ['reserved-first', 'reserved-second', 'unknown', 'reserved-last'],
        customGroups: {
          'reserved-first': ['key', 'ref'],
          'reserved-second': ['id', 'name'],
          'reserved-last': ['asChild'],
        },
      }],
    }),
  })

  if (enableVue) {
    configs.push({
      name: 'wongxy/vue',
      files: [GLOB_VUE],
      rules: resolveRules(
        getOverrides(options, 'vue'),
        {
          'vue/singleline-html-element-content-newline': 'off',
          'vue/valid-template-root': 'off',
          'vue/block-order': ['warn', { order: [['script', 'template'], 'style'] }],
          'vue/custom-event-name-casing': 'off',
        },
      ),
    })
  }

  if (enableReact) {
    configs.push({
      name: 'wongxy/react',
      files: [GLOB_SRC],
      // files: [GLOB_TS, GLOB_TSX],
      rules: resolveRules(
        getOverrides(options, 'react'),
        {
          'react/prefer-destructuring-assignment': 'off',
        },
      ),
    })
  }

  if (enableTypeScript) {
    configs.push(({
      name: 'wongxy/typescript',
      files: [GLOB_TS, GLOB_TSX],
      rules: resolveRules(
        getOverrides(options, 'typescript'),
        {
          'ts/consistent-type-imports': ['error', {
            disallowTypeAnnotations: false,
            fixStyle: 'inline-type-imports',
            prefer: 'type-imports',
          }],
        },
      ),
    }))
  }

  if (enableReactNative) {
    configs.push(({
      name: 'wongxy/reactnative',
      files: [GLOB_TS, GLOB_TSX],
      rules: resolveRules(
        getOverrides(options, 'typescript'),
        {
          'ts/no-require-imports': 'off',
          'ts/no-use-before-define': 'off',
        },
      ),
    }))
  }

  if (enableTailwind) {
    const tw = typeof options.tailwindcss === 'object' ? options.tailwindcss : undefined
    configs.push(tailwindcss(tw))
  }

  return antfu(options, ...configs, ...userConfigs)
}
