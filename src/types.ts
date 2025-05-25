import type {
  ConfigNames as AntfuConfigNames,
  OptionsConfig as AntfuOptionsConfig,
  Rules as AntfuRules,
  TypedFlatConfigItem as AntfuTypedFlatConfigItem,
} from '@antfu/eslint-config'
import type { Linter } from 'eslint'

import type {
  RuleOptions as MyRuleOptions,
  ConfigNames as WongxyConfigNames,
} from './typegen'

export * from '@antfu/eslint-config'

interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}
export type ConfigNames = AntfuConfigNames & WongxyConfigNames
export type TypedFlatConfigItem = AntfuTypedFlatConfigItem & MyTypedFlatConfigItem
interface MyRules extends MyRuleOptions {}
interface Rules extends MyRules, AntfuRules {}
export type MyTypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & { plugins?: Record<string, any> }

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
