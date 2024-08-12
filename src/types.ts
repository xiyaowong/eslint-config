import type { Linter } from 'eslint'
import type {
  ConfigNames as AntfuConfigNames,
  OptionsConfig as AntfuOptionsConfig,
  TypedFlatConfigItem as AntfuTypedFlatConfigItem,
} from '@antfu/eslint-config'

import type {
  RuleOptions as MyRuleOptions,
  ConfigNames as WongxyConfigNames,
} from './typegen'

export * from '@antfu/eslint-config'

interface WongxyOptionsConfig {
  /**
   * Enable Tailwind rules.
   *
   * @default auto-detect based on the dependencies
   */
  tailwindcss?: boolean | OptionsOverrides
}

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}

export type OptionsConfig = WongxyOptionsConfig & AntfuOptionsConfig
export type ConfigNames = WongxyConfigNames & AntfuConfigNames
export type TypedFlatConfigItem = MyTypedFlatConfigItem & AntfuTypedFlatConfigItem
export type MyTypedFlatConfigItem = Omit< Linter.Config<Linter.RulesRecord & MyRuleOptions>, 'plugins' >
export type { Awaitable } from '@antfu/eslint-config'
