import type { Rules } from '@antfu/eslint-config'
import type { Options, OptionsReturn, UserConfig } from './types'
import { antfu, getOverrides, GLOB_SRC, GLOB_TS, GLOB_TSX, GLOB_VUE } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { tailwindcss } from './tailwindcss'

export type * from './types'

const VuePackages = ['vue', 'nuxt', 'vitepress', '@slidev/cli']
const ReactPackages = ['react', 'react-native', 'react-dom', 'next']

const commonRules: Rules = {
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
    customGroups: [
      {
        groupName: 'reserved-first',
        elementNamePattern: ['key', 'ref'],
      },
      {
        groupName: 'reserved-second',
        elementNamePattern: ['id', 'name'],
      },
      {
        groupName: 'reserved-last',
        elementNamePattern: ['asChild'],
      },
    ],
  }],
}

const vueRules: Rules = {
  'vue/singleline-html-element-content-newline': 'off',
  'vue/valid-template-root': 'off',
  'vue/block-order': ['warn', { order: [['script', 'template'], 'style'] }],
  'vue/custom-event-name-casing': 'off',
}

const reactRules: Rules = {
  'react/prefer-destructuring-assignment': 'off',
}

const typescriptRules: Rules = {
  'ts/consistent-type-imports': ['error', {
    disallowTypeAnnotations: false,
    fixStyle: 'inline-type-imports',
    prefer: 'type-imports',
  }],
}

const reactNativeRules: Rules = {
  'ts/no-require-imports': 'off',
  'ts/no-use-before-define': 'off',
}

function resolveRules(rules: Rules, ...chosen: (Rules | undefined)[]): Rules {
  const taken = Object.assign({}, ...chosen)
  return Object.fromEntries(
    Object.entries(rules).filter(([rule]) => !(rule in taken)),
  ) as Rules
}

export default function wongxy(options: Options = {}, ...userConfigs: UserConfig[]): OptionsReturn {
  const {
    react: enableReact = ReactPackages.some(i => isPackageExists(i)),
    reactnative: enableReactNative = isPackageExists('react-native'),
    tailwindcss: enableTailwind = isPackageExists('tailwindcss'),
    typescript: enableTypeScript = isPackageExists('typescript') || isPackageExists('@typescript/native-preview'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  const reactNativeOptions = typeof options.reactnative === 'object' ? options.reactnative : {}
  const tailwindOptions = typeof options.tailwindcss === 'object' ? options.tailwindcss : undefined
  const globalRules = options.rules

  const configs: UserConfig[] = [
    {
      name: 'wongxy/common',
      rules: resolveRules(commonRules, globalRules),
    },
  ]

  if (enableVue) {
    configs.push({
      name: 'wongxy/vue',
      files: [GLOB_VUE],
      rules: resolveRules(vueRules, globalRules, getOverrides(options, 'vue')),
    })
  }

  if (enableReact) {
    configs.push({
      name: 'wongxy/react',
      files: [GLOB_SRC],
      rules: resolveRules(reactRules, globalRules, getOverrides(options, 'react')),
    })
  }

  if (enableTypeScript) {
    configs.push({
      name: 'wongxy/typescript',
      files: [GLOB_TS, GLOB_TSX],
      rules: resolveRules(typescriptRules, globalRules, getOverrides(options, 'typescript')),
    })
  }

  if (enableReactNative) {
    configs.push({
      name: 'wongxy/reactnative',
      files: [GLOB_TS, GLOB_TSX],
      rules: resolveRules(reactNativeRules, globalRules, reactNativeOptions.overrides),
    })
  }

  if (enableTailwind) {
    configs.push(tailwindcss(tailwindOptions, globalRules))
  }

  return antfu(options, ...configs, ...userConfigs)
}
