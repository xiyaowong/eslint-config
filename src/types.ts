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

export interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}
export type ConfigNames = AntfuConfigNames & WongxyConfigNames
export type TypedFlatConfigItem = AntfuTypedFlatConfigItem & MyTypedFlatConfigItem
export type MyTypedFlatConfigItem = Omit< Linter.Config<Linter.RulesRecord & MyRuleOptions>, 'plugins' >
export interface OptionsConfig extends AntfuOptionsConfig {
  /**
   * Enable Tailwind rules.
   *
   * @default auto-detect based on the dependencies
   */
  tailwindcss?: boolean | OptionsOverrides
  /**
   * Enable React Native support.
   *
   * Will enable `react` support automatically.
   *
   * @default auto-detect based on the dependencies
   */
  reactnative?: boolean
  /**
   * Enable react rules.
   *
   * @default auto-detect based on the dependencies
   */
  react?: boolean | OptionsOverrides
}
