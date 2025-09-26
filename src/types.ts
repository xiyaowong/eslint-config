import type { antfu, OptionsOverrides } from '@antfu/eslint-config'
import type { RuleOptions } from './typegen'

export type Options = Parameters<typeof antfu>[0] & {
  /**
   * Enable Tailwind rules.
   *
   * @default auto-detect based on the dependencies
   */
  tailwindcss?: boolean | OptionsTailwindCSS
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

export type UserConfig = Parameters<typeof antfu>[1] & { rules?: RuleOptions }
export type OptionsReturn = ReturnType<typeof antfu>

export type PickKeysByPrefix<T extends object, P extends string> = {
  [K in keyof T as K extends `${P}${string}` ? K : never]: T[K];
}

export type RuleOptionsTailwindCSS = PickKeysByPrefix<RuleOptions, 'tw/'>

export interface OptionsTailwindCSS {
  entryPoint?: string
  overrides?: Partial<RuleOptionsTailwindCSS>
}
